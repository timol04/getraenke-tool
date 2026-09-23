import re
import shutil

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update normalizeAssortment
old_normalize = """function normalizeAssortment() {
  CATEGORIES.forEach((cat, cIdx) => {
    (cat.items || []).forEach((p, pIdx) => {
      if (!p.id) {
        p.id = p.art ? "art-" + String(p.art).replace(/[^a-zA-Z0-9_-]/g, "_") : `item-${cIdx}-${pIdx}`;
      }
      if (!p.unit) {
        p.unit = "flasche";
      }
      if (typeof p.price !== "number") {
        p.price = parseFloat(p.price) || 0;
      }
      if (p.deal || p.topAngebot || cat.name === "Top-Angebote") {
        p.caseOnly = true;
        p.allowSingleBottle = false;
      } else if (p.allowSingleBottle === undefined) {
        p.allowSingleBottle = p.caseOnly ? false : true;
      }
    });
  });
}"""

new_normalize = """function normalizeAssortment() {
  CATEGORIES.forEach((cat, cIdx) => {
    (cat.items || []).forEach((p, pIdx) => {
      if (!p.id) {
        p.id = p.art ? "art-" + String(p.art).replace(/[^a-zA-Z0-9_-]/g, "_") : `item-${cIdx}-${pIdx}`;
      }
      if (!p.unit) {
        p.unit = "flasche";
      }
      if (typeof p.price !== "number") {
        p.price = parseFloat(p.price) || 0;
      }
      if (p.gebinde === "Pack" || p.caseOnly) {
        p.caseOnly = true;
        p.allowSingleBottle = false;
      } else if (p.gebinde === "Einzeln") {
        p.caseOnly = false;
        p.allowSingleBottle = true;
      } else if (p.gebinde === "Einzeln & Pack") {
        p.caseOnly = false;
        p.allowSingleBottle = true;
      } else {
        if (p.allowSingleBottle === undefined) {
          p.allowSingleBottle = p.caseOnly ? false : true;
        }
      }
    });
  });
}"""

if old_normalize in content:
    content = content.replace(old_normalize, new_normalize)
    print("Updated normalizeAssortment!")
else:
    print("Could not find old normalizeAssortment in index.html")

# 2. Update getBottleCount
old_bottle_count = """function getBottleCount(p) {
  const q = qty[p.id] || { bottles: 0, cases: 0 };
  if (p.caseOnly || p.allowSingleBottle === false) return (q.cases || 0) * (p.caseSize || 1);
  return q.bottles || 0;
}"""

new_bottle_count = """function getBottleCount(p) {
  const q = qty[p.id] || { bottles: 0, cases: 0 };
  if (p.caseOnly || p.gebinde === "Pack" || p.allowSingleBottle === false) return (q.cases || 0) * (p.caseSize || 1);
  return q.bottles || ((q.cases || 0) * (p.caseSize || 1));
}"""

if old_bottle_count in content:
    content = content.replace(old_bottle_count, new_bottle_count)
    print("Updated getBottleCount!")
else:
    print("Could not find old getBottleCount in index.html")

# 3. Update getUnitPrice and getItemTotal
old_total_block = """function getUnitPrice(p) {
  return (p.caseSize && p.caseSize > 0) ? (p.price / p.caseSize) : p.price;
}

function getItemTotal(p, q) {
  if (p.caseOnly || p.allowSingleBottle === false) return (q.cases || 0) * p.price;
  if (!p.caseSize || p.caseSize <= 1) return (q.bottles || 0) * p.price;
  const cases = q.cases || Math.floor((q.bottles || 0) / p.caseSize);
  const extraBottles = (q.bottles || 0) % p.caseSize;
  const unitPrice = p.price / p.caseSize;
  return (cases * p.price) + (extraBottles * unitPrice);
}"""

new_total_block = """function getUnitPrice(p) {
  if (p.priceSingle) return p.priceSingle;
  return (p.caseSize && p.caseSize > 0) ? (p.price / p.caseSize) : p.price;
}

function getItemTotal(p, q) {
  if (p.caseOnly || p.gebinde === "Pack" || p.allowSingleBottle === false) {
    return (q.cases || 0) * (p.pricePack || p.price);
  }
  if (!p.caseSize || p.caseSize <= 1 || p.gebinde === "Einzeln") {
    return (q.bottles || 0) * (p.priceSingle || p.price);
  }
  const cases = q.cases || Math.floor((q.bottles || 0) / p.caseSize);
  const extraBottles = (q.bottles || 0) % p.caseSize;
  const packPrice = p.pricePack || p.price;
  const singlePrice = p.priceSingle || (packPrice / p.caseSize);
  return (cases * packPrice) + (extraBottles * singlePrice);
}"""

if old_total_block in content:
    content = content.replace(old_total_block, new_total_block)
    print("Updated getUnitPrice & getItemTotal!")
else:
    print("Could not find old_total_block in index.html")

# 4. Update syncLinkedField
old_sync = """function syncLinkedField(id, changedField) {
  const p = findProduct(id);
  if (!p || !p.caseSize || p.caseOnly) return;
  const q = qty[id];
  if (changedField === "cases") {
    q.bottles = q.cases * p.caseSize;
  } else if (changedField === "bottles") {
    q.cases = Math.floor(q.bottles / p.caseSize);
  }
}"""

new_sync = """function syncLinkedField(id, changedField) {
  const p = findProduct(id);
  if (!p || !p.caseSize || p.caseOnly || p.gebinde === "Pack") return;
  const q = qty[id];
  if (changedField === "cases") {
    q.bottles = q.cases * p.caseSize;
  } else if (changedField === "bottles") {
    q.cases = Math.floor(q.bottles / p.caseSize);
  }
}"""

if old_sync in content:
    content = content.replace(old_sync, new_sync)
    print("Updated syncLinkedField!")
else:
    print("Could not find old syncLinkedField in index.html")

# 5. Update qtyHtml & priceDisplayHtml in renderProducts
old_card_render = """      let qtyHtml = "";
      if (p.caseOnly) {
        qtyHtml = `
          <div class="qty-field">
            <button class="qty-btn" onclick="changeQty('${p.id}','cases',-1)">−</button>
            <input type="number" id="input_${p.id}_cases" min="0" value="${q.cases}" oninput="setQty('${p.id}','cases',this.value)" onfocus="this.select()">
            <button class="qty-btn" onclick="changeQty('${p.id}','cases',1)">+</button>
            <label>${getCaseLabel(p)}</label>
          </div>`;
      } else if (p.caseSize) {
        qtyHtml = `
          <div class="qty-field">
            <button class="qty-btn" onclick="changeQty('${p.id}','bottles',-1)">−</button>
            <input type="number" id="input_${p.id}_bottles" min="0" value="${q.bottles}" oninput="setQty('${p.id}','bottles',this.value)" onfocus="this.select()">
            <button class="qty-btn" onclick="changeQty('${p.id}','bottles',1)">+</button>
            <label>${getUnitLabel(p)}</label>
          </div>
          <div class="qty-field">
            <button class="qty-btn" onclick="changeQty('${p.id}','cases',-1)">−</button>
            <input type="number" id="input_${p.id}_cases" min="0" value="${q.cases}" oninput="setQty('${p.id}','cases',this.value)" onfocus="this.select()">
            <button class="qty-btn" onclick="changeQty('${p.id}','cases',1)">+</button>
            <label>${getCaseLabel(p)}</label>
          </div>`;
      } else {
        qtyHtml = `
          <div class="qty-field">
            <button class="qty-btn" onclick="changeQty('${p.id}','bottles',-1)">−</button>
            <input type="number" id="input_${p.id}_bottles" min="0" value="${q.bottles}" oninput="setQty('${p.id}','bottles',this.value)" onfocus="this.select()">
            <button class="qty-btn" onclick="changeQty('${p.id}','bottles',1)">+</button>
            <label>${getUnitLabel(p, true)}</label>
          </div>`;
      }

      const priceDisplayHtml = isEditPricesMode ? `
        <div class="product-price-box" style="text-align:right;">
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:normal; display:block;">Pack-Preis (CHF):</span>
          <input type="number" step="0.05" min="0" value="${p.price}" onchange="updateProductPrice('${p.id}', this.value)" style="width:85px; padding:6px 8px; font-weight:bold; font-size:1rem; color:var(--accent-dark); border:1px solid var(--accent-border); border-radius:8px; text-align:right;">
        </div>
      ` : `
        <div class="product-price-box">
          <span class="price-val">${money(p.price)}</span>
          <span class="price-sub">${p.caseSize ? '/ Pack (' + money(getUnitPrice(p)) + ' / ' + getUnitLabel(p, true) + ')' : '/ ' + getUnitLabel(p, true)}</span>
        </div>
      `;"""

new_card_render = """      let qtyHtml = "";
      if (p.caseOnly || p.gebinde === "Pack") {
        qtyHtml = `
          <div class="qty-field">
            <button class="qty-btn" onclick="changeQty('${p.id}','cases',-1)">−</button>
            <input type="number" id="input_${p.id}_cases" min="0" value="${q.cases}" oninput="setQty('${p.id}','cases',this.value)" onfocus="this.select()">
            <button class="qty-btn" onclick="changeQty('${p.id}','cases',1)">+</button>
            <label>${getCaseLabel(p)}</label>
          </div>`;
      } else if (p.caseSize && (p.gebinde === "Einzeln & Pack" || (p.allowSingleBottle && p.caseSize > 1))) {
        qtyHtml = `
          <div class="qty-field">
            <button class="qty-btn" onclick="changeQty('${p.id}','bottles',-1)">−</button>
            <input type="number" id="input_${p.id}_bottles" min="0" value="${q.bottles}" oninput="setQty('${p.id}','bottles',this.value)" onfocus="this.select()">
            <button class="qty-btn" onclick="changeQty('${p.id}','bottles',1)">+</button>
            <label>${getUnitLabel(p)}</label>
          </div>
          <div class="qty-field">
            <button class="qty-btn" onclick="changeQty('${p.id}','cases',-1)">−</button>
            <input type="number" id="input_${p.id}_cases" min="0" value="${q.cases}" oninput="setQty('${p.id}','cases',this.value)" onfocus="this.select()">
            <button class="qty-btn" onclick="changeQty('${p.id}','cases',1)">+</button>
            <label>${getCaseLabel(p)}</label>
          </div>`;
      } else {
        qtyHtml = `
          <div class="qty-field">
            <button class="qty-btn" onclick="changeQty('${p.id}','bottles',-1)">−</button>
            <input type="number" id="input_${p.id}_bottles" min="0" value="${q.bottles}" oninput="setQty('${p.id}','bottles',this.value)" onfocus="this.select()">
            <button class="qty-btn" onclick="changeQty('${p.id}','bottles',1)">+</button>
            <label>${getUnitLabel(p, true)}</label>
          </div>`;
      }

      let priceSubText = "";
      if (p.gebinde === "Einzeln & Pack" && p.priceSingle && p.pricePack) {
        priceSubText = `/ Pack (${money(p.priceSingle)} / ${getUnitLabel(p, true)} Einzeln)`;
      } else if (p.caseSize) {
        priceSubText = `/ Pack (${money(getUnitPrice(p))} / ${getUnitLabel(p, true)})`;
      } else {
        priceSubText = `/ ${getUnitLabel(p, true)}`;
      }

      const priceDisplayHtml = isEditPricesMode ? `
        <div class="product-price-box" style="text-align:right;">
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:normal; display:block;">Preis (CHF):</span>
          <input type="number" step="0.05" min="0" value="${p.price}" onchange="updateProductPrice('${p.id}', this.value)" style="width:85px; padding:6px 8px; font-weight:bold; font-size:1rem; color:var(--accent-dark); border:1px solid var(--accent-border); border-radius:8px; text-align:right;">
        </div>
      ` : `
        <div class="product-price-box">
          <span class="price-val">${money(p.price)}</span>
          <span class="price-sub">${priceSubText}</span>
        </div>
      `;"""

if old_card_render in content:
    content = content.replace(old_card_render, new_card_render)
    print("Updated card rendering logic!")
else:
    print("Could not find old_card_render in index.html")

# 6. Update openReview
old_open_review = """  let rows = selected.map(s => `
    <tr>
      <td><strong>${s.product.name}</strong><br><span style="color:var(--text-muted);font-size:0.78rem">Art.-Nr. ${s.product.art}</span></td>
      <td>${s.count} ${getUnitLabel(s.product, true)}</td>
      <td>${money(s.total)}</td>
    </tr>
  `).join("");"""

new_open_review = """  let rows = selected.map(s => {
    let qtyText = `${s.count} ${getUnitLabel(s.product, true)}`;
    if (s.cases > 0 && s.product.caseSize && (s.count % s.product.caseSize !== 0)) {
      const extra = s.count % s.product.caseSize;
      qtyText = `${s.cases} Pack (${s.cases * s.product.caseSize} ${getUnitLabel(s.product, true)}) + ${extra} ${getUnitLabel(s.product, true)} einzeln`;
    } else if (s.cases > 0 && s.product.caseSize) {
      qtyText = `${s.cases} ${getCaseLabel(s.product, true)} (${s.count} ${getUnitLabel(s.product, true)})`;
    }
    return `
    <tr>
      <td><strong>${s.product.name}</strong><br><span style="color:var(--text-muted);font-size:0.78rem">Art.-Nr. ${s.product.art}</span></td>
      <td>${qtyText}</td>
      <td>${money(s.total)}</td>
    </tr>
    `;
  }).join("");"""

if old_open_review in content:
    content = content.replace(old_open_review, new_open_review)
    print("Updated openReview rows logic!")
else:
    print("Could not find old_open_review in index.html")

# Save index.html
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

# Duplicate index.html to getraenke-bestelltool.html
shutil.copy('index.html', 'getraenke-bestelltool.html')
print("Successfully synchronized index.html and getraenke-bestelltool.html!")
