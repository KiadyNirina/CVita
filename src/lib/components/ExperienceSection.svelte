<script>
    import { cvStore, addWorkExperience } from '$lib/stores/cvStore';
    import { formatToMMYYYY , parseFromMMYYYY } from '$lib/utils/dateUtils';
    
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

<div class="bg-white p-6 rounded-lg shadow">
    <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Expérience Professionnelle</h2>
        <button
            on:click={addWorkExperience}
            class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
        >
            + Ajouter une expérience
        </button>
    </div>
    
    {#if $cvStore.workExperience.length === 0}
        <div class="bg-gray-50 p-4 rounded text-center text-gray-500">
            Aucune expérience ajoutée
        </div>
    {:else}
        <div class="space-y-6">
            {#each $cvStore.workExperience as exp (exp.id)}
                <div class="bg-white p-4 rounded border border-gray-200 group">
                    <div class="flex justify-between mb-2">
                        <h3 class="font-medium">
                            {#if exp.jobTitle}
                                {exp.jobTitle}
                            {:else}
                                (Nouvelle expérience)
                            {/if}
                        </h3>
                        <button
                            on:click={() => removeExperience(exp.id)}
                            class="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            Supprimer
                        </button>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                            <label class="block mb-1">Poste occupé*</label>
                            <input
                                type="text"
                                value={exp.jobTitle}
                                on:input={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                                placeholder="Développeur Frontend"
                                class="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label class="block mb-1">Employeur*</label>
                            <input
                                type="text"
                                value={exp.employer}
                                on:input={(e) => updateExperience(exp.id, 'employer', e.target.value)}
                                placeholder="Nom de l'entreprise"
                                class="w-full border rounded px-3 py-2"
                            />
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                            <label class="block mb-1">Date de début*</label>
                            <input
                                type="text"
                                value={formatToMMYYYY(exp.startDate)}
                                on:input={(e) => handleDateInput(exp.id, 'startDate', e.target.value)}
                                placeholder="MM/AAAA"
                                class="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label class="block mb-1">Date de fin</label>
                            <input
                                type="text"
                                value={formatToMMYYYY(exp.endDate)}
                                on:input={(e) => handleDateInput(exp.id, 'endDate', e.target.value)}
                                placeholder="MM/AAAA"
                                disabled={exp.current}
                                class="w-full border rounded px-3 py-2 disabled:bg-gray-100"
                            />
                        </div>
                        <div class="flex items-end">
                            <label class="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={exp.current}
                                    on:change={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                    class="rounded text-blue-600 focus:ring-blue-500"
                                />
                                <span>Poste actuel</span>
                            </label>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block mb-1">Description</label>
                        <textarea
                            value={exp.description}
                            on:input={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            placeholder="Décrivez vos responsabilités et réalisations..."
                            class="w-full border rounded px-3 py-2 min-h-[80px]"
                        ></textarea>
                        <p class="text-xs text-gray-500 mt-1">
                            Utilisez des verbes d'action et incluez des résultats quantifiables si possible.
                        </p>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>