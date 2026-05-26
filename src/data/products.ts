export interface Product {
  id: string;
  name: string;
  tagline: string;
  edition: 'Blue' | 'Saffron' | 'Emerald';
  prices: {
    single: string;
    multi: string;
  };
  features: string[];
  image: string;
  description: string;
}

/** Canonical Busy editions shown on /products and home pricing */
export const PRODUCT_IDS = ['busy-basic', 'busy-standard', 'busy-enterprise'] as const;

export const products: Product[] = [
  {
    id: 'busy-basic',
    name: 'BUSY Basic',
    tagline: 'Small & Medium Business',
    edition: 'Blue',
    prices: {
      single: 'NRS 10,000',
      multi: 'NRS 15,000',
    },
    features: [
      'Multi-Company Accounting',
      'Multi-Location Inventory',
      'Sales / Purchase Order Processing',
      'Voucher Numbering & Cancellation',
      'MIS Reports (Cash Flow, Profitability, etc.)',
      'Stock Ageing & Valuation',
      'GST / VAT Compliant',
    ],
    image: '/image/busy_basic.svg',
    description:
      'Ideal for small businesses needing reliable accounting and inventory management. The Blue Edition provides all essential tools to digitize your financial records.',
  },
  {
    id: 'busy-standard',
    name: 'BUSY Standard',
    tagline: 'Medium & Semi Large Business',
    edition: 'Saffron',
    prices: {
      single: 'NRS 18,000',
      multi: 'NRS 26,000',
    },
    features: [
      'All Basic Edition Features',
      'MSSQL Support (Saffron Count)',
      'Advanced Inventory Management',
      'Columnar Inventory Registers',
      'Production / Bill of Material',
      'Sales / Purchase Quotations',
      'Direct SMS / Email from Software',
    ],
    image: '/image/busy_standard.svg',
    description:
      'Designed for growing businesses that require advanced inventory control and manufacturing capabilities. The Saffron Edition offers powerful database support and reporting.',
  },
  {
    id: 'busy-enterprise',
    name: 'BUSY Enterprise',
    tagline: 'Large Manufacturing Business',
    edition: 'Emerald',
    prices: {
      single: 'NRS 22,000',
      multi: 'NRS 55,000',
    },
    features: [
      'All Standard Edition Features',
      'Specialized Manufacturing Reports',
      'Payroll Management',
      'Customer Relationship Management (CRM)',
      'Multi-Branch Data Synchronization',
      'User-definable Reports',
      'Voucher / Master Approval System',
    ],
    image: '/image/busy_enterprise.svg',
    description:
      'The ultimate solution for large enterprises and manufacturing units. The Emerald Edition includes high-end features like payroll, CRM, and multi-branch syncing.',
  },
];

const PRODUCT_ORDER: Record<string, number> = {
  'busy-basic': 0,
  'busy-standard': 1,
  'busy-enterprise': 2,
};

export function filterCatalogProducts<T extends { id: string }>(list: T[]): T[] {
  const allowed = new Set<string>(PRODUCT_IDS);
  return list
    .filter((p) => allowed.has(p.id))
    .sort((a, b) => (PRODUCT_ORDER[a.id] ?? 99) - (PRODUCT_ORDER[b.id] ?? 99));
}

export function getCatalogProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Merge Supabase rows onto defaults so UI always has all 3 editions */
export function mergeCatalogWithDb(dbRows: Product[] | null | undefined): Product[] {
  const byId = new Map((dbRows ?? []).map((p) => [p.id, p]));
  return products.map((def) => {
    const row = byId.get(def.id);
    if (!row) return def;
    return {
      ...def,
      ...row,
      prices: row.prices?.single || row.prices?.multi ? row.prices : def.prices,
      features: row.features?.length ? row.features : def.features,
    };
  });
}
