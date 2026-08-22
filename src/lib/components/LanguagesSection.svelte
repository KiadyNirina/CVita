<script>
    import { cvStore } from '$lib/stores/cvStore';

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

<div class="bg-white rounded-2xl border-2 border-neutral-200 p-6 shadow-sm">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
        <div>
            <h2 class="text-xl font-bold text-neutral-900 tracking-tight">Langues</h2>
            <p class="text-xs text-neutral-500 font-medium">Vos compétences linguistiques</p>
        </div>
        <span class="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            {$cvStore.languages.length} renseignée{$cvStore.languages.length > 1 ? 's' : ''}
        </span>
    </div>

    <!-- Liste des langues -->
    <div class="space-y-2.5 mb-6">
        {#each $cvStore.languages as lang (lang.id)}
            <div class="flex items-center justify-between p-3 rounded-xl border-2 border-neutral-200 bg-neutral-50/50 hover:border-neutral-400 transition-all">
                <div class="flex items-center gap-3">
                    <span class="font-bold text-sm text-neutral-900">{lang.name}</span>
                    
                    <!-- Badge Niveau -->
                    <span class={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${proficiencyMap[lang.proficiency]?.class || proficiencyMap.intermediate.class}`}>
                        {proficiencyMap[lang.proficiency]?.label || lang.proficiency}
                    </span>
                </div>

                <!-- Bouton Suppression -->
                <button
                    type="button"
                    on:click={() => removeLanguage(lang.id)}
                    aria-label={`Supprimer ${lang.name}`}
                    class="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-lg border border-red-200 transition-all cursor-pointer"
                >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
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
                class="w-full rounded-xl border-2 border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:border-black focus:bg-white focus:outline-none transition-all"
                on:keydown={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
            />
        </div>

        <!-- Select Niveau -->
        <div>
            <label for="languageProficiencySelect" class="sr-only">Niveau</label>
            <select
                id="languageProficiencySelect"
                bind:value={proficiency}
                class="w-full sm:w-auto rounded-xl border-2 border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm font-bold text-neutral-900 focus:border-black focus:bg-white focus:outline-none transition-all cursor-pointer"
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
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-bold text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all cursor-pointer"
        >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Ajouter
        </button>
    </div>
</div>