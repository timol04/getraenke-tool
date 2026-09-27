/**
 * LANDI FESTBETRIEB & MIETMATERIAL SORTIMENT
 * Separates Sortiment für Mietmobiliar, Einweggeschirr & Festbedarf
 */

var FESTMATERIAL_SORTIMENT = [
  {
    id: "fest-garnitur",
    art: "91001",
    name: "Festtisch-Garnitur",
    category: "Mietmobiliar",
    unitDesc: "1 Tisch + 2 Bänke (220 x 60 cm)",
    price: 0,
    priceNotice: "Preis auf Anfrage / nach Vereinbarung",
    note: "Auf Anfrage / je nach Verfügbarkeit",
    disabled: false,
    sortOrder: 1
  },
  {
    id: "fest-kuehlschrank",
    art: "91002",
    name: "Event-Flaschenkühlschrank (Glasfront)",
    category: "Mietmobiliar",
    unitDesc: "Grosser Event-Kühlschrank (230V)",
    price: 0,
    priceNotice: "Preis auf Anfrage / nach Vereinbarung",
    note: "Auf Anfrage / je nach Verfügbarkeit",
    disabled: false,
    sortOrder: 2
  },
  {
    id: "geschirr-gabeln",
    art: "92001",
    name: "Einweg-Gabeln",
    category: "Einweggeschirr",
    unitDesc: "Pack à 50 Stk.",
    price: 3.50,
    priceNotice: "",
    note: "Praktischer Festbedarf",
    disabled: false,
    sortOrder: 3
  },
  {
    id: "geschirr-messer",
    art: "92002",
    name: "Einweg-Messer",
    category: "Einweggeschirr",
    unitDesc: "Pack à 50 Stk.",
    price: 3.50,
    priceNotice: "",
    note: "Praktischer Festbedarf",
    disabled: false,
    sortOrder: 4
  },
  {
    id: "geschirr-trinkbecher",
    art: "92003",
    name: "Trinkbecher (Bier/Softdrinks)",
    category: "Einweggeschirr",
    unitDesc: "Pack à 50 Stk. (Ausschank 3dl / 4dl)",
    price: 6.90,
    priceNotice: "",
    note: "Praktischer Festbedarf",
    disabled: false,
    sortOrder: 5
  },
  {
    id: "geschirr-weinbecher",
    art: "92004",
    name: "Weinbecher / Apérobecher",
    category: "Einweggeschirr",
    unitDesc: "Pack à 25 Stk. (Glasklar)",
    price: 5.50,
    priceNotice: "",
    note: "Praktischer Festbedarf",
    disabled: false,
    sortOrder: 6
  }
];

if (typeof window !== "undefined") {
  window.FESTMATERIAL_SORTIMENT = FESTMATERIAL_SORTIMENT;
  window.DEFAULT_FESTMATERIAL = FESTMATERIAL_SORTIMENT;
}
