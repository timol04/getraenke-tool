import json
import re

with open('scraped_raw.json', 'r', encoding='utf-8') as f:
    categories_raw = json.load(f)

formatted_categories = []

for cat in categories_raw:
    cat_name = cat['name']
    items = []
    seen_arts = set()

    for raw_item in cat['raw_items']:
        art = raw_item['art']
        if art in seen_arts:
            continue
        seen_arts.add(art)

        lines = [line.strip() for line in raw_item['raw'].split('\n') if line.strip()]
        
        # Find product name line (usually contains Art.Nr context or bottle sizes)
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
            # Fallback to URL segment
            href_seg = raw_item['href'].split('/')[-1].split('_')[0]
            name = href_seg.replace('-', ' ').title()

        # Extract pack size / caseSize from name if present (e.g. "6 × 150 cl" or "24x33cl" or "6x100cl")
        case_size = None
        pack_match = re.search(r'([0-9]+)\s*[×x]\s*[0-9]+', name, re.IGNORECASE)
        if pack_match:
            case_size = int(pack_match.group(1))

        # Calculate package total price if stk_price and case_size exist, or default price
        price = 0.0
        if stk_price and case_size:
            price = round(stk_price * case_size, 2)
        elif stk_price:
            price = stk_price
        else:
            # Check for total price line in text like "7.93 / l" or "0.41 / l" or match numbers
            num_matches = re.findall(r'([0-9]+\.[0-9]{2})', raw_item['raw'])
            if num_matches:
                price = float(num_matches[0])
            else:
                price = 2.50 # default fallback

        item_obj = {
            "art": art,
            "name": name,
            "price": price
        }
        if case_size:
            item_obj["caseSize"] = case_size
            
        items.append(item_obj)

    if items:
        formatted_categories.append({
            "name": cat_name,
            "items": items
        })

# Format JS output
js_lines = [
    "/**",
    " * ====================================================================",
    " * LANDI GETRÄNKE-SORTIMENT (Automatisch von Landi.ch importiert)",
    " * ====================================================================",
    " */",
    "",
    "const CATEGORIES = " + json.dumps(formatted_categories, indent=2, ensure_ascii=False) + ";\n"
]

with open('sortiment.js', 'w', encoding='utf-8') as f:
    f.write("\n".join(js_lines))

print(f"Successfully generated sortiment.js with {len(formatted_categories)} categories!")
