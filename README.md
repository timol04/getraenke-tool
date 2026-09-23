# Landi Getränke-PDF-tool

Ein schlankes, eigenständiges Tool zur Vorbestellung von Getränken für die Landi-Filiale mit automatischer Harassen-Umrechnung und PDF-Erstellung via jsPDF.

## Dateien

* `index.html` (bzw. `getraenke-bestelltool.html`): Die Web-App (HTML, CSS und App-Logik)
* `sortiment.js`: Das Produktsortiment (Preise, Artikelnummern, Gebinde)

## Sortiment anpassen & erweitern

Um Artikel, Preise oder Kategorien zu bearbeiten, muss nur die Datei `sortiment.js` in einem beliebigen Editor bearbeitet werden:

```javascript
{
  art: "10234",                                // Artikelnummer (Pflicht)
  name: "Feldschlösschen Lager, Flasche 33cl", // Name (Pflicht)
  price: 1.60,                                 // Preis pro Stück/Flasche in CHF (Pflicht)
  caseSize: 20,                                // Flaschen pro Harass (optional)
  caseOnly: false,                             // true = nur ganzer Harass (optional)
  deal: false,                                 // true = "solange Vorrat" Badge (optional)
  unit: "flasche"                              // "flasche", "dose", "stk" (optional)
}
```

## Auf GitHub / GitHub Pages veröffentlichen

1. Repository auf GitHub erstellen
2. Die Dateien hochladen (`index.html`, `sortiment.js`, `README.md`)
3. In den GitHub Repository-Einstellungen unter **Pages** den Branch `main` auswählen und speichern.
4. Die Webseite ist sofort unter `https://<dein-benutzername>.github.io/<repo-name>/` weltweit im Browser erreichbar!
