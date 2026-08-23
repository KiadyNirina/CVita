<script>
    import Header from '$lib/components/Header.svelte';
    const currentYear = new Date().getFullYear();
</script>

<div class="min-h-screen bg-neutral-100/60 flex flex-col justify-between">
    <!-- Header -->
    <Header currentPath="/" />

    <!-- Conteneur Principal / Hero Section -->
    <main class="max-w-4xl mx-auto text-center my-auto px-4 py-12">
        <!-- Badge Tag -->
        <span class="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-black uppercase tracking-widest bg-black text-white rounded-full mb-8 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Outil 100% Gratuit & Sans Inscription
        </span>

        <!-- Titre Impactant -->
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-black text-black tracking-tight leading-none uppercase">
            Créez votre CV <br />
            <span class="text-neutral-500">en quelques minutes.</span>
        </h1>

        <!-- Description -->
        <p class="mt-6 text-sm sm:text-base font-semibold text-neutral-600 max-w-xl mx-auto leading-relaxed">
            Un éditeur moderne et ATS-friendly avec aperçu A4 en temps réel et analyse de compatibilité automatique. Concentrez-vous sur le contenu, nous gérons la mise en page.
        </p>

        <!-- CTA Action Buttons -->
        <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
                href="/builder" 
                class="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-black text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all cursor-pointer shadow-md hover:shadow-lg"
            >
                Créer mon CV
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </a>
            
            <a 
                href="#features" 
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-neutral-900 text-xs font-black uppercase tracking-wider rounded-xl border-2 border-neutral-300 hover:border-black hover:bg-neutral-50 focus:outline-none transition-all cursor-pointer shadow-sm"
            >
                En savoir plus
            </a>
        </div>

        <!-- Section Fonctionnalités -->
        <div id="features" class="mt-20 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div class="bg-white p-6 rounded-2xl border-2 border-neutral-200 shadow-sm hover:border-black transition-all">
                <div class="w-10 h-10 bg-black rounded-xl flex items-center justify-center mb-4 text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 class="text-base font-bold text-black uppercase tracking-tight">Analyse ATS Intégrée</h3>
                <p class="text-xs font-semibold text-neutral-500 mt-2 leading-relaxed">
                    Évaluez instantanément la lisibilité de votre CV par les algorithmes de recrutement grâce au score dynamique.
                </p>
            </div>

            <div class="bg-white p-6 rounded-2xl border-2 border-neutral-200 shadow-sm hover:border-black transition-all">
                <div class="w-10 h-10 bg-black rounded-xl flex items-center justify-center mb-4 text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </div>
                <h3 class="text-base font-bold text-black uppercase tracking-tight">Aperçu A4 Direct</h3>
                <p class="text-xs font-semibold text-neutral-500 mt-2 leading-relaxed">
                    Visualisez instantanément le rendu exact de votre document au format A4 pendant que vous le remplissez.
                </p>
            </div>

            <div class="bg-white p-6 rounded-2xl border-2 border-neutral-200 shadow-sm hover:border-black transition-all">
                <div class="w-10 h-10 bg-black rounded-xl flex items-center justify-center mb-4 text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </div>
                <h3 class="text-base font-bold text-black uppercase tracking-tight">Export PDF & JSON</h3>
                <p class="text-xs font-semibold text-neutral-500 mt-2 leading-relaxed">
                    Téléchargez votre CV au format PDF haute résolution ou sauvegardez les données brutes en JSON pour les recharger plus tard.
                </p>
            </div>
        </div>
    </main>

    <!-- Pied de Page Minimal -->
    <footer class="max-w-4xl mx-auto w-full px-4 py-8 border-t-2 border-neutral-200 text-center">
        <p class="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            © {currentYear} CVBuilder — Tous droits réservés.
        </p>
    </footer>
</div>