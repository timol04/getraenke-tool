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
    writer = csv.writer(f, delimiter=';')
    writer.writerow(['Kategorie', 'Artikelnummer', 'Produktname', 'Pack_Preis_CHF', 'Packungsgroesse_Flaschen'])

    for cat in categories:
        for item in cat['items']:
            writer.writerow([
                cat['name'],
                item['art'],
                item['name'],
                item['price'],
                item.get('caseSize', 1)
            ])

print("Successfully generated sortiment.csv!")
