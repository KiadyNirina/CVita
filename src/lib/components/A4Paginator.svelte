<script>
    import { onMount, tick } from 'svelte';

    export let data;
    export let templateComponent;
    export let fullMode = false;

    const MM_TO_PX = 96 / 25.4; // Conversion mm → pixels (96 dpi)
    const PAGE_WIDTH_MM = 210;
    const PAGE_HEIGHT_MM = 297;
    const PAGE_PADDING_MM = 12; // padding haut/bas de votre template
    const CONTENT_HEIGHT_PX = (PAGE_HEIGHT_MM - 2 * PAGE_PADDING_MM) * MM_TO_PX;

    let sourceContainer;
    let pagesHtml = [];
    let paginationToken = 0;

    async function paginate() {
        const token = ++paginationToken;
        await tick();
        if (token !== paginationToken) return;
        if (!sourceContainer || !data) return;

        // Le template rendu dans la zone cachée
        const root = sourceContainer.firstElementChild;
        if (!root) return;

        const blocks = Array.from(root.children);
        if (blocks.length === 0) return;

        // Mesure de chaque bloc (section) avec son espace vertical réel
        const blockInfos = blocks.map((block, i) => {
            const rect = block.getBoundingClientRect();
            const style = getComputedStyle(block);
            const marginBottom = parseFloat(style.marginBottom) || 0;
            let space;
            if (i < blocks.length - 1) {
                const nextRect = blocks[i + 1].getBoundingClientRect();
                space = nextRect.top - rect.top; // inclut la marge basse
            } else {
                space = rect.height + marginBottom;
            }
            return { block, space };
        });

        const newPagesHtml = [];
        let currentBlocks = [];
        let currentHeight = 0;

        for (const info of blockInfos) {
            // Si le bloc ne rentre pas dans la page courante, on crée une nouvelle page
            if (currentHeight + info.space > CONTENT_HEIGHT_PX && currentBlocks.length > 0) {
                newPagesHtml.push(currentBlocks.map(b => b.outerHTML).join(''));
                currentBlocks = [];
                currentHeight = 0;
            }
            currentBlocks.push(info.block);
            currentHeight += info.space;
        }

        if (currentBlocks.length > 0) {
            newPagesHtml.push(currentBlocks.map(b => b.outerHTML).join(''));
        }

        pagesHtml = newPagesHtml;
    }

    onMount(() => {
        paginate();
    });

    // Relance la pagination quand les données changent
    $: if (data) {
        paginate();
    }
</script>

<!-- Zone cachée pour mesurer le contenu -->
<div class="hidden-measure" bind:this={sourceContainer}>
    <svelte:component this={templateComponent} {data} {fullMode} />
</div>

<!-- Pages A4 affichées -->
<div id="a4-pages" class="a4-pages">
    {#each pagesHtml as pageHtml, i}
        <div class="a4-page" style="font-family: 'Times New Roman', serif;">
            {@html pageHtml}
        </div>
    {/each}
</div>

<style>
    .hidden-measure {
        position: absolute;
        left: -9999px;
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
        padding: 12mm;
        background: white;
        box-sizing: border-box;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        border: 1px solid #e5e7eb;
        border-radius: 4px;
        page-break-after: always;      /* Saut de page à l’impression */
        break-inside: avoid;
    }

    @media print {
        .a4-pages {
            gap: 0;
            padding: 0;
        }
        .a4-page {
            box-shadow: none;
            border: none;
            border-radius: 0;
            page-break-after: always;
        }
    }
</style>