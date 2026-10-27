<script>
    import { cvStore } from '$lib/stores/cvStore';
    import Icon from '@iconify/svelte';

    let hobbies = $cvStore.hobbies || [];
    let newHobby = '';
    let isExpanded = true;

    // Suggestions de loisirs avec icônes associées
    const suggestions = [
        { name: 'Lecture', icon: 'mdi:book-open-page-variant' },
        { name: 'Musique', icon: 'mdi:music' },
        { name: 'Football', icon: 'mdi:soccer' },
        { name: 'Basketball', icon: 'mdi:basketball' },
        { name: 'Course à pied', icon: 'mdi:run' },
        { name: 'Vélo', icon: 'mdi:bike' },
        { name: 'Yoga', icon: 'mdi:yoga' },
        { name: 'Photographie', icon: 'mdi:camera' },
        { name: 'Peinture', icon: 'mdi:palette' },
        { name: 'Guitare', icon: 'mdi:guitar' },
        { name: 'Jeux vidéo', icon: 'mdi:gamepad-variant' },
        { name: 'Échecs', icon: 'mdi:chess-knight' },
        { name: 'Cuisine', icon: 'mdi:cooking' },
        { name: 'Voyages', icon: 'mdi:airplane' },
        { name: 'Randonnée', icon: 'mdi:mountain' },
        { name: 'Natation', icon: 'mdi:swim' },
        { name: 'Tennis', icon: 'mdi:tennis' },
        { name: 'Cinéma', icon: 'mdi:film' },
        { name: 'Programmation', icon: 'mdi:code-tags' },
        { name: 'Jardinage', icon: 'mdi:leaf' }
    ];

    // Vérifie si un loisir est déjà ajouté (insensible à la casse)
    function isAlreadyAdded(name) {
        return hobbies.some(h => h.name.toLowerCase() === name.toLowerCase());
    }

    // Ajoute une suggestion
    function addSuggestion(suggestion) {
        if (isAlreadyAdded(suggestion.name)) return;
        
        const hobby = {
            id: Date.now() + Math.random(),
            name: suggestion.name,
            icon: suggestion.icon
        };
        
        hobbies = [...hobbies, hobby];
        cvStore.update(cv => ({ ...cv, hobbies }));
    }

    // Ajoute un loisir personnalisé (sans icône)
    function addCustomHobby() {
        if (newHobby.trim() === '') return;
        if (isAlreadyAdded(newHobby.trim())) {
            newHobby = '';
            return;
        }
        
        // Vérifie si le loisir correspond à une suggestion existante
        const matchingSuggestion = suggestions.find(
            s => s.name.toLowerCase() === newHobby.trim().toLowerCase()
        );

        const hobby = {
            id: Date.now() + Math.random(),
            name: newHobby.trim(),
            icon: matchingSuggestion ? matchingSuggestion.icon : null // pas d'icône si personnalisé
        };
        
        hobbies = [...hobbies, hobby];
        cvStore.update(cv => ({ ...cv, hobbies }));
        newHobby = '';
    }

    function removeHobby(id) {
        hobbies = hobbies.filter(h => h.id !== id);
        cvStore.update(cv => ({ ...cv, hobbies }));
    }

    function handleKeydown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addCustomHobby();
        }
    }
</script>

<div class="rounded-2xl border-2 border-neutral-200 bg-white shadow-sm overflow-hidden">
    <!-- Header -->
    <button
        type="button"
        on:click={() => isExpanded = !isExpanded}
        class="w-full flex items-center justify-between p-5 bg-white hover:bg-neutral-50 transition-colors"
    >
        <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-50 border-2 border-purple-100">
                <Icon icon="mdi:heart-outline" class="w-5 h-5 text-purple-600" />
            </div>
            <div class="text-left">
                <h2 class="text-sm font-black text-black uppercase tracking-wider">Loisirs & Centres d'intérêt</h2>
                <p class="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                    {hobbies.length} loisir{hobbies.length > 1 ? 's' : ''} ajouté{hobbies.length > 1 ? 's' : ''}
                </p>
            </div>
        </div>
        <Icon 
            icon="mdi:chevron-down" 
            class={`w-5 h-5 text-neutral-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
        />
    </button>

    <!-- Contenu -->
    {#if isExpanded}
        <div class="p-5 pt-0 border-t-2 border-neutral-100">
            <!-- Liste des loisirs ajoutés -->
            {#if hobbies.length > 0}
                <div class="flex flex-wrap gap-2 mt-4 mb-4">
                    {#each hobbies as hobby (hobby.id)}
                        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 border-2 border-purple-100 text-xs font-bold text-neutral-800">
                            {#if hobby.icon}
                                <Icon icon={hobby.icon} class="w-4 h-4 text-purple-600" />
                            {/if}
                            {hobby.name}
                            <button
                                type="button"
                                on:click={() => removeHobby(hobby.id)}
                                class="ml-1 p-0.5 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
                                aria-label={`Supprimer ${hobby.name}`}
                            >
                                <Icon icon="mdi:close" class="w-3.5 h-3.5" />
                            </button>
                        </span>
                    {/each}
                </div>
            {:else}
                <p class="text-xs text-neutral-500 italic mt-4 mb-4">
                    Aucun loisir ajouté. Sélectionnez une suggestion ou saisissez le vôtre.
                </p>
            {/if}

            <!-- Suggestions -->
            <div class="mt-4">
                <div class="flex items-center justify-between mb-2">
                    <label class="block text-[10px] font-black text-neutral-600 uppercase tracking-wider">
                        Suggestions
                    </label>
                    <span class="text-[10px] font-semibold text-neutral-400">
                        Cliquez pour ajouter
                    </span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                    {#each suggestions as suggestion}
                        {@const added = isAlreadyAdded(suggestion.name)}
                        <button
                            type="button"
                            on:click={() => addSuggestion(suggestion)}
                            disabled={added}
                            class={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                added
                                    ? 'bg-neutral-100 text-neutral-400 border-2 border-neutral-100 cursor-not-allowed'
                                    : 'bg-white text-neutral-700 border-2 border-neutral-200 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700'
                            }`}
                        >
                            <Icon 
                                icon={added ? 'mdi:check' : suggestion.icon} 
                                class={`w-3.5 h-3.5 ${added ? 'text-emerald-500' : 'text-purple-600'}`} 
                            />
                            {suggestion.name}
                        </button>
                    {/each}
                </div>
            </div>

            <!-- Ajout personnalisé -->
            <div class="mt-5 pt-4 border-t-2 border-neutral-100">
                <label class="block text-[10px] font-black text-neutral-600 uppercase tracking-wider mb-2">
                    Autre loisir
                </label>
                <div class="flex gap-2">
                    <input
                        type="text"
                        bind:value={newHobby}
                        on:keydown={handleKeydown}
                        placeholder="Ex: Escalade, Astronomie, Bénévolat..."
                        class="flex-1 px-3 py-2 rounded-lg border-2 border-neutral-200 bg-white text-sm font-medium text-black placeholder:text-neutral-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all"
                    />
                    <button
                        type="button"
                        on:click={addCustomHobby}
                        disabled={!newHobby.trim()}
                        class="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-black text-white hover:bg-purple-600 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-all text-xs font-black uppercase tracking-wider shrink-0"
                        aria-label="Ajouter le loisir"
                    >
                        <Icon icon="mdi:plus" class="w-4 h-4" />
                        <span class="hidden sm:inline">Ajouter</span>
                    </button>
                </div>
                <p class="mt-1.5 text-[10px] text-neutral-400 italic">
                    Les loisirs personnalisés s'afficheront sans icône dans l'aperçu.
                </p>
            </div>
        </div>
    {/if}
</div>