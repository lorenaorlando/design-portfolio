/**
 * Google Analytics 4. Paste the Measurement ID of the existing property
 * (Admin → Data streams → lorenaorlando.click → "G-XXXXXXXXXX") here.
 * While it is empty, nothing is loaded.
 */
export const GA_MEASUREMENT_ID = 'G-9C1J96E9CB';

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: Gtag;
  }
}

export function initAnalytics() {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || window.gtag) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object itself, not an array.
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  // Page views are sent manually on every route change (the site uses #/ routes).
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false });
}

/** Sends a page view for the current #/ route, e.g. /proyectos/technicolor. */
export function trackPageView() {
  if (!window.gtag) return;
  const path = window.location.hash.replace(/^#/, '') || '/';
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: `${window.location.origin}${window.location.pathname}#${path}`,
    page_title: document.title,
  });
}
