import sys

def fix_delete_order(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # The replace affected deleteOrder(id). We need to change it back.
    # deleteOrder is at the bottom of the file
    old_block = """async function deleteOrder(id) {
  if (!confirm("Bestellung wirklich löschen?")) return;
  if (!supabaseClient) return;
  
  // Falls die ID in currentOrder für Details geöffnet ist
  if (currentOrder && currentOrder.id === id) {
      closeOrderDetailsModal();
  }
  
  try {
      const { error } = await supabaseClient.from('feedbacks').delete().eq('id', id);"""
    new_block = """async function deleteOrder(id) {
  if (!confirm("Bestellung wirklich löschen?")) return;
  if (!supabaseClient) return;
  
  // Falls die ID in currentOrder für Details geöffnet ist
  if (currentOrder && currentOrder.id === id) {
      closeOrderDetailsModal();
  }
  
  try {
      const { error } = await supabaseClient.from('orders').delete().eq('id', id);"""

    if old_block in content:
        content = content.replace(old_block, new_block)
    else:
        print(f"Could not find deleteOrder block in {filepath}")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

fix_delete_order("index.html")
fix_delete_order("getraenke-bestelltool.html")
