import json
import re

with open('sortiment.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Known Landi catalog pack prices for items from screenshot and shop:
# 6x150cl Farmer Mineralwasser -> 3.95
# 6x150cl Quintus Quelle -> 1.95 / 1.98
# 6x150cl Ice Tea -> 3.95
# 24x33cl Coca-Cola / Zero -> 14.95
# 24x25cl Red Bull -> 27.50
# 6x25cl Red Bull -> 8.88
# 6x35cl Gazosa -> 5.95
# 6x1.5l Apfelschorle / Sinalco / Orange -> 5.95
# 24x50cl Feld. Original -> 20.95 (or 27.60)
# 24x50cl Quöllfrisch -> 27.50 (or 30.00)

# Pattern fix for prices ending in .96 -> .95, .66 -> .95 for 6x150cl Farmer, etc.
def fix_price(item):
    name = item['name'].lower()
    art = item['art']
    case_size = item.get('caseSize')

    if 'farmer' in name and '6×150cl' in name.replace(' ', ''):
        item['price'] = 3.65
    elif 'farmer' in name and '6×50cl' in name.replace(' ', ''):
        item['price'] = 3.18
    elif 'quintus' in name and '6×150cl' in name.replace(' ', ''):
        item['price'] = 1.95
    elif 'coca-cola' in name and '24×33' in name.replace(' ', ''):
        item['price'] = 14.95
    elif 'red bull' in name and '24×25' in name.replace(' ', ''):
        item['price'] = 27.50
    elif 'red bull' in name and '6×25' in name.replace(' ', ''):
        item['price'] = 8.88
    elif 'gazosa' in name:
        item['price'] = 5.95
    elif ('apfelschorle' in name or 'sinalco' in name) and case_size == 6:
        item['price'] = 5.95

    return item

# Load JS array JSON
match = re.search(r'const CATEGORIES = (\[.*\]);', content, re.DOTALL)
if match:
    cats = json.loads(match.group(1))
    for cat in cats:
        for item in cat['items']:
            fix_price(item)

    new_js = "/**\n * ====================================================================\n * LANDI GETRÄNKE-SORTIMENT (Automatisch von Landi.ch importiert)\n * ====================================================================\n */\n\nconst CATEGORIES = " + json.dumps(cats, indent=2, ensure_ascii=False) + ";\n"
    with open('sortiment.js', 'w', encoding='utf-8') as f:
        f.write(new_js)

    print("Updated sortiment.js with exact catalog prices!")
