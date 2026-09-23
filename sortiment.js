/**
 * ====================================================================
 * LANDI GETRÄNKE-SORTIMENT (Stand 23.9.2026 - Quelle: landi_getränke_sortiment23.9.26.xlsx)
 * ====================================================================
 */

const CATEGORIES = [
  {
    "name": "Top-Angebote",
    "items": [
      {
        "art": "109340",
        "name": "Bier Moretti Dose 24x33cl",
        "price": 20.95,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 20.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "68896",
        "name": "Bier Moretti Dose 24x50cl",
        "price": 29.5,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 29.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "113708",
        "name": "Bier Moretti Sale d. M. 24x33cl",
        "price": 26.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 26.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "109408",
        "name": "Bier Peroni Dose 24x33cl",
        "price": 19.95,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 19.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "105553",
        "name": "Bier Quoellfrisch 24x33cl",
        "price": 19.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 19.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "88317",
        "name": "Bier Quoellfrisch Dose 24x50cl",
        "price": 29.95,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 29.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "35398",
        "name": "Coca-Cola Dose 24 × 33 cl",
        "price": 14.95,
        "gebinde": "Einzeln & Pack",
        "unit": "dose",
        "priceSingle": 0.65,
        "pricePack": 14.95,
        "caseSize": 24,
        "allowSingleBottle": true,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "35400",
        "name": "Coca-Cola Zero Dose 24 × 33 cl",
        "price": 14.95,
        "gebinde": "Einzeln & Pack",
        "unit": "dose",
        "priceSingle": 0.65,
        "pricePack": 14.95,
        "caseSize": 24,
        "allowSingleBottle": true,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "16800",
        "name": "El Pescaito 75 cl",
        "price": 4.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 4.95,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "16149",
        "name": "Energy Drink Red Bull Dose 24 × 25 cl",
        "price": 29.95,
        "gebinde": "Einzeln & Pack",
        "unit": "dose",
        "priceSingle": 1.25,
        "pricePack": 29.95,
        "caseSize": 24,
        "allowSingleBottle": true,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "50898",
        "name": "Eve Strawberry Mojito 10x27.5cl",
        "price": 17.25,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 17.25,
        "caseSize": 10,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "111698",
        "name": "Farmer Bier Lager Dose 24x33cl",
        "price": 11.95,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 11.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "88632",
        "name": "Focus Water Active 12 × 50 cl",
        "price": 14.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 14.95,
        "caseSize": 12,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "87544",
        "name": "Fruchtcocktail Granini 6 × 100 cl",
        "price": 13.3,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 2.25,
        "pricePack": 13.3,
        "caseSize": 6,
        "allowSingleBottle": true,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "61650",
        "name": "Heida 75 cl",
        "price": 11.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "priceSingle": 11.95,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "46003",
        "name": "Lagerbier Feld. Original 24x50cl",
        "price": 27.6,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 27.6,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "68904",
        "name": "Lemon Soda 24 × 33 cl",
        "price": 15.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 15.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "52804",
        "name": "Moscato Mosketto 75 cl",
        "price": 5.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "priceSingle": 5.95,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "87543",
        "name": "Orangensaft Granini 6 × 100 cl",
        "price": 13.3,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 2.25,
        "pricePack": 13.3,
        "caseSize": 6,
        "allowSingleBottle": true,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "15526",
        "name": "Panaché Bilz Himbeere 10 × 33 cl",
        "price": 10.85,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 10.85,
        "caseSize": 10,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "41624",
        "name": "Rivella blau 24 × 50 cl",
        "price": 27.5,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 27.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "40938",
        "name": "Rivella rot 24 × 50 cl",
        "price": 27.5,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 27.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "82128",
        "name": "San Pellegrino Chino 24 × 33 cl",
        "price": 16.5,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 16.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "82126",
        "name": "San Pellegrino L'Aranc. 24×33cl",
        "price": 16.5,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 16.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "54906",
        "name": "Sauser m.A. Ramseier 6 × 50 cl",
        "price": 10.95,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 1.85,
        "pricePack": 10.95,
        "caseSize": 6,
        "allowSingleBottle": true,
        "topAngebot": true,
        "deal": true
      },
      {
        "art": "16869",
        "name": "Triasso Rosso Biologico 75 cl",
        "price": 8.5,
        "gebinde": "Pack",
        "unit": "flasche",
        "priceSingle": 8.5,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true,
        "deal": true
      }
    ]
  },
  {
    "name": "Mineralwasser",
    "items": [
      {
        "art": "02166",
        "name": "Henniez blau 6 × 50 cl",
        "price": 4.7,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.8,
        "pricePack": 4.7,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "87512",
        "name": "Henniez grün 6 × 50 cl",
        "price": 4.7,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.8,
        "pricePack": 4.7,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "87507",
        "name": "Henniez rot 6 × 50 cl",
        "price": 4.7,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.8,
        "pricePack": 4.7,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "87524",
        "name": "Mineralwasser Farmer blau 6×150cl",
        "price": 3.65,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.65,
        "pricePack": 3.65,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "09018",
        "name": "Mineralwasser Farmer blau 6×50cl",
        "price": 3.2,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.55,
        "pricePack": 3.2,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "87534",
        "name": "Mineralwasser Farmer grün 6×150cl",
        "price": 3.65,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.65,
        "pricePack": 3.65,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "09015",
        "name": "Mineralwasser Farmer grün 6×50cl",
        "price": 3.2,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.55,
        "pricePack": 3.2,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "87523",
        "name": "Mineralwasser Farmer rot 6×150cl",
        "price": 3.65,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.65,
        "pricePack": 3.65,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "12356",
        "name": "Mineralwasser Farmer rot 6×50cl",
        "price": 3.2,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.55,
        "pricePack": 3.2,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "35282",
        "name": "Quintus Quelle blau 6 × 150 cl",
        "price": 1.95,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.35,
        "pricePack": 1.95,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "45516",
        "name": "Quintus Quelle rot 6 ×150 cl",
        "price": 1.95,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.35,
        "pricePack": 1.95,
        "caseSize": 6,
        "allowSingleBottle": true
      }
    ]
  },
  {
    "name": "Süssgetränke",
    "items": [
      {
        "art": "38358",
        "name": "Capri Sun Multivitamin 15 × 33 cl",
        "price": 18.0,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 1.2,
        "pricePack": 18.0,
        "caseSize": 15,
        "allowSingleBottle": true
      },
      {
        "art": "34965",
        "name": "Capri Sun Orange-Peach 15×33cl",
        "price": 17.95,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 1.2,
        "pricePack": 17.95,
        "caseSize": 15,
        "allowSingleBottle": true
      },
      {
        "art": "95913",
        "name": "Citro Farmer zéro 6 × 150 cl",
        "price": 3.55,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.6,
        "pricePack": 3.55,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "95926",
        "name": "Citro Farmer zéro 6 × 50 cl",
        "price": 3.18,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.55,
        "pricePack": 3.18,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "13152",
        "name": "Coca-Cola 8 × 150 cl",
        "price": 16.45,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 2.1,
        "pricePack": 16.45,
        "caseSize": 8,
        "allowSingleBottle": true
      },
      {
        "art": "35378",
        "name": "Coca-Cola 8 × 50 cl",
        "price": 11.45,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 1.45,
        "pricePack": 11.45,
        "caseSize": 8,
        "allowSingleBottle": true
      },
      {
        "art": "35398",
        "name": "Coca-Cola Dose 24 × 33 cl",
        "price": 14.95,
        "gebinde": "Einzeln & Pack",
        "unit": "dose",
        "priceSingle": 0.65,
        "pricePack": 14.95,
        "caseSize": 24,
        "allowSingleBottle": true,
        "topAngebot": true
      },
      {
        "art": "13153",
        "name": "Coca-Cola Zero 8 × 150 cl",
        "price": 16.45,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 2.1,
        "pricePack": 16.45,
        "caseSize": 8,
        "allowSingleBottle": true
      },
      {
        "art": "35376",
        "name": "Coca-Cola Zero 8 × 50 cl",
        "price": 11.45,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 1.45,
        "pricePack": 11.45,
        "caseSize": 8,
        "allowSingleBottle": true
      },
      {
        "art": "35400",
        "name": "Coca-Cola Zero Dose 24 × 33 cl",
        "price": 14.95,
        "gebinde": "Einzeln & Pack",
        "unit": "dose",
        "priceSingle": 0.65,
        "pricePack": 14.95,
        "caseSize": 24,
        "allowSingleBottle": true,
        "topAngebot": true
      },
      {
        "art": "78009",
        "name": "Cola Farmer zéro 6 × 150 cl",
        "price": 3.55,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.6,
        "pricePack": 3.55,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "41741",
        "name": "Cranberry Farmer 4 × 100 cl",
        "price": 6.95,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 1.75,
        "pricePack": 6.95,
        "caseSize": 4,
        "allowSingleBottle": true
      },
      {
        "art": "96103",
        "name": "Direkt Orangensaft Farmer 6×100cl",
        "price": 14.7,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 2.45,
        "pricePack": 14.7,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "88632",
        "name": "Focus Water Active 12 × 50 cl",
        "price": 14.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 14.95,
        "caseSize": 12,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "87544",
        "name": "Fruchtcocktail Granini 6 × 100 cl",
        "price": 13.3,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 2.25,
        "pricePack": 13.3,
        "caseSize": 6,
        "allowSingleBottle": true,
        "topAngebot": true
      },
      {
        "art": "99712",
        "name": "Grapefruit Farmer zéro 6×150cl",
        "price": 3.55,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.6,
        "pricePack": 3.55,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "87810",
        "name": "Holunder-Melisse Farmer 6 × 150 cl",
        "price": 6.9,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 1.15,
        "pricePack": 6.9,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "09022",
        "name": "Holunder-Melisse Farmer 6×50cl",
        "price": 5.55,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.95,
        "pricePack": 5.55,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "87708",
        "name": "Ice Tea Farmer Lemon 6 × 150 cl",
        "price": 3.95,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.7,
        "pricePack": 3.95,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "09014",
        "name": "Ice Tea Farmer Lemon 6 × 50 cl",
        "price": 2.95,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.5,
        "pricePack": 2.95,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "82220",
        "name": "Ice Tea Farmer Mint 6 × 150 cl",
        "price": 4.95,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.85,
        "pricePack": 4.95,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "95909",
        "name": "Ice Tea Farmer Mint 6 × 50 cl",
        "price": 3.5,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.6,
        "pricePack": 3.5,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "87709",
        "name": "Ice Tea Farmer Peach 6 × 150 cl",
        "price": 3.95,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.7,
        "pricePack": 3.95,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "09017",
        "name": "Ice Tea Farmer Peach 6 × 50 cl",
        "price": 2.95,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.5,
        "pricePack": 2.95,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "68904",
        "name": "Lemon Soda 24 × 33 cl",
        "price": 15.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 15.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "51528",
        "name": "Multivitamin Farmer 6 × 100 cl",
        "price": 9.55,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 1.6,
        "pricePack": 9.55,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "42617",
        "name": "Orangensaft Farmer 6 × 100 cl",
        "price": 7.8,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 1.3,
        "pricePack": 7.8,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "87543",
        "name": "Orangensaft Granini 6 × 100 cl",
        "price": 13.3,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 2.25,
        "pricePack": 13.3,
        "caseSize": 6,
        "allowSingleBottle": true,
        "topAngebot": true
      },
      {
        "art": "41624",
        "name": "Rivella blau 24 × 50 cl",
        "price": 27.5,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 27.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "40938",
        "name": "Rivella rot 24 × 50 cl",
        "price": 27.5,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 27.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "46020",
        "name": "Rivella rot 8 × 50 cl",
        "price": 11.95,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 1.5,
        "pricePack": 11.95,
        "caseSize": 8,
        "allowSingleBottle": true
      },
      {
        "art": "82128",
        "name": "San Pellegrino Chino 24 × 33 cl",
        "price": 16.5,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 16.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "82126",
        "name": "San Pellegrino L'Aranc. 24×33cl",
        "price": 16.5,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 16.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "87743",
        "name": "Sauser m.A. Ramseier 6 × 100 cl",
        "price": 19.3,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 3.25,
        "pricePack": 19.3,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "54906",
        "name": "Sauser m.A. Ramseier 6 × 50 cl",
        "price": 10.95,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 1.85,
        "pricePack": 10.95,
        "caseSize": 6,
        "allowSingleBottle": true,
        "topAngebot": true
      },
      {
        "art": "78099",
        "name": "Schnitzwasser Farmer 6 × 150 cl",
        "price": 6.9,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 1.15,
        "pricePack": 6.9,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "85041",
        "name": "Schnitzwasser Farmer 6 × 50 cl",
        "price": 5.55,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.95,
        "pricePack": 5.55,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "41743",
        "name": "Traubensaft Farmer rot 4 × 100 cl",
        "price": 6.25,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 1.6,
        "pricePack": 6.25,
        "caseSize": 4,
        "allowSingleBottle": true
      },
      {
        "art": "87319",
        "name": "Vitaminwater Farmer Zitrone 6×50cl",
        "price": 4.5,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.75,
        "pricePack": 4.5,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "52617",
        "name": "Citro Elmer 8 × 150 cl",
        "price": 15.8,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 2.0,
        "pricePack": 15.8,
        "caseSize": 8,
        "allowSingleBottle": true
      },
      {
        "art": "02721",
        "name": "Citro Elmer 6 × 50 cl",
        "price": 8.1,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 1.35,
        "pricePack": 8.1,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "100062",
        "name": "Grapefruit Farmer zéro 6×50cl",
        "price": 3.2,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.55,
        "pricePack": 3.2,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "103082",
        "name": "Multi-ACE Farmer 6 × 100 cl",
        "price": 8.5,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 1.45,
        "pricePack": 8.5,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "68903",
        "name": "Oran Soda 24 × 33 cl",
        "price": 15.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 15.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "100060",
        "name": "Orange Farmer zéro 6 × 150 cl",
        "price": 3.55,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.6,
        "pricePack": 3.55,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "100064",
        "name": "Orange Farmer zéro 6 × 50 cl",
        "price": 3.2,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.55,
        "pricePack": 3.2,
        "caseSize": 6,
        "allowSingleBottle": true
      }
    ]
  },
  {
    "name": "Energy Drinks/Mate",
    "items": [
      {
        "art": "16149",
        "name": "Energy Drink Red Bull Dose 24 × 25 cl",
        "price": 29.95,
        "gebinde": "Einzeln & Pack",
        "unit": "dose",
        "priceSingle": 1.25,
        "pricePack": 29.95,
        "caseSize": 24,
        "allowSingleBottle": true,
        "topAngebot": true
      },
      {
        "art": "87800",
        "name": "Energy Drink Red Bull Dose 6 × 25 cl",
        "price": 8.9,
        "gebinde": "Einzeln & Pack",
        "unit": "dose",
        "priceSingle": 1.5,
        "pricePack": 8.9,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "38994",
        "name": "Energy Drink Red Bull Sugarfree 6 × 25 cl",
        "price": 8.9,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 1.5,
        "pricePack": 8.9,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "98124",
        "name": "Farmer Energy Drink Dose 24 × 25 cl",
        "price": 11.8,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 11.8,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "98125",
        "name": "Farmer Energy Drink Dose 25 cl",
        "price": 0.5,
        "gebinde": "Einzeln",
        "unit": "dose",
        "priceSingle": 0.5,
        "allowSingleBottle": true
      },
      {
        "art": "101743",
        "name": "Energy Drink Farmer Dose 24 × 25 cl",
        "price": 9.4,
        "gebinde": "Einzeln & Pack",
        "unit": "dose",
        "priceSingle": 0.4,
        "pricePack": 9.4,
        "caseSize": 24,
        "allowSingleBottle": true
      },
      {
        "art": "101794",
        "name": "Energy Drink Farmer s.f. 24 × 25 cl",
        "price": 9.4,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.4,
        "pricePack": 9.4,
        "caseSize": 24,
        "allowSingleBottle": true
      },
      {
        "art": "103976",
        "name": "Farmer Mate 6 × 33 cl",
        "price": 5.95,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 1.0,
        "pricePack": 5.95,
        "caseSize": 6,
        "allowSingleBottle": true
      },
      {
        "art": "114544",
        "name": "Farmer Mate zéro Dose 6 × 33 cl",
        "price": 5.95,
        "gebinde": "Einzeln & Pack",
        "unit": "dose",
        "priceSingle": 1.0,
        "pricePack": 5.95,
        "caseSize": 6,
        "allowSingleBottle": true
      }
    ]
  },
  {
    "name": "Biere",
    "items": [
      {
        "art": "45949",
        "name": "Amberbier Farmer Dose 18x50cl",
        "price": 13.5,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 13.5,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "46423",
        "name": "Amberbier Farmer Dose 50cl",
        "price": 0.75,
        "gebinde": "Einzeln",
        "unit": "dose",
        "priceSingle": 0.75,
        "allowSingleBottle": true
      },
      {
        "art": "52950",
        "name": "Bier Amber Oberland Prem. 6x33cl",
        "price": 9.2,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 9.2,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "63459",
        "name": "Bier Boxer old 18x25cl",
        "price": 16.5,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 16.5,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "75827",
        "name": "Bier Boxer old 24x33cl",
        "price": 19.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 19.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "32224",
        "name": "Bier Boxer old Dose 6x50cl",
        "price": 9.95,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 9.95,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "10639",
        "name": "Bier Boxer old MW 33cl",
        "price": 1.65,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 1.65,
        "allowSingleBottle": true
      },
      {
        "art": "87373",
        "name": "Bier Boxer old MW 50cl",
        "price": 1.8,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 1.8,
        "allowSingleBottle": true
      },
      {
        "art": "32729",
        "name": "Bier Calanda Dose 24x50cl",
        "price": 30.95,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 30.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "51891",
        "name": "Bier Calanda Glatsch 6x50cl",
        "price": 11.2,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 11.2,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "18249",
        "name": "Bier Calanda Radler 10x33cl",
        "price": 12.5,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 12.5,
        "caseSize": 10,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87344",
        "name": "Bier Cardinal Blonde MW 33cl",
        "price": 1.4,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 1.4,
        "allowSingleBottle": true
      },
      {
        "art": "87341",
        "name": "Bier Cardinal Blonde MW 50cl",
        "price": 1.75,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 1.75,
        "allowSingleBottle": true
      },
      {
        "art": "96173",
        "name": "Bier Chopfab Draft 10x33cl",
        "price": 11.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 11.95,
        "caseSize": 10,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "68192",
        "name": "Bier Desperados Tequilla 6x50cl",
        "price": 13.2,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 13.2,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "63449",
        "name": "Bier Draft Oberland 6x33cl",
        "price": 9.2,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 9.2,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87447",
        "name": "Bier Farmer dunkel 6x33cl",
        "price": 6.55,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 6.55,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87309",
        "name": "Bier Farmer Erdb.-Rhab. 10x33cl",
        "price": 9.55,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 9.55,
        "caseSize": 10,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87453",
        "name": "Bier Farmer Litchi 10x33cl",
        "price": 9.55,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 9.55,
        "caseSize": 10,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "38092",
        "name": "Bier Farmer Naturtrueb 50cl",
        "price": 0.75,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 0.75,
        "allowSingleBottle": true
      },
      {
        "art": "38093",
        "name": "Bier Farmer Naturtrueb Dose 18x50cl",
        "price": 13.5,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 13.5,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "111264",
        "name": "Bier Feld. Braufrisch Dose 12x50cl",
        "price": 19.95,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 19.95,
        "caseSize": 12,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "12805",
        "name": "Bier Feld. Buegel MW 50cl",
        "price": 2.1,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 2.1,
        "allowSingleBottle": true
      },
      {
        "art": "104236",
        "name": "Bier Feld. Pils Dose 6x50cl",
        "price": 11.5,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 11.5,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "77382",
        "name": "Bier Ginger Appenzeller 6x33cl",
        "price": 15.25,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 15.25,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "91683",
        "name": "Bier Moretti Dose 12x50cl",
        "price": 19.95,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 19.95,
        "caseSize": 12,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "109340",
        "name": "Bier Moretti Dose 24x33cl",
        "price": 20.95,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 20.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "68896",
        "name": "Bier Moretti Dose 24x50cl",
        "price": 29.5,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 29.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "107843",
        "name": "Bier Moretti EW 15x33cl",
        "price": 18.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 18.95,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "109341",
        "name": "Bier Moretti Limone 3x33cl",
        "price": 4.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 4.95,
        "caseSize": 3,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "113708",
        "name": "Bier Moretti Sale d. M. 24x33cl",
        "price": 26.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 26.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "107846",
        "name": "Bier Moretti Sale d. M. 6x33cl",
        "price": 8.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 8.95,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "102400",
        "name": "Bier Moretti XL 15x66cl",
        "price": 25.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 25.95,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "88309",
        "name": "Bier Pale Ale Farmer Dose 18x50cl",
        "price": 14.4,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 14.4,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "88308",
        "name": "Bier Pale Ale Farmer Dose 50cl",
        "price": 0.8,
        "gebinde": "Einzeln",
        "unit": "dose",
        "priceSingle": 0.8,
        "allowSingleBottle": true
      },
      {
        "art": "109408",
        "name": "Bier Peroni Dose 24x33cl",
        "price": 19.95,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 19.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "75884",
        "name": "Bier Quoellfrisch 15x33cl",
        "price": 15.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 15.95,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "105553",
        "name": "Bier Quoellfrisch 24x33cl",
        "price": 19.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 19.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "89515",
        "name": "Bier Quoellfrisch Dose 15x50cl",
        "price": 23.95,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 23.95,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "88317",
        "name": "Bier Quoellfrisch Dose 24x50cl",
        "price": 29.95,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 29.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "45951",
        "name": "Bier Quoellfrisch Dose 6x50cl",
        "price": 10.85,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 10.85,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87444",
        "name": "Bier Quoellfrisch MW 50cl",
        "price": 1.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 1.95,
        "allowSingleBottle": true
      },
      {
        "art": "87442",
        "name": "Bier Rugenbraeu Zwickel MW 50cl",
        "price": 2.0,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 2.0,
        "allowSingleBottle": true
      },
      {
        "art": "35247",
        "name": "Bier Sagres 24x25cl",
        "price": 15.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 15.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "34810",
        "name": "Bier Schuetzengarten Edelspez 6x33cl",
        "price": 8.3,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 8.3,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87428",
        "name": "Bier Schuetzengarten Edelspez MW 33cl",
        "price": 1.55,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 1.55,
        "allowSingleBottle": true
      },
      {
        "art": "87425",
        "name": "Bier Schuetzengarten Kl.braeu MW 50cl",
        "price": 1.8,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 1.8,
        "allowSingleBottle": true
      },
      {
        "art": "57529",
        "name": "Bier Superbock 24x25cl",
        "price": 17.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 17.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "97497",
        "name": "Bier Valaisanne Juicy IPA 4x33cl",
        "price": 10.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 10.95,
        "caseSize": 4,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "34436",
        "name": "Bier Valaisanne Lager 12x33cl",
        "price": 14.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 14.95,
        "caseSize": 12,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "15524",
        "name": "Bier Valaisanne Lager 18x33cl",
        "price": 17.5,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 17.5,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "77381",
        "name": "Bier Valaisanne Lager 6x50cl",
        "price": 11.9,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 11.9,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "15107",
        "name": "Bier Zitronen Panache 15x33cl",
        "price": 14.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 14.95,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "109412",
        "name": "BrewDog Wingman 4x33cl",
        "price": 9.5,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 9.5,
        "caseSize": 4,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "72340",
        "name": "Calanda Radler Zitrone 24x50cl",
        "price": 27.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 27.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "40899",
        "name": "Cardinal Lager EW 15x33cl",
        "price": 17.5,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 17.5,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "15492",
        "name": "Corona Extra Bier 6x33cl",
        "price": 7.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 7.95,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "61762",
        "name": "Eve Grape Cosmop. 4x27.5cl",
        "price": 9.45,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 9.45,
        "caseSize": 4,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87351",
        "name": "Eve Litchi 4x27.5cl",
        "price": 9.45,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 9.45,
        "caseSize": 4,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "32882",
        "name": "Eve Pink Mimosa 4x27.5cl",
        "price": 9.45,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 9.45,
        "caseSize": 4,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "50898",
        "name": "Eve Strawberry Mojito 10x27.5cl",
        "price": 17.25,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 17.25,
        "caseSize": 10,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "111698",
        "name": "Farmer Bier Lager Dose 24x33cl",
        "price": 11.95,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 11.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "26917",
        "name": "Lagerbier Eichhof Do. 24x50cl",
        "price": 30.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 30.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87260",
        "name": "Lagerbier Eichhof Dose 6x50cl",
        "price": 9.95,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 9.95,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "66227",
        "name": "Lagerbier Eichhof hell 20x33cl",
        "price": 17.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 17.95,
        "caseSize": 20,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87391",
        "name": "Lagerbier Eichhof MW 50cl",
        "price": 1.55,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 1.55,
        "allowSingleBottle": true
      },
      {
        "art": "51734",
        "name": "Lagerbier Farmer 18x33cl",
        "price": 9.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 9.95,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "26980",
        "name": "Lagerbier Farmer Dose 18x50cl",
        "price": 10.8,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 10.8,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87448",
        "name": "Lagerbier Farmer Dose 50cl",
        "price": 0.6,
        "gebinde": "Einzeln",
        "unit": "dose",
        "priceSingle": 0.6,
        "allowSingleBottle": true
      },
      {
        "art": "87450",
        "name": "Lagerbier Farmer MW 50cl",
        "price": 0.6,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 0.6,
        "allowSingleBottle": true
      },
      {
        "art": "87305",
        "name": "Lagerbier Feld. Original 10x33cl",
        "price": 12.5,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 12.5,
        "caseSize": 10,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "111263",
        "name": "Lagerbier Feld. Original 12x33cl",
        "price": 14.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 14.95,
        "caseSize": 12,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87313",
        "name": "Lagerbier Feld. Original 24x33cl",
        "price": 20.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 20.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "46003",
        "name": "Lagerbier Feld. Original 24x50cl",
        "price": 27.6,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 27.6,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "104238",
        "name": "Lagerbier Feld. Original 8x56.5cl",
        "price": 14.6,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 14.6,
        "caseSize": 8,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "30234",
        "name": "Lagerbier Feld. Original Dose 15x50cl",
        "price": 24.95,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 24.95,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87307",
        "name": "Lagerbier Feld. Original MW 33cl",
        "price": 1.55,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 1.55,
        "allowSingleBottle": true
      },
      {
        "art": "87303",
        "name": "Lagerbier Feld. Original MW 50cl",
        "price": 1.7,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 1.7,
        "allowSingleBottle": true
      },
      {
        "art": "87302",
        "name": "Lagerbier Feld. Original MW 50cl",
        "price": 1.7,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 1.7,
        "allowSingleBottle": true
      },
      {
        "art": "96005",
        "name": "Lagerbier Rugenbraeu 15x33cl",
        "price": 16.5,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 16.5,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "85477",
        "name": "Lagerbier Rugenbraeu 6x50cl",
        "price": 9.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 9.95,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87440",
        "name": "Lagerbier Rugenbraeu MW 50cl",
        "price": 1.6,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 1.6,
        "allowSingleBottle": true
      },
      {
        "art": "87439",
        "name": "Lagerbier Rugenbraeu MW 50cl",
        "price": 1.6,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 1.6,
        "allowSingleBottle": true
      },
      {
        "art": "87424",
        "name": "Lagerbier Schuetzeng. MW 33cl",
        "price": 1.3,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 1.3,
        "allowSingleBottle": true
      },
      {
        "art": "87414",
        "name": "Lagerbier Schuetzengarten 18x33cl",
        "price": 17.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 17.95,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "113711",
        "name": "Lagerbier Schuetzengarten 6x33cl",
        "price": 6.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 6.95,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "74771",
        "name": "Lagerbier Schuetzengarten 6x50cl",
        "price": 9.25,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 9.25,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87421",
        "name": "Lagerbier Schuetzengarten MW 50cl",
        "price": 1.6,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 1.6,
        "allowSingleBottle": true
      },
      {
        "art": "87420",
        "name": "Lagerbier Schuetzengarten MW 50cl",
        "price": 1.6,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 1.6,
        "allowSingleBottle": true
      },
      {
        "art": "36054",
        "name": "Landbier Eichbaum 50cl",
        "price": 0.55,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 0.55,
        "allowSingleBottle": true
      },
      {
        "art": "36055",
        "name": "Landbier Eichbaum Dose 18x50cl",
        "price": 9.9,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 9.9,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "15526",
        "name": "Panaché Bilz Himbeere 10 × 33 cl",
        "price": 10.85,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 10.85,
        "caseSize": 10,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "36950",
        "name": "Panache Bilz",
        "price": 17.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 17.95,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "29462",
        "name": "Panache Farmer Lemon Dose 18x50cl",
        "price": 10.8,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 10.8,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "13151",
        "name": "Panache Farmer Lemon Dose 50cl",
        "price": 0.6,
        "gebinde": "Einzeln",
        "unit": "dose",
        "priceSingle": 0.6,
        "allowSingleBottle": true
      },
      {
        "art": "66226",
        "name": "Quoellfrisch naturtrueb 15x33cl",
        "price": 15.95,
        "gebinde": "Einzeln & Pack",
        "unit": "flasche",
        "priceSingle": 0.35,
        "pricePack": 15.95,
        "caseSize": 15,
        "allowSingleBottle": true
      },
      {
        "art": "40901",
        "name": "Somersby Apple 4x33cl",
        "price": 8.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 8.95,
        "caseSize": 4,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "113710",
        "name": "Weissbier Paulaner 24x50cl",
        "price": 26.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 26.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87252",
        "name": "Weizenbier Maisels 4x50cl",
        "price": 6.6,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 6.6,
        "caseSize": 4,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "91134",
        "name": "Bier Eichhof o.A. 0.0% 10 × 33 cl",
        "price": 10.7,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 10.7,
        "caseSize": 10,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "74766",
        "name": "Bier Feld. o.A. 15 × 33 cl",
        "price": 16.9,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 16.9,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "66216",
        "name": "Bier Feld. o.A. Dose 15 × 50 cl",
        "price": 24.95,
        "gebinde": "Pack",
        "unit": "dose",
        "pricePack": 24.95,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87315",
        "name": "Bier Feld. o.A. MW 50 cl",
        "price": 1.7,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 1.7,
        "allowSingleBottle": true
      },
      {
        "art": "15102",
        "name": "Bier Feld. Peach 0.0 6 × 50 cl",
        "price": 10.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 10.95,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "97498",
        "name": "Bier Feld. Zitrone 0.0% 8 × 50 cl",
        "price": 13.5,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 13.5,
        "caseSize": 8,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "113709",
        "name": "Bier Moretti zero 15 × 33 cl",
        "price": 14.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 14.95,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "102410",
        "name": "Bier Moretti zero 6 × 50 cl",
        "price": 12.7,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 12.7,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "104768",
        "name": "Bier Quöllfrisch o.A. 15 × 33 cl",
        "price": 15.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 15.95,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "104751",
        "name": "Bilz Stellare Aranc. 0.0 6 × 33 cl",
        "price": 9.3,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 9.3,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "109337",
        "name": "Bilz Stellare Limone 0.0 6 × 33 cl",
        "price": 9.3,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 9.3,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "57218",
        "name": "Bschorle EW 6 × 33 cl",
        "price": 8.4,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 8.4,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87602",
        "name": "Mountain Twister o.A. 8×33cl",
        "price": 10.9,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 10.9,
        "caseSize": 8,
        "caseOnly": true,
        "allowSingleBottle": false
      }
    ]
  },
  {
    "name": "Weine",
    "items": [
      {
        "art": "69200",
        "name": "3 l bester Schweizer Wein",
        "price": 4.65,
        "gebinde": "Einzeln",
        "unit": "stk",
        "priceSingle": 4.65,
        "allowSingleBottle": true
      },
      {
        "art": "02128",
        "name": "Aigle blanc AOC 75 cl",
        "price": 11.9,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 11.9,
        "allowSingleBottle": true
      },
      {
        "art": "10868",
        "name": "Aigle Chablais blanc 50 cl",
        "price": 8.55,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 8.55,
        "allowSingleBottle": true
      },
      {
        "art": "36830",
        "name": "Amarone Salvaterra 50 cl",
        "price": 13.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 13.5,
        "allowSingleBottle": true
      },
      {
        "art": "88791",
        "name": "Amarone Salvaterra 75 cl",
        "price": 16.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 16.95,
        "allowSingleBottle": true
      },
      {
        "art": "52915",
        "name": "Amarone Valpolicella Zeni 75 cl",
        "price": 22.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 22.95,
        "allowSingleBottle": true
      },
      {
        "art": "55123",
        "name": "Amore Uno 75 cl",
        "price": 6.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 6.95,
        "allowSingleBottle": true
      },
      {
        "art": "61581",
        "name": "Appassimento Coronati 75 cl",
        "price": 5.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 5.95,
        "allowSingleBottle": true
      },
      {
        "art": "35703",
        "name": "Ass. Cépages Duvallon 75cl",
        "price": 5.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 5.95,
        "allowSingleBottle": true
      },
      {
        "art": "88236",
        "name": "Balance Che. blanc 75 cl",
        "price": 4.2,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.2,
        "allowSingleBottle": true
      },
      {
        "art": "88235",
        "name": "Balance Muscat 75 cl",
        "price": 4.2,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.2,
        "allowSingleBottle": true
      },
      {
        "art": "88945",
        "name": "Balance Shiraz Merlot 75 cl",
        "price": 4.2,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.2,
        "allowSingleBottle": true
      },
      {
        "art": "88355",
        "name": "Balance Shiraz Rosé 75 cl",
        "price": 4.2,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.2,
        "allowSingleBottle": true
      },
      {
        "art": "88954",
        "name": "Bar Royal Litchi 75 cl",
        "price": 4.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.5,
        "allowSingleBottle": true
      },
      {
        "art": "71679",
        "name": "Barbera Piemonte 150+1 75cl",
        "price": 6.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 6.95,
        "allowSingleBottle": true
      },
      {
        "art": "53019",
        "name": "Barbian Roble 75 cl",
        "price": 8.15,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 8.15,
        "allowSingleBottle": true
      },
      {
        "art": "19569",
        "name": "Blauburgunder CH 75 cl",
        "price": 5.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 5.95,
        "allowSingleBottle": true
      },
      {
        "art": "88390",
        "name": "Blauburgunder Hallau 75cl",
        "price": 7.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.95,
        "allowSingleBottle": true
      },
      {
        "art": "35797",
        "name": "Blauburgunder SH 75cl",
        "price": 7.8,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.8,
        "allowSingleBottle": true
      },
      {
        "art": "36442",
        "name": "Bonavita Red 75 cl",
        "price": 6.3,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 6.3,
        "allowSingleBottle": true
      },
      {
        "art": "65857",
        "name": "Borgo del Mandorlo Negro. 75 cl",
        "price": 8.15,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 8.15,
        "allowSingleBottle": true
      },
      {
        "art": "88713",
        "name": "Cabernet Sauvignon 5 l",
        "price": 18.95,
        "gebinde": "Einzeln",
        "unit": "stk",
        "priceSingle": 18.95,
        "allowSingleBottle": true
      },
      {
        "art": "81844",
        "name": "Calivo Emilia IGT 75 cl",
        "price": 8.7,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 8.7,
        "allowSingleBottle": true
      },
      {
        "art": "80436",
        "name": "Cannonau Sardegna Baiolu 75 cl",
        "price": 10.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 10.5,
        "allowSingleBottle": true
      },
      {
        "art": "68907",
        "name": "Cantello Vino Tinto 75 cl",
        "price": 8.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 8.5,
        "allowSingleBottle": true
      },
      {
        "art": "30045",
        "name": "Chardonnay Genève 75 cl",
        "price": 7.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.95,
        "allowSingleBottle": true
      },
      {
        "art": "13685",
        "name": "Chasselas Lemanic 75 cl",
        "price": 4.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.5,
        "allowSingleBottle": true
      },
      {
        "art": "73769",
        "name": "Chianti Terra Grande 75 cl",
        "price": 7.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.95,
        "allowSingleBottle": true
      },
      {
        "art": "90430",
        "name": "Clairette de Die Tradition 75 cl",
        "price": 9.85,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 9.85,
        "allowSingleBottle": true
      },
      {
        "art": "19534",
        "name": "Cornalin du Valais 75 cl",
        "price": 11.7,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 11.7,
        "allowSingleBottle": true
      },
      {
        "art": "52911",
        "name": "Costalago Zeni Rosso 75 cl",
        "price": 9.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 9.5,
        "allowSingleBottle": true
      },
      {
        "art": "88010",
        "name": "Cuvée Blanc Suisse 50 cl",
        "price": 4.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.5,
        "allowSingleBottle": true
      },
      {
        "art": "69946",
        "name": "Cuvée d'Or Goldbeere 75 cl",
        "price": 10.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 10.5,
        "allowSingleBottle": true
      },
      {
        "art": "88267",
        "name": "Cuvée Rosé Suisse 50 cl",
        "price": 3.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 3.95,
        "allowSingleBottle": true
      },
      {
        "art": "52889",
        "name": "Cuvée royale Goldbeere 75 cl",
        "price": 12.2,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 12.2,
        "allowSingleBottle": true
      },
      {
        "art": "17730",
        "name": "Dimensione Bianco 75 cl",
        "price": 6.85,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 6.85,
        "allowSingleBottle": true
      },
      {
        "art": "17729",
        "name": "Dimensione Rosso 75 cl",
        "price": 6.85,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 6.85,
        "allowSingleBottle": true
      },
      {
        "art": "88314",
        "name": "Dôle blanche VS 75 cl",
        "price": 6.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 6.5,
        "allowSingleBottle": true
      },
      {
        "art": "88461",
        "name": "Dôle du Valais 50 cl",
        "price": 4.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.95,
        "allowSingleBottle": true
      },
      {
        "art": "88456",
        "name": "Dôle du Valais 75 cl",
        "price": 6.8,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 6.8,
        "allowSingleBottle": true
      },
      {
        "art": "75700",
        "name": "Domaine Moulin Saint-Jean 75 cl",
        "price": 9.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 9.95,
        "allowSingleBottle": true
      },
      {
        "art": "91724",
        "name": "El Gringo Tempranillo 75 cl",
        "price": 7.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.95,
        "allowSingleBottle": true
      },
      {
        "art": "16800",
        "name": "El Pescaito 75 cl",
        "price": 4.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "pricePack": 4.95,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "88080",
        "name": "Epesses blanc 75 cl",
        "price": 9.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 9.95,
        "allowSingleBottle": true
      },
      {
        "art": "80434",
        "name": "Esprit Côtes du Rhône 75 cl",
        "price": 7.96,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.96,
        "allowSingleBottle": true
      },
      {
        "art": "52841",
        "name": "Federweiss Goldbeere 75 cl",
        "price": 11.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 11.5,
        "allowSingleBottle": true
      },
      {
        "art": "88160",
        "name": "Fendant VS 50 cl",
        "price": 4.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.95,
        "allowSingleBottle": true
      },
      {
        "art": "88157",
        "name": "Fendant VS 75 cl",
        "price": 6.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 6.5,
        "allowSingleBottle": true
      },
      {
        "art": "82384",
        "name": "Feuerheerd's Douro 75 cl",
        "price": 9.2,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 9.2,
        "allowSingleBottle": true
      },
      {
        "art": "88145",
        "name": "Fleurance Chasselas 50 cl",
        "price": 3.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 3.95,
        "allowSingleBottle": true
      },
      {
        "art": "88441",
        "name": "Fleurance Gamay 50 cl",
        "price": 4.4,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.4,
        "allowSingleBottle": true
      },
      {
        "art": "66471",
        "name": "Fleurance Pinot Noir 50 cl",
        "price": 4.96,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.96,
        "allowSingleBottle": true
      },
      {
        "art": "88008",
        "name": "Fleurance Riesling Silv. 50 cl",
        "price": 4.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.5,
        "allowSingleBottle": true
      },
      {
        "art": "83859",
        "name": "Gamaret VS 75 cl",
        "price": 9.55,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 9.55,
        "allowSingleBottle": true
      },
      {
        "art": "19815",
        "name": "Gewürztraminer 75 cl",
        "price": 8.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 8.95,
        "allowSingleBottle": true
      },
      {
        "art": "88885",
        "name": "Glühwein 1 l",
        "price": 2.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 2.5,
        "allowSingleBottle": true
      },
      {
        "art": "68894",
        "name": "Gran Pasas Monastrell 75 cl",
        "price": 8.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 8.95,
        "allowSingleBottle": true
      },
      {
        "art": "88170",
        "name": "Grüner Veltliner 75 cl",
        "price": 4.2,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.2,
        "allowSingleBottle": true
      },
      {
        "art": "61091",
        "name": "Hauswein rot Nr. 2 1 l",
        "price": 3.7,
        "gebinde": "Einzeln",
        "unit": "stk",
        "priceSingle": 3.7,
        "allowSingleBottle": true
      },
      {
        "art": "14417",
        "name": "Hauswein weiss Nr. 1 1 l",
        "price": 3.7,
        "gebinde": "Einzeln",
        "unit": "stk",
        "priceSingle": 3.7,
        "allowSingleBottle": true
      },
      {
        "art": "61650",
        "name": "Heida 75 cl",
        "price": 11.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "priceSingle": 11.95,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "88397",
        "name": "Holunderblütenwein 50 cl",
        "price": 5.4,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 5.4,
        "allowSingleBottle": true
      },
      {
        "art": "19542",
        "name": "Humagne Rouge VS 75 cl",
        "price": 11.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 11.5,
        "allowSingleBottle": true
      },
      {
        "art": "88723",
        "name": "J.P. Chenet Cabernet-Syrah 75 cl",
        "price": 4.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.95,
        "allowSingleBottle": true
      },
      {
        "art": "47616",
        "name": "Jaume Serra 75 cl",
        "price": 7.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.5,
        "allowSingleBottle": true
      },
      {
        "art": "04962",
        "name": "Johannisberg VS 50 cl",
        "price": 7.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.95,
        "allowSingleBottle": true
      },
      {
        "art": "19525",
        "name": "Johannisberg VS 75 cl",
        "price": 10.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 10.5,
        "allowSingleBottle": true
      },
      {
        "art": "63571",
        "name": "La Maison du Sud 75 cl",
        "price": 4.6,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.6,
        "allowSingleBottle": true
      },
      {
        "art": "34848",
        "name": "La Vache des Alpes blanc 75 cl",
        "price": 7.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.95,
        "allowSingleBottle": true
      },
      {
        "art": "34845",
        "name": "La Vache des Alpes rosé 75 cl",
        "price": 7.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.95,
        "allowSingleBottle": true
      },
      {
        "art": "34841",
        "name": "La Vache des Alpes rouge 75 cl",
        "price": 7.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.95,
        "allowSingleBottle": true
      },
      {
        "art": "21518",
        "name": "LAB Moscato 75 cl",
        "price": 5.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 5.95,
        "allowSingleBottle": true
      },
      {
        "art": "88033",
        "name": "Luins blanc 50 cl",
        "price": 5.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 5.5,
        "allowSingleBottle": true
      },
      {
        "art": "88031",
        "name": "Luins blanc 75 cl",
        "price": 6.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 6.95,
        "allowSingleBottle": true
      },
      {
        "art": "08029",
        "name": "Malbec Fabre Montmayou 75 cl",
        "price": 10.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 10.95,
        "allowSingleBottle": true
      },
      {
        "art": "19527",
        "name": "Malvoisie VS 75 cl",
        "price": 10.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 10.5,
        "allowSingleBottle": true
      },
      {
        "art": "02782",
        "name": "Mauler Cordon Or Dry 75cl",
        "price": 12.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 12.5,
        "allowSingleBottle": true
      },
      {
        "art": "88839",
        "name": "Merlot del Veneto 1 l",
        "price": 4.8,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.8,
        "allowSingleBottle": true
      },
      {
        "art": "24279",
        "name": "Merlot del Veneto 50 cl",
        "price": 2.9,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 2.9,
        "allowSingleBottle": true
      },
      {
        "art": "72238",
        "name": "Merlot Rosso 75 cl",
        "price": 12.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 12.5,
        "allowSingleBottle": true
      },
      {
        "art": "88044",
        "name": "Mont sur Rolle 75 cl",
        "price": 6.7,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 6.7,
        "allowSingleBottle": true
      },
      {
        "art": "52804",
        "name": "Moscato Mosketto 75 cl",
        "price": 5.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "priceSingle": 5.95,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "88175",
        "name": "Muscat #sweet 50 cl",
        "price": 5.1,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 5.1,
        "allowSingleBottle": true
      },
      {
        "art": "10974",
        "name": "Nero d'Avola Sicilia 75cl",
        "price": 4.4,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.4,
        "allowSingleBottle": true
      },
      {
        "art": "52851",
        "name": "Oeil de Perdrix Goldb. AOC 75 cl",
        "price": 7.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.95,
        "allowSingleBottle": true
      },
      {
        "art": "88306",
        "name": "Oeil-de-Perdrix 75 cl",
        "price": 10.6,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 10.6,
        "allowSingleBottle": true
      },
      {
        "art": "14413",
        "name": "Pena Roja Jumilla 75 cl",
        "price": 4.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.95,
        "allowSingleBottle": true
      },
      {
        "art": "19517",
        "name": "Petite Arvine VS 75 cl",
        "price": 11.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 11.95,
        "allowSingleBottle": true
      },
      {
        "art": "14415",
        "name": "Pinot blanc Suisse 75 cl",
        "price": 6.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 6.5,
        "allowSingleBottle": true
      },
      {
        "art": "06683",
        "name": "Pinot Grigio Cesario 75cl",
        "price": 4.4,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.4,
        "allowSingleBottle": true
      },
      {
        "art": "88396",
        "name": "Pinot Noir Duvallon 75 cl",
        "price": 5.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 5.95,
        "allowSingleBottle": true
      },
      {
        "art": "52887",
        "name": "Pinot Noir Goldbeere 75 cl",
        "price": 11.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 11.5,
        "allowSingleBottle": true
      },
      {
        "art": "06984",
        "name": "Pinot Noir GR AOC 75 cl",
        "price": 12.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 12.5,
        "allowSingleBottle": true
      },
      {
        "art": "52895",
        "name": "Pinot Noir Hallau 75 cl",
        "price": 14.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 14.95,
        "allowSingleBottle": true
      },
      {
        "art": "06993",
        "name": "Pinot Noir Jenins GR AOC 75 cl",
        "price": 14.6,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 14.6,
        "allowSingleBottle": true
      },
      {
        "art": "30791",
        "name": "Pinot Noir Salgesch 75 cl",
        "price": 8.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 8.95,
        "allowSingleBottle": true
      },
      {
        "art": "59511",
        "name": "Porta 6 Lisboa 75 cl",
        "price": 6.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 6.95,
        "allowSingleBottle": true
      },
      {
        "art": "52925",
        "name": "Primitivo Manduria 1488 75 cl",
        "price": 13.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 13.5,
        "allowSingleBottle": true
      },
      {
        "art": "19819",
        "name": "Primitivo Manduria 75 cl",
        "price": 6.95,
        "gebinde": "Pack",
        "unit": "flasche",
        "priceSingle": 6.95,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "22227",
        "name": "Primitivo Puglia Cesario 75 cl",
        "price": 4.6,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.6,
        "allowSingleBottle": true
      },
      {
        "art": "88965",
        "name": "Prosecco Spumante 75 cl",
        "price": 7.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.95,
        "allowSingleBottle": true
      },
      {
        "art": "52935",
        "name": "Ribera del Duero 75 cl",
        "price": 9.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 9.95,
        "allowSingleBottle": true
      },
      {
        "art": "88002",
        "name": "Riesling S. Duvallon 75cl",
        "price": 5.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 5.95,
        "allowSingleBottle": true
      },
      {
        "art": "52839",
        "name": "Riesling-Silvaner Goldbeere 75 cl",
        "price": 9.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 9.95,
        "allowSingleBottle": true
      },
      {
        "art": "12507",
        "name": "Rimuss bianco dry 75 cl",
        "price": 7.75,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.75,
        "allowSingleBottle": true
      },
      {
        "art": "88988",
        "name": "Rimuss Litchi Perl 75cl",
        "price": 5.6,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 5.6,
        "allowSingleBottle": true
      },
      {
        "art": "88980",
        "name": "Rimuss Party o.A. 70 cl",
        "price": 4.65,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.65,
        "allowSingleBottle": true
      },
      {
        "art": "32556",
        "name": "Rioja El Coto Crianza 50 cl",
        "price": 7.35,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.35,
        "allowSingleBottle": true
      },
      {
        "art": "27642",
        "name": "Rioja El Coto Crianza 75cl",
        "price": 8.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 8.95,
        "allowSingleBottle": true
      },
      {
        "art": "36832",
        "name": "Ripasso Salvaterra 50 cl",
        "price": 6.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 6.95,
        "allowSingleBottle": true
      },
      {
        "art": "88792",
        "name": "Ripasso Salvaterra 75 cl",
        "price": 7.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.95,
        "allowSingleBottle": true
      },
      {
        "art": "52913",
        "name": "Ripasso Valpolicella Zeni 75 cl",
        "price": 13.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 13.5,
        "allowSingleBottle": true
      },
      {
        "art": "81839",
        "name": "Roma Federici 75 cl",
        "price": 8.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 8.95,
        "allowSingleBottle": true
      },
      {
        "art": "63981",
        "name": "Rosato di Puglia 75 cl",
        "price": 5.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 5.5,
        "allowSingleBottle": true
      },
      {
        "art": "88264",
        "name": "Rosé Duvallon 75 cl",
        "price": 5.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 5.95,
        "allowSingleBottle": true
      },
      {
        "art": "13695",
        "name": "Rosé Lemanic 75 cl",
        "price": 5.7,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 5.7,
        "allowSingleBottle": true
      },
      {
        "art": "88177",
        "name": "Rosière Chardonnay 75 cl",
        "price": 4.8,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.8,
        "allowSingleBottle": true
      },
      {
        "art": "88337",
        "name": "Rosière Rosé 75 cl",
        "price": 4.8,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.8,
        "allowSingleBottle": true
      },
      {
        "art": "88610",
        "name": "Rosière Syrah 75 cl",
        "price": 4.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.5,
        "allowSingleBottle": true
      },
      {
        "art": "73752",
        "name": "Rosso Terre di Toscana 75 cl",
        "price": 7.2,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.2,
        "allowSingleBottle": true
      },
      {
        "art": "88408",
        "name": "Salvagnin 50 cl",
        "price": 4.9,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.9,
        "allowSingleBottle": true
      },
      {
        "art": "88142",
        "name": "Schafiser weiss 50 cl",
        "price": 5.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 5.5,
        "allowSingleBottle": true
      },
      {
        "art": "64440",
        "name": "Schafiser weiss 75 cl",
        "price": 9.85,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 9.85,
        "allowSingleBottle": true
      },
      {
        "art": "63381",
        "name": "Schaumwein Volgaz 75 cl",
        "price": 11.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 11.95,
        "allowSingleBottle": true
      },
      {
        "art": "95394",
        "name": "Schaumwein Volgaz rosé 75 cl",
        "price": 11.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 11.95,
        "allowSingleBottle": true
      },
      {
        "art": "88067",
        "name": "St. Saphorin blanc 75 cl",
        "price": 10.3,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 10.3,
        "allowSingleBottle": true
      },
      {
        "art": "52879",
        "name": "St. Saphorin Petit Ver. 75 cl",
        "price": 18.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 18.5,
        "allowSingleBottle": true
      },
      {
        "art": "77902",
        "name": "Stone Cruz Cabernet 75 cl",
        "price": 4.8,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.8,
        "allowSingleBottle": true
      },
      {
        "art": "78657",
        "name": "Stone Cruz Chardonnay 75 cl",
        "price": 4.8,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.8,
        "allowSingleBottle": true
      },
      {
        "art": "78660",
        "name": "Stone Cruz White Zinfandel 75 cl",
        "price": 4.8,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.8,
        "allowSingleBottle": true
      },
      {
        "art": "77543",
        "name": "Stone Cruz Zinfandel 75cl",
        "price": 4.8,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.8,
        "allowSingleBottle": true
      },
      {
        "art": "38306",
        "name": "Tempranillo Bag-in-Box 3l",
        "price": 9.25,
        "gebinde": "Einzeln",
        "unit": "stk",
        "priceSingle": 9.25,
        "allowSingleBottle": true
      },
      {
        "art": "16869",
        "name": "Triasso Rosso Biologico 75 cl",
        "price": 8.5,
        "gebinde": "Pack",
        "unit": "flasche",
        "priceSingle": 8.5,
        "caseOnly": true,
        "allowSingleBottle": false,
        "topAngebot": true
      },
      {
        "art": "68163",
        "name": "Velarino Nero di Troia 75 cl",
        "price": 7.7,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.7,
        "allowSingleBottle": true
      },
      {
        "art": "88085",
        "name": "Villette blanc 75 cl",
        "price": 8.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 8.95,
        "allowSingleBottle": true
      },
      {
        "art": "06995",
        "name": "Vin Grischun GR 75 cl",
        "price": 14.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 14.95,
        "allowSingleBottle": true
      },
      {
        "art": "88113",
        "name": "Yvorne blanc 75 cl",
        "price": 12.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 12.5,
        "allowSingleBottle": true
      },
      {
        "art": "88362",
        "name": "Zürcher Clevner 75 cl",
        "price": 7.75,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.75,
        "allowSingleBottle": true
      },
      {
        "art": "88490",
        "name": "Zweigelt 75 cl",
        "price": 4.3,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 4.3,
        "allowSingleBottle": true
      },
      {
        "art": "106875",
        "name": "Big Beltie Cab. Sauvignon 75 cl",
        "price": 9.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 9.95,
        "allowSingleBottle": true
      },
      {
        "art": "109453",
        "name": "Cuvée Rouge CH 50 cl VdP Schweiz",
        "price": 3.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 3.95,
        "allowSingleBottle": true
      },
      {
        "art": "111438",
        "name": "Fatascia Syrah 75 cl",
        "price": 11.5,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 11.5,
        "allowSingleBottle": true
      },
      {
        "art": "110898",
        "name": "Féchy AOC La Côte 50 cl",
        "price": 5.7,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 5.7,
        "allowSingleBottle": true
      },
      {
        "art": "110372",
        "name": "Féchy blanc 75 cl",
        "price": 7.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 7.95,
        "allowSingleBottle": true
      },
      {
        "art": "114618",
        "name": "Lemanic Rouge 75 cl",
        "price": 5.7,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 5.7,
        "allowSingleBottle": true
      },
      {
        "art": "101143",
        "name": "Moscato Aresca 75 cl",
        "price": 5.95,
        "gebinde": "Einzeln",
        "unit": "flasche",
        "priceSingle": 5.95,
        "allowSingleBottle": true
      }
    ]
  }
];
