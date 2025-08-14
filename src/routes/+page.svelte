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
    
    <div class="flex border-b border-gray-200 mb-6">
        <button 
            class={`py-2 px-4 font-medium ${activeTab === 'edit' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            on:click={() => activeTab = 'edit'}
        >
            Éditeur
        </button>
        <button 
            class={`py-2 px-4 font-medium ${activeTab === 'preview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            on:click={() => activeTab = 'preview'}
        >
            Prévisualisation
        </button>
        <button 
            class={`py-2 px-4 font-medium ${activeTab === 'ats' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            on:click={() => activeTab = 'ats'}
        >
            Analyse ATS
        </button>
    </div>

    {#if activeTab === 'edit'}
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-6">
                <PersonalInfo />
                <ProfessionalSummary />
                <SkillsSection />
                <ExperienceSection />
                <EducationSection />
                <LanguagesSection />
                <ExportButtons />
            </div>
            <div class="lg:col-span-1">
                <div class="sticky top-4 space-y-6">
                    <ATSScore />
                    <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
                        <h3 class="font-semibold text-lg mb-3">Aperçu instantané</h3>
                        <Preview />
                    </div>
                </div>
            </div>
        </div>
    {:else if activeTab === 'preview'}
        <div class="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
            <Preview fullMode={true} />
            <div class="mt-6">
                <ExportButtons />
            </div>
        </div>
    {:else}
        <div class="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
            <ATSScore detailed={true} />
            <div class="mt-6">
                <ExportButtons />
            </div>
        </div>
    {/if}
</div>