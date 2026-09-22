import json
import csv
import re

cat_map = {}

with open('sortiment.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f, delimiter=';')
    for row in reader:
        cat_name = row['Kategorie'].strip()
        art = row['Artikelnummer'].strip()
        name = row['Produktname'].strip()
        price = float(row['Pack_Preis_CHF'].strip().replace(',', '.'))
        case_size = int(row['Packungsgroesse_Flaschen'].strip()) if row.get('Packungsgroesse_Flaschen') else None

        if cat_name not in cat_map:
            cat_map[cat_name] = []

        item_obj = {
            "art": art,
            "name": name,
            "price": price
        }
        if case_size and case_size > 1:
            item_obj["caseSize"] = case_size

        cat_map[cat_name].append(item_obj)

formatted_categories = [
    {"name": cat_name, "items": items}
    for cat_name, items in cat_map.items()
]

js_content = "/**\n * ====================================================================\n * LANDI GETRÄNKE-SORTIMENT (Importiert aus sortiment.csv)\n * ====================================================================\n */\n\nconst CATEGORIES = " + json.dumps(formatted_categories, indent=2, ensure_ascii=False) + ";\n"

with open('sortiment.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Successfully imported sortiment.csv into sortiment.js!")
