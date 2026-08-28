<!-- $lib/components/templates/AtmosphericTemplate.svelte -->

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
    class="w-full bg-white text-slate-800 leading-relaxed"
    style="font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;"
>


    <!-- ========================================================= -->
    <!-- HEADER                                                    -->
    <!-- ========================================================= -->

    <header class="cv-header mb-6">

        <div
            class="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-6"
        >

            <!-- Décor atmosphérique -->

            <div
                class="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-slate-700/40"
            ></div>

            <div
                class="absolute -right-12 -bottom-28 h-64 w-64 rounded-full bg-slate-800/70"
            ></div>

            <div
                class="absolute left-1/2 -bottom-24 h-44 w-44 rounded-full bg-slate-700/20"
            ></div>


            <div class="relative flex items-center gap-5">

                {#if data.personalInfo?.image}

                    <img
                        src={data.personalInfo.image}
                        alt="Profile"
                        class="h-24 w-24 flex-shrink-0 rounded-xl object-cover border border-white/20"
                    />

                {/if}


                <div class="min-w-0 flex-1">

                    <div
                        class="mb-1 text-[9px] font-semibold uppercase tracking-[0.3em] text-slate-400"
                    >
                        Curriculum Vitae
                    </div>


                    <h1
                        class="text-3xl font-black uppercase tracking-tight text-white"
                    >
                        {data.personalInfo?.name || 'Votre Nom'}
                    </h1>


                    {#if data.personalInfo?.cvTitle}

                        <h2
                            class="mt-1 text-sm font-medium tracking-wide text-slate-300"
                        >
                            {data.personalInfo.cvTitle}
                        </h2>

                    {/if}


                    <!-- CONTACT -->

                    <div
                        class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-medium text-slate-300"
                    >

                        {#if data.personalInfo?.email}

                            <span class="flex items-center gap-1.5">

                                <Icon
                                    icon="mdi:email-outline"
                                    class="h-3.5 w-3.5 text-slate-400"
                                />

                                {data.personalInfo.email}

                            </span>

                        {/if}


                        {#if data.personalInfo?.phone}

                            <span class="flex items-center gap-1.5">

                                <Icon
                                    icon="mdi:phone-outline"
                                    class="h-3.5 w-3.5 text-slate-400"
                                />

                                {data.personalInfo.phone}

                            </span>

                        {/if}


                        {#if data.personalInfo?.address}

                            <span class="flex items-center gap-1.5">

                                <Icon
                                    icon="mdi:map-marker-outline"
                                    class="h-3.5 w-3.5 text-slate-400"
                                />

                                {data.personalInfo.address}

                            </span>

                        {/if}


                        {#if data.personalInfo?.linkedin}

                            <span class="flex items-center gap-1.5">

                                <Icon
                                    icon="mdi:linkedin"
                                    class="h-3.5 w-3.5 text-slate-400"
                                />

                                {data.personalInfo.linkedin}

                            </span>

                        {/if}


                        {#if data.personalInfo?.github}

                            <span class="flex items-center gap-1.5">

                                <Icon
                                    icon="mdi:github"
                                    class="h-3.5 w-3.5 text-slate-400"
                                />

                                {data.personalInfo.github}

                            </span>

                        {/if}


                        {#if data.personalInfo?.socials}

                            {#each data.personalInfo.socials as social}

                                <span class="flex items-center gap-1.5">

                                    <Icon
                                        icon={getSocialIcon(social.label)}
                                        class="h-3.5 w-3.5 text-slate-400"
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
    <!-- PROFIL PROFESSIONNEL                                      -->
    <!-- ========================================================= -->

    {#if data.professionalSummary}

        <section class="cv-section mb-6">

            <!-- Section header -->

            <div class="mb-3 flex items-center gap-3">

                <div
                    class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white"
                >

                    <Icon
                        icon="mdi:account-outline"
                        class="h-4 w-4"
                    />

                </div>


                <h2
                    class="cv-section-title text-[11px] font-black uppercase tracking-[0.18em] text-slate-900"
                >
                    Profil professionnel
                </h2>


                <div class="h-px flex-1 bg-slate-200"></div>

            </div>


            <!-- IMPORTANT :
                 cv-item est directement dans cv-section-items -->

            <div class="cv-section-items">

                <div class="cv-item">

                    <p
                        class="text-xs font-medium leading-[1.7] text-slate-600 whitespace-pre-line"
                    >
                        {data.professionalSummary}
                    </p>

                </div>

            </div>

        </section>

    {/if}



    <!-- ========================================================= -->
    <!-- EXPERIENCE PROFESSIONNELLE                               -->
    <!-- ========================================================= -->

    {#if data.workExperience?.length > 0}

        <section class="cv-section mb-6">

            <!-- Section header -->

            <div class="mb-4 flex items-center gap-3">

                <div
                    class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white"
                >

                    <Icon
                        icon="mdi:briefcase-outline"
                        class="h-4 w-4"
                    />

                </div>


                <h2
                    class="cv-section-title text-[11px] font-black uppercase tracking-[0.18em] text-slate-900"
                >
                    Expérience professionnelle
                </h2>


                <div class="h-px flex-1 bg-slate-200"></div>

            </div>


            <!-- Timeline -->

            <div
                class="cv-section-items ml-3 border-l border-slate-200"
            >

                {#each data.workExperience as exp}

                    <div
                        class="cv-item relative pb-5 pl-6 last:pb-0"
                    >

                        <!-- Timeline point -->

                        <span
                            class="absolute -left-[4px] top-1.5 h-2 w-2 rounded-full bg-slate-900"
                        ></span>


                        <div
                            class="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"
                        >

                            <div class="min-w-0">

                                <h3
                                    class="text-sm font-bold text-slate-900"
                                >
                                    {exp.jobTitle}
                                </h3>


                                {#if exp.employer}

                                    <div
                                        class="text-xs font-semibold text-slate-500"
                                    >
                                        {exp.employer}
                                    </div>

                                {/if}

                            </div>


                            <div
                                class="whitespace-nowrap text-[10px] font-semibold text-slate-400"
                            >

                                <span>
                                    {formatDate(exp.startDate)}
                                    –
                                    {exp.current
                                        ? 'Présent'
                                        : formatDate(exp.endDate)}
                                </span>


                                {#if calculateDuration(
                                    exp.startDate,
                                    exp.endDate,
                                    exp.current
                                )}

                                    <span class="ml-1">
                                        ·
                                        {calculateDuration(
                                            exp.startDate,
                                            exp.endDate,
                                            exp.current
                                        )}
                                    </span>

                                {/if}

                            </div>

                        </div>


                        {#if exp.description}

                            <div
                                class="mt-2 text-xs font-medium leading-[1.7] text-slate-600 whitespace-pre-line"
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
    <!-- FORMATION                                                 -->
    <!-- ========================================================= -->

    {#if data.education?.length > 0}

        <section class="cv-section mb-6">

            <!-- Section header -->

            <div class="mb-4 flex items-center gap-3">

                <div
                    class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white"
                >

                    <Icon
                        icon="mdi:school-outline"
                        class="h-4 w-4"
                    />

                </div>


                <h2
                    class="cv-section-title text-[11px] font-black uppercase tracking-[0.18em] text-slate-900"
                >
                    Formation
                </h2>


                <div class="h-px flex-1 bg-slate-200"></div>

            </div>


            <div class="cv-section-items">

                {#each data.education as edu}

                    <div
                        class="cv-item mb-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 last:mb-0"
                    >

                        <div
                            class="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"
                        >

                            <div class="min-w-0">

                                <h3
                                    class="text-sm font-bold text-slate-900"
                                >
                                    {edu.degree}
                                </h3>


                                {#if edu.institution}

                                    <div
                                        class="text-xs font-semibold text-slate-500"
                                    >
                                        {edu.institution}
                                    </div>

                                {/if}

                            </div>


                            <div
                                class="whitespace-nowrap text-[10px] font-semibold text-slate-400"
                            >
                                {formatDate(edu.startDate)}
                                –
                                {formatDate(edu.endDate)}
                            </div>

                        </div>


                        {#if edu.field}

                            <div
                                class="mt-1.5 text-xs font-medium text-slate-600"
                            >
                                {edu.field}
                            </div>

                        {/if}

                    </div>

                {/each}

            </div>

        </section>

    {/if}



    <!-- ========================================================= -->
    <!-- COMPETENCES                                                -->
    <!-- ========================================================= -->

    {#if data.skills?.length > 0}

        <section class="cv-section mb-6">

            <!-- Section header -->

            <div class="mb-4 flex items-center gap-3">

                <div
                    class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white"
                >

                    <Icon
                        icon="mdi:lightbulb-outline"
                        class="h-4 w-4"
                    />

                </div>


                <h2
                    class="cv-section-title text-[11px] font-black uppercase tracking-[0.18em] text-slate-900"
                >
                    Compétences
                </h2>


                <div class="h-px flex-1 bg-slate-200"></div>

            </div>


            <!--
                IMPORTANT :
                cv-item est directement enfant de
                cv-section-items.
            -->

            <div
                class="cv-section-items flex flex-wrap gap-1.5"
            >

                {#each data.skills as skill}

                    <div class="cv-item">

                        <span
                            class="inline-flex rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700"
                        >
                            {skill.name}
                        </span>

                    </div>

                {/each}

            </div>

        </section>

    {/if}



    <!-- ========================================================= -->
    <!-- LANGUES                                                    -->
    <!-- ========================================================= -->

    {#if data.languages?.length > 0}

        <section class="cv-section mb-6">

            <!-- Section header -->

            <div class="mb-4 flex items-center gap-3">

                <div
                    class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white"
                >

                    <Icon
                        icon="mdi:translate"
                        class="h-4 w-4"
                    />

                </div>


                <h2
                    class="cv-section-title text-[11px] font-black uppercase tracking-[0.18em] text-slate-900"
                >
                    Langues
                </h2>


                <div class="h-px flex-1 bg-slate-200"></div>

            </div>


            <!--
                Pas de wrapper supplémentaire autour
                des .cv-item.
            -->

            <div
                class="cv-section-items grid grid-cols-2 gap-2 sm:grid-cols-3"
            >

                {#each data.languages as lang}

                    <div class="cv-item">

                        <div
                            class="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5"
                        >

                            <span
                                class="text-xs font-bold text-slate-800"
                            >
                                {lang.name}
                            </span>


                            <span
                                class="text-right text-[9px] font-bold uppercase tracking-wide text-slate-400"
                            >
                                {proficiencyLabels[lang.proficiency]
                                    || lang.proficiency
                                    || ''}
                            </span>

                        </div>

                    </div>

                {/each}

            </div>

        </section>

    {/if}



    <!-- ========================================================= -->
    <!-- CERTIFICATIONS                                             -->
    <!-- ========================================================= -->

    {#if data.certifications?.length > 0}

        <section class="cv-section mb-6">

            <!-- Section header -->

            <div class="mb-4 flex items-center gap-3">

                <div
                    class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white"
                >

                    <Icon
                        icon="mdi:certificate-outline"
                        class="h-4 w-4"
                    />

                </div>


                <h2
                    class="cv-section-title text-[11px] font-black uppercase tracking-[0.18em] text-slate-900"
                >
                    Certifications
                </h2>


                <div class="h-px flex-1 bg-slate-200"></div>

            </div>


            <div class="cv-section-items">

                {#each data.certifications as cert}

                    <div
                        class="cv-item mb-2 rounded-xl border border-slate-200 bg-white px-4 py-3 last:mb-0"
                    >

                        <div
                            class="flex items-start justify-between gap-4"
                        >

                            <div class="min-w-0">

                                <h3
                                    class="text-xs font-bold text-slate-900"
                                >
                                    {cert.name}
                                </h3>


                                {#if cert.issuer}

                                    <div
                                        class="mt-0.5 text-[10px] font-medium text-slate-500"
                                    >
                                        {cert.issuer}
                                    </div>

                                {/if}

                            </div>


                            {#if cert.date}

                                <span
                                    class="whitespace-nowrap text-[10px] font-semibold text-slate-400"
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
    <!-- PROJETS                                                    -->
    <!-- ========================================================= -->

    {#if data.projects?.length > 0}

        <section class="cv-section mb-6">

            <!-- Section header -->

            <div class="mb-4 flex items-center gap-3">

                <div
                    class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white"
                >

                    <Icon
                        icon="mdi:rocket-launch-outline"
                        class="h-4 w-4"
                    />

                </div>


                <h2
                    class="cv-section-title text-[11px] font-black uppercase tracking-[0.18em] text-slate-900"
                >
                    Projets
                </h2>


                <div class="h-px flex-1 bg-slate-200"></div>

            </div>


            <div class="cv-section-items">

                {#each data.projects as project}

                    <div
                        class="cv-item mb-2 rounded-xl bg-slate-900 px-4 py-3 last:mb-0"
                    >

                        <h3
                            class="text-sm font-bold text-white"
                        >
                            {project.name}
                        </h3>


                        {#if project.description}

                            <div
                                class="mt-1.5 text-xs font-medium leading-[1.7] text-slate-300 whitespace-pre-line"
                            >
                                {project.description}
                            </div>

                        {/if}

                    </div>

                {/each}

            </div>

        </section>

    {/if}

</div>