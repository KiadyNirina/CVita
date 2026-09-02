import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
    plugins: [
        sveltekit(),

        SvelteKitPWA({
            registerType: 'autoUpdate',

            manifest: {
                name: 'CVita - Créateur de CV',
                short_name: 'CVita',
                description: 'Créez votre CV professionnel facilement',
                lang: 'fr',

                theme_color: '#194867',
                background_color: '#ffffff',

                display: 'standalone',
                orientation: 'portrait',

                start_url: '/',
                scope: '/',

                icons: [
                    {
                        src: '/images/pwa-192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/images/pwa-512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: '/images/pwa-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    }
                ]
            }
        })
    ]
});