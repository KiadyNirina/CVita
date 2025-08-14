<script>
    import { cvStore } from '$lib/stores/cvStore';
    
    let showHelp = false;
    let wordCount = 0;
    
    $: {
        if ($cvStore.professionalSummary) {
            wordCount = $cvStore.professionalSummary.split(/\s+/).filter(word => word.length > 0).length;
        } else {
            wordCount = 0;
        }
    }
</script>

<div class="bg-white p-6 rounded-lg shadow">
    <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Résumé Professionnel</h2>
        <button 
            on:click={() => showHelp = !showHelp}
            class="text-blue-600 hover:text-blue-800 text-sm"
        >
            {showHelp ? 'Masquer l\'aide' : 'Aide à la rédaction'}
        </button>
    </div>
    
    {#if showHelp}
        <div class="bg-blue-50 p-4 rounded mb-4 text-sm">
            <p class="font-medium mb-2">Conseils pour un bon résumé :</p>
            <ul class="list-disc pl-5 space-y-1">
                <li>50-200 mots idéalement</li>
                <li>Mentionnez vos années d'expérience</li>
                <li>Indiquez votre domaine d'expertise</li>
                <li>Soulignez vos principales compétences</li>
                <li>Utilisez des verbes d'action</li>
            </ul>
        </div>
    {/if}
    
    <textarea
        bind:value={$cvStore.professionalSummary}
        placeholder="Décrivez votre parcours professionnel, vos compétences clés et vos objectifs..."
        class="w-full border rounded px-3 py-2 min-h-[120px]"
    ></textarea>
    
    <div class="flex justify-between mt-2 text-sm text-gray-500">
        <div>
            Mots : {wordCount} {wordCount >= 50 && wordCount <= 200 ? '✓' : '✗'}
        </div>
        <div>
            {#if wordCount < 50}
                Trop court (min 50 mots)
            {:else if wordCount > 200}
                Trop long (max 200 mots)
            {:else}
                Longueur idéale
            {/if}
        </div>
    </div>
</div>