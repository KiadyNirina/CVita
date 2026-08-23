<script>
    import { cvStore } from '$lib/stores/cvStore';
    import Icon from '@iconify/svelte';

    let newLanguage = '';
    let proficiency = 'intermediate';

    const proficiencyMap = {
        basic: { label: 'Notions', class: 'bg-neutral-100 text-neutral-800 border-neutral-300' },
        intermediate: { label: 'Intermédiaire', class: 'bg-neutral-200 text-neutral-900 border-neutral-400' },
        fluent: { label: 'Courant', class: 'bg-neutral-900 text-white border-black' },
        native: { label: 'Langue maternelle', class: 'bg-black text-amber-400 border-black' }
    };

    const addLanguage = () => {
        if (newLanguage.trim()) {
            $cvStore.languages = [
                ...$cvStore.languages,
                {
                    id: Date.now(),
                    name: newLanguage.trim(),
                    proficiency: proficiency
                }
            ];
            newLanguage = '';
        }
    };

    const removeLanguage = (id) => {
        $cvStore.languages = $cvStore.languages.filter(lang => lang.id !== id);
    };
</script>

<div class="bg-white rounded-2xl border-2 border-neutral-200 p-4 sm:p-6 shadow-sm">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
        <div>
            <h2 class="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">Langues</h2>
            <p class="text-xs text-neutral-500 font-medium">Vos compétences linguistiques</p>
        </div>
        <span class="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            {$cvStore.languages.length} renseignée{$cvStore.languages.length > 1 ? 's' : ''}
        </span>
    </div>

    <!-- Liste des langues -->
    <div class="space-y-2.5 mb-6">
        {#each $cvStore.languages as lang (lang.id)}
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl border-2 border-neutral-200 bg-neutral-50/50 hover:border-neutral-400 transition-all">
                <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <span class="font-bold text-sm text-neutral-900">{lang.name}</span>
                    
                    <!-- Badge Niveau -->
                    <span class={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md border ${proficiencyMap[lang.proficiency]?.class || proficiencyMap.intermediate.class}`}>
                        {proficiencyMap[lang.proficiency]?.label || lang.proficiency}
                    </span>
                </div>

                <!-- Bouton Suppression -->
                <button
                    type="button"
                    on:click={() => removeLanguage(lang.id)}
                    aria-label={`Supprimer ${lang.name}`}
                    class="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 sm:px-2.5 sm:py-1 rounded-lg border border-red-200 transition-all cursor-pointer"
                >
                    <Icon icon="mdi:delete" class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Supprimer
                </button>
            </div>
        {:else}
            <div class="py-6 text-center border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50">
                <p class="text-sm font-semibold text-neutral-500">
                    Aucune langue ajoutée.
                </p>
            </div>
        {/each}
    </div>

    <!-- Formulaire d'ajout -->
    <div class="flex flex-col sm:flex-row gap-3">
        <!-- Champ Saisie -->
        <div class="flex-1">
            <label for="newLanguageInput" class="sr-only">Langue</label>
            <input
                id="newLanguageInput"
                type="text"
                bind:value={newLanguage}
                placeholder="Ex: Anglais, Espagnol, Allemand..."
                class="w-full rounded-xl border-2 border-neutral-300 bg-neutral-50 px-3 py-2 sm:px-4 sm:py-2.5 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:border-black focus:bg-white focus:outline-none transition-all"
                on:keydown={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
            />
        </div>

        <!-- Select Niveau -->
        <div>
            <label for="languageProficiencySelect" class="sr-only">Niveau</label>
            <select
                id="languageProficiencySelect"
                bind:value={proficiency}
                class="w-full sm:w-auto rounded-xl border-2 border-neutral-300 bg-neutral-50 px-3 py-2 sm:px-4 sm:py-2.5 text-sm font-bold text-neutral-900 focus:border-black focus:bg-white focus:outline-none transition-all cursor-pointer"
            >
                <option value="basic">Notions</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="fluent">Courant</option>
                <option value="native">Langue maternelle</option>
            </select>
        </div>

        <!-- Bouton Ajouter -->
        <button
            type="button"
            on:click={addLanguage}
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-2 text-sm sm:px-5 sm:py-2.5 font-bold text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all cursor-pointer"
        >
            <Icon icon="mdi:plus" class="w-4 h-4" />
            Ajouter
        </button>
    </div>
</div>