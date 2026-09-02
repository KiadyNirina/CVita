<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { afterNavigate } from '$app/navigation';
    import { initGoogleAnalytics, trackPageView } from '$lib/analytics';
    import { pwaInfo } from 'virtual:pwa-info';

    onMount(async () => {
        initGoogleAnalytics();
        if (pwaInfo) {
            const { registerSW } = await import('virtual:pwa-register');

            registerSW({
                immediate: true,

                onRegistered(registration) {
                    console.log('PWA : Service Worker enregistré', registration);
                },

                onRegisterError(error) {
                    console.error(
                        'PWA : erreur lors de l’enregistrement',
                        error
                    );
                },

                onOfflineReady() {
                    console.log(
                        'PWA : application disponible hors ligne'
                    );
                },

                onNeedRefresh() {
                    console.log(
                        'PWA : nouvelle version disponible'
                    );
                }
            });
        }
    });

    $: webManifest = pwaInfo
        ? pwaInfo.webManifest.linkTag
        : '';

    afterNavigate(() => {
        trackPageView();
    });
</script>

<svelte:head>
    {@html webManifest}
</svelte:head>
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