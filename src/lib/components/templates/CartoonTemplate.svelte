<!-- $lib/components/templates/CartoonTemplate.svelte -->
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
    class="cv-container bg-[#fffdf7] w-[210mm] min-h-[297mm] p-[12mm] mx-auto text-slate-900"
    style="font-family: 'Trebuchet MS', 'Arial Rounded MT Bold', sans-serif;"
>
    <!-- ========================================================= -->
    <!-- HEADER -->
    <!-- ========================================================= -->

    <header class="cv-header mb-7">
        <div
            class="relative overflow-hidden rounded-[24px] border-[3px] border-slate-900 bg-[#ffd84d] px-6 py-6"
        >
            <!-- Décorations cartoon -->

            <div
                class="absolute -right-10 -top-10 h-28 w-28 rounded-full border-[3px] border-slate-900 bg-[#ff7b72]"
            ></div>

            <div
                class="absolute -bottom-12 -left-8 h-24 w-24 rounded-full border-[3px] border-slate-900 bg-[#70d6ff]"
            ></div>

            <div
                class="absolute right-24 top-5 h-5 w-5 rotate-12 rounded-full border-2 border-slate-900 bg-white"
            ></div>

            <div
                class="absolute right-14 bottom-8 h-3 w-3 rounded-full bg-slate-900"
            ></div>

            <div class="relative flex items-center gap-6">
                {#if data.personalInfo?.image}
                    <div class="relative flex-shrink-0">
                        <div
                            class="absolute inset-0 translate-x-1 translate-y-1 rounded-[18px] bg-slate-900"
                        ></div>

                        <img
                            src={data.personalInfo.image}
                            alt="Profile"
                            class="relative h-24 w-24 rounded-[18px] border-[3px] border-slate-900 object-cover"
                        />
                    </div>
                {/if}

                <div class="min-w-0 flex-1">

                    <h1
                        class="text-4xl font-black uppercase tracking-tight text-slate-900"
                    >
                        {data.personalInfo?.name || 'Votre Nom'}
                    </h1>

                    {#if data.personalInfo?.cvTitle}
                        <h2
                            class="mt-1 text-base font-black text-slate-800"
                        >
                            {data.personalInfo.cvTitle}
                        </h2>
                    {/if}

                    <div
                        class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold text-slate-800"
                    >
                        {#if data.personalInfo?.email}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:email"
                                    class="h-3.5 w-3.5"
                                />
                                {data.personalInfo.email}
                            </span>
                        {/if}

                        {#if data.personalInfo?.phone}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:phone"
                                    class="h-3.5 w-3.5"
                                />
                                {data.personalInfo.phone}
                            </span>
                        {/if}

                        {#if data.personalInfo?.address}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:map-marker"
                                    class="h-3.5 w-3.5"
                                />
                                {data.personalInfo.address}
                            </span>
                        {/if}

                        {#if data.personalInfo?.linkedin}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:linkedin"
                                    class="h-3.5 w-3.5"
                                />
                                {data.personalInfo.linkedin}
                            </span>
                        {/if}

                        {#if data.personalInfo?.github}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:github"
                                    class="h-3.5 w-3.5"
                                />
                                {data.personalInfo.github}
                            </span>
                        {/if}

                        {#if data.personalInfo?.socials}
                            {#each data.personalInfo.socials as social}
                                <span class="flex items-center gap-1.5">
                                    <Icon
                                        icon={getSocialIcon(social.label)}
                                        class="h-3.5 w-3.5"
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
                <div
                    class="flex h-8 w-8 flex-shrink-0 rotate-[-4deg] items-center justify-center rounded-xl border-2 border-slate-900 bg-[#70d6ff]"
                >
                    <Icon
                        icon="mdi:account-star"
                        class="h-4 w-4"
                    />
                </div>

                <h2
                    class="text-[11px] font-black uppercase tracking-[0.16em]"
                >
                    Profil
                </h2>

                <div
                    class="h-[3px] flex-1 rounded-full bg-slate-900"
                ></div>
            </div>

            <div
                class="cv-section-items"
            >
                <div
                    class="cv-item rounded-[18px] border-[3px] border-slate-900 bg-white px-4 py-3"
                >
                    <p
                        class="text-xs font-semibold leading-[1.7] whitespace-pre-line"
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
                class="cv-section-title mb-3 flex items-center gap-3"
            >
                <div
                    class="flex h-8 w-8 flex-shrink-0 rotate-[4deg] items-center justify-center rounded-xl border-2 border-slate-900 bg-[#ff7b72]"
                >
                    <Icon
                        icon="mdi:briefcase"
                        class="h-4 w-4"
                    />
                </div>

                <h2
                    class="text-[11px] font-black uppercase tracking-[0.16em]"
                >
                    Expérience professionnelle
                </h2>

                <div
                    class="h-[3px] flex-1 rounded-full bg-slate-900"
                ></div>
            </div>

            <div class="cv-section-items space-y-3">
                {#each data.workExperience as exp}
                    <div
                        class="cv-item rounded-[18px] border-[3px] border-slate-900 bg-[#fff0ed] px-4 py-3"
                    >
                        <div
                            class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between"
                        >
                            <h3 class="text-sm font-black">
                                {exp.jobTitle}

                                {#if exp.employer}
                                    <span class="font-bold text-slate-600">
                                        — {exp.employer}
                                    </span>
                                {/if}
                            </h3>

                            <div
                                class="mt-1 text-[10px] font-black text-slate-600 sm:mt-0"
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
                            <div
                                class="mt-2 text-xs font-semibold leading-[1.7] whitespace-pre-line text-slate-700"
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
            <div
                class="cv-section-title mb-3 flex items-center gap-3"
            >
                <div
                    class="flex h-8 w-8 flex-shrink-0 rotate-[-3deg] items-center justify-center rounded-xl border-2 border-slate-900 bg-[#a7f3d0]"
                >
                    <Icon
                        icon="mdi:school"
                        class="h-4 w-4"
                    />
                </div>

                <h2
                    class="text-[11px] font-black uppercase tracking-[0.16em]"
                >
                    Formation
                </h2>

                <div
                    class="h-[3px] flex-1 rounded-full bg-slate-900"
                ></div>
            </div>

            <div class="cv-section-items space-y-3">
                {#each data.education as edu}
                    <div
                        class="cv-item rounded-[18px] border-[3px] border-slate-900 bg-[#ecfdf5] px-4 py-3"
                    >
                        <div
                            class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between"
                        >
                            <h3 class="text-sm font-black">
                                {edu.degree}

                                {#if edu.institution}
                                    <span
                                        class="font-bold text-slate-600"
                                    >
                                        — {edu.institution}
                                    </span>
                                {/if}
                            </h3>

                            <span
                                class="mt-1 text-[10px] font-black text-slate-600 sm:mt-0"
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
                                class="mt-1 text-xs font-semibold text-slate-700"
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
                class="cv-section-title mb-3 flex items-center gap-3"
            >
                <div
                    class="flex h-8 w-8 flex-shrink-0 rotate-[3deg] items-center justify-center rounded-xl border-2 border-slate-900 bg-[#ffd84d]"
                >
                    <Icon
                        icon="mdi:lightning-bolt"
                        class="h-4 w-4"
                    />
                </div>

                <h2
                    class="text-[11px] font-black uppercase tracking-[0.16em]"
                >
                    Compétences
                </h2>

                <div
                    class="h-[3px] flex-1 rounded-full bg-slate-900"
                ></div>
            </div>

            <div
                class="cv-section-items flex flex-wrap gap-2"
            >
                {#each data.skills as skill}
                    <div
                        class="cv-item rounded-full border-[2px] border-slate-900 bg-white px-3 py-1.5 text-xs font-black"
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
                class="cv-section-title mb-3 flex items-center gap-3"
            >
                <div
                    class="flex h-8 w-8 flex-shrink-0 rotate-[-4deg] items-center justify-center rounded-xl border-2 border-slate-900 bg-[#70d6ff]"
                >
                    <Icon
                        icon="mdi:translate"
                        class="h-4 w-4"
                    />
                </div>

                <h2
                    class="text-[11px] font-black uppercase tracking-[0.16em]"
                >
                    Langues
                </h2>

                <div
                    class="h-[3px] flex-1 rounded-full bg-slate-900"
                ></div>
            </div>

            <div class="cv-section-items grid grid-cols-2 gap-2">
                {#each data.languages as lang}
                    <div
                        class="cv-item flex items-center justify-between rounded-[14px] border-[2px] border-slate-900 bg-white px-3 py-2"
                    >
                        <span class="text-xs font-black">
                            {lang.name}
                        </span>

                        <span
                            class="text-[9px] font-black uppercase text-slate-500"
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
                class="cv-section-title mb-3 flex items-center gap-3"
            >
                <div
                    class="flex h-8 w-8 flex-shrink-0 rotate-[4deg] items-center justify-center rounded-xl border-2 border-slate-900 bg-[#c4b5fd]"
                >
                    <Icon
                        icon="mdi:certificate"
                        class="h-4 w-4"
                    />
                </div>

                <h2
                    class="text-[11px] font-black uppercase tracking-[0.16em]"
                >
                    Certifications
                </h2>

                <div
                    class="h-[3px] flex-1 rounded-full bg-slate-900"
                ></div>
            </div>

            <div class="cv-section-items space-y-2">
                {#each data.certifications as cert}
                    <div
                        class="cv-item rounded-[16px] border-[2px] border-slate-900 bg-[#f5f3ff] px-4 py-2.5"
                    >
                        <div
                            class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between"
                        >
                            <div>
                                <h3 class="text-sm font-black">
                                    {cert.name}
                                </h3>

                                {#if cert.issuer}
                                    <p
                                        class="text-xs font-semibold text-slate-600"
                                    >
                                        {cert.issuer}
                                    </p>
                                {/if}
                            </div>

                            {#if cert.date}
                                <span
                                    class="mt-1 text-[10px] font-black text-slate-500 sm:mt-0"
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
                class="cv-section-title mb-3 flex items-center gap-3"
            >
                <div
                    class="flex h-8 w-8 flex-shrink-0 rotate-[-3deg] items-center justify-center rounded-xl border-2 border-slate-900 bg-[#ffb4a2]"
                >
                    <Icon
                        icon="mdi:rocket-launch"
                        class="h-4 w-4"
                    />
                </div>

                <h2
                    class="text-[11px] font-black uppercase tracking-[0.16em]"
                >
                    Projets
                </h2>

                <div
                    class="h-[3px] flex-1 rounded-full bg-slate-900"
                ></div>
            </div>

            <div class="cv-section-items space-y-3">
                {#each data.projects as project}
                    <div
                        class="cv-item rounded-[18px] border-[3px] border-slate-900 bg-[#fff7ed] px-4 py-3"
                    >
                        <div
                            class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between"
                        >
                            <h3 class="text-sm font-black">
                                {project.name}

                                {#if project.role}
                                    <span
                                        class="font-bold text-slate-600"
                                    >
                                        — {project.role}
                                    </span>
                                {/if}
                            </h3>

                            {#if project.date}
                                <span
                                    class="mt-1 text-[10px] font-black text-slate-500 sm:mt-0"
                                >
                                    {formatDate(project.date)}
                                </span>
                            {/if}
                        </div>

                        {#if project.description}
                            <p
                                class="mt-2 text-xs font-semibold leading-[1.7] whitespace-pre-line text-slate-700"
                            >
                                {project.description}
                            </p>
                        {/if}

                        {#if project.technologies}
                            <p
                                class="mt-1 text-[10px] font-semibold text-slate-500"
                            >
                                <span class="font-black">
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
                                class="mt-1 inline-block text-[10px] font-bold text-slate-700 underline underline-offset-2"
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