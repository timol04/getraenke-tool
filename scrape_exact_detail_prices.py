import json
import re
import time
from playwright.sync_api import sync_playwright

with open('scraped_raw.json', 'r', encoding='utf-8') as f:
    categories_raw = json.load(f)

# Build a mapping of art -> href detail path
art_href_map = {}
for cat in categories_raw:
    for item in cat['raw_items']:
        art_href_map[item['art']] = item['href']

# Load current sortiment.js
with open('sortiment.js', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'const CATEGORIES = (\[.*\]);', content, re.DOTALL)
if not match:
    print("Could not find CATEGORIES in sortiment.js")
    exit(1)

categories = json.loads(match.group(1))

print("Starting exact detail price fetcher...")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    updated_count = 0

    for cat in categories:
        print(f"\nProcessing Category: {cat['name']}...")
        for item in cat['items']:
            art = item['art']
            href = art_href_map.get(art)
            if not href:
                continue

            full_url = "https://www.landi.ch" + href if href.startswith('/') else href

            try:
                page.goto(full_url, wait_until='networkidle', timeout=15000)
                page.wait_for_timeout(800)
                text = page.evaluate('document.body.innerText')
                
                price_match = re.search(r'Total CHF\s*([0-9]+\.[0-9]{2})', text)
                if price_match:
                    exact_price = float(price_match.group(1))
                    old_price = item['price']
                    item['price'] = exact_price
                    updated_count += 1
                    print(f"  [Art {art}] {item['name'][:35]}: {old_price} -> {exact_price} CHF")
                else:
                    print(f"  [Art {art}] {item['name'][:35]}: Price match not found, keeping {item['price']}")
            except Exception as e:
                print(f"  [Art {art}] Error fetching {full_url}: {e}")

    browser.close()

# Save updated sortiment.js
js_lines = [
    "/**",
    " * ====================================================================",
    " * LANDI GETRÄNKE-SORTIMENT (Automatisch von Landi.ch importiert)",
    " * ====================================================================",
    " */",
    "",
    "const CATEGORIES = " + json.dumps(categories, indent=2, ensure_ascii=False) + ";\n"
]

with open('sortiment.js', 'w', encoding='utf-8') as f:
    f.write("\n".join(js_lines))

print(f"\nFinished! Updated {updated_count} product prices directly from Landi product detail pages.")
