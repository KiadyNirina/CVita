<!-- src/lib/components/A4Paginator.svelte -->

<script>
    import { onMount, tick } from 'svelte';
    import A4Scaler from '$lib/components/A4Scaler.svelte';

    export let data;
    export let templateComponent;
    export let fullMode = false;

    /*
     * ============================================================
     * CONFIGURATION A4
     * ============================================================
     */

    const MM_TO_PX = 96 / 25.4;

    const PAGE_WIDTH_MM = 210;
    const PAGE_HEIGHT_MM = 297;

    const PAGE_PADDING_MM = 12;

    const PAGE_WIDTH_PX = PAGE_WIDTH_MM * MM_TO_PX;
    const PAGE_HEIGHT_PX = PAGE_HEIGHT_MM * MM_TO_PX;
    const PAGE_PADDING_PX = PAGE_PADDING_MM * MM_TO_PX;

    /*
     * Hauteur disponible pour le contenu.
     *
     * 297mm - 12mm haut - 12mm bas
     */
    const CONTENT_HEIGHT_PX =
        PAGE_HEIGHT_PX - (PAGE_PADDING_PX * 2);


    /*
     * ============================================================
     * VARIABLES
     * ============================================================
     */

    let sourceContainer;

    let pagesHtml = [];

    let paginationToken = 0;


    /*
     * ============================================================
     * MESURE
     * ============================================================
     */

    function getOuterHeight(element) {
        if (!element) return 0;

        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);

        const marginTop =
            parseFloat(style.marginTop) || 0;

        const marginBottom =
            parseFloat(style.marginBottom) || 0;

        return rect.height + marginTop + marginBottom;
    }


    /*
     * ============================================================
     * CLONAGE
     * ============================================================
     */

    function cloneHtml(element) {
        return element.outerHTML;
    }


    /*
     * ============================================================
     * EXTRACTION DE LA STRUCTURE
     * ============================================================
     *
     * Structure attendue :
     *
     * .cv-header
     *
     * .cv-section
     *     .cv-section-title
     *     .cv-section-items
     *         .cv-item
     *         .cv-item
     *
     * Une section peut donc être divisée entre plusieurs pages.
     *
     * Mais chaque .cv-item reste indivisible.
     */

    function extractStructure(root) {
        const children =
            Array.from(root.children);

        const result = [];

        for (const element of children) {

            /*
             * ----------------------------------------------------
             * HEADER
             * ----------------------------------------------------
             */

            if (element.matches('.cv-header')) {

                result.push({
                    type: 'standalone',
                    element
                });

                continue;
            }


            /*
             * ----------------------------------------------------
             * SECTION
             * ----------------------------------------------------
             */

            if (element.matches('.cv-section')) {

                const content =
                    element.querySelector(
                        '.cv-section-items'
                    );

                /*
                 * Section sans .cv-section-items.
                 */
                if (!content) {

                    result.push({
                        type: 'standalone',
                        element
                    });

                    continue;
                }


                /*
                 * IMPORTANT :
                 *
                 * On récupère UNIQUEMENT les .cv-item
                 * enfants directs.
                 */
                const items =
                    Array.from(
                        content.querySelectorAll(
                            ':scope > .cv-item'
                        )
                    );


                result.push({
                    type: 'section',
                    section: element,
                    content,
                    items
                });

                continue;
            }


            /*
             * ----------------------------------------------------
             * AUTRE BLOC
             * ----------------------------------------------------
             */

            result.push({
                type: 'standalone',
                element
            });
        }

        return result;
    }


    /*
     * ============================================================
     * CONSTRUIRE UNE SECTION
     * ============================================================
     *
     * Reconstruit une section avec uniquement les items demandés.
     */

    function buildSectionHtml(section, items) {

        const sectionClone =
            section.cloneNode(true);

        const contentClone =
            sectionClone.querySelector(
                '.cv-section-items'
            );

        if (!contentClone) {
            return sectionClone.outerHTML;
        }


        /*
         * On supprime complètement les anciens items.
         */
        contentClone.innerHTML = '';


        /*
         * On remet uniquement les items de cette page.
         */
        for (const item of items) {
            contentClone.appendChild(
                item.cloneNode(true)
            );
        }


        return sectionClone.outerHTML;
    }


    /*
     * ============================================================
     * MESURER UNE SECTION
     * ============================================================
     *
     * Création temporaire dans le DOM réel.
     *
     * C'est beaucoup plus fiable que d'additionner simplement
     * les hauteurs des .cv-item.
     */

    function measureSection(section, items) {

        const wrapper =
            document.createElement('div');

        wrapper.style.position = 'absolute';
        wrapper.style.left = '-99999px';
        wrapper.style.top = '0';

        wrapper.style.width =
            `${PAGE_WIDTH_PX}px`;

        wrapper.style.visibility = 'hidden';
        wrapper.style.pointerEvents = 'none';

        /*
         * On utilise exactement la même structure
         * que celle envoyée dans la page.
         */
        wrapper.innerHTML =
            buildSectionHtml(section, items);


        document.body.appendChild(wrapper);


        const measuredSection =
            wrapper.firstElementChild;


        const height =
            getOuterHeight(measuredSection);


        wrapper.remove();


        return height;
    }


    /*
     * ============================================================
     * MESURER UN BLOC
     * ============================================================
     */

    function measureElement(element) {

        const wrapper =
            document.createElement('div');

        wrapper.style.position = 'absolute';
        wrapper.style.left = '-99999px';
        wrapper.style.top = '0';

        wrapper.style.width =
            `${PAGE_WIDTH_PX}px`;

        wrapper.style.visibility = 'hidden';
        wrapper.style.pointerEvents = 'none';


        wrapper.innerHTML =
            element.outerHTML;


        document.body.appendChild(wrapper);


        const clone =
            wrapper.firstElementChild;


        const height =
            getOuterHeight(clone);


        wrapper.remove();


        return height;
    }


    /*
     * ============================================================
     * PAGINATION
     * ============================================================
     */

    async function paginate() {

        const token =
            ++paginationToken;


        await tick();


        if (token !== paginationToken) {
            return;
        }


        if (!sourceContainer || !data) {
            return;
        }


        const root =
            sourceContainer.firstElementChild;


        if (!root) {
            return;
        }


        /*
         * --------------------------------------------------------
         * EXTRACTION
         * --------------------------------------------------------
         */

        const structure =
            extractStructure(root);


        if (!structure.length) {

            pagesHtml = [];

            return;
        }


        /*
         * --------------------------------------------------------
         * PAGES
         * --------------------------------------------------------
         */

        const newPages = [];


        /*
         * Une page contient maintenant des blocs HTML.
         */
        let currentPage = [];

        let currentHeight = 0;


        /*
         * --------------------------------------------------------
         * NOUVELLE PAGE
         * --------------------------------------------------------
         */

        function pushPage() {

            if (currentPage.length > 0) {

                newPages.push(
                    currentPage.join('')
                );
            }


            currentPage = [];

            currentHeight = 0;
        }


        /*
         * --------------------------------------------------------
         * AJOUTER UN BLOC INDIVISIBLE
         * --------------------------------------------------------
         */

        function addStandalone(element) {

            const height =
                measureElement(element);


            /*
             * Le bloc ne rentre pas.
             */
            if (
                currentPage.length > 0 &&
                currentHeight + height >
                    CONTENT_HEIGHT_PX
            ) {

                pushPage();
            }


            currentPage.push(
                cloneHtml(element)
            );


            currentHeight += height;
        }


        /*
         * --------------------------------------------------------
         * PARCOURS
         * --------------------------------------------------------
         */

        for (const block of structure) {


            /*
             * ====================================================
             * BLOC SIMPLE
             * ====================================================
             */

            if (block.type === 'standalone') {

                addStandalone(
                    block.element
                );

                continue;
            }


            /*
             * ====================================================
             * SECTION
             * ====================================================
             */

            const section =
                block.section;

            const items =
                block.items;


            /*
             * ----------------------------------------------------
             * SECTION SANS ITEMS
             * ----------------------------------------------------
             */

            if (!items.length) {

                addStandalone(section);

                continue;
            }


            /*
             * ----------------------------------------------------
             * ITEMS DE LA SECTION
             * ----------------------------------------------------
             *
             * On conserve une liste explicite des items
             * actuellement présents dans la section.
             */

            let sectionItems = [];


            /*
             * ====================================================
             * ITEM PAR ITEM
             * ====================================================
             */

            for (let i = 0; i < items.length; i++) {

                const item =
                    items[i];


                /*
                 * =================================================
                 * CAS 1 :
                 * La section n'a encore aucun item sur cette page.
                 * =================================================
                 */

                if (sectionItems.length === 0) {


                    /*
                     * On teste la section complète
                     * avec cet item.
                     */
                    const testHeight =
                        measureSection(
                            section,
                            [item]
                        );


                    /*
                     * ------------------------------------------------
                     * L'item + titre de section ne rentrent pas.
                     * ------------------------------------------------
                     */

                    if (
                        currentPage.length > 0 &&
                        currentHeight + testHeight >
                            CONTENT_HEIGHT_PX
                    ) {

                        /*
                         * On descend l'item sur la page suivante.
                         */
                        pushPage();
                    }


                    /*
                     * Maintenant on teste encore.
                     *
                     * Cela gère le cas où on vient de changer
                     * de page.
                     */
                    const finalHeight =
                        measureSection(
                            section,
                            [item]
                        );


                    /*
                     * Même seul, l'item dépasse une page.
                     *
                     * On le place quand même.
                     *
                     * Cela évite une boucle infinie.
                     */
                    if (
                        finalHeight >
                            CONTENT_HEIGHT_PX &&
                        currentPage.length === 0
                    ) {

                        currentPage.push(
                            buildSectionHtml(
                                section,
                                [item]
                            )
                        );

                        currentHeight =
                            finalHeight;

                        sectionItems =
                            [item];

                        continue;
                    }


                    /*
                     * L'item rentre.
                     */
                    currentPage.push(
                        buildSectionHtml(
                            section,
                            [item]
                        )
                    );


                    currentHeight +=
                        finalHeight;


                    sectionItems =
                        [item];


                    continue;
                }


                /*
                 * =================================================
                 * CAS 2 :
                 * La section existe déjà sur cette page.
                 * =================================================
                 */


                /*
                 * On teste la section avec :
                 *
                 * anciens items + nouvel item
                 */
                const candidateItems = [
                    ...sectionItems,
                    item
                ];


                const candidateHeight =
                    measureSection(
                        section,
                        candidateItems
                    );


                /*
                 * ------------------------------------------------
                 * L'item rentre dans la section actuelle.
                 * ------------------------------------------------
                 */

                if (
                    currentHeight -
                    measureSection(
                        section,
                        sectionItems
                    ) +
                    candidateHeight <=
                    CONTENT_HEIGHT_PX
                ) {

                    /*
                     * On remplace la section actuelle
                     * par sa nouvelle version.
                     */
                    const sectionHtml =
                        buildSectionHtml(
                            section,
                            candidateItems
                        );


                    /*
                     * La section est toujours le dernier
                     * bloc ajouté à la page à cet endroit.
                     */
                    const lastIndex =
                        currentPage.length - 1;


                    currentPage[lastIndex] =
                        sectionHtml;


                    /*
                     * Recalcul réel de la hauteur.
                     */
                    const previousSectionHeight =
                        measureSection(
                            section,
                            sectionItems
                        );


                    currentHeight -=
                        previousSectionHeight;


                    currentHeight +=
                        candidateHeight;


                    sectionItems =
                        candidateItems;


                    continue;
                }


                /*
                 * =================================================
                 * CAS 3 :
                 * Le nouvel item ne rentre pas.
                 * =================================================
                 */

                /*
                 * IMPORTANT :
                 *
                 * On crée une nouvelle page.
                 *
                 * Les anciens items restent sur la page précédente.
                 */
                pushPage();


                /*
                 * Le nouvel item devient le premier item
                 * de la section sur la nouvelle page.
                 */
                const newSectionHeight =
                    measureSection(
                        section,
                        [item]
                    );


                /*
                 * Même principe :
                 * section + item peuvent dépasser.
                 */
                currentPage.push(
                    buildSectionHtml(
                        section,
                        [item]
                    )
                );


                currentHeight =
                    newSectionHeight;


                sectionItems =
                    [item];
            }
        }


        /*
         * --------------------------------------------------------
         * DERNIERE PAGE
         * --------------------------------------------------------
         */

        pushPage();


        /*
         * --------------------------------------------------------
         * RESULTAT
         * --------------------------------------------------------
         */

        pagesHtml =
            newPages;
    }


    /*
     * ============================================================
     * INITIALISATION
     * ============================================================
     */

    onMount(() => {

        paginate();


        const observer =
            new ResizeObserver(() => {

                paginate();

            });


        if (sourceContainer) {

            observer.observe(
                sourceContainer
            );
        }


        return () => {

            observer.disconnect();

        };
    });


    /*
     * ============================================================
     * REACTIVITE
     * ============================================================
     */

    $: if (data) {

        paginate();

    }
</script>


<!-- ============================================================= -->
<!-- ZONE DE MESURE                                               -->
<!-- ============================================================= -->

<div
    class="hidden-measure"
    bind:this={sourceContainer}
>
    <svelte:component
        this={templateComponent}
        {data}
        {fullMode}
    />
</div>


<!-- ============================================================= -->
<!-- PAGES A4                                                     -->
<!-- ============================================================= -->

<A4Scaler>

    <div
        class="a4-pages"
        id="a4-pages"
    >

        {#each pagesHtml as pageHtml, i}

            <div
                class="a4-page"
                data-page={i + 1}
            >

                {@html pageHtml}

            </div>

        {/each}

    </div>

</A4Scaler>


<style>

    /*
     * ============================================================
     * ZONE DE MESURE
     * ============================================================
     */

    .hidden-measure {

        position: absolute;

        left: -99999px;

        top: 0;

        width: 210mm;

        visibility: hidden;

        pointer-events: none;

    }


    /*
     * ============================================================
     * PAGES
     * ============================================================
     */

    .a4-pages {

        display: flex;

        flex-direction: column;

        align-items: center;

        gap: 20px;

        padding: 20px 0;

    }


    /*
     * ============================================================
     * PAGE A4
     * ============================================================
     */

    .a4-page {

        width: 210mm;

        height: 297mm;

        min-height: 297mm;

        padding: 12mm;

        box-sizing: border-box;

        background: white;

        overflow: hidden;

        box-shadow:
            0 10px 30px
            rgba(0, 0, 0, 0.15);

        border:
            1px solid
            #d1d4dad4;

        border-radius: 4px;

        page-break-after: always;

        break-after: page;

    }


    /*
     * ============================================================
     * ITEMS INDIVISIBLES
     * ============================================================
     */

    .a4-page :global(.cv-item) {

        break-inside: avoid;

        page-break-inside: avoid;

    }


    /*
     * ============================================================
     * SECTIONS
     * ============================================================
     *
     * Une section peut continuer sur plusieurs pages.
     */

    .a4-page :global(.cv-section) {

        break-inside: auto;

        page-break-inside: auto;

    }


    /*
     * ============================================================
     * PRINT
     * ============================================================
     */

    @media print {

        .a4-pages {

            gap: 0;

            padding: 0;

        }


        .a4-page {

            width: 210mm;

            height: 297mm;

            min-height: 297mm;

            box-shadow: none;

            border: none;

            border-radius: 0;

            page-break-after: always;

            break-after: page;

        }

    }

</style>