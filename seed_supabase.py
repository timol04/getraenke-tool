#!/usr/bin/env python3
"""
Seed / Migrationsskript: Lädt das aktuelle Sortiment aus sortiment.js vollständig in Supabase hoch.

Verwendung:
  python3 seed_supabase.py
  (oder mit Parametern):
  python3 seed_supabase.py --email "admin@example.com" --password "geheim"
"""

import sys
import os
import json
import re
import argparse
import urllib.request
import urllib.error

DEFAULT_URL = "https://jjcbuhwkaghsrsoibmdy.supabase.co"
DEFAULT_KEY = "sb_publishable_jtSBM7NOu7O1vKO-huNUOg_Ju-Ewncr"

def parse_sortiment_js(js_path):
    with open(js_path, 'r', encoding='utf-8') as f:
        content = f.read()

    cat_match = re.search(r'const CATEGORIES = (\[.*?\]);\s*(?:const PRESETS|$)', content, re.DOTALL)
    if not cat_match:
        raise ValueError("Konnte CATEGORIES in sortiment.js nicht finden!")
    
    preset_match = re.search(r'const PRESETS = (\[.*?\]);', content, re.DOTALL)
    if not preset_match:
        raise ValueError("Konnte PRESETS in sortiment.js nicht finden!")

    categories = json.loads(cat_match.group(1))
    presets = json.loads(preset_match.group(1))
    return categories, presets

def login_supabase(url, apikey, email, password):
    login_url = f"{url.rstrip('/')}/auth/v1/token?grant_type=password"
    headers = {
        "apikey": apikey,
        "Content-Type": "application/json"
    }
    payload = json.dumps({"email": email, "password": password}).encode('utf-8')
    req = urllib.request.Request(login_url, data=payload, headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            return data.get("access_token")
    except urllib.error.HTTPError as e:
        err = e.read().decode('utf-8')
        print(f"❌ Login fehlgeschlagen: {e.code} - {err}")
        return None

def post_supabase(url, apikey, auth_token, endpoint, data):
    bearer = auth_token if auth_token else apikey
    headers = {
        "apikey": apikey,
        "Authorization": f"Bearer {bearer}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
    }
    req_url = f"{url.rstrip('/')}/rest/v1/{endpoint}"
    req = urllib.request.Request(req_url, data=json.dumps(data).encode('utf-8'), headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode('utf-8')
        print(f"❌ Fehler bei POST an {endpoint}: {e.code} - {err_msg}")
        raise e

def main():
    parser = argparse.ArgumentParser(description="Migrate sortiment.js to Supabase")
    parser.add_argument("--url", default=os.environ.get("SUPABASE_URL", DEFAULT_URL), help="Supabase Project URL")
    parser.add_argument("--key", default=os.environ.get("SUPABASE_KEY", DEFAULT_KEY), help="Supabase Anon oder Service Role Key")
    parser.add_argument("--email", default=os.environ.get("SUPABASE_EMAIL"), help="Supabase Admin E-Mail (für RLS)")
    parser.add_argument("--password", default=os.environ.get("SUPABASE_PASSWORD"), help="Supabase Admin Passwort")
    args = parser.parse_args()

    supabase_url = args.url.strip()
    supabase_key = args.key.strip()

    print(f"🔗 Supabase URL: {supabase_url}")

    auth_token = None
    if args.email and args.password:
        print(f"🔐 Melde Admin an ({args.email})...")
        auth_token = login_supabase(supabase_url, supabase_key, args.email, args.password)
        if not auth_token:
            print("⚠️ Konnte nicht mit E-Mail anmelden, versuche Direktzugriff...")
    elif supabase_key.startswith("sb_secret_") or "service_role" in supabase_key:
        print("🔑 Service Role Key erkannt.")
        auth_token = supabase_key

    js_file = os.path.join(os.path.dirname(__file__), 'sortiment.js')
    print(f"📖 Lese {js_file}...")
    categories_raw, presets_raw = parse_sortiment_js(js_file)

    # 1. Categories
    categories_rows = []
    cat_order = 0
    for cat in categories_raw:
        cat_name = cat.get('name')
        if not cat_name or cat_name == 'Top-Angebote':
            continue
        cat_id = cat_name.lower().replace(' ', '_').replace('ü', 'ue').replace('ä', 'ae').replace('ö', 'oe')
        categories_rows.append({
            "id": cat_id,
            "name": cat_name,
            "sort_order": cat_order
        })
        cat_order += 1

    print(f"⬆️ Lade {len(categories_rows)} Kategorien in Supabase hoch...")
    post_supabase(supabase_url, supabase_key, auth_token, "categories", categories_rows)
    print("✅ Kategorien erfolgreich synchronisiert!")

    # 2. Produkte
    products_rows = []
    seen_art = set()
    prod_order = 0

    for cat in categories_raw:
        cat_name = cat.get('name')
        if cat_name == 'Top-Angebote':
            continue
        for item in cat.get('items', []):
            art = str(item.get('art') or item.get('id') or '')
            if not art or art in seen_art:
                continue
            seen_art.add(art)

            prod_id = f"art-{art.replace(' ', '_')}"
            name = item.get('name', '')
            price = float(item.get('price') or 0.0)
            price_single = float(item.get('priceSingle')) if item.get('priceSingle') is not None else None
            price_pack = float(item.get('pricePack')) if item.get('pricePack') is not None else None
            case_size = int(item.get('caseSize') or 1)
            gebinde = item.get('gebinde') or 'Einzeln'
            unit = item.get('unit') or 'flasche'
            sub_category = item.get('subCategory') or ''
            top_angebot = bool(item.get('topAngebot') or item.get('deal'))
            deal = bool(item.get('deal'))
            case_only = bool(item.get('caseOnly'))
            allow_single = bool(item.get('allowSingleBottle', True))
            eigenmarke = bool(item.get('eigenmarke', False))
            disabled = bool(item.get('disabled', False))

            products_rows.append({
                "id": prod_id,
                "art": art,
                "name": name,
                "category": cat_name,
                "sub_category": sub_category,
                "price": price,
                "price_single": price_single,
                "price_pack": price_pack,
                "case_size": case_size,
                "gebinde": gebinde,
                "unit": unit,
                "top_angebot": top_angebot,
                "deal": deal,
                "case_only": case_only,
                "allow_single_bottle": allow_single,
                "eigenmarke": eigenmarke,
                "disabled": disabled,
                "sort_order": prod_order
            })
            prod_order += 1

    print(f"⬆️ Lade {len(products_rows)} Produkte in Chunks in Supabase hoch...")
    chunk_size = 50
    for i in range(0, len(products_rows), chunk_size):
        chunk = products_rows[i:i + chunk_size]
        post_supabase(supabase_url, supabase_key, auth_token, "products", chunk)
        print(f"  ... {min(i + chunk_size, len(products_rows))}/{len(products_rows)} Produkte übertragen")
    print("✅ Alle Produkte erfolgreich in Supabase gespeichert!")

    # 3. Presets
    presets_rows = []
    p_order = 0
    for p in presets_raw:
        presets_rows.append({
            "id": p.get('id', f"preset-{p_order}"),
            "title": p.get('title', ''),
            "description": p.get('description', ''),
            "icon": p.get('icon', '⚡'),
            "items": p.get('items', []),
            "sort_order": p_order
        })
        p_order += 1

    print(f"⬆️ Lade {len(presets_rows)} Presets (Pakete) in Supabase hoch...")
    post_supabase(supabase_url, supabase_key, auth_token, "presets", presets_rows)
    print("✅ Presets erfolgreich in Supabase gespeichert!")
    print("\n🎉 Migration erfolgreich abgeschlossen! Dein ganzes Sortiment ist jetzt in Supabase.")

if __name__ == "__main__":
    main()
