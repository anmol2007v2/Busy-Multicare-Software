-- Seed default Busy products (matches src/data/products.ts / live site)
INSERT INTO products (id, name, tagline, edition, prices, features, image, description)
VALUES
  (
    'busy-basic',
    'BUSY Basic',
    'Small & Medium Business',
    'Blue',
    '{"single": "NRS 10,000", "multi": "NRS 15,000"}'::jsonb,
    ARRAY[
      'Multi-Company Accounting',
      'Multi-Location Inventory',
      'Sales / Purchase Order Processing',
      'Voucher Numbering & Cancellation',
      'MIS Reports (Cash Flow, Profitability, etc.)',
      'Stock Ageing & Valuation',
      'GST / VAT Compliant'
    ],
    '/image/busy_basic.svg',
    'Ideal for small businesses needing reliable accounting and inventory management. The Blue Edition provides all essential tools to digitize your financial records.'
  ),
  (
    'busy-standard',
    'BUSY Standard',
    'Medium & Semi Large Business',
    'Saffron',
    '{"single": "NRS 18,000", "multi": "NRS 26,000"}'::jsonb,
    ARRAY[
      'All Basic Edition Features',
      'MSSQL Support (Saffron Count)',
      'Advanced Inventory Management',
      'Columnar Inventory Registers',
      'Production / Bill of Material',
      'Sales / Purchase Quotations',
      'Direct SMS / Email from Software'
    ],
    '/image/busy_standard.svg',
    'Designed for growing businesses that require advanced inventory control and manufacturing capabilities. The Saffron Edition offers powerful database support and reporting.'
  ),
  (
    'busy-enterprise',
    'BUSY Enterprise',
    'Large Manufacturing Business',
    'Emerald',
    '{"single": "NRS 22,000", "multi": "NRS 55,000"}'::jsonb,
    ARRAY[
      'All Standard Edition Features',
      'Specialized Manufacturing Reports',
      'Payroll Management',
      'Customer Relationship Management (CRM)',
      'Multi-Branch Data Synchronization',
      'User-definable Reports',
      'Voucher / Master Approval System'
    ],
    '/image/busy_enterprise.svg',
    'The ultimate solution for large enterprises and manufacturing units. The Emerald Edition includes high-end features like payroll, CRM, and multi-branch syncing.'
  )
ON CONFLICT (id) DO NOTHING;
