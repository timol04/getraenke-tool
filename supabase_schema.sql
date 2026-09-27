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

-- ==============================================================================
-- 5. FESTMATERIAL & MIETMOBILIAR TABELLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS festmaterial (
  id TEXT PRIMARY KEY,
  art TEXT DEFAULT '',
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Mietmobiliar' oder 'Einweggeschirr'
  unit_desc TEXT DEFAULT '',
  price NUMERIC(10, 2) DEFAULT 0,
  price_notice TEXT DEFAULT 'Preis auf Anfrage',
  disabled BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Falls Tabelle bereits existiert: Spalten sicherstellen
ALTER TABLE festmaterial ADD COLUMN IF NOT EXISTS art TEXT DEFAULT '';
ALTER TABLE festmaterial ADD COLUMN IF NOT EXISTS price NUMERIC(10, 2) DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_festmaterial_art ON festmaterial(art);
CREATE INDEX IF NOT EXISTS idx_festmaterial_cat ON festmaterial(category);
CREATE INDEX IF NOT EXISTS idx_festmaterial_disabled ON festmaterial(disabled);

ALTER TABLE festmaterial ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view festmaterial" ON festmaterial;
CREATE POLICY "Public can view festmaterial" ON festmaterial
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all for festmaterial" ON festmaterial;
CREATE POLICY "Allow all for festmaterial" ON festmaterial
  FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP TRIGGER IF EXISTS trg_festmaterial_updated_at ON festmaterial;
CREATE TRIGGER trg_festmaterial_updated_at
  BEFORE UPDATE ON festmaterial
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Initialer Datenbestand für Festmaterial & Einweggeschirr
INSERT INTO festmaterial (id, art, name, category, unit_desc, price, price_notice, disabled, sort_order)
VALUES
  ('fest-garnitur', '91001', 'Festtisch-Garnitur', 'Mietmobiliar', '1 Tisch + 2 Bänke (220 x 60 cm)', 0, 'Preis auf Anfrage / nach Vereinbarung', false, 1),
  ('fest-kuehlschrank', '91002', 'Event-Flaschenkühlschrank (Glasfront)', 'Mietmobiliar', 'Grosser Event-Kühlschrank (230V)', 0, 'Preis auf Anfrage / nach Vereinbarung', false, 2),
  ('geschirr-gabeln', '92001', 'Einweg-Gabeln', 'Einweggeschirr', 'Pack à 50 Stk.', 3.50, '', false, 3),
  ('geschirr-messer', '92002', 'Einweg-Messer', 'Einweggeschirr', 'Pack à 50 Stk.', 3.50, '', false, 4),
  ('geschirr-trinkbecher', '92003', 'Trinkbecher (Bier/Softdrinks)', 'Einweggeschirr', 'Pack à 50 Stk. (Ausschank 3dl / 4dl)', 6.90, '', false, 5),
  ('geschirr-weinbecher', '92004', 'Weinbecher / Apérobecher', 'Einweggeschirr', 'Pack à 25 Stk. (Glasklar)', 5.50, '', false, 6)
ON CONFLICT (id) DO UPDATE SET
  art = EXCLUDED.art,
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  unit_desc = EXCLUDED.unit_desc,
  price = EXCLUDED.price,
  price_notice = EXCLUDED.price_notice,
  disabled = EXCLUDED.disabled,
  sort_order = EXCLUDED.sort_order;


