import re
import shutil

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace formCategory and formSubCat HTML inputs with dropdowns
old_subcat_html = """      <div style="grid-column: span 1;">
        <label style="font-size:0.8rem; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Kategorie *</label>
        <select id="formCategory" style="width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border);">
          <option value="Weine">Weine</option>
          <option value="Biere">Biere</option>
          <option value="Süssgetränke">Süssgetränke</option>
          <option value="Mineralwasser">Mineralwasser</option>
          <option value="Energy Drinks/Mate">Energy Drinks/Mate</option>
        </select>
      </div>
      
      <div style="grid-column: span 2;">
        <label style="font-size:0.8rem; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Produktname *</label>
        <input type="text" id="formName" placeholder="z.B. Feldschlösschen Braufrisch 24x33cl" style="width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border);">
      </div>

      <div style="grid-column: span 1;">
        <label style="font-size:0.8rem; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Unterkategorie</label>
        <input type="text" id="formSubCat" placeholder="z.B. Weisswein / Spezialbier" style="width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border);">
      </div>"""

new_subcat_html = """      <div style="grid-column: span 1;">
        <label style="font-size:0.8rem; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Kategorie *</label>
        <select id="formCategory" onchange="updateSubCategoryOptions()" style="width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border);">
          <option value="Weine">Weine</option>
          <option value="Biere">Biere</option>
          <option value="Süssgetränke">Süssgetränke</option>
          <option value="Mineralwasser">Mineralwasser</option>
          <option value="Energy Drinks/Mate">Energy Drinks/Mate</option>
        </select>
      </div>
      
      <div style="grid-column: span 2;">
        <label style="font-size:0.8rem; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Produktname *</label>
        <input type="text" id="formName" placeholder="z.B. Feldschlösschen Braufrisch 24x33cl" style="width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border);">
      </div>

      <div style="grid-column: span 1;">
        <label style="font-size:0.8rem; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Unterkategorie (Filter-Gruppe) *</label>
        <select id="formSubCat" style="width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border);">
          <option value="">-- Unterkategorie wählen --</option>
        </select>
      </div>"""

if old_subcat_html in content:
    content = content.replace(old_subcat_html, new_subcat_html)
    print("Replaced formSubCat HTML input with dropdown select!")

# 2. Add SUBCATEGORY_OPTIONS and updateSubCategoryOptions JS functions
js_subcat_helpers = """const SUBCATEGORY_OPTIONS = {
  "Süssgetränke": [
    "Cola & Softdrinks",
    "Ice Tea",
    "Säfte & Most",
    "Sirup & Punsch",
    "Limonade / Sonstige"
  ],
  "Weine": [
    "Rotwein",
    "Weisswein",
    "Rosé & Schaumwein",
    "Bag-in-Box / Grossgebinde",
    "Glühwein / Sonstige"
  ],
  "Biere": [
    "Bier mit Alkohol",
    "Alkoholfrei",
    "Radler & Mix",
    "Weizenbier",
    "Cider & Biermix"
  ],
  "Mineralwasser": [
    "Mineralwasser mit Kohlensäure",
    "Mineralwasser ohne Kohlensäure",
    "Aromatisches Wasser"
  ],
  "Energy Drinks/Mate": [
    "Energy Drinks",
    "Mate"
  ]
};

function updateSubCategoryOptions(selectedSubCat = "") {
  const cat = document.getElementById("formCategory")?.value || "Weine";
  const subSelect = document.getElementById("formSubCat");
  if (!subSelect) return;

  const options = SUBCATEGORY_OPTIONS[cat] || [];
  
  let html = `<option value="">-- Unterkategorie wählen --</option>`;
  options.forEach(opt => {
    const isSel = (opt === selectedSubCat) ? "selected" : "";
    html += `<option value="${opt}" ${isSel}>${opt}</option>`;
  });
  
  if (selectedSubCat && !options.includes(selectedSubCat)) {
    html += `<option value="${selectedSubCat}" selected>${selectedSubCat}</option>`;
  }

  subSelect.innerHTML = html;
}
"""

if "const SUBCATEGORY_OPTIONS" not in content:
    content = content.replace("function updateGebindeFormFields() {", js_subcat_helpers + "\nfunction updateGebindeFormFields() {")
    print("Added SUBCATEGORY_OPTIONS JS functions!")

# 3. Update openAddProductModal & openEditProductModal to call updateSubCategoryOptions
content = content.replace(
    'document.getElementById("formSubCat").value = "";',
    'updateSubCategoryOptions("");'
)

old_edit_subcat_call = 'document.getElementById("formSubCat").value = p.subCategory || "";'
new_edit_subcat_call = 'updateSubCategoryOptions(p.subCategory || "");'

if old_edit_subcat_call in content:
    content = content.replace(old_edit_subcat_call, new_edit_subcat_call)
    print("Updated openEditProductModal to populate dropdown subcategory!")

# 4. Update SUB_FILTERS matching logic to also check p.subCategory
old_sub_filters = """const SUB_FILTERS = {
  "Weine": [
    { label: "Alle", match: () => true },
    { label: "Rotwein", match: p => /rosso|rot|primitivo|dôle|salvagnin|pinot noir|tinto|cabernet|merlot|syrah|gamay|monastrell|zweigelt|rioja|barbera|chianti|amarone|ripasso|rouge|borgo|velarino|el gringo|schweizer/i.test(p.name) },
    { label: "Weisswein", match: p => /fendant|chasselas|mont sur rolle|luins|yvorne|st. saphorin|villette|epesses|heida|johannisberg|riesling|chardonnay|moscato|mosketto|blanc|weiss|grigio|veltliner|clairette|aigle|guyen/i.test(p.name) },
    { label: "Rosé & Schaumwein", match: p => /rosé|rosato|oeil|œil|prosecco|spumante|schaumwein|volgaz|rimuss|mauler|federweiss/i.test(p.name) }
  ],
  "Süssgetränke": [
    { label: "Alle", match: () => true },
    { label: "Cola & Softdrinks", match: p => /coca|cola|citro|grapefruit|lemon soda|sanal|sinalco|rivella|san pellegrino/i.test(p.name) },
    { label: "Ice Tea", match: p => /ice tea|eistee/i.test(p.name) },
    { label: "Säfte & Most", match: p => /saft|orangensaft|traubensaft|cranberry|multivitamin|sauser|capri|most|süessmost|schnitzwasser/i.test(p.name) },
    { label: "Sirup & Punsch", match: p => /sirup|punsch|holunder|focus water|vitaminwater/i.test(p.name) }
  ],
  "Energy Drinks/Mate": [
    { label: "Alle", match: () => true },
    { label: "Energy Drinks", match: p => /energy|red bull/i.test(p.name) },
    { label: "Mate", match: p => /mate/i.test(p.name) }
  ],
  "Biere": [
    { label: "Alle", match: () => true },
    { label: "Bier mit Alkohol", match: p => !/o\.a\.|0\.0|alkoholfrei|bilz|bschorle|radler|panaché|eve/i.test(p.name) },
    { label: "Alkoholfrei", match: p => /o\.a\.|0\.0|alkoholfrei|bilz|bschorle/i.test(p.name) },
    { label: "Radler & Mix", match: p => /radler|panaché|eve|ginger/i.test(p.name) }
  ]
};"""

new_sub_filters = """const SUB_FILTERS = {
  "Weine": [
    { label: "Alle", match: () => true },
    { label: "Rotwein", match: p => p.subCategory === "Rotwein" || /rosso|rot|primitivo|dôle|salvagnin|pinot noir|tinto|cabernet|merlot|syrah|gamay|monastrell|zweigelt|rioja|barbera|chianti|amarone|ripasso|rouge|borgo|velarino|el gringo|schweizer/i.test(p.name) },
    { label: "Weisswein", match: p => p.subCategory === "Weisswein" || /fendant|chasselas|mont sur rolle|luins|yvorne|st. saphorin|villette|epesses|heida|johannisberg|riesling|chardonnay|moscato|mosketto|blanc|weiss|grigio|veltliner|clairette|aigle|guyen/i.test(p.name) },
    { label: "Rosé & Schaumwein", match: p => p.subCategory === "Rosé & Schaumwein" || /rosé|rosato|oeil|œil|prosecco|spumante|schaumwein|volgaz|rimuss|mauler|federweiss/i.test(p.name) }
  ],
  "Süssgetränke": [
    { label: "Alle", match: () => true },
    { label: "Cola & Softdrinks", match: p => p.subCategory === "Cola & Softdrinks" || /coca|cola|citro|grapefruit|lemon soda|sanal|sinalco|rivella|san pellegrino/i.test(p.name) },
    { label: "Ice Tea", match: p => p.subCategory === "Ice Tea" || /ice tea|eistee/i.test(p.name) },
    { label: "Säfte & Most", match: p => p.subCategory === "Säfte & Most" || /saft|orangensaft|traubensaft|cranberry|multivitamin|sauser|capri|most|süessmost|schnitzwasser/i.test(p.name) },
    { label: "Sirup & Punsch", match: p => p.subCategory === "Sirup & Punsch" || /sirup|punsch|holunder|focus water|vitaminwater/i.test(p.name) }
  ],
  "Energy Drinks/Mate": [
    { label: "Alle", match: () => true },
    { label: "Energy Drinks", match: p => p.subCategory === "Energy Drinks" || /energy|red bull/i.test(p.name) },
    { label: "Mate", match: p => p.subCategory === "Mate" || /mate/i.test(p.name) }
  ],
  "Biere": [
    { label: "Alle", match: () => true },
    { label: "Bier mit Alkohol", match: p => p.subCategory === "Bier mit Alkohol" || !/o\.a\.|0\.0|alkoholfrei|bilz|bschorle|radler|panaché|eve/i.test(p.name) },
    { label: "Alkoholfrei", match: p => p.subCategory === "Alkoholfrei" || /o\.a\.|0\.0|alkoholfrei|bilz|bschorle/i.test(p.name) },
    { label: "Radler & Mix", match: p => p.subCategory === "Radler & Mix" || /radler|panaché|eve|ginger/i.test(p.name) }
  ]
};"""

if old_sub_filters in content:
    content = content.replace(old_sub_filters, new_sub_filters)
    print("Updated SUB_FILTERS to match subCategory property!")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

shutil.copy('index.html', 'getraenke-bestelltool.html')
print("Successfully synchronized subcategory dropdown functionality in index.html & getraenke-bestelltool.html!")
