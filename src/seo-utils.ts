// src/seo-utils.ts
/** Utility helpers for SEO implementation — Busy Multicare Software */

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

/** Generate LocalBusiness schema for Busy Multicare Software */
export function generateLocalBusinessSchema({
  name = 'Busy Multicare Software Pvt. Ltd.',
  url,
  phone,
  email,
  streetAddress = 'New Road & Putalisadak',
  addressLocality = 'Kathmandu',
  postalCode = '44600',
  latitude = 27.7172,
  longitude = 85.324,
  image,
  description = 'Authorized Busy Accounting Software dealer in Nepal. Serving businesses since 20+ years.',
  socialProfiles = [],
}: {
  name?: string;
  url: string;
  phone: string;
  email: string;
  streetAddress?: string;
  addressLocality?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  image?: string;
  description?: string;
  socialProfiles?: string[];
} = {
  name: 'Busy Multicare Software Pvt. Ltd.',
  url: 'https://www.busymulticare.com.np',
  phone: '+977-9851125905',
  email: 'busyedu@gmail.com',
  image: 'https://www.busymulticare.com.np/og-image.png',
  socialProfiles: ['https://www.facebook.com/p/Busy-Multi-Care-Pvt-Ltd-100063584352392/'],
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url}/#localbusiness`,
    name,
    url,
    telephone: phone,
    email,
    address: {
      '@type': 'PostalAddress',
      streetAddress,
      addressLocality,
      addressCountry: 'NP',
      postalCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude,
      longitude,
    },
    description,
    areaServed: 'Nepal',
    priceRange: 'Rs.12,000+',
  };

  if (image) schema.image = image;
  if (socialProfiles.length > 0) schema.sameAs = socialProfiles;

  return schema;
}

/** Generate FAQPage schema */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/** Generate Product schema */
export function generateProductSchema({
  name,
  description,
  price,
  priceCurrency = 'NPR',
  availability = 'https://schema.org/InStock',
  image,
  ratingValue = '4.8',
  reviewCount = '250',
  url,
}: {
  name: string;
  description: string;
  price: string;
  priceCurrency?: string;
  availability?: string;
  image?: string;
  ratingValue?: string;
  reviewCount?: string;
  url: string;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency,
      availability,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
  };

  if (image) schema.image = image;

  return schema;
}

/** Generate Organization schema */
export function generateOrganizationSchema({
  name,
  url,
  logo,
  description,
  socialProfiles = [],
}: {
  name: string;
  url: string;
  logo: string;
  description: string;
  socialProfiles?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    sameAs: socialProfiles,
  };
}
