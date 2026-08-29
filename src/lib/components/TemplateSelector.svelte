<!-- $lib/components/TemplateSelector.svelte -->
<script>
    import { onMount, tick } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { cvStore } from '$lib/stores/cvStore';
    import { templates } from '$lib/utils/templates';
    import Icon from '@iconify/svelte';

    const dispatch = createEventDispatcher();
    let isMounted = false;
    let isLoading = false;

    $: if (isMounted && $cvStore.selectedTemplate) {
        localStorage.setItem('selectedTemplate', $cvStore.selectedTemplate);
    }

    onMount(async () => {
        const saved = localStorage.getItem('selectedTemplate');
        if (saved && templates.some(t => t.id === saved)) {
            cvStore.update(s => ({ ...s, selectedTemplate: saved }));
        }
        isMounted = true;

        await tick();
        scrollToSelectedTemplate();
    });

    function scrollToSelectedTemplate() {
        const selectedId = $cvStore.selectedTemplate;
        if (!selectedId) return;
        const element = document.querySelector(`[data-template-id="${selectedId}"]`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function selectTemplate(id) {
        cvStore.update(s => ({ ...s, selectedTemplate: id }));
    }

    function confirmSelection() {
        if (isLoading) return;
        isLoading = true;

        setTimeout(() => {
            dispatch('selectTemplate', { templateId: $cvStore.selectedTemplate });
            isLoading = false;
        }, 300);
    }
</script>

<div class="mb-6 relative">
    <h3 class="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Modèles de CV</h3>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {#each templates as template}
            <button
                type="button"
                data-template-id={template.id}
                class="relative p-3 rounded-xl border-2 transition-all text-left
                    {$cvStore.selectedTemplate === template.id
                        ? 'border-black bg-neutral-100 shadow-sm'
                        : 'border-neutral-200 hover:border-black/50'}"
                on:click={() => selectTemplate(template.id)}
            >
                <div class="aspect-[210/297] bg-white rounded border border-neutral-300 mb-2 overflow-hidden">
                    <img 
                        src={template.thumbnail} 
                        alt={`Aperçu du modèle ${template.label}`}
                        class="w-full h-full object-cover"
                    />
                </div>
                <p class="text-xs font-bold uppercase tracking-wider">{template.label}</p>
                <p class="text-[10px] text-neutral-500 mt-0.5">{template.description}</p>
                {#if $cvStore.selectedTemplate === template.id}
                    <span class="absolute top-2 right-2 w-4 h-4 bg-black rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </span>
                {/if}
            </button>
        {/each}
    </div>

    <!-- Bouton fixe "Choisir ce modèle" (apparaît uniquement si un modèle est sélectionné) -->
    {#if $cvStore.selectedTemplate}
        <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-30">
            <button
                type="button"
                on:click={confirmSelection}
                class="bg-black text-white px-8 py-3 rounded-full font-black uppercase text-sm tracking-wider shadow-lg hover:bg-neutral-800 transition-colors flex items-center gap-2"
            >
                {#if isLoading}
                    <Icon icon="mdi:loading" class="w-5 h-5 animate-spin" />
                    <span>Chargement...</span>
                {:else}
                    <Icon icon="mdi:check" class="w-5 h-5" />
                    <span>Choisir ce modèle</span>
                {/if}
            </button>
        </div>
    {/if}
</div>