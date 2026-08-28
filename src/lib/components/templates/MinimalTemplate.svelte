<!-- $lib/components/templates/MinimalTemplate.svelte -->

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

    function getSocialIcon(label) {
        if (!label) return 'mdi:link-variant';

        const key = label.toLowerCase().trim();

        return socialIconMap[key] || 'mdi:link-variant';
    }
</script>

<div
    id="cv-preview"
    class="cv-container bg-white w-[210mm] min-h-[297mm] p-[12mm] mx-auto font-serif text-neutral-900"
    style="font-family: 'Georgia', serif;"
>


<!-- ========================================================= -->
<!-- EN-TÊTE                                                    -->
<!-- ========================================================= -->

<header class="cv-header mb-6 pb-5 border-b border-neutral-300">

    <div class="text-center">

        <h1 class="text-5xl font-thin tracking-widest uppercase">
            {data.personalInfo?.name || 'Nom'}
        </h1>

        {#if data.personalInfo?.cvTitle}
            <p class="text-sm uppercase tracking-wider text-neutral-500 mt-2">
                {data.personalInfo.cvTitle}
            </p>
        {/if}

        <!-- Coordonnées -->

        <div class="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs text-neutral-600 mt-4">

            {#if data.personalInfo?.email}
                <span class="flex items-center gap-1.5">
                    <Icon
                        icon="mdi:email"
                        class="w-3.5 h-3.5 text-neutral-700"
                    />
                    {data.personalInfo.email}
                </span>
            {/if}

            {#if data.personalInfo?.phone}
                <span class="flex items-center gap-1.5">
                    <Icon
                        icon="mdi:phone"
                        class="w-3.5 h-3.5 text-neutral-700"
                    />
                    {data.personalInfo.phone}
                </span>
            {/if}

            {#if data.personalInfo?.address}
                <span class="flex items-center gap-1.5">
                    <Icon
                        icon="mdi:map-marker"
                        class="w-3.5 h-3.5 text-neutral-700"
                    />
                    {data.personalInfo.address}
                </span>
            {/if}

            {#if data.personalInfo?.linkedin}
                <span class="flex items-center gap-1.5">
                    <Icon
                        icon="mdi:linkedin"
                        class="w-3.5 h-3.5 text-neutral-700"
                    />
                    {data.personalInfo.linkedin}
                </span>
            {/if}

            {#if data.personalInfo?.github}
                <span class="flex items-center gap-1.5">
                    <Icon
                        icon="mdi:github"
                        class="w-3.5 h-3.5 text-neutral-700"
                    />
                    {data.personalInfo.github}
                </span>
            {/if}

            {#if data.personalInfo?.socials?.length}

                {#each data.personalInfo.socials as social}

                    <span class="flex items-center gap-1.5">

                        <Icon
                            icon={getSocialIcon(social.label)}
                            class="w-3.5 h-3.5 text-neutral-700"
                        />

                        {social.url}

                    </span>

                {/each}

            {/if}

        </div>

    </div>

</header>


<!-- ========================================================= -->
<!-- PROFIL                                                     -->
<!-- ========================================================= -->

{#if data.professionalSummary}

    <section class="cv-section mb-5">

        <h2
            class="cv-section-title text-sm font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-200 pb-1"
        >
            Résumé
        </h2>

        <div class="cv-section-items mt-2">

            <div class="cv-item">

                <p class="text-xs text-neutral-700 leading-relaxed whitespace-pre-line">
                    {data.professionalSummary}
                </p>

            </div>

        </div>

    </section>

{/if}


<!-- ========================================================= -->
<!-- EXPÉRIENCES                                                -->
<!-- ========================================================= -->

{#if data.workExperience?.length > 0}

    <section class="cv-section mb-5">

        <h2
            class="cv-section-title text-sm font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-200 pb-1"
        >
            Expériences
        </h2>

        <div class="cv-section-items space-y-3 mt-2">

            {#each data.workExperience as exp}

                <div class="cv-item">

                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">

                        <h3 class="font-bold text-sm">

                            {exp.jobTitle}

                            {#if exp.employer}

                                <span class="font-normal text-neutral-600">
                                    – {exp.employer}
                                </span>

                            {/if}

                        </h3>

                        <div class="text-xs text-neutral-500 whitespace-nowrap">

                            <span>
                                {formatDate(exp.startDate)}
                                –
                                {exp.current ? 'Présent' : formatDate(exp.endDate)}
                            </span>

                            {#if calculateDuration(
                                exp.startDate,
                                exp.endDate,
                                exp.current
                            )}

                                <span class="ml-1 text-neutral-400">
                                    ({calculateDuration(
                                        exp.startDate,
                                        exp.endDate,
                                        exp.current
                                    )})
                                </span>

                            {/if}

                        </div>

                    </div>

                    {#if exp.description}

                        <p class="text-xs text-neutral-600 mt-1 leading-relaxed whitespace-pre-line">
                            {exp.description}
                        </p>

                    {/if}

                </div>

            {/each}

        </div>

    </section>

{/if}


<!-- ========================================================= -->
<!-- FORMATION                                                  -->
<!-- ========================================================= -->

{#if data.education?.length > 0}

    <section class="cv-section mb-5">

        <h2
            class="cv-section-title text-sm font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-200 pb-1"
        >
            Formation
        </h2>

        <div class="cv-section-items space-y-2 mt-2">

            {#each data.education as edu}

                <div class="cv-item">

                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">

                        <h3 class="font-bold text-sm">

                            {edu.degree}

                            {#if edu.institution}

                                <span class="font-normal text-neutral-600">
                                    – {edu.institution}
                                </span>

                            {/if}

                        </h3>

                        <span class="text-xs text-neutral-500 whitespace-nowrap">

                            {formatDate(edu.startDate)}
                            –
                            {edu.current
                                ? 'Présent'
                                : formatDate(edu.endDate)}

                        </span>

                    </div>

                    {#if edu.field}

                        <p class="text-xs text-neutral-600 mt-0.5">
                            {edu.field}
                        </p>

                    {/if}

                </div>

            {/each}

        </div>

    </section>

{/if}


<!-- ========================================================= -->
<!-- CERTIFICATIONS                                             -->
<!-- ========================================================= -->

{#if data.certifications?.length > 0}

    <section class="cv-section mb-5">

        <h2
            class="cv-section-title text-sm font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-200 pb-1"
        >
            Certifications
        </h2>

        <div class="cv-section-items space-y-1 mt-2">

            {#each data.certifications as cert}

                <div class="cv-item">

                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">

                        <h3 class="font-bold text-sm">

                            {cert.name}

                            {#if cert.issuer}

                                <span class="font-normal text-neutral-600">
                                    – {cert.issuer}
                                </span>

                            {/if}

                        </h3>

                        {#if cert.date}

                            <span class="text-xs text-neutral-500 whitespace-nowrap">
                                {formatDate(cert.date)}
                            </span>

                        {/if}

                    </div>

                </div>

            {/each}

        </div>

    </section>

{/if}


<!-- ========================================================= -->
<!-- PROJETS                                                     -->
<!-- ========================================================= -->

{#if data.projects?.length > 0}

    <section class="cv-section mb-5">

        <h2
            class="cv-section-title text-sm font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-200 pb-1"
        >
            Projets
        </h2>

        <div class="cv-section-items space-y-2 mt-2">

            {#each data.projects as project}

                <div class="cv-item">

                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">

                        <h3 class="font-bold text-sm">

                            {project.name}

                            {#if project.role}

                                <span class="font-normal text-neutral-600">
                                    – {project.role}
                                </span>

                            {/if}

                        </h3>

                        {#if project.date}

                            <span class="text-xs text-neutral-500 whitespace-nowrap">
                                {formatDate(project.date)}
                            </span>

                        {/if}

                    </div>

                    {#if project.description}

                        <p class="text-xs text-neutral-600 mt-1 leading-relaxed whitespace-pre-line">
                            {project.description}
                        </p>

                    {/if}

                    {#if project.technologies}

                        <p class="text-[10px] text-neutral-500 mt-0.5">

                            <span class="font-bold">
                                Technologies :
                            </span>

                            {project.technologies}

                        </p>

                    {/if}

                    {#if project.link}

                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-xs text-neutral-600 underline underline-offset-2"
                        >
                            {project.link}
                        </a>

                    {/if}

                </div>

            {/each}

        </div>

    </section>

{/if}


<!-- ========================================================= -->
<!-- COMPÉTENCES                                                -->
<!-- ========================================================= -->

{#if data.skills?.length > 0}

    <section class="cv-section mb-5">

        <h2
            class="cv-section-title text-sm font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-200 pb-1"
        >
            Compétences
        </h2>

        <div class="cv-section-items mt-2">

            {#each data.skills as skill}

                <div class="cv-item">

                    <div class="flex items-center gap-2 text-xs text-neutral-700">

                        <span class="text-neutral-400">
                            •
                        </span>

                        <span>
                            {skill.name}
                        </span>

                    </div>

                </div>

            {/each}

        </div>

    </section>

{/if}


<!-- ========================================================= -->
<!-- LANGUES                                                    -->
<!-- ========================================================= -->

{#if data.languages?.length > 0}

    <section class="cv-section mb-5">

        <h2
            class="cv-section-title text-sm font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-200 pb-1"
        >
            Langues
        </h2>

        <div class="cv-section-items mt-2">

            {#each data.languages as lang}

                <div class="cv-item">

                    <div class="flex items-center justify-between gap-3 text-sm">

                        <span class="text-neutral-700">
                            {lang.name}
                        </span>

                        <span class="text-xs text-neutral-500">
                            {proficiencyLabels[lang.proficiency] || lang.proficiency || ''}
                        </span>

                    </div>

                </div>

            {/each}

        </div>

    </section>

{/if}


</div>
