<script>
    import { cvStore, addWorkExperience } from '$lib/stores/cvStore';
    import { formatToMMYYYY, parseFromMMYYYY } from '$lib/utils/dateUtils';
    import Icon from '@iconify/svelte';

    const removeExperience = (id) => {
        $cvStore.workExperience = $cvStore.workExperience.filter(exp => exp.id !== id);
    };

    const updateExperience = (id, field, value) => {
        $cvStore.workExperience = $cvStore.workExperience.map(exp => {
            if (exp.id === id) {
                return { ...exp, [field]: value };
            }
            return exp;
        });
    };

    const handleDateInput = (id, field, value) => {
        const parsedValue = field.endsWith('Date') ? parseFromMMYYYY(value) : value;
        updateExperience(id, field, parsedValue);
    };
</script>

<div class="bg-white rounded-2xl border-2 border-neutral-200 p-4 sm:p-6 shadow-sm">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
            <h2 class="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">Expériences Professionnelles</h2>
            <p class="text-xs text-neutral-500 font-medium">Vos parcours et réalisations clés</p>
        </div>

        <button
            type="button"
            on:click={addWorkExperience}
            class="inline-flex items-center gap-2 rounded-xl bg-black px-3 py-2 text-xs sm:px-4 sm:py-2.5 font-bold text-white hover:bg-neutral-800 transition-all cursor-pointer shadow-sm"
        >
            <Icon icon="mdi:plus" class="w-4 h-4" />
            Ajouter une expérience
        </button>
    </div>

    <!-- Empty State -->
    {#if $cvStore.workExperience.length === 0}
        <div class="py-8 text-center border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50">
            <p class="text-sm font-semibold text-neutral-600 mb-2">Aucune expérience renseignée</p>
            <button
                type="button"
                on:click={addWorkExperience}
                class="text-xs font-bold text-black underline underline-offset-4 hover:text-neutral-700"
            >
                Ajouter votre première expérience
            </button>
        </div>
    {:else}
        <!-- Experience List -->
        <div class="space-y-6">
            {#each $cvStore.workExperience as exp, index (exp.id)}
                <div class="relative bg-neutral-50/50 rounded-xl border-2 border-neutral-200 p-4 sm:p-5 space-y-4 hover:border-neutral-400 transition-all">
                    <!-- Card Top Header -->
                    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-neutral-200">
                        <div class="flex items-center gap-2">
                            <span class="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
                                {index + 1}
                            </span>
                            <h3 class="font-bold text-neutral-900 text-base">
                                {exp.jobTitle || '(Nouvelle expérience)'}
                            </h3>
                        </div>

                        <button
                            type="button"
                            on:click={() => removeExperience(exp.id)}
                            class="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg border border-red-200 transition-all cursor-pointer"
                        >
                            <Icon icon="mdi:delete" class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            Supprimer
                        </button>
                    </div>

                    <!-- Row 1: Job & Employer -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
                                Poste occupé*
                            </label>
                            <input
                                type="text"
                                value={exp.jobTitle}
                                on:input={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                                placeholder="Ex: Développeur Frontend"
                                class="w-full rounded-xl border-2 border-neutral-300 bg-white px-3 py-2 sm:px-3.5 sm:py-2 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
                                Employeur*
                            </label>
                            <input
                                type="text"
                                value={exp.employer}
                                on:input={(e) => updateExperience(exp.id, 'employer', e.target.value)}
                                placeholder="Ex: Nom de l'entreprise"
                                class="w-full rounded-xl border-2 border-neutral-300 bg-white px-3 py-2 sm:px-3.5 sm:py-2 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    <!-- Row 2: Dates & Current Position -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                            <label class="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
                                Date de début*
                            </label>
                            <input
                                type="text"
                                value={formatToMMYYYY(exp.startDate)}
                                on:input={(e) => handleDateInput(exp.id, 'startDate', e.target.value)}
                                placeholder="MM/AAAA"
                                class="w-full rounded-xl border-2 border-neutral-300 bg-white px-3 py-2 sm:px-3.5 sm:py-2 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
                                Date de fin
                            </label>
                            <input
                                type="text"
                                value={formatToMMYYYY(exp.endDate)}
                                on:input={(e) => handleDateInput(exp.id, 'endDate', e.target.value)}
                                placeholder="MM/AAAA"
                                disabled={exp.current}
                                class="w-full rounded-xl border-2 border-neutral-300 bg-white px-3 py-2 sm:px-3.5 sm:py-2 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-all disabled:bg-neutral-200 disabled:text-neutral-500 disabled:border-neutral-300"
                            />
                        </div>

                        <div class="pb-1">
                            <label class="inline-flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={exp.current}
                                    on:change={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                    class="w-4 h-4 rounded border-2 border-neutral-400 text-black focus:ring-0 focus:ring-offset-0 cursor-pointer accent-black"
                                />
                                <span class="text-xs font-bold text-neutral-900">Poste actuel</span>
                            </label>
                        </div>
                    </div>

                    <!-- Row 3: Description -->
                    <div>
                        <label class="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1.5">
                            Description
                        </label>
                        <textarea
                            value={exp.description}
                            on:input={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            placeholder="Missions principales, projets clés réalisés, technologies utilisées..."
                            rows="3"
                            class="w-full rounded-xl border-2 border-neutral-300 bg-white px-3 py-2.5 sm:px-3.5 sm:py-2.5 text-sm font-medium text-neutral-900 placeholder-neutral-400 focus:border-black focus:outline-none transition-all leading-relaxed"
                        ></textarea>
                        <p class="text-[11px] font-semibold text-neutral-500 mt-1">
                            💡 Conseil : Chiffrez vos résultats (ex: "Optimisation du temps de chargement de 40%").
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>