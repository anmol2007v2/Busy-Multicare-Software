/**
 * useSEO.ts — Dynamic SEO hook for Busy Multicare Software
 * Manages per-page meta tags, canonical URLs, and structured data
 * Works with React + Vite (no Next.js required)
 */

import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noIndex?: boolean;
  keywords?: string;
  structuredData?: object | object[];
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
}

const BASE_URL = 'https://busymulticare.com';
const SITE_NAME = 'Busy Multicare Software';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;
// Twitter creator tag removed — handle not verified

function setMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setStructuredData(id: string, data: object | object[]) {
  const scriptId = `schema-${id}`;
  let el = document.getElementById(scriptId) as HTMLScriptElement;
  if (!el) {
    el = document.createElement('script');
    el.id = scriptId;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function useSEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
  keywords,
  structuredData,
  article,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`;

    // Title
    document.title = fullTitle;

    // Primary Meta
    setMeta('title', fullTitle);
    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1');

    // Canonical
    const canonicalUrl = canonical ?? `${BASE_URL}${window.location.pathname}`;
    setLink('canonical', canonicalUrl);

    // Open Graph
    setMeta('og:type', ogType, true);
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta('og:locale', 'en_NP', true);

    // Article-specific OG
    if (article?.publishedTime) setMeta('article:published_time', article.publishedTime, true);
    if (article?.modifiedTime) setMeta('article:modified_time', article.modifiedTime, true);
    if (article?.author) setMeta('article:author', article.author, true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // Structured Data
    if (structuredData) {
      setStructuredData('dynamic', structuredData);
    }

    // Cleanup on unmount
    return () => {
      const el = document.getElementById('schema-dynamic');
      if (el) el.remove();
    };
  }, [title, description, canonical, ogImage, ogType, noIndex, keywords, structuredData, article]);
}

// ══════════════════════════════════════════
//  PRE-BUILT SCHEMA GENERATORS
// ══════════════════════════════════════════

export const Schema = {
  breadcrumb: (items: { name: string; url: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  }),

  faq: (questions: { question: string; answer: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }),

  article: (data: {
    title: string;
    description: string;
    image: string;
    author: string;
    publishedTime: string;
    modifiedTime?: string;
    url: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    image: data.image,
    author: {
      '@type': 'Person',
      name: data.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    datePublished: data.publishedTime,
    dateModified: data.modifiedTime ?? data.publishedTime,
    url: `${BASE_URL}${data.url}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}${data.url}`,
    },
  }),

  product: (data: {
    name: string;
    description: string;
    image: string;
    price: string;
    currency?: string;
    rating?: number;
    reviewCount?: number;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.name,
    description: data.description,
    image: data.image,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Windows, Web',
    offers: {
      '@type': 'Offer',
      price: data.price,
      priceCurrency: data.currency ?? 'NPR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2027-12-31',
    },
    aggregateRating: data.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: data.rating.toString(),
          reviewCount: data.reviewCount?.toString() ?? '1',
          bestRating: '5',
        }
      : undefined,
  }),

  event: (data: {
    name: string;
    description: string;
    startDate: string;
    endDate?: string;
    location: string;
    url: string;
    image?: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: data.name,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: data.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressCountry: 'NP',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
    url: `${BASE_URL}${data.url}`,
    image: data.image ?? DEFAULT_OG_IMAGE,
  }),

  course: (data: {
    name: string;
    description: string;
    url: string;
    provider?: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: data.name,
    description: data.description,
    url: `${BASE_URL}${data.url}`,
    provider: {
      '@type': 'Organization',
      name: data.provider ?? SITE_NAME,
    },
  }),

  review: (data: {
    name: string;
    reviewBody: string;
    ratingValue: number;
    author: string;
    itemName: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: data.name,
    reviewBody: data.reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: data.ratingValue.toString(),
      bestRating: '5',
    },
    author: {
      '@type': 'Person',
      name: data.author,
    },
    itemReviewed: {
      '@type': 'SoftwareApplication',
      name: data.itemName,
    },
  }),
};
