-- Add new footer links to site_content (Pricing, Cloud, Training pages)
-- Run this in Supabase SQL Editor

UPDATE site_content 
SET content = jsonb_set(
  COALESCE(content, '{}'::jsonb),
  '{footer,solutionsLinks}',
  '[
    {"label": "Busy Products & Features", "path": "/products"},
    {"label": "Busy Software Pricing", "path": "/busy-software-price-nepal"},
    {"label": "Busy on Cloud", "path": "/busy-on-cloud"},
    {"label": "Training Programs", "path": "/training"},
    {"label": "Awards", "path": "/awards"}
  ]'::jsonb
)
WHERE id = 'home';

UPDATE site_content 
SET content = jsonb_set(
  COALESCE(content, '{}'::jsonb),
  '{footer,companyLinks}',
  '[
    {"label": "About Us", "path": "/about"},
    {"label": "Blog", "path": "/blog"},
    {"label": "Support", "path": "/support"},
    {"label": "Contact Us", "path": "/contact"}
  ]'::jsonb
)
WHERE id = 'home';
