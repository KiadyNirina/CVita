<!-- $lib/components/templates/MinimalTemplate.svelte -->
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

<div id="cv-preview" class="bg-white w-[210mm] min-h-[297mm] p-[12mm] mx-auto font-serif shadow-xl rounded-2xl border-2 border-neutral-200" style="font-family: 'Georgia', serif;">
    <h1 class="text-5xl font-thin tracking-widest uppercase text-center">{data.personalInfo?.name || 'Nom'}</h1>
    <p class="text-center text-sm uppercase tracking-wider text-neutral-500">{data.personalInfo?.cvTitle}</p>
    <div class="flex justify-center gap-4 text-xs text-neutral-600 mt-2">
        <span>{data.personalInfo?.email}</span>
        <span>•</span>
        <span>{data.personalInfo?.phone}</span>
        <span>•</span>
        <span>{data.personalInfo?.address}</span>
    </div>
    <hr class="my-6 border-neutral-300" />

    {#if data.professionalSummary}
        <section class="mb-6">
            <h2 class="text-sm font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-200 pb-1">Résumé</h2>
            <p class="text-sm text-neutral-700 mt-2">{data.professionalSummary}</p>
        </section>
    {/if}

    {#if data.workExperience.length > 0}
        <section class="mb-6">
            <h2 class="text-sm font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-200 pb-1">Expériences</h2>
            {#each data.workExperience as exp}
                <div class="mt-3">
                    <div class="flex justify-between items-baseline">
                        <h3 class="font-bold text-sm">{exp.jobTitle} – {exp.employer}</h3>
                        <span class="text-xs text-neutral-500">{formatDate(exp.startDate)} – {exp.current ? 'Présent' : formatDate(exp.endDate)}</span>
                    </div>
                    {#if exp.description}
                        <p class="text-xs text-neutral-600 mt-1">{exp.description}</p>
                    {/if}
                </div>
            {/each}
        </section>
    {/if}

    {#if data.education.length > 0}
        <section class="mb-6">
            <h2 class="text-sm font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-200 pb-1">Formation</h2>
            {#each data.education as edu}
                <div class="mt-2 flex justify-between items-baseline">
                    <span class="font-bold text-sm">{edu.degree} – {edu.institution}</span>
                    <span class="text-xs text-neutral-500">{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</span>
                </div>
                {#if edu.field}
                    <p class="text-xs text-neutral-600">{edu.field}</p>
                {/if}
            {/each}
        </section>
    {/if}

    <div class="grid grid-cols-2 gap-6 mt-6">
        {#if data.skills.length > 0}
            <div>
                <h2 class="text-sm font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-200 pb-1">Compétences</h2>
                <ul class="mt-2 text-sm list-disc list-inside">
                    {#each data.skills as skill}
                        <li>{skill.name}</li>
                    {/each}
                </ul>
            </div>
        {/if}
        {#if data.languages.length > 0}
            <div>
                <h2 class="text-sm font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-200 pb-1">Langues</h2>
                <ul class="mt-2 text-sm list-disc list-inside">
                    {#each data.languages as lang}
                        <li>{lang.name} ({proficiencyLabels[lang.proficiency] || lang.proficiency})</li>
                    {/each}
                </ul>
            </div>
        {/if}
    </div>
</div>