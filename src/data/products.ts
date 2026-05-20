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

export const products: Product[] = [
  {
    id: 'busy-basic',
    name: 'BUSY Basic',
    tagline: 'Small & Medium Business',
    edition: 'Blue',
    prices: {
      single: 'NRS 10,000',
      multi: 'NRS 15,000'
    },
    features: [
      'Multi-Company Accounting',
      'Multi-Location Inventory',
      'Sales / Purchase Order Processing',
      'Voucher Numbering & Cancellation',
      'MIS Reports (Cash Flow, Profitability, etc.)',
      'Stock Ageing & Valuation',
      'GST / VAT Compliant'
    ],
    image: '/image/busy_basic.svg',
    description: 'Ideal for small businesses needing reliable accounting and inventory management. The Blue Edition provides all essential tools to digitize your financial records.'
  },
  {
    id: 'busy-standard',
    name: 'BUSY Standard',
    tagline: 'Medium & Semi Large Business',
    edition: 'Saffron',
    prices: {
      single: 'NRS 18,000',
      multi: 'NRS 26,000'
    },
    features: [
      'All Basic Edition Features',
      'MSSQL Support (Saffron Count)',
      'Advanced Inventory Management',
      'Columnar Inventory Registers',
      'Production / Bill of Material',
      'Sales / Purchase Quotations',
      'Direct SMS / Email from Software'
    ],
    image: '/image/busy_standard.svg',
    description: 'Designed for growing businesses that require advanced inventory control and manufacturing capabilities. The Saffron Edition offers powerful database support and reporting.'
  },
  {
    id: 'busy-enterprise',
    name: 'BUSY Enterprise',
    tagline: 'Large Manufacturing Business',
    edition: 'Emerald',
    prices: {
      single: 'NRS 22,000',
      multi: 'NRS 55,000'
    },
    features: [
      'All Standard Edition Features',
      'Specialized Manufacturing Reports',
      'Payroll Management',
      'Customer Relationship Management (CRM)',
      'Multi-Branch Data Synchronization',
      'User-definable Reports',
      'Voucher / Master Approval System'
    ],
    image: '/image/busy_enterprise.svg',
    description: 'The ultimate solution for large enterprises and manufacturing units. The Emerald Edition includes high-end features like payroll, CRM, and multi-branch syncing.'
  }
];
