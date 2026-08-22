<!-- $lib/components/TemplateSelector.svelte -->
<script>
    import { cvStore } from '$lib/stores/cvStore';
    import { templates } from '$lib/utils/templates';

    let store;
    cvStore.subscribe(value => store = value);

    function selectTemplate(id) {
        cvStore.update(s => ({ ...s, selectedTemplate: id }));
    }
</script>

<div class="mb-6">
    <h3 class="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Modèles de CV</h3>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {#each templates as template}
            <button
                type="button"
                class="relative p-3 rounded-xl border-2 transition-all text-left
                    {store.selectedTemplate === template.id
                        ? 'border-black bg-neutral-100 shadow-sm'
                        : 'border-neutral-200 hover:border-black/50'}"
                on:click={() => selectTemplate(template.id)}
            >
                <div class="aspect-[210/297] bg-white rounded border border-neutral-300 mb-2 flex items-center justify-center text-xs text-neutral-400">
                    <span>Aperçu {template.label}</span>
                </div>
                <p class="text-xs font-bold uppercase tracking-wider">{template.label}</p>
                <p class="text-[10px] text-neutral-500 mt-0.5">{template.description}</p>
                {#if store.selectedTemplate === template.id}
                    <span class="absolute top-2 right-2 w-4 h-4 bg-black rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </span>
                {/if}
            </button>
        {/each}
    </div>
</div>