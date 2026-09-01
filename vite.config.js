import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        sveltekit(),

        VitePWA({
            registerType: 'autoUpdate',

            manifest: {
                name: 'CVita - Créateur de CV',
                short_name: 'CVita',
                description: 'Créez votre CV professionnel facilement',
                theme_color: '#194867',
                background_color: '#ffffff',
                display: 'standalone',
                orientation: 'portrait',
                start_url: '/',
                scope: '/',

                icons: [
                    {
                        src: '/images/logo.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/images/logo.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: '/images/logo.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    }
                ]
            },
			workbox: {
                globPatterns: [
                    '**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}'
                ],
				globIgnores: [
					'**/picture.png'
				]
            }
        })
    ]
});