<!-- src/routes/terms/+page.svelte -->
<script>
    import Header from '$lib/components/Header.svelte';
    import Icon from '@iconify/svelte';
    import { page } from '$app/stores';

    const siteUrl = $page.url.origin;
    const currentYear = new Date().getFullYear();
    const lastUpdate = '10 septembre 2026';

    // Action d'animation d'entrée au scroll (identique à la home)
    function reveal(node, options = {}) {
        const { delay = 0 } = options;
        node.style.opacity = '0';
        node.style.transform = 'translateY(30px)';
        node.style.transition = `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        node.style.opacity = '1';
                        node.style.transform = 'translateY(0)';
                        observer.unobserve(node);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        observer.observe(node);

        return {
            destroy() {
                observer.disconnect();
            }
        };
    }

    // Sommaire cliquable (pour navigation interne)
    const sections = [
        { id: 'acceptation', title: '1. Acceptation des conditions' },
        { id: 'service', title: '2. Description du service' },
        { id: 'compte', title: '3. Accès et utilisation' },
        { id: 'donnees', title: '4. Données personnelles' },
        { id: 'propriete', title: '5. Propriété intellectuelle' },
        { id: 'responsabilite', title: '6. Limitation de responsabilité' },
        { id: 'disponibilite', title: '7. Disponibilité du service' },
        { id: 'modifications', title: '8. Modification des conditions' },
        { id: 'droit', title: '9. Droit applicable' },
        { id: 'contact', title: '10. Contact' }
    ];

    let activeSection = 'acceptation';

    function scrollToSection(id) {
        const el = document.getElementById(id);
        if (el) {
            const offset = 120;
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
            activeSection = id;
        }
    }
</script>

<svelte:head>
    <title>Conditions d'Utilisation – CVita</title>
    <meta name="description" content="Consultez les conditions générales d'utilisation du service CVita : créateur de CV gratuit, sans inscription, avec stockage local des données." />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="{siteUrl}/terms" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="Conditions d'Utilisation – CVita" />
    <meta property="og:description" content="Conditions générales d'utilisation du service CVita." />
    <meta property="og:url" content="{siteUrl}/terms" />
</svelte:head>

<div class="min-h-screen bg-neutral-100/60 flex flex-col justify-between overflow-x-hidden">
    <!-- Header -->
    <Header currentPath="/terms" />

    <main class="w-full pt-16">
        <!-- ========================================= -->
        <!-- HERO / TITRE                             -->
        <!-- ========================================= -->
        <section class="max-w-4xl mx-auto px-4 pt-16 pb-10 md:pt-24 md:pb-12" use:reveal>
            <span class="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-black uppercase tracking-widest bg-black text-white rounded-full mb-6 shadow-sm">
                <Icon icon="mdi:file-document-outline" class="w-3.5 h-3.5" />
                Mentions Légales
            </span>

            <h1 class="text-3xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-none uppercase">
                Conditions <br />
                <span class="bg-gradient-to-r from-black via-neutral-700 to-neutral-400 bg-clip-text text-transparent">
                    d'Utilisation
                </span>
            </h1>

            <p class="mt-6 text-sm sm:text-base font-semibold text-neutral-600 max-w-2xl leading-relaxed">
                Merci d'utiliser CVita. En accédant à notre service, vous acceptez les conditions décrites ci-dessous. Prenez le temps de les lire attentivement.
            </p>

            <!-- Bandeau info : dernière mise à jour -->
            <div class="mt-8 inline-flex items-center gap-3 px-4 py-2.5 bg-white border-2 border-neutral-200 rounded-xl">
                <Icon icon="mdi:calendar-clock" class="w-4 h-4 text-neutral-500" />
                <span class="text-xs font-bold text-neutral-600 uppercase tracking-wider">
                    Dernière mise à jour : <span class="text-black">{lastUpdate}</span>
                </span>
            </div>
        </section>

        <!-- ========================================= -->
        <!-- LAYOUT : SOMMAIRE + CONTENU              -->
        <!-- ========================================= -->
        <section class="max-w-6xl mx-auto px-4 pb-20">
            <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">

                <!-- SOMMAIRE STICKY (desktop) -->
                <aside class="hidden lg:block sticky top-24" use:reveal={{ delay: 100 }}>
                    <div class="bg-white rounded-2xl border-2 border-neutral-200 p-5 shadow-sm">
                        <div class="flex items-center gap-2 pb-3 mb-3 border-b-2 border-neutral-100">
                            <Icon icon="mdi:format-list-bulleted" class="w-4 h-4 text-black" />
                            <span class="text-xs font-black uppercase tracking-wider text-black">Sommaire</span>
                        </div>
                        <nav class="flex flex-col gap-1">
                            {#each sections as s}
                                <button
                                    type="button"
                                    on:click={() => scrollToSection(s.id)}
                                    class={`text-left text-[11px] font-bold uppercase tracking-wide px-3 py-2 rounded-lg transition-all ${
                                        activeSection === s.id
                                            ? 'bg-black text-white'
                                            : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                                    }`}
                                >
                                    {s.title}
                                </button>
                            {/each}
                        </nav>
                    </div>
                </aside>

                <!-- CONTENU DES CONDITIONS -->
                <div class="space-y-4 min-w-0">

                    <!-- 1. Acceptation -->
                    <article id="acceptation" use:reveal={{ delay: 0 }}>
                        <div class="bg-white rounded-2xl border-2 border-neutral-200 p-6 sm:p-8 shadow-sm hover:border-black transition-colors">
                            <h2 class="text-base font-black text-black uppercase tracking-tight mb-3 flex items-center gap-2">
                                <span class="w-7 h-7 bg-black text-white rounded-lg flex items-center justify-center text-xs font-black shrink-0">1</span>
                                Acceptation des conditions
                            </h2>
                            <p class="text-sm md:text-base font-medium text-neutral-600 leading-relaxed">
                                En accédant à CVita et en utilisant ses services, vous reconnaissez avoir lu, compris et accepté sans réserve les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, nous vous invitons à ne pas utiliser le service.
                            </p>
                        </div>
                    </article>

                    <!-- 2. Description du service -->
                    <article id="service" use:reveal={{ delay: 50 }}>
                        <div class="bg-white rounded-2xl border-2 border-neutral-200 p-6 sm:p-8 shadow-sm hover:border-black transition-colors">
                            <h2 class="text-base font-black text-black uppercase tracking-tight mb-3 flex items-center gap-2">
                                <span class="w-7 h-7 bg-black text-white rounded-lg flex items-center justify-center text-xs font-black shrink-0">2</span>
                                Description du service
                            </h2>
                            <p class="text-sm md:text-base font-medium text-neutral-600 leading-relaxed mb-4">
                                CVita est un outil en ligne permettant de créer, prévisualiser et exporter des CV au format PDF. Le service est fourni <strong class="text-black">gratuitement</strong>, <strong class="text-black">sans inscription obligatoire</strong> et repose sur un traitement <strong class="text-black">100% local</strong> des données.
                            </p>
                            <ul class="space-y-2 text-sm md:text-base font-medium text-neutral-600">
                                <li class="flex items-start gap-2">
                                    <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    Création de CV compatible ATS
                                </li>
                                <li class="flex items-start gap-2">
                                    <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    Export PDF vectoriel haute résolution
                                </li>
                                <li class="flex items-start gap-2">
                                    <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    Analyse de compatibilité ATS en temps réel
                                </li>
                                <li class="flex items-start gap-2">
                                    <Icon icon="mdi:check-circle" class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    Sauvegarde et import au format JSON
                                </li>
                            </ul>
                        </div>
                    </article>

                    <!-- 3. Accès et utilisation -->
                    <article id="compte" use:reveal={{ delay: 100 }}>
                        <div class="bg-white rounded-2xl border-2 border-neutral-200 p-6 sm:p-8 shadow-sm hover:border-black transition-colors">
                            <h2 class="text-base font-black text-black uppercase tracking-tight mb-3 flex items-center gap-2">
                                <span class="w-7 h-7 bg-black text-white rounded-lg flex items-center justify-center text-xs font-black shrink-0">3</span>
                                Accès et utilisation
                            </h2>
                            <p class="text-sm md:text-base font-medium text-neutral-600 leading-relaxed mb-4">
                                L'utilisateur s'engage à utiliser CVita de manière loyale et conforme à la législation en vigueur. Il est notamment interdit de :
                            </p>
                            <ul class="space-y-2 text-sm md:text-base font-medium text-neutral-600">
                                <li class="flex items-start gap-2">
                                    <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                    Tenter de contourner ou de perturber le fonctionnement du service
                                </li>
                                <li class="flex items-start gap-2">
                                    <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                    Utiliser le service à des fins illégales ou frauduleuses
                                </li>
                                <li class="flex items-start gap-2">
                                    <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                    Créer de faux CV dans le but de nuire à des tiers
                                </li>
                                <li class="flex items-start gap-2">
                                    <Icon icon="mdi:close-circle" class="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                    Extraire, copier ou revendre tout ou partie du code source
                                </li>
                            </ul>
                        </div>
                    </article>

                    <!-- 4. Données personnelles -->
                    <article id="donnees" use:reveal={{ delay: 150 }}>
                        <div class="bg-white rounded-2xl border-2 border-neutral-200 p-6 sm:p-8 shadow-sm hover:border-black transition-colors">
                            <h2 class="text-base font-black text-black uppercase tracking-tight mb-3 flex items-center gap-2">
                                <span class="w-7 h-7 bg-black text-white rounded-lg flex items-center justify-center text-xs font-black shrink-0">4</span>
                                Données personnelles
                            </h2>
                            <p class="text-sm md:text-base font-medium text-neutral-600 leading-relaxed mb-4">
                                CVita applique un principe de <strong class="text-black">minimisation des données</strong>. Aucune information saisie dans l'éditeur n'est transmise ni stockée sur nos serveurs.
                            </p>
                            <div class="bg-neutral-50 border-2 border-neutral-200 rounded-xl p-4">
                                <div class="flex items-start gap-3">
                                    <Icon icon="mdi:shield-lock" class="w-5 h-5 text-black shrink-0 mt-0.5" />
                                    <div>
                                        <p class="text-xs font-black uppercase tracking-wider text-black mb-1">Stockage local uniquement</p>
                                        <p class="text-xs md:text-sm font-medium text-neutral-600 leading-relaxed">
                                            Toutes vos données (informations personnelles, expériences, compétences...) sont enregistrées exclusivement dans le <strong>LocalStorage de votre navigateur</strong>. Vous pouvez les effacer à tout moment en vidant le cache de votre navigateur.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    <!-- 5. Propriété intellectuelle -->
                    <article id="propriete" use:reveal={{ delay: 200 }}>
                        <div class="bg-white rounded-2xl border-2 border-neutral-200 p-6 sm:p-8 shadow-sm hover:border-black transition-colors">
                            <h2 class="text-base font-black text-black uppercase tracking-tight mb-3 flex items-center gap-2">
                                <span class="w-7 h-7 bg-black text-white rounded-lg flex items-center justify-center text-xs font-black shrink-0">5</span>
                                Propriété intellectuelle
                            </h2>
                            <p class="text-sm md:text-base font-medium text-neutral-600 leading-relaxed mb-4">
                                Le nom <strong class="text-black">CVita</strong>, son logo, son design, son code source et l'ensemble des éléments graphiques sont la propriété exclusive de l'éditeur. Toute reproduction, même partielle, sans autorisation écrite préalable est interdite. Les CV générés par l'utilisateur lui appartiennent intégralement et il en dispose librement.
                            </p>

                            <!-- Mention développeur Kleonix -->
                            <div class="bg-neutral-50 border-2 border-neutral-200 rounded-xl p-4">
                                <div class="flex items-start gap-3">
                                    <Icon icon="mdi:code-tags" class="w-5 h-5 text-black shrink-0 mt-0.5" />
                                    <div>
                                        <p class="text-xs font-black uppercase tracking-wider text-black mb-1">Développement</p>
                                        <p class="text-xs md:text-sm font-medium text-neutral-600 leading-relaxed">
                                            Ce site a été conçu et développé par l'agence
                                            <a
                                                href="https://kleonix.netlify.app"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="font-black text-black underline decoration-2 underline-offset-2 hover:text-neutral-700 transition-colors"
                                            >
                                                Kleonix
                                            </a>.
                                            Pour toute demande technique, collaboration ou projet web, visitez
                                            <a
                                                href="https://kleonix.netlify.app"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="font-black text-black hover:underline"
                                            >
                                                kleonix.netlify.app
                                            </a>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    <!-- 6. Limitation de responsabilité -->
                    <article id="responsabilite" use:reveal={{ delay: 250 }}>
                        <div class="bg-white rounded-2xl border-2 border-neutral-200 p-6 sm:p-8 shadow-sm hover:border-black transition-colors">
                            <h2 class="text-base font-black text-black uppercase tracking-tight mb-3 flex items-center gap-2">
                                <span class="w-7 h-7 bg-black text-white rounded-lg flex items-center justify-center text-xs font-black shrink-0">6</span>
                                Limitation de responsabilité
                            </h2>
                            <p class="text-sm md:text-base font-medium text-neutral-600 leading-relaxed">
                                CVita est fourni <strong class="text-black">« en l'état »</strong>, sans garantie d'aucune sorte, expresse ou implicite. Nous ne saurions être tenus responsables :
                            </p>
                            <ul class="mt-4 space-y-2 text-sm md:text-base font-medium text-neutral-600">
                                <li class="flex items-start gap-2">
                                    <span class="text-neutral-400 font-black">→</span>
                                    D'une perte de données liée à la suppression du cache navigateur
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-neutral-400 font-black">→</span>
                                    De l'utilisation faite des CV générés par les utilisateurs
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-neutral-400 font-black">→</span>
                                    D'une indisponibilité temporaire du service
                                </li>
                                <li class="flex items-start gap-2">
                                    <span class="text-neutral-400 font-black">→</span>
                                    Des résultats obtenus lors de candidatures auprès de recruteurs
                                </li>
                            </ul>
                        </div>
                    </article>

                    <!-- 7. Disponibilité du service -->
                    <article id="disponibilite" use:reveal={{ delay: 300 }}>
                        <div class="bg-white rounded-2xl border-2 border-neutral-200 p-6 sm:p-8 shadow-sm hover:border-black transition-colors">
                            <h2 class="text-base font-black text-black uppercase tracking-tight mb-3 flex items-center gap-2">
                                <span class="w-7 h-7 bg-black text-white rounded-lg flex items-center justify-center text-xs font-black shrink-0">7</span>
                                Disponibilité du service
                            </h2>
                            <p class="text-sm md:text-base font-medium text-neutral-600 leading-relaxed">
                                Nous nous efforçons de maintenir CVita accessible 24h/24 et 7j/7. Toutefois, le service peut être interrompu temporairement pour maintenance, mise à jour ou en cas de force majeure, sans que cela n'ouvre droit à une quelconque indemnisation.
                            </p>
                        </div>
                    </article>

                    <!-- 8. Modification des conditions -->
                    <article id="modifications" use:reveal={{ delay: 350 }}>
                        <div class="bg-white rounded-2xl border-2 border-neutral-200 p-6 sm:p-8 shadow-sm hover:border-black transition-colors">
                            <h2 class="text-base font-black text-black uppercase tracking-tight mb-3 flex items-center gap-2">
                                <span class="w-7 h-7 bg-black text-white rounded-lg flex items-center justify-center text-xs font-black shrink-0">8</span>
                                Modification des conditions
                            </h2>
                            <p class="text-sm md:text-base font-medium text-neutral-600 leading-relaxed">
                                CVita se réserve le droit de modifier les présentes conditions à tout moment. Les utilisateurs sont invités à consulter régulièrement cette page. La date de dernière mise à jour est indiquée en haut du document. La poursuite de l'utilisation du service après modification vaut acceptation des nouvelles conditions.
                            </p>
                        </div>
                    </article>

                    <!-- 9. Droit applicable -->
                    <article id="droit" use:reveal={{ delay: 400 }}>
                        <div class="bg-white rounded-2xl border-2 border-neutral-200 p-6 sm:p-8 shadow-sm hover:border-black transition-colors">
                            <h2 class="text-base font-black text-black uppercase tracking-tight mb-3 flex items-center gap-2">
                                <span class="w-7 h-7 bg-black text-white rounded-lg flex items-center justify-center text-xs font-black shrink-0">9</span>
                                Droit applicable
                            </h2>
                            <p class="text-sm md:text-base font-medium text-neutral-600 leading-relaxed">
                                Les présentes conditions sont régies par le droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents pour connaître du différend.
                            </p>
                        </div>
                    </article>

                    <!-- 10. Contact -->
                    <article id="contact" use:reveal={{ delay: 450 }}>
                        <div class="bg-black text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden group">
                            <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-neutral-800 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-all duration-700"></div>
                            <div class="relative z-10">
                                <h2 class="text-base font-black uppercase tracking-tight mb-3 flex items-center gap-2">
                                    <span class="w-7 h-7 bg-white text-black rounded-lg flex items-center justify-center text-xs font-black shrink-0">10</span>
                                    Contact
                                </h2>
                                <p class="text-sm font-semibold text-neutral-400 leading-relaxed mb-4">
                                    Pour toute question relative aux présentes conditions d'utilisation, vous pouvez nous contacter :
                                </p>
                                <a
                                    href="mailto:contact.kleonix@gmail.com"
                                    class="inline-flex items-center gap-2 px-5 py-3 bg-white text-black text-xs font-black uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-all shadow-lg hover:scale-105"
                                >
                                    <Icon icon="mdi:email-outline" class="w-4 h-4" />
                                    contact.kleonix@gmail.com
                                </a>
                            </div>
                        </div>
                    </article>

                    <!-- Note de bas de contenu -->
                    <div class="pt-6">
                        <div class="bg-neutral-50 border-2 border-dashed border-neutral-300 rounded-2xl p-5 text-center">
                            <p class="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                                En utilisant CVita, vous confirmez avoir lu et accepté l'intégralité de ces conditions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="max-w-6xl mx-auto w-full px-4 py-8 border-t-2 border-neutral-200">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex flex-col items-center sm:items-start gap-1">
                <p class="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    © {currentYear} CVita — Tous droits réservés.
                </p>
                <p class="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Développé par
                    <a
                        href="https://kleonix.netlify.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-black hover:underline underline-offset-2"
                    >
                        Kleonix
                    </a>
                </p>
            </div>
            <nav class="flex items-center gap-4">
                <a href="/terms" class="text-xs font-bold text-black uppercase tracking-wider hover:text-neutral-500 transition-colors">
                    Conditions
                </a>
            </nav>
        </div>
    </footer>
</div>

<style>
    /* Scroll fluide pour la navigation interne */
    :global(html) {
        scroll-behavior: smooth;
    }

    /* Détection de la section active au scroll (optionnel) */
    @media (prefers-reduced-motion: reduce) {
        :global(html) {
            scroll-behavior: auto;
        }
    }
</style>