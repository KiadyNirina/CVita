<!-- $lib/components/templates/ClassicTemplate.svelte -->
<script>
    import { formatDate, calculateDuration } from '$lib/utils/templateUtils';
    import Icon from '@iconify/svelte';

    export let data;
    export let fullMode = false;

    const proficiencyLabels = {
        basic: 'Notions',
        intermediate: 'Intermédiaire',
        fluent: 'Courant',
        native: 'Langue maternelle'
    };

    // Mapping des réseaux sociaux vers les icônes Iconify
    const socialIconMap = {
        facebook: 'mdi:facebook',
        twitter: 'mdi:twitter',
        instagram: 'mdi:instagram',
        youtube: 'mdi:youtube',
        tiktok: 'mdi:tiktok',
        snapchat: 'mdi:snapchat',
        pinterest: 'mdi:pinterest',
        reddit: 'mdi:reddit',
        whatsapp: 'mdi:whatsapp',
        telegram: 'mdi:telegram',
        discord: 'mdi:discord',
        mastodon: 'mdi:mastodon',
        other: 'mdi:link-variant',
        linkedin: 'mdi:linkedin',
        github: 'mdi:github'
    };

    // Fonction utilitaire pour récupérer l'icône d'un réseau
    function getSocialIcon(label) {
        if (!label) return 'mdi:link-variant';
        const key = label.toLowerCase().trim();
        return socialIconMap[key] || 'mdi:link-variant';
    }
</script>

<div
    id="cv-preview"
    class="bg-white w-[210mm] min-h-[297mm] p-[12mm] mx-auto font-sans text-neutral-900 leading-relaxed shadow-xl rounded-2xl border-2 border-neutral-200 transition-all duration-300"
    style="font-family: 'Times New Roman', serif;"
>
    <!-- En-tête -->
    <header class="cv-header mb-6 pb-6 border-b-2 border-black">
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
                    <!-- Email -->
                    {#if data.personalInfo?.email}
                        <span class="flex items-center gap-1.5">
                            <Icon icon="mdi:email" class="w-3.5 h-3.5 text-black" />
                            {data.personalInfo.email}
                        </span>
                    {/if}
                    <!-- Téléphone -->
                    {#if data.personalInfo?.phone}
                        <span class="flex items-center gap-1.5">
                            <Icon icon="mdi:phone" class="w-3.5 h-3.5 text-black" />
                            {data.personalInfo.phone}
                        </span>
                    {/if}
                    <!-- Adresse -->
                    {#if data.personalInfo?.address}
                        <span class="flex items-center gap-1.5">
                            <Icon icon="mdi:map-marker" class="w-3.5 h-3.5 text-black" />
                            {data.personalInfo.address}
                        </span>
                    {/if}
                    <!-- LinkedIn -->
                    {#if data.personalInfo?.linkedin}
                        <span class="flex items-center gap-1.5">
                            <Icon icon="mdi:linkedin" class="w-3.5 h-3.5 text-black" />
                            {data.personalInfo.linkedin}
                        </span>
                    {/if}
                    <!-- GitHub -->
                    {#if data.personalInfo?.github}
                        <span class="flex items-center gap-1.5">
                            <Icon icon="mdi:github" class="w-3.5 h-3.5 text-black" />
                            {data.personalInfo.github}
                        </span>
                    {/if}
                    <!-- Réseaux sociaux additionnels -->
                    {#if data.personalInfo?.socials}
                        {#each data.personalInfo.socials as social}
                            <span class="flex items-center gap-1.5">
                                <Icon icon={getSocialIcon(social.label)} class="w-3.5 h-3.5 text-black" />
                                {social.url}
                            </span>
                        {/each}
                    {/if}
                </div>
            </div>
        </div>
    </header>

    <!-- Résumé -->
    {#if data.professionalSummary}
        <section class="cv-section mb-6">
            <h2 class="cv-section-title text-xs font-black uppercase tracking-widest text-black border-b-2 border-neutral-200 pb-1 mb-2">
                Profil Professionnel
            </h2>
            <p class="text-xs font-medium text-neutral-700 whitespace-pre-line leading-relaxed">
                {data.professionalSummary}
            </p>
        </section>
    {/if}

    <!-- Expériences -->
    {#if data.workExperience.length > 0}
        <section class="cv-section mb-6">
            <h2 class="cv-section-title text-xs font-black uppercase tracking-widest text-black border-b-2 border-neutral-200 pb-1 mb-3">
                Expérience Professionnelle
            </h2>
            <div class="cv-section-items space-y-4">
                {#each data.workExperience as exp}
                    <div class="cv-item pl-3 border-l-2 border-black">
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
        <section class="cv-section mb-6">
            <h2 class="cv-section-title text-xs font-black uppercase tracking-widest text-black border-b-2 border-neutral-200 pb-1 mb-3">
                Formation
            </h2>
            <div class="cv-section-items space-y-3">
                {#each data.education as edu}
                    <div class="cv-item pl-3 border-l-2 border-black">
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