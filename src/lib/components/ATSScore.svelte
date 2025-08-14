<script>
    import { cvStore } from '$lib/stores/cvStore';
    import { calculateATSScore } from '$lib/ats-rules/rules';
    
    export let detailed = false;
    
    $: atsResult = calculateATSScore($cvStore);
</script>

<div class="bg-white p-6 rounded-lg shadow">
    <h2 class="text-xl font-semibold mb-4">Compatibilité ATS</h2>
    
    <div class="flex items-center mb-4">
        <div class="flex items-center justify-center rounded-full w-20 h-20 bg-gray-100" 
             style={`background: conic-gradient(#4ade80 ${atsResult.score}%, #e5e7eb ${atsResult.score}%)`}>
            {atsResult.score}%
        </div>
        <div class="ml-4">
            {#if atsResult.score > 80}
                <p class="text-green-600">Excellent! Votre CV est bien optimisé pour les ATS.</p>
            {:else if atsResult.score > 60}
                <p class="text-yellow-600">Bon, mais il y a place à amélioration.</p>
            {:else}
                <p class="text-red-600">Votre CV a besoin d'optimisations pour passer les ATS.</p>
            {/if}
        </div>
    </div>
    
    {#if detailed}
        <div class="space-y-3">
            <h3 class="font-medium">Recommandations:</h3>
            <ul class="list-disc pl-5 space-y-2">
                {#each atsResult.results as rule}
                    <li class={rule.passed ? 'opacity-50' : ''}>
                        {rule.description}: {rule.passed ? '✓' : '✗'}
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>