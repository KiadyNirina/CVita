<!-- src/lib/components/A4Paginator.svelte -->
<script>
    import { onMount, tick } from 'svelte';
    import A4Scaler from '$lib/components/A4Scaler.svelte';

    export let data;
    export let templateComponent;
    export let fullMode = false;

    const MM_TO_PX = 96 / 25.4;
    const PAGE_WIDTH_MM = 210;
    const PAGE_HEIGHT_MM = 297;
    const PAGE_PADDING_MM = 12;

    const PAGE_HEIGHT_PX = PAGE_HEIGHT_MM * MM_TO_PX;
    const PAGE_PADDING_PX = PAGE_PADDING_MM * MM_TO_PX;

    // Hauteur réellement disponible à l'intérieur d'une page A4
    const CONTENT_HEIGHT_PX =
        PAGE_HEIGHT_PX - (PAGE_PADDING_PX * 2);

    let sourceContainer;
    let pagesHtml = [];
    let paginationToken = 0;

    function getOuterHeight(element) {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);

        const marginTop = parseFloat(style.marginTop) || 0;
        const marginBottom = parseFloat(style.marginBottom) || 0;

        return rect.height + marginTop + marginBottom;
    }

    function cloneHtml(element) {
        return element.outerHTML;
    }

    /**
     * Retourne les sections et leurs éléments internes.
     *
     * Une section peut donc être répartie sur plusieurs pages.
     */
    function extractStructure(root) {
        const children = Array.from(root.children);

        const result = [];

        for (const element of children) {
            // Header : bloc indivisible
            if (element.matches('.cv-header')) {
                result.push({
                    type: 'standalone',
                    element
                });
                continue;
            }

            // Section CV
            if (element.matches('.cv-section')) {
                const content = element.querySelector('.cv-section-items');

                // Section sans items internes
                if (!content) {
                    result.push({
                        type: 'section',
                        section: element,
                        items: []
                    });
                    continue;
                }

                const items = Array.from(
                    content.querySelectorAll(':scope > .cv-item')
                );

                result.push({
                    type: 'section',
                    section: element,
                    content,
                    items
                });

                continue;
            }

            // Compatibilité avec les éléments qui n'ont pas encore
            // reçu les classes cv-header / cv-section.
            result.push({
                type: 'standalone',
                element
            });
        }

        return result;
    }

    /**
     * Récupère uniquement le titre d'une section.
     */
    function getSectionHeader(section) {
        const title = section.querySelector('.cv-section-title');

        if (!title) {
            return '';
        }

        return title.outerHTML;
    }

    /**
     * Récupère le HTML d'une section avec seulement
     * les éléments qui doivent apparaître sur la page.
     */
    function buildSectionHtml(section, items) {
        const sectionClone = section.cloneNode(true);

        const contentClone =
            sectionClone.querySelector('.cv-section-items');

        if (!contentClone) {
            return sectionClone.outerHTML;
        }

        contentClone.innerHTML = items
            .map(item => item.outerHTML)
            .join('');

        return sectionClone.outerHTML;
    }

    /**
     * Calcule la hauteur du titre d'une section.
     */
    function getSectionHeaderHeight(section) {
        const title = section.querySelector('.cv-section-title');

        if (!title) {
            return 0;
        }

        return getOuterHeight(title);
    }

    async function paginate() {
        const token = ++paginationToken;

        await tick();

        if (token !== paginationToken) return;
        if (!sourceContainer || !data) return;

        const root = sourceContainer.firstElementChild;

        if (!root) return;

        const structure = extractStructure(root);

        if (!structure.length) {
            pagesHtml = [];
            return;
        }

        const newPages = [];

        let currentPage = [];
        let currentHeight = 0;

        function pushPage() {
            if (currentPage.length > 0) {
                newPages.push(currentPage.join(''));
            }

            currentPage = [];
            currentHeight = 0;
        }

        function addStandalone(element) {
            const height = getOuterHeight(element);

            if (
                currentPage.length > 0 &&
                currentHeight + height > CONTENT_HEIGHT_PX
            ) {
                pushPage();
            }

            currentPage.push(cloneHtml(element));
            currentHeight += height;
        }

        for (const block of structure) {
            /**
             * HEADER / bloc simple
             */
            if (block.type === 'standalone') {
                addStandalone(block.element);
                continue;
            }

            /**
             * SECTION
             */
            const section = block.section;
            const items = block.items;

            // Section sans items internes
            if (!items.length) {
                const height = getOuterHeight(section);

                if (
                    currentPage.length > 0 &&
                    currentHeight + height > CONTENT_HEIGHT_PX
                ) {
                    pushPage();
                }

                currentPage.push(cloneHtml(section));
                currentHeight += height;

                continue;
            }

            /*
             * On mesure le titre de section.
             *
             * Pour les sections qui continuent sur une autre page,
             * le titre sera automatiquement remis.
             */
            const sectionHeaderHeight =
                getSectionHeaderHeight(section);

            let firstItemOfSection = true;

            for (const item of items) {
                const itemHeight = getOuterHeight(item);

                /*
                 * Premièrement :
                 * si c'est le premier élément de la section,
                 * il faut prendre en compte le titre.
                 */
                if (firstItemOfSection) {
                    const requiredHeight =
                        sectionHeaderHeight + itemHeight;

                    /*
                     * La section ne commence pas sur la page courante.
                     * On la place sur une nouvelle page si nécessaire.
                     */
                    if (
                        currentPage.length > 0 &&
                        currentHeight + requiredHeight > CONTENT_HEIGHT_PX
                    ) {
                        pushPage();
                    }

                    /*
                     * Si même le titre + l'item ne rentrent pas,
                     * on place quand même l'item seul.
                     *
                     * Cela évite une boucle infinie avec un élément
                     * exceptionnellement grand.
                     */
                    if (
                        currentHeight === 0 &&
                        requiredHeight > CONTENT_HEIGHT_PX
                    ) {
                        currentPage.push(
                            buildSectionHtml(section, [item])
                        );

                        currentHeight += requiredHeight;
                        firstItemOfSection = false;

                        continue;
                    }

                    /*
                     * On ajoute temporairement l'item.
                     * La section complète sera reconstruite ensuite.
                     */
                    currentPage.push(
                        buildSectionHtml(section, [item])
                    );

                    currentHeight += requiredHeight;
                    firstItemOfSection = false;

                    continue;
                }

                /*
                 * Les éléments suivants de la même section.
                 */
                if (
                    currentHeight + itemHeight > CONTENT_HEIGHT_PX
                ) {
                    /*
                     * Nouvelle page.
                     *
                     * On répète le titre de la section en mettant
                     * l'élément suivant dans une nouvelle section.
                     */
                    pushPage();

                    const requiredHeight =
                        sectionHeaderHeight + itemHeight;

                    currentPage.push(
                        buildSectionHtml(section, [item])
                    );

                    currentHeight += requiredHeight;

                    continue;
                }

                /*
                 * Il faut maintenant fusionner l'item à la section
                 * déjà présente sur la page.
                 *
                 * On remplace le dernier HTML de la page.
                 */
                const lastIndex = currentPage.length - 1;

                if (lastIndex >= 0) {
                    const currentSectionHtml =
                        currentPage[lastIndex];

                    /*
                     * On reconstruit la section à partir des items
                     * déjà présents + le nouvel item.
                     *
                     * Pour garder le système simple, on utilise
                     * les items déjà présents dans currentPage.
                     */
                    const parser = new DOMParser();

                    const parsed =
                        parser.parseFromString(
                            currentSectionHtml,
                            'text/html'
                        );

                    const existingSection =
                        parsed.body.firstElementChild;

                    const existingItems =
                        existingSection
                            ?.querySelector('.cv-section-items');

                    if (existingItems) {
                        existingItems.insertAdjacentHTML(
                            'beforeend',
                            item.outerHTML
                        );

                        currentPage[lastIndex] =
                            existingSection.outerHTML;
                    } else {
                        currentPage.push(
                            buildSectionHtml(section, [item])
                        );
                    }
                }

                currentHeight += itemHeight;
            }
        }

        pushPage();

        pagesHtml = newPages;
    }

    onMount(() => {
        paginate();

        const observer = new ResizeObserver(() => {
            paginate();
        });

        if (sourceContainer) {
            observer.observe(sourceContainer);
        }

        return () => {
            observer.disconnect();
        };
    });

    // Recalcule lorsque les données du CV changent
    $: if (data) {
        paginate();
    }
</script>

<!--
    Zone invisible utilisée uniquement pour mesurer
    le vrai contenu du template.
-->
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

<!-- Pages A4 -->
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
    .hidden-measure {
        position: absolute;
        left: -99999px;
        top: 0;
        width: 210mm;
        visibility: hidden;
        pointer-events: none;
    }

    .a4-pages {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 20px 0;
    }

    .a4-page {
        width: 210mm;
        height: 297mm;
        min-height: 297mm;
        padding: 12mm;

        box-sizing: border-box;

        background: white;

        overflow: hidden;

        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

        border: 1px solid #d1d4dad4;
        border-radius: 4px;

        page-break-after: always;
        break-after: page;

        /*
         * Important :
         * on ne met PAS break-inside: avoid sur toute la page
         * car le contenu est déjà découpé par notre paginator.
         */
    }

    /*
     * Les éléments individuels du CV ne doivent pas être coupés
     * entre deux pages lors de l'impression.
     */
    .a4-page :global(.cv-item) {
        break-inside: avoid;
        page-break-inside: avoid;
    }

    /*
     * Une section peut continuer sur la page suivante.
     */
    .a4-page :global(.cv-section) {
        break-inside: auto;
        page-break-inside: auto;
    }

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