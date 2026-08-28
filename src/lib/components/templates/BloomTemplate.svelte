<!-- $lib/components/templates/BloomTemplate.svelte -->
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
    class="cv-container bg-[#fbf8f6] w-[210mm] min-h-[297mm] p-[12mm] mx-auto text-[#30272b]"
    style="font-family: 'Georgia', 'Times New Roman', serif;"
>
    <!-- ========================================================= -->
    <!-- HEADER -->
    <!-- ========================================================= -->

    <header class="cv-header mb-7">
        <div
            class="relative overflow-hidden rounded-[28px] border border-[#4a3540] bg-[#ead9df] px-7 py-7"
        >
            <!-- Formes décoratives -->

            <div
                class="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#b98b9b]/50"
            ></div>

            <div
                class="absolute -bottom-20 left-20 h-40 w-40 rounded-full bg-[#d7c4d0]/70"
            ></div>

            <div
                class="absolute right-20 bottom-5 h-3 w-3 rounded-full bg-[#8c6173]"
            ></div>

            <div
                class="absolute right-28 top-10 h-5 w-5 rounded-full border border-[#8c6173]"
            ></div>

            <div class="relative flex items-center gap-6">
                {#if data.personalInfo?.image}
                    <div class="relative flex-shrink-0">
                        <div
                            class="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[22px] bg-[#4a3540]"
                        ></div>

                        <img
                            src={data.personalInfo.image}
                            alt="Profile"
                            class="relative h-28 w-28 rounded-[22px] border-2 border-[#4a3540] object-cover"
                        />
                    </div>
                {/if}

                <div class="min-w-0 flex-1">

                    <h1
                        class="text-4xl font-bold tracking-tight text-[#3b2932]"
                    >
                        {data.personalInfo?.name || 'Votre Nom'}
                    </h1>

                    {#if data.personalInfo?.cvTitle}
                        <h2
                            class="mt-1 text-base italic text-[#765464]"
                        >
                            {data.personalInfo.cvTitle}
                        </h2>
                    {/if}

                    <div
                        class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-medium text-[#57434c]"
                    >
                        {#if data.personalInfo?.email}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:email-outline"
                                    class="h-3.5 w-3.5 text-[#8c6173]"
                                />
                                {data.personalInfo.email}
                            </span>
                        {/if}

                        {#if data.personalInfo?.phone}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:phone-outline"
                                    class="h-3.5 w-3.5 text-[#8c6173]"
                                />
                                {data.personalInfo.phone}
                            </span>
                        {/if}

                        {#if data.personalInfo?.address}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:map-marker-outline"
                                    class="h-3.5 w-3.5 text-[#8c6173]"
                                />
                                {data.personalInfo.address}
                            </span>
                        {/if}

                        {#if data.personalInfo?.linkedin}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:linkedin"
                                    class="h-3.5 w-3.5 text-[#8c6173]"
                                />
                                {data.personalInfo.linkedin}
                            </span>
                        {/if}

                        {#if data.personalInfo?.github}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:github"
                                    class="h-3.5 w-3.5 text-[#8c6173]"
                                />
                                {data.personalInfo.github}
                            </span>
                        {/if}

                        {#if data.personalInfo?.socials}
                            {#each data.personalInfo.socials as social}
                                <span class="flex items-center gap-1.5">
                                    <Icon
                                        icon={getSocialIcon(social.label)}
                                        class="h-3.5 w-3.5 text-[#8c6173]"
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
            <div
                class="cv-section-title mb-3 flex items-center gap-3"
            >
                <span
                    class="text-2xl italic text-[#b98b9b]"
                >
                    01
                </span>

                <h2
                    class="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4a3540]"
                >
                    À propos
                </h2>

                <div class="h-px flex-1 bg-[#d9c7ce]"></div>
            </div>

            <div class="cv-section-items">
                <div
                    class="cv-item rounded-[20px] border border-[#dfd0d5] bg-white px-5 py-4"
                >
                    <p
                        class="text-xs leading-[1.8] text-[#5b4c52] whitespace-pre-line"
                    >
                        {data.professionalSummary}
                    </p>
                </div>
            </div>
        </section>
    {/if}

    <!-- ========================================================= -->
    <!-- EXPÉRIENCES -->
    <!-- ========================================================= -->

    {#if data.workExperience?.length > 0}
        <section class="cv-section mb-6">
            <div
                class="cv-section-title mb-4 flex items-center gap-3"
            >
                <span
                    class="text-2xl italic text-[#b98b9b]"
                >
                    02
                </span>

                <h2
                    class="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4a3540]"
                >
                    Expériences
                </h2>

                <div class="h-px flex-1 bg-[#d9c7ce]"></div>
            </div>

            <div class="cv-section-items space-y-3">
                {#each data.workExperience as exp}
                    <div
                        class="cv-item relative rounded-[20px] border border-[#dfd0d5] bg-white px-5 py-4"
                    >
                        <div
                            class="absolute left-0 top-5 h-8 w-1 rounded-r-full bg-[#b98b9b]"
                        ></div>

                        <div
                            class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between"
                        >
                            <h3
                                class="text-sm font-bold text-[#3b2932]"
                            >
                                {exp.jobTitle}

                                {#if exp.employer}
                                    <span
                                        class="font-normal italic text-[#765464]"
                                    >
                                        — {exp.employer}
                                    </span>
                                {/if}
                            </h3>

                            <div
                                class="mt-1 text-[10px] font-medium text-[#9a818b] sm:mt-0"
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
                                    <span class="ml-1">
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
                            <p
                                class="mt-2 text-xs leading-[1.75] text-[#65565d] whitespace-pre-line"
                            >
                                {exp.description}
                            </p>
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
            <div
                class="cv-section-title mb-4 flex items-center gap-3"
            >
                <span
                    class="text-2xl italic text-[#b98b9b]"
                >
                    03
                </span>

                <h2
                    class="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4a3540]"
                >
                    Formation
                </h2>

                <div class="h-px flex-1 bg-[#d9c7ce]"></div>
            </div>

            <div class="cv-section-items space-y-3">
                {#each data.education as edu}
                    <div
                        class="cv-item rounded-[20px] border border-[#dfd0d5] bg-[#fdfafb] px-5 py-4"
                    >
                        <div
                            class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between"
                        >
                            <h3
                                class="text-sm font-bold text-[#3b2932]"
                            >
                                {edu.degree}

                                {#if edu.institution}
                                    <span
                                        class="font-normal italic text-[#765464]"
                                    >
                                        — {edu.institution}
                                    </span>
                                {/if}
                            </h3>

                            <span
                                class="mt-1 text-[10px] font-medium text-[#9a818b] sm:mt-0"
                            >
                                {formatDate(edu.startDate)}
                                –
                                {edu.current
                                    ? 'Présent'
                                    : formatDate(edu.endDate)}
                            </span>
                        </div>

                        {#if edu.field}
                            <p
                                class="mt-1 text-xs text-[#65565d]"
                            >
                                {edu.field}
                            </p>
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
            <div
                class="cv-section-title mb-4 flex items-center gap-3"
            >
                <span
                    class="text-2xl italic text-[#b98b9b]"
                >
                    04
                </span>

                <h2
                    class="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4a3540]"
                >
                    Compétences
                </h2>

                <div class="h-px flex-1 bg-[#d9c7ce]"></div>
            </div>

            <div
                class="cv-section-items flex flex-wrap gap-2"
            >
                {#each data.skills as skill}
                    <div
                        class="cv-item rounded-full border border-[#c8a9b5] bg-[#f5eaee] px-3.5 py-1.5 text-xs font-semibold text-[#654655]"
                    >
                        {skill.name}
                    </div>
                {/each}
            </div>
        </section>
    {/if}

    <!-- ========================================================= -->
    <!-- LANGUES -->
    <!-- ========================================================= -->

    {#if data.languages?.length > 0}
        <section class="cv-section mb-6">
            <div
                class="cv-section-title mb-4 flex items-center gap-3"
            >
                <span
                    class="text-2xl italic text-[#b98b9b]"
                >
                    05
                </span>

                <h2
                    class="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4a3540]"
                >
                    Langues
                </h2>

                <div class="h-px flex-1 bg-[#d9c7ce]"></div>
            </div>

            <div class="cv-section-items grid grid-cols-2 gap-3">
                {#each data.languages as lang}
                    <div
                        class="cv-item flex items-center justify-between rounded-[16px] border border-[#dfd0d5] bg-white px-4 py-3"
                    >
                        <span
                            class="text-xs font-bold text-[#4a3540]"
                        >
                            {lang.name}
                        </span>

                        <span
                            class="text-[9px] uppercase tracking-wide text-[#9a818b]"
                        >
                            {proficiencyLabels[lang.proficiency] ||
                                lang.proficiency ||
                                ''}
                        </span>
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
            <div
                class="cv-section-title mb-4 flex items-center gap-3"
            >
                <span
                    class="text-2xl italic text-[#b98b9b]"
                >
                    06
                </span>

                <h2
                    class="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4a3540]"
                >
                    Certifications
                </h2>

                <div class="h-px flex-1 bg-[#d9c7ce]"></div>
            </div>

            <div class="cv-section-items space-y-2">
                {#each data.certifications as cert}
                    <div
                        class="cv-item rounded-[18px] border border-[#dfd0d5] bg-white px-5 py-3"
                    >
                        <div
                            class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between"
                        >
                            <div>
                                <h3
                                    class="text-sm font-bold text-[#3b2932]"
                                >
                                    {cert.name}
                                </h3>

                                {#if cert.issuer}
                                    <p
                                        class="text-xs italic text-[#765464]"
                                    >
                                        {cert.issuer}
                                    </p>
                                {/if}
                            </div>

                            {#if cert.date}
                                <span
                                    class="mt-1 text-[10px] text-[#9a818b] sm:mt-0"
                                >
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
    <!-- PROJETS -->
    <!-- ========================================================= -->

    {#if data.projects?.length > 0}
        <section class="cv-section mb-6">
            <div
                class="cv-section-title mb-4 flex items-center gap-3"
            >
                <span
                    class="text-2xl italic text-[#b98b9b]"
                >
                    07
                </span>

                <h2
                    class="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4a3540]"
                >
                    Projets
                </h2>

                <div class="h-px flex-1 bg-[#d9c7ce]"></div>
            </div>

            <div class="cv-section-items space-y-3">
                {#each data.projects as project}
                    <div
                        class="cv-item rounded-[20px] border border-[#dfd0d5] bg-[#fdfafb] px-5 py-4"
                    >
                        <div
                            class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between"
                        >
                            <h3
                                class="text-sm font-bold text-[#3b2932]"
                            >
                                {project.name}

                                {#if project.role}
                                    <span
                                        class="font-normal italic text-[#765464]"
                                    >
                                        — {project.role}
                                    </span>
                                {/if}
                            </h3>

                            {#if project.date}
                                <span
                                    class="mt-1 text-[10px] text-[#9a818b] sm:mt-0"
                                >
                                    {formatDate(project.date)}
                                </span>
                            {/if}
                        </div>

                        {#if project.description}
                            <p
                                class="mt-2 text-xs leading-[1.75] text-[#65565d] whitespace-pre-line"
                            >
                                {project.description}
                            </p>
                        {/if}

                        {#if project.technologies}
                            <p
                                class="mt-2 text-[10px] text-[#8b727c]"
                            >
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
                                class="mt-1 inline-block text-[10px] text-[#765464] underline underline-offset-2"
                            >
                                {project.link}
                            </a>
                        {/if}
                    </div>
                {/each}
            </div>
        </section>
    {/if}
</div>