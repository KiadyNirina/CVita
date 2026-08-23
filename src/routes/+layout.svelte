<script>
    import { page } from '$app/stores';
</script>

<nav class="bg-white border-b-2 border-neutral-200 px-4 py-3 flex items-center justify-between">
    <a href="/" class="text-xl font-black tracking-tight text-black">MonCV</a>
    <div class="flex gap-4">
        <a href="/" class="text-sm font-bold uppercase tracking-wider hover:text-black/70">Accueil</a>
        <a href="/builder" class="text-sm font-bold uppercase tracking-wider hover:text-black/70">Éditeur</a>
    </div>
</nav>

<main>
    <slot />
</main>

<style>
@page {
    size: A4;
    margin: 0;
}

@media print {
    body * {
        visibility: hidden;
    }

    .a4-pages,
    .a4-pages * {
        visibility: visible;
    }

    .a4-pages {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .a4-page {
        box-shadow: none;
        border: none;
        margin: 0;
        page-break-after: always;
    }
}
</style>