<script>
    import { cvStore } from '$lib/stores/cvStore';

    let newLanguage = '';
    let proficiency = 'intermediate';

    const addLanguage = () => {
        if (newLanguage.trim()) {
            $cvStore.languages = [...$cvStore.languages, {
                id: Date.now(),
                name: newLanguage.trim(),
                proficiency: proficiency
            }];
            newLanguage = '';
        }
    };

    const removeLanguage = (id) => {
        $cvStore.languages = $cvStore.languages.filter(lang => lang.id !== id);
    };
</script>

<div class="bg-white p-6 rounded-lg shadow">
    <h2 class="text-xl font-semibold mb-4">Langues</h2>
    
    <div class="space-y-3 mb-4">
        {#each $cvStore.languages as lang (lang.id)}
            <div class="flex items-center justify-between p-3 border rounded-lg">
                <div class="flex-1">
                    <span class="font-medium">{lang.name}</span>
                    <span class="text-sm text-gray-500 ml-2">
                        ({#if lang.proficiency === 'basic'}Notions
                        {:else if lang.proficiency === 'intermediate'}Intermédiaire
                        {:else if lang.proficiency === 'fluent'}Courant
                        {:else if lang.proficiency === 'native'}Langue maternelle
                        {/if})
                    </span>
                </div>
                <button
                    on:click={() => removeLanguage(lang.id)}
                    class="text-red-500 hover:text-red-700"
                >
                    Supprimer
                </button>
            </div>
        {/each}
    </div>
    
    <div class="flex flex-col sm:flex-row gap-3">
        <input
            bind:value={newLanguage}
            placeholder="Ajouter une langue (ex: Anglais)"
            class="flex-1 border rounded px-3 py-2"
            on:keydown={(e) => e.key === 'Enter' && addLanguage()}
        />
        
        <select
            bind:value={proficiency}
            class="border rounded px-3 py-2 text-gray-700"
        >
            <option value="basic">Notions</option>
            <option value="intermediate">Intermédiaire</option>
            <option value="fluent">Courant</option>
            <option value="native">Langue maternelle</option>
        </select>
        
        <button
            on:click={addLanguage}
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
            Ajouter
        </button>
    </div>
</div>