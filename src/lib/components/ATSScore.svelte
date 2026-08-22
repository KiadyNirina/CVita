<script>
    import { cvStore } from '$lib/stores/cvStore';
    import { calculateATSScore } from '$lib/ats-rules/rules';
    
    export let detailed = false;
    
    $: atsResult = calculateATSScore($cvStore);

    // Dynamic color coding based on score thresholds
    $: scoreStatus = atsResult.score >= 80 
        ? {
            label: 'Excellent !',
            message: 'Votre CV est idéalement structuré pour franchir les filtres ATS.',
            color: 'text-emerald-700',
            badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
            ringColor: '#10b981' // emerald-500
          }
        : atsResult.score >= 60 
        ? {
            label: 'Bon potentiel',
            message: 'Votre CV est lisible, mais quelques optimisations clés restent à effectuer.',
            color: 'text-amber-700',
            badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
            ringColor: '#f59e0b' // amber-500
          }
        : {
            label: 'À optimiser',
            message: 'Des sections importantes manquent ou manquent de précision pour les ATS.',
            color: 'text-rose-700',
            badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
            ringColor: '#f43f5e' // rose-500
          };
</script>

<div class="bg-white rounded-2xl border-2 border-neutral-200 p-6 shadow-sm">
    <!-- En-tête -->
    <div class="flex items-center justify-between mb-6">
        <div>
            <h2 class="text-xl font-bold text-neutral-900 tracking-tight">Compatibilité ATS</h2>
            <p class="text-xs text-neutral-500 font-medium">Analyse automatique pour les logiciels de recrutement</p>
        </div>
        <span class={`text-xs font-bold px-2.5 py-1 rounded-md border ${scoreStatus.badgeBg}`}>
            {scoreStatus.label}
        </span>
    </div>

    <!-- Jauge et Résumé -->
    <div class="flex items-center gap-6 p-4 rounded-xl bg-neutral-50 border-2 border-neutral-200 mb-6">
        <!-- Circular Progress Ring using Conic Gradient -->
        <div 
            class="relative flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full shadow-inner"
            style={`background: conic-gradient(${scoreStatus.ringColor} ${atsResult.score}%, #e5e5e5 ${atsResult.score}%);`}
        >
            <!-- Inner white circle for donut effect -->
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span class="text-xl font-black text-neutral-900 tracking-tight">
                    {atsResult.score}<span class="text-xs font-bold text-neutral-500">%</span>
                </span>
            </div>
        </div>

        <!-- Description du score -->
        <div class="space-y-1">
            <h3 class={`text-base font-bold ${scoreStatus.color}`}>
                Score de {atsResult.score}%
            </h3>
            <p class="text-xs font-semibold text-neutral-600 leading-relaxed">
                {scoreStatus.message}
            </p>
        </div>
    </div>

    <!-- Recommandations détaillées -->
    {#if detailed}
        <div class="space-y-3 pt-2 border-t-2 border-neutral-100">
            <h3 class="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-3">
                Points de contrôle ({atsResult.results.filter(r => r.passed).length}/{atsResult.results.length})
            </h3>
            
            <div class="space-y-2">
                {#each atsResult.results as rule}
                    <div 
                        class={`flex items-start justify-between p-3 rounded-xl border-2 transition-all ${
                            rule.passed 
                                ? 'bg-neutral-50/60 border-neutral-200 text-neutral-700' 
                                : 'bg-rose-50/50 border-rose-200 text-neutral-900'
                        }`}
                    >
                        <div class="flex items-center gap-2.5">
                            <!-- Icon Indicator -->
                            {#if rule.passed}
                                <span class="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                                    ✓
                                </span>
                            {:else}
                                <span class="flex-shrink-0 w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs">
                                    ✕
                                </span>
                            {/if}
                            
                            <span class={`text-xs font-bold ${rule.passed ? 'text-neutral-600 line-through opacity-80' : 'text-neutral-900'}`}>
                                {rule.description}
                            </span>
                        </div>

                        <span class={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                            rule.passed ? 'bg-neutral-200 text-neutral-700' : 'bg-rose-200 text-rose-900'
                        }`}>
                            {rule.passed ? 'Validé' : 'À corriger'}
                        </span>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>