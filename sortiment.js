/**
 * ====================================================================
 * LANDI GETRÄNKE-SORTIMENT
 * ====================================================================
 * 
 * Hier kannst du alle Produkte und Kategorien ganz einfach pflegen,
 * ohne den Code des eigentlichen Bestelltools anpassen zu müssen.
 * 
 * ANLEITUNG:
 * ----------
 * Jedes Produkt hat folgende Felder:
 * 
 * PFLICHTFELDER:
 *   art:       Artikelnummer als Text, z. B. "10234"
 *   name:      Bezeichnung des Produkts, z. B. "Feldschlösschen Lager 33cl"
 *   price:     Preis in CHF als Zahl mit Punkt, z. B. 1.60
 * 
 * OPTIONALE FELDER (können weggelassen werden):
 *   caseSize:  Anzahl Flaschen pro Harass (z. B. 20 oder 6).
 *              Wenn angegeben, kann der Kunde Flaschen ODER ganze Harasse wählen.
 *   caseOnly:  true -> Produkt wird NUR als ganzer Harass/Karton verkauft.
 *   deal:      true -> Zeigt den roten Hinweis "solange Vorrat" an.
 *   unit:      "flasche" (Standard) | "stk" | "dose"
 * 
 * HINWEIS:
 * - Achte darauf, dass nach jedem Eintrag (ausser dem letzten) ein Komma steht.
 * - Texte müssen immer in Anführungszeichen stehen ("...").
 */

const CATEGORIES = [
  {
    name: "Bier",
    items: [
      { art: "10234", name: "Feldschlösschen Lager, Flasche 33cl", price: 1.60, caseSize: 20 },
      { art: "10235", name: "Feldschlösschen Lager, Dose 50cl", price: 1.40, caseSize: 24, unit: "dose" },
      { art: "10240", name: "Quöllfrisch, Flasche 33cl", price: 1.95, caseSize: 20 },
    ]
  },
  {
    name: "Wein",
    items: [
      { art: "20110", name: "Fendant AOC, Rotwein 75cl", price: 12.90, caseSize: 6 },
      { art: "20115", name: "Pinot Noir AOC 75cl", price: 14.50, caseSize: 6 },
      { art: "20120", name: "Chasselas AOC 75cl", price: 11.20, caseSize: 6 },
    ]
  },
  {
    name: "Süssgetränke",
    items: [
      { art: "30010", name: "Coca-Cola 1.5L", price: 2.30, caseSize: 6 },
      { art: "30011", name: "Coca-Cola Zero 1.5L", price: 2.30, caseSize: 6 },
      { art: "30020", name: "Sinalco 1.5L", price: 1.95, caseSize: 6 },
    ]
  },
  {
    name: "Mineralwasser",
    items: [
      { art: "40001", name: "Mineralwasser prickelnd 1.5L", price: 0.95, caseSize: 6 },
      { art: "40002", name: "Mineralwasser still 1.5L", price: 0.95, caseSize: 6 },
      { art: "40010", name: "Wasser Zitrone 1.5L", price: 1.20, caseSize: 6 },
    ]
  }
];
