<script>
    import { cvStore } from '$lib/stores/cvStore';
    import A4Paginator from '$lib/components/A4Paginator.svelte';
    import ClassicTemplate from './templates/ClassicTemplate.svelte';
    import ModernTemplate from './templates/ModernTemplate.svelte';
    import MinimalTemplate from './templates/MinimalTemplate.svelte';
    import AtmosphericTemplate from './templates/AtmosphericTemplate.svelte';
    import CartoonTemplate from './templates/CartoonTemplate.svelte';
    import BloomTemplate from './templates/BloomTemplate.svelte';
    import TerminalTemplate from './templates/TerminalTemplate.svelte';
    import FeminineTemplate from './templates/FeminineTemplate.svelte';
    import ShinobiTemplate from './templates/ShinobiTemplate.svelte';

    export let fullMode = false;

    let store;
    cvStore.subscribe(value => store = value);

    const templateComponents = {
        classic: ClassicTemplate,
        modern: ModernTemplate,
        minimal: MinimalTemplate,
        atmospheric: AtmosphericTemplate,
        cartoon: CartoonTemplate,
        shinobi: ShinobiTemplate,
        bloom: BloomTemplate,
        terminal: TerminalTemplate,
        feminine: FeminineTemplate
    };
</script>

<div class="preview-container {fullMode ? 'w-full' : 'w-[210mm]'}">
    {#if store}
        <A4Paginator
            data={store}
            templateComponent={templateComponents[store.selectedTemplate] || templateComponents.classic}
            {fullMode}
            fitWidth={fullMode}
        />
    {/if}
</div>