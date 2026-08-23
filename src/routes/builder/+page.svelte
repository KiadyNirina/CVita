<script>
    import { cvStore } from '$lib/stores/cvStore';
    import PersonalInfo from '$lib/components/PersonalInfo.svelte';
    import ProfessionalSummary from '$lib/components/ProfessionalSummary.svelte';
    import SkillsSection from '$lib/components/SkillsSection.svelte';
    import ExperienceSection from '$lib/components/ExperienceSection.svelte';
    import EducationSection from '$lib/components/EducationSection.svelte';
    import LanguagesSection from '$lib/components/LanguagesSection.svelte';
    import Preview from '$lib/components/Preview.svelte';
    import ATSScore from '$lib/components/ATSScore.svelte';
    import ExportButtons from '$lib/components/ExportButtons.svelte';
    import TemplateSelector from '$lib/components/TemplateSelector.svelte';
    import A4Scaler from '$lib/components/A4Scaler.svelte';

    let activeTab = 'templates';
</script>

<div class="min-h-screen bg-neutral-100/60 py-8 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-7xl mx-auto">
        <!-- ========================================= -->
        <!-- EN-TÊTE FIXE (sticky)                     -->
        <!-- ========================================= -->
        <div class="sticky top-0 z-10 bg-neutral-100/60 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pt-4 pb-2">
            <header class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b-2 border-neutral-200 pb-4">
                <div>
                    <h1 class="text-3xl font-black text-black tracking-tight uppercase">
                        Créateur de CV Professionnel
                    </h1>
                    <p class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1">
                        Créez, optimisez et exportez votre CV au format ATS-friendly
                    </p>
                </div>
                <div class="hidden lg:block">
                {#if activeTab === 'edit' || activeTab === 'preview'}
                    <ExportButtons />
                {/if}
                </div>
            </header>

            <nav class="md:flex gap-3 border-b-2 border-neutral-200 pb-px mt-2">
                <button
                    type="button"
                    class={`inline-flex items-center gap-2 px-5 py-3 text-xs font-black uppercase tracking-wider transition-all rounded-t-xl cursor-pointer ${
                        activeTab === 'templates'
                            ? 'bg-black text-white'
                            : 'bg-white text-neutral-600 hover:text-black hover:bg-neutral-200/60 border-2 border-b-0 border-neutral-200'
                    }`}
                    on:click={() => activeTab = 'templates'}
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Modèles
                </button>

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
        </div>

        <!-- ========================================= -->
        <!-- CONTENU PRINCIPAL                        -->
        <!-- ========================================= -->
        <div class="mt-6">
            <!-- VUE : ÉDITEUR -->
            {#if activeTab === 'edit'}
                <div class="flex flex-col lg:flex-row gap-8 items-start">
                    <!-- Colonne gauche : formulaires -->
                    <div class="flex-1 min-w-0 space-y-6">
                        <PersonalInfo />
                        <ProfessionalSummary />
                        <SkillsSection />
                        <ExperienceSection />
                        <EducationSection />
                        <LanguagesSection />
                    </div>

                    <!-- Colonne droite : fixe (sticky) -->
                    <div class="w-full lg:w-5/12 xl:w-5/12 sticky top-[140px] z-5">
                        <div class="flex flex-col gap-6">
                            <ATSScore />
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
                                <div class="overflow-hidden rounded-xl border-2 border-neutral-200 bg-neutral-100 p-2 max-h-[500px] overflow-y-auto">
                                    <div class="overflow-hidden rounded-xl border-2 border-neutral-200 bg-neutral-100 p-2 max-h-[500px] overflow-y-auto">
                                        <A4Scaler maxScale={0.7}>
                                            <Preview />
                                        </A4Scaler>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            {:else if activeTab === 'templates'}
                <!-- ONGLET MODÈLES -->
                <div class="mx-auto max-w-5xl rounded-2xl border-2 border-neutral-200 bg-white p-6 sm:p-10 shadow-sm">
                    <div class="mb-6 text-center">
                        <h2 class="text-2xl font-black text-black uppercase tracking-tight">Choisissez votre modèle</h2>
                        <p class="mt-2 text-sm font-medium text-neutral-500">
                            Sélectionnez la mise en page qui correspond le mieux à votre profil
                        </p>
                    </div>
                    <TemplateSelector expanded={true} />
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
                    <div class="py-4 bg-neutral-100/50 rounded-xl border-2 border-neutral-200 flex justify-center">
                        <div class="w-full max-w-4xl">
                            <A4Scaler>
                                <Preview fullMode={true} />
                            </A4Scaler>
                        </div>
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
                </div>
            {/if}
        </div>
    </div>
    {#if activeTab === 'edit' || activeTab === 'preview'}
        <div class="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-neutral-200 p-3 flex justify-center gap-4 lg:hidden z-20">
            <ExportButtons />
        </div>
    {/if}
</div>