/**
 * LANDI GETRÄNKE-SORTIMENT (Stand 23.9.2026)
 */

const CATEGORIES = [
  {
    "name": "Top-Angebote",
    "items": [
      {
        "art": "88632",
        "name": "Focus Water Active 12 × 50 cl",
        "price": 15,
        "caseSize": 12,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "82128",
        "name": "San Pellegrino Chino 24 × 33 cl",
        "price": 16.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "68904",
        "name": "Lemon Soda 24 × 33 cl",
        "price": 16.3,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "82126",
        "name": "San Pellegrino L'Aranc. 24×33cl",
        "price": 16.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "40938",
        "name": "Rivella rot 24 × 50 cl",
        "price": 22.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "41624",
        "name": "Rivella blau 24 × 50 cl",
        "price": 22.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "16149",
        "name": "Energy Drink Red Bull Dose 24×25cl",
        "price": 19.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "87543",
        "name": "Orangensaft Granini 6 × 100 cl",
        "price": 13.5,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "87544",
        "name": "Fruchtcocktail Granini 6 × 100 cl",
        "price": 13.5,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "54906",
        "name": "Sauser m.A. Ramseier 6 × 50 cl",
        "price": 10.95,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "15526",
        "name": "Panaché Bilz Himbeere 10 × 33 cl",
        "price": 10.9,
        "caseSize": 10,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "52804",
        "name": "Moscato Mosketto 75 cl",
        "price": 7.95,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "19819",
        "name": "Primitivo Manduria 75 cl",
        "price": 9.35,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "16869",
        "name": "Triasso Rosso Biologico 75 cl",
        "price": 8.5,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "61650",
        "name": "Heida 75 cl",
        "price": 11.95,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "16800",
        "name": "El Pescaito 75 cl",
        "price": 4.95,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "46003",
        "name": "Lagerbier Feld. Original 24x50cl",
        "price": 27.6,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true
      },
      {
        "art": "109340",
        "name": "Bier Moretti Dose 24x33cl",
        "price": 20.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true
      },
      {
        "art": "88317",
        "name": "Bier Quoellfrisch Dose 24x50cl",
        "price": 29.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true
      },
      {
        "art": "111698",
        "name": "Farmer Bier Lager Dose 24x33cl",
        "price": 11.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true
      },
      {
        "art": "109408",
        "name": "Bier Peroni Dose 24x33cl",
        "price": 19.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true
      },
      {
        "art": "105553",
        "name": "Bier Quoellfrisch 24x33cl",
        "price": 19.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true
      },
      {
        "art": "68896",
        "name": "Bier Moretti Dose 24x50cl",
        "price": 29.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true
      },
      {
        "art": "50898",
        "name": "Eve Strawberry Mojito 10x27.5cl",
        "price": 17.25,
        "caseSize": 10,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true
      },
      {
        "art": "113708",
        "name": "Bier Moretti Sale d. M. 24x33cl",
        "price": 26.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true
      }
    ]
  },
  {
    "name": "Mineralwasser",
    "items": [
      {
        "art": "87523",
        "name": "Mineralwasser Farmer rot 6×150cl",
        "price": 3.65,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "87524",
        "name": "Mineralwasser Farmer blau 6×150cl",
        "price": 3.65,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "87534",
        "name": "Mineralwasser Farmer grün 6×150cl",
        "price": 3.65,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "35282",
        "name": "Quintus Quelle blau 6 × 150 cl",
        "price": 1.95,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "09018",
        "name": "Mineralwasser Farmer blau 6×50cl",
        "price": 3.2,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "12356",
        "name": "Mineralwasser Farmer rot 6×50cl",
        "price": 3.2,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "45516",
        "name": "Quintus Quelle rot 6 ×150 cl",
        "price": 1.95,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "09015",
        "name": "Mineralwasser Farmer grün 6×50cl",
        "price": 3.2,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "87512",
        "name": "Henniez grün 6 × 50 cl",
        "price": 4.7,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "87507",
        "name": "Henniez rot 6 × 50 cl",
        "price": 4.7,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "02166",
        "name": "Henniez blau 6 × 50 cl",
        "price": 4.7,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      }
    ]
  },
  {
    "name": "Süssgetränke",
    "items": [
      {
        "art": "87708",
        "name": "Ice Tea Farmer Lemon 6 × 150 cl",
        "price": 3.95,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "88632",
        "name": "Focus Water Active 12 × 50 cl",
        "price": 15,
        "caseSize": 12,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "35400",
        "name": "Coca-Cola Zero Dose 24 × 33 cl",
        "price": 14.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "95913",
        "name": "Citro Farmer zéro 6 × 150 cl",
        "price": 3.65,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "09014",
        "name": "Ice Tea Farmer Lemon 6 × 50 cl",
        "price": 2.95,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "35398",
        "name": "Coca-Cola Dose 24 × 33 cl",
        "price": 14.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "95926",
        "name": "Citro Farmer zéro 6 × 50 cl",
        "price": 3.18,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "09017",
        "name": "Ice Tea Farmer Peach 6 × 50 cl",
        "price": 2.95,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "87709",
        "name": "Ice Tea Farmer Peach 6 × 150 cl",
        "price": 3.95,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "13152",
        "name": "Coca-Cola 8 × 150 cl",
        "price": 16.48,
        "caseSize": 8,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "99712",
        "name": "Grapefruit Farmer zéro 6×150cl",
        "price": 3.65,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "78099",
        "name": "Schnitzwasser Farmer 6 × 150 cl",
        "price": 3.65,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "82220",
        "name": "Ice Tea Farmer Mint 6 × 150 cl",
        "price": 4.95,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "35378",
        "name": "Coca-Cola 8 × 50 cl",
        "price": 11.44,
        "caseSize": 8,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "82128",
        "name": "San Pellegrino Chino 24 × 33 cl",
        "price": 16.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "78009",
        "name": "Cola Farmer zéro 6 × 150 cl",
        "price": 3.65,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "35376",
        "name": "Coca-Cola Zero 8 × 50 cl",
        "price": 11.44,
        "caseSize": 8,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "13153",
        "name": "Coca-Cola Zero 8 × 150 cl",
        "price": 16.48,
        "caseSize": 8,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "85041",
        "name": "Schnitzwasser Farmer 6 × 50 cl",
        "price": 3.18,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "87319",
        "name": "Vitaminwater Farmer Zitrone 6×50cl",
        "price": 3.18,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "68904",
        "name": "Lemon Soda 24 × 33 cl",
        "price": 16.3,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "95909",
        "name": "Ice Tea Farmer Mint 6 × 50 cl",
        "price": 3.5,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "87810",
        "name": "Holunder-Melisse Farmer 6 × 150 cl",
        "price": 3.65,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "46020",
        "name": "Rivella rot 8 × 50 cl",
        "price": 11.92,
        "caseSize": 8,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "82126",
        "name": "San Pellegrino L'Aranc. 24×33cl",
        "price": 16.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "09022",
        "name": "Holunder-Melisse Farmer 6×50cl",
        "price": 3.18,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "40938",
        "name": "Rivella rot 24 × 50 cl",
        "price": 22.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "41624",
        "name": "Rivella blau 24 × 50 cl",
        "price": 22.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "16149",
        "name": "Energy Drink Red Bull Dose 24×25cl",
        "price": 19.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "87800",
        "name": "Energy Drink Red Bull Dose 6×25cl",
        "price": 8.88,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "38994",
        "name": "Energy Drink Red Bull S.free 6×25cl",
        "price": 8.88,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "42617",
        "name": "Orangensaft Farmer 6 × 100 cl",
        "price": 7.8,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "87543",
        "name": "Orangensaft Granini 6 × 100 cl",
        "price": 13.5,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "87544",
        "name": "Fruchtcocktail Granini 6 × 100 cl",
        "price": 13.5,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "41743",
        "name": "Traubensaft Farmer rot 4 × 100 cl",
        "price": 6.24,
        "caseSize": 4,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "41741",
        "name": "Cranberry Farmer 4 × 100 cl",
        "price": 6.96,
        "caseSize": 4,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "51528",
        "name": "Multivitamin Farmer 6 × 100 cl",
        "price": 9.54,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "87743",
        "name": "Sauser m.A. Ramseier 6 × 100 cl",
        "price": 19.32,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "38358",
        "name": "Capri Sun Multivitamin 15 × 33 cl",
        "price": 18,
        "caseSize": 15,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "96103",
        "name": "Direkt Orangensaft Farmer 6×100cl",
        "price": 14.7,
        "caseSize": 6,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "34965",
        "name": "Capri Sun Orange-Peach 15×33cl",
        "price": 17.95,
        "caseSize": 15,
        "allowSingleBottle": false,
        "unit": "flasche",
        "caseOnly": true
      },
      {
        "art": "54906",
        "name": "Sauser m.A. Ramseier 6 × 50 cl",
        "price": 10.95,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      }
    ]
  },
  {
    "name": "Energy Drinks/Mate",
    "items": [
      {
        "art": "16149",
        "name": "Energy Drink Red Bull Dose 24 × 25 cl",
        "price": 19.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "unit": "dose"
      },
      {
        "art": "87800",
        "name": "Energy Drink Red Bull Dose 6 × 25 cl",
        "price": 8.88,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false,
        "unit": "dose"
      },
      {
        "art": "38994",
        "name": "Energy Drink Red Bull Sugarfree 6 × 25 cl",
        "price": 8.88,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false,
        "unit": "dose"
      },
      {
        "art": "98124",
        "name": "Farmer Energy Drink Dose 24 × 25 cl",
        "price": 11.8,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "unit": "dose"
      },
      {
        "art": "98125",
        "name": "Farmer Energy Drink Dose 25 cl",
        "price": 0.5,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "dose"
      },
      {
        "art": "103976",
        "name": "Farmer Mate Dose 6 × 33 cl",
        "price": 5.95,
        "caseSize": 6,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "dose"
      },
      {
        "art": "114544",
        "name": "Farmer Mate zéro Dose 6 × 33 cl",
        "price": 5.95,
        "caseSize": 6,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "dose"
      }
    ]
  },
  {
    "name": "Biere",
    "items": [
      {
        "art": "46003",
        "name": "Lagerbier Feld. Original 24x50cl",
        "price": 27.6,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true
      },
      {
        "art": "87313",
        "name": "Lagerbier Feld. Original 24x33cl",
        "price": 20.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "109340",
        "name": "Bier Moretti Dose 24x33cl",
        "price": 20.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true
      },
      {
        "art": "87448",
        "name": "Lagerbier Farmer Dose 50cl",
        "price": 0.6,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "dose"
      },
      {
        "art": "75884",
        "name": "Bier Quoellfrisch 15x33cl",
        "price": 15.95,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "88317",
        "name": "Bier Quoellfrisch Dose 24x50cl",
        "price": 29.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true
      },
      {
        "art": "107843",
        "name": "Bier Moretti EW 15x33cl",
        "price": 18.95,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "109341",
        "name": "Bier Moretti Limone 3x33cl",
        "price": 4.95,
        "caseSize": 3,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "111698",
        "name": "Farmer Bier Lager Dose 24x33cl",
        "price": 11.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true
      },
      {
        "art": "18249",
        "name": "Bier Calanda Radler 10x33cl",
        "price": 12.5,
        "caseSize": 10,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "75827",
        "name": "Bier Boxer old 24x33cl",
        "price": 19.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "26980",
        "name": "Lagerbier Farmer Dose 18x50cl",
        "price": 10.8,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "15492",
        "name": "Corona Extra Bier 6x33cl",
        "price": 7.95,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "91683",
        "name": "Bier Moretti Dose 12x50cl",
        "price": 19.95,
        "caseSize": 12,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87303",
        "name": "Lagerbier Feld. Original MW 50cl",
        "price": 1.7,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "38092",
        "name": "Bier Farmer Naturtrueb 50cl",
        "price": 0.75,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "46423",
        "name": "Amberbier Farmer Dose 50cl",
        "price": 0.75,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "dose"
      },
      {
        "art": "109408",
        "name": "Bier Peroni Dose 24x33cl",
        "price": 19.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true
      },
      {
        "art": "72340",
        "name": "Calanda Radler Zitrone 24x50cl",
        "price": 27.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "35247",
        "name": "Bier Sagres 24x25cl",
        "price": 15.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "66226",
        "name": "Quoellfrisch naturtrueb 15x33cl",
        "price": 15.95,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "30234",
        "name": "Lagerbier Feld. Original Dose 15x50cl",
        "price": 24.95,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "13151",
        "name": "Panache Farmer Lemon Dose 50cl",
        "price": 0.6,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "dose"
      },
      {
        "art": "105553",
        "name": "Bier Quoellfrisch 24x33cl",
        "price": 19.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true
      },
      {
        "art": "68896",
        "name": "Bier Moretti Dose 24x50cl",
        "price": 29.5,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true
      },
      {
        "art": "87441",
        "name": "Spezialbier Rugenbraeu MW 33cl",
        "price": 1.55,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88308",
        "name": "Bier Pale Ale Farmer Dose 50cl",
        "price": 0.8,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "dose"
      },
      {
        "art": "102400",
        "name": "Bier Moretti XL 15x66cl",
        "price": 25.95,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87351",
        "name": "Eve Litchi 4x27.5cl",
        "price": 9.45,
        "caseSize": 4,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "15107",
        "name": "Bier Zitronen Panache 15x33cl",
        "price": 14.95,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "77382",
        "name": "Bier Ginger Appenzeller 6x33cl",
        "price": 15.25,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "51891",
        "name": "Bier Calanda Glatsch 6x50cl",
        "price": 11.2,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87428",
        "name": "Bier Schuetzengarten Edelspez MW 33cl",
        "price": 1.55,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "87444",
        "name": "Bier Quoellfrisch MW 50cl",
        "price": 1.95,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "87450",
        "name": "Lagerbier Farmer MW 50cl",
        "price": 0.6,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "50898",
        "name": "Eve Strawberry Mojito 10x27.5cl",
        "price": 17.25,
        "caseSize": 10,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true
      },
      {
        "art": "51734",
        "name": "Lagerbier Farmer 18x33cl",
        "price": 9.95,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "36054",
        "name": "Landbier Eichbaum 50cl",
        "price": 0.55,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "66227",
        "name": "Lagerbier Eichhof hell 20x33cl",
        "price": 17.95,
        "caseSize": 20,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87453",
        "name": "Bier Farmer Litchi 10x33cl",
        "price": 9.55,
        "caseSize": 10,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87344",
        "name": "Bier Cardinal Blonde MW 33cl",
        "price": 1.4,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "34436",
        "name": "Bier Valaisanne Lager 12x33cl",
        "price": 14.95,
        "caseSize": 12,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "107846",
        "name": "Bier Moretti Sale d. M. 6x33cl",
        "price": 8.95,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87421",
        "name": "Lagerbier Schuetzengarten MW 50cl",
        "price": 1.6,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "89515",
        "name": "Bier Quoellfrisch Dose 15x50cl",
        "price": 23.95,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87420",
        "name": "Lagerbier Schuetzengarten MW 50cl",
        "price": 1.6,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "87309",
        "name": "Bier Farmer Erdb.-Rhab. 10x33cl",
        "price": 9.55,
        "caseSize": 10,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "40901",
        "name": "Somersby Apple 4x33cl",
        "price": 8.95,
        "caseSize": 4,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "63459",
        "name": "Bier Boxer old 18x25cl",
        "price": 16.5,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87447",
        "name": "Bier Farmer dunkel 6x33cl",
        "price": 6.55,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87252",
        "name": "Weizenbier Maisels 4x50cl",
        "price": 6.6,
        "caseSize": 4,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87302",
        "name": "Lagerbier Feld. Original MW 50cl",
        "price": 1.7,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "87414",
        "name": "Lagerbier Schuetzengarten 18x33cl",
        "price": 17.95,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87373",
        "name": "Bier Boxer old MW 50cl",
        "price": 1.8,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "15524",
        "name": "Bier Valaisanne Lager 18x33cl",
        "price": 17.5,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "88309",
        "name": "Bier Pale Ale Farmer Dose 18x50cl",
        "price": 14.4,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "12805",
        "name": "Bier Feld. Buegel MW 50cl",
        "price": 2.1,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "32729",
        "name": "Bier Calanda Dose 24x50cl",
        "price": 30.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "38093",
        "name": "Bier Farmer Naturtrueb Dose 18x50cl",
        "price": 13.5,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87391",
        "name": "Lagerbier Eichhof MW 50cl",
        "price": 1.55,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "87260",
        "name": "Lagerbier Eichhof Dose 6x50cl",
        "price": 9.95,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "113708",
        "name": "Bier Moretti Sale d. M. 24x33cl",
        "price": 26.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true
      },
      {
        "art": "77381",
        "name": "Bier Valaisanne Lager 6x50cl",
        "price": 11.9,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "68192",
        "name": "Bier Desperados Tequilla 6x50cl",
        "price": 13.2,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87307",
        "name": "Lagerbier Feld. Original MW 33cl",
        "price": 1.55,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "87305",
        "name": "Lagerbier Feld. Original 10x33cl",
        "price": 12.5,
        "caseSize": 10,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87425",
        "name": "Bier Schuetzengarten Kl.braeu MW 50cl",
        "price": 1.8,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "111264",
        "name": "Bier Feld. Braufrisch Dose 12x50cl",
        "price": 19.95,
        "caseSize": 12,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "29462",
        "name": "Panache Farmer Lemon Dose 18x50cl",
        "price": 10.8,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87440",
        "name": "Lagerbier Rugenbraeu MW 50cl",
        "price": 1.6,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "45949",
        "name": "Amberbier Farmer Dose 18x50cl",
        "price": 13.5,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87341",
        "name": "Bier Cardinal Blonde MW 50cl",
        "price": 1.75,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "26917",
        "name": "Lagerbier Eichhof Do. 24x50cl",
        "price": 30.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "32882",
        "name": "Eve Pink Mimosa 4x27.5cl",
        "price": 9.45,
        "caseSize": 4,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "96173",
        "name": "Bier Chopfab Draft 10x33cl",
        "price": 11.95,
        "caseSize": 10,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "36950",
        "name": "Panache Edelweiss 6x33cl",
        "price": 7.75,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "40899",
        "name": "Cardinal Lager EW 15x33cl",
        "price": 17.5,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "36055",
        "name": "Landbier Eichbaum Dose 18x50cl",
        "price": 9.9,
        "caseSize": 18,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "97497",
        "name": "Bier Valaisanne Juicy IPA 4x33cl",
        "price": 10.95,
        "caseSize": 4,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87439",
        "name": "Lagerbier Rugenbraeu MW 50cl",
        "price": 1.6,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "34810",
        "name": "Bier Schuetzengarten Edelspez 6x33cl",
        "price": 8.3,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "109412",
        "name": "BrewDog Wingman 4x33cl",
        "price": 9.5,
        "caseSize": 4,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87442",
        "name": "Bier Rugenbraeu Zwickel MW 50cl",
        "price": 2.0,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "10639",
        "name": "Bier Boxer old MW 33cl",
        "price": 1.65,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "45951",
        "name": "Bier Quoellfrisch Dose 6x50cl",
        "price": 10.85,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "32224",
        "name": "Bier Boxer old Dose 6x50cl",
        "price": 9.95,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "96005",
        "name": "Lagerbier Rugenbraeu 15x33cl",
        "price": 16.5,
        "caseSize": 15,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "74771",
        "name": "Lagerbier Schuetzengarten 6x50cl",
        "price": 9.25,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "111263",
        "name": "Lagerbier Feld. Original 12x33cl",
        "price": 14.95,
        "caseSize": 12,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "61762",
        "name": "Eve Grape Cosmop. 4x27.5cl",
        "price": 9.45,
        "caseSize": 4,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "104236",
        "name": "Bier Feld. Pils Dose 6x50cl",
        "price": 11.5,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "113710",
        "name": "Weissbier Paulaner 24x50cl",
        "price": 26.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "104238",
        "name": "Lagerbier Feld. Original 8x56.5cl",
        "price": 14.6,
        "caseSize": 8,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "34447",
        "name": "St.Galler Klosterbraeu 6x33cl",
        "price": 8.3,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87424",
        "name": "Lagerbier Schuetzeng. MW 33cl",
        "price": 1.3,
        "caseOnly": false,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "85477",
        "name": "Lagerbier Rugenbraeu 6x50cl",
        "price": 9.95,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "52950",
        "name": "Bier Amber Oberland Prem. 6x33cl",
        "price": 9.2,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "57529",
        "name": "Bier Superbock 24x25cl",
        "price": 17.95,
        "caseSize": 24,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "87432",
        "name": "St.Galler Klosterbraeu 6x50cl",
        "price": 11.3,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "63449",
        "name": "Bier Draft Oberland 6x33cl",
        "price": 9.2,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      },
      {
        "art": "113711",
        "name": "Lagerbier Schuetzengarten 6x33cl",
        "price": 6.95,
        "caseSize": 6,
        "caseOnly": true,
        "allowSingleBottle": false
      }
    ]
  },
  {
    "name": "Weine",
    "items": [
      {
        "art": "52804",
        "name": "Moscato Mosketto 75 cl",
        "price": 7.95,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "19819",
        "name": "Primitivo Manduria 75 cl",
        "price": 9.35,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "88965",
        "name": "Prosecco Spumante 75 cl",
        "price": 10.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "17729",
        "name": "Dimensione Rosso 75 cl",
        "price": 9.13,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "34848",
        "name": "La Vache des Alpes blanc 75 cl",
        "price": 10.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "34841",
        "name": "La Vache des Alpes rouge 75 cl",
        "price": 10.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "34845",
        "name": "La Vache des Alpes rosé 75 cl",
        "price": 10.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88610",
        "name": "Rosière Syrah 75 cl",
        "price": 2.5,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88408",
        "name": "Salvagnin 50 cl",
        "price": 9.8,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88441",
        "name": "Fleurance Gamay 50 cl",
        "price": 8.8,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "16869",
        "name": "Triasso Rosso Biologico 75 cl",
        "price": 8.5,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "88456",
        "name": "Dôle du Valais 75 cl",
        "price": 9.07,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88235",
        "name": "Balance Muscat 75 cl",
        "price": 5.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88461",
        "name": "Dôle du Valais 50 cl",
        "price": 9.9,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88337",
        "name": "Rosière Rosé 75 cl",
        "price": 6.4,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88397",
        "name": "Holunderblütenwein 50 cl",
        "price": 10.8,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "52887",
        "name": "Pinot Noir Goldbeere 75 cl",
        "price": 15.33,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "52913",
        "name": "Ripasso Valpolicella Zeni 75 cl",
        "price": 2.5,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88044",
        "name": "Mont sur Rolle 75 cl",
        "price": 8.93,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88306",
        "name": "Oeil-de-Perdrix 75 cl",
        "price": 10.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "52915",
        "name": "Amarone Valpolicella Zeni 75 cl",
        "price": 30.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88157",
        "name": "Fendant VS 75 cl",
        "price": 8.67,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88177",
        "name": "Rosière Chardonnay 75 cl",
        "price": 6.4,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "52841",
        "name": "Federweiss Goldbeere 75 cl",
        "price": 15.33,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "13695",
        "name": "Rosé Lemanic 75 cl",
        "price": 7.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "66471",
        "name": "Fleurance Pinot Noir 50 cl",
        "price": 9.9,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "52839",
        "name": "Riesling-Silvaner Goldbeere 75 cl",
        "price": 13.27,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88033",
        "name": "Luins blanc 50 cl",
        "price": 2.5,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88390",
        "name": "Blauburgunder Hallau 75cl",
        "price": 10.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "06683",
        "name": "Pinot Grigio Cesario 75cl",
        "price": 5.87,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88031",
        "name": "Luins blanc 75 cl",
        "price": 9.27,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88113",
        "name": "Yvorne blanc 75 cl",
        "price": 16.67,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "68163",
        "name": "Velarino Nero di Troia 75 cl",
        "price": 10.27,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "63381",
        "name": "Schaumwein Volgaz 75 cl",
        "price": 15.93,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88067",
        "name": "St. Saphorin blanc 75 cl",
        "price": 13.73,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "17730",
        "name": "Dimensione Bianco 75 cl",
        "price": 9.13,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88885",
        "name": "Glühwein 1 l",
        "price": 2.5,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88085",
        "name": "Villette blanc 75 cl",
        "price": 11.93,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "19525",
        "name": "Johannisberg VS 75 cl",
        "price": 2.5,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88080",
        "name": "Epesses blanc 75 cl",
        "price": 13.27,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88267",
        "name": "Cuvée Rosé Suisse 50 cl",
        "price": 7.9,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88175",
        "name": "Muscat #sweet 50 cl",
        "price": 10.2,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "61650",
        "name": "Heida 75 cl",
        "price": 11.95,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "88236",
        "name": "Balance Che. blanc 75 cl",
        "price": 5.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "02782",
        "name": "Mauler Cordon Or Dry 75cl",
        "price": 16.67,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88396",
        "name": "Pinot Noir Duvallon 75 cl",
        "price": 7.93,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "13685",
        "name": "Chasselas Lemanic 75 cl",
        "price": 2.5,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "06984",
        "name": "Pinot Noir GR AOC 75 cl",
        "price": 16.67,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "65857",
        "name": "Borgo del Mandorlo Negro. 75 cl",
        "price": 10.87,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "59511",
        "name": "Porta 6 Lisboa 75 cl",
        "price": 9.27,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "21518",
        "name": "LAB Moscato 75 cl",
        "price": 7.93,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "27642",
        "name": "Rioja El Coto Crianza 75cl",
        "price": 11.93,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "16800",
        "name": "El Pescaito 75 cl",
        "price": 4.95,
        "caseOnly": true,
        "allowSingleBottle": false,
        "deal": true,
        "unit": "flasche"
      },
      {
        "art": "88490",
        "name": "Zweigelt 75 cl",
        "price": 5.73,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88713",
        "name": "Cabernet Sauvignon 5 l",
        "price": 3.79,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "52925",
        "name": "Primitivo Manduria 1488 75 cl",
        "price": 2.5,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "71679",
        "name": "Barbera Piemonte 150+1 75cl",
        "price": 9.27,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88314",
        "name": "Dôle blanche VS 75 cl",
        "price": 8.67,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "38306",
        "name": "Tempranillo Bag-in-Box 3l",
        "price": 3.08,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88264",
        "name": "Rosé Duvallon 75 cl",
        "price": 7.93,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88355",
        "name": "Balance Shiraz Rosé 75 cl",
        "price": 5.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88723",
        "name": "J.P. Chenet Cabernet-Syrah 75 cl",
        "price": 6.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "30791",
        "name": "Pinot Noir Salgesch 75 cl",
        "price": 11.93,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "52911",
        "name": "Costalago Zeni Rosso 75 cl",
        "price": 12.67,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "22227",
        "name": "Primitivo Puglia Cesario 75 cl",
        "price": 6.13,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "12507",
        "name": "Rimuss bianco dry 75 cl",
        "price": 10.33,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "52889",
        "name": "Cuvée royale Goldbeere 75 cl",
        "price": 16.27,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "69200",
        "name": "3 l bester Schweizer Wein",
        "price": 4.65,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88170",
        "name": "Grüner Veltliner 75 cl",
        "price": 5.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "68894",
        "name": "Gran Pasas Monastrell 75 cl",
        "price": 11.93,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88792",
        "name": "Ripasso Salvaterra 75 cl",
        "price": 10.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "10868",
        "name": "Aigle Chablais blanc 50 cl",
        "price": 17.1,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "06995",
        "name": "Vin Grischun GR 75 cl",
        "price": 19.93,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "81839",
        "name": "Roma Federici 75 cl",
        "price": 11.93,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88145",
        "name": "Fleurance Chasselas 50 cl",
        "price": 7.9,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88980",
        "name": "Rimuss Party o.A. 70 cl",
        "price": 6.64,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "19534",
        "name": "Cornalin du Valais 75 cl",
        "price": 15.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88839",
        "name": "Merlot del Veneto 1 l",
        "price": 4.8,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88945",
        "name": "Balance Shiraz Merlot 75 cl",
        "price": 5.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "52851",
        "name": "Oeil de Perdrix Goldb. AOC 75 cl",
        "price": 15.33,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "78660",
        "name": "Stone Cruz White Zinfandel 75 cl",
        "price": 6.4,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88160",
        "name": "Fendant VS 50 cl",
        "price": 9.9,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "52935",
        "name": "Ribera del Duero 75 cl",
        "price": 13.27,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "82384",
        "name": "Feuerheerd's Douro 75 cl",
        "price": 12.27,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88010",
        "name": "Cuvée Blanc Suisse 50 cl",
        "price": 2.5,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "69946",
        "name": "Cuvée d'Or Goldbeere 75 cl",
        "price": 2.5,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "90430",
        "name": "Clairette de Die Tradition 75 cl",
        "price": 13.13,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "91724",
        "name": "El Gringo Tempranillo 75 cl",
        "price": 10.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "63981",
        "name": "Rosato di Puglia 75 cl",
        "price": 7.33,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88008",
        "name": "Fleurance Riesling Silv. 50 cl",
        "price": 2.5,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "19542",
        "name": "Humagne Rouge VS 75 cl",
        "price": 15.33,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88791",
        "name": "Amarone Salvaterra 75 cl",
        "price": 22.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "35797",
        "name": "Blauburgunder SH 75cl",
        "price": 10.4,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "06993",
        "name": "Pinot Noir Jenins GR AOC 75 cl",
        "price": 19.47,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "81844",
        "name": "Calivo Emilia IGT 75 cl",
        "price": 11.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88002",
        "name": "Riesling S. Duvallon 75cl",
        "price": 7.93,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "36442",
        "name": "Bonavita Red 75 cl",
        "price": 8.4,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "02128",
        "name": "Aigle blanc AOC 75 cl",
        "price": 15.87,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "19517",
        "name": "Petite Arvine VS 75 cl",
        "price": 15.93,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "55123",
        "name": "Amore Uno 75 cl",
        "price": 9.27,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "04962",
        "name": "Johannisberg VS 50 cl",
        "price": 15.9,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "52895",
        "name": "Pinot Noir Hallau 75 cl",
        "price": 19.93,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "36832",
        "name": "Ripasso Salvaterra 50 cl",
        "price": 13.9,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "14413",
        "name": "Pena Roja Jumilla 75 cl",
        "price": 6.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "19527",
        "name": "Malvoisie VS 75 cl",
        "price": 2.5,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88362",
        "name": "Zürcher Clevner 75 cl",
        "price": 10.33,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "19569",
        "name": "Blauburgunder CH 75 cl",
        "price": 7.93,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88142",
        "name": "Schafiser weiss 50 cl",
        "price": 2.5,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "19815",
        "name": "Gewürztraminer 75 cl",
        "price": 11.93,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "75700",
        "name": "Domaine Moulin Saint-Jean 75 cl",
        "price": 13.27,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "10974",
        "name": "Nero d'Avola Sicilia 75cl",
        "price": 5.87,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "30045",
        "name": "Chardonnay Genève 75 cl",
        "price": 10.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "36830",
        "name": "Amarone Salvaterra 50 cl",
        "price": 2.5,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "68907",
        "name": "Cantello Vino Tinto 75 cl",
        "price": 11.33,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "73769",
        "name": "Chianti Terra Grande 75 cl",
        "price": 10.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88954",
        "name": "Bar Royal Litchi 75 cl",
        "price": 2.5,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "88988",
        "name": "Rimuss Litchi Perl 75cl",
        "price": 7.47,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "08029",
        "name": "Malbec Fabre Montmayou 75 cl",
        "price": 14.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "83859",
        "name": "Gamaret VS 75 cl",
        "price": 12.73,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "73752",
        "name": "Rosso Terre di Toscana 75 cl",
        "price": 9.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "32556",
        "name": "Rioja El Coto Crianza 50 cl",
        "price": 14.7,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "47616",
        "name": "Jaume Serra 75 cl",
        "price": 2.5,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "24279",
        "name": "Merlot del Veneto 50 cl",
        "price": 5.8,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "14415",
        "name": "Pinot blanc Suisse 75 cl",
        "price": 8.67,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "77902",
        "name": "Stone Cruz Cabernet 75 cl",
        "price": 6.4,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "35703",
        "name": "Ass. Cépages Duvallon 75cl",
        "price": 7.93,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "63571",
        "name": "La Maison du Sud 75 cl",
        "price": 6.13,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "78657",
        "name": "Stone Cruz Chardonnay 75 cl",
        "price": 6.4,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "95394",
        "name": "Schaumwein Volgaz rosé 75 cl",
        "price": 15.93,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "80436",
        "name": "Cannonau Sardegna Baiolu 75 cl",
        "price": 2.5,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "61581",
        "name": "Appassimento Coronati 75 cl",
        "price": 7.93,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "53019",
        "name": "Barbian Roble 75 cl",
        "price": 10.87,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "80434",
        "name": "Esprit Côtes du Rhône 75 cl",
        "price": 10.6,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "52879",
        "name": "St. Saphorin Petit Ver. 75 cl",
        "price": 24.67,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "14417",
        "name": "Hauswein weiss Nr. 1 1 l",
        "price": 3.7,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "61091",
        "name": "Hauswein rot Nr. 2 1 l",
        "price": 3.7,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "77543",
        "name": "Stone Cruz Zinfandel 75cl",
        "price": 6.4,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "72238",
        "name": "Merlot Rosso 75 cl",
        "price": 16.67,
        "allowSingleBottle": true,
        "unit": "flasche"
      },
      {
        "art": "64440",
        "name": "Schafiser weiss 75 cl",
        "price": 13.13,
        "allowSingleBottle": true,
        "unit": "flasche"
      }
    ]
  }
];
