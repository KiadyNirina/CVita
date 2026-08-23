<!-- src/lib/components/Header.svelte -->
<script>
    export let currentPath = '/';
</script>

<header class="w-full bg-white border-b-2 border-neutral-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Logo / Titre Brand -->
        <a href="/" class="flex items-center gap-2.5 group">
            <div class="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-black text-sm group-hover:scale-105 transition-transform">
                CV
            </div>
            <span class="text-base font-black text-black tracking-tight uppercase">
                CV<span class="text-neutral-500">Builder</span>
            </span>
        </a>

        <!-- Liens de navigation -->
        <nav class="flex items-center gap-3 sm:gap-6">
            <!-- <a 
                href="/" 
                class={`text-xs font-bold uppercase tracking-wider transition-colors ${
                    currentPath === '/' ? 'text-black font-black' : 'text-neutral-500 hover:text-black'
                }`}
            >
                Accueil
            </a> -->

            <a 
                href="/builder" 
                class={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    currentPath === '/builder' 
                        ? 'bg-black text-white shadow-sm' 
                        : 'bg-neutral-100 text-black border-2 border-neutral-200 hover:border-black'
                }`}
            >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                </svg>
                Créer un CV
            </a>
        </nav>
    </div>
</header>