<script>
    import { cvStore } from '$lib/stores/cvStore';
    import PersonalInfo from '$lib/components/PersonalInfo.svelte';
    import ProfessionalSummary from '$lib/components/ProfessionalSummary.svelte';
    import SkillsSection from '../lib/components/SkillsSection.svelte';
    import ExperienceSection from '$lib/components/ExperienceSection.svelte';
    import EducationSection from '$lib/components/EducationSection.svelte';
    import LanguagesSection from '$lib/components/LanguagesSection.svelte';
    import Preview from '$lib/components/Preview.svelte';
    import ATSScore from '$lib/components/ATSScore.svelte';
    import ExportButtons from '$lib/components/ExportButtons.svelte';

    let activeTab = 'edit';
</script>

<div class="min-h-screen bg-neutral-100/60 py-8 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-7xl mx-auto">
        <!-- En-tête Principal -->
        <header class="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b-2 border-neutral-200 pb-6">
            <div>
                <h1 class="text-3xl font-black text-black tracking-tight uppercase">
                    Créateur de CV Professionnel
                </h1>
                <p class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1">
                    Créez, optimisez et exportez votre CV au format ATS-friendly
                </p>
            </div>
            
            <!-- Actions rapides d'export en haut sur desktop -->
            <div class="hidden lg:block">
                <ExportButtons />
            </div>
        </header>

        <!-- Navigation par Onglets -->
        <nav class="mb-8 flex gap-3 border-b-2 border-neutral-200 pb-px">
            <button 
                type="button"
                class={`inline-flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wider transition-all rounded-t-xl cursor-pointer ${
                    activeTab === 'edit' 
                        ? 'bg-black text-white' 
                        : 'bg-white text-neutral-600 hover:text-black hover:bg-neutral-200/60 border-2 border-b-0 border-neutral-200'
                }`}
                on:click={() => activeTab = 'edit'}
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 012.828 0L20 4.828a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Éditeur
            </button>

            <button 
                type="button"
                class={`inline-flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wider transition-all rounded-t-xl cursor-pointer ${
                    activeTab === 'preview' 
                        ? 'bg-black text-white' 
                        : 'bg-white text-neutral-600 hover:text-black hover:bg-neutral-200/60 border-2 border-b-0 border-neutral-200'
                }`}
                on:click={() => activeTab = 'preview'}
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Aperçu A4
            </button>

            <button 
                type="button"
                class={`inline-flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wider transition-all rounded-t-xl cursor-pointer ${
                    activeTab === 'ats' 
                        ? 'bg-black text-white' 
                        : 'bg-white text-neutral-600 hover:text-black hover:bg-neutral-200/60 border-2 border-b-0 border-neutral-200'
                }`}
                on:click={() => activeTab = 'ats'}
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Analyse ATS
            </button>
        </nav>

        <!-- VUE : ÉDITEUR -->
        {#if activeTab === 'edit'}
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
                <!-- Colonne Gauche : Formulalres -->
                <div class="flex flex-col gap-6 lg:col-span-7 xl:col-span-7">
                    <PersonalInfo />
                    <ProfessionalSummary />
                    <SkillsSection />
                    <ExperienceSection />
                    <EducationSection />
                    <LanguagesSection />
                    
                    <!-- <div class="p-6 bg-white rounded-2xl border-2 border-neutral-200 shadow-sm mt-2">
                        <h3 class="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">Exportation & Sauvegarde</h3>
                        <ExportButtons />
                    </div> -->
                </div>

                <!-- Colonne Droite : Sidebar Fixe (ATS & Miniature) -->
                <div class="lg:col-span-5 xl:col-span-5">
                    <div class="sticky top-6 flex flex-col gap-6">
                        <!-- Score ATS compact -->
                        <ATSScore />
                        
                        <!-- Carte Aperçu en direct -->
                        <div class="rounded-2xl border-2 border-neutral-200 bg-white p-5 shadow-sm">
                            <div class="flex items-center justify-between mb-4 pb-3 border-b-2 border-neutral-100">
                                <span class="text-xs font-black uppercase tracking-wider text-black">
                                    Aperçu direct (A4)
                                </span>
                                <span class="flex items-center gap-1.5 text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    En direct
                                </span>
                            </div>

                            <!-- Conteneur d'Aperçu réduit avec Échelle -->
                            <div class="overflow-hidden rounded-xl border-2 border-neutral-200 bg-neutral-100 p-2 max-h-[500px] overflow-y-auto">
                                <div class="transform scale-[0.55] origin-top-left -mr-[80%] -mb-[80%]">
                                    <Preview />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        <!-- VUE : APERÇU PLEIN ÉCRAN -->
        {:else if activeTab === 'preview'}
            <div class="mx-auto max-w-4xl rounded-2xl border-2 border-neutral-200 bg-white p-6 sm:p-10 shadow-sm">
                <div class="flex items-center justify-between mb-8 pb-4 border-b-2 border-neutral-200">
                    <div>
                        <h2 class="text-lg font-black text-black uppercase tracking-tight">Prévisualisation du Document</h2>
                        <p class="text-xs font-semibold text-neutral-500">Rendu final prêt pour impression A4</p>
                    </div>
                </div>

                <div class="overflow-x-auto py-4 bg-neutral-100/50 rounded-xl border-2 border-neutral-200 flex justify-center">
                    <Preview fullMode={true} />
                </div>
            </div>

        <!-- VUE : ANALYSE ATS -->
        {:else}
            <div class="mx-auto max-w-3xl rounded-2xl border-2 border-neutral-200 bg-white p-6 sm:p-10 shadow-sm">
                <div class="mb-8 text-center pb-6 border-b-2 border-neutral-200">
                    <h2 class="text-2xl font-black text-black uppercase tracking-tight">Analyse de Compatibilité ATS</h2>
                    <p class="mt-2 text-xs font-semibold text-neutral-500 max-w-md mx-auto">
                        Optimisez votre CV pour maximiser vos chances de franchir les filtres automatiques des recruteurs.
                    </p>
                </div>
                
                <ATSScore detailed={true} />
                
                <!-- <div class="mt-8 flex justify-center border-t-2 border-neutral-200 pt-6">
                    <ExportButtons />
                </div> -->
            </div>
        {/if}
    </div>
</div>