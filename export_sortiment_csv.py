import json
import csv
import re

with open('sortiment.js', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'const CATEGORIES = (\[.*\]);', content, re.DOTALL)
if not match:
    print("Could not parse CATEGORIES")
    exit(1)

categories = json.loads(match.group(1))

with open('sortiment.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(['Art.-Nr.', 'Name des Produkts', 'Gebinde', 'Kategorie', 'Top-Angebot', 'Unterkategorie', 'Preis Einzeln(CHF)', 'Preis Pack (CHF)'])

    for cat in categories:
        if cat['name'] == 'Top-Angebote':
            continue
        for item in cat['items']:
            writer.writerow([
                item.get('art', ''),
                item.get('name', ''),
                item.get('gebinde', ''),
                cat.get('name', ''),
                'TRUE' if item.get('topAngebot') else 'FALSE',
                item.get('subCategory', ''),
                item.get('priceSingle', '') if item.get('priceSingle') is not None else '',
                item.get('pricePack', '') if item.get('pricePack') is not None else ''
            ])

print("Successfully exported sortiment.csv from sortiment.js!")
