-- ==============================================================================
-- LANDI GETRÄNKE-TOOL: SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
-- Anleitung:
-- 1. Öffne dein Supabase Dashboard: https://supabase.com/dashboard/project/jjcbuhwkaghsrsoibmdy
-- 2. Klicke links im Menü auf "SQL Editor" -> "New Query"
-- 3. Füge dieses Skript ein und klicke auf "Run" (unten rechts)
-- ==============================================================================

-- 0. Sicherstellen, dass die Tabellen existieren und das public Schema zugänglich ist
GRANT ALL ON SCHEMA public TO postgres, anon, authenticated, service_role;

-- (Die orders-Tabelle erstellen, falls noch nicht vorhanden)
CREATE TABLE IF NOT EXISTS public.orders (
  id bigint generated always as identity primary key,
  ref_nr text generated always as (lpad(id::text, 6, '0')) stored,
  items jsonb not null,
  total_amount numeric not null,
  total_deposit numeric default 0,
  returns jsonb default '[]'::jsonb,
  refund_amount numeric default 0,
  status text default 'offen',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 1. RLS (Row Level Security) für alle Tabellen aktivieren
ALTER TABLE IF EXISTS categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS products ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS presets ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS festmaterial ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS feedbacks ENABLE ROW LEVEL SECURITY;

-- 2. Alte / bestehende Policies bereinigen (verhindert Duplikate / Konflikte)
DROP POLICY IF EXISTS "Public categories read access" ON categories;
DROP POLICY IF EXISTS "Admin categories write access" ON categories;
DROP POLICY IF EXISTS "Public products read access" ON products;
DROP POLICY IF EXISTS "Admin products write access" ON products;
DROP POLICY IF EXISTS "Public presets read access" ON presets;
DROP POLICY IF EXISTS "Admin presets write access" ON presets;

DROP POLICY IF EXISTS "Public festmaterial read access" ON festmaterial;
DROP POLICY IF EXISTS "Admin festmaterial write access" ON festmaterial;
DROP POLICY IF EXISTS "Admin feedbacks read access" ON feedbacks;
DROP POLICY IF EXISTS "Public feedbacks insert access" ON feedbacks;
DROP POLICY IF EXISTS "Admin feedbacks write access" ON feedbacks;

DROP POLICY IF EXISTS "Anon can create order" ON orders;
DROP POLICY IF EXISTS "Anon can read own ref" ON orders;
DROP POLICY IF EXISTS "Admins full access" ON orders;

-- 3. ÖFFENTLICHER LESEZUGRIFF (SELECT):
CREATE POLICY "Public categories read access"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public products read access"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public presets read access"
  ON presets FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public festmaterial read access"
  ON festmaterial FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin feedbacks read access"
  ON feedbacks FOR SELECT
  TO authenticated
  USING (true);

-- 4. ORDERS: RPC-FUNKTION FÜR SICHERES SPEICHERN
-- Ersetzt das unsichere INSERT/SELECT für anonyme Benutzer.
-- Anonyme Benutzer dürfen die orders-Tabelle nicht direkt lesen oder beschreiben!
create or replace function submit_order(
  p_items jsonb, 
  p_total numeric, 
  p_deposit numeric
)
returns text
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_ref text;
begin
  insert into orders (items, total_amount, total_deposit)
  values (p_items, p_total, p_deposit)
  returning ref_nr into v_ref;

  return v_ref;
end;
$$;

-- Ausführungsrecht an anonyme Nutzer erteilen
grant execute on function submit_order(jsonb, numeric, numeric) to anon, authenticated;

-- 5. SCHREIBZUGRIFF (INSERT, UPDATE, DELETE):
-- Nur authentifizierte Benutzer (dein Admin-Account) dürfen Daten (inkl. Retouren) ändern
CREATE POLICY "Admin categories write access"
  ON categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin products write access"
  ON products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin presets write access"
  ON presets FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin festmaterial write access"
  ON festmaterial FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public feedbacks insert access"
  ON feedbacks FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admin feedbacks write access"
  ON feedbacks FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admins dürfen bei Bestellungen alles (Retouren speichern, löschen etc.)
CREATE POLICY "Admins full access"
  ON orders FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ==============================================================================
-- FERTIG: Die Datenbank ist nun abgesichert.
-- Anonyme Besucher können das Sortiment lesen und neue Bestellungen anlegen.
-- Schreibvorgänge (Produkte ändern, Retouren buchen) erfordern den Supabase-Login.
-- ==============================================================================
