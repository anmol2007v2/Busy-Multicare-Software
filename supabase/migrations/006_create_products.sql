-- Create products table for storing catalog pricing and details
CREATE TABLE IF NOT EXISTS products (
  id text PRIMARY KEY,
  name text NOT NULL,
  tagline text,
  edition text,
  prices jsonb DEFAULT '{"single": "", "multi": ""}'::jsonb,
  features text[] DEFAULT '{}',
  image text,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Grants
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON products TO authenticated;

-- Policies
DROP POLICY IF EXISTS "products_select_public" ON products;
CREATE POLICY "products_select_public" ON products FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "products_insert_authenticated" ON products;
CREATE POLICY "products_insert_authenticated" ON products FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "products_update_authenticated" ON products;
CREATE POLICY "products_update_authenticated" ON products FOR UPDATE TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "products_delete_authenticated" ON products;
CREATE POLICY "products_delete_authenticated" ON products FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);
