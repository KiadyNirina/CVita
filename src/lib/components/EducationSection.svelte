<script>
    import { cvStore } from '$lib/stores/cvStore';
    import { formatToMMYYYY, parseFromMMYYYY } from '$lib/utils/dateUtils';

    const addEducation = () => {
        $cvStore.education = [...$cvStore.education, {
            id: Date.now(),
            degree: '',
            institution: '',
            field: '',
            startDate: '',
            endDate: '',
            current: false
        }];
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

<div class="bg-white p-6 rounded-lg shadow">
    <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Formation</h2>
        <button
            on:click={addEducation}
            class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
        >
            + Ajouter un diplôme
        </button>
    </div>
    
    {#if $cvStore.education.length === 0}
        <div class="bg-gray-50 p-4 rounded text-center text-gray-500">
            Aucune formation ajoutée
        </div>
    {:else}
        <div class="space-y-4">
            {#each $cvStore.education as edu (edu.id)}
                <div class="border border-gray-200 rounded-lg p-4 group">
                    <div class="flex justify-between mb-3">
                        <h3 class="font-medium">
                            {#if edu.degree}
                                {edu.degree}
                            {:else}
                                Nouvelle formation
                            {/if}
                        </h3>
                        <button
                            on:click={() => removeEducation(edu.id)}
                            class="text-red-500 opacity-0 group-hover:opacity-100"
                        >
                            Supprimer
                        </button>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                            <label class="block text-sm text-gray-600 mb-1">Diplôme*</label>
                            <input
                                type="text"
                                value={edu.degree}
                                on:input={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                placeholder="Master en Informatique"
                                class="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label class="block text-sm text-gray-600 mb-1">Établissement*</label>
                            <input
                                type="text"
                                value={edu.institution}
                                on:input={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                placeholder="Université Paris-Saclay"
                                class="w-full border rounded px-3 py-2"
                            />
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                            <label class="block text-sm text-gray-600 mb-1">Domaine d'étude</label>
                            <input
                                type="text"
                                value={edu.field}
                                on:input={(e) => updateEducation(edu.id, 'field', e.target.value)}
                                placeholder="Informatique"
                                class="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label class="block text-sm text-gray-600 mb-1">Date de début*</label>
                             <input
                                type="text"
                                value={formatToMMYYYY(edu.startDate)}
                                on:input={(e) => handleDateInput(edu.id, 'startDate', e.target.value)}
                                placeholder="MM/AAAA"
                                class="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div>
                            <label class="block text-sm text-gray-600 mb-1">Date de fin</label>
                            <input
                                type="text"
                                value={formatToMMYYYY(edu.endDate)}
                                on:input={(e) => handleDateInput(edu.id, 'endDate', e.target.value)}
                                placeholder="MM/AAAA"
                                disabled={edu.current}
                                class="w-full border rounded px-3 py-2 disabled:bg-gray-100"
                            />
                        </div>
                    </div>
                    
                    <label class="flex items-center space-x-2 text-sm">
                        <input
                            type="checkbox"
                            checked={edu.current}
                            on:change={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                            class="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span>Formation en cours</span>
                    </label>
                </div>
            {/each}
        </div>
    {/if}
</div>