import sys

def add_status_toggle(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 1. Update status badge logic in renderOrdersTable
    old_badge_logic = """      let statusBadge = `<span style="padding: 4px 8px; border-radius: 12px; background: #FEF3C7; color: #92400E; font-size: 12px; font-weight: bold;">Offen</span>`;
      if (order.status === 'abgeschlossen') {
          statusBadge = `<span style="padding: 4px 8px; border-radius: 12px; background: #D1FAE5; color: #065F46; font-size: 12px; font-weight: bold;">Abgeschlossen</span>`;
      }"""
      
    new_badge_logic = """      let statusBg = "#f1f5f9"; let statusColor = "#475569"; let statusText = "Offen";
      let currentStatus = order.status || "offen";
      
      if (currentStatus === "in_bearbeitung") {
          statusBg = "#fef08a"; statusColor = "#854d0e"; statusText = "In Bearbeitung";
      } else if (currentStatus === "abgeschlossen") {
          statusBg = "#fecaca"; statusColor = "#991b1b"; statusText = "Abgeschlossen";
      }
      
      let statusBadge = `<button onclick="cycleOrderStatus(${order.id}, '${currentStatus}')" style="padding: 4px 10px; border: none; border-radius: 12px; background: ${statusBg}; color: ${statusColor}; font-size: 12px; font-weight: bold; cursor: pointer; transition: opacity 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">${statusText}</button>`;"""
      
    if "cycleOrderStatus" not in content:
        content = content.replace(old_badge_logic, new_badge_logic)

    # 2. Add cycleOrderStatus function
    js_logic = """
async function cycleOrderStatus(id, currentStatus) {
    if (!supabaseClient) return;
    
    let nextStatus = "offen";
    if (currentStatus === "offen") nextStatus = "in_bearbeitung";
    else if (currentStatus === "in_bearbeitung") nextStatus = "abgeschlossen";
    else if (currentStatus === "abgeschlossen") nextStatus = "offen";
    
    // Optimistic UI update
    const orderIndex = currentOrders.findIndex(o => o.id === id);
    if (orderIndex > -1) {
        currentOrders[orderIndex].status = nextStatus;
        renderOrdersTable();
    }
    
    try {
        const { error } = await supabaseClient.from("orders").update({ status: nextStatus }).eq("id", id);
        if (error) throw error;
    } catch (err) {
        console.error("Fehler beim Status Update:", err);
        // revert on error
        if (orderIndex > -1) {
            currentOrders[orderIndex].status = currentStatus;
            renderOrdersTable();
        }
        alert("Status konnte nicht aktualisiert werden.");
    }
}
"""
    if "async function cycleOrderStatus" not in content:
        content = content.replace("function viewOrderDetails(id) {", js_logic + "\nfunction viewOrderDetails(id) {")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

add_status_toggle("index.html")
add_status_toggle("getraenke-bestelltool.html")
