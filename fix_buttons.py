import sys

def fix_buttons(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Fix Aktualisieren button
    old_akt = '<button onclick="loadOrders()" style="white-space: nowrap;">🔄 Aktualisieren</button>'
    new_akt = """<button class="admin-fest-status-btn" onclick="loadOrders()" style="white-space: nowrap; padding: 8px 14px; font-size: 14px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 2v6h6"/></svg>
        Aktualisieren
      </button>"""
    content = content.replace(old_akt, new_akt)

    # 2. Fix Schliessen button at the bottom of Orders modal
    old_schl = """<div style="padding:15px; border-top:1px solid #eee; display:flex; gap:10px;" style="justify-content: flex-end;">
      <button class="secondary" onclick="closeAdminOrdersModal()">Schliessen</button>
    </div>"""
    new_schl = """<div style="padding:15px; border-top:1px solid #eee; display:flex; gap:10px; justify-content:flex-end;">
      <button class="admin-fest-status-btn" style="padding: 8px 16px; font-size: 14px;" onclick="closeAdminOrdersModal()">Schliessen</button>
    </div>"""
    content = content.replace(old_schl, new_schl)

    # 3. Just in case there is another Schliessen button like that in the Retouren modal
    old_schl_ret = """<div style="padding:15px; border-top:1px solid #eee; display:flex; gap:10px;">
      <button class="secondary" onclick="closeAdminReturnModal()">Schliessen</button>"""
    new_schl_ret = """<div style="padding:15px; border-top:1px solid #eee; display:flex; gap:10px; justify-content:flex-end;">
      <button class="admin-fest-status-btn" style="padding: 8px 16px; font-size: 14px;" onclick="closeAdminReturnModal()">Schliessen</button>"""
    content = content.replace(old_schl_ret, new_schl_ret)
    
    # 4. Check if the "Schliessen" button in Order View modal uses the same unstyled class
    old_schl_view = """<div style="padding:15px; border-top:1px solid #eee; display:flex; gap:10px; justify-content:flex-end;">
      <button class="secondary" onclick="closeAdminOrderViewModal()">Schliessen</button>
    </div>"""
    new_schl_view = """<div style="padding:15px; border-top:1px solid #eee; display:flex; gap:10px; justify-content:flex-end;">
      <button class="admin-fest-status-btn" style="padding: 8px 16px; font-size: 14px;" onclick="closeAdminOrderViewModal()">Schliessen</button>
    </div>"""
    content = content.replace(old_schl_view, new_schl_view)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

fix_buttons("index.html")
fix_buttons("getraenke-bestelltool.html")
