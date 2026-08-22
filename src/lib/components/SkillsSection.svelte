<script>
    import { cvStore } from '$lib/stores/cvStore';

    let newSkill = '';
    let skillLevel = 'intermediate';

    const levelsMap = {
        beginner: { label: 'Débutant', class: 'bg-neutral-100 text-neutral-800 border-neutral-300' },
        intermediate: { label: 'Intermédiaire', class: 'bg-neutral-200 text-neutral-900 border-neutral-400' },
        advanced: { label: 'Avancé', class: 'bg-neutral-900 text-white border-black' },
        expert: { label: 'Expert', class: 'bg-black text-amber-400 border-black' }
    };

    const addSkill = () => {
        if (newSkill.trim()) {
            $cvStore.skills = [
                ...$cvStore.skills,
                {
                    id: Date.now(),
                    name: newSkill.trim(),
                    level: skillLevel
                }
            ];
            newSkill = '';
        }
    };

    const removeSkill = (id) => {
        $cvStore.skills = $cvStore.skills.filter(skill => skill.id !== id);
    };
</script>

<div class="bg-white rounded-2xl border-2 border-neutral-200 p-6 shadow-sm">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-neutral-900 tracking-tight">Compétences</h2>
        <span class="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            {$cvStore.skills.length} ajoutée{$cvStore.skills.length > 1 ? 's' : ''}
        </span>
    </div>

    <!-- Liste des compétences (Pills) -->
    <div class="flex flex-wrap gap-2 mb-6">
        {#each $cvStore.skills as skill (skill.id)}
            <div class="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl border-2 border-neutral-300 bg-neutral-50 text-neutral-900 text-sm font-semibold shadow-sm hover:border-black transition-all">
                <span>{skill.name}</span>
                
                <!-- Badge Niveau -->
                <span class={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${levelsMap[skill.level]?.class || levelsMap.intermediate.class}`}>
                    {levelsMap[skill.level]?.label || skill.level}
                </span>

                <!-- Bouton Suppression -->
                <button
                    type="button"
                    on:click={() => removeSkill(skill.id)}
                    aria-label={`Supprimer ${skill.name}`}
                    class="ml-1 p-0.5 text-neutral-400 hover:text-black hover:bg-neutral-200 rounded-md transition-all cursor-pointer"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        {:else}
            <div class="w-full py-4 text-center border-2 border-dashed border-neutral-200 rounded-xl">
                <p class="text-sm font-medium text-neutral-500">
                    Aucune compétence ajoutée. Saisissez-en une ci-dessous.
                </p>
            </div>
        {/each}
    </div>

    <!-- Formulaire d'ajout -->
    <div class="flex flex-col sm:flex-row gap-3">
        <!-- Champ Saisie -->
        <div class="flex-1">
            <label for="newSkillInput" class="sr-only">Compétence</label>
            <input
                id="newSkillInput"
                type="text"
                bind:value={newSkill}
                placeholder="Ex: Vue.js, Tailwind CSS, Gestion de projet..."
                class="w-full rounded-xl border-2 border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:border-black focus:bg-white focus:outline-none transition-all"
                on:keydown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            />
        </div>

        <!-- Select Niveau -->
        <div>
            <label for="skillLevelSelect" class="sr-only">Niveau</label>
            <select
                id="skillLevelSelect"
                bind:value={skillLevel}
                class="w-full sm:w-auto rounded-xl border-2 border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm font-bold text-neutral-900 focus:border-black focus:bg-white focus:outline-none transition-all cursor-pointer"
            >
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
                <option value="expert">Expert</option>
            </select>
        </div>

        <!-- Bouton Ajouter -->
        <button
            type="button"
            on:click={addSkill}
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-bold text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all cursor-pointer"
        >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Ajouter
        </button>
    </div>
</div>