import sys

def replace_dash_icons(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # The actual HTML in the file:
    reps = [
        ('<div class="action-icon-wrap icon-green">📦</div>', '<div class="action-icon-wrap icon-green"><i class="fa-solid fa-box"></i></div>'),
        ('<div class="action-icon-wrap icon-gold">🎪</div>', '<div class="action-icon-wrap icon-gold"><i class="fa-solid fa-tent"></i></div>'),
        ('<div class="action-icon-wrap icon-green">📋</div>', '<div class="action-icon-wrap icon-green"><i class="fa-solid fa-clipboard"></i></div>'),
        ('<div class="action-icon-wrap icon-gold">🎯</div>', '<div class="action-icon-wrap icon-gold"><i class="fa-solid fa-bullseye"></i></div>'),
        ('<div class="action-icon-wrap icon-blue">☁️</div>', '<div class="action-icon-wrap icon-blue"><i class="fa-solid fa-cloud"></i></div>')
    ]

    for old, new in reps:
        content = content.replace(old, new)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

replace_dash_icons("index.html")
replace_dash_icons("getraenke-bestelltool.html")
