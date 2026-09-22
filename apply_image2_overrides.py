import json
import re

image2_prices = {
    "73366": 1.75,
    "59471": 18.95,
    "21880": 17.50,
    "73361": 1.80,
    "34965": 17.95,
    "14411": 2.90,
    "02741": 8.15,
    "81853": 2.95,
    "109920": 11.20,
    "103082": 8.50,
    "45671": 3.55,
    "54906": 10.95
}

with open('sortiment.js', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'const CATEGORIES = (\[.*\]);', content, re.DOTALL)
if match:
    cats = json.loads(match.group(1))
    for cat in cats:
        for item in cat['items']:
            art = item['art']
            if art in image2_prices:
                item['price'] = image2_prices[art]

    new_js = "/**\n * ====================================================================\n * LANDI GETRÄNKE-SORTIMENT (Automatisch von Landi.ch importiert)\n * ====================================================================\n */\n\nconst CATEGORIES = " + json.dumps(cats, indent=2, ensure_ascii=False) + ";\n"
    with open('sortiment.js', 'w', encoding='utf-8') as f:
        f.write(new_js)

    print("Applied Image 2 exact price overrides to sortiment.js!")
