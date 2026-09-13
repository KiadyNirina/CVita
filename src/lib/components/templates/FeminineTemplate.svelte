<!-- $lib/components/templates/FeminineEditorialTemplate.svelte -->
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
    class="cv-container bg-[#fbf8f5] w-[210mm] min-h-[297mm] p-[12mm] mx-auto text-[#302a2c] shadow-xl rounded-2xl border-2 border-[#eadfe0] overflow-hidden"
    style="font-family: 'Georgia', 'Times New Roman', serif;"
>
    <!-- ========================================================= -->
    <!-- EN-TÊTE -->
    <!-- ========================================================= -->

    <header class="cv-header mb-7">
        <div class="relative overflow-hidden border-b-2 border-[#d8aeb8] pb-6">
            <!-- Décorations -->
            <div class="absolute -right-8 -top-12 h-32 w-32 rounded-full border-[18px] border-[#ead2d7] opacity-70"></div>

            <div class="absolute right-20 top-8 h-3 w-3 rounded-full bg-[#c48696]"></div>

            <div class="absolute right-28 top-2 h-2 w-2 rounded-full bg-[#d9aab5]"></div>

            <div class="relative flex items-center gap-6">
                <!-- Photo -->
                {#if data.personalInfo?.image}
                    <div class="relative flex-shrink-0">
                        <div class="absolute -left-2 -top-2 h-full w-full rounded-[2rem] border border-[#c48696]"></div>

                        <img
                            src={data.personalInfo.image}
                            alt="Profile"
                            class="relative h-28 w-24 rounded-[1.8rem] object-cover border-4 border-[#fbf8f5]"
                        />
                    </div>
                {/if}

                <!-- Identité -->
                <div class="min-w-0 flex-1">
                    <h1 class="max-w-full break-words text-4xl font-black leading-[0.95] tracking-tight text-[#302a2c]">
                        {data.personalInfo?.name || 'Votre Nom'}
                    </h1>

                    {#if data.personalInfo?.cvTitle}
                        <h2 class="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#9b6674]">
                            {data.personalInfo.cvTitle}
                        </h2>
                    {/if}

                    <!-- Coordonnées -->
                    <div class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[9px] font-medium text-[#665b5e]">
                        {#if data.personalInfo?.email}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:email-outline"
                                    class="h-3.5 w-3.5 text-[#b16f80]"
                                />
                                {data.personalInfo.email}
                            </span>
                        {/if}

                        {#if data.personalInfo?.phone}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:phone-outline"
                                    class="h-3.5 w-3.5 text-[#b16f80]"
                                />
                                {data.personalInfo.phone}
                            </span>
                        {/if}

                        {#if data.personalInfo?.address}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:map-marker-outline"
                                    class="h-3.5 w-3.5 text-[#b16f80]"
                                />
                                {data.personalInfo.address}
                            </span>
                        {/if}

                        {#if data.personalInfo?.linkedin}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:linkedin"
                                    class="h-3.5 w-3.5 text-[#b16f80]"
                                />
                                {data.personalInfo.linkedin}
                            </span>
                        {/if}

                        {#if data.personalInfo?.github}
                            <span class="flex items-center gap-1.5">
                                <Icon
                                    icon="mdi:github"
                                    class="h-3.5 w-3.5 text-[#b16f80]"
                                />
                                {data.personalInfo.github}
                            </span>
                        {/if}

                        {#if data.personalInfo?.socials}
                            {#each data.personalInfo.socials as social}
                                <span class="flex items-center gap-1.5">
                                    <Icon
                                        icon={getSocialIcon(social.label)}
                                        class="h-3.5 w-3.5 text-[#b16f80]"
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
        <section class="cv-section mb-7">
            <div class="mb-3 flex items-center gap-3">
                <span class="text-[10px] font-black tracking-[0.2em] text-[#b16f80]">
                    01
                </span>

                <h2
                    class="cv-section-title text-[11px] font-black uppercase tracking-[0.2em] text-[#302a2c]"
                >
                    Profil
                </h2>

                <div class="h-px flex-1 bg-[#dfc8cc]"></div>

                <Icon
                    icon="mdi:flower-outline"
                    class="h-4 w-4 text-[#c48696]"
                />
            </div>

            <p class="cv-item max-w-[175mm] text-[11px] leading-[1.75] text-[#5e5558] whitespace-pre-line">
                {data.professionalSummary}
            </p>
        </section>
    {/if}

    <!-- ========================================================= -->
    <!-- EXPÉRIENCES -->
    <!-- ========================================================= -->

    {#if data.workExperience?.length > 0}
        <section class="cv-section mb-7">
            <div class="mb-4 flex items-center gap-3">
                <span class="text-[10px] font-black tracking-[0.2em] text-[#b16f80]">
                    02
                </span>

                <h2
                    class="cv-section-title text-[11px] font-black uppercase tracking-[0.2em] text-[#302a2c]"
                >
                    Expériences
                </h2>

                <div class="h-px flex-1 bg-[#dfc8cc]"></div>
            </div>

            <div class="cv-section-items space-y-4">
                {#each data.workExperience as exp}
                    <div class="cv-item relative pl-5">
                        <!-- Timeline -->
                        <div class="absolute left-0 top-1.5 h-full w-px bg-[#dec4c9]"></div>

                        <div class="absolute -left-[3px] top-1.5 h-2 w-2 rounded-full bg-[#b16f80] ring-4 ring-[#fbf8f5]"></div>

                        <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                            <h3 class="text-[12px] font-bold text-[#302a2c]">
                                {exp.jobTitle}

                                {#if exp.employer}
                                    <span class="font-normal text-[#8a777c]">
                                        · {exp.employer}
                                    </span>
                                {/if}
                            </h3>

                            <div class="flex-shrink-0 text-[9px] font-semibold text-[#a06b78]">
                                {formatDate(exp.startDate)}
                                –
                                {exp.current ? 'Présent' : formatDate(exp.endDate)}

                                {#if calculateDuration(exp.startDate, exp.endDate, exp.current)}
                                    <span class="text-[#aa969b]">
                                        ({calculateDuration(exp.startDate, exp.endDate, exp.current)})
                                    </span>
                                {/if}
                            </div>
                        </div>

                        {#if exp.description}
                            <p class="mt-1.5 text-[10px] leading-[1.7] text-[#63595d] whitespace-pre-line">
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
        <section class="cv-section mb-7">
            <div class="mb-4 flex items-center gap-3">
                <span class="text-[10px] font-black tracking-[0.2em] text-[#b16f80]">
                    03
                </span>

                <h2
                    class="cv-section-title text-[11px] font-black uppercase tracking-[0.2em] text-[#302a2c]"
                >
                    Formation
                </h2>

                <div class="h-px flex-1 bg-[#dfc8cc]"></div>
            </div>

            <div class="cv-section-items space-y-3">
                {#each data.education as edu}
                    <div class="cv-item border-l-2 border-[#d8aeb8] pl-4">
                        <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                            <h3 class="text-[12px] font-bold text-[#302a2c]">
                                {edu.degree}

                                {#if edu.institution}
                                    <span class="font-normal text-[#827278]">
                                        · {edu.institution}
                                    </span>
                                {/if}
                            </h3>

                            <span class="text-[9px] font-semibold text-[#a06b78]">
                                {formatDate(edu.startDate)}
                                –
                                {edu.current ? 'Présent' : formatDate(edu.endDate)}
                            </span>
                        </div>

                        {#if edu.field}
                            <p class="mt-1 text-[10px] text-[#71666a]">
                                {edu.field}
                            </p>
                        {/if}
                    </div>
                {/each}
            </div>
        </section>
    {/if}

    <!-- ========================================================= -->
    <!-- CERTIFICATIONS -->
    <!-- ========================================================= -->

    {#if data.certifications?.length > 0}
        <section class="cv-section mb-7">
            <div class="mb-4 flex items-center gap-3">
                <span class="text-[10px] font-black tracking-[0.2em] text-[#b16f80]">
                    04
                </span>

                <h2
                    class="cv-section-title text-[11px] font-black uppercase tracking-[0.2em] text-[#302a2c]"
                >
                    Certifications
                </h2>

                <div class="h-px flex-1 bg-[#dfc8cc]"></div>
            </div>

            <div class="cv-section-items grid grid-cols-2 gap-x-5 gap-y-3">
                {#each data.certifications as cert}
                    <div class="cv-item rounded-xl border border-[#ead9dc] bg-[#fffdfc] px-3 py-2.5">
                        <div class="flex items-start justify-between gap-2">
                            <div class="min-w-0">
                                <h3 class="text-[11px] font-bold text-[#302a2c]">
                                    {cert.name}
                                </h3>

                                {#if cert.issuer}
                                    <p class="mt-0.5 text-[9px] text-[#827278]">
                                        {cert.issuer}
                                    </p>
                                {/if}
                            </div>

                            {#if cert.date}
                                <span class="flex-shrink-0 text-[8px] font-semibold text-[#a06b78]">
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
        <section class="cv-section mb-7">
            <div class="mb-4 flex items-center gap-3">
                <span class="text-[10px] font-black tracking-[0.2em] text-[#b16f80]">
                    05
                </span>

                <h2
                    class="cv-section-title text-[11px] font-black uppercase tracking-[0.2em] text-[#302a2c]"
                >
                    Projets
                </h2>

                <div class="h-px flex-1 bg-[#dfc8cc]"></div>
            </div>

            <div class="cv-section-items space-y-3">
                {#each data.projects as project}
                    <div class="cv-item relative rounded-xl bg-[#f3e7e9] px-4 py-3">
                        <div class="absolute right-3 top-3">
                            <Icon
                                icon="mdi:sparkles"
                                class="h-4 w-4 text-[#c48696]"
                            />
                        </div>

                        <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 pr-6">
                            <h3 class="text-[12px] font-bold text-[#302a2c]">
                                {project.name}

                                {#if project.role}
                                    <span class="font-normal text-[#806f74]">
                                        · {project.role}
                                    </span>
                                {/if}
                            </h3>

                            {#if project.date}
                                <span class="text-[9px] font-semibold text-[#a06b78]">
                                    {formatDate(project.date)}
                                </span>
                            {/if}
                        </div>

                        {#if project.description}
                            <p class="mt-1.5 text-[10px] leading-[1.65] text-[#62575b] whitespace-pre-line">
                                {project.description}
                            </p>
                        {/if}

                        {#if project.technologies}
                            <p class="mt-1.5 text-[9px] text-[#877479]">
                                <span class="font-bold text-[#725f65]">
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
                                class="mt-1 inline-block break-all text-[9px] font-semibold text-[#a26373] underline underline-offset-2"
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
    <!-- COMPÉTENCES -->
    <!-- ========================================================= -->

    {#if data.skills?.length > 0}
        <section class="cv-section mb-7">
            <div class="mb-4 flex items-center gap-3">
                <span class="text-[10px] font-black tracking-[0.2em] text-[#b16f80]">
                    06
                </span>

                <h2
                    class="cv-section-title text-[11px] font-black uppercase tracking-[0.2em] text-[#302a2c]"
                >
                    Compétences
                </h2>

                <div class="h-px flex-1 bg-[#dfc8cc]"></div>
            </div>

            <div class="cv-section-items grid grid-cols-2 gap-x-7 gap-y-2.5">
                {#each data.skills as skill}
                    <div class="cv-item">
                        <div class="mb-1 flex items-center justify-between gap-2">
                            <span class="text-[10px] font-semibold text-[#51474a]">
                                {skill.name}
                            </span>

                            {#if skill.level}
                                <span class="text-[8px] font-semibold uppercase text-[#a06b78]">
                                    {skill.level}
                                </span>
                            {/if}
                        </div>

                        <div class="h-1 overflow-hidden rounded-full bg-[#eadcdf]">
                            <div
                                class="h-full rounded-full bg-[#b87989]"
                                style="width: {skill.level === 'Expert' || skill.level === 'expert'
                                    ? '95%'
                                    : skill.level === 'Avancé' || skill.level === 'advanced'
                                    ? '80%'
                                    : skill.level === 'Intermédiaire' || skill.level === 'intermediate'
                                    ? '60%'
                                    : '40%'}"
                            ></div>
                        </div>
                    </div>
                {/each}
            </div>
        </section>
    {/if}

    <!-- ========================================================= -->
    <!-- LANGUES -->
    <!-- ========================================================= -->

    {#if data.languages?.length > 0}
        <section class="cv-section">
            <div class="mb-4 flex items-center gap-3">
                <span class="text-[10px] font-black tracking-[0.2em] text-[#b16f80]">
                    07
                </span>

                <h2
                    class="cv-section-title text-[11px] font-black uppercase tracking-[0.2em] text-[#302a2c]"
                >
                    Langues
                </h2>

                <div class="h-px flex-1 bg-[#dfc8cc]"></div>
            </div>

            <div class="cv-section-items grid grid-cols-2 gap-3">
                {#each data.languages as lang}
                    <div class="cv-item flex items-center justify-between rounded-xl border border-[#ead9dc] bg-[#fffdfc] px-3 py-2.5">
                        <div class="flex items-center gap-2">
                            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-[#f1dfe3]">
                                <Icon
                                    icon="mdi:translate"
                                    class="h-3.5 w-3.5 text-[#a76d7c]"
                                />
                            </span>

                            <span class="text-[10px] font-bold text-[#403638]">
                                {lang.name}
                            </span>
                        </div>

                        <span class="text-[8px] font-semibold uppercase tracking-wide text-[#a06b78]">
                            {proficiencyLabels[lang.proficiency] || lang.proficiency || ''}
                        </span>
                    </div>
                {/each}
            </div>
        </section>
    {/if}
</div>