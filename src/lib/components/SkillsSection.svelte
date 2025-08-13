<script>
    import { cvStore } from '$lib/stores/cvStore';

    let newSkill = '';
    let skillLevel = 'intermediate';

    const addSkill = () => {
        if (newSkill.trim()) {
            $cvStore.skills = [...$cvStore.skills, {
                id: Date.now(),
                name: newSkill.trim(),
                level: skillLevel
            }];
            newSkill = '';
        }
    };

    const removeSkill = (id) => {
        $cvStore.skills = $cvStore.skills.filter(skill => skill.id !== id);
    };
</script>

<div class="bg-white p-6 rounded-lg shadow">
    <h2 class="text-xl font-semibold mb-4">Compétences</h2>
    
    <div class="flex flex-wrap gap-2 mb-4">
        {#each $cvStore.skills as skill (skill.id)}
            <div class="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <span>{skill.name}</span>
                <button 
                    on:click={() => removeSkill(skill.id)}
                    class="ml-2 text-blue-500 hover:text-blue-700"
                >
                    ×
                </button>
            </div>
        {/each}
    </div>
    
    <div class="flex flex-col sm:flex-row gap-3">
        <input
            bind:value={newSkill}
            placeholder="Ajouter une compétence (ex: React, Photoshop)"
            class="flex-1 border rounded px-3 py-2"
            on:keydown={(e) => e.key === 'Enter' && addSkill()}
        />
        
        <select
            bind:value={skillLevel}
            class="border rounded px-3 py-2 text-gray-700"
        >
            <option value="beginner">Débutant</option>
            <option value="intermediate">Intermédiaire</option>
            <option value="advanced">Avancé</option>
            <option value="expert">Expert</option>
        </select>
        
        <button
            on:click={addSkill}
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
            Ajouter
        </button>
    </div>
</div>