import sys

def add_margin(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    old_logic = """  // Flüssigkeitsbedarf pro Person:
  // 1.0L für die ersten 2 Stunden, danach +0.3L pro weiterer Stunde
  let perPersonLiters = 1.0 + Math.max(0, calcHours - 2) * 0.3;
  if (calcHotWeather) {
    perPersonLiters *= 1.2; // +20% bei Hitze
  }"""
  
    new_logic = """  // Flüssigkeitsbedarf pro Person:
  // 1.0L für die ersten 2 Stunden, danach +0.3L pro weiterer Stunde
  // Standardmässig 20% Sicherheitsmarge auf alle Berechnungen aufschlagen
  let perPersonLiters = (1.0 + Math.max(0, calcHours - 2) * 0.3) * 1.2;
  if (calcHotWeather) {
    perPersonLiters *= 1.2; // zusätzliche +20% bei Hitze
  }"""

    content = content.replace(old_logic, new_logic)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

add_margin("index.html")
add_margin("getraenke-bestelltool.html")
