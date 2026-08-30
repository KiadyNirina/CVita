import { browser } from '$app/environment';
import { PUBLIC_GA_ID } from '$env/static/public';

export function initGoogleAnalytics() {
    if (!browser || !PUBLIC_GA_ID) return;
    if (window.gtag) return;

    window.dataLayer = window.dataLayer || [];

    window.gtag = function () {
        window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());

    window.gtag('config', PUBLIC_GA_ID, {
        send_page_view: false
    });

    const script = document.createElement('script');

    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GA_ID}`;

    document.head.appendChild(script);
}

export function trackPageView() {
    if (!browser || !window.gtag) return;

    window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
}

export function trackEvent(eventName, parameters = {}) {
    if (!browser || !window.gtag) return;

    window.gtag('event', eventName, parameters);
}