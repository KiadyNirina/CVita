<script>
    import { onMount, onDestroy } from 'svelte';

    export let pages = [];
    export let maxScale = 1;

    let container;
    let scale = 1;
    let contentHeight = 0;
    let resizeObserver;

    const A4_WIDTH_PX = 210 * 96 / 25.4;

    function updateScale() {
        if (!container) return;
        const availableWidth = container.clientWidth;
        if (availableWidth <= 0) return;

        let newScale = availableWidth / A4_WIDTH_PX;
        if (maxScale && newScale > maxScale) {
            newScale = maxScale;
        }
        scale = newScale;

        const inner = container.querySelector('.a4-scaler-content');
        if (inner) {
            contentHeight = inner.offsetHeight * scale;
        }
    }

    onMount(() => {
        updateScale();
        resizeObserver = new ResizeObserver(() => updateScale());
        resizeObserver.observe(container);
    });

    onDestroy(() => {
        resizeObserver?.disconnect();
    });
</script>

<div
    bind:this={container}
    class="a4-scaler-wrapper"
    style="height: {contentHeight}px; overflow: hidden;"
>
    <div
        class="a4-scaler-content"
        style="transform: scale({scale}); transform-origin: top left; width: {A4_WIDTH_PX}px;"
    >
        <slot />
    </div>
</div>

<style>
    .a4-scaler-wrapper {
        width: 100%;
        position: relative;
    }

    .a4-scaler-content {
        width: 210mm;
    }

    @media print {
        .a4-scaler-wrapper {
            height: auto !important;
            overflow: visible !important;
        }
        .a4-scaler-content {
            transform: none !important;
            width: 210mm !important;
        }
    }
</style>