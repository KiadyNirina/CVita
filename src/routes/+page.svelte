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

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Créateur de CV Professionnel</h1>
    
    <nav class="mb-14 flex gap-10 border-b border-neutral-200/60">
        <button 
            class="pb-5 text-sm font-medium transition-all duration-300 relative {activeTab === 'edit' ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}"
            on:click={() => activeTab = 'edit'}
        >
            Éditeur
            {#if activeTab === 'edit'}
                <span class="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-900 rounded-t-full"></span>
            {/if}
        </button>
        <button 
            class="pb-5 text-sm font-medium transition-all duration-300 relative {activeTab === 'preview' ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}"
            on:click={() => activeTab = 'preview'}
        >
            Prévisualisation
            {#if activeTab === 'preview'}
                <span class="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-900 rounded-t-full"></span>
            {/if}
        </button>
        <button 
            class="pb-5 text-sm font-medium transition-all duration-300 relative {activeTab === 'ats' ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}"
            on:click={() => activeTab = 'ats'}
        >
            Analyse ATS
            {#if activeTab === 'ats'}
                <span class="absolute bottom-0 left-0 w-full h-[2px] bg-neutral-900 rounded-t-full"></span>
            {/if}
        </button>
    </nav>

    {#if activeTab === 'edit'}
        <div class="grid grid-cols-1 gap-16 lg:grid-cols-12 items-start">
            <!-- Left Column: Spaced Form Sections -->
            <div class="flex flex-col gap-14 lg:col-span-7 xl:col-span-8">
                <PersonalInfo />
                <div class="w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
                <ProfessionalSummary />
                <div class="w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
                <SkillsSection />
                <div class="w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
                <ExperienceSection />
                <div class="w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
                <EducationSection />
                <div class="w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
                <LanguagesSection />
                
                <div class="pt-8">
                    <ExportButtons />
                </div>
            </div>

            <!-- Right Column: Sidebar Sticky -->
            <div class="lg:col-span-5 xl:col-span-4">
                <div class="sticky top-12 flex flex-col gap-8">
                    <!-- Ultra-clean card -->
                    <div class="rounded-3xl bg-neutral-50 p-8 ring-1 ring-neutral-900/5 transition-all hover:bg-neutral-100/50">
                        <ATSScore />
                    </div>
                    
                    <div class="rounded-3xl bg-white p-8 ring-1 ring-neutral-900/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-xs font-semibold uppercase tracking-widest text-neutral-400">Aperçu en direct</h3>
                            <span class="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        </div>
                        <div class="overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50/30 p-3">
                            <Preview />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {:else if activeTab === 'preview'}
        <div class="mx-auto max-w-5xl rounded-3xl bg-white p-10 md:p-16 ring-1 ring-neutral-900/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
            <Preview fullMode={true} />
            
            <div class="mt-16 flex justify-end border-t border-neutral-100 pt-10">
                <ExportButtons />
            </div>
        </div>
    {:else}
        <div class="mx-auto max-w-4xl rounded-3xl bg-white p-10 md:p-16 ring-1 ring-neutral-900/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
            <div class="mb-12 text-center">
                <h2 class="text-2xl font-light text-neutral-900">Analyse de Compatibilité</h2>
                <p class="mt-3 text-sm text-neutral-500 max-w-lg mx-auto">Découvrez comment votre CV sera interprété par les systèmes de suivi des candidatures (ATS) utilisés par les recruteurs.</p>
            </div>
            
            <ATSScore detailed={true} />
            
            <div class="mt-16 flex justify-center border-t border-neutral-100 pt-10">
                <ExportButtons />
            </div>
        </div>
    {/if}
</div>