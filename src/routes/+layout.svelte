<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { afterNavigate } from '$app/navigation';
    import { initGoogleAnalytics, trackPageView } from '$lib/analytics';

    onMount(() => {
        initGoogleAnalytics();
    });

    afterNavigate(() => {
        trackPageView();
    });
</script>

<main>
    <slot />
</main>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* {
    font-family: "Montserrat", sans-serif;
    font-style: normal;
}

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