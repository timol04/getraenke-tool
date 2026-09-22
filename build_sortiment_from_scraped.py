import json
import re

with open('scraped_raw.json', 'r', encoding='utf-8') as f:
    categories_raw = json.load(f)

# Map raw subcategories into 4 main requested categories:
# 1. Mineralwasser (Oben links)
# 2. Süssgetränke (Oben rechts)
# 3. Biere (Unten links)
# 4. Weine (Unten rechts)

target_categories = [
    {"name": "Mineralwasser", "source_names": ["Mineralwasser"], "items": []},
    {"name": "Süssgetränke", "source_names": ["Softdrinks", "Energy Drinks", "Fruchtsäfte & Obstsäfte"], "items": []},
    {"name": "Biere", "source_names": ["Bier", "Bier alkoholfrei"], "items": []},
    {"name": "Weine", "source_names": ["Wein"], "items": []},
]

raw_map = {cat['name']: cat['raw_items'] for cat in categories_raw}

for target_cat in target_categories:
    items = []
    seen_arts = set()

    for src_name in target_cat["source_names"]:
        raw_items = raw_map.get(src_name, [])

        for raw_item in raw_items:
            art = raw_item['art']
            if art in seen_arts:
                continue
            seen_arts.add(art)

            lines = [line.strip() for line in raw_item['raw'].split('\n') if line.strip()]
            
            name = ""
            stk_price = None
            
            for line in lines:
                if '/Stück' in line or '/Fl.' in line or '/Dose' in line:
                    m = re.search(r'([0-9]+\.[0-9]+)', line)
                    if m:
                        stk_price = float(m.group(1))
                elif not line.startswith('Art.Nr') and not line.startswith('Top Angebot') and not line.startswith('nur solange') and not line.startswith('Alkoholfrei') and not line.startswith('Regional') and not line.startswith('zéro') and not line.startswith('Kalorienarm') and not '/' in line:
                    if len(line) > len(name):
                        name = line

            if not name:
                href_seg = raw_item['href'].split('/')[-1].split('_')[0]
                name = href_seg.replace('-', ' ').title()

            case_size = None
            pack_match = re.search(r'([0-9]+)\s*[×x]\s*[0-9]+', name, re.IGNORECASE)
            if pack_match:
                case_size = int(pack_match.group(1))

            price = 0.0
            if stk_price and case_size:
                price = round(stk_price * case_size, 2)
            elif stk_price:
                price = stk_price
            else:
                num_matches = re.findall(r'([0-9]+\.[0-9]{2})', raw_item['raw'])
                if num_matches:
                    price = float(num_matches[0])
                else:
                    price = 2.50

            item_obj = {
                "art": art,
                "name": name,
                "price": price
            }
            if case_size:
                item_obj["caseSize"] = case_size
                
            items.append(item_obj)

    target_cat["items"] = items

final_categories = [
    {"name": cat["name"], "items": cat["items"]}
    for cat in target_categories if cat["items"]
]

# Format JS output
js_lines = [
    "/**",
    " * ====================================================================",
    " * LANDI GETRÄNKE-SORTIMENT (Automatisch von Landi.ch importiert)",
    " * ====================================================================",
    " */",
    "",
    "const CATEGORIES = " + json.dumps(final_categories, indent=2, ensure_ascii=False) + ";\n"
]

with open('sortiment.js', 'w', encoding='utf-8') as f:
    f.write("\n".join(js_lines))

print(f"Successfully generated sortiment.js with {len(final_categories)} categories!")

