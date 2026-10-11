-- ==============================================================================
-- LANDI GETRÄNKE-TOOL: SICHERHEIT (ROLLEN + ROW LEVEL SECURITY)
-- ==============================================================================
-- Ersetzt die Policies aus supabase_rls_setup.sql, supabase_schema.sql und
-- supabase_orders_schema.sql. Kann beliebig oft ausgeführt werden.
--
-- Anleitung:
-- 1. Supabase Dashboard -> "SQL Editor" -> "New Query"
-- 2. Unten bei "ADMIN-KONTEN" die E-Mail des normalen Admins eintragen
-- 3. Ganzes Skript einfügen und "Run" klicken
--
-- Rollenmodell (wie bisher im Browser, jetzt zusätzlich in der Datenbank):
--   super_admin  = Voll-Admin
--   viewer       = normaler Admin (Sortiment, Festmaterial, Bestellungen,
--                  Retouren wie bisher; darf aber keine Notizen löschen)
-- Supabase-Konten, die NICHT in admin_users stehen, haben keinerlei Admin-Rechte
-- (auch wenn sie sich irgendwie registriert haben).
-- ==============================================================================


-- ------------------------------------------------------------------------------
-- 1. ADMIN-TABELLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id    uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email      text,
  role       text NOT NULL CHECK (role IN ('super_admin', 'viewer')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Niemand darf die Tabelle über die API lesen oder ändern (nur über den SQL-Editor).
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.admin_users FROM anon, authenticated;


-- ------------------------------------------------------------------------------
-- 2. ADMIN-KONTEN EINTRAGEN
-- ------------------------------------------------------------------------------
-- Die Konten müssen in Supabase unter "Authentication -> Users" bereits existieren.

-- Voll-Admin
INSERT INTO public.admin_users (user_id, email, role)
SELECT id, email, 'super_admin' FROM auth.users
WHERE lower(email) = lower('timo.lanter@icloud.com')
ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role, email = EXCLUDED.email;

-- Normaler Admin: E-Mail hier eintragen
INSERT INTO public.admin_users (user_id, email, role)
SELECT id, email, 'viewer' FROM auth.users
WHERE lower(email) = lower('NORMALER-ADMIN@BEISPIEL.CH')
ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role, email = EXCLUDED.email;


-- ------------------------------------------------------------------------------
-- 3. HILFSFUNKTIONEN FÜR DIE POLICIES
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.current_admin_role()
RETURNS text
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT role FROM public.admin_users WHERE user_id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid());
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid() AND role = 'super_admin');
$$;

REVOKE EXECUTE ON FUNCTION public.current_admin_role() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_admin()           FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_super_admin()     FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.current_admin_role() TO authenticated;
GRANT  EXECUTE ON FUNCTION public.is_admin()           TO authenticated;
GRANT  EXECUTE ON FUNCTION public.is_super_admin()     TO authenticated;


-- ------------------------------------------------------------------------------
-- 4. SCHEMA-RECHTE ZURÜCKSETZEN (alte Skripte gaben "GRANT ALL ... TO public")
-- ------------------------------------------------------------------------------
REVOKE CREATE ON SCHEMA public FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA public TO anon, authenticated;


-- ------------------------------------------------------------------------------
-- 5. ALLE BESTEHENDEN POLICIES LÖSCHEN (egal unter welchem Namen angelegt)
-- ------------------------------------------------------------------------------
DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN
    SELECT tablename, policyname FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('categories', 'products', 'presets', 'festmaterial', 'orders', 'feedbacks')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, pol.tablename);
  END LOOP;
END $$;

ALTER TABLE public.categories   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.presets      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.festmaterial ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedbacks    ENABLE ROW LEVEL SECURITY;

-- Zusätzliche Absicherung: anonyme Besucher dürfen nirgends direkt schreiben
-- und Bestellungen nicht lesen (Bestellen läuft über submit_order).
REVOKE INSERT, UPDATE, DELETE ON public.categories, public.products, public.presets, public.festmaterial FROM anon;
REVOKE ALL ON public.orders FROM anon;
REVOKE UPDATE, DELETE ON public.feedbacks FROM anon;


-- ------------------------------------------------------------------------------
-- 6. NEUE POLICIES
-- ------------------------------------------------------------------------------

-- Sortiment: alle dürfen lesen, nur eingetragene Admins schreiben
CREATE POLICY "Public read" ON public.categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin write" ON public.categories FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Public read" ON public.products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin write" ON public.products FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Public read" ON public.presets FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin write" ON public.presets FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Public read" ON public.festmaterial FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin write" ON public.festmaterial FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Bestellungen: nur Admins (lesen, Status, Retouren, löschen)
CREATE POLICY "Admin all" ON public.orders FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Notizen/Feedback: alle dürfen senden, Admins lesen, nur Voll-Admin löscht
CREATE POLICY "Public insert" ON public.feedbacks FOR INSERT TO anon, authenticated
  WITH CHECK (char_length(coalesce(name, '')) <= 200 AND char_length(coalesce(message, '')) <= 5000);
CREATE POLICY "Admin read" ON public.feedbacks FOR SELECT TO authenticated
  USING (public.is_admin());
CREATE POLICY "Admin update" ON public.feedbacks FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Super admin delete" ON public.feedbacks FOR DELETE TO authenticated
  USING (public.is_super_admin());


-- ------------------------------------------------------------------------------
-- 7. BESTELLUNG SPEICHERN (RPC) MIT EINGABEPRÜFUNG
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.submit_order(
  p_items jsonb,
  p_total numeric,
  p_deposit numeric
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_ref text;
BEGIN
  IF p_items IS NULL OR jsonb_typeof(p_items) <> 'array' THEN
    RAISE EXCEPTION 'Ungültige Bestellpositionen';
  END IF;
  IF jsonb_array_length(p_items) > 500 OR octet_length(p_items::text) > 500000 THEN
    RAISE EXCEPTION 'Bestellung zu gross';
  END IF;
  IF EXISTS (SELECT 1 FROM jsonb_array_elements(p_items) e WHERE jsonb_typeof(e) <> 'object') THEN
    RAISE EXCEPTION 'Ungültige Bestellposition';
  END IF;
  IF p_total IS NULL OR p_total < 0 OR p_total > 1000000 THEN
    RAISE EXCEPTION 'Ungültiger Betrag';
  END IF;
  IF coalesce(p_deposit, 0) < 0 OR coalesce(p_deposit, 0) > 1000000 THEN
    RAISE EXCEPTION 'Ungültiges Depot';
  END IF;

  INSERT INTO orders (items, total_amount, total_deposit)
  VALUES (p_items, p_total, coalesce(p_deposit, 0))
  RETURNING ref_nr INTO v_ref;

  RETURN v_ref;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.submit_order(jsonb, numeric, numeric) FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION public.submit_order(jsonb, numeric, numeric) TO anon, authenticated;


-- ------------------------------------------------------------------------------
-- 8. KONTROLLE: Diese Liste muss genau deine zwei Admin-Konten zeigen.
-- ------------------------------------------------------------------------------
SELECT email, role FROM public.admin_users ORDER BY role, email;
