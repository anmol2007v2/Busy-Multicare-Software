// src/seo-utils.ts
/** Utility helpers for SEO implementation */

/** Generate canonical URL based on the current location */
export function getCanonicalUrl(): string {
  if (typeof window === 'undefined') return '';
  return window.location.origin + window.location.pathname;
}

/** Generate JSON‑LD for a generic WebPage */
export function generateWebPageSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
  };
}

/** Generate BreadcrumbList schema from an array of items */
export function generateBreadcrumbSchema(
  items: { name: string; position: number; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.url,
    })),
  };
}
