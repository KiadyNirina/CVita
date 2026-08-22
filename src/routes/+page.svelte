<script>
    // Pas besoin d'importer les composants de l'éditeur ici
    // juste un design d'accueil
</script>

<div class="min-h-screen bg-neutral-100/60 flex flex-col items-center justify-center px-4 py-12">
    <div class="max-w-3xl text-center">
        <span class="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-black text-white rounded-full mb-6">
            Outil gratuit
        </span>
        <h1 class="text-5xl sm:text-6xl font-black text-black tracking-tight">
            Créez votre CV <br />
            <span class="bg-gradient-to-r from-black to-neutral-600 bg-clip-text text-transparent">
                en quelques minutes
            </span>
        </h1>
        <p class="mt-6 text-lg text-neutral-600 max-w-2xl mx-auto">
            Un éditeur moderne, ATS-friendly, avec aperçu en direct et analyse de compatibilité.
            Remplissez vos informations, optimisez votre CV et exportez-le en PDF.
        </p>
        <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/builder" class="inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition shadow-lg hover:shadow-xl">
                Commencer maintenant
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </a>
            <a href="#features" class="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-bold uppercase tracking-wider rounded-xl border-2 border-black hover:bg-neutral-100 transition">
                En savoir plus
            </a>
        </div>
    </div>

    <!-- Section fonctionnalités -->
    <div id="features" class="mt-24 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-2xl border-2 border-neutral-200 shadow-sm">
            <div class="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 class="text-lg font-bold text-black">Analyse ATS intégrée</h3>
            <p class="text-sm text-neutral-600 mt-2">Vérifiez la compatibilité de votre CV avec les systèmes de suivi des candidatures en temps réel.</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border-2 border-neutral-200 shadow-sm">
            <div class="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            </div>
            <h3 class="text-lg font-bold text-black">Aperçu en direct</h3>
            <p class="text-sm text-neutral-600 mt-2">Visualisez instantanément le rendu final de votre CV au format A4, prêt à imprimer.</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border-2 border-neutral-200 shadow-sm">
            <div class="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            </div>
            <h3 class="text-lg font-bold text-black">Export PDF & DOCX</h3>
            <p class="text-sm text-neutral-600 mt-2">Téléchargez votre CV en PDF ou DOCX en un clic, avec une mise en page professionnelle.</p>
        </div>
    </div>

    <!-- Pied de page minimal -->
    <footer class="mt-16 text-xs text-neutral-400 border-t-2 border-neutral-200 pt-6 w-full text-center">
        © {new Date().getFullYear()} Créateur de CV — Outil 100% gratuit, sans inscription.
    </footer>
</div>