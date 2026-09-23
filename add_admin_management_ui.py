import re
import shutil

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update CSS
css_addition = """
  /* ADMIN SORTIMENT TABLE & BADGES */
  .admin-table-wrap {
    max-height: 55vh;
    overflow-y: auto;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    margin-top: 12px;
    background: #FFFFFF;
  }
  .admin-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.88rem;
  }
  .admin-table th, .admin-table td {
    padding: 10px 12px;
    border-bottom: 1px solid var(--border);
    text-align: left;
    vertical-align: middle;
  }
  .admin-table th {
    background: var(--primary-light);
    color: var(--primary-dark);
    font-weight: 700;
    position: sticky;
    top: 0;
    z-index: 2;
  }
  .status-badge-active {
    display: inline-block;
    background: #DEF7EC;
    color: #03543F;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 999px;
  }
  .status-badge-disabled {
    display: inline-block;
    background: #FDE8E8;
    color: #9B1C1C;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 999px;
  }
</style>"""

if "admin-table-wrap" not in content:
    content = content.replace("</style>", css_addition)
    print("Added CSS for Admin Table!")

# 2. Add Button to Edit Banner
old_banner_btns = """        <button id="saveGithubBtn" onclick="savePricesToGithub()" style="background:#0284C7; color:white; border:none; padding:8px 16px; border-radius:14px; font-weight:bold; font-size:0.86rem; cursor:pointer; box-shadow:0 2px 8px rgba(2,132,199,0.3); transition:all 0.15s ease;">☁️ Live auf GitHub speichern</button>"""

new_banner_btns = """        <button onclick="openAdminSortimentModal()" style="background:#10B981; color:white; border:none; padding:8px 16px; border-radius:14px; font-weight:bold; font-size:0.86rem; cursor:pointer; box-shadow:0 2px 8px rgba(16,185,129,0.3);">📦 Sortiment verwalten (Neu / Löschen / Verbergen)</button>
        <button id="saveGithubBtn" onclick="savePricesToGithub()" style="background:#0284C7; color:white; border:none; padding:8px 16px; border-radius:14px; font-weight:bold; font-size:0.86rem; cursor:pointer; box-shadow:0 2px 8px rgba(2,132,199,0.3); transition:all 0.15s ease;">☁️ Live auf GitHub speichern</button>"""

if old_banner_btns in content:
    content = content.replace(old_banner_btns, new_banner_btns)
    print("Added Sortiment Verwalten button to edit banner!")

# 3. Add Admin Sortiment Overlay and Add/Edit Product Overlay
admin_modals_html = """
<!-- ADMIN SORTIMENT MANAGEMENT MODAL -->
<div class="overlay" id="adminSortimentOverlay" onclick="if(event.target.id==='adminSortimentOverlay') closeAdminSortimentModal()">
  <div class="sheet" style="max-width: 960px; width: 95vw; max-height: 92vh; display: flex; flex-direction: column;">
    <div class="sheet-head">
      <div>
        <h2 style="margin:0; font-size:1.35rem; color:var(--primary);">📦 Sortiment-Verwaltung (Admin)</h2>
        <p style="margin:4px 0 0 0; font-size:0.85rem; color:var(--text-muted);">Produkte hinzufügen, bearbeiten, löschen oder für Kunden deaktivieren (verbergen).</p>
      </div>
      <button class="sheet-close" onclick="closeAdminSortimentModal()">✕</button>
    </div>

    <!-- Admin Filter & Action Bar -->
    <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:space-between; align-items:center; margin-top:14px; background:var(--primary-light); padding:12px; border-radius:var(--radius-sm);">
      <div style="display:flex; gap:8px; flex-wrap:wrap; flex:1;">
        <input type="text" id="adminSortSearch" placeholder="Art.-Nr. oder Name suchen…" oninput="renderAdminSortimentTable()" style="padding:8px 12px; border-radius:8px; border:1px solid var(--border); font-size:0.88rem; min-width:200px;">
        <select id="adminSortCatFilter" onchange="renderAdminSortimentTable()" style="padding:8px 12px; border-radius:8px; border:1px solid var(--border); font-size:0.88rem;">
          <option value="all">Alle Kategorien</option>
          <option value="Weine">Weine</option>
          <option value="Biere">Biere</option>
          <option value="Süssgetränke">Süssgetränke</option>
          <option value="Mineralwasser">Mineralwasser</option>
          <option value="Energy Drinks/Mate">Energy Drinks/Mate</option>
        </select>
        <select id="adminSortStatusFilter" onchange="renderAdminSortimentTable()" style="padding:8px 12px; border-radius:8px; border:1px solid var(--border); font-size:0.88rem;">
          <option value="all">Alle Status</option>
          <option value="active">Nur Aktive (Sichtbar)</option>
          <option value="disabled">Nur Deaktivierte (Versteckt)</option>
        </select>
      </div>

      <div style="display:flex; gap:8px;">
        <button onclick="openAddProductModal()" style="background:#10B981; color:white; border:none; padding:8px 14px; border-radius:8px; font-weight:bold; font-size:0.86rem; cursor:pointer;">➕ Neues Produkt</button>
        <button onclick="savePricesToGithub()" style="background:#0284C7; color:white; border:none; padding:8px 14px; border-radius:8px; font-weight:bold; font-size:0.86rem; cursor:pointer;">☁️ Auf GitHub speichern</button>
      </div>
    </div>

    <!-- Scrollable Table -->
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Art.-Nr.</th>
            <th>Produktname & Kategorie</th>
            <th>Gebinde</th>
            <th>Preise</th>
            <th>Status</th>
            <th style="text-align:right;">Aktionen</th>
          </tr>
        </thead>
        <tbody id="adminSortTableBody"></tbody>
      </table>
    </div>

    <div class="sheet-actions" style="margin-top:14px;">
      <button class="secondary" onclick="closeAdminSortimentModal()">Schliessen</button>
    </div>
  </div>
</div>

<!-- ADD / EDIT PRODUCT MODAL -->
<div class="overlay" id="adminProductEditOverlay" onclick="if(event.target.id==='adminProductEditOverlay') closeProductEditModal()">
  <div class="sheet" style="max-width: 550px;">
    <div class="sheet-head">
      <h2 id="modalProductTitle">✏️ Produkt bearbeiten</h2>
      <button class="sheet-close" onclick="closeProductEditModal()">✕</button>
    </div>
    
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:12px;">
      <div style="grid-column: span 1;">
        <label style="font-size:0.8rem; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Art.-Nr. *</label>
        <input type="text" id="formArt" placeholder="z.B. 99887" style="width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border);">
      </div>
      <div style="grid-column: span 1;">
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
      </div>

      <div style="grid-column: span 1;">
        <label style="font-size:0.8rem; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Gebinde-Typ *</label>
        <select id="formGebinde" style="width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border);">
          <option value="Einzeln & Pack">Einzeln & Pack</option>
          <option value="Pack">Pack (nur Pack)</option>
          <option value="Einzeln">Einzeln (nur Einzeln)</option>
        </select>
      </div>

      <div style="grid-column: span 1;">
        <label style="font-size:0.8rem; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Preis Einzeln (CHF)</label>
        <input type="number" step="0.05" min="0" id="formPriceSingle" placeholder="z.B. 1.20" style="width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border);">
      </div>

      <div style="grid-column: span 1;">
        <label style="font-size:0.8rem; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Preis Pack / Harass (CHF)</label>
        <input type="number" step="0.05" min="0" id="formPricePack" placeholder="z.B. 18.00" style="width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border);">
      </div>

      <div style="grid-column: span 1;">
        <label style="font-size:0.8rem; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Packungsgrösse (à Stk/Fl)</label>
        <input type="number" min="1" id="formCaseSize" placeholder="z.B. 6 oder 24" style="width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border);">
      </div>

      <div style="grid-column: span 1;">
        <label style="font-size:0.8rem; font-weight:600; color:var(--text-muted); display:block; margin-bottom:4px;">Einheit</label>
        <select id="formUnit" style="width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--border);">
          <option value="flasche">Flaschen</option>
          <option value="dose">Dosen</option>
          <option value="stk">Stück / Bag-in-Box</option>
        </select>
      </div>

      <div style="grid-column: span 2; display:flex; gap:16px; margin-top:6px;">
        <label style="font-size:0.85rem; font-weight:600; color:var(--text); cursor:pointer;">
          <input type="checkbox" id="formTop"> ⭐ Top-Angebot / Aktion
        </label>
        <label style="font-size:0.85rem; font-weight:600; color:#9B1C1C; cursor:pointer;">
          <input type="checkbox" id="formDisabled"> ⚠️ Deaktiviert (für Kunden ausblenden)
        </label>
      </div>
    </div>

    <div class="sheet-actions" style="margin-top:20px;">
      <button class="secondary" onclick="closeProductEditModal()">Abbrechen</button>
      <button class="primary" onclick="saveProductFromModal()">Speichern</button>
    </div>
  </div>
</div>
"""

if "adminSortimentOverlay" not in content:
    content = content.replace("<!-- RESET CONFIRMATION MODAL -->", admin_modals_html + "\n<!-- RESET CONFIRMATION MODAL -->")
    print("Added Admin Sortiment Overlay and Edit Overlays HTML!")

# 4. Update JS logic (renderProducts search filtering for disabled items, cleanCategoriesForExport, admin JS functions)

old_search_filter = """    const searchFiltered = rawItems.filter(p => 
      (p.name && p.name.toLowerCase().includes(term)) || 
      (p.art && String(p.art).toLowerCase().includes(term))
    );"""

new_search_filter = """    const searchFiltered = rawItems.filter(p => {
      if (p.disabled && !isEditPricesMode) return false;
      return (p.name && p.name.toLowerCase().includes(term)) || 
             (p.art && String(p.art).toLowerCase().includes(term));
    });"""

if old_search_filter in content:
    content = content.replace(old_search_filter, new_search_filter)
    print("Updated renderProducts to filter disabled products for non-admin users!")

old_clean_export = """function cleanCategoriesForExport() {
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
}"""

new_clean_export = """function cleanCategoriesForExport() {
  return CATEGORIES.map(c => ({
    name: c.name,
    items: c.items.map(i => {
      const item = { art: i.art, name: i.name, price: i.price };
      if (i.priceSingle !== undefined && i.priceSingle !== null) item.priceSingle = i.priceSingle;
      if (i.pricePack !== undefined && i.pricePack !== null) item.pricePack = i.pricePack;
      if (i.gebinde) item.gebinde = i.gebinde;
      if (i.subCategory) item.subCategory = i.subCategory;
      if (i.caseSize) item.caseSize = i.caseSize;
      if (i.caseOnly) item.caseOnly = i.caseOnly;
      if (i.allowSingleBottle !== undefined) item.allowSingleBottle = i.allowSingleBottle;
      if (i.deal) item.deal = i.deal;
      if (i.topAngebot) item.topAngebot = i.topAngebot;
      if (i.disabled) item.disabled = i.disabled;
      if (i.unit) item.unit = i.unit;
      return item;
    })
  }));
}"""

if old_clean_export in content:
    content = content.replace(old_clean_export, new_clean_export)
    print("Updated cleanCategoriesForExport to preserve disabled and subCategory!")

admin_js_functions = """
let editingProductArt = null;

function openAdminSortimentModal() {
  if (!isAdminAuthenticated) {
    openAdminModal();
    return;
  }
  renderAdminSortimentTable();
  document.getElementById("adminSortimentOverlay").classList.add("open");
}

function closeAdminSortimentModal() {
  document.getElementById("adminSortimentOverlay").classList.remove("open");
}

function renderAdminSortimentTable() {
  const searchTerm = (document.getElementById("adminSortSearch")?.value || "").trim().toLowerCase();
  const statusFilter = document.getElementById("adminSortStatusFilter")?.value || "all";
  const catFilter = document.getElementById("adminSortCatFilter")?.value || "all";
  const tbody = document.getElementById("adminSortTableBody");
  if (!tbody) return;

  let allProducts = [];
  const processedArts = new Set();
  CATEGORIES.forEach(c => {
    (c.items || []).forEach(p => {
      if (c.name === "Top-Angebote" || processedArts.has(p.art)) return;
      processedArts.add(p.art);
      allProducts.push({ ...p, catName: c.name });
    });
  });

  const filtered = allProducts.filter(p => {
    if (searchTerm) {
      const matchName = p.name && p.name.toLowerCase().includes(searchTerm);
      const matchArt = p.art && String(p.art).toLowerCase().includes(searchTerm);
      if (!matchName && !matchArt) return false;
    }
    if (statusFilter === "active" && p.disabled) return false;
    if (statusFilter === "disabled" && !p.disabled) return false;
    if (catFilter !== "all" && p.catName !== catFilter) return false;
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:var(--text-muted);">Keine Produkte gefunden.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => {
    const isDeact = !!p.disabled;
    const priceText = p.gebinde === "Einzeln & Pack"
      ? `Fl: CHF ${(p.priceSingle||0).toFixed(2)} / Pck: CHF ${(p.pricePack||p.price||0).toFixed(2)}`
      : `CHF ${(p.price||0).toFixed(2)}`;

    return `
      <tr style="${isDeact ? 'background:#FDF2F2; opacity:0.85;' : ''}">
        <td><strong>${p.art}</strong></td>
        <td>
          <div style="font-weight:600; color:var(--text);">${p.name}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${p.catName} ${p.subCategory ? '• ' + p.subCategory : ''}</div>
        </td>
        <td><span style="font-size:0.8rem; background:var(--primary-light); padding:2px 6px; border-radius:6px;">${p.gebinde || 'Standard'}</span></td>
        <td><span style="font-weight:700; color:var(--accent-dark);">${priceText}</span></td>
        <td>
          ${isDeact 
            ? '<span class="status-badge-disabled">⚠️ Deaktiviert</span>' 
            : '<span class="status-badge-active">✓ Aktiv</span>'}
        </td>
        <td style="text-align:right; white-space:nowrap;">
          <button onclick="toggleProductStatus('${p.art}')" style="background:${isDeact ? '#059669' : '#D97706'}; color:white; border:none; padding:5px 9px; border-radius:6px; font-size:0.78rem; font-weight:600; cursor:pointer; margin-right:4px;">
            ${isDeact ? '👁️ Aktivieren' : '👁️ Deaktivieren'}
          </button>
          <button onclick="openEditProductModal('${p.art}')" style="background:#2563EB; color:white; border:none; padding:5px 9px; border-radius:6px; font-size:0.78rem; font-weight:600; cursor:pointer; margin-right:4px;">
            ✏️ Bearbeiten
          </button>
          <button onclick="deleteProduct('${p.art}')" style="background:#DC2626; color:white; border:none; padding:5px 9px; border-radius:6px; font-size:0.78rem; font-weight:600; cursor:pointer;">
            🗑️
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function toggleProductStatus(art) {
  for (const cat of CATEGORIES) {
    for (const p of (cat.items || [])) {
      if (p.art === art) {
        p.disabled = !p.disabled;
      }
    }
  }
  renderAdminSortimentTable();
  renderProducts();
}

function deleteProduct(art) {
  if (!confirm(`Möchtest du das Produkt mit Art.-Nr. ${art} wirklich dauerhaft löschen?`)) return;
  
  CATEGORIES.forEach(cat => {
    cat.items = (cat.items || []).filter(p => p.art !== art);
  });
  
  renderAdminSortimentTable();
  renderProducts();
}

function openAddProductModal() {
  editingProductArt = null;
  document.getElementById("modalProductTitle").textContent = "➕ Neues Produkt hinzufügen";
  document.getElementById("formArt").value = "";
  document.getElementById("formName").value = "";
  document.getElementById("formCategory").value = "Weine";
  document.getElementById("formSubCat").value = "";
  document.getElementById("formGebinde").value = "Einzeln & Pack";
  document.getElementById("formPriceSingle").value = "";
  document.getElementById("formPricePack").value = "";
  document.getElementById("formCaseSize").value = "6";
  document.getElementById("formUnit").value = "flasche";
  document.getElementById("formTop").checked = false;
  document.getElementById("formDisabled").checked = false;
  
  document.getElementById("adminProductEditOverlay").classList.add("open");
}

function openEditProductModal(art) {
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
}
"""

if "function openAdminSortimentModal" not in content:
    content = content.replace("function updateAdminHeaderBtn() {", admin_js_functions + "\nfunction updateAdminHeaderBtn() {")
    print("Added Admin JS functions to index.html!")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

shutil.copy('index.html', 'getraenke-bestelltool.html')
print("Successfully added Admin Sortiment Management UI and synced getraenke-bestelltool.html!")
