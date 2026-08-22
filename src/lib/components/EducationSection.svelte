<script>
    import { cvStore } from '$lib/stores/cvStore';
    import { formatToMMYYYY, parseFromMMYYYY } from '$lib/utils/dateUtils';

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

    const handleDateInput = (id, field, value) => {
        const parsedValue = field.endsWith('Date') ? parseFromMMYYYY(value) : value;
        updateEducation(id, field, parsedValue);
    };
</script>

<div class="bg-white rounded-2xl border-2 border-neutral-200 p-6 shadow-sm">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
        <div>
            <h2 class="text-xl font-bold text-neutral-900 tracking-tight">Formation & Diplômes</h2>
            <p class="text-xs text-neutral-500 font-medium">Votre parcours académique et certifications</p>
        </div>

        <button
            type="button"
            on:click={addEducation}
            class="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-bold text-white hover:bg-neutral-800 transition-all cursor-pointer shadow-sm"
        >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
            </svg>
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
                <div class="relative bg-neutral-50/50 rounded-xl border-2 border-neutral-200 p-5 space-y-4 hover:border-neutral-400 transition-all">
                    <!-- Card Header -->
                    <div class="flex items-center justify-between pb-3 border-b border-neutral-200">
                        <div class="flex items-center gap-2">
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
                            class="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-200 transition-all cursor-pointer"
                        >
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
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
                                class="w-full rounded-xl border-2 border-neutral-300 bg-white px-3.5 py-2 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-all"
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
                                class="w-full rounded-xl border-2 border-neutral-300 bg-white px-3.5 py-2 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-all"
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
                                class="w-full rounded-xl border-2 border-neutral-300 bg-white px-3.5 py-2 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
                                Date de début*
                            </label>
                            <input
                                type="text"
                                value={formatToMMYYYY(edu.startDate)}
                                on:input={(e) => handleDateInput(edu.id, 'startDate', e.target.value)}
                                placeholder="MM/AAAA"
                                class="w-full rounded-xl border-2 border-neutral-300 bg-white px-3.5 py-2 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
                                Date de fin
                            </label>
                            <input
                                type="text"
                                value={formatToMMYYYY(edu.endDate)}
                                on:input={(e) => handleDateInput(edu.id, 'endDate', e.target.value)}
                                placeholder="MM/AAAA"
                                disabled={edu.current}
                                class="w-full rounded-xl border-2 border-neutral-300 bg-white px-3.5 py-2 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-all disabled:bg-neutral-200 disabled:text-neutral-500 disabled:border-neutral-300"
                            />
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