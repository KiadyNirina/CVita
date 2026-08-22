<!-- $lib/components/templates/ClassicTemplate.svelte -->
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

<div id="cv-preview"
    class="bg-white w-[210mm] min-h-[297mm] p-[12mm] mx-auto font-sans text-neutral-900 leading-relaxed shadow-xl rounded-2xl border-2 border-neutral-200 transition-all duration-300"
    style="font-family: 'Times New Roman', serif;"
>
    <!-- En-tête -->
    <header class="mb-6 pb-6 border-b-2 border-black">
        <div class="flex items-center gap-6">
            {#if data.personalInfo.image}
                <img 
                    src={data.personalInfo.image} 
                    alt="Profile" 
                    class="w-24 h-24 rounded-2xl object-cover border-2 border-black shadow-sm flex-shrink-0"
                />
            {/if}
            <div class="flex-1">
                <h1 class="text-3xl font-black text-black tracking-tight uppercase mb-1">
                    {data.personalInfo?.name || 'Votre Nom'}
                </h1>
                {#if data.personalInfo?.cvTitle}
                    <h2 class="text-base font-bold text-neutral-600 uppercase tracking-wide mb-3">
                        {data.personalInfo.cvTitle}
                    </h2>
                {/if}
                <div class="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-semibold text-neutral-700">
                    <!-- coordonnées -->
                    {#if data.personalInfo?.email}
                        <span class="flex items-center gap-1.5">
                            <svg class="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            {data.personalInfo.email}
                        </span>
                    {/if}
                    {#if data.personalInfo?.phone}
                        <span class="flex items-center gap-1.5">
                            <svg class="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                            </svg>
                            {data.personalInfo.phone}
                        </span>
                    {/if}
                    {#if data.personalInfo?.address}
                        <span class="flex items-center gap-1.5">
                            <svg class="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            {data.personalInfo.address}
                        </span>
                    {/if}
                    {#if data.personalInfo?.linkedin}
                        <span class="flex items-center gap-1.5">
                            <svg class="w-3.5 h-3.5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                            {data.personalInfo.linkedin}
                        </span>
                    {/if}
                    {#if data.personalInfo?.github}
                        <span class="flex items-center gap-1.5">
                            <svg class="w-3.5 h-3.5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.23c-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.807 1.305 3.492.997a2.49 2.49 0 0 1 .75-1.56c-2.665-.306-5.467-1.334-5.467-5.93a4.63 4.63 0 0 1 1.233-3.208c-.123-.303-.534-1.524.117-3 .001 0 .999-.32 3 .996a10.47 10.47 0 0 1 5.455 0c2-.316 3-.996 3-.996s-.24 2 .117 3a4.63 4.63 0 0 1 1.233 3c0 .001-.002-.001-.002-.001a4.63 4.63 0 0 1-5 .997c0 .001-.001-.001-.002-.001a2.49 2.49 0 0 1 .75 1.56c2 .308 3 .838 3 .838s2 .01-2 .01c0 .001-.001-.001-.002-.001v2c0 .316-.192 .69-.793 .577a12,12,0,0,0,8,11v2c0,.316,.192,.688,.793,.577A12,12,0,0,0,24,12C24,5,18,0,12,0z"/>
                            </svg>
                            {data.personalInfo.github}
                        </span>
                    {/if}
                </div>
            </div>
        </div>
    </header>

    <!-- Résumé -->
    {#if data.professionalSummary}
        <section class="mb-6">
            <h2 class="text-xs font-black uppercase tracking-widest text-black border-b-2 border-neutral-200 pb-1 mb-2">
                Profil Professionnel
            </h2>
            <p class="text-xs font-medium text-neutral-700 whitespace-pre-line leading-relaxed">
                {data.professionalSummary}
            </p>
        </section>
    {/if}

    <!-- Expériences -->
    {#if data.workExperience.length > 0}
        <section class="mb-6">
            <h2 class="text-xs font-black uppercase tracking-widest text-black border-b-2 border-neutral-200 pb-1 mb-3">
                Expérience Professionnelle
            </h2>
            <div class="space-y-4">
                {#each data.workExperience as exp}
                    <div class="pl-3 border-l-2 border-black">
                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                            <h3 class="text-sm font-bold text-black">
                                {exp.jobTitle} 
                                {#if exp.employer}
                                    <span class="font-semibold text-neutral-600">— {exp.employer}</span>
                                {/if}
                            </h3>
                            <div class="text-[11px] font-bold text-neutral-500 mt-0.5 sm:mt-0">
                                <span>{formatDate(exp.startDate)} – {exp.current ? 'Présent' : formatDate(exp.endDate)}</span>
                                {#if calculateDuration(exp.startDate, exp.endDate, exp.current)}
                                    <span class="ml-1 text-neutral-400">({calculateDuration(exp.startDate, exp.endDate, exp.current)})</span>
                                {/if}
                            </div>
                        </div>
                        {#if exp.description}
                            <div class="mt-1 text-xs font-medium text-neutral-700 whitespace-pre-line leading-relaxed">
                                {exp.description}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </section>
    {/if}

    <!-- Formation -->
    {#if data.education.length > 0}
        <section class="mb-6">
            <h2 class="text-xs font-black uppercase tracking-widest text-black border-b-2 border-neutral-200 pb-1 mb-3">
                Formation
            </h2>
            <div class="space-y-3">
                {#each data.education as edu}
                    <div class="pl-3 border-l-2 border-black">
                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                            <h3 class="text-sm font-bold text-black">
                                {edu.degree} 
                                {#if edu.institution}
                                    <span class="font-semibold text-neutral-600">— {edu.institution}</span>
                                {/if}
                            </h3>
                            <div class="text-[11px] font-bold text-neutral-500 mt-0.5 sm:mt-0">
                                {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                            </div>
                        </div>
                        {#if edu.field}
                            <div class="mt-0.5 text-xs font-medium text-neutral-700">
                                {edu.field}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </section>
    {/if}

    <!-- Compétences -->
    {#if data.skills.length > 0}
        <section class="mb-6">
            <h2 class="text-xs font-black uppercase tracking-widest text-black border-b-2 border-neutral-200 pb-1 mb-3">
                Compétences
            </h2>
            <div class="flex flex-wrap gap-1.5">
                {#each data.skills as skill}
                    <span class="bg-neutral-100 text-neutral-900 border border-neutral-300 font-bold px-2.5 py-1 rounded-md text-xs">
                        {skill.name}
                    </span>
                {/each}
            </div>
        </section>
    {/if}

    <!-- Langues -->
    {#if data.languages.length > 0}
        <section class="mb-6">
            <h2 class="text-xs font-black uppercase tracking-widest text-black border-b-2 border-neutral-200 pb-1 mb-3">
                Langues
            </h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {#each data.languages as lang}
                    <div class="flex items-center justify-between p-2 rounded-lg border border-neutral-200 bg-neutral-50">
                        <span class="font-bold text-xs text-black">{lang.name}</span>
                        <span class="text-[10px] font-bold text-neutral-600 uppercase">
                            {proficiencyLabels[lang.proficiency] || lang.proficiency || ''}
                        </span>
                    </div>
                {/each}
            </div>
        </section>
    {/if}
</div>