import sys

def fix_js_rpc_return(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # The actual JS in the file:
    old_js = """          if (!error && data) {
              ref = data.ref_nr || String(data.id).padStart(6, '0');
              supabaseOrderId = data.id;
          }"""
          
    new_js = """          if (!error && refNr) {
              ref = refNr;
          }"""
          
    # And we also need to change `if (!error && data)` to `if (!error && refNr)` where refNr is the new alias
    
    # Let's just use string replacement
    content = content.replace(old_js, new_js)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

fix_js_rpc_return("index.html")
fix_js_rpc_return("getraenke-bestelltool.html")
