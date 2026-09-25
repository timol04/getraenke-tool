-- ==============================================================================
-- LANDI GETRÄNKE-TOOL: SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
-- Anleitung:
-- 1. Öffne dein Supabase Dashboard: https://supabase.com/dashboard/project/jjcbuhwkaghsrsoibmdy
-- 2. Klicke links im Menü auf "SQL Editor" -> "New Query"
-- 3. Füge dieses Skript ein und klicke auf "Run" (unten rechts)
-- ==============================================================================

-- 1. RLS (Row Level Security) für alle Tabellen aktivieren
ALTER TABLE IF EXISTS categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS products ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS presets ENABLE ROW LEVEL SECURITY;

-- 2. Alte / bestehende Policies bereinigen (verhindert Duplikate / Konflikte)
DROP POLICY IF EXISTS "Public categories read access" ON categories;
DROP POLICY IF EXISTS "Admin categories write access" ON categories;
DROP POLICY IF EXISTS "Public products read access" ON products;
DROP POLICY IF EXISTS "Admin products write access" ON products;
DROP POLICY IF EXISTS "Public presets read access" ON presets;
DROP POLICY IF EXISTS "Admin presets write access" ON presets;

-- 3. ÖFFENTLICHER LESEZUGRIFF (SELECT):
-- Jeder Kunde (anonym oder angemeldet) darf Sortiment, Preise und Presets lesen
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

-- 4. SCHREIBZUGRIFF (INSERT, UPDATE, DELETE):
-- Nur authentifizierte Benutzer (dein Admin-Account) dürfen Daten ändern
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

-- ==============================================================================
-- FERTIG: Die Datenbank ist nun abgesichert.
-- Anonyme Besucher können das Sortiment nur lesen.
-- Schreibvorgänge ohne gültigen Supabase-Login werden auf Datenbankebene abgewiesen.
-- ==============================================================================
