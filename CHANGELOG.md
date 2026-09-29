# Changelog – Landi Getränke-Tool

Alle wesentlichen Änderungen an diesem Projekt werden hier dokumentiert.

---

## [v2.0.0] – 2026-09-29 — Linearer Wizard-Flow

### Neu (Kunde)
- **Wizard-Architektur (4 Schritte):** Der Kunde sieht nicht mehr alles auf einmal, sondern wird linear durch den Bestellprozess geführt:
  - Schritt 0: Einstieg – Wahl zwischen „Getränkerechner" oder „Direkt bestellen"
  - Schritt 1: Rechner (Personenanzahl, Dauer, Anlass)
  - Schritt 2: Produktauswahl (Getränke + Festmobiliar)
  - Schritt 3: Persönliche Angaben & Logistik
  - Schritt 4: Zusammenstellung prüfen & PDF erstellen
- **Fortschrittsanzeige:** Integrierte Progress-Bar im Header zeigt den aktuellen Schritt an
- **Zurück-Buttons:** Jeder Schritt hat eine klar beschriftete Zurück-Schaltfläche
- **Formularvalidierung:** Name, Telefon und Logistikfeld sind Pflichtfelder; fehlende Felder werden rot markiert
- **Logistik-Toggle:** Bei Wechsel Abholung/Lieferung werden nur die jeweils relevanten Pflichtfelder geprüft; Fehler-Ränder werden beim Umschalten automatisch zurückgesetzt
- **Zusammenstellung prüfen (Schritt 4):** Vollständige Übersicht mit Name, Telefon, Datum, Adresse, Bemerkung + alle Produkte mit direkter Mengenanpassung (+/−) vor PDF-Erstellung
- **Datenschutztext:** Persönliche Daten bleiben auf dem Gerät; nur operative Daten werden gespeichert
- **Bezeichnung:** „Bestellung vorbereitet" → „Zusammenstellung vorbereitet"

### Geändert (Kunde)
- Getränkerechner-Einklapp-Funktion entfernt (Rechner ist im Wizard immer sichtbar)
- Zusammenfassungs-Badge entfernt
- Summary-Bar nur noch in Schritt 2 sichtbar

### Neu (Admin – Retour)
- **Radio-Buttons statt Checkboxen:**
  - „Ursprüngliche Rechnung bereits bezahlt" → Ja / Nein, auf Lieferschein (Pflichtfeld)
  - „Festmobiliar komplett retour gebracht" → Ja / Nein / Keine vorhanden (Pflichtfeld)
- **Retour-PDF:** Druckt Festmobiliar-Status automatisch auf den Beleg (blau = OK, rot = ausstehend)
- **Retour-Artikelliste:** Festmobiliar wird in der Mengeneingabe ausgeblendet (Radio-Button unten reicht)
- **Pflichtfeld-Prüfung:** Beide Radio-Gruppen müssen ausgefüllt sein vor Abschluss

### Bugfixes
- JS-Fehler in `renderReview()` durch veralteten Overlay-Aufruf behoben
- Validierungs-Reset beim Wechsel Abholung/Lieferung korrigiert

---

## [v1.5.0] – 2026-09-29 — Wizard-Grundstruktur

- Initialer Commit des Wizard-Flows (4-Schritt-Struktur, Einstiegsseite, Fortschrittsanzeige, Zurück-Buttons, Formularvalidierung)

---

## [v1.4.2] – 2026-09-28

- Lieferschein-Abschnitt im Kunden-PDF ergänzt
- Kundenansicht-Button aus dem Header entfernt
- Scroll-Problem im Datenschutz-Modal behoben

---

## [v1.4.1] – 2026-09-27

- Datenschutzhinweis (DS-4) und Supabase-Fehler-Banner ergänzt
- Changelog-Header in index.html und app.js eingefügt

---

## [v1.3.0] – 2026-09-27

- Refactoring: index.html aufgeteilt in styles.css und app.js
- Pack-Pflicht für Mineralwasser & Süssgetränke

---

## [v1.2.0] – 2026-09-27

- Admin-Dashboard: Rüstlisten-PDF, Retour-Modul, Feedback-Notizen
- Retour-PDF: Artikelnummern, Festmobiliar-Checkbox, Gutschrift-Berechnung
- Depot/Leergut-Eingabe im Retour-Modal
- Picking List PDF
- Benutzerdefiniertes Bestätigungs-Modal

---

## [v1.1.0] – 2026-09-26

- Festmobiliar & Mietmobiliar: Eigener Bereich in Bestellung und PDF
- Supabase-Backend: Bestellungen, Produkte, Kategorien, Festmaterial
- Admin-Bereich: Login, Bestellübersicht, Sortimentsverwaltung, RLS

---

## [v1.0.0] – 2026-09-25

- Erste Version: Getränkerechner, Produktauswahl, PDF via jsPDF
- Automatische Harassen-Umrechnung
- Lokale Datenhaltung (ohne Backend)
