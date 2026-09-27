-- Stelle sicher, dass der postgres-Benutzer Rechte auf das public-Schema hat
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

create table if not exists public.orders (
  id bigint generated always as identity primary key,
  ref_nr text generated always as (lpad(id::text, 6, '0')) stored,
  items jsonb not null,               -- Snapshot: [{name, qty, unit_price, is_pack, deposit_unit, ...}]
  total_amount numeric not null,       -- Ursprünglicher Gesamtbetrag (exkl. Mietmobiliar)
  total_deposit numeric default 0,    -- Harassendepot gesamt
  returns jsonb default '[]'::jsonb,  -- Retournierte Mengen: [{name, returned_qty, refund_value}]
  refund_amount numeric default 0,    -- Gutschriftbetrag (Warenwert + Depot)
  status text default 'offen',        -- 'offen', 'teilretourniert', 'abgeschlossen'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.orders enable row level security;

-- Kunden (anon) dürfen neue Bestellungen anlegen und ihre generierte ref_nr zurückerhalten:
create policy "Anon can create order" on public.orders for insert to anon with check (true);
create policy "Anon can read own ref" on public.orders for select to anon using (true);

-- Authentifizierte Admins haben vollen Zugriff (Lesen, Aktualisieren, Löschen):
create policy "Admins full access" on public.orders for all to authenticated using (true) with check (true);
