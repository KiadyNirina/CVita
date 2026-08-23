<script>
    import Header from '$lib/components/Header.svelte';
    import { slide } from 'svelte/transition';

    const currentYear = new Date().getFullYear();

    let openFaq = null;

    function toggleFaq(index) {
        openFaq = openFaq === index ? null : index;
    }

    const keywords = [
        "FORMAT PDF VECTORIEL", "PARSING ATS OPTIMISÉ", "SANS INSCRIPTION", 
        "100% GRATUIT", "DONNÉES LOCALES", "SCORE EN TEMPS RÉEL", "GÉNÉRATEUR A4"
    ];

    const faqs = [
        {
            q: "Est-ce réellement 100% gratuit ?",
            a: "Oui, totalement. Aucun abonnement caché, aucune carte bancaire demandée et aucune fonctionnalité payante bloquée."
        },
        {
            q: "Qu'est-ce qu'un CV compatible ATS ?",
            a: "Les ATS (Applicant Tracking Systems) sont des logiciels utilisés par les recruteurs pour filtrer automatiquement les CV. Notre éditeur génère une structure propre et du texte lisible que ces algorithmes analysent sans erreur."
        },
        {
            q: "Où sont stockées mes données personnelles ?",
            a: "Elles restent exclusivement stockées localement dans votre navigateur (LocalStorage). Rien n'est envoyé ni conservé sur nos serveurs."
        },
        {
            q: "Puis-je rééditer mon CV plus tard ?",
            a: "Absolument. Vous pouvez exporter vos données au format JSON et les recharger sur le site à tout moment pour mettre à jour votre parcours."
        }
    ];

    // Effet 3D Tilt sur cartes
    function handleMouseMove(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    function handleMouseLeave(element) {
        element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }

    // Action d'animation d'entrée au scroll
    function reveal(node, options = {}) {
        const { delay = 0 } = options;
        
        node.style.opacity = '0';
        node.style.transform = 'translateY(30px)';
        node.style.transition = `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`;
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
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
</script>

<div class="min-h-screen bg-neutral-100/60 flex flex-col justify-between overflow-x-hidden">
    <!-- Header -->
    <Header currentPath="/" />

    <main class="w-full">
        <!-- 1. HERO SECTION -->
        <section class="max-w-6xl mx-auto px-4 py-16 md:py-24" use:reveal>
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <!-- Colonne gauche : texte et boutons -->
                <div class="text-left">
                    <span class="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-black uppercase tracking-widest bg-black text-white rounded-full mb-8 shadow-sm">
                        Outil 100% Gratuit & Sans Inscription
                    </span>

                    <h1 class="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-none uppercase">
                        Créez votre CV <br />
                        <span class="bg-gradient-to-r from-black via-neutral-700 to-neutral-400 bg-clip-text text-transparent">
                            en quelques minutes.
                        </span>
                    </h1>

                    <p class="mt-6 text-sm sm:text-base font-semibold text-neutral-600 max-w-xl leading-relaxed">
                        Un éditeur moderne et ATS-friendly avec aperçu A4 en temps réel et analyse de compatibilité automatique.
                    </p>

                    <div class="mt-10 flex flex-col sm:flex-row gap-4">
                        <a 
                            href="/builder" 
                            class="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1"
                        >
                            Créer mon CV
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                        
                        <a 
                            href="#features" 
                            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-neutral-900 text-xs font-black uppercase tracking-wider rounded-xl border-2 border-neutral-300 hover:border-black hover:bg-neutral-50 transition-all"
                        >
                            En savoir plus
                        </a>
                    </div>
                </div>

                <!-- Colonne droite : mockup CV -->
                <div class="hidden md:block">
                    <div class="bg-white rounded-2xl shadow-2xl border border-neutral-200 p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                        <!-- En-tête du CV simulé -->
                        <div class="flex items-center gap-4 mb-6">
                            <div class="w-12 h-12 bg-neutral-200 rounded-full"></div>
                            <div>
                                <div class="h-3 w-32 bg-neutral-800 rounded mb-2"></div>
                                <div class="h-2 w-24 bg-neutral-300 rounded"></div>
                            </div>
                        </div>
                        <!-- Séparateur -->
                        <div class="border-t border-neutral-100 my-4"></div>
                        <!-- Sections simulées -->
                        <div class="space-y-4">
                            <div>
                                <div class="h-2 w-20 bg-neutral-800 rounded mb-2"></div>
                                <div class="h-2 w-full bg-neutral-200 rounded"></div>
                                <div class="h-2 w-3/4 bg-neutral-200 rounded mt-1"></div>
                            </div>
                            <div>
                                <div class="h-2 w-24 bg-neutral-800 rounded mb-2"></div>
                                <div class="h-2 w-full bg-neutral-200 rounded"></div>
                                <div class="h-2 w-5/6 bg-neutral-200 rounded mt-1"></div>
                            </div>
                            <div>
                                <div class="h-2 w-16 bg-neutral-800 rounded mb-2"></div>
                                <div class="h-2 w-2/3 bg-neutral-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 2. ANIMATION BANDEAU DE DÉFILEMENT AUTO (MARQUEE) -->
        <section class="border-y-2 border-neutral-200 bg-black text-white py-4 overflow-hidden relative">
            <div class="flex whitespace-nowrap animate-marquee gap-8">
                {#each Array(4) as _}
                    {#each keywords as word}
                        <div class="flex items-center gap-8">
                            <span class="text-xs font-black tracking-widest uppercase">{word}</span>
                            <span class="text-neutral-600 font-bold">•</span>
                        </div>
                    {/each}
                {/each}
            </div>
        </section>

        <!-- 3. BANNIÈRE STATISTIQUES AVEC INTERACTION -->
        <section class="border-b-2 border-neutral-200 bg-white py-12" use:reveal>
            <div class="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div class="p-4 rounded-xl hover:bg-neutral-50 transition-all">
                    <span class="block text-3xl sm:text-4xl font-black text-black tracking-tight">100%</span>
                    <span class="text-xs font-bold text-neutral-500 uppercase tracking-wider mt-1 block">Gratuit & Open</span>
                </div>
                <div class="p-4 rounded-xl hover:bg-neutral-50 transition-all">
                    <span class="block text-3xl sm:text-4xl font-black text-black tracking-tight">0s</span>
                    <span class="text-xs font-bold text-neutral-500 uppercase tracking-wider mt-1 block">Inscription</span>
                </div>
                <div class="p-4 rounded-xl hover:bg-neutral-50 transition-all">
                    <span class="block text-3xl sm:text-4xl font-black text-black tracking-tight">95%+</span>
                    <span class="text-xs font-bold text-neutral-500 uppercase tracking-wider mt-1 block">Score ATS Moyen</span>
                </div>
                <div class="p-4 rounded-xl hover:bg-neutral-50 transition-all">
                    <span class="block text-3xl sm:text-4xl font-black text-black tracking-tight">PDF A4</span>
                    <span class="text-xs font-bold text-neutral-500 uppercase tracking-wider mt-1 block">Haute Résolution</span>
                </div>
            </div>
        </section>

        <!-- 4. CARTES INTERACTIVES AVEC TILT 3D -->
        <section id="features" class="max-w-6xl mx-auto px-4 py-20">
            <div class="text-center mb-12" use:reveal>
                <h2 class="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">Avantages</h2>
                <p class="text-2xl sm:text-4xl font-black text-black uppercase tracking-tight">Conçu pour maximiser vos entretiens</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Card 1 -->
                <div use:reveal={{ delay: 0 }}>
                    <div 
                        class="bg-white p-8 rounded-2xl border-2 border-neutral-200 shadow-sm transition-transform duration-200 ease-out cursor-pointer"
                        on:mousemove={(e) => handleMouseMove(e, e.currentTarget)}
                        on:mouseleave={(e) => handleMouseLeave(e.currentTarget)}
                    >
                        <div class="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6 text-white">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 class="text-base font-bold text-black uppercase tracking-tight">Analyse ATS Intégrée</h3>
                        <p class="text-xs font-semibold text-neutral-500 mt-3 leading-relaxed">
                            Évaluez instantanément la lisibilité de votre CV par les algorithmes de recrutement grâce à notre moteur de scoring.
                        </p>
                    </div>
                </div>

                <!-- Card 2 -->
                <div use:reveal={{ delay: 100 }}>
                    <div 
                        class="bg-white p-8 rounded-2xl border-2 border-neutral-200 shadow-sm transition-transform duration-200 ease-out cursor-pointer"
                        on:mousemove={(e) => handleMouseMove(e, e.currentTarget)}
                        on:mouseleave={(e) => handleMouseLeave(e.currentTarget)}
                    >
                        <div class="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6 text-white">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h3 class="text-base font-bold text-black uppercase tracking-tight">Aperçu A4 Direct</h3>
                        <p class="text-xs font-semibold text-neutral-500 mt-3 leading-relaxed">
                            Visualisez instantanément le rendu exact de votre document au format A4 pendant que vous remplissez vos données.
                        </p>
                    </div>
                </div>

                <!-- Card 3 -->
                <div use:reveal={{ delay: 200 }}>
                    <div 
                        class="bg-white p-8 rounded-2xl border-2 border-neutral-200 shadow-sm transition-transform duration-200 ease-out cursor-pointer"
                        on:mousemove={(e) => handleMouseMove(e, e.currentTarget)}
                        on:mouseleave={(e) => handleMouseLeave(e.currentTarget)}
                    >
                        <div class="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6 text-white">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </div>
                        <h3 class="text-base font-bold text-black uppercase tracking-tight">Export PDF & JSON</h3>
                        <p class="text-xs font-semibold text-neutral-500 mt-3 leading-relaxed">
                            Téléchargez votre CV en PDF prêt à l'emploi ou sauvegardez le fichier JSON pour le recharger ultérieurement.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 5. PROCESSUS À 3 ÉTAPES -->
        <section class="bg-white border-y-2 border-neutral-200 py-20">
            <div class="max-w-6xl mx-auto px-4">
                <div class="text-center mb-16" use:reveal>
                    <h2 class="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">Processus</h2>
                    <p class="text-2xl sm:text-4xl font-black text-black uppercase tracking-tight">Comment ça marche ?</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div use:reveal={{ delay: 0 }}>
                        <div class="bg-neutral-50 p-8 rounded-2xl border-2 border-neutral-200 hover:border-black transition-all">
                            <span class="text-4xl font-black text-neutral-300 mb-4 block">01</span>
                            <h3 class="text-base font-bold text-black uppercase tracking-tight mb-2">Saisissez vos données</h3>
                            <p class="text-xs font-semibold text-neutral-500 leading-relaxed">
                                Remplissez vos informations personnelles, vos compétences et diplômes via des formulaires guidés.
                            </p>
                        </div>
                    </div>

                    <div use:reveal={{ delay: 150 }}>
                        <div class="bg-neutral-50 p-8 rounded-2xl border-2 border-neutral-200 hover:border-black transition-all">
                            <span class="text-4xl font-black text-neutral-300 mb-4 block">02</span>
                            <h3 class="text-base font-bold text-black uppercase tracking-tight mb-2">Optimisez le Score ATS</h3>
                            <p class="text-xs font-semibold text-neutral-500 leading-relaxed">
                                Suivez nos recommandations en temps réel pour corriger les mots-clés manquants.
                            </p>
                        </div>
                    </div>

                    <div use:reveal={{ delay: 300 }}>
                        <div class="bg-neutral-50 p-8 rounded-2xl border-2 border-black">
                            <span class="text-4xl font-black text-black mb-4 block">03</span>
                            <h3 class="text-base font-bold text-black uppercase tracking-tight mb-2">Exportez en 1-Clic</h3>
                            <p class="text-xs font-semibold text-neutral-500 leading-relaxed">
                                Téléchargez votre document vectoriel au format PDF net, prêt à envoyer aux recruteurs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 5. COMPARATIF : POURQUOI ATS-FRIENDLY (NOUVEAU) -->
        <section class="max-w-6xl mx-auto px-4 py-20">
            <div class="text-center mb-16" use:reveal>
                <h2 class="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">Comparatif</h2>
                <p class="text-2xl sm:text-4xl font-black text-black uppercase tracking-tight">Pourquoi la structure importe</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Bad Practice -->
                <div use:reveal={{ delay: 0 }}>
                    <div class="bg-white p-8 rounded-2xl border-2 border-red-200 bg-red-50/20">
                        <div class="flex items-center gap-3 mb-6">
                            <span class="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-black">✕</span>
                            <h3 class="text-base font-bold text-black uppercase tracking-tight">CV Graphique Complexe</h3>
                        </div>
                        <ul class="space-y-3 text-xs font-semibold text-neutral-600">
                            <li class="flex items-start gap-2">
                                <span class="text-red-500">•</span> Colonnes multiples non lues par les logiciels
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-red-500">•</span> Icônes et graphiques illisibles pour les ATS
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-red-500">•</span> Risque de rejet automatique avant lecture humaine
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Good Practice -->
                <div use:reveal={{ delay: 150 }}>
                    <div class="bg-white p-8 rounded-2xl border-2 border-black shadow-sm">
                        <div class="flex items-center gap-3 mb-6">
                            <span class="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-black">✓</span>
                            <h3 class="text-base font-bold text-black uppercase tracking-tight">CV CVBuilder Standardized</h3>
                        </div>
                        <ul class="space-y-3 text-xs font-semibold text-neutral-600">
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-600 font-bold">•</span> Hiérarchie claire et balisage sémantique
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-600 font-bold">•</span> Typographie propre et polices standards universelles
                            </li>
                            <li class="flex items-start gap-2">
                                <span class="text-emerald-600 font-bold">•</span> Taux d'acceptation maximal par les robots RH
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- 6. FAQ ACCORDÉON (ANIMÉ) -->
        <section class="bg-white border-t-2 border-neutral-200 py-20" use:reveal>
            <div class="max-w-4xl mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 class="text-xs font-black text-neutral-500 uppercase tracking-widest mb-2">Questions Fréquentes</h2>
                    <p class="text-2xl sm:text-4xl font-black text-black uppercase tracking-tight">Foire Aux Questions</p>
                </div>

                <div class="space-y-4">
                    {#each faqs as faq, i}
                        <div class="border-2 border-neutral-200 rounded-2xl overflow-hidden bg-white transition-all">
                            <button 
                                type="button"
                                class="w-full text-left p-6 flex justify-between items-center font-bold text-black text-sm uppercase tracking-tight focus:outline-none cursor-pointer"
                                on:click={() => toggleFaq(i)}
                            >
                                <span>{faq.q}</span>
                                <span class="text-lg font-black transition-transform duration-300 {openFaq === i ? 'rotate-180' : ''}">
                                    ↓
                                </span>
                            </button>
                            
                            {#if openFaq === i}
                                <div 
                                    class="px-6 pb-6 text-xs font-semibold text-neutral-500 leading-relaxed border-t border-neutral-100 pt-4"
                                    transition:slide
                                >
                                    {faq.a}
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
        </section>

        <!-- 7. BANNIÈRE CTA FINALE -->
        <section class="max-w-6xl mx-auto px-4 py-20" use:reveal>
            <div class="bg-black text-white rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden group">
                <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-neutral-800 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-all duration-700"></div>
                <h2 class="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4 relative z-10">
                    Prêt à booster votre carrière ?
                </h2>
                <p class="text-xs sm:text-sm font-semibold text-neutral-400 max-w-lg mx-auto mb-8 uppercase tracking-wider relative z-10">
                    Créez votre CV au rendu professionnel sans perdre de temps sur la mise en page.
                </p>
                <a 
                    href="/builder" 
                    class="relative z-10 inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-xs font-black uppercase tracking-wider rounded-xl hover:bg-neutral-200 transition-all cursor-pointer shadow-lg hover:scale-105"
                >
                    Lancer l'Éditeur
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="max-w-6xl mx-auto w-full px-4 py-8 border-t-2 border-neutral-200 text-center">
        <p class="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            © {currentYear} CVita — Tous droits réservés.
        </p>
    </footer>
</div>

<style>
    @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
    }
    .animate-marquee {
        display: flex;
        width: 200%;
        animation: marquee 25s linear infinite;
    }
    .animate-marquee:hover {
        animation-play-state: paused;
    }

    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
</style>