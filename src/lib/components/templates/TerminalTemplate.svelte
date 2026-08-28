<!-- $lib/components/templates/TerminalTemplate.svelte -->
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
    class="cv-container bg-[#f8faf9] text-slate-900 w-[210mm] min-h-[297mm] p-[12mm] mx-auto border border-slate-300 rounded-xl shadow-xl"
    style="font-family: 'Courier New', Courier, monospace;"
>

    <!-- ========================================================= -->
    <!-- TERMINAL HEADER -->
    <!-- ========================================================= -->

    <header class="cv-header mb-6 overflow-hidden rounded-lg border border-slate-300 bg-white">

        <!-- Terminal bar -->
        <div class="flex items-center justify-between border-b border-slate-300 bg-slate-100 px-4 py-2">

            <div class="flex items-center gap-1.5">
                <span class="h-2.5 w-2.5 rounded-full bg-red-400"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-yellow-400"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-green-500"></span>
            </div>

            <span class="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                ~/resume
            </span>

            <span class="text-[9px] text-slate-400">
                bash
            </span>

        </div>

        <!-- Header content -->
        <div class="px-5 py-5">

            <div class="flex items-center gap-5">

                {#if data.personalInfo?.image}
                    <div class="relative flex-shrink-0">

                        <div
                            class="absolute -inset-1 rounded-lg border border-emerald-300"
                        ></div>

                        <img
                            src={data.personalInfo.image}
                            alt="Profile"
                            class="relative h-20 w-20 rounded-lg object-cover border border-slate-300"
                        />

                    </div>
                {/if}

                <div class="min-w-0 flex-1">

                    <!-- Command -->
                    <div class="mb-2 text-[10px] font-bold text-emerald-600">
                        <span class="text-slate-400">user@cv</span>
                        <span class="text-slate-500">:</span>
                        <span class="text-blue-600">~</span>
                        <span class="text-slate-500">$</span>
                        <span class="ml-1">whoami</span>
                    </div>

                    <h1
                        class="text-3xl font-black uppercase tracking-tight text-slate-900"
                    >
                        {data.personalInfo?.name || 'Votre Nom'}
                    </h1>

                    {#if data.personalInfo?.cvTitle}
                        <div class="mt-1 text-xs font-bold text-emerald-600">
                            &gt; {data.personalInfo.cvTitle}
                        </div>
                    {/if}

                    <!-- Informations -->
                    <div
                        class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[9px] font-medium text-slate-600"
                    >

                        {#if data.personalInfo?.email}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:email-outline"
                                    class="h-3.5 w-3.5 text-emerald-600"
                                />
                                {data.personalInfo.email}
                            </span>
                        {/if}

                        {#if data.personalInfo?.phone}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:phone-outline"
                                    class="h-3.5 w-3.5 text-emerald-600"
                                />
                                {data.personalInfo.phone}
                            </span>
                        {/if}

                        {#if data.personalInfo?.address}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:map-marker-outline"
                                    class="h-3.5 w-3.5 text-emerald-600"
                                />
                                {data.personalInfo.address}
                            </span>
                        {/if}

                        {#if data.personalInfo?.linkedin}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:linkedin"
                                    class="h-3.5 w-3.5 text-blue-600"
                                />
                                {data.personalInfo.linkedin}
                            </span>
                        {/if}

                        {#if data.personalInfo?.github}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:github"
                                    class="h-3.5 w-3.5 text-slate-700"
                                />
                                {data.personalInfo.github}
                            </span>
                        {/if}

                        {#if data.personalInfo?.socials}
                            {#each data.personalInfo.socials as social}
                                <span class="flex items-center gap-1.5">

                                    <Icon
                                        icon={getSocialIcon(social.label)}
                                        class="h-3.5 w-3.5 text-slate-500"
                                    />

                                    {social.url}

                                </span>
                            {/each}
                        {/if}

                    </div>

                </div>

            </div>

        </div>

    </header>


    <!-- ========================================================= -->
    <!-- PROFIL -->
    <!-- ========================================================= -->

    {#if data.professionalSummary}

        <section class="cv-section mb-6">

            <h2
                class="cv-section-title mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900"
            >
                <span class="text-emerald-600">$</span>
                cat profile.txt

                <span class="h-px flex-1 bg-slate-200"></span>
            </h2>

            <div
                class="cv-item border-l-2 border-emerald-400 bg-white px-4 py-3 text-[10px] leading-[1.8] text-slate-600"
            >
                {data.professionalSummary}
            </div>

        </section>

    {/if}


    <!-- ========================================================= -->
    <!-- EXPÉRIENCES -->
    <!-- ========================================================= -->

    {#if data.workExperience?.length > 0}

        <section class="cv-section mb-6">

            <h2
                class="cv-section-title mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900"
            >
                <span class="text-emerald-600">$</span>
                git log --work

                <span class="h-px flex-1 bg-slate-200"></span>
            </h2>

            <div class="cv-section-items space-y-3">

                {#each data.workExperience as exp}

                    <div
                        class="cv-item border border-slate-200 bg-white p-3.5"
                    >

                        <div
                            class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between"
                        >

                            <h3 class="text-xs font-black text-slate-900">

                                <span class="mr-1 text-emerald-600">
                                    └─
                                </span>

                                {exp.jobTitle}

                                {#if exp.employer}
                                    <span class="font-medium text-slate-500">
                                        @ {exp.employer}
                                    </span>
                                {/if}

                            </h3>

                            <div
                                class="mt-1 text-[9px] font-bold text-slate-400 sm:mt-0"
                            >

                                {formatDate(exp.startDate)}
                                –
                                {exp.current
                                    ? 'Présent'
                                    : formatDate(exp.endDate)}

                                {#if calculateDuration(
                                    exp.startDate,
                                    exp.endDate,
                                    exp.current
                                )}

                                    <span class="ml-1 text-emerald-600">
                                        [{calculateDuration(
                                            exp.startDate,
                                            exp.endDate,
                                            exp.current
                                        )}]
                                    </span>

                                {/if}

                            </div>

                        </div>

                        {#if exp.description}

                            <div
                                class="mt-2 whitespace-pre-line border-t border-slate-100 pt-2 text-[10px] leading-[1.7] text-slate-600"
                            >
                                {exp.description}
                            </div>

                        {/if}

                    </div>

                {/each}

            </div>

        </section>

    {/if}


    <!-- ========================================================= -->
    <!-- FORMATION -->
    <!-- ========================================================= -->

    {#if data.education?.length > 0}

        <section class="cv-section mb-6">

            <h2
                class="cv-section-title mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900"
            >
                <span class="text-emerald-600">$</span>
                cat education.log

                <span class="h-px flex-1 bg-slate-200"></span>
            </h2>

            <div class="cv-section-items space-y-2.5">

                {#each data.education as edu}

                    <div
                        class="cv-item border-l-2 border-blue-400 bg-white px-3.5 py-2.5"
                    >

                        <div
                            class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between"
                        >

                            <h3 class="text-xs font-bold text-slate-900">

                                {edu.degree}

                                {#if edu.institution}
                                    <span class="font-medium text-slate-500">
                                        — {edu.institution}
                                    </span>
                                {/if}

                            </h3>

                            <span
                                class="mt-1 text-[9px] text-slate-400 sm:mt-0"
                            >
                                {formatDate(edu.startDate)}
                                –
                                {edu.current
                                    ? 'Présent'
                                    : formatDate(edu.endDate)}
                            </span>

                        </div>

                        {#if edu.field}

                            <div class="mt-1 text-[10px] text-slate-500">
                                {edu.field}
                            </div>

                        {/if}

                    </div>

                {/each}

            </div>

        </section>

    {/if}


    <!-- ========================================================= -->
    <!-- COMPÉTENCES -->
    <!-- ========================================================= -->

    {#if data.skills?.length > 0}

        <section class="cv-section mb-6">

            <h2
                class="cv-section-title mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900"
            >
                <span class="text-emerald-600">$</span>
                ls skills/

                <span class="h-px flex-1 bg-slate-200"></span>
            </h2>

            <div
                class="cv-section-items flex flex-wrap gap-2"
            >

                {#each data.skills as skill}

                    <span
                        class="cv-item border border-slate-300 bg-white px-2.5 py-1 text-[9px] font-bold text-slate-700"
                    >
                        <span class="text-emerald-600">
                            ./ 
                        </span>{skill.name}
                    </span>

                {/each}

            </div>

        </section>

    {/if}


    <!-- ========================================================= -->
    <!-- LANGUES -->
    <!-- ========================================================= -->

    {#if data.languages?.length > 0}

        <section class="cv-section mb-6">

            <h2
                class="cv-section-title mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900"
            >
                <span class="text-emerald-600">$</span>
                locale -a

                <span class="h-px flex-1 bg-slate-200"></span>
            </h2>

            <div
                class="cv-section-items grid grid-cols-2 gap-2 sm:grid-cols-3"
            >

                {#each data.languages as lang}

                    <div
                        class="cv-item border border-slate-200 bg-white px-3 py-2"
                    >

                        <div
                            class="text-[10px] font-bold text-slate-900"
                        >
                            {lang.name}
                        </div>

                        <div
                            class="mt-0.5 text-[8px] uppercase tracking-wide text-emerald-600"
                        >
                            {proficiencyLabels[lang.proficiency] ||
                                lang.proficiency ||
                                ''}
                        </div>

                    </div>

                {/each}

            </div>

        </section>

    {/if}


    <!-- ========================================================= -->
    <!-- CERTIFICATIONS -->
    <!-- ========================================================= -->

    {#if data.certifications?.length > 0}

        <section class="cv-section mb-6">

            <h2
                class="cv-section-title mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900"
            >
                <span class="text-emerald-600">$</span>
                certificates --list

                <span class="h-px flex-1 bg-slate-200"></span>
            </h2>

            <div class="cv-section-items space-y-2">

                {#each data.certifications as cert}

                    <div
                        class="cv-item flex flex-col border border-slate-200 bg-white px-3 py-2.5 sm:flex-row sm:items-baseline sm:justify-between"
                    >

                        <div>

                            <div class="text-xs font-bold text-slate-900">
                                <span class="text-emerald-600">
                                    ✓
                                </span>
                                {cert.name}
                            </div>

                            {#if cert.issuer}
                                <div class="mt-0.5 text-[9px] text-slate-500">
                                    {cert.issuer}
                                </div>
                            {/if}

                        </div>

                        {#if cert.date}
                            <span
                                class="mt-1 text-[9px] text-slate-400 sm:mt-0"
                            >
                                {formatDate(cert.date)}
                            </span>
                        {/if}

                    </div>

                {/each}

            </div>

        </section>

    {/if}


    <!-- ========================================================= -->
    <!-- PROJETS -->
    <!-- ========================================================= -->

    {#if data.projects?.length > 0}

        <section class="cv-section mb-6">

            <h2
                class="cv-section-title mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900"
            >
                <span class="text-emerald-600">$</span>
                ls projects/

                <span class="h-px flex-1 bg-slate-200"></span>
            </h2>

            <div class="cv-section-items space-y-3">

                {#each data.projects as project}

                    <div
                        class="cv-item border border-slate-200 bg-white p-3"
                    >

                        <div
                            class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between"
                        >

                            <h3 class="text-xs font-bold text-slate-900">

                                <span class="text-blue-600">
                                    ├──
                                </span>

                                {project.name}

                                {#if project.role}
                                    <span class="font-medium text-slate-500">
                                        — {project.role}
                                    </span>
                                {/if}

                            </h3>

                            {#if project.date}

                                <span
                                    class="mt-1 text-[9px] text-slate-400 sm:mt-0"
                                >
                                    {formatDate(project.date)}
                                </span>

                            {/if}

                        </div>

                        {#if project.description}

                            <p
                                class="mt-1.5 whitespace-pre-line text-[10px] leading-[1.7] text-slate-600"
                            >
                                {project.description}
                            </p>

                        {/if}

                        {#if project.technologies}

                            <p
                                class="mt-1.5 text-[9px] text-slate-500"
                            >
                                <span class="font-bold text-emerald-600">
                                    tech:
                                </span>

                                {project.technologies}

                            </p>

                        {/if}

                        {#if project.link}

                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="mt-1 block break-all text-[9px] text-blue-600 underline underline-offset-2"
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
    <!-- FOOTER TERMINAL -->
    <!-- ========================================================= -->

    <footer
        class="mt-2 border-t border-slate-300 pt-3 text-[8px] text-slate-400"
    >

        <span class="text-emerald-600">
            user@cv
        </span>

        <span>:</span>

        <span class="text-blue-600">
            ~
        </span>

        <span>$</span>

        <span class="ml-1">
            exit
        </span>

        <span class="ml-1 animate-pulse">
            █
        </span>

    </footer>

</div>

<style>
    /*
     * Les éléments du CV restent indivisibles.
     * Le découpage entre les pages est effectué par A4Paginator.
     */

    :global(.cv-item) {
        break-inside: avoid;
        page-break-inside: avoid;
    }

    :global(.cv-section) {
        break-inside: auto;
        page-break-inside: auto;
    }

    @media print {
        #cv-preview {
            box-shadow: none !important;
            border-radius: 0 !important;
            border: none !important;
        }
    }
</style>