import sys

def fix_js_rpc(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # The original JS insertion looks like this:
    old_js = """          const { data, error } = await supabaseClient.from('orders').insert([{
              items: itemsPayload,
              total_amount: combinedTotal,
              total_deposit: 0 // You can calculate real deposit if needed
          }]).select('id, ref_nr').single();"""
          
    new_js = """          const { data: refNr, error } = await supabaseClient.rpc('submit_order', {
              p_items: itemsPayload,
              p_total: combinedTotal,
              p_deposit: 0
          });"""

    old_js_2 = """          if (data && data.ref_nr) {
              refStr = data.ref_nr;
          }"""
          
    new_js_2 = """          if (refNr) {
              refStr = refNr;
          }"""

    content = content.replace(old_js, new_js)
    content = content.replace(old_js_2, new_js_2)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

fix_js_rpc("index.html")
fix_js_rpc("getraenke-bestelltool.html")
