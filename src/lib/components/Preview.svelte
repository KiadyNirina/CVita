<script>
    import { cvStore } from '$lib/stores/cvStore';
    import ClassicTemplate from './templates/ClassicTemplate.svelte';
    import ModernTemplate from './templates/ModernTemplate.svelte';
    import MinimalTemplate from './templates/MinimalTemplate.svelte';

    export let fullMode = false;

    let store;
    cvStore.subscribe(value => store = value);

    const templateComponents = {
        classic: ClassicTemplate,
        modern: ModernTemplate,
        minimal: MinimalTemplate
    };
</script>

<div class="preview-container {fullMode ? 'w-full' : 'w-[210mm]'}">
    <svelte:component
        this={templateComponents[store.selectedTemplate] || templateComponents.classic}
        data={store}
        {fullMode}
    />
</div>