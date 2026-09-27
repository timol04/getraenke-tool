/**
 * LANDI FESTBETRIEB & MIETMATERIAL SORTIMENT
 * Separates Sortiment für Mietmobiliar, Einweggeschirr & Festbedarf
 */

var FESTMATERIAL_SORTIMENT = [
  {
    id: "00000",
    art: "00000",
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
    id: "00001",
    art: "00001",
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
    id: "73778",
    art: "73778",
    name: "Gabel Kunststoff 40 Stück",
    category: "Einweggeschirr",
    unitDesc: "Pack à 40 Stk.",
    price: 1.95,
    priceNotice: "",
    note: "Praktischer Festbedarf",
    disabled: false,
    sortOrder: 3
  },
  {
    id: "73783",
    art: "73783",
    name: "Messer Kunststoff 40 Stück",
    category: "Einweggeschirr",
    unitDesc: "Pack à 40 Stk.",
    price: 1.95,
    priceNotice: "",
    note: "Praktischer Festbedarf",
    disabled: false,
    sortOrder: 4
  },
  {
    id: "05458",
    art: "05458",
    name: "Plastikbecher PET klar 3 dl",
    category: "Einweggeschirr",
    unitDesc: "Pack à 50 Stk.",
    price: 4.95,
    priceNotice: "",
    note: "Praktischer Festbedarf",
    disabled: false,
    sortOrder: 5
  },
  {
    id: "05216",
    art: "05216",
    name: "Champagnerglas Plastik 20St",
    category: "Einweggeschirr",
    unitDesc: "Pack à 20 Stk.",
    price: 10.95,
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
