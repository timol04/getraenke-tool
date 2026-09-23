import csv
import json
import re

def parse_case_size(name):
    match = re.search(r'(\d+)\s*[x×X]\s*\d+', name)
    if match:
        return int(match.group(1))
    return None

def parse_unit(name, subkat):
    name_l = name.lower()
    if 'dose' in name_l:
        return 'dose'
    if 'bag-in-box' in name_l or 'bag-in-box' in subkat.lower():
        return 'stk'
    return 'flasche'

with open('landi_getränke_sortiment23.9.26.xlsx - Sortiment.csv', 'r', encoding='utf-8-sig') as f:
    rows = list(csv.DictReader(f))

# Category Mapping
cat_name_map = {
    'Mineralwasser': 'Mineralwasser',
    'Süssgetränke': 'Süssgetränke',
    'Mate/Energy': 'Energy Drinks/Mate',
    'Bier': 'Biere',
    'Wein': 'Weine'
}

top_items = []
categories_map = {
    'Top-Angebote': [],
    'Mineralwasser': [],
    'Süssgetränke': [],
    'Energy Drinks/Mate': [],
    'Biere': [],
    'Weine': []
}

for r in rows:
    art = r['Art.-Nr.'].strip()
    name = r['Name des Produkts'].strip()
    gebinde = r['Gebinde'].strip()
    raw_kat = r['Kategorie'].strip()
    top = r['Top-Angebot'].strip().upper() == 'TRUE'
    subkat = r['Unterkategorie'].strip()
    pe_str = r['Preis Einzeln(CHF)'].strip().replace(',', '.')
    pp_str = r['Preis Pack (CHF)'].strip().replace(',', '.')
    
    pe = float(pe_str) if pe_str else None
    pp = float(pp_str) if pp_str else None
    
    cs = parse_case_size(name)
    unit = parse_unit(name, subkat)
    
    case_only = (gebinde == 'Pack')
    allow_single = (gebinde in ['Einzeln', 'Einzeln & Pack'])
    
    main_price = pp if pp is not None else pe
    
    item_obj = {
        "art": art,
        "name": name,
        "price": main_price,
        "gebinde": gebinde,
        "unit": unit
    }
    
    if pe is not None:
        item_obj["priceSingle"] = pe
    if pp is not None:
        item_obj["pricePack"] = pp
        
    if cs:
        item_obj["caseSize"] = cs
        
    if case_only:
        item_obj["caseOnly"] = True
        item_obj["allowSingleBottle"] = False
    else:
        item_obj["allowSingleBottle"] = allow_single
        
    if top:
        item_obj["topAngebot"] = True
        # Also add a copy for Top-Angebote category
        top_item = dict(item_obj)
        top_item["deal"] = True
        categories_map['Top-Angebote'].append(top_item)

    dest_cat = cat_name_map.get(raw_kat, raw_kat)
    if dest_cat == 'Weine' and not re.search(r'Bag-in-Box|3\s*l|5\s*l', name, re.IGNORECASE):
        if not cs:
            cs = 6
            item_obj["caseSize"] = cs
        if gebinde in ['', 'Einzeln']:
            gebinde = 'Einzeln & Pack'
            item_obj["gebinde"] = gebinde
            item_obj["allowSingleBottle"] = True
            item_obj["caseOnly"] = False
        if pe is not None and pp is None:
            item_obj["pricePack"] = round(pe * cs, 2)
            item_obj["price"] = item_obj["pricePack"]

    if dest_cat in categories_map:
        categories_map[dest_cat].append(item_obj)

formatted_categories = [
    {"name": cat_name, "items": items}
    for cat_name, items in categories_map.items()
]

header_comment = """/**
 * ====================================================================
 * LANDI GETRÄNKE-SORTIMENT (Stand 23.9.2026 - Quelle: landi_getränke_sortiment23.9.26.xlsx)
 * ====================================================================
 */

"""

js_content = header_comment + "const CATEGORIES = " + json.dumps(formatted_categories, indent=2, ensure_ascii=False) + ";\n"

with open('sortiment.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Successfully generated sortiment.js with {len(rows)} products across {len(formatted_categories)} categories!")
