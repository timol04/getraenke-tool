import sys

def fix_fest_hover(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    old_css = """  .festmaterial-header {
    margin-bottom: 20px;
    border-bottom: 1px solid var(--border-light);
    padding-bottom: 16px;
    transition: all 0.2s ease;
  }
  .festmaterial-section.is-collapsed .festmaterial-header {
    margin-bottom: 0;
    border-bottom: none;
    padding-bottom: 0;
  }"""
  
    new_css = """  .festmaterial-header {
    margin-bottom: 20px;
    border-bottom: 1px solid var(--border-light);
    padding: 10px 14px;
    margin: -10px -14px 20px -14px;
    border-radius: var(--r);
    transition: all 0.2s ease;
  }
  .festmaterial-header:hover {
    background: var(--green-light);
  }
  .festmaterial-section.is-collapsed .festmaterial-header {
    margin-bottom: 0;
    border-bottom: none;
  }"""

    content = content.replace(old_css, new_css)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

fix_fest_hover("index.html")
fix_fest_hover("getraenke-bestelltool.html")
