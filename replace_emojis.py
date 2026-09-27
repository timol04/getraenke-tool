import sys

def replace_emojis(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Add FontAwesome to head
    fa_cdn = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">'
    if "font-awesome" not in content:
        content = content.replace('</head>', f'  {fa_cdn}\n</head>')

    # 2. Replace Emojis in the code
    replacements = {
        "🚀": '<i class="fa-solid fa-rocket"></i>',
        "📥": '<i class="fa-solid fa-download"></i>',
        "📋": '<i class="fa-solid fa-clipboard"></i>',
        "👁️": '<i class="fa-solid fa-eye"></i>',
        "🚪": '<i class="fa-solid fa-arrow-right-from-bracket"></i>',
        "⬅️": '<i class="fa-solid fa-arrow-left"></i>',
        "➕": '<i class="fa-solid fa-plus"></i>',
        "☁️": '<i class="fa-solid fa-cloud"></i>',
        "✏️": '<i class="fa-solid fa-pen"></i>',
        "🗑️": '<i class="fa-solid fa-trash"></i>',
        "🎪": '<i class="fa-solid fa-tent"></i>',
        "📦": '<i class="fa-solid fa-box"></i>',
        "🔐": '<i class="fa-solid fa-lock"></i>',
        "⭐": '<i class="fa-solid fa-star"></i>',
        "🏷️": '<i class="fa-solid fa-tag"></i>',
        "⚠️": '<i class="fa-solid fa-triangle-exclamation"></i>',
        "🍾": '<i class="fa-solid fa-wine-bottle"></i>',
        "🛒": '<i class="fa-solid fa-cart-shopping"></i>'
    }

    for emoji, icon in replacements.items():
        # Only replace if the emoji is actually present to avoid unnecessary overhead
        if emoji in content:
            # Note: We need to be careful with JS alerts, as HTML tags in alerts will be printed literally.
            # Emojis inside JS strings like alert(...) or console.log(...) should probably be kept or removed.
            # To handle this simply, we will first replace in the whole file, but it might break alerts.
            # Let's do a basic global replace for now, since it's an internal admin tool, if an alert shows HTML it's not the end of the world.
            # Actually, let's fix alerts manually in the python script.
            pass

    # A better approach: carefully replace specific blocks where we know they are used in HTML.
    # Dashboard Actions
    content = content.replace('<div class="action-icon-wrap icon-purple">🚀</div>', '<div class="action-icon-wrap icon-purple"><i class="fa-solid fa-rocket"></i></div>')
    content = content.replace('<div class="action-icon-wrap icon-emerald">📥</div>', '<div class="action-icon-wrap icon-emerald"><i class="fa-solid fa-download"></i></div>')
    content = content.replace('<div class="action-icon-wrap icon-amber">📋</div>', '<div class="action-icon-wrap icon-amber"><i class="fa-solid fa-clipboard"></i></div>')
    content = content.replace('<div class="action-icon-wrap icon-teal">👁️</div>', '<div class="action-icon-wrap icon-teal"><i class="fa-solid fa-eye"></i></div>')
    content = content.replace('<div class="action-icon-wrap icon-red">🚪</div>', '<div class="action-icon-wrap icon-red"><i class="fa-solid fa-arrow-right-from-bracket"></i></div>')
    
    content = content.replace("Sortiment übertragen ➔", '<i class="fa-solid fa-rocket" style="margin-right:5px;"></i> Sortiment übertragen')
    content = content.replace("CSV herunterladen ➔", '<i class="fa-solid fa-download" style="margin-right:5px;"></i> CSV herunterladen')
    content = content.replace("Code kopieren ➔", '<i class="fa-solid fa-clipboard" style="margin-right:5px;"></i> Code kopieren')
    content = content.replace("Kundenansicht öffnen ➔", '<i class="fa-solid fa-eye" style="margin-right:5px;"></i> Kundenansicht')
    content = content.replace("Sicher abmelden ➔", '<i class="fa-solid fa-arrow-right-from-bracket" style="margin-right:5px;"></i> Abmelden')
    content = content.replace("⬅️ Zurück zum Admin Dashboard", '<i class="fa-solid fa-arrow-left" style="margin-right:5px;"></i> Zurück zum Admin Dashboard')
    content = content.replace("⬅️ Zum Dashboard", '<i class="fa-solid fa-arrow-left" style="margin-right:5px;"></i> Zum Dashboard')
    content = content.replace("👁️ Kundenansicht", '<i class="fa-solid fa-eye" style="margin-right:5px;"></i> Kundenansicht')

    # Modal Titles
    content = content.replace("🎪 Festmaterial & Mietmobiliar verwalten", '<i class="fa-solid fa-tent"></i> Festmaterial & Mietmobiliar')
    content = content.replace("✏️ Festartikel bearbeiten", '<i class="fa-solid fa-pen"></i> Festartikel bearbeiten')
    content = content.replace("📦 Sortiment-Verwaltung (Admin)", '<i class="fa-solid fa-box"></i> Sortiment-Verwaltung')
    content = content.replace("✏️ Produkt bearbeiten", '<i class="fa-solid fa-pen"></i> Produkt bearbeiten')
    content = content.replace("🔐 Admin Login", '<i class="fa-solid fa-lock"></i> Admin Login')
    content = content.replace("➕ Neues Produkt hinzufügen", '<i class="fa-solid fa-plus"></i> Neues Produkt')
    content = content.replace("➕ Neuer Festartikel", '<i class="fa-solid fa-plus"></i> Neuer Festartikel')

    # Buttons
    content = content.replace("➕ Neues Produkt", '<i class="fa-solid fa-plus"></i> Neues Produkt')
    content = content.replace("➕ Produkt hinzufügen", '<i class="fa-solid fa-plus"></i> Produkt hinzufügen')
    content = content.replace("☁️ In Supabase speichern", '<i class="fa-solid fa-cloud"></i> In Supabase speichern')
    content = content.replace("☁️ Festmaterial erfolgreich in Supabase gesichert", "Festmaterial erfolgreich in Supabase gesichert") # Toast text
    content = content.replace("📥 CSV herunterladen", '<i class="fa-solid fa-download"></i> CSV herunterladen')
    content = content.replace("🚀 Sortiment in Supabase übertragen", '<i class="fa-solid fa-rocket"></i> Sortiment übertragen')

    # Checkboxes & labels
    content = content.replace("⭐ Top-Angebot / Aktion", '<i class="fa-solid fa-star"></i> Top-Angebot / Aktion')
    content = content.replace("🏷️ Eigenmarke", '<i class="fa-solid fa-tag"></i> Eigenmarke')
    content = content.replace("⚠️ Deaktiviert (für Kunden ausblenden)", '<i class="fa-solid fa-triangle-exclamation"></i> Deaktiviert (für Kunden ausblenden)')
    content = content.replace("Nur Eigenmarken 🏷️", "Nur Eigenmarken")
    content = content.replace("Nur Top-Angebote ⭐", "Nur Top-Angebote")

    # Badges
    content = content.replace("🏷️ Eigenmarke</span>", '<i class="fa-solid fa-tag"></i> Eigenmarke</span>')

    # Table Actions
    content = content.replace(">✏️<", '><i class="fa-solid fa-pen"></i><')
    content = content.replace(">🗑️<", '><i class="fa-solid fa-trash"></i><')
    content = content.replace("✏️ Bearbeiten", '<i class="fa-solid fa-pen"></i> Bearbeiten')
    content = content.replace("⚠️ Ausgeblendet", '<i class="fa-solid fa-triangle-exclamation"></i> Ausgeblendet')
    content = content.replace("✓ Aktiv", '<i class="fa-solid fa-check"></i> Aktiv')
    
    # Big delete icon
    content = content.replace('<div style="font-size: 2.8rem; margin-bottom: 10px;">🗑️</div>', '<div style="font-size: 2.8rem; margin-bottom: 10px; color: #ef4444;"><i class="fa-solid fa-trash"></i></div>')
    
    # Tooltips / text
    content = content.replace("ℹ️", '<i class="fa-solid fa-circle-info"></i>')
    content = content.replace("🍾 Getränke", '<i class="fa-solid fa-wine-bottle"></i> Getränke')
    content = content.replace("🎪 Festmaterial & Mietmobiliar", '<i class="fa-solid fa-tent"></i> Festmaterial & Mietmobiliar')
    content = content.replace("🛒", "") # Remove cart emoji from text

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

replace_emojis("index.html")
replace_emojis("getraenke-bestelltool.html")
