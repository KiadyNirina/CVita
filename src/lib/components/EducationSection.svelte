<script>
    import { onMount } from 'svelte';
    import { cvStore } from '$lib/stores/cvStore';
    import Icon from '@iconify/svelte';

    let dragItemId = null;
    let dragOverItemId = null;
    let isRestored = false;

    onMount(() => {
        const saved = localStorage.getItem('cvEducation');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    const valid = parsed.filter(edu => edu && typeof edu === 'object' && edu.id);
                    if (valid.length > 0) {
                        cvStore.update(s => ({ ...s, education: valid }));
                    }
                }
            } catch (e) {
                console.error('Erreur lors de la restauration des formations :', e);
            }
        }
        isRestored = true;
    });

    $: if (isRestored && $cvStore.education) {
        localStorage.setItem('cvEducation', JSON.stringify($cvStore.education));
    }

    const addEducation = () => {
        $cvStore.education = [
            ...$cvStore.education,
            {
                id: Date.now(),
                degree: '',
                institution: '',
                field: '',
                startDate: '',
                endDate: '',
                current: false
            }
        ];
    };

    const removeEducation = (id) => {
        $cvStore.education = $cvStore.education.filter(edu => edu.id !== id);
    };

    const updateEducation = (id, field, value) => {
        $cvStore.education = $cvStore.education.map(edu => {
            if (edu.id === id) {
                return { ...edu, [field]: value };
            }
            return edu;
        });
    };

    // Gestion du drag
    function handleDragStart(event, id) {
        dragItemId = id;
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', id);
    }

    function handleDragOver(event, id) {
        event.preventDefault();
        dragOverItemId = id;
        event.dataTransfer.dropEffect = 'move';
    }

    function handleDragLeave() {
        dragOverItemId = null;
    }

    function handleDrop(event, targetId) {
        event.preventDefault();
        const draggedId = dragItemId;
        if (draggedId && draggedId !== targetId) {
            const items = $cvStore.education;
            const draggedIndex = items.findIndex(edu => edu.id === draggedId);
            const targetIndex = items.findIndex(edu => edu.id === targetId);
            if (draggedIndex !== -1 && targetIndex !== -1) {
                const newItems = [...items];
                const [moved] = newItems.splice(draggedIndex, 1);
                newItems.splice(targetIndex, 0, moved);
                $cvStore.education = newItems;
            }
        }
        dragItemId = null;
        dragOverItemId = null;
    }

    function handleDragEnd() {
        dragItemId = null;
        dragOverItemId = null;
    }
</script>

<div class="bg-white rounded-2xl border-2 border-neutral-200 p-4 sm:p-6 shadow-sm">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
            <h2 class="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">Formation & Diplômes</h2>
            <p class="text-xs text-neutral-500 font-medium">Votre parcours académique et certifications</p>
        </div>

        <button
            type="button"
            on:click={addEducation}
            class="inline-flex items-center gap-2 rounded-xl bg-black px-3 py-2 text-xs sm:px-4 sm:py-2.5 font-bold text-white hover:bg-neutral-800 transition-all cursor-pointer shadow-sm"
        >
            <Icon icon="mdi:plus" class="w-4 h-4" />
            Ajouter un diplôme
        </button>
    </div>

    <!-- Empty State -->
    {#if $cvStore.education.length === 0}
        <div class="py-8 text-center border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50">
            <p class="text-sm font-semibold text-neutral-600 mb-2">Aucune formation renseignée</p>
            <button
                type="button"
                on:click={addEducation}
                class="text-xs font-bold text-black underline underline-offset-4 hover:text-neutral-700"
            >
                Ajouter votre premier diplôme
            </button>
        </div>
    {:else}
        <!-- Education List -->
        <div class="space-y-6">
            {#each $cvStore.education as edu, index (edu.id)}
                <div
                    class="relative bg-neutral-50/50 rounded-xl border-2 p-4 sm:p-5 space-y-4 transition-all {dragOverItemId === edu.id ? 'border-black border-dashed bg-neutral-100' : 'border-neutral-200 hover:border-neutral-400'}"
                    on:dragover={(e) => handleDragOver(e, edu.id)}
                    on:dragleave={handleDragLeave}
                    on:drop={(e) => handleDrop(e, edu.id)}
                    on:dragend={handleDragEnd}
                >
                    <!-- Card Header -->
                    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-neutral-200">
                        <div class="flex items-center gap-2">
                            <!-- Poignée de drag -->
                            <button
                                type="button"
                                draggable={true}
                                on:dragstart={(e) => handleDragStart(e, edu.id)}
                                class="cursor-grab active:cursor-grabbing touch-none text-neutral-400 hover:text-black focus:outline-none"
                                aria-label="Réorganiser la formation"
                            >
                                <Icon icon="mdi:drag" class="w-5 h-5" />
                            </button>

                            <span class="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
                                {index + 1}
                            </span>
                            <h3 class="font-bold text-neutral-900 text-base">
                                {edu.degree || 'Nouvelle formation'}
                            </h3>
                        </div>

                        <button
                            type="button"
                            on:click={() => removeEducation(edu.id)}
                            class="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg border border-red-200 transition-all cursor-pointer"
                        >
                            <Icon icon="mdi:delete" class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            Supprimer
                        </button>
                    </div>

                    <!-- Row 1: Degree & Institution -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
                                Diplôme ou Titre*
                            </label>
                            <input
                                type="text"
                                value={edu.degree}
                                on:input={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                placeholder="Ex: Master en Informatique"
                                class="w-full rounded-xl border-2 border-neutral-300 bg-white px-3 py-2 sm:px-3.5 sm:py-2 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
                                Établissement*
                            </label>
                            <input
                                type="text"
                                value={edu.institution}
                                on:input={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                placeholder="Ex: Université Paris-Saclay"
                                class="w-full rounded-xl border-2 border-neutral-300 bg-white px-3 py-2 sm:px-3.5 sm:py-2 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    <!-- Row 2: Field & Dates -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
                                Domaine d'étude
                            </label>
                            <input
                                type="text"
                                value={edu.field}
                                on:input={(e) => updateEducation(edu.id, 'field', e.target.value)}
                                placeholder="Ex: Génie Logiciel"
                                class="w-full rounded-xl border-2 border-neutral-300 bg-white px-3 py-2 sm:px-3.5 sm:py-2 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
                                Date de début*
                            </label>
                            <input
                                type="date"
                                value={edu.startDate || ''}
                                on:input={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                                class="w-full rounded-xl border-2 border-neutral-300 bg-white px-3 py-2 sm:px-3.5 sm:py-2 text-sm font-semibold text-neutral-900 focus:border-black focus:outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
                                Date de fin
                            </label>
                            {#if edu.current}
                                <div class="w-full rounded-xl border-2 border-neutral-300 bg-neutral-100 px-3 py-2 sm:px-3.5 sm:py-2 text-sm font-semibold text-neutral-700">
                                    Présent
                                </div>
                            {:else}
                                <input
                                    type="date"
                                    value={edu.endDate || ''}
                                    on:input={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                    class="w-full rounded-xl border-2 border-neutral-300 bg-white px-3 py-2 sm:px-3.5 sm:py-2 text-sm font-semibold text-neutral-900 focus:border-black focus:outline-none transition-all"
                                />
                            {/if}
                        </div>
                    </div>

                    <!-- Footer: Checkbox -->
                    <div class="pt-1">
                        <label class="inline-flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={edu.current}
                                on:change={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                                class="w-4 h-4 rounded border-2 border-neutral-400 text-black focus:ring-0 focus:ring-offset-0 cursor-pointer accent-black"
                            />
                            <span class="text-xs font-bold text-neutral-900">Formation actuellement en cours</span>
                        </label>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>