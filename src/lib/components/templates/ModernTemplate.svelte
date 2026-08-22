<!-- $lib/components/templates/ModernTemplate.svelte -->
<script>
    import { formatDate, calculateDuration } from '$lib/utils/templateUtils';
    export let data;
    export let fullMode = false;

    const proficiencyLabels = {
        basic: 'Notions',
        intermediate: 'Intermédiaire',
        fluent: 'Courant',
        native: 'Langue maternelle'
    };
</script>

<div id="cv-preview" class="bg-white w-[210mm] min-h-[297mm] p-[12mm] mx-auto font-sans shadow-xl rounded-2xl border-2 border-neutral-200" style="font-family: 'Inter', sans-serif;">
    <header class="flex items-center gap-6 border-b-4 border-blue-600 pb-4">
        {#if data.personalInfo.image}
            <img src={data.personalInfo.image} alt="Profile" class="w-20 h-20 rounded-full object-cover border-2 border-blue-600" />
        {/if}
        <div>
            <h1 class="text-4xl font-black text-black">{data.personalInfo?.name || 'Nom'}</h1>
            <p class="text-lg font-semibold text-blue-600">{data.personalInfo?.cvTitle}</p>
            <div class="flex flex-wrap gap-x-4 text-sm text-neutral-700 mt-1">
                <span>{data.personalInfo?.email}</span>
                <span>|</span>
                <span>{data.personalInfo?.phone}</span>
                <span>|</span>
                <span>{data.personalInfo?.address}</span>
            </div>
        </div>
    </header>

    <div class="grid grid-cols-3 gap-6 mt-6">
        <!-- Colonne gauche -->
        <div class="col-span-1 space-y-6">
            {#if data.skills.length > 0}
                <div>
                    <h2 class="text-sm font-bold uppercase tracking-wider text-blue-600 border-b border-neutral-300 pb-1">Compétences</h2>
                    <ul class="mt-2 space-y-1">
                        {#each data.skills as skill}
                            <li class="text-sm font-medium">{skill.name}</li>
                        {/each}
                    </ul>
                </div>
            {/if}
            {#if data.languages.length > 0}
                <div>
                    <h2 class="text-sm font-bold uppercase tracking-wider text-blue-600 border-b border-neutral-300 pb-1">Langues</h2>
                    <ul class="mt-2 space-y-1">
                        {#each data.languages as lang}
                            <li class="text-sm font-medium">{lang.name} – {proficiencyLabels[lang.proficiency] || lang.proficiency}</li>
                        {/each}
                    </ul>
                </div>
            {/if}
        </div>
        <!-- Colonne droite -->
        <div class="col-span-2 space-y-6">
            {#if data.professionalSummary}
                <div>
                    <h2 class="text-sm font-bold uppercase tracking-wider text-blue-600 border-b border-neutral-300 pb-1">Profil</h2>
                    <p class="text-sm mt-2 text-neutral-700">{data.professionalSummary}</p>
                </div>
            {/if}
            {#if data.workExperience.length > 0}
                <div>
                    <h2 class="text-sm font-bold uppercase tracking-wider text-blue-600 border-b border-neutral-300 pb-1">Expériences</h2>
                    {#each data.workExperience as exp}
                        <div class="mt-3 border-l-4 border-blue-600 pl-3">
                            <div class="flex justify-between items-baseline">
                                <h3 class="font-bold text-sm">{exp.jobTitle} – {exp.employer}</h3>
                                <span class="text-xs text-neutral-500">{formatDate(exp.startDate)} – {exp.current ? 'Présent' : formatDate(exp.endDate)}</span>
                            </div>
                            {#if exp.description}
                                <p class="text-xs text-neutral-600 mt-1">{exp.description}</p>
                            {/if}
                        </div>
                    {/each}
                </div>
            {/if}
            {#if data.education.length > 0}
                <div>
                    <h2 class="text-sm font-bold uppercase tracking-wider text-blue-600 border-b border-neutral-300 pb-1">Formation</h2>
                    {#each data.education as edu}
                        <div class="mt-2">
                            <div class="flex justify-between items-baseline">
                                <h3 class="font-bold text-sm">{edu.degree} – {edu.institution}</h3>
                                <span class="text-xs text-neutral-500">{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
                            </div>
                            {#if edu.field}
                                <p class="text-xs text-neutral-600">{edu.field}</p>
                            {/if}
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>