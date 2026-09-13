<!-- $lib/components/templates/ShonenTemplate.svelte -->
<script>
    import { formatDate, calculateDuration } from '$lib/utils/templateUtils';
    import Icon from '@iconify/svelte';

    export let data;
    export let fullMode = false;

    const proficiencyLabels = {
        basic: 'BASE',
        intermediate: 'INTER',
        fluent: 'FLUENT',
        native: 'NATIF'
    };

    const socialIconMap = {
        facebook: 'mdi:facebook',
        twitter: 'mdi:twitter',
        instagram: 'mdi:instagram',
        youtube: 'mdi:youtube',
        tiktok: 'ic:baseline-tiktok',
        snapchat: 'mdi:snapchat',
        pinterest: 'mdi:pinterest',
        reddit: 'mdi:reddit',
        whatsapp: 'mdi:whatsapp',
        telegram: 'mdi:telegram',
        discord: 'mdi:discord',
        linkedin: 'mdi:linkedin',
        github: 'mdi:github'
    };

    function getSocialIcon(label) {
        if (!label) return 'mdi:link-variant';

        return (
            socialIconMap[label.toLowerCase().trim()] ||
            'mdi:link-variant'
        );
    }

    function getSkillWidth(level) {
        const value = String(level || '').toLowerCase();

        if (
            value.includes('expert') ||
            value.includes('avancé') ||
            value.includes('advanced')
        ) {
            return '95%';
        }

        if (
            value.includes('intermédiaire') ||
            value.includes('intermediate')
        ) {
            return '72%';
        }

        return '45%';
    }

    function getSkillLevel(level) {
        const value = String(level || '').toLowerCase();

        if (
            value.includes('expert') ||
            value.includes('avancé') ||
            value.includes('advanced')
        ) {
            return 'S';
        }

        if (
            value.includes('intermédiaire') ||
            value.includes('intermediate')
        ) {
            return 'A';
        }

        return 'B';
    }
</script>

<div
    id="cv-preview"
    class="cv-container w-full overflow-hidden bg-[#f7f1df] text-[#171717]"
    style="font-family: Arial, Helvetica, sans-serif;"
>
    <!-- ========================================================= -->
    <!-- HERO / CHARACTER HEADER -->
    <!-- ========================================================= -->

    <header class="cv-header mb-7">
        <div
            class="relative overflow-hidden border-[3px] border-[#171717] bg-[#f7f1df]"
        >
            <!-- Grand soleil manga -->
            <div
                class="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#f28c28]"
            ></div>

            <div
                class="absolute right-4 top-8 h-40 w-40 rounded-full border-[16px] border-[#171717]/10"
            ></div>

            <!-- Lignes de vitesse -->
            <div
                class="absolute right-0 top-0 h-full w-1/2 overflow-hidden opacity-20"
            >
                <div class="absolute right-[-30px] top-12 h-2 w-64 rotate-[-28deg] bg-[#171717]"></div>
                <div class="absolute right-[-20px] top-28 h-2 w-72 rotate-[-28deg] bg-[#171717]"></div>
                <div class="absolute right-[-30px] top-44 h-2 w-60 rotate-[-28deg] bg-[#171717]"></div>
                <div class="absolute right-[-50px] top-60 h-2 w-72 rotate-[-28deg] bg-[#171717]"></div>
            </div>

            <div class="relative px-7 py-7">
                <div class="flex items-center gap-6">
                    <!-- PHOTO -->
                    {#if data.personalInfo?.image}
                        <div class="relative shrink-0">
                            <!-- contour manga -->
                            <div
                                class="absolute -inset-2 rotate-[-4deg] bg-[#171717]"
                            ></div>

                            <div
                                class="absolute -inset-1 rotate-[3deg] border-[3px] border-[#e53e24]"
                            ></div>

                            <img
                                src={data.personalInfo.image}
                                alt="Profile"
                                class="relative h-28 w-24 rotate-[-2deg] object-cover border-[3px] border-[#171717] grayscale-[20%]"
                            />

                            <div
                                class="absolute -bottom-4 -right-5 rotate-[-8deg] bg-[#e53e24] px-2 py-1 text-[7px] font-black text-white border-2 border-[#171717]"
                            >
                                HERO
                            </div>
                        </div>
                    {/if}

                    <!-- IDENTITÉ -->
                    <div class="relative min-w-0 flex-1">
                        <div
                            class="mb-2 inline-flex -rotate-2 bg-[#171717] px-3 py-1 text-[7px] font-black uppercase tracking-[0.25em] text-[#f7f1df]"
                        >
                            Character Profile
                        </div>

                        <h1
                            class="max-w-full break-words text-[36px] font-black uppercase leading-[0.88] tracking-[-0.06em]"
                            style="font-family: Impact, 'Arial Black', sans-serif;"
                        >
                            {data.personalInfo?.name || 'YOUR NAME'}
                        </h1>

                        {#if data.personalInfo?.cvTitle}
                            <div
                                class="mt-3 inline-block -skew-x-6 border-[2px] border-[#171717] bg-[#f28c28] px-3 py-1.5"
                            >
                                <span
                                    class="block skew-x-6 text-[8px] font-black uppercase tracking-[0.12em]"
                                >
                                    {data.personalInfo.cvTitle}
                                </span>
                            </div>
                        {/if}
                    </div>
                </div>

                <!-- CONTACT -->
                <div
                    class="relative mt-7 flex flex-wrap gap-2 border-t-[3px] border-[#171717] pt-4"
                >
                    {#if data.personalInfo?.email}
                        <span
                            class="flex items-center gap-1.5 border-2 border-[#171717] bg-white px-2.5 py-1.5 text-[7px] font-bold"
                        >
                            <Icon
                                icon="mdi:email-outline"
                                class="h-3 w-3"
                            />
                            {data.personalInfo.email}
                        </span>
                    {/if}

                    {#if data.personalInfo?.phone}
                        <span
                            class="flex items-center gap-1.5 border-2 border-[#171717] bg-white px-2.5 py-1.5 text-[7px] font-bold"
                        >
                            <Icon
                                icon="mdi:phone-outline"
                                class="h-3 w-3"
                            />
                            {data.personalInfo.phone}
                        </span>
                    {/if}

                    {#if data.personalInfo?.address}
                        <span
                            class="flex items-center gap-1.5 border-2 border-[#171717] bg-white px-2.5 py-1.5 text-[7px] font-bold"
                        >
                            <Icon
                                icon="mdi:map-marker-outline"
                                class="h-3 w-3"
                            />
                            {data.personalInfo.address}
                        </span>
                    {/if}

                    {#if data.personalInfo?.linkedin}
                        <span
                            class="flex items-center gap-1.5 border-2 border-[#171717] bg-white px-2.5 py-1.5 text-[7px] font-bold"
                        >
                            <Icon
                                icon="mdi:linkedin"
                                class="h-3 w-3"
                            />
                            {data.personalInfo.linkedin}
                        </span>
                    {/if}

                    {#if data.personalInfo?.github}
                        <span
                            class="flex items-center gap-1.5 border-2 border-[#171717] bg-white px-2.5 py-1.5 text-[7px] font-bold"
                        >
                            <Icon
                                icon="mdi:github"
                                class="h-3 w-3"
                            />
                            {data.personalInfo.github}
                        </span>
                    {/if}

                    {#if data.personalInfo?.socials}
                        {#each data.personalInfo.socials as social}
                            <span
                                class="flex items-center gap-1.5 border-2 border-[#171717] bg-white px-2.5 py-1.5 text-[7px] font-bold"
                            >
                                <Icon
                                    icon={getSocialIcon(social.label)}
                                    class="h-3 w-3"
                                />
                                {social.url}
                            </span>
                        {/each}
                    {/if}
                </div>
            </div>

            <!-- ONOMATOPÉE -->
            <div
                class="absolute bottom-5 right-7 rotate-[-8deg] select-none text-[20px] font-black italic text-[#e53e24] opacity-80"
                style="font-family: Impact, 'Arial Black', sans-serif;"
            >
                POW!
            </div>
        </div>
    </header>

    <!-- ========================================================= -->
    <!-- PROFILE -->
    <!-- ========================================================= -->

    {#if data.professionalSummary}
        <section class="cv-section mb-7">
            <div
                class="cv-section-title mb-3 flex items-center gap-3"
            >
                <div
                    class="flex h-8 w-8 shrink-0 rotate-[-5deg] items-center justify-center border-[2px] border-[#171717] bg-[#e53e24] text-[8px] font-black text-white"
                >
                    01
                </div>

                <div
                    class="relative bg-[#171717] px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white"
                >
                    Profile
                </div>

                <div class="h-[3px] flex-1 bg-[#171717]"></div>
            </div>

            <div class="cv-section-items">
                <div
                    class="cv-item relative border-[3px] border-[#171717] bg-white px-5 py-4"
                >
                    <div
                        class="absolute -left-2 -top-2 h-4 w-4 bg-[#f28c28] border-2 border-[#171717]"
                    ></div>

                    <p
                        class="text-[9px] font-medium leading-[1.8] text-[#343434] whitespace-pre-line"
                    >
                        {data.professionalSummary}
                    </p>
                </div>
            </div>
        </section>
    {/if}

    <!-- ========================================================= -->
    <!-- EXPERIENCE / MISSIONS -->
    <!-- ========================================================= -->

    {#if data.workExperience?.length > 0}
        <section class="cv-section mb-7">
            <div
                class="cv-section-title mb-4 flex items-center gap-3"
            >
                <div
                    class="flex h-8 w-8 shrink-0 rotate-[4deg] items-center justify-center border-[2px] border-[#171717] bg-[#f28c28] text-[8px] font-black"
                >
                    02
                </div>

                <div
                    class="bg-[#171717] px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white"
                >
                    Missions
                </div>

                <div class="h-[3px] flex-1 bg-[#171717]"></div>

                <span
                    class="rotate-3 border-2 border-[#171717] bg-[#e53e24] px-2 py-1 text-[7px] font-black text-white"
                >
                    QUEST
                </span>
            </div>

            <div class="cv-section-items space-y-4">
                {#each data.workExperience as exp, index}
                    <div
                        class="cv-item relative border-[3px] border-[#171717] bg-white p-4"
                    >
                        <!-- badge -->
                        <div
                            class="absolute -left-3 -top-3 rotate-[-8deg] border-2 border-[#171717] bg-[#f28c28] px-2 py-1 text-[7px] font-black"
                        >
                            M-{String(index + 1).padStart(2, '0')}
                        </div>

                        <div class="flex gap-4 pt-1">
                            <div
                                class="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-[#171717] bg-[#171717]"
                            >
                                <Icon
                                    icon="mdi:sword-cross"
                                    class="h-5 w-5 text-[#f28c28]"
                                />
                            </div>

                            <div class="min-w-0 flex-1">
                                <div
                                    class="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"
                                >
                                    <div class="min-w-0">
                                        <h3
                                            class="break-words text-[12px] font-black uppercase leading-tight"
                                            style="font-family: Impact, 'Arial Black', sans-serif;"
                                        >
                                            {exp.jobTitle}
                                        </h3>

                                        {#if exp.employer}
                                            <p
                                                class="mt-1 text-[8px] font-black uppercase text-[#e53e24]"
                                            >
                                                {exp.employer}
                                            </p>
                                        {/if}
                                    </div>

                                    <span
                                        class="shrink-0 border-2 border-[#171717] px-2 py-1 text-[7px] font-black"
                                    >
                                        {formatDate(exp.startDate)}
                                        –
                                        {exp.current
                                            ? 'NOW'
                                            : formatDate(exp.endDate)}
                                    </span>
                                </div>

                                {#if calculateDuration(
                                    exp.startDate,
                                    exp.endDate,
                                    exp.current
                                )}
                                    <span
                                        class="mt-1 inline-block text-[6px] font-black uppercase tracking-[0.15em] text-[#777]"
                                    >
                                        {calculateDuration(
                                            exp.startDate,
                                            exp.endDate,
                                            exp.current
                                        )}
                                    </span>
                                {/if}

                                {#if exp.description}
                                    <p
                                        class="mt-3 border-l-[3px] border-[#f28c28] pl-3 text-[8px] font-medium leading-[1.7] text-[#444] whitespace-pre-line"
                                    >
                                        {exp.description}
                                    </p>
                                {/if}
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </section>
    {/if}

    <!-- ========================================================= -->
    <!-- EDUCATION -->
    <!-- ========================================================= -->

    {#if data.education?.length > 0}
        <section class="cv-section mb-7">
            <div
                class="cv-section-title mb-4 flex items-center gap-3"
            >
                <div
                    class="flex h-8 w-8 shrink-0 rotate-[-3deg] items-center justify-center border-[2px] border-[#171717] bg-[#e53e24] text-[8px] font-black text-white"
                >
                    03
                </div>

                <div
                    class="bg-[#171717] px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white"
                >
                    Training Arc
                </div>

                <div class="h-[3px] flex-1 bg-[#171717]"></div>
            </div>

            <div class="cv-section-items grid grid-cols-2 gap-3">
                {#each data.education as edu}
                    <div
                        class="cv-item relative border-[3px] border-[#171717] bg-[#fff] p-4"
                    >
                        <div
                            class="absolute right-2 top-2 text-[15px] font-black text-[#f28c28]"
                        >
                            +
                        </div>

                        <span
                            class="inline-block -rotate-2 bg-[#f28c28] px-2 py-1 text-[6px] font-black uppercase"
                        >
                            TRAINING
                        </span>

                        <h3
                            class="mt-2 pr-5 text-[10px] font-black uppercase leading-tight"
                        >
                            {edu.degree}
                        </h3>

                        {#if edu.institution}
                            <p
                                class="mt-1 text-[8px] font-black text-[#e53e24]"
                            >
                                {edu.institution}
                            </p>
                        {/if}

                        {#if edu.field}
                            <p
                                class="mt-1.5 text-[7px] leading-relaxed text-[#555]"
                            >
                                {edu.field}
                            </p>
                        {/if}

                        <div
                            class="mt-3 border-t-2 border-[#171717] pt-2 text-[6px] font-black uppercase"
                        >
                            {formatDate(edu.startDate)}
                            –
                            {edu.current
                                ? 'NOW'
                                : formatDate(edu.endDate)}
                        </div>
                    </div>
                {/each}
            </div>
        </section>
    {/if}

    <!-- ========================================================= -->
    <!-- SKILLS / ABILITIES -->
    <!-- ========================================================= -->

    {#if data.skills?.length > 0}
        <section class="cv-section mb-7">
            <div
                class="cv-section-title mb-4 flex items-center gap-3"
            >
                <div
                    class="flex h-8 w-8 shrink-0 rotate-[5deg] items-center justify-center border-[2px] border-[#171717] bg-[#f28c28] text-[8px] font-black"
                >
                    04
                </div>

                <div
                    class="bg-[#171717] px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white"
                >
                    Abilities
                </div>

                <div class="h-[3px] flex-1 bg-[#171717]"></div>
            </div>

            <div
                class="cv-section-items grid grid-cols-2 gap-x-6 gap-y-3"
            >
                {#each data.skills as skill}
                    <div class="cv-item">
                        <div
                            class="flex items-center justify-between gap-2"
                        >
                            <div class="flex min-w-0 items-center gap-2">
                                <div
                                    class="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-[#171717] bg-[#e53e24] text-[7px] font-black text-white"
                                >
                                    {getSkillLevel(skill.level)}
                                </div>

                                <span
                                    class="truncate text-[8px] font-black uppercase"
                                >
                                    {skill.name}
                                </span>
                            </div>

                            {#if skill.level}
                                <span
                                    class="shrink-0 text-[6px] font-black uppercase text-[#777]"
                                >
                                    {skill.level}
                                </span>
                            {/if}
                        </div>

                        <div
                            class="mt-2 h-2 border-2 border-[#171717] bg-white"
                        >
                            <div
                                class="h-full bg-[#f28c28]"
                                style="width: {getSkillWidth(skill.level)}"
                            ></div>
                        </div>
                    </div>
                {/each}
            </div>
        </section>
    {/if}

    <!-- ========================================================= -->
    <!-- PROJECTS -->
    <!-- ========================================================= -->

    {#if data.projects?.length > 0}
        <section class="cv-section mb-7">
            <div
                class="cv-section-title mb-4 flex items-center gap-3"
            >
                <div
                    class="flex h-8 w-8 shrink-0 rotate-[-4deg] items-center justify-center border-[2px] border-[#171717] bg-[#e53e24] text-[8px] font-black text-white"
                >
                    05
                </div>

                <div
                    class="bg-[#171717] px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white"
                >
                    Special Moves
                </div>

                <div class="h-[3px] flex-1 bg-[#171717]"></div>
            </div>

            <div class="cv-section-items grid grid-cols-2 gap-3">
                {#each data.projects as project, index}
                    <div
                        class="cv-item relative overflow-hidden border-[3px] border-[#171717] bg-white p-4"
                    >
                        <!-- effet vitesse -->
                        <div
                            class="absolute right-[-20px] top-[-20px] h-16 w-16 rotate-45 bg-[#f28c28]"
                        ></div>

                        <div
                            class="relative flex items-start justify-between gap-3"
                        >
                            <div>
                                <span
                                    class="text-[6px] font-black uppercase tracking-[0.2em] text-[#e53e24]"
                                >
                                    TECHNIQUE #{String(
                                        index + 1
                                    ).padStart(2, '0')}
                                </span>

                                <h3
                                    class="mt-1 text-[11px] font-black uppercase"
                                    style="font-family: Impact, 'Arial Black', sans-serif;"
                                >
                                    {project.name}
                                </h3>
                            </div>

                            <Icon
                                icon="mdi:flash"
                                class="relative h-5 w-5 shrink-0 text-[#e53e24]"
                            />
                        </div>

                        {#if project.role}
                            <p
                                class="mt-1 text-[7px] font-black uppercase text-[#f28c28]"
                            >
                                {project.role}
                            </p>
                        {/if}

                        {#if project.description}
                            <p
                                class="mt-2 text-[8px] leading-[1.7] text-[#444] whitespace-pre-line"
                            >
                                {project.description}
                            </p>
                        {/if}

                        {#if project.technologies}
                            <div
                                class="mt-3 flex flex-wrap gap-1"
                            >
                                {#each project.technologies.split(',') as tech}
                                    <span
                                        class="border border-[#171717] bg-[#f7f1df] px-1.5 py-1 text-[6px] font-black uppercase"
                                    >
                                        {tech.trim()}
                                    </span>
                                {/each}
                            </div>
                        {/if}

                        {#if project.link}
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="mt-3 block break-all text-[6px] font-black text-[#e53e24] underline underline-offset-2"
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
    <!-- CERTIFICATIONS -->
    <!-- ========================================================= -->

    {#if data.certifications?.length > 0}
        <section class="cv-section mb-7">
            <div
                class="cv-section-title mb-4 flex items-center gap-3"
            >
                <div
                    class="flex h-8 w-8 shrink-0 rotate-[3deg] items-center justify-center border-[2px] border-[#171717] bg-[#f28c28] text-[8px] font-black"
                >
                    06
                </div>

                <div
                    class="bg-[#171717] px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white"
                >
                    Achievements
                </div>

                <div class="h-[3px] flex-1 bg-[#171717]"></div>
            </div>

            <div class="cv-section-items space-y-2">
                {#each data.certifications as cert}
                    <div
                        class="cv-item flex items-center justify-between gap-4 border-[3px] border-[#171717] bg-white px-4 py-3"
                    >
                        <div class="flex min-w-0 items-center gap-3">
                            <div
                                class="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-[#171717] bg-[#f28c28]"
                            >
                                <Icon
                                    icon="mdi:trophy-outline"
                                    class="h-4 w-4"
                                />
                            </div>

                            <div class="min-w-0">
                                <h3
                                    class="truncate text-[9px] font-black uppercase"
                                >
                                    {cert.name}
                                </h3>

                                {#if cert.issuer}
                                    <p
                                        class="mt-0.5 text-[7px] font-bold text-[#e53e24]"
                                    >
                                        {cert.issuer}
                                    </p>
                                {/if}
                            </div>
                        </div>

                        {#if cert.date}
                            <span
                                class="shrink-0 border-2 border-[#171717] px-2 py-1 text-[6px] font-black"
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
    <!-- LANGUAGES -->
    <!-- ========================================================= -->

    {#if data.languages?.length > 0}
        <section class="cv-section">
            <div
                class="cv-section-title mb-4 flex items-center gap-3"
            >
                <div
                    class="flex h-8 w-8 shrink-0 rotate-[-5deg] items-center justify-center border-[2px] border-[#171717] bg-[#e53e24] text-[8px] font-black text-white"
                >
                    07
                </div>

                <div
                    class="bg-[#171717] px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white"
                >
                    Languages
                </div>

                <div class="h-[3px] flex-1 bg-[#171717]"></div>
            </div>

            <div class="cv-section-items grid grid-cols-2 gap-3">
                {#each data.languages as lang}
                    <div
                        class="cv-item flex items-center justify-between border-[3px] border-[#171717] bg-white px-4 py-3"
                    >
                        <div class="flex items-center gap-3">
                            <div
                                class="flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-[#171717] bg-[#f28c28]"
                            >
                                <Icon
                                    icon="mdi:translate"
                                    class="h-4 w-4"
                                />
                            </div>

                            <span
                                class="text-[9px] font-black uppercase"
                            >
                                {lang.name}
                            </span>
                        </div>

                        <span
                            class="border-2 border-[#171717] bg-[#e53e24] px-2 py-1 text-[6px] font-black text-white"
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
</div>