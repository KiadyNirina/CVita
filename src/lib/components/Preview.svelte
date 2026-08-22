<script>
    import { cvStore } from '$lib/stores/cvStore';
    import { formatToMMYYYY } from '$lib/utils/dateUtils';
    
    export let fullMode = false;
    
    // Formatage des dates pour l'affichage
    const formatDate = (dateStr) => {
        return dateStr ? formatToMMYYYY(dateStr) : 'Présent';
    };
    
    // Calcul de la durée entre deux dates
    const calculateDuration = (startDate, endDate, isCurrent) => {
        if (!startDate) return '';
        
        const start = new Date(startDate);
        const end = isCurrent ? new Date() : new Date(endDate || new Date());
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        
        if (months < 12) {
            return `${months} mois`;
        } else {
            const years = Math.floor(months / 12);
            const remainingMonths = months % 12;
            return `${years} an${years > 1 ? 's' : ''}${remainingMonths ? ` ${remainingMonths} mois` : ''}`;
        }
    };
</script>

<div
    id="cv-preview"
    class="bg-white w-[210mm] min-h-[297mm] p-[15mm] mx-auto font-sans text-gray-800 leading-relaxed shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl border border-gray-400"
>
    <!-- En-tête -->
    <header class="mb-6 pb-4 border-b border-gray-100">
        <div class="flex items-center justify-center gap-4">
            {#if $cvStore.personalInfo.image}
                <img 
                    src={$cvStore.personalInfo.image} 
                    alt="Profile" 
                    class="w-30 rounded-full object-cover border-4 border-blue-100 shadow-sm transition-transform duration-300 hover:scale-105"
                />
            {/if}
            <div class="pl-10 text-left">
                <h1 class="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">
                    {$cvStore.personalInfo.name}
                </h1>
                {#if $cvStore.personalInfo.cvTitle}
                    <h2 class="text-lg font-medium text-blue-600 mb-2 italic">
                        {$cvStore.personalInfo.cvTitle}
                    </h2>
                {/if}
                <div class="flex flex-wrap gap-x-4 gap-y-1 text-gray-600 text-sm">
                    {#if $cvStore.personalInfo.email}
                        <span class="flex items-center hover:text-blue-500 transition-colors">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            {$cvStore.personalInfo.email}
                        </span>
                    {/if}
                    {#if $cvStore.personalInfo.phone}
                        <span class="flex items-center hover:text-blue-500 transition-colors">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                            </svg>
                            {$cvStore.personalInfo.phone}
                        </span>
                    {/if}
                    {#if $cvStore.personalInfo.address}
                        <span class="flex items-center hover:text-blue-500 transition-colors">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            {$cvStore.personalInfo.address}
                        </span>
                    {/if}
                    {#if $cvStore.personalInfo.linkedin}
                        <span class="flex items-center hover:text-blue-500 transition-colors">
                            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                            {$cvStore.personalInfo.linkedin}
                        </span>
                    {/if}
                    {#if $cvStore.personalInfo.github}
                        <span class="flex items-center hover:text-blue-500 transition-colors">
                            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.23c-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.807 1.305 3.492.997a2.49 2.49 0 0 1 .75-1.56c-2.665-.306-5.467-1.334-5.467-5.93a4.63 4.63 0 0 1 1.233-3.208c-.123-.303-.534-1.524.117-3 .001 0 .999-.32 3 .996a10.47 10.47 0 0 1 5.455 0c2-.316 3-.996 3-.996s-.24 2 .117 3a4.63 4.63 0 0 1 1.233 3c0 .001-.002-.001-.002-.001a4.63 4.63 0 0 1-5 .997c0 .001-.001-.001-.002-.001a2.49 2.49 0 0 1 .75 1.56c2 .308 3 .838 3 .838s2 .01-2 .01c0 .001-.001-.001-.002-.001v2c0 .316-.192 .69-.793 .577a12,12,0,0,0,8,11v2c0,.316,.192,.688,.793,.577A12,12,0,0,0,24,12C24,5,18,0,12,0z"/>
                            </svg>
                            {$cvStore.personalInfo.github}
                        </span>
                    {/if}
                </div>
            </div>
        </div>
    </header>

    <!-- Résumé professionnel -->
    {#if $cvStore.professionalSummary}
        <section class="mb-6">
            <h2 class="text-xl font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2 tracking-wide">Profil Professionnel</h2>
            <p class="text-gray-700 whitespace-pre-line leading-7 text-sm">{$cvStore.professionalSummary}</p>
        </section>
    {/if}

    <!-- Expérience professionnelle -->
    {#if $cvStore.workExperience.length > 0}
        <section class="mb-6">
            <h2 class="text-xl font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2 tracking-wide">Expérience Professionnelle</h2>
            <div class="space-y-4">
                {#each $cvStore.workExperience as exp}
                    <div class="pl-4 border-l-2 border-blue-400">
                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                            <h3 class="text-lg font-semibold text-gray-900">
                                {exp.jobTitle} 
                                {#if exp.employer}
                                    <span class="font-normal text-gray-700">chez {exp.employer}</span>
                                {/if}
                            </h3>
                            <div class="flex items-baseline text-sm text-gray-500 mt-1 sm:mt-0">
                                <span>{formatDate(exp.startDate)} - {exp.current ? 'Présent' : formatDate(exp.endDate)}</span>
                                <span class="mx-2">•</span>
                                <span>{calculateDuration(exp.startDate, exp.endDate, exp.current)}</span>
                            </div>
                        </div>
                        {#if exp.description}
                            <div class="mt-2 text-gray-700 whitespace-pre-line pl-2 leading-6 text-sm">
                                {exp.description}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </section>
    {/if}

    <!-- Formation -->
    {#if $cvStore.education.length > 0}
        <section class="mb-6">
            <h2 class="text-xl font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2 tracking-wide">Formation</h2>
            <div class="space-y-3">
                {#each $cvStore.education as edu}
                    <div class="pl-4 border-l-2 border-blue-400">
                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                            <h3 class="font-semibold text-gray-900">
                                {edu.degree} 
                                {#if edu.institution}
                                    <span class="font-normal text-gray-700">- {edu.institution}</span>
                                {/if}
                            </h3>
                            <div class="text-sm text-gray-500 mt-1 sm:mt-0">
                                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                            </div>
                        </div>
                        {#if edu.field}
                            <div class="mt-1 text-gray-700 text-sm pl-2 leading-6">
                                {edu.field}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </section>
    {/if}

    <!-- Compétences -->
    {#if $cvStore.skills.length > 0}
        <section class="mb-6">
            <h2 class="text-xl font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2 tracking-wide">Compétences</h2>
            <div class="flex flex-wrap gap-2">
                {#each $cvStore.skills as skill}
                    <span class="bg-gray-300 px-3 py-1 rounded-full text-sm text-gray-800 flex items-center transition-colors duration-200 hover:bg-blue-100">
                        <!-- {#if skill.level}
                            <span class="mr-2 text-xs text-gray-500">{skill.level}/5</span>
                        {/if} -->
                        {skill.name}
                    </span>
                {/each}
            </div>
        </section>
    {/if}

    <!-- Langues -->
    {#if $cvStore.languages.length > 0}
        <section class="mb-6">
            <h2 class="text-xl font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2 tracking-wide">Langues</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {#each $cvStore.languages as lang}
                    <div class="flex items-center">
                        <span class="font-medium text-gray-700 w-24">{lang.name}</span>
                        <div class="flex-1 ml-2">
                            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                    class="h-full bg-blue-500 transition-all duration-300" 
                                    style={`width: ${(lang.level / 5) * 100}%`}
                                ></div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </section>
    {/if}

    <!-- Projets -->
    {#if $cvStore.projects.length > 0}
        <section class="mb-6">
            <h2 class="text-xl font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2 tracking-wide">Projets</h2>
            <div class="space-y-3">
                {#each $cvStore.projects as project}
                    <div>
                        <h3 class="font-semibold text-gray-900">
                            {project.name}
                            {#if project.technologies}
                                <span class="text-sm font-normal text-gray-500 ml-2">
                                    ({project.technologies.join(', ')})
                                </span>
                            {/if}
                        </h3>
                        {#if project.description}
                            <div class="mt-1 text-gray-700 leading-6">
                                {project.description}
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        </section>
    {/if}
</div>