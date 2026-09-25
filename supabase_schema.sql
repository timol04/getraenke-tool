-- ==============================================================================
-- LANDI GETRÄNKE-TOOL: SUPABASE SCHEMA & POLICIES
-- ==============================================================================
-- Führe dieses SQL-Skript im Supabase Dashboard unter "SQL Editor" aus.
-- Es erstellt alle Tabellen für das Sortiment, Pakete und die Berechtigungen (RLS).
-- ==============================================================================

-- 1. KATEGORIEN TABELLE
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PRODUKTE TABELLE
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  art TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  sub_category TEXT DEFAULT '',
  price NUMERIC(10, 2) DEFAULT 0,
  price_single NUMERIC(10, 2),
  price_pack NUMERIC(10, 2),
  case_size INTEGER DEFAULT 1,
  gebinde TEXT DEFAULT 'Einzeln',
  unit TEXT DEFAULT 'flasche',
  top_angebot BOOLEAN DEFAULT FALSE,
  deal BOOLEAN DEFAULT FALSE,
  case_only BOOLEAN DEFAULT FALSE,
  allow_single_bottle BOOLEAN DEFAULT TRUE,
  eigenmarke BOOLEAN DEFAULT FALSE,
  disabled BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index für schnelle Abfragen nach Kategorie und Status
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_art ON products(art);
CREATE INDEX IF NOT EXISTS idx_products_disabled ON products(disabled);

-- 3. PRESETS (PAKETE) TABELLE
CREATE TABLE IF NOT EXISTS presets (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  icon TEXT DEFAULT '',
  items JSONB DEFAULT '[]'::jsonb NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) & BERECHTIGUNGEN
-- ==============================================================================
-- Jeder Besucher (Anon) darf das Sortiment ansehen (SELECT).
-- Nur angemeldete Admins (Supabase Auth / authenticated) dürfen bearbeiten/schreiben.

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE presets ENABLE ROW LEVEL SECURITY;

-- Categories Policies
DROP POLICY IF EXISTS "Public can view categories" ON categories;
CREATE POLICY "Public can view categories" ON categories
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert categories" ON categories;
CREATE POLICY "Admins can insert categories" ON categories
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can update categories" ON categories;
CREATE POLICY "Admins can update categories" ON categories
  FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins can delete categories" ON categories;
CREATE POLICY "Admins can delete categories" ON categories
  FOR DELETE TO authenticated USING (true);

-- Products Policies
DROP POLICY IF EXISTS "Public can view products" ON products;
CREATE POLICY "Public can view products" ON products
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert products" ON products;
CREATE POLICY "Admins can insert products" ON products
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can update products" ON products;
CREATE POLICY "Admins can update products" ON products
  FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins can delete products" ON products;
CREATE POLICY "Admins can delete products" ON products
  FOR DELETE TO authenticated USING (true);

-- Presets Policies
DROP POLICY IF EXISTS "Public can view presets" ON presets;
CREATE POLICY "Public can view presets" ON presets
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert presets" ON presets;
CREATE POLICY "Admins can insert presets" ON presets
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can update presets" ON presets;
CREATE POLICY "Admins can update presets" ON presets
  FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "Admins can delete presets" ON presets;
CREATE POLICY "Admins can delete presets" ON presets
  FOR DELETE TO authenticated USING (true);

-- Automatische Aktualisierung von updated_at bei Produktänderung
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_products_updated_at ON products;
CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();
