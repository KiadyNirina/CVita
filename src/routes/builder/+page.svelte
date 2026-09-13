<script>
    import { cvStore, resetCV } from '$lib/stores/cvStore';
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
    import Icon from '@iconify/svelte';
    import { page } from '$app/stores';
    import { tick } from 'svelte';
    
    const siteUrl = $page.url.origin;

    let activeTab = 'templates';
    let headerExpanded = true;

    let showResetModal = false;
    let resetting = false;

    function handleReset() {
        showResetModal = true;
    }

    async function confirmReset() {
        resetting = true;
        await new Promise(resolve => setTimeout(resolve, 500));
        resetCV();
        await new Promise(resolve => setTimeout(resolve, 300));
        resetting = false;
        showResetModal = false;
    }

    async function changeTab(tab) {
        activeTab = tab;

        await tick();

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
</script>

<svelte:head>
    <title>Créer mon CV en ligne – CVita (Gratuit, ATS-Friendly, Export PDF)</title>
    <meta name="description" content="Utilisez l'éditeur CVita pour créer un CV professionnel compatible ATS en quelques minutes. Export PDF vectoriel, stockage local, sans inscription." />
    <meta name="keywords" content="créer CV, éditeur CV, CV ATS, export PDF, CV gratuit en ligne, générateur CV, CV professionnel, CVita" />
    <link rel="canonical" href="{siteUrl}/builder" />
    <meta name="robots" content="index, follow" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="CVita – Éditeur de CV en ligne gratuit et ATS-friendly" />
    <meta property="og:description" content="Créez votre CV professionnel compatible ATS. Export PDF, stockage local, sans inscription." />
    <meta property="og:url" content="{siteUrl}/builder" />
    <meta property="og:image" content="{siteUrl}/builder-og-image.jpg" />
    <meta property="og:locale" content="fr_FR" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="CVita – Créer un CV ATS-friendly gratuitement" />
    <meta name="twitter:description" content="Éditeur en ligne : CV professionnel, export PDF vectoriel, données locales." />
    <meta name="twitter:image" content="{siteUrl}/builder-og-image.jpg" />
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "CVita – Éditeur de CV en ligne",
            "url": "{siteUrl}/builder",
            "description": "Créez un CV professionnel compatible ATS en quelques minutes, sans inscription et avec stockage local de vos données.",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "All",
            "browserRequirements": "Requires JavaScript",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR"
            }
        }
    </script>
</svelte:head>

<div class="min-h-screen bg-neutral-100/60 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
        <!-- ========================================= -->
        <!-- EN-TÊTE FIXE (sticky) + PLIABLE MOBILE    -->
        <!-- ========================================= -->
        <div class="sticky top-0 z-10 bg-neutral-100/60 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pt-4 pb-2">
            <header class="border-b-2 border-neutral-200 pb-4">
                <!-- Ligne 1 : Titre + bouton toggle (mobile uniquement) -->
                <div class="flex items-center justify-between gap-3 md:hidden">
                    <div class="flex items-center gap-3 min-w-0">
                        <a href="/" class="p-2 rounded-full hover:bg-neutral-200 transition-colors shrink-0" aria-label="Retour à l'accueil">
                            <Icon icon="mdi:arrow-left" class="w-6 h-6 text-neutral-700" />
                        </a>
                        <h1 class="text-base font-black text-black tracking-tight uppercase truncate">
                            Créateur de CV
                        </h1>
                    </div>

                    <!-- Bouton plier/déplier -->
                    <button
                        type="button"
                        on:click={() => headerExpanded = !headerExpanded}
                        class="p-2 rounded-full hover:bg-neutral-200 transition-colors shrink-0"
                        aria-label={headerExpanded ? 'Replier l\'en-tête' : 'Déplier l\'en-tête'}
                        aria-expanded={headerExpanded}
                    >
                        <Icon 
                            icon="mdi:chevron-down" 
                            class={`w-6 h-6 text-neutral-700 transition-transform duration-300 ${headerExpanded ? 'rotate-180' : ''}`} 
                        />
                    </button>
                </div>

                <!-- Contenu extensible (visible sur md+ ou quand déplié sur mobile) -->
                <div class={`${headerExpanded ? 'block' : 'hidden'} md:block md:mt-0 mt-3`}>
                    <!-- Ligne desktop : bouton retour + titre complet + boutons d'export -->
                    <div class="hidden md:flex md:items-center md:justify-between gap-4">
                        <div class="flex items-center gap-3">
                            <a href="/" class="p-2 rounded-full hover:bg-neutral-200 transition-colors" aria-label="Retour à l'accueil">
                                <Icon icon="mdi:arrow-left" class="w-6 h-6 text-neutral-700" />
                            </a>
                            <div>
                                <h1 class="text-3xl font-black text-black tracking-tight uppercase">
                                    Créateur de CV Professionnel
                                </h1>
                                <p class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mt-1">
                                    Créez, optimisez et exportez votre CV au format ATS-friendly
                                </p>
                            </div>
                        </div>
                        <div class="hidden lg:block">
                            {#if activeTab === 'edit' || activeTab === 'preview'}
                                <ExportButtons showImport={activeTab === 'edit'} />
                            {/if}
                        </div>
                    </div>

                    <!-- Sous-titre mobile (visible uniquement quand déplié sur mobile) -->
                    <p class="md:hidden text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mt-1">
                        Créez, optimisez et exportez votre CV au format ATS-friendly
                    </p>

                    <!-- Navigation onglets -->
                    <nav class="flex gap-1.5 sm:gap-3 border-b-2 border-neutral-200 pb-px mt-3 md:mt-2 overflow-x-auto">
                        <!-- Onglet Modèles -->
                        <button
                            type="button"
                            class={`inline-flex items-center gap-2 px-2 py-1.5 text-[10px] sm:px-5 sm:py-3 sm:text-xs font-black uppercase tracking-wider transition-all rounded-t-xl cursor-pointer whitespace-nowrap ${
                                activeTab === 'templates'
                                    ? 'bg-black text-white'
                                    : 'bg-white text-neutral-600 hover:text-black hover:bg-neutral-200/60 border-2 border-b-0 border-neutral-200'
                            }`}
                            on:click={() => activeTab = 'templates'}
                        >
                            <Icon icon="mdi:view-grid" class="w-4 h-4" />
                            <span class="hidden sm:inline" class:inline={activeTab === 'templates'}>Modèles</span>
                        </button>

                        <!-- Onglet Éditeur -->
                        <button 
                            type="button"
                            class={`inline-flex items-center gap-2 px-2 py-1.5 text-[10px] sm:px-5 sm:py-3 sm:text-xs font-black uppercase tracking-wider transition-all rounded-t-xl cursor-pointer whitespace-nowrap ${
                                activeTab === 'edit' 
                                    ? 'bg-black text-white' 
                                    : 'bg-white text-neutral-600 hover:text-black hover:bg-neutral-200/60 border-2 border-b-0 border-neutral-200'
                            }`}
                            on:click={() => changeTab('edit')}
                        >
                            <Icon icon="mdi:pencil" class="w-4 h-4" />
                            <span class="hidden sm:inline" class:inline={activeTab === 'edit'}>Éditeur</span>
                        </button>

                        <!-- Onglet Aperçu A4 -->
                        {#if activeTab !== 'templates'}
                            <button 
                                type="button"
                                class={`inline-flex items-center gap-2 px-2 py-1.5 text-[10px] sm:px-5 sm:py-3 sm:text-xs font-black uppercase tracking-wider transition-all rounded-t-xl cursor-pointer whitespace-nowrap ${
                                    activeTab === 'preview' 
                                        ? 'bg-black text-white' 
                                        : 'bg-white text-neutral-600 hover:text-black hover:bg-neutral-200/60 border-2 border-b-0 border-neutral-200'
                                }`}
                                on:click={() => changeTab('preview')}
                            >
                                <Icon icon="mdi:eye" class="w-4 h-4" />
                                <span class="hidden sm:inline" class:inline={activeTab === 'preview'}>Aperçu A4</span>
                            </button>
                        {/if}

                        <!-- Onglet Analyse ATS -->
                        {#if activeTab !== 'templates'}
                            <button 
                                type="button"
                                class={`inline-flex items-center gap-2 px-2 py-1.5 text-[10px] sm:px-5 sm:py-3 sm:text-xs font-black uppercase tracking-wider transition-all rounded-t-xl cursor-pointer whitespace-nowrap ${
                                    activeTab === 'ats' 
                                        ? 'bg-black text-white' 
                                        : 'bg-white text-neutral-600 hover:text-black hover:bg-neutral-200/60 border-2 border-b-0 border-neutral-200'
                                }`}
                                on:click={() => changeTab('ats')}
                            >
                                <Icon icon="mdi:check-circle" class="w-4 h-4" />
                                <span class="hidden sm:inline" class:inline={activeTab === 'ats'}>Analyse ATS</span>
                            </button>
                        {/if}
                    </nav>
                </div>
            </header>
        </div>

        <!-- ========================================= -->
        <!-- CONTENU PRINCIPAL                        -->
        <!-- ========================================= -->
        <div class="mt-6">
            <!-- VUE : ÉDITEUR -->
            {#if activeTab === 'edit'}
                <div class="flex flex-col lg:flex-row gap-8 items-start">
                    <!-- Colonne gauche : formulaires -->
                    <div class="flex-1 min-w-0 w-full">

                        <!-- Bouton de réinitialisation -->
                        <div class="flex justify-start mb-4">
                            <button
                                type="button"
                                on:click={handleReset}
                                class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-neutral-200 bg-white text-neutral-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all text-xs font-black uppercase tracking-wider"
                                aria-label="Réinitialiser les champs du CV"
                            >
                                <Icon icon="mdi:refresh" class="w-4 h-4" />
                                Réinitialiser les champs
                            </button>
                        </div>

                        <!-- Champs du CV -->
                        <div class="space-y-6">
                            <PersonalInfo />
                            <ProfessionalSummary />
                            <SkillsSection />
                            <ExperienceSection />
                            <EducationSection />
                            <LanguagesSection />
                        </div>

                    </div>

                    <!-- Colonne droite : fixe (sticky) avec aperçu et analyse ATS + boutons -->
                    <div class="w-full lg:w-5/12 xl:w-5/12 sticky top-[140px] z-5">
                        <div class="flex flex-col gap-6">
                            <!-- Carte ATS avec bouton "Voir l'analyse complète" -->
                            <div class="rounded-2xl border-2 border-neutral-200 bg-white p-5 shadow-sm">
                                <div class="flex items-center justify-between mb-3 pb-2 border-b-2 border-neutral-100">
                                    <span class="text-xs font-black uppercase tracking-wider text-black">
                                        Compatibilité ATS
                                    </span>
                                    <button
                                        type="button"
                                        on:click={() => activeTab = 'ats'}
                                        class="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-neutral-600 hover:text-black hover:bg-neutral-200/60 px-2 py-1 rounded-md transition-colors"
                                        aria-label="Voir l'analyse ATS complète"
                                    >
                                        <Icon icon="mdi:arrow-expand" class="w-4 h-4" />
                                        <span class="hidden sm:inline">Analyse complète</span>
                                    </button>
                                </div>
                                <ATSScore />
                            </div>

                            <!-- Carte Aperçu avec bouton "Plein écran" -->
                            <div class="rounded-2xl border-2 border-neutral-200 bg-white p-5 shadow-sm">
                                <div class="flex items-center justify-between mb-4 pb-3 border-b-2 border-neutral-100">
                                    <span class="text-xs font-black uppercase tracking-wider text-black">
                                        Aperçu direct (A4)
                                    </span>
                                    <div class="flex items-center gap-2">
                                        <span class="flex items-center gap-1.5 text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                            En direct
                                        </span>
                                        <!-- Bouton Plein écran -->
                                        <button
                                            type="button"
                                            on:click={() => activeTab = 'preview'}
                                            class="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-neutral-600 hover:text-black hover:bg-neutral-200/60 px-2 py-1 rounded-md transition-colors"
                                            aria-label="Ouvrir l'aperçu en plein écran"
                                        >
                                            <Icon icon="mdi:fullscreen" class="w-4 h-4" />
                                            <span class="hidden sm:inline">Plein écran</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="overflow-hidden rounded-xl border-2 border-neutral-200 bg-neutral-100 p-2 max-h-[500px] overflow-y-auto">
                                    <A4Scaler maxScale={0.7}>
                                        <Preview />
                                    </A4Scaler>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            {:else if activeTab === 'templates'}
                <!-- ONGLET MODÈLES -->
                <div class="mx-auto max-w-5xl rounded-2xl border-2 border-neutral-200 bg-white p-6 sm:p-10 shadow-sm">
                    <div class="mb-6 text-center">
                        <h2 class="text-xl md:text-2xl font-black text-black uppercase tracking-tight">Choisissez votre modèle</h2>
                        <p class="mt-2 text-xs md:text-sm font-medium text-neutral-500">
                            Sélectionnez la mise en page qui correspond le mieux à votre profil
                        </p>
                    </div>
                    <TemplateSelector expanded={true} on:selectTemplate={() => activeTab = 'edit'} />
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
                    <div class="py-4 bg-neutral-100/50 rounded-xl flex justify-center">
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
            <ExportButtons showImport={activeTab === 'edit'} />
        </div>
    {/if}

    {#if showResetModal}
        <div
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            role="presentation"
            on:click={(event) => {
                if (event.target === event.currentTarget) {
                    showResetModal = false;
                }
            }}
        >
            <div
                class="w-full max-w-md rounded-2xl border-2 border-neutral-200 bg-white shadow-2xl overflow-hidden"
                role="dialog"
                aria-modal="true"
                aria-labelledby="reset-title"
            >
                <!-- Header -->
                <div class="p-6 border-b-2 border-neutral-100">
                    <div class="flex items-start gap-4">
                        <div class="flex items-center justify-center w-11 h-11 rounded-xl bg-red-50 border-2 border-red-100 shrink-0">
                            <Icon
                                icon="mdi:alert-outline"
                                class="w-6 h-6 text-red-600"
                            />
                        </div>

                        <div class="min-w-0">
                            <h3
                                id="reset-title"
                                class="text-lg font-black text-black uppercase tracking-tight"
                            >
                                Réinitialiser le CV ?
                            </h3>

                            <p class="mt-1.5 text-sm leading-relaxed text-neutral-500">
                                Toutes les informations saisies dans votre CV seront supprimées.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex items-center justify-end gap-3 p-5 bg-neutral-50">
                    <button
                        type="button"
                        on:click={() => showResetModal = false}
                        disabled={resetting}
                        class="px-4 py-2.5 rounded-xl border-2 border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs font-black uppercase tracking-wider"
                    >
                        Annuler
                    </button>

                    <button
                        type="button"
                        on:click={confirmReset}
                        disabled={resetting}
                        class="inline-flex items-center justify-center gap-2 min-w-[145px] px-4 py-2.5 rounded-xl bg-black text-white hover:bg-red-600 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-all text-xs font-black uppercase tracking-wider"
                    >
                        {#if resetting}
                            <Icon
                                icon="mdi:loading"
                                class="w-4 h-4 animate-spin"
                            />
                            Réinitialisation...
                        {:else}
                            <Icon icon="mdi:refresh" class="w-4 h-4" />
                            Réinitialiser
                        {/if}
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>