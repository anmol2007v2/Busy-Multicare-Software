-- Fix public.site_content: grants + RLS for anon read and authenticated upsert
-- Run in Supabase SQL Editor if you see permission / RLS errors on site_content

CREATE TABLE IF NOT EXISTS public.site_content (
  id text PRIMARY KEY,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Required for Data API (anon + authenticated roles)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.site_content TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_content TO authenticated;

DROP POLICY IF EXISTS "Public read site_content" ON public.site_content;
DROP POLICY IF EXISTS "Auth write site_content" ON public.site_content;
DROP POLICY IF EXISTS "site_content_select_public" ON public.site_content;
DROP POLICY IF EXISTS "site_content_insert_authenticated" ON public.site_content;
DROP POLICY IF EXISTS "site_content_update_authenticated" ON public.site_content;
DROP POLICY IF EXISTS "site_content_delete_authenticated" ON public.site_content;

CREATE POLICY "site_content_select_public"
  ON public.site_content
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "site_content_insert_authenticated"
  ON public.site_content
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "site_content_update_authenticated"
  ON public.site_content
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "site_content_delete_authenticated"
  ON public.site_content
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

INSERT INTO public.site_content (id, content) VALUES ('home', '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.site_content (id, content) VALUES ('global', '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;
