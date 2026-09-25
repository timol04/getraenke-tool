import json
import csv
import re

with open('sortiment.js', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'const CATEGORIES = (\[.*?\]);\s*(?:const PRESETS|$)', content, re.DOTALL)
if not match:
    print("Could not parse CATEGORIES from sortiment.js")
    exit(1)

categories = json.loads(match.group(1))

fieldnames = [
    'Art.-Nr.',
    'Name des Produkts',
    'Gebinde',
    'Kategorie',
    'Top-Angebot',
    'Unterkategorie',
    'Preis Einzeln (CHF)',
    'Preis Pack (CHF)',
    'Eigenmarke',
    'Status',
    'Packungsgrösse',
    'Einheit'
]

total_exported = 0
category_counts = {}

with open('sortiment.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f, delimiter=',')
    writer.writerow(fieldnames)

    for cat in categories:
        cat_name = cat.get('name', '')
        if cat_name == 'Top-Angebote':
            continue

        cat_count = 0
        for item in cat.get('items', []):
            art = str(item.get('art', '')).strip()
            name = str(item.get('name', '')).strip()
            gebinde = item.get('gebinde', '')
            sub_cat = item.get('subCategory', '')
            is_top = 'TRUE' if (item.get('topAngebot') or item.get('deal')) else 'FALSE'
            is_eigenmarke = 'TRUE' if item.get('eigenmarke') else 'FALSE'
            status = 'Deaktiviert' if item.get('disabled') else 'Aktiv'
            case_size = str(item.get('caseSize', '')) if item.get('caseSize') is not None else ''
            unit = item.get('unit', '')

            # Calculate / format prices
            ps = item.get('priceSingle')
            pp = item.get('pricePack')
            price = item.get('price')

            if ps is not None:
                ps_str = f"{float(ps):.2f}"
            elif gebinde == 'Einzeln' and price is not None:
                ps_str = f"{float(price):.2f}"
            else:
                ps_str = ""

            if pp is not None:
                pp_str = f"{float(pp):.2f}"
            elif gebinde == 'Pack' and price is not None:
                pp_str = f"{float(price):.2f}"
            else:
                pp_str = ""

            writer.writerow([
                art,
                name,
                gebinde,
                cat_name,
                is_top,
                sub_cat,
                ps_str,
                pp_str,
                is_eigenmarke,
                status,
                case_size,
                unit
            ])
            total_exported += 1
            cat_count += 1

        category_counts[cat_name] = cat_count

print(f"Successfully exported {total_exported} products to sortiment.csv!")
for cat_name, count in category_counts.items():
    print(f"  - {cat_name}: {count} Produkte")
