/**
 * SchemaMarkup.tsx — Site-wide structured data (JSON-LD)
 * Injects SoftwareApplication schema for Busy Accounting Software
 * rendered once at the App level so every page benefits.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL, SITE_NAME, COMPANY_NAME, PHONE_TEL, SOCIAL } from '../config/site';

const BREADCRUMB_MAP: Record<string, { name: string; position: number }[]> = {
  '/': [{ name: 'Home', position: 1 }],
  '/products': [
    { name: 'Home', position: 1 },
    { name: 'Products', position: 2 },
  ],
  '/contact': [
    { name: 'Home', position: 1 },
    { name: 'Contact', position: 2 },
  ],
  '/support': [
    { name: 'Home', position: 1 },
    { name: 'Support', position: 2 },
  ],
  '/about': [
    { name: 'Home', position: 1 },
    { name: 'About Us', position: 2 },
  ],
  '/blog': [
    { name: 'Home', position: 1 },
    { name: 'Blog', position: 2 },
  ],
  '/awards': [
    { name: 'Home', position: 1 },
    { name: 'Awards', position: 2 },
  ],
  '/privacy-policy': [
    { name: 'Home', position: 1 },
    { name: 'Privacy Policy', position: 2 },
  ],
  '/terms': [
    { name: 'Home', position: 1 },
    { name: 'Terms of Service', position: 2 },
  ],
  '/refund-policy': [
    { name: 'Home', position: 1 },
    { name: 'Refund Policy', position: 2 },
  ],
};

const SOFTWARE_APPLICATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#softwareapplication`,
  name: 'Busy Accounting Software',
  alternateName: ['Busy ERP', 'Busy POS', 'Busy Payroll'],
  description:
    'Busy Accounting Software is Nepal\'s leading accounting, ERP, POS and payroll solution. Available through authorized dealer Busy Multicare Software Pvt. Ltd. in Kathmandu.',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'AccountingApplication',
  operatingSystem: 'Windows 10, Windows 11, Windows Server',
  softwareVersion: '22',
  url: SITE_URL,
  downloadUrl: `${SITE_URL}/products`,
  featureList: [
    'GST/VAT compliant accounting',
    'Inventory management',
    'Payroll processing',
    'Multi-location support',
    'IRD-compliant billing',
    'Point of Sale (POS)',
    'Manufacturing module',
    'Bank reconciliation',
  ],
  screenshot: `${SITE_URL}/og-image.png`,
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '12000',
    highPrice: '500000',
    priceCurrency: 'NPR',
    offerCount: '3',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: COMPANY_NAME,
      url: SITE_URL,
    },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '250',
    bestRating: '5',
    worstRating: '1',
  },
  author: {
    '@type': 'Organization',
    name: 'BUSY Infotech Pvt. Ltd.',
    url: 'https://www.busy.in',
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
  inLanguage: ['en-NP', 'ne-NP'],
  keywords:
    'busy accounting software nepal, busy software nepal price, accounting software kathmandu, ERP nepal, busy dealer nepal',
};

function injectSchema(id: string, data: object) {
  const scriptId = `schema-${id}`;
  let el = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = scriptId;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function buildBreadcrumb(
  items: { name: string; position: number }[],
  pathname: string,
) {
  const segments = pathname.split('/').filter(Boolean);
  // For dynamic segments (e.g. /blog/:slug or /product/:id)
  const resolvedItems = [...items];
  if (segments.length > 1 && !BREADCRUMB_MAP[pathname]) {
    // Generic breadcrumb for dynamic pages
    const parentPath = '/' + segments[0];
    const parentLabel =
      segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
    resolvedItems.push(
      { name: 'Home', position: 1 },
      { name: parentLabel, position: 2 },
      { name: 'Detail', position: 3 },
    );
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: parentLabel,
          item: `${SITE_URL}${parentPath}`,
        },
      ],
    };
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, position }) => ({
      '@type': 'ListItem',
      position,
      name,
      item: position === 1 ? SITE_URL : `${SITE_URL}${pathname}`,
    })),
  };
}

const SchemaMarkup = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Inject site-wide SoftwareApplication schema (once)
    injectSchema('software-app', SOFTWARE_APPLICATION_SCHEMA);

    // 2. Inject per-page BreadcrumbList
    const crumbs = BREADCRUMB_MAP[pathname];
    if (crumbs) {
      injectSchema('breadcrumb', buildBreadcrumb(crumbs, pathname));
    } else if (pathname.startsWith('/blog/') || pathname.startsWith('/product/')) {
      const parentSegment = pathname.split('/')[1];
      const parentLabel = parentSegment.charAt(0).toUpperCase() + parentSegment.slice(1);
      injectSchema('breadcrumb', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: parentLabel,
            item: `${SITE_URL}/${parentSegment}`,
          },
        ],
      });
    }

    return () => {
      // Breadcrumb is per-page so clean it up on route change
      const el = document.getElementById('schema-breadcrumb');
      if (el) el.remove();
    };
  }, [pathname]);

  return null;
};

export default SchemaMarkup;
