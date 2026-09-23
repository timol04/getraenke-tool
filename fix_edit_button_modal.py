import re
import shutil

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update findProduct
old_find_product = """function findProduct(id) {
  for (const cat of CATEGORIES) {
    const found = (cat.items || []).find(p => p.id === id);
    if (found) return found;
  }
  return null;
}"""

new_find_product = """function findProduct(identifier) {
  if (!identifier) return null;
  const strId = String(identifier);
  for (const cat of CATEGORIES) {
    const found = (cat.items || []).find(p => p.id === strId || String(p.art) === strId);
    if (found) return found;
  }
  return null;
}"""

if old_find_product in content:
    content = content.replace(old_find_product, new_find_product)
    print("Updated findProduct to match both id and art!")

# 2. Update openEditProductModal and saveProductFromModal
old_edit_fns = """function openEditProductModal(art) {
  const p = findProduct(art);
  if (!p) return;
  editingProductArt = art;
  document.getElementById("modalProductTitle").textContent = "✏️ Produkt bearbeiten (" + art + ")";
  document.getElementById("formArt").value = p.art || "";
  document.getElementById("formName").value = p.name || "";
  
  let catName = "Weine";
  for (const cat of CATEGORIES) {
    if (cat.name !== "Top-Angebote" && (cat.items || []).some(x => x.art === art)) {
      catName = cat.name;
      break;
    }
  }
  document.getElementById("formCategory").value = catName;
  document.getElementById("formSubCat").value = p.subCategory || "";
  document.getElementById("formGebinde").value = p.gebinde || "Einzeln & Pack";
  document.getElementById("formPriceSingle").value = p.priceSingle !== undefined && p.priceSingle !== null ? p.priceSingle : "";
  document.getElementById("formPricePack").value = p.pricePack !== undefined && p.pricePack !== null ? p.pricePack : "";
  document.getElementById("formCaseSize").value = p.caseSize || "";
  document.getElementById("formUnit").value = p.unit || "flasche";
  document.getElementById("formTop").checked = !!(p.topAngebot || p.deal);
  document.getElementById("formDisabled").checked = !!p.disabled;
  
  document.getElementById("adminProductEditOverlay").classList.add("open");
}

function closeProductEditModal() {
  document.getElementById("adminProductEditOverlay").classList.remove("open");
}

function saveProductFromModal() {
  const art = document.getElementById("formArt").value.trim();
  const name = document.getElementById("formName").value.trim();
  const catName = document.getElementById("formCategory").value;
  const subCat = document.getElementById("formSubCat").value.trim();
  const gebinde = document.getElementById("formGebinde").value;
  const peStr = document.getElementById("formPriceSingle").value;
  const ppStr = document.getElementById("formPricePack").value;
  const pe = peStr !== "" ? parseFloat(peStr) : null;
  const pp = ppStr !== "" ? parseFloat(ppStr) : null;
  const cs = parseInt(document.getElementById("formCaseSize").value, 10) || null;
  const unit = document.getElementById("formUnit").value;
  const top = document.getElementById("formTop").checked;
  const dis = document.getElementById("formDisabled").checked;

  if (!art || !name) {
    alert("Bitte Artikel-Nr. und Produktnamen ausfüllen!");
    return;
  }

  const mainPrice = pp !== null ? pp : (pe !== null ? pe : 0);

  const productObj = {
    art: art,
    name: name,
    price: mainPrice,
    gebinde: gebinde,
    subCategory: subCat,
    unit: unit,
    topAngebot: top,
    disabled: dis
  };
  if (pe !== null) productObj.priceSingle = pe;
  if (pp !== null) productObj.pricePack = pp;
  if (cs) productObj.caseSize = cs;
  if (gebinde === "Pack") {
    productObj.caseOnly = true;
    productObj.allowSingleBottle = false;
  } else {
    productObj.caseOnly = false;
    productObj.allowSingleBottle = true;
  }

  // Remove existing instances
  CATEGORIES.forEach(cat => {
    cat.items = (cat.items || []).filter(x => x.art !== art);
  });

  // Add to category
  let targetCatObj = CATEGORIES.find(c => c.name === catName);
  if (!targetCatObj) {
    targetCatObj = { name: catName, items: [] };
    CATEGORIES.push(targetCatObj);
  }
  targetCatObj.items.push(productObj);

  // Top offer copy if applicable
  if (top) {
    let topCatObj = CATEGORIES.find(c => c.name === "Top-Angebote");
    if (!topCatObj) {
      topCatObj = { name: "Top-Angebote", items: [] };
      CATEGORIES.unshift(topCatObj);
    }
    const topCopy = { ...productObj, deal: true };
    topCatObj.items.push(topCopy);
  }

  normalizeAssortment();
  closeProductEditModal();
  renderAdminSortimentTable();
  renderProducts();
}"""

new_edit_fns = """function updateGebindeFormFields() {
  const g = document.getElementById("formGebinde").value;
  const peBox = document.getElementById("formPriceSingle");
  const ppBox = document.getElementById("formPricePack");
  if (g === "Einzeln") {
    if (peBox) peBox.placeholder = "z.B. 1.20 (Erforderlich)";
    if (ppBox) ppBox.placeholder = "Nicht benötigt für Einzeln";
  } else if (g === "Pack") {
    if (peBox) peBox.placeholder = "Nicht benötigt für Pack";
    if (ppBox) ppBox.placeholder = "z.B. 18.00 (Erforderlich)";
  } else {
    if (peBox) peBox.placeholder = "z.B. 1.20 (Einzelpreis)";
    if (ppBox) ppBox.placeholder = "z.B. 18.00 (Packpreis)";
  }
}

function openEditProductModal(art) {
  const p = findProduct(art);
  if (!p) {
    alert("Fehler: Produkt mit Art.-Nr. " + art + " konnte nicht gefunden werden.");
    return;
  }
  editingProductArt = String(p.art);
  document.getElementById("modalProductTitle").textContent = "✏️ Produkt bearbeiten (" + p.art + ")";
  document.getElementById("formArt").value = p.art || "";
  document.getElementById("formName").value = p.name || "";
  
  let catName = "Weine";
  for (const cat of CATEGORIES) {
    if (cat.name !== "Top-Angebote" && (cat.items || []).some(x => String(x.art) === String(p.art))) {
      catName = cat.name;
      break;
    }
  }
  document.getElementById("formCategory").value = catName;
  document.getElementById("formSubCat").value = p.subCategory || "";
  document.getElementById("formGebinde").value = p.gebinde || (p.caseOnly ? "Pack" : (p.caseSize ? "Einzeln & Pack" : "Einzeln"));
  document.getElementById("formPriceSingle").value = p.priceSingle !== undefined && p.priceSingle !== null ? p.priceSingle : (p.gebinde === "Einzeln" ? p.price : "");
  document.getElementById("formPricePack").value = p.pricePack !== undefined && p.pricePack !== null ? p.pricePack : (p.gebinde === "Pack" ? p.price : "");
  document.getElementById("formCaseSize").value = p.caseSize || "";
  document.getElementById("formUnit").value = p.unit || "flasche";
  document.getElementById("formTop").checked = !!(p.topAngebot || p.deal);
  document.getElementById("formDisabled").checked = !!p.disabled;
  
  updateGebindeFormFields();
  document.getElementById("adminProductEditOverlay").classList.add("open");
}

function closeProductEditModal() {
  document.getElementById("adminProductEditOverlay").classList.remove("open");
}

function saveProductFromModal() {
  const art = document.getElementById("formArt").value.trim();
  const name = document.getElementById("formName").value.trim();
  const catName = document.getElementById("formCategory").value;
  const subCat = document.getElementById("formSubCat").value.trim();
  const gebinde = document.getElementById("formGebinde").value;
  const peStr = document.getElementById("formPriceSingle").value.trim();
  const ppStr = document.getElementById("formPricePack").value.trim();
  const pe = peStr !== "" ? parseFloat(peStr) : null;
  const pp = ppStr !== "" ? parseFloat(ppStr) : null;
  const cs = parseInt(document.getElementById("formCaseSize").value, 10) || null;
  const unit = document.getElementById("formUnit").value;
  const top = document.getElementById("formTop").checked;
  const dis = document.getElementById("formDisabled").checked;

  if (!art || !name) {
    alert("Bitte Artikel-Nr. und Produktnamen ausfüllen!");
    return;
  }

  const mainPrice = pp !== null ? pp : (pe !== null ? pe : 0);

  const productObj = {
    art: art,
    id: "art-" + String(art).replace(/[^a-zA-Z0-9_-]/g, "_"),
    name: name,
    price: mainPrice,
    gebinde: gebinde,
    subCategory: subCat,
    unit: unit,
    topAngebot: top,
    disabled: dis
  };
  if (pe !== null) productObj.priceSingle = pe;
  if (pp !== null) productObj.pricePack = pp;
  if (cs) productObj.caseSize = cs;

  if (gebinde === "Pack") {
    productObj.caseOnly = true;
    productObj.allowSingleBottle = false;
  } else if (gebinde === "Einzeln") {
    productObj.caseOnly = false;
    productObj.allowSingleBottle = true;
  } else {
    productObj.caseOnly = false;
    productObj.allowSingleBottle = true;
  }

  const targetOldArts = new Set([String(art)]);
  if (editingProductArt) targetOldArts.add(String(editingProductArt));

  CATEGORIES.forEach(cat => {
    cat.items = (cat.items || []).filter(x => !targetOldArts.has(String(x.art)) && !targetOldArts.has(String(x.id)));
  });

  let targetCatObj = CATEGORIES.find(c => c.name === catName);
  if (!targetCatObj) {
    targetCatObj = { name: catName, items: [] };
    CATEGORIES.push(targetCatObj);
  }
  targetCatObj.items.push(productObj);

  if (top) {
    let topCatObj = CATEGORIES.find(c => c.name === "Top-Angebote");
    if (!topCatObj) {
      topCatObj = { name: "Top-Angebote", items: [] };
      CATEGORIES.unshift(topCatObj);
    }
    const topCopy = { ...productObj, deal: true };
    topCatObj.items.push(topCopy);
  }

  normalizeAssortment();
  closeProductEditModal();
  renderAdminSortimentTable();
  renderProducts();
}"""

if old_edit_fns in content:
    content = content.replace(old_edit_fns, new_edit_fns)
    print("Updated openEditProductModal and saveProductFromModal!")

# 3. Add onchange="updateGebindeFormFields()" to formGebinde select in HTML
content = content.replace('id="formGebinde"', 'id="formGebinde" onchange="updateGebindeFormFields()"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

shutil.copy('index.html', 'getraenke-bestelltool.html')
print("Successfully updated product edit modal logic in index.html & getraenke-bestelltool.html!")
