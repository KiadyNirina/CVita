<script>
    import { onMount } from 'svelte';
    import { cvStore } from '$lib/stores/cvStore';
    import Icon from '@iconify/svelte';

    let showHelp = false;
    let wordCount = 0;
    let isRestored = false;

    onMount(() => {
        const saved = localStorage.getItem('cvProfessionalSummary');
        if (saved !== null) {
            if ($cvStore.professionalSummary !== saved) {
                cvStore.update(s => ({ ...s, professionalSummary: saved }));
            }
        }
        isRestored = true;
    });

    $: if (isRestored && $cvStore.professionalSummary !== undefined) {
        localStorage.setItem('cvProfessionalSummary', $cvStore.professionalSummary);
    }

    $: {
        if ($cvStore.professionalSummary) {
            wordCount = $cvStore.professionalSummary.trim().split(/\s+/).filter(word => word.length > 0).length;
        } else {
            wordCount = 0;
        }
    }

    $: isOptimalLength = wordCount >= 50 && wordCount <= 200;
</script>

<div class="bg-white rounded-2xl border-2 border-neutral-200 p-4 sm:p-6 shadow-sm">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div class="flex items-center gap-2 flex-wrap">
            <h2 class="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">Résumé Professionnel</h2>
            <span class="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-300">
                Optionnel
            </span>
        </div>
        
        <button
            type="button"
            on:click={() => showHelp = !showHelp}
            class="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg border-2 border-neutral-300 text-neutral-800 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all cursor-pointer"
        >
            <Icon icon="mdi:help-circle" class="w-4 h-4" />
            {showHelp ? 'Masquer l\'aide' : 'Conseils de rédaction'}
        </button>
    </div>

    <!-- Section d'aide -->
    {#if showHelp}
        <div class="mb-5 p-4 bg-neutral-900 text-white rounded-xl border border-neutral-800 space-y-2 animate-fadeIn">
            <div class="flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm">
                <Icon icon="mdi:lightbulb" class="w-4 h-4" />
                <span>Conseils pour marquer des points auprès des recruteurs :</span>
            </div>
            <ul class="text-[10px] sm:text-xs text-neutral-300 space-y-1.5 pl-5 list-disc">
                <li>Visez entre <strong class="text-white">50 et 200 mots</strong> pour aller à l'essentiel.</li>
                <li>Indiquez votre titre exact, vos <strong class="text-white">années d'expérience</strong> et vos spécialités.</li>
                <li>Mettez en avant un accomplissement clé ou des compétences techniques clés.</li>
                <li>Utilisez des verbes d'action puissants et percutants (ex: <em>Conçu, Géré, Optimisé</em>).</li>
            </ul>
        </div>
    {/if}

    <!-- Champ Texte -->
    <div class="relative">
        <textarea
            id="professionalSummary"
            bind:value={$cvStore.professionalSummary}
            placeholder="Développeur Full Stack avec 5 ans d'expérience spécialisé en architectures cloud et Nuxt/Vue.js. Passionné par l'optimisation des performances et le design d'interfaces utilisateur fluides..."
            rows="5"
            class="w-full rounded-xl border-2 border-neutral-300 bg-neutral-50 px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-neutral-900 font-medium placeholder-neutral-400 shadow-sm focus:border-black focus:bg-white focus:outline-none focus:ring-0 transition-all leading-relaxed"
        ></textarea>
    </div>

    <!-- Pied de composant / Compteur de mots -->
    <div class="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] sm:text-xs font-semibold">
        <!-- Badge statut -->
        <div class="flex items-center gap-2 flex-wrap">
            {#if wordCount === 0}
                <span class="px-2 py-1 rounded-md bg-neutral-100 text-neutral-600 border border-neutral-300">
                    Non renseigné
                </span>
            {:else if wordCount < 50}
                <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                    ⚠️ Trop court (min 50 mots)
                </span>
            {:else if wordCount > 200}
                <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-100 text-red-900 border border-red-300">
                    ⚠️ Trop long (max 200 mots)
                </span>
            {:else}
                <span class="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300">
                    ✓ Longueur idéale
                </span>
            {/if}
        </div>

        <!-- Nombre exact de mots -->
        <div class="text-neutral-800 font-bold whitespace-nowrap">
            Mots : <span class={isOptimalLength ? 'text-emerald-700 font-extrabold' : 'text-neutral-900'}>{wordCount}</span> / 200
        </div>
    </div>
</div>

<style>
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
        animation: fadeIn 0.2s ease-out forwards;
    }
</style>