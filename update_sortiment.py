import asyncio
import re
from playwright.async_api import async_playwright

async def get_landi_product(page, article_number):
    try:
        print(f"Suche nach Artikel: {article_number}...")
        await page.goto(f"https://www.landi.ch/shop/suche?q={article_number}", wait_until="domcontentloaded")
        
        # Versuche das erste Suchresultat zu finden (Warten bis zu 5 Sekunden)
        try:
            await page.wait_for_selector(".product-item, .card, .product-tile", timeout=5000)
        except:
            print(f"  -> Artikel {article_number} nicht gefunden (vielleicht falsche Nummer/Platzhalter).")
            return None, None
            
        # Extrahiere Name und Preis
        text = await page.inner_text("body")
        
        # Einfache Heuristik für Preis-Suche
        price_match = re.search(r'CHF\s*(\d+\.\d{2})', text)
        price = float(price_match.group(1)) if price_match else None
        
        print(f"  -> Gefunden: Preis CHF {price}")
        return "Gefundener Name (Platzhalter)", price
    except Exception as e:
        print(f"  -> Fehler bei Artikel {article_number}: {e}")
        return None, None

async def main():
    # 1. Lese aktuelles Sortiment
    try:
        with open("sortiment.js", "r", encoding="utf-8") as f:
            content = f.read()
    except FileNotFoundError:
        print("Fehler: sortiment.js nicht gefunden!")
        return

    # Extrahieren der Artikelnummern
    articles = re.findall(r'art:\s*"(\d+)"', content)
    print(f"Gefundene Artikel in sortiment.js: {articles}")
    
    if not articles:
        return

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        for art in set(articles):
            name, price = await get_landi_product(page, art)
            if price:
                # Suche nach der Zeile mit dem Artikel und aktualisiere den Preis
                pattern = r'(art:\s*"' + art + r'".*?price:\s*)(\d+\.\d{2}|\d+)'
                content = re.sub(pattern, r'\g<1>' + f"{price:.2f}", content)
                
        await browser.close()
        
    # 2. Schreibe neues Sortiment
    with open("sortiment.js", "w", encoding="utf-8") as f:
        f.write(content)
        
    print("\n✅ sortiment.js wurde erfolgreich aktualisiert!")

if __name__ == "__main__":
    asyncio.run(main())
