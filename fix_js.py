import sys

def fix_js_syntax_errors(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # We need to change textContent = "..." to innerHTML = '...' for those containing <i class="...
    
    replacements = [
        (
            'document.getElementById("modalProductTitle").textContent = "<i class="fa-solid fa-plus"></i> Neues Produkt";',
            'document.getElementById("modalProductTitle").innerHTML = \'<i class="fa-solid fa-plus"></i> Neues Produkt\';'
        ),
        (
            'document.getElementById("modalProductTitle").textContent = "<i class="fa-solid fa-pen"></i> Produkt bearbeiten (" + p.art + ")";',
            'document.getElementById("modalProductTitle").innerHTML = \'<i class="fa-solid fa-pen"></i> Produkt bearbeiten (\' + p.art + \')\';'
        ),
        (
            'btn.textContent = "<i class="fa-solid fa-arrow-left" style="margin-right:5px;"></i> Zum Dashboard";',
            'btn.innerHTML = \'<i class="fa-solid fa-arrow-left" style="margin-right:5px;"></i> Zum Dashboard\';'
        ),
        (
            'btn.textContent = "<i class="fa-solid fa-eye" style="margin-right:5px;"></i> Kundenansicht";',
            'btn.innerHTML = \'<i class="fa-solid fa-eye" style="margin-right:5px;"></i> Kundenansicht\';'
        ),
        (
            'btn.textContent = "<i class="fa-solid fa-rocket"></i> Sortiment übertragen";',
            'btn.innerHTML = \'<i class="fa-solid fa-rocket"></i> Sortiment übertragen\';'
        ),
        (
            'document.getElementById("modalFestTitle").textContent = "<i class="fa-solid fa-plus"></i> Neuer Festartikel";',
            'document.getElementById("modalFestTitle").innerHTML = \'<i class="fa-solid fa-plus"></i> Neuer Festartikel\';'
        ),
        (
            'document.getElementById("modalFestTitle").textContent = "<i class="fa-solid fa-pen"></i> Festartikel bearbeiten";',
            'document.getElementById("modalFestTitle").innerHTML = \'<i class="fa-solid fa-pen"></i> Festartikel bearbeiten\';'
        )
    ]
    
    for old, new in replacements:
        content = content.replace(old, new)

    # Let's also check if there are other syntax errors where I replaced emojis inside double quotes
    # e.g., anything matching `="<i class="`
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

fix_js_syntax_errors("index.html")
fix_js_syntax_errors("getraenke-bestelltool.html")
