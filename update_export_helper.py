import shutil

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_clean_fn = """function exportUpdatedJs() {
  const cleaned = CATEGORIES.map(c => ({
    name: c.name,
    items: c.items.map(i => {
      const item = { art: i.art, name: i.name, price: i.price };
      if (i.caseSize) item.caseSize = i.caseSize;
      if (i.caseOnly) item.caseOnly = i.caseOnly;
      if (i.allowSingleBottle !== undefined) item.allowSingleBottle = i.allowSingleBottle;
      if (i.deal) item.deal = i.deal;
      if (i.unit) item.unit = i.unit;
      return item;
    })
  }));"""

new_clean_fn = """function cleanCategoriesForExport() {
  return CATEGORIES.map(c => ({
    name: c.name,
    items: c.items.map(i => {
      const item = { art: i.art, name: i.name, price: i.price };
      if (i.priceSingle !== undefined && i.priceSingle !== null) item.priceSingle = i.priceSingle;
      if (i.pricePack !== undefined && i.pricePack !== null) item.pricePack = i.pricePack;
      if (i.gebinde) item.gebinde = i.gebinde;
      if (i.caseSize) item.caseSize = i.caseSize;
      if (i.caseOnly) item.caseOnly = i.caseOnly;
      if (i.allowSingleBottle !== undefined) item.allowSingleBottle = i.allowSingleBottle;
      if (i.deal) item.deal = i.deal;
      if (i.topAngebot) item.topAngebot = i.topAngebot;
      if (i.unit) item.unit = i.unit;
      return item;
    })
  }));
}

function exportUpdatedJs() {
  const cleaned = cleanCategoriesForExport();"""

if old_clean_fn in content:
    content = content.replace(old_clean_fn, new_clean_fn)
    print("Updated exportUpdatedJs helper!")

old_github_clean = """    const cleaned = CATEGORIES.map(c => ({
      name: c.name,
      items: c.items.map(i => {
        const item = { art: i.art, name: i.name, price: i.price };
        if (i.caseSize) item.caseSize = i.caseSize;
        if (i.caseOnly) item.caseOnly = i.caseOnly;
        if (i.allowSingleBottle !== undefined) item.allowSingleBottle = i.allowSingleBottle;
        if (i.deal) item.deal = i.deal;
        if (i.unit) item.unit = i.unit;
        return item;
      })
    }));"""

new_github_clean = """    const cleaned = cleanCategoriesForExport();"""

if old_github_clean in content:
    content = content.replace(old_github_clean, new_github_clean)
    print("Updated savePricesToGithub clean logic!")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

shutil.copy('index.html', 'getraenke-bestelltool.html')
print("Successfully synced export clean functions in index.html & getraenke-bestelltool.html!")
