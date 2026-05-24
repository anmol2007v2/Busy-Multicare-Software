// src/analytics.ts
/**
 * Simple analytics wrapper. Replace with your preferred analytics provider.
 * This example uses Google Analytics 4 (gtag.js).
 */
export function initAnalytics() {
  if (typeof window === 'undefined') return;
  // Load GA4 script only once
  if ((window as any).gtag) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`;
  document.head.appendChild(script);

  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
  (window as any).gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
}
