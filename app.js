/* ===================================================================
 * LANDI GETRÄNKE-TOOL
 * Version: 1.4.2
 * Letzte Änderung: 29.09.2026
 * 
 * CHANGELOG (Was ist neu?):
 * - v1.5.0: Wizard-Flow für Kundenbereich (Zwei Einstiege, 4 Schritte), Sticky Fortschrittsleiste
 * - v1.4.2: Manuelles Feld für "Lieferung" im PDF hinzugefügt, Button "Kundenansicht" entfernt, Modal-Scroll Fix
 * - v1.4.1: Datenschutz-Hinweis bei Feedback, Globale Error-Banner (try/catch)
 * - v1.4.0: Code in HTML, CSS und JS aufgeteilt (Performance & Übersicht)
 * - v1.4.0: Mineralwasser/Süssgetränke zwingend auf "Pack" umgestellt
 * - v1.3.0: Admin-Dashboard Lade-Animation & "Überschreiben"-Warnung
 * - v1.2.0: Datenschutz-Modal eingebaut
 * - v1.1.0: RLS Sicherheitsregeln für Supabase aktiviert
 * - v1.0.0: Initiales Release
 * =================================================================== */

// Fehler-Anzeige (CODE-2)
window.showErrorToast = function(msg) {
  let container = document.getElementById("errorToastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "errorToastContainer";
    container.style.cssText = "position:fixed; top:20px; left:50%; transform:translateX(-50%); z-index:9999; display:flex; flex-direction:column; gap:10px; pointer-events:none; width: 90%; max-width: 400px;";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <span>${msg}</span>`;
  toast.style.cssText = "background:#EF4444; color:white; padding:12px 20px; border-radius:8px; font-weight:600; font-size:0.9rem; box-shadow:0 10px 25px rgba(239,68,68,0.4); display:flex; align-items:center; gap:10px; opacity:0; transform:translateY(-20px); transition:all 0.3s ease;";
  container.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-20px)";
    setTimeout(() => toast.remove(), 300);
  }, 5000);
};

/* =========================================================================
   WIZARD STATE & LOGIK
   ========================================================================= */
window.wizardStep = 0;
window.wizardEntry = null; // 'calculator' | 'direct'

window.setWizardEntry = function(entry) {
  window.wizardEntry = entry;
  if (entry === 'calculator') {
    setWizardStep(1);
    document.getElementById("drinkCalculatorSection").classList.remove("is-collapsed");
    document.getElementById("calcCollapsibleBody").style.display = "block";
    calcHasUserSelected = false; // Zurücksetzen, falls neu gestartet
  } else {
    // Direkt zu Produkten
    setWizardStep(2);
  }
};

window.setWizardStep = function(step) {
  window.wizardStep = step;

  // 1. Alle Steps ausblenden
  document.querySelectorAll('.wizard-step').forEach(el => {
    el.classList.remove('active');
  });

  // 2. Ziel-Step einblenden
  const targetEl = document.getElementById(`wizard-step-${step}`);
  if (targetEl) targetEl.classList.add('active');

  // 3. Fortschrittsleiste
  const progress = document.getElementById('wizard-progress');
  if (step === 0) {
    progress.style.display = 'none';
  } else {
    progress.style.display = 'flex';
    // Update active state
    document.querySelectorAll('.wizard-progress-step').forEach(el => {
      const s = parseInt(el.getAttribute('data-step'), 10);
      const line = el.previousElementSibling;
      const checkIcon = el.querySelector('.step-check');
      const numberText = el.querySelector('.step-number');
      
      el.classList.remove('current', 'done');
      if (line && line.classList.contains('wizard-progress-line')) line.classList.remove('done');
      if (checkIcon) checkIcon.style.display = 'none';
      if (numberText) numberText.style.display = 'inline';

      if (s < step) {
        el.classList.add('done');
        if (line && line.classList.contains('wizard-progress-line')) line.classList.add('done');
        if (checkIcon) checkIcon.style.display = 'inline-block';
        if (numberText) numberText.style.display = 'none';
      } else if (s === step) {
        el.classList.add('current');
        if (line && line.classList.contains('wizard-progress-line')) line.classList.add('done');
      }
    });
  }

  // 4. Spezifische UI
  const cartSummaryBar = document.getElementById('cartSummaryBar');
  
  if (step === 2) {
    // Zeige Footer Bar nur in Step 2 an (ausser auf Mobile, wo es vielleicht sinn macht)
    if (cartSummaryBar) cartSummaryBar.style.display = 'block';

    // Tracker anzeigen oder verbergen
    const sfbHeader = document.getElementById('stickyFestbedarfBar');
    if (window.wizardEntry === 'direct' || !calcHasUserSelected) {
      // Wenn man direkt einsteigt oder die Standardwerte übernommen hat
      if (sfbHeader) sfbHeader.style.display = 'none';
      const calcPanel = document.getElementById('calcTrackerPanel');
      if (calcPanel) calcPanel.style.display = 'none';
    } else {
      // Wenn "Selbst zusammenstellen" gewählt wurde
      if (sfbHeader) sfbHeader.style.display = 'block';
    }
    
    // Festmobiliar-Titel anpassen, je nach Rechner/Direkt Einstieg
    const festSection = document.getElementById('festmaterialSection');
    if (festSection) festSection.style.display = 'block'; // Immer da, aber zusammengeklappt
  } else {
    // Verberge Sticky Footer
    if (cartSummaryBar) cartSummaryBar.style.display = 'none';
    const sfbHeader = document.getElementById('stickyFestbedarfBar');
    if (sfbHeader) sfbHeader.style.display = 'none';
  }

  if (step === 4) {
    // Render Modal / Inline Review Inhalt
    renderReview();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.wizardGoBack = function() {
  if (window.wizardStep === 2) {
    if (window.wizardEntry === 'calculator') {
      setWizardStep(1);
    } else {
      setWizardStep(0);
    }
  } else if (window.wizardStep === 3) {
    setWizardStep(2);
  } else if (window.wizardStep === 4) {
    setWizardStep(3);
  }
};

// Fallback-Sortiment, falls sortiment.js nicht geladen werden konnte
if (typeof CATEGORIES === "undefined") {
  window.CATEGORIES = [
    {
      name: "Top-Angebote",
      items: [
        { art: "60001", name: "Bier-Harass Aktion, 20x33cl", price: 17.90, caseSize: 20, caseOnly: true, deal: true },
        { art: "60002", name: "Weinprobierpaket, 6 Flaschen", price: 59.00, unit: "stk", caseOnly: true, deal: true },
      ]
    },
    {
      name: "Mineralwasser",
      items: [
        { art: "40001", name: "Mineralwasser prickelnd 1.5L", price: 0.95, caseSize: 6 },
        { art: "40002", name: "Mineralwasser still 1.5L", price: 0.95, caseSize: 6 },
        { art: "40010", name: "Wasser Zitrone 1.5L", price: 1.20, caseSize: 6 },
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
      name: "Biere",
      items: [
        { art: "10234", name: "Feldschlösschen Lager, Flasche 33cl", price: 1.60, caseSize: 20 },
        { art: "10235", name: "Feldschlösschen Lager, Dose 50cl", price: 1.40, caseSize: 24, unit: "dose" },
        { art: "10240", name: "Quöllfrisch, Flasche 33cl", price: 1.95, caseSize: 20 },
      ]
    },
    {
      name: "Weine",
      items: [
        { art: "20110", name: "Fendant AOC, Rotwein 75cl", price: 12.90, caseSize: 6 },
        { art: "20115", name: "Pinot Noir AOC 75cl", price: 14.50, caseSize: 6 },
        { art: "20120", name: "Chasselas AOC 75cl", price: 11.20, caseSize: 6 },
      ]
    },
    {
      name: "Spirituosen",
      items: [
        { art: "87601", name: "Appenzeller Alpenbitter 29% 100 cl", price: 31.50, priceSingle: 31.50, gebinde: "Einzeln", allowSingleBottle: true, unit: "flasche", subCategory: "Likör & Bitter" },
        { art: "87602", name: "Kernobst / Träsch Willisau 45% 100 cl", price: 21.90, priceSingle: 21.90, gebinde: "Einzeln", allowSingleBottle: true, unit: "flasche", subCategory: "Edelbrand & Schnaps" },
        { art: "87607", name: "Trojka Vodka Red 24% 70 cl", price: 14.50, priceSingle: 14.50, gebinde: "Einzeln", allowSingleBottle: true, unit: "flasche", subCategory: "Vodka, Gin & Rum" }
      ]
    }
  ];
}

// Normalisierung: id und unit automatisch ergänzen
function normalizeAssortment() {
  CATEGORIES.forEach((cat, cIdx) => {
    (cat.items || []).forEach((p, pIdx) => {
      p.category = cat.name;
      if (!p.id) {
        p.id = p.art ? "art-" + String(p.art).replace(/[^a-zA-Z0-9_-]/g, "_") : `item-${cIdx}-${pIdx}`;
      }
      if (!p.unit) {
        p.unit = "flasche";
      }
      if (typeof p.price !== "number") {
        p.price = parseFloat(p.price) || 0;
      }
      if (p.eigenmarke === undefined) {
        p.eigenmarke = /farmer/i.test(p.name);
      } else {
        p.eigenmarke = !!p.eigenmarke;
      }

      // GEÄNDERT: Mineralwasser und Süssgetränke zwingend als "Pack" behandeln
      if (cat.name === "Mineralwasser" || cat.name === "Süssgetränke") {
        if (!p.caseSize || p.caseSize <= 1) p.caseSize = 6;
        if (p.pricePack === undefined || p.pricePack === null) {
          if (p.priceSingle !== undefined && p.priceSingle !== null) {
            p.pricePack = Math.round(p.priceSingle * p.caseSize * 100) / 100;
          } else if (p.price !== undefined && p.price !== null) {
            p.pricePack = Math.round(p.price * p.caseSize * 100) / 100;
          }
        }
        p.gebinde = "Pack";
        p.caseOnly = true;
        p.allowSingleBottle = false;
      }
      const isWine = (cat.name === "Weine" || cat.name === "Schaumweine & Champagner") && !/Bag-in-Box|3\s*l|5\s*l/i.test(p.name);
      if (isWine) {
        if (!p.caseSize) p.caseSize = 6;
        if (!p.gebinde || p.gebinde === "Einzeln") p.gebinde = "Einzeln & Pack";
      }
      if (p.gebinde === "Einzeln & Pack") {
        if (!p.caseSize || p.caseSize <= 1) p.caseSize = 6;
        if (p.priceSingle !== undefined && p.priceSingle !== null && (p.pricePack === undefined || p.pricePack === null)) {
          p.pricePack = Math.round(p.priceSingle * p.caseSize * 100) / 100;
        } else if (p.pricePack !== undefined && p.pricePack !== null && (p.priceSingle === undefined || p.priceSingle === null)) {
          p.priceSingle = Math.round((p.pricePack / p.caseSize) * 100) / 100;
        } else if ((p.priceSingle === undefined || p.priceSingle === null) && p.price) {
          if (p.price > 25 && p.caseSize >= 6) {
            p.pricePack = p.price;
            p.priceSingle = Math.round((p.price / p.caseSize) * 100) / 100;
          } else {
            p.priceSingle = p.price;
            p.pricePack = Math.round(p.price * p.caseSize * 100) / 100;
          }
        }
      }
      if (p.gebinde === "Pack" || p.caseOnly) {
        p.caseOnly = true;
        p.allowSingleBottle = false;
      } else if (p.gebinde === "Einzeln") {
        p.caseOnly = false;
        p.allowSingleBottle = true;
      } else if (p.gebinde === "Einzeln & Pack") {
        p.caseOnly = false;
        p.allowSingleBottle = true;
      } else {
        if (p.allowSingleBottle === undefined) {
          p.allowSingleBottle = p.caseOnly ? false : true;
        }
      }
    });
  });
}
normalizeAssortment();

const qty = {};

function money(n) {
  return "CHF " + (n || 0).toFixed(2);
}

function getUnitLabel(p, short = false) {
  if (p.unit === "dose") return short ? "Dosen" : "Dosen";
  if (p.unit === "stk") return short ? "Stk." : "Stück";
  return short ? "Fl." : "Flaschen";
}

function getCaseLabel(p, short = false) {
  const cat = (p.category || "").toLowerCase();
  const isWine = cat === "weine" || cat.includes("wein") || cat.includes("schaumwein");
  if (isWine) {
    return p.caseSize ? (short ? `Kart. à ${p.caseSize}` : `Karton à ${p.caseSize}`) : (short ? "Kart." : "Karton");
  }
  const isMW = /MW\b|Mehrweg/i.test(p.name);
  if (isMW) {
    return p.caseSize ? (short ? `Har. à ${p.caseSize}` : `Harass à ${p.caseSize}`) : (short ? "Har." : "Harass");
  } else {
    return p.caseSize ? (short ? `Pck. à ${p.caseSize}` : `Pack à ${p.caseSize}`) : (short ? "Pck." : "Pack");
  }
}

function getBottleCount(p) {
  const q = qty[p.id] || { bottles: 0, cases: 0 };
  if (p.caseOnly || p.gebinde === "Pack" || p.allowSingleBottle === false) return (q.cases || 0) * (p.caseSize || 1);
  return (q.bottles || 0) + ((q.cases || 0) * (p.caseSize || 1));
}

const SUPABASE_URL = "https://jjcbuhwkaghsrsoibmdy.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_jtSBM7NOu7O1vKO-huNUOg_Ju-Ewncr";

let supabaseClient = null;
try {
  if (window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (e) {
  console.warn("Supabase init error:", e);
}

// Bereinigung etwaiger alter GitHub-Tokens aus localStorage
try { localStorage.removeItem("landi_admin_gh_token"); } catch (e) {}

// Globale XSS-Schutzfunktion
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}



let isEditPricesMode = false;
let isAdminAuthenticated = false;
let currentAdminEmail = "";
let currentAdminRole = "super_admin"; // "super_admin" or "viewer"

// Lokale Admin-Sitzung wiederherstellen
try {
  if (localStorage.getItem("landi_admin_session") === "true") {
    isAdminAuthenticated = true;
    currentAdminEmail = "Admin";
  }
} catch (e) {}

function getBaseUrl() {
  let p = window.location.pathname || "/";
  if (p.endsWith("/admin") || p.endsWith("/admin/")) {
    p = p.replace(/\/admin\/?$/i, "/");
  } else if (p.endsWith("/index.html")) {
    p = p.replace(/index\.html$/i, "");
  }
  if (!p.endsWith("/")) p += "/";
  return p;
}

function setAdminUrl(isPush = false) {
  try {
    if (window.location.hash !== "#admin") {
      history.replaceState({ admin: true }, "", window.location.pathname + "#admin");
    }
  } catch (e) {
    window.location.hash = "admin";
  }
}

function setNormalUrl(isPush = false) {
  const base = getBaseUrl();
  try {
    history.replaceState({ admin: false }, "", base);
  } catch (e) {
    if (window.location.hash) window.location.hash = "";
  }
}

function isAdminUrlRequested() {
  const hash = (window.location.hash || "").toLowerCase();
  const search = (window.location.search || "").toLowerCase();
  const path = (window.location.pathname || "").toLowerCase();
  return hash.includes("admin") || search.includes("admin") || path.endsWith("/admin") || path.endsWith("/admin/");
}

function initWelcomeModal() {
  // Wenn /admin oder #admin aufgerufen wird oder Admin eingeloggt ist: NIEMALS das Welcome-Popup öffnen!
  if (isAdminUrlRequested() || isEditPricesMode) {
    closeInfoModal();
    return;
  }
  // Für reguläre Kunden das Welcome-Popup beim Laden öffnen
  openInfoModal();
}

function checkAdminUrlTrigger() {
  if (isAdminUrlRequested()) {
    closeInfoModal();
    if (!isAdminAuthenticated) {
      setTimeout(() => {
        openAdminModal();
      }, 100);
    } else {
      toggleEditPricesMode(true);
    }
  } else {
    // Standard-Besucher: Niemals automatisch im Bearbeitungsmodus sein
    if (isEditPricesMode) {
      isEditPricesMode = false;
      isCustomerPreviewMode = false;
      updateAdminViewDisplay();
      updateAdminHeaderBtn();
      renderPresets();
      renderProducts();
    }
  }
}

// Auto-Login Status über Supabase Auth prüfen
if (supabaseClient) {
  supabaseClient.auth.getSession().then(({ data: { session } }) => {
    if (session && session.user) {
      isAdminAuthenticated = true;
      currentAdminEmail = session.user.email || "Admin";
      // Rollen-Zuweisung anhand der E-Mail-Adresse
      const SUPER_ADMIN_EMAILS_S = ["timo.lanter@icloud.com"];
      currentAdminRole = SUPER_ADMIN_EMAILS_S.includes((session.user.email || "").toLowerCase()) ? "super_admin" : "viewer";
      try { localStorage.setItem("landi_admin_session", "true"); } catch (e) {}
      try { localStorage.setItem("landi_admin_role", currentAdminRole); } catch (e) {}
      if (isAdminUrlRequested()) {
        toggleEditPricesMode(true);
        setAdminUrl();
      } else {
        isEditPricesMode = false;
        const b = document.getElementById("editBanner");
        if (b) { b.setAttribute("hidden", ""); b.classList.remove("active"); b.style.setProperty("display", "none", "important"); }
      }
    } else {
      // Falls eine lokale Admin-Sitzung per Passwort hinterlegt ist, diese beibehalten!
      let hasLocalSession = false;
      try { hasLocalSession = localStorage.getItem("landi_admin_session") === "true"; } catch (e) {}
      if (!hasLocalSession) {
        isAdminAuthenticated = false;
        currentAdminEmail = "";
        if (isAdminUrlRequested()) {
          openAdminModal();
        } else {
          setNormalUrl();
        }
      } else {
        isAdminAuthenticated = true;
        if (isAdminUrlRequested()) {
          toggleEditPricesMode(true);
          setAdminUrl();
        }
      }
    }
    updateAdminHeaderBtn();
  });

  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session && session.user) {
      isAdminAuthenticated = true;
      currentAdminEmail = session.user.email || "Admin";
      try { localStorage.setItem("landi_admin_session", "true"); } catch (e) {}
      if (event === "SIGNED_IN" || isAdminUrlRequested()) {
        toggleEditPricesMode(true);
        setAdminUrl();
      } else {
        isEditPricesMode = false;
        const b = document.getElementById("editBanner");
        if (b) { b.setAttribute("hidden", ""); b.classList.remove("active"); b.style.setProperty("display", "none", "important"); }
      }
    } else if (event === "SIGNED_OUT") {
      let hasLocalSession = false;
      try { hasLocalSession = localStorage.getItem("landi_admin_session") === "true"; } catch (e) {}
      if (!hasLocalSession) {
        isAdminAuthenticated = false;
        currentAdminEmail = "";
        isEditPricesMode = false;
        const b = document.getElementById("editBanner");
        if (b) { b.setAttribute("hidden", ""); b.classList.remove("active"); b.style.setProperty("display", "none", "important"); }
        setNormalUrl();
      }
    }
    updateAdminHeaderBtn();
    renderProducts();
  });
}

// Geheime Admin-Zugänge: URL (#admin, ?admin, /admin), 3x Klick aufs Logo, Shortcut Alt+A
let brandClickCount = 0;
let brandClickTimer = null;
function handleBrandBadgeClick() {
  brandClickCount++;
  clearTimeout(brandClickTimer);
  brandClickTimer = setTimeout(() => {
    brandClickCount = 0;
  }, 750);
  if (brandClickCount >= 3) {
    brandClickCount = 0;
    if (!isAdminAuthenticated) {
      setAdminUrl();
      openAdminModal();
    } else {
      toggleEditPricesMode();
    }
  }
}

window.addEventListener("hashchange", checkAdminUrlTrigger);
window.addEventListener("popstate", checkAdminUrlTrigger);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", checkAdminUrlTrigger);
} else {
  setTimeout(checkAdminUrlTrigger, 100);
}

window.addEventListener("keydown", (e) => {
  if ((e.altKey && (e.key === "a" || e.key === "A")) || 
      (e.ctrlKey && e.shiftKey && (e.key === "a" || e.key === "A"))) {
    e.preventDefault();
    if (!isAdminAuthenticated) {
      setAdminUrl();
      openAdminModal();
    } else {
      toggleEditPricesMode();
    }
  }
});

function openAdminModal() {
  if (isAdminAuthenticated) {
    toggleEditPricesMode(true);
    setAdminUrl();
    return;
  }
  const emailInput = document.getElementById("adminEmailInput");
  const pwdInput = document.getElementById("adminPasswordInput");
  if (pwdInput) pwdInput.value = "";
  document.getElementById("adminOverlay").classList.add("open");
  setTimeout(() => {
    if (pwdInput) pwdInput.focus();
    else if (emailInput) emailInput.focus();
  }, 100);
}

function closeAdminModal() {
  const m = document.getElementById("adminOverlay");
  if (m) m.classList.remove("open");
  if (!isAdminAuthenticated) {
    setNormalUrl();
  }
}

function handleAdminOverlayClick(e) {
  if (e.target.id === "adminOverlay") closeAdminModal();
}

async function loginAdmin() {
  const emailInput = document.getElementById("adminEmailInput");
  const pwdInput = document.getElementById("adminPasswordInput");
  const email = emailInput ? emailInput.value.trim() : "";
  const pwd = pwdInput ? pwdInput.value.trim() : "";

  if (!email) {
    alert("Bitte gib deine E-Mail-Adresse ein.");
    if (emailInput) emailInput.focus();
    return;
  }
  if (!pwd) {
    alert("Bitte gib dein Passwort ein.");
    if (pwdInput) pwdInput.focus();
    return;
  }

  if (!supabaseClient) {
    alert("Supabase ist nicht verbunden.");
    return;
  }

  const submitBtn = document.getElementById("adminLoginSubmitBtn");
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Anmelden..."; }

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password: pwd });

    if (error || !data || !data.session) {
      alert("Falsches E-Mail oder Passwort. Bitte überprüfe deine Eingabe.");
      if (pwdInput) { pwdInput.value = ""; pwdInput.focus(); }
      return;
    }

    isAdminAuthenticated = true;
    currentAdminEmail = email;
    // Rollen-Zuweisung anhand der E-Mail-Adresse
    const SUPER_ADMIN_EMAILS = ["timo.lanter@icloud.com"];
    currentAdminRole = SUPER_ADMIN_EMAILS.includes(email.toLowerCase()) ? "super_admin" : "viewer";
    try { localStorage.setItem("landi_admin_session", "true"); } catch (e) {}
    try { localStorage.setItem("landi_admin_role", currentAdminRole); } catch (e) {}
    if (pwdInput) pwdInput.value = "";
    if (emailInput) emailInput.value = "";
    closeAdminModal();
    toggleEditPricesMode(true);
    setAdminUrl();
    showAdminToast(email + " wurde angemeldet", "", false);
  } catch (e) {
    console.error("Login Fehler:", e);
    alert("Fehler beim Anmelden: " + (e.message || e));
  } finally {
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Anmelden"; }
  }
}

async function logoutAdmin() {
  isAdminAuthenticated = false;
  currentAdminEmail = "";
  try {
    localStorage.removeItem("landi_admin_session");
  } catch (e) {}
  if (supabaseClient) {
    try { await supabaseClient.auth.signOut(); } catch (e) {}
  }
  await exitEditPricesMode();
}

let editingProductArt = null;
let editingProductOldId = null;

function openAdminSortimentModal() {
  if (!isAdminAuthenticated) {
    openAdminModal();
    return;
  }
  renderAdminSortimentTable();
  document.getElementById("adminSortimentOverlay").classList.add("open");
}

function closeAdminSortimentModal() {
  document.getElementById("adminSortimentOverlay").classList.remove("open");
}

function renderAdminSortimentTable() {
  const searchTerm = (document.getElementById("adminSortSearch")?.value || "").trim().toLowerCase();
  const statusFilter = document.getElementById("adminSortStatusFilter")?.value || "all";
  const catFilter = document.getElementById("adminSortCatFilter")?.value || "all";
  const tbody = document.getElementById("adminSortTableBody");
  if (!tbody) return;

  let allProducts = [];
  const processedArts = new Set();
  CATEGORIES.forEach(c => {
    (c.items || []).forEach(p => {
      if (c.name === "Top-Angebote" || processedArts.has(p.art)) return;
      processedArts.add(p.art);
      allProducts.push({ ...p, catName: c.name });
    });
  });

  const filtered = allProducts.filter(p => {
    if (searchTerm) {
      const matchName = p.name && p.name.toLowerCase().includes(searchTerm);
      const matchArt = p.art && String(p.art).toLowerCase().includes(searchTerm);
      if (!matchName && !matchArt) return false;
    }
    if (statusFilter === "active" && p.disabled) return false;
    if (statusFilter === "disabled" && !p.disabled) return false;
    if (statusFilter === "eigenmarke" && !p.eigenmarke) return false;
    if (statusFilter === "top" && !(p.topAngebot || p.deal)) return false;
    if (catFilter !== "all" && p.catName !== catFilter) return false;
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:var(--text-muted);">Keine Produkte gefunden.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(p => {
    const isDeact = !!p.disabled;
    const priceText = p.gebinde === "Einzeln & Pack"
      ? `Fl: CHF ${(p.priceSingle||0).toFixed(2)} / Pck: CHF ${(p.pricePack||p.price||0).toFixed(2)}`
      : `CHF ${(p.price||0).toFixed(2)}`;
    const encArt = encodeURIComponent(p.art);

    return `
      <tr style="${isDeact ? 'background:#FDF2F2; opacity:0.85;' : ''}">
        <td><strong>${escapeHtml(p.art)}</strong></td>
        <td>
          <div style="font-weight:600; color:var(--text);">${escapeHtml(p.name)} ${p.eigenmarke ? '<span style="font-size:0.7rem; background:#E8F5E9; color:#1B5E20; padding:2px 6px; border-radius:4px; margin-left:4px; font-weight:700;"><i class="fa-solid fa-tag"></i> Eigenmarke</span>' : ''} ${(p.topAngebot || p.deal) ? '<span style="font-size:0.7rem; background:#EFF6FF; color:#1D4ED8; border:1px solid #BFDBFE; padding:2px 6px; border-radius:4px; margin-left:4px; font-weight:700;">Top</span>' : ''}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(p.catName)} ${p.subCategory ? '• ' + escapeHtml(p.subCategory) : ''}</div>
        </td>
        <td><span style="font-size:0.8rem; background:var(--primary-light); padding:2px 6px; border-radius:6px;">${escapeHtml(p.gebinde || 'Standard')}</span></td>
        <td><span style="font-weight:700; color:var(--accent-dark);">${priceText}</span></td>
        <td>
          <button class="admin-fest-status-btn ${isDeact ? 'disabled' : 'active'}" onclick="toggleProductStatus(decodeURIComponent('${encArt}'))" title="Klicken zum Umschalten (Aktivieren / Deaktivieren)">
            ${isDeact ? '<i class="fa-solid fa-triangle-exclamation"></i> Ausgeblendet' : '<i class="fa-solid fa-check"></i> Aktiv'}
          </button>
        </td>
        <td style="text-align:right; white-space:nowrap;">
          <button onclick="openEditProductModal(decodeURIComponent('${encArt}'))" style="background:var(--bg); border:1px solid var(--border); padding:5px 9px; border-radius:6px; cursor:pointer; font-size:0.82rem; margin-right:4px;" title="Bearbeiten">
            ✏️
          </button>
          <button onclick="deleteProduct(decodeURIComponent('${encArt}'))" style="background:#fee2e2; border:1px solid #fca5a5; color:#991b1b; padding:5px 9px; border-radius:6px; cursor:pointer; font-size:0.82rem;" title="Löschen">
            🗑️
          </button>
        </td>
      </tr>
    `;
  }).join("");
  if (typeof updateAdminDashboardStats === "function") {
    updateAdminDashboardStats();
  }
}

function showAdminToast(name, action, showSaveBtn = true) {
  const container = document.getElementById("adminToastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "admin-toast";

  const safeName = escapeHtml(name || "Artikel");
  const safeAction = escapeHtml(action || "");
  const isMessageOnly = !action;

  const saveHtml = showSaveBtn ? `
        <div class="admin-toast-sub">Um alle Änderungen festzuhalten, auf <strong>«In Supabase speichern»</strong> drücken.</div>
        <button class="admin-toast-action-btn" onclick="savePricesToSupabase()"><i class="fa-solid fa-cloud"></i> In Supabase speichern</button>` : "";

  toast.innerHTML = `
    <div class="admin-toast-body">
      <div class="admin-toast-icon">✓</div>
      <div class="admin-toast-content">
        <div class="admin-toast-title">${isMessageOnly ? safeName : `Das Produkt <strong>"${safeName}"</strong> wurde erfolgreich ${safeAction}.`}</div>
        ${saveHtml}
      </div>
      <button class="admin-toast-close" title="Schliessen">✕</button>
    </div>
    <div class="admin-toast-progress"></div>
  `;

  const closeBtn = toast.querySelector(".admin-toast-close");
  const dismiss = () => {
    toast.classList.remove("show");
    toast.classList.add("hide");
    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 380);
  };
  if (closeBtn) closeBtn.onclick = dismiss;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("show");
    const progress = toast.querySelector(".admin-toast-progress");
    if (progress) {
      setTimeout(() => {
        progress.style.width = "0%";
      }, 50);
    }
  });

  setTimeout(dismiss, 5200);
}

function toggleProductStatus(art) {
  let prodName = "";
  let nowDisabled = false;
  for (const cat of CATEGORIES) {
    for (const p of (cat.items || [])) {
      if (p.art === art) {
        p.disabled = !p.disabled;
        prodName = p.name;
        nowDisabled = !!p.disabled;
      }
    }
  }
  renderAdminSortimentTable();
  renderProducts();
  showAdminToast(prodName || `Art. ${art}`, nowDisabled ? "deaktiviert" : "aktiviert");
}

function deleteProduct(art) {
  const p = findProduct(art);
  const prodName = p ? p.name : `Art. ${art}`;
  if (!confirm(`Möchtest du das Produkt "${prodName}" wirklich dauerhaft löschen?`)) return;
  
  const targetArt = String(art);
  CATEGORIES.forEach(cat => {
    cat.items = (cat.items || []).filter(x => String(x.art) !== targetArt && String(x.id) !== targetArt && String(x.id) !== ('art-' + targetArt));
  });

  if (supabaseClient && isAdminAuthenticated) {
    supabaseClient.from('products').delete().eq('art', targetArt).then(() => {
      supabaseClient.from('products').delete().eq('id', 'art-' + targetArt);
    }).catch(e => console.warn("Supabase delete product error:", e));
  }
  
  renderAdminSortimentTable();
  renderProducts();
  showAdminToast(prodName, "gelöscht");
}

function openAddProductModal(defaultCat = "Weine") {
  editingProductArt = null;
  document.getElementById("modalProductTitle").innerHTML = '<i class="fa-solid fa-plus"></i> Neues Produkt';
  document.getElementById("formArt").value = "";
  document.getElementById("formName").value = "";
  document.getElementById("formCategory").value = defaultCat || "Weine";
  updateSubCategoryOptions("");
  document.getElementById("formGebinde").value = defaultCat === "Spirituosen" ? "Einzeln" : "Einzeln & Pack";
  document.getElementById("formPriceSingle").value = "";
  document.getElementById("formPricePack").value = "";
  document.getElementById("formCaseSize").value = defaultCat === "Spirituosen" ? "" : "6";
  document.getElementById("formUnit").value = "flasche";
  document.getElementById("formTop").checked = false;
  document.getElementById("formEigenmarke").checked = false;
  document.getElementById("formDisabled").checked = false;
  updateGebindeFormFields();
  
  document.getElementById("adminProductEditOverlay").classList.add("open");
}

const SUBCATEGORY_OPTIONS = {
  "Süssgetränke": [
    "Cola & Softdrinks",
    "Ice Tea",
    "Säfte & Most",
    "Sirup & Punsch",
    "Energy & Mate",
    "Limonade / Sonstige"
  ],
  "Weine": [
    "Rotwein",
    "Weisswein",
    "Rosé & Schaumwein",
    "Bag-in-Box / Grossgebinde",
    "Glühwein / Sonstige"
  ],
  "Biere": [
    "Bier mit Alkohol",
    "Alkoholfrei",
    "Radler & Mix",
    "Weizenbier",
    "Cider & Biermix"
  ],
  "Mineralwasser": [
    "Mineralwasser mit Kohlensäure",
    "Mineralwasser ohne Kohlensäure",
    "Aromatisches Wasser"
  ],
  "Spirituosen": [
    "Edelbrand & Schnaps",
    "Likör & Bitter",
    "Vodka, Gin & Rum",
    "Whisky",
    "Aperitif & Digestif"
  ]
};

function updateSubCategoryOptions(selectedSubCat = "") {
  const cat = document.getElementById("formCategory")?.value || "Weine";
  const subSelect = document.getElementById("formSubCat");
  if (!subSelect) return;

  const options = SUBCATEGORY_OPTIONS[cat] || [];
  
  let html = `<option value="">-- Unterkategorie wählen --</option>`;
  options.forEach(opt => {
    const isSel = (opt === selectedSubCat) ? "selected" : "";
    html += `<option value="${opt}" ${isSel}>${opt}</option>`;
  });
  
  if (selectedSubCat && !options.includes(selectedSubCat)) {
    html += `<option value="${selectedSubCat}" selected>${selectedSubCat}</option>`;
  }

  subSelect.innerHTML = html;
}

function updateGebindeFormFields() {
  const g = document.getElementById("formGebinde").value;
  const peBox = document.getElementById("formPriceSingle");
  const ppBox = document.getElementById("formPricePack");
  if (g === "Einzeln") {
    if (peBox) peBox.placeholder = "z.B. 1.20 (Erforderlich)";
    if (ppBox) ppBox.placeholder = "Nicht benötigt für Einzeln";
  } else if (g === "Pack") {
    if (peBox) peBox.placeholder = "Nicht benötigt für Pack";
    if (ppBox) ppBox.placeholder = "z.B. 18.00 (Erforderlich)";
  } else {
    if (peBox) peBox.placeholder = "z.B. 1.20 (Einzelpreis)";
    if (ppBox) ppBox.placeholder = "z.B. 18.00 (Packpreis)";
    if (peBox && ppBox && peBox.value && !ppBox.value) {
      const cs = parseInt(document.getElementById("formCaseSize").value, 10) || 0;
      if (cs > 0) ppBox.value = (Math.round(parseFloat(peBox.value) * cs * 100) / 100).toFixed(2);
    }
  }
}

function onModalPriceSingleChange() {
  const g = document.getElementById("formGebinde").value;
  if (g === "Einzeln & Pack") {
    const pe = parseFloat(document.getElementById("formPriceSingle").value) || 0;
    const cs = parseInt(document.getElementById("formCaseSize").value, 10) || 0;
    if (pe > 0 && cs > 0) {
      document.getElementById("formPricePack").value = (Math.round(pe * cs * 100) / 100).toFixed(2);
    }
  }
}

function onModalPricePackChange() {
  const g = document.getElementById("formGebinde").value;
  if (g === "Einzeln & Pack") {
    const pp = parseFloat(document.getElementById("formPricePack").value) || 0;
    const cs = parseInt(document.getElementById("formCaseSize").value, 10) || 0;
    if (pp > 0 && cs > 0) {
      document.getElementById("formPriceSingle").value = (Math.round((pp / cs) * 100) / 100).toFixed(2);
    }
  }
}

function onModalCaseSizeChange() {
  const g = document.getElementById("formGebinde").value;
  if (g === "Einzeln & Pack") {
    const pe = parseFloat(document.getElementById("formPriceSingle").value) || 0;
    const cs = parseInt(document.getElementById("formCaseSize").value, 10) || 0;
    if (pe > 0 && cs > 0) {
      document.getElementById("formPricePack").value = (Math.round(pe * cs * 100) / 100).toFixed(2);
    }
  }
}

function openEditProductModal(art) {
  const p = findProduct(art);
  if (!p) {
    alert("Fehler: Produkt mit Art.-Nr. " + art + " konnte nicht gefunden werden.");
    return;
  }
  editingProductArt = String(p.art);
  editingProductOldId = String(p.id || ('art-' + p.art));
  document.getElementById("modalProductTitle").innerHTML = '<i class="fa-solid fa-pen"></i> Produkt bearbeiten (' + p.art + ')';
  document.getElementById("formArt").value = p.art || "";
  document.getElementById("formName").value = p.name || "";
  
  let catName = "Weine";
  for (const cat of CATEGORIES) {
    if (cat.name !== "Top-Angebote" && (cat.items || []).some(x => String(x.art) === String(p.art))) {
      catName = cat.name;
      break;
    }
  }
  document.getElementById("formCategory").value = catName;
  updateSubCategoryOptions(p.subCategory || "");
  document.getElementById("formGebinde").value = p.gebinde || (p.caseOnly ? "Pack" : (p.caseSize ? "Einzeln & Pack" : "Einzeln"));
  document.getElementById("formPriceSingle").value = p.priceSingle !== undefined && p.priceSingle !== null ? p.priceSingle : (p.gebinde === "Einzeln" ? p.price : "");
  document.getElementById("formPricePack").value = p.pricePack !== undefined && p.pricePack !== null ? p.pricePack : (p.gebinde === "Pack" ? p.price : "");
  document.getElementById("formCaseSize").value = p.caseSize || "";
  document.getElementById("formUnit").value = p.unit || "flasche";
  document.getElementById("formTop").checked = !!(p.topAngebot || p.deal);
  document.getElementById("formEigenmarke").checked = !!p.eigenmarke;
  document.getElementById("formDisabled").checked = !!p.disabled;
  
  updateGebindeFormFields();
  document.getElementById("adminProductEditOverlay").classList.add("open");
}

function closeProductEditModal() {
  editingProductArt = null;
  editingProductOldId = null;
  document.getElementById("adminProductEditOverlay").classList.remove("open");
}

function openInfoModal() {
  document.getElementById("infoModalOverlay")?.classList.add("open");
}

function closeInfoModal() {
  document.getElementById("infoModalOverlay")?.classList.remove("open");
}

function saveProductFromModal() {
  const isEdit = !!editingProductArt;
  const oldArt = editingProductArt;
  const oldId = editingProductOldId;
  const art = document.getElementById("formArt").value.trim();
  const name = document.getElementById("formName").value.trim();
  const catName = document.getElementById("formCategory").value;
  const subCat = document.getElementById("formSubCat").value.trim();
  const gebinde = document.getElementById("formGebinde").value;
  const peStr = document.getElementById("formPriceSingle").value.trim();
  const ppStr = document.getElementById("formPricePack").value.trim();
  let pe = peStr !== "" ? parseFloat(peStr) : null;
  let pp = ppStr !== "" ? parseFloat(ppStr) : null;
  const cs = parseInt(document.getElementById("formCaseSize").value, 10) || null;
  const unit = document.getElementById("formUnit").value;
  const top = document.getElementById("formTop").checked;
  const eigenmarke = document.getElementById("formEigenmarke").checked;
  const dis = document.getElementById("formDisabled").checked;

  if (!art || !name) {
    alert("Bitte Artikel-Nr. und Produktnamen ausfüllen!");
    return;
  }

  if (gebinde === "Einzeln & Pack") {
    if (pe !== null && pp === null && cs) {
      pp = Math.round(pe * cs * 100) / 100;
    } else if (pp !== null && pe === null && cs) {
      pe = Math.round((pp / cs) * 100) / 100;
    }
  }

  const mainPrice = pp !== null ? pp : (pe !== null ? pe : 0);

  const productObj = {
    art: art,
    id: "art-" + String(art).replace(/[^a-zA-Z0-9_-]/g, "_"),
    name: name,
    price: mainPrice,
    gebinde: gebinde,
    subCategory: subCat,
    unit: unit,
    topAngebot: top,
    eigenmarke: eigenmarke,
    disabled: dis
  };
  if (pe !== null) productObj.priceSingle = pe;
  if (pp !== null) productObj.pricePack = pp;
  if (cs) productObj.caseSize = cs;

  if (gebinde === "Pack") {
    productObj.caseOnly = true;
    productObj.allowSingleBottle = false;
  } else if (gebinde === "Einzeln") {
    productObj.caseOnly = false;
    productObj.allowSingleBottle = true;
  } else {
    productObj.caseOnly = false;
    productObj.allowSingleBottle = true;
  }

  // Falls Art.-Nr. geändert wurde, altes Produkt in Supabase bereinigen
  if (isEdit && oldArt && String(oldArt) !== String(art) && supabaseClient && isAdminAuthenticated) {
    const targetDelId = oldId || ('art-' + oldArt);
    supabaseClient.from('products').delete().eq('id', targetDelId).then(() => {
      supabaseClient.from('products').delete().eq('art', oldArt);
    }).catch(e => console.warn("Supabase altes Produkt entfernen:", e));
  }

  const targetOldArts = new Set([String(art)]);
  if (oldArt) targetOldArts.add(String(oldArt));
  if (oldId) targetOldArts.add(String(oldId));

  CATEGORIES.forEach(cat => {
    cat.items = (cat.items || []).filter(x => !targetOldArts.has(String(x.art)) && !targetOldArts.has(String(x.id)));
  });

  let targetCatObj = CATEGORIES.find(c => c.name === catName);
  if (!targetCatObj) {
    targetCatObj = { name: catName, items: [] };
    CATEGORIES.push(targetCatObj);
  }
  targetCatObj.items.push(productObj);

  if (top) {
    let topCatObj = CATEGORIES.find(c => c.name === "Top-Angebote");
    if (!topCatObj) {
      topCatObj = { name: "Top-Angebote", items: [] };
      CATEGORIES.unshift(topCatObj);
    }
    const topCopy = { ...productObj, deal: true };
    topCatObj.items.push(topCopy);
  }

  editingProductArt = null;
  editingProductOldId = null;

  normalizeAssortment();
  closeProductEditModal();
  renderAdminSortimentTable();
  renderProducts();
  showAdminToast(name, isEdit ? "bearbeitet" : "hinzugefügt");
}

let isCustomerPreviewMode = false;

function updateAdminViewDisplay() {
  const adminDash = document.getElementById("adminDashboardView");
  const custView = document.getElementById("customerShopView");
  const prevBanner = document.getElementById("adminPreviewBanner");
  const editBanner = document.getElementById("editBanner");
  const searchWrap = document.querySelector(".search-wrapper");
  const sfbBar = document.getElementById("stickyFestbedarfBar");
  const summaryBar = document.querySelector(".summary-bar");
  const adminCalcBtn = document.getElementById("adminCalcSettingsBtnContainer");

  if (isEditPricesMode && !isCustomerPreviewMode) {
    // Reiner Admin Dashboard Modus: Shop, Rechner und Kundenkategorien komplett ausblenden
    if (adminDash) adminDash.style.display = "block";
    if (custView) custView.style.display = "none";
    if (prevBanner) prevBanner.style.display = "none";
    if (editBanner) editBanner.style.setProperty("display", "none", "important");
    if (searchWrap) searchWrap.style.display = "none";
    if (sfbBar) sfbBar.style.display = "none";
    if (summaryBar) summaryBar.style.display = "none";
    if (adminCalcBtn) adminCalcBtn.style.display = "none";
  } else if (isEditPricesMode && isCustomerPreviewMode) {
    // Admin Kunden-Vorschau Modus
    if (adminDash) adminDash.style.display = "none";
    if (custView) custView.style.display = "block";
    if (prevBanner) prevBanner.style.display = "flex";
    if (editBanner) editBanner.style.setProperty("display", "none", "important");
    if (searchWrap) searchWrap.style.display = "";
    if (sfbBar) sfbBar.style.display = "";
    if (summaryBar) summaryBar.style.display = "";
    if (adminCalcBtn) adminCalcBtn.style.display = "block";
  } else {
    // Normaler Kunden-Shop Modus
    if (adminDash) adminDash.style.display = "none";
    if (custView) custView.style.display = "block";
    if (prevBanner) prevBanner.style.display = "none";
    if (editBanner) editBanner.style.setProperty("display", "none", "important");
    if (searchWrap) searchWrap.style.display = "";
    if (sfbBar) sfbBar.style.display = "";
    if (summaryBar) summaryBar.style.display = "";
    if (adminCalcBtn) adminCalcBtn.style.display = "none";
  }
}

function updateAdminDashboardStats() {
  if (!window.isCatalogLoaded) {
    const spinner = '<i class="fa-solid fa-spinner fa-spin" style="font-size:0.8em; color:var(--text-muted);"></i>';
    const ids = ["adminStatTotal", "adminStatActive", "adminStatDisabled", "adminStatTop", "adminStatEigen"];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = spinner;
    });
    return;
  }

  let totalCount = 0;
  let activeCount = 0;
  let disabledCount = 0;
  let topCount = 0;
  let eigenmarkeCount = 0;

  const seenArts = new Set();
  (CATEGORIES || []).forEach(cat => {
    (cat.items || []).forEach(p => {
      const artKey = String(p.art);
      if (seenArts.has(artKey)) return;
      seenArts.add(artKey);
      totalCount++;
      if (p.disabled) {
        disabledCount++;
      } else {
        activeCount++;
      }
      if (p.topAngebot || p.deal) topCount++;
      if (p.eigenmarke) eigenmarkeCount++;
    });
  });

  const elTotal = document.getElementById("adminStatTotal");
  const elActive = document.getElementById("adminStatActive");
  const elDisabled = document.getElementById("adminStatDisabled");
  const elTop = document.getElementById("adminStatTop");
  const elEigen = document.getElementById("adminStatEigen");
  const elEmail = document.getElementById("adminCurrentEmailBadge");

  if (elTotal) elTotal.textContent = totalCount;
  if (elActive) elActive.textContent = activeCount;
  if (elDisabled) elDisabled.textContent = disabledCount;
  if (elTop) elTop.textContent = topCount;
  if (elEigen) elEigen.textContent = eigenmarkeCount;
  if (elEmail) elEmail.textContent = currentAdminEmail || "admin@landi.ch";
}

function switchToCustomerPreview() {
  if (!isAdminAuthenticated) return;
  isCustomerPreviewMode = true;
  updateAdminViewDisplay();
  updateAdminHeaderBtn();
  updateAdminCardPermissions();
  renderPresets();
  renderProducts();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function switchToAdminDashboard() {
  if (!isAdminAuthenticated) return;
  isCustomerPreviewMode = false;
  updateAdminViewDisplay();
  updateAdminHeaderBtn();
  updateAdminCardPermissions();
  updateAdminDashboardStats();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateAdminCardPermissions() {
  const restricted = ["dashCardSeed", "dashCardCsv", "dashCardExport", "dashCardPreview", "dashCardCalc"];
  const isViewer = currentAdminRole === "viewer";
  restricted.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (isViewer) {
      el.classList.add("card-locked");
    } else {
      el.classList.remove("card-locked");
    }
  });
}

function updateAdminHeaderBtn() {
  const btn = document.getElementById("editPricesBtn");
  if (!btn) return;
  if (isAdminAuthenticated) {
    if (isCustomerPreviewMode) {
      btn.style.display = "inline-flex";
      btn.innerHTML = '<i class="fa-solid fa-arrow-left" style="margin-right:5px;"></i> Zum Dashboard';
      btn.style.background = "#3d7d1e";
      btn.onclick = switchToAdminDashboard;
    } else {
      // Ausblenden, da es im Dashboard dafür bereits eine grosse Karte (Kundenansicht) gibt.
      btn.style.display = "none";
    }
  } else {
    btn.style.display = "none";
  }
}

async function exitEditPricesMode() {
  if (supabaseClient) {
    try {
      await supabaseClient.auth.signOut();
    } catch (e) {
      console.warn("Signout warning:", e);
    }
  }
  const loggedOutEmail = currentAdminEmail;
  isAdminAuthenticated = false;
  currentAdminEmail = "";
  isEditPricesMode = false;
  isCustomerPreviewMode = false;

  updateAdminViewDisplay();
  updateAdminHeaderBtn();
  renderPresets();
  renderProducts();

  // Auf Standardseite leiten: URL auf normale Seite setzen
  setNormalUrl();

  showAdminToast(loggedOutEmail ? `${loggedOutEmail} wurde abgemeldet` : "Abgemeldet", "", false);
}

function toggleEditPricesMode(forceState) {
  if (!isAdminAuthenticated) {
    isEditPricesMode = false;
    openAdminModal();
    return;
  }

  if (forceState === false || (forceState === undefined && isEditPricesMode && !isCustomerPreviewMode)) {
    exitEditPricesMode();
    return;
  }

  isEditPricesMode = true;
  isCustomerPreviewMode = false;

  updateAdminViewDisplay();
  updateAdminHeaderBtn();
  updateAdminCardPermissions();
  updateAdminDashboardStats();
  setAdminUrl();
}

function updateProductPrice(id, val) {
  const num = Math.max(0, parseFloat(val) || 0);
  const p = findProduct(id);
  if (p) {
    p.price = num;
    if (p.gebinde === "Einzeln & Pack") {
      p.pricePack = num;
      if (p.caseSize && p.caseSize > 0) {
        p.priceSingle = Math.round((num / p.caseSize) * 100) / 100;
      }
    } else if (p.gebinde === "Pack" || p.caseOnly) {
      p.pricePack = num;
    } else if (p.gebinde === "Einzeln") {
      p.priceSingle = num;
    }
    renderProducts();
    updateSummaryBar();
    showAdminToast(p.name, "bearbeitet");
  }
}

function updateProductSinglePrice(id, val) {
  const num = Math.max(0, parseFloat(val) || 0);
  const p = findProduct(id);
  if (p) {
    p.priceSingle = num;
    if (p.caseSize && p.caseSize > 0) {
      p.pricePack = Math.round(num * p.caseSize * 100) / 100;
      p.price = p.pricePack;
    } else {
      p.price = num;
    }
    renderProducts();
    updateSummaryBar();
    showAdminToast(p.name, "bearbeitet");
  }
}

function cleanCategoriesForExport() {
  return CATEGORIES.map(c => ({
    name: c.name,
    items: c.items.map(i => {
      const item = { art: i.art, name: i.name, price: i.price };
      if (i.priceSingle !== undefined && i.priceSingle !== null) item.priceSingle = i.priceSingle;
      if (i.pricePack !== undefined && i.pricePack !== null) item.pricePack = i.pricePack;
      if (i.gebinde) item.gebinde = i.gebinde;
      if (i.subCategory) item.subCategory = i.subCategory;
      if (i.caseSize) item.caseSize = i.caseSize;
      if (i.caseOnly) item.caseOnly = i.caseOnly;
      if (i.allowSingleBottle !== undefined) item.allowSingleBottle = i.allowSingleBottle;
      if (i.deal) item.deal = i.deal;
      if (i.topAngebot) item.topAngebot = i.topAngebot;
      if (i.eigenmarke) item.eigenmarke = i.eigenmarke;
      if (i.disabled) item.disabled = i.disabled;
      if (i.unit) item.unit = i.unit;
      return item;
    })
  }));
}

function generateSortimentCsvString() {
  const headers = [
    'Art.-Nr.',
    'Name des Produkts',
    'Gebinde',
    'Kategorie',
    'Top-Angebot',
    'Unterkategorie',
    'Preis Einzeln (CHF)',
    'Preis Pack (CHF)',
    'Eigenmarke',
    'Status',
    'Packungsgrösse',
    'Einheit'
  ];

  function escapeCsv(val) {
    if (val === null || val === undefined) return '';
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  }

  const rows = [headers.map(escapeCsv).join(',')];
  const seenIds = new Set();

  CATEGORIES.forEach(cat => {
    if (cat.name === 'Top-Angebote') return;
    (cat.items || []).forEach(item => {
      const artNr = item.art || item.id;
      if (seenIds.has(artNr)) return;
      seenIds.add(artNr);

      const gebinde = item.gebinde || 'Einzeln';
      const isTop = (item.topAngebot || item.deal) ? 'TRUE' : 'FALSE';
      const isEigenmarke = item.eigenmarke ? 'TRUE' : 'FALSE';
      const status = item.disabled ? 'Deaktiviert' : 'Aktiv';
      const pEinzeln = (item.priceSingle != null) ? Number(item.priceSingle).toFixed(2) : '';
      const pPack = (item.pricePack != null) ? Number(item.pricePack).toFixed(2) : '';
      const packGroesse = item.caseSize ? String(item.caseSize) : '';
      const einheit = item.unit || 'flasche';

      const row = [
        artNr,
        item.name || '',
        gebinde,
        cat.name || '',
        isTop,
        item.subCategory || '',
        pEinzeln,
        pPack,
        isEigenmarke,
        status,
        packGroesse,
        einheit
      ];
      rows.push(row.map(escapeCsv).join(','));
    });
  });

  return '\uFEFF' + rows.join('\r\n');
}

function downloadSortimentCsv() {
  const csvContent = generateSortimentCsvString();
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const dateStr = new Date().toISOString().slice(0, 10);
  a.download = `sortiment_${dateStr}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportUpdatedJs() {
  const cleaned = cleanCategoriesForExport();

  const code = "/**\n * LANDI GETRÄNKE-SORTIMENT (Stand " + new Date().toLocaleDateString("de-CH") + ")\n */\n\nconst CATEGORIES = " + JSON.stringify(cleaned, null, 2) + ";\n\nconst PRESETS = " + JSON.stringify(presetsList, null, 2) + ";\n";
  
  navigator.clipboard.writeText(code).then(() => {
    alert("✅ Der aktualisierte Sortiment-Code wurde in deine Zwischenablage kopiert! Du kannst ihn direkt in sortiment.js einfügen.");
  }).catch(() => {
    prompt("Hier ist der neue Code für sortiment.js (Strg+C / Cmd+C zum Kopieren):", code);
  });
}

function mapDbToProduct(p) {
  return {
    id: p.id || `art-${String(p.art).replace(/[^a-zA-Z0-9_-]/g, '_')}`,
    art: String(p.art || ''),
    name: p.name || '',
    category: p.category || '',
    subCategory: p.sub_category || '',
    price: Number(p.price) || 0,
    priceSingle: p.price_single != null ? Number(p.price_single) : undefined,
    pricePack: p.price_pack != null ? Number(p.price_pack) : undefined,
    caseSize: Number(p.case_size) || 1,
    gebinde: p.gebinde || 'Einzeln',
    unit: p.unit || 'flasche',
    topAngebot: !!p.top_angebot,
    deal: !!p.deal,
    caseOnly: !!p.case_only,
    allowSingleBottle: p.allow_single_bottle !== false,
    eigenmarke: !!p.eigenmarke,
    disabled: !!p.disabled
  };
}

function mapProductToDb(p, catName) {
  return {
    id: p.id || `art-${String(p.art).replace(/[^a-zA-Z0-9_-]/g, '_')}`,
    art: String(p.art || ''),
    name: p.name || '',
    category: catName || p.category || '',
    sub_category: p.subCategory || '',
    price: Number(p.price) || 0,
    price_single: p.priceSingle != null ? Number(p.priceSingle) : null,
    price_pack: p.pricePack != null ? Number(p.pricePack) : null,
    case_size: Number(p.caseSize) || 1,
    gebinde: p.gebinde || 'Einzeln',
    unit: p.unit || 'flasche',
    top_angebot: !!(p.topAngebot || p.deal),
    deal: !!p.deal,
    case_only: !!p.caseOnly,
    allow_single_bottle: p.allowSingleBottle !== false,
    eigenmarke: !!p.eigenmarke,
    disabled: !!p.disabled
  };
}

async function loadCatalogFromSupabase() {
  if (!supabaseClient) return false;
  try {
    const { data: cats, error: catErr } = await supabaseClient
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (catErr || !cats || cats.length === 0) {
      console.log("Supabase: Noch keine Kategorien vorhanden.");
      window.isCatalogLoaded = true;
      if (typeof updateAdminDashboardStats === "function") updateAdminDashboardStats();
      return false;
    }

    const { data: prods, error: prodErr } = await supabaseClient
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true });

    if (prodErr || !prods || prods.length === 0) {
      console.log("Supabase: Noch keine Produkte vorhanden.");
      window.isCatalogLoaded = true;
      if (typeof updateAdminDashboardStats === "function") updateAdminDashboardStats();
      return false;
    }

    const { data: dbPresets } = await supabaseClient
      .from('presets')
      .select('*')
      .order('sort_order', { ascending: true });

    const mappedCategories = [];
    const topItems = prods.filter(p => !p.disabled && (p.top_angebot || p.deal)).map(mapDbToProduct);
    if (topItems.length > 0) {
      mappedCategories.push({
        name: "Top-Angebote",
        items: topItems
      });
    }

    cats.forEach(c => {
      const catProds = prods.filter(p => p.category === c.name).map(mapDbToProduct);
      mappedCategories.push({
        name: c.name,
        items: catProds
      });
    });

    if (typeof CATEGORIES !== "undefined" && Array.isArray(CATEGORIES)) {
      CATEGORIES.length = 0;
      mappedCategories.forEach(c => CATEGORIES.push(c));
    }
    window.CATEGORIES = CATEGORIES;

    if (dbPresets && dbPresets.length > 0) {
      presetsList = dbPresets.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description || '',
        icon: p.icon || '⚡',
        items: p.items || []
      }));
      window.presetsList = presetsList;
    }

    normalizeAssortment();
    renderPresets();
    renderProducts();
    if (document.getElementById("adminSortimentOverlay")?.classList.contains("open")) {
      renderAdminSortimentTable();
    }

    const seedBtn = document.getElementById("seedSupabaseBtn");
    if (seedBtn) seedBtn.style.display = "none";

    console.log(`✅ ${prods.length} Produkte und ${cats.length} Kategorien live aus Supabase geladen!`);
    window.isCatalogLoaded = true;
    if (typeof updateAdminDashboardStats === "function") updateAdminDashboardStats();
    return true;
  } catch (err) {
    console.warn("Konnte Sortiment nicht aus Supabase laden:", err);
    if (typeof window.showErrorToast === "function") window.showErrorToast("Keine Verbindung zur Datenbank. Standard-Sortiment wird geladen.");
    return false;
  }
}

async function savePricesToSupabase() {
  if (!supabaseClient) {
    alert("❌ Supabase ist nicht verbunden.");
    return;
  }
  if (!isAdminAuthenticated) {
    alert("🔒 Bitte melde dich zuerst als Admin mit deinem Supabase-Account an.");
    openAdminModal();
    return;
  }

  const saveBtn = document.getElementById("saveSupabaseBtn") || document.getElementById("dashSaveSupabaseBtn");
  const origText = saveBtn ? saveBtn.textContent : "";
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.textContent = "⏳ Speichere in Supabase...";
  }

  try {
    // 1. Kategorien speichern
    const catRows = [];
    let cIdx = 0;
    CATEGORIES.forEach(c => {
      if (c.name === 'Top-Angebote') return;
      catRows.push({
        id: c.name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
        name: c.name,
        sort_order: cIdx++
      });
    });
    const { error: catErr } = await supabaseClient.from('categories').upsert(catRows);
    if (catErr) throw catErr;

    // 2. Produkte speichern
    const prodRows = [];
    const seen = new Set();
    let pIdx = 0;
    CATEGORIES.forEach(c => {
      if (c.name === 'Top-Angebote') return;
      (c.items || []).forEach(item => {
        if (seen.has(item.art)) return;
        seen.add(item.art);
        const r = mapProductToDb(item, c.name);
        r.sort_order = pIdx++;
        prodRows.push(r);
      });
    });

    for (let i = 0; i < prodRows.length; i += 50) {
      const chunk = prodRows.slice(i, i + 50);
      const { error: prodErr } = await supabaseClient.from('products').upsert(chunk);
      if (prodErr) throw prodErr;
    }

    // 2b. Gelöschte oder umbenannte Produkte in Supabase bereinigen
    const currentProdIds = new Set(prodRows.map(p => p.id));
    const currentProdArts = new Set(prodRows.map(p => p.art));
    const { data: dbProds } = await supabaseClient.from('products').select('id, art');
    if (dbProds && dbProds.length > 0) {
      const obsoleteIds = dbProds
        .filter(p => !currentProdIds.has(p.id) && !currentProdArts.has(p.art))
        .map(p => p.id);
      if (obsoleteIds.length > 0) {
        console.log(`Bereinige ${obsoleteIds.length} veraltete Produkte aus Supabase...`);
        for (let i = 0; i < obsoleteIds.length; i += 50) {
          await supabaseClient.from('products').delete().in('id', obsoleteIds.slice(i, i + 50));
        }
      }
    }

    // 3. Presets speichern
    if (window.presetsList && window.presetsList.length > 0) {
      const pRows = presetsList.map((p, idx) => ({
        id: p.id,
        title: p.title,
        description: p.description || '',
        icon: p.icon || '⚡',
        items: p.items || [],
        sort_order: idx
      }));
      const { error: presetErr } = await supabaseClient.from('presets').upsert(pRows);
      if (presetErr) throw presetErr;
    }

    // 4. Festmaterial & Mietmobiliar speichern
    if (typeof saveFestmaterialToSupabase === 'function') {
      await saveFestmaterialToSupabase(false);
    }

    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.textContent = "✅ In Supabase gespeichert!";
      setTimeout(() => { saveBtn.textContent = origText; }, 2500);
    }
    showAdminToast("Alle Änderungen erfolgreich in Supabase gespeichert!", "");
    alert("✅ Alle Änderungen wurden erfolgreich in Supabase gespeichert und sind sofort live!");

  } catch (err) {
    console.error("Supabase Save Error:", err);
    alert("❌ Fehler beim Speichern in Supabase:\n" + (err.message || JSON.stringify(err)));
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.textContent = origText;
    }
  }
}

async function seedSupabaseFromBrowser() {
  if (!supabaseClient) {
    alert("❌ Supabase ist nicht verbunden.");
    return;
  }
  if (!isAdminAuthenticated) {
    alert("🔒 Bitte melde dich zuerst als Admin mit deinem Supabase-Account an.");
    openAdminModal();
    return;
  }

  const ok = confirm("⚠️ ACHTUNG: Dies überschreibt die aktuellen Produkte in der Datenbank mit den Standardwerten. Eigene Anpassungen an Produkten und Preisen gehen verloren.\n\nMöchtest du wirklich fortfahren?");
  if (!ok) return;

  const btn = document.getElementById("seedSupabaseBtn");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "⏳ Übertrage Daten...";
  }

  try {
    const catRows = [];
    let cIdx = 0;
    CATEGORIES.forEach(c => {
      if (c.name === 'Top-Angebote') return;
      catRows.push({
        id: c.name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
        name: c.name,
        sort_order: cIdx++
      });
    });
    const { error: catErr } = await supabaseClient.from('categories').upsert(catRows);
    if (catErr) throw catErr;

    const prodRows = [];
    const seen = new Set();
    let pIdx = 0;
    CATEGORIES.forEach(c => {
      if (c.name === 'Top-Angebote') return;
      (c.items || []).forEach(item => {
        if (seen.has(item.art)) return;
        seen.add(item.art);
        const r = mapProductToDb(item, c.name);
        r.sort_order = pIdx++;
        prodRows.push(r);
      });
    });

    for (let i = 0; i < prodRows.length; i += 50) {
      const chunk = prodRows.slice(i, i + 50);
      const { error: prodErr } = await supabaseClient.from('products').upsert(chunk);
      if (prodErr) throw prodErr;
    }

    if (window.presetsList && window.presetsList.length > 0) {
      const pRows = presetsList.map((p, idx) => ({
        id: p.id,
        title: p.title,
        description: p.description || '',
        icon: p.icon || '⚡',
        items: p.items || [],
        sort_order: idx
      }));
      const { error: presetErr } = await supabaseClient.from('presets').upsert(pRows);
      if (presetErr) throw presetErr;
    }

    alert(`🎉 Großartig! ${prodRows.length} Produkte und ${catRows.length} Kategorien wurden erfolgreich in Supabase übertragen!`);
    if (btn) btn.style.display = "none";
  } catch (err) {
    console.error("Supabase Seed Error:", err);
    alert("❌ Fehler beim Übertragen nach Supabase:\n" + (err.message || JSON.stringify(err)));
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-rocket"></i> Sortiment übertragen';
    }
  }
}

const activeSubFilters = {};

const SUB_FILTERS = {
  "Weine": [
    { label: "Alle", match: () => true },
    { label: "Rotwein", match: p => p.subCategory === "Rotwein" || /rosso|rot|primitivo|dôle|salvagnin|pinot noir|tinto|cabernet|merlot|syrah|gamay|monastrell|zweigelt|rioja|barbera|chianti|amarone|ripasso|rouge|borgo|velarino|el gringo|schweizer/i.test(p.name) },
    { label: "Weisswein", match: p => p.subCategory === "Weisswein" || /fendant|chasselas|mont sur rolle|luins|yvorne|st. saphorin|villette|epesses|heida|johannisberg|riesling|chardonnay|moscato|mosketto|blanc|weiss|grigio|veltliner|clairette|aigle|guyen/i.test(p.name) },
    { label: "Rosé & Schaumwein", match: p => p.subCategory === "Rosé & Schaumwein" || /rosé|rosato|oeil|œil|prosecco|spumante|schaumwein|volgaz|rimuss|mauler|federweiss/i.test(p.name) }
  ],
  "Süssgetränke": [
    { label: "Alle", match: () => true },
    { label: "Cola & Softdrinks", match: p => p.subCategory === "Cola & Softdrinks" || /coca|cola|citro|grapefruit|lemon soda|sanal|sinalco|rivella|san pellegrino/i.test(p.name) },
    { label: "Ice Tea", match: p => p.subCategory === "Ice Tea" || /ice tea|eistee/i.test(p.name) },
    { label: "Säfte & Most", match: p => p.subCategory === "Säfte & Most" || /saft|orangensaft|traubensaft|cranberry|multivitamin|sauser|capri|most|süessmost|schnitzwasser/i.test(p.name) },
    { label: "Sirup & Punsch", match: p => p.subCategory === "Sirup & Punsch" || /sirup|punsch|holunder|focus water|vitaminwater/i.test(p.name) },
    { label: "Energy & Mate", match: p => p.subCategory === "Energy & Mate" || p.subCategory === "Energy Drinks" || p.subCategory === "Mate" || /energy|red bull|mate/i.test(p.name) }
  ],
  "Spirituosen": [
    { label: "Alle", match: () => true },
    { label: "Edelbrand & Schnaps", match: p => p.subCategory === "Edelbrand & Schnaps" || /willisau|pflümli|träsch|kernobst|kirsch|grappa|williams|zwetschgen|obstler/i.test(p.name) },
    { label: "Likör & Bitter", match: p => p.subCategory === "Likör & Bitter" || /appenzeller|alpenbitter|likör|baileys|amaretto|ramazzotti|jägermeister/i.test(p.name) },
    { label: "Vodka, Gin & Rum", match: p => p.subCategory === "Vodka, Gin & Rum" || /trojka|vodka|gin|rum|whisky|havana/i.test(p.name) }
  ],
  "Biere": [
    { label: "Alle", match: () => true },
    { label: "Bier mit Alkohol", match: p => p.subCategory === "Bier mit Alkohol" || !/o\.a\.|0\.0|alkoholfrei|bilz|bschorle|radler|panaché|eve/i.test(p.name) },
    { label: "Alkoholfrei", match: p => p.subCategory === "Alkoholfrei" || /o\.a\.|0\.0|alkoholfrei|bilz|bschorle/i.test(p.name) },
    { label: "Radler & Mix", match: p => p.subCategory === "Radler & Mix" || /radler|panaché|eve|ginger/i.test(p.name) }
  ]
};

function getCategoryIconConfig(name) {
  const icons = {
    "Mineralwasser": {
      bg: "#E6F4F1", color: "#0D7A65",
      svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`
    },
    "Süssgetränke": {
      bg: "#FFEDD5", color: "#C2410C",
      svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10l1.4 10.2a1.5 1.5 0 0 0 1.5 1.3h4.2a1.5 1.5 0 0 0 1.5-1.3L17 10H7z"></path><line x1="6" y1="10" x2="18" y2="10"></line><path d="M12 10V3l4-1"></path></svg>`
    },
    "Biere": {
      bg: "#FEF3C7", color: "#B45309",
      svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 11h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"></path><path d="M5 8h12v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8z"></path><path d="M5 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2"></path><path d="M10 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2"></path><line x1="9" y1="12" x2="9" y2="17"></line><line x1="13" y1="12" x2="13" y2="17"></line></svg>`
    },
    "Bier": {
      bg: "#FEF3C7", color: "#B45309",
      svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 11h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"></path><path d="M5 8h12v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8z"></path><path d="M5 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2"></path><path d="M10 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2"></path><line x1="9" y1="12" x2="9" y2="17"></line><line x1="13" y1="12" x2="13" y2="17"></line></svg>`
    },
    "Weine": {
      bg: "#F7EBEB", color: "#9E2A2B",
      svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h8"></path><path d="M12 15v7"></path><path d="M12 15a7 7 0 0 0 7-7V3H5v5a7 7 0 0 0 7 7z"></path></svg>`
    },
    "Wein": {
      bg: "#F7EBEB", color: "#9E2A2B",
      svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h8"></path><path d="M12 15v7"></path><path d="M12 15a7 7 0 0 0 7-7V3H5v5a7 7 0 0 0 7 7z"></path></svg>`
    },
    "Eistee": {
      bg: "#EAF2E8", color: "#2D6A4F",
      svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.1 2 7a9 9 0 0 1-10 11z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>`
    },
    "Spirituosen": {
      bg: "#F3E8FF", color: "#7C3AED",
      svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h10l1 7H6l1-7z"></path><path d="M6 10c0 4 2.5 7 6 7s6-3 6-7"></path><line x1="12" y1="17" x2="12" y2="21"></line><line x1="8" y1="21" x2="16" y2="21"></line></svg>`
    },
    "Top-Angebote": {
      bg: "#FDF5DC", color: "#C9A227",
      svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
    }
  };
  return icons[name] || {
    bg: "#EDEAE1", color: "#5C6561",
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`
  };
}

function setSubFilter(catName, index) {
  activeSubFilters[catName] = index;
  renderProducts();
}

function renderProducts() {
  const term = document.getElementById("search").value.trim().toLowerCase();
  const wrap = document.getElementById("categories");
  
  const openStates = {};
  wrap.querySelectorAll("details.category").forEach(det => {
    openStates[det.dataset.catName] = det.open;
  });
  
  wrap.innerHTML = "";

  CATEGORIES.forEach(cat => {
    const rawItems = cat.items || [];
    const searchFiltered = rawItems.filter(p => {
      if (p.disabled && !isEditPricesMode) return false;
      return (p.name && p.name.toLowerCase().includes(term)) || 
             (p.art && String(p.art).toLowerCase().includes(term));
    });
    if (term.length > 0 && searchFiltered.length === 0) return;

    const det = document.createElement("details");
    det.className = "category";
    det.dataset.catName = cat.name;
    det.open = term.length > 0 ? true : (openStates[cat.name] === true);

    // Sub-Filter Bar rendering & Visible items determination
    const filters = SUB_FILTERS[cat.name];
    let displayItems = searchFiltered;

    let filterBar = null;
    if (filters && term.length === 0) {
      const activeIdx = activeSubFilters[cat.name] || 0;
      const activeFilter = filters[activeIdx] || filters[0];
      displayItems = searchFiltered.filter(activeFilter.match);

      filterBar = document.createElement("div");
      filterBar.className = "sub-filter-bar";
      filters.forEach((f, idx) => {
        const btn = document.createElement("button");
        btn.className = `sub-filter-btn ${idx === activeIdx ? 'active' : ''}`;
        btn.textContent = f.label;
        btn.onclick = (e) => {
          e.preventDefault();
          setSubFilter(cat.name, idx);
        };
        filterBar.appendChild(btn);
      });
    }

    // Sortierung: Eigenmarken zuerst alphabetisch (A-Z), danach alle anderen Produkte alphabetisch (A-Z)
    displayItems = [...displayItems].sort((a, b) => {
      const aEigen = a.eigenmarke ? 1 : 0;
      const bEigen = b.eigenmarke ? 1 : 0;
      if (aEigen !== bEigen) {
        return bEigen - aEigen;
      }
      return (a.name || "").localeCompare(b.name || "", "de-CH", { sensitivity: "base", numeric: true });
    });

    const visibleCount = displayItems.length;
    const selectedCount = displayItems.filter(p => getBottleCount(p) > 0).length;
    const iconCfg = getCategoryIconConfig(cat.name);
    const progressPct = visibleCount > 0 && selectedCount > 0 ? Math.round((selectedCount / visibleCount) * 100) : 0;
    const badgeText = visibleCount === 0 ? "0 Artikel" : `${selectedCount} von ${visibleCount} ausgewählt`;

    det.innerHTML = `
      <summary>
        <div class="cat-left">
          <div class="cat-icon-circle" style="background:${iconCfg.bg}; color:${iconCfg.color}">
            ${iconCfg.svg}
          </div>
          <span class="cat-title">${cat.name}</span>
        </div>
        <div class="cat-right">
          <span class="cat-badge ${selectedCount > 0 ? 'active' : ''}">${badgeText}</span>
          <svg class="chev" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
        <div class="cat-progress-bar" style="width: ${progressPct}%;"></div>
      </summary>
    `;

    if (filterBar) {
      det.appendChild(filterBar);
    }

    const grid = document.createElement("div");
    grid.className = "product-grid";

    if (displayItems.length === 0) {
      const emptyDiv = document.createElement("div");
      emptyDiv.style.cssText = "grid-column: 1 / -1; padding: 2.5rem 1rem; text-align: center; color: var(--text-muted); font-size: 0.95rem;";
      emptyDiv.innerHTML = `Keine Artikel in dieser Auswahl vorhanden.<br><button class="btn btn-secondary btn-sm" style="margin-top: 0.75rem;" onclick="openAddProductModal(decodeURIComponent('${encodeURIComponent(cat.name)}'))"><i class="fa-solid fa-plus"></i> Produkt hinzufügen</button>`;
      grid.appendChild(emptyDiv);
    } else {
      displayItems.forEach(p => {
      const row = document.createElement("div");
      row.dataset.productId = p.id;
      const q = qty[p.id] || { bottles: 0, cases: 0 };
      const isSel = ((q.bottles || 0) > 0 || (q.cases || 0) > 0);
      row.className = "product" + (isSel ? " active" : "");

      let qtyHtml = "";
      if (p.caseOnly || p.gebinde === "Pack") {
        qtyHtml = `
          <div class="qty-field">
            <button class="qty-btn" onclick="changeQty('${p.id}','cases',-1)">−</button>
            <input type="number" id="input_${p.id}_cases" min="0" value="${q.cases}" oninput="setQty('${p.id}','cases',this.value)" onfocus="this.select()">
            <button class="qty-btn" onclick="changeQty('${p.id}','cases',1)">+</button>
            <label>${getCaseLabel(p)}</label>
          </div>`;
      } else if (p.caseSize && (p.gebinde === "Einzeln & Pack" || (p.allowSingleBottle && p.caseSize > 1))) {
        qtyHtml = `
          <div class="qty-field">
            <button class="qty-btn" onclick="changeQty('${p.id}','bottles',-1)">−</button>
            <input type="number" id="input_${p.id}_bottles" min="0" value="${q.bottles}" oninput="setQty('${p.id}','bottles',this.value)" onfocus="this.select()">
            <button class="qty-btn" onclick="changeQty('${p.id}','bottles',1)">+</button>
            <label>${getUnitLabel(p)}</label>
          </div>
          <div class="qty-field">
            <button class="qty-btn" onclick="changeQty('${p.id}','cases',-1)">−</button>
            <input type="number" id="input_${p.id}_cases" min="0" value="${q.cases}" oninput="setQty('${p.id}','cases',this.value)" onfocus="this.select()">
            <button class="qty-btn" onclick="changeQty('${p.id}','cases',1)">+</button>
            <label>${getCaseLabel(p)}</label>
          </div>`;
      } else {
        qtyHtml = `
          <div class="qty-field">
            <button class="qty-btn" onclick="changeQty('${p.id}','bottles',-1)">−</button>
            <input type="number" id="input_${p.id}_bottles" min="0" value="${q.bottles}" oninput="setQty('${p.id}','bottles',this.value)" onfocus="this.select()">
            <button class="qty-btn" onclick="changeQty('${p.id}','bottles',1)">+</button>
            <label>${getUnitLabel(p, true)}</label>
          </div>`;
      }

      const isBoth = (p.gebinde === "Einzeln & Pack" || (p.allowSingleBottle && p.caseSize && p.caseSize > 1 && !p.caseOnly));

      let priceDisplayHtml = "";

      if (isBoth) {
        const sPrice = (p.priceSingle !== undefined && p.priceSingle !== null)
          ? p.priceSingle
          : (p.caseSize ? Math.round((p.price / p.caseSize) * 100) / 100 : p.price);
        const pPrice = (p.pricePack !== undefined && p.pricePack !== null)
          ? p.pricePack
          : (p.caseSize ? Math.round(sPrice * p.caseSize * 100) / 100 : p.price);
        const caseLabel = getCaseLabel(p);
        const unitLabel = getUnitLabel(p, true);
        const sub = `/ ${unitLabel} (${money(pPrice)} / ${caseLabel})`;

        if (isEditPricesMode) {
          priceDisplayHtml = `
            <div class="product-price-box" style="text-align:right;">
              <span style="font-size:0.75rem; color:var(--text-muted); font-weight:normal; display:block;">Einzelflasche (CHF):</span>
              <input type="number" step="0.05" min="0" value="${sPrice}" onchange="updateProductSinglePrice('${p.id}', this.value)" style="width:85px; padding:6px 8px; font-weight:bold; font-size:1rem; color:var(--accent-dark); border:1px solid var(--accent-border); border-radius:8px; text-align:right;">
              <span style="font-size:0.72rem; color:var(--text-muted); display:block; margin-top:2px;">${getCaseLabel(p, true)}: ${money(pPrice)}</span>
            </div>
          `;
        } else {
          priceDisplayHtml = `
            <div class="product-price-box">
              <span class="price-val">${money(sPrice)}</span>
              <span class="price-sub">${sub}</span>
            </div>
          `;
        }
      } else if (p.caseOnly || p.gebinde === "Pack") {
        const pPrice = (p.pricePack !== undefined && p.pricePack !== null) ? p.pricePack : p.price;
        const uPrice = (p.caseSize && p.caseSize > 0) ? (pPrice / p.caseSize) : pPrice;
        const sub = `/ ${getCaseLabel(p)} (${money(uPrice)} / ${getUnitLabel(p, true)})`;

        if (isEditPricesMode) {
          priceDisplayHtml = `
            <div class="product-price-box" style="text-align:right;">
              <span style="font-size:0.75rem; color:var(--text-muted); font-weight:normal; display:block;">Packpreis (CHF):</span>
              <input type="number" step="0.05" min="0" value="${pPrice}" onchange="updateProductPrice('${p.id}', this.value)" style="width:85px; padding:6px 8px; font-weight:bold; font-size:1rem; color:var(--accent-dark); border:1px solid var(--accent-border); border-radius:8px; text-align:right;">
            </div>
          `;
        } else {
          priceDisplayHtml = `
            <div class="product-price-box">
              <span class="price-val">${money(pPrice)}</span>
              <span class="price-sub">${sub}</span>
            </div>
          `;
        }
      } else {
        const sPrice = (p.priceSingle !== undefined && p.priceSingle !== null) ? p.priceSingle : p.price;
        const sub = `/ ${getUnitLabel(p, true)}`;

        if (isEditPricesMode) {
          priceDisplayHtml = `
            <div class="product-price-box" style="text-align:right;">
              <span style="font-size:0.75rem; color:var(--text-muted); font-weight:normal; display:block;">Preis (CHF):</span>
              <input type="number" step="0.05" min="0" value="${sPrice}" onchange="updateProductPrice('${p.id}', this.value)" style="width:85px; padding:6px 8px; font-weight:bold; font-size:1rem; color:var(--accent-dark); border:1px solid var(--accent-border); border-radius:8px; text-align:right;">
            </div>
          `;
        } else {
          priceDisplayHtml = `
            <div class="product-price-box">
              <span class="price-val">${money(sPrice)}</span>
              <span class="price-sub">${sub}</span>
            </div>
          `;
        }
      }

      const encArt = encodeURIComponent(p.art);
      row.innerHTML = `
        <div class="product-head">
          <div class="product-title-wrap">
            <div>
              <span class="product-name">${escapeHtml(p.name)}</span>
              ${(p.deal || p.topAngebot) ? '<span class="tag-top-angebot">Top Angebot</span>' : ''}
              ${p.eigenmarke ? '<span class="tag-eigenmarke">Eigenmarke</span>' : ''}
            </div>
            <div>
              <span class="product-meta">Art.-Nr. ${escapeHtml(p.art)}</span>
              ${isEditPricesMode ? `<button onclick="openEditProductModal(decodeURIComponent('${encArt}'))" style="background:#2563EB; color:white; border:none; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:600; cursor:pointer; margin-left:8px;"><i class="fa-solid fa-pen"></i> Bearbeiten</button>` : ''}
            </div>
          </div>
          ${priceDisplayHtml}
        </div>
        <div class="qty-row">${qtyHtml}</div>
      `;
      grid.appendChild(row);
    });
  }

    det.appendChild(grid);
    wrap.appendChild(det);
  });

  updateCategoryBadges();
  updateSummaryBar();
}

function updateQtyDOM(id) {
  const q = qty[id] || { bottles: 0, cases: 0 };
  document.querySelectorAll(`input[id="input_${id}_bottles"]`).forEach(bInput => {
    if (document.activeElement !== bInput) {
      bInput.value = q.bottles || 0;
    }
  });
  document.querySelectorAll(`input[id="input_${id}_cases"]`).forEach(cInput => {
    if (document.activeElement !== cInput) {
      cInput.value = q.cases || 0;
    }
  });
  const hasQty = ((q.bottles || 0) > 0 || (q.cases || 0) > 0);
  document.querySelectorAll(`.product[data-product-id="${id}"]`).forEach(el => {
    el.classList.toggle("active", hasQty);
  });
}

function updateCategoryBadges() {
  document.querySelectorAll("details.category").forEach(det => {
    const productEls = det.querySelectorAll(".product");
    const visibleCount = productEls.length;
    let selectedCount = 0;
    productEls.forEach(el => {
      const pid = el.dataset.productId;
      if (pid) {
        const p = findProduct(pid);
        if (p && getBottleCount(p) > 0) {
          selectedCount++;
        }
      }
    });
    const badgeEl = det.querySelector(".cat-badge");
    if (badgeEl) {
      badgeEl.textContent = visibleCount === 0 ? "0 Artikel" : `${selectedCount} von ${visibleCount} ausgewählt`;
      if (selectedCount > 0) {
        badgeEl.classList.add("active");
      } else {
        badgeEl.classList.remove("active");
      }
    }
    const progressBar = det.querySelector(".cat-progress-bar");
    if (progressBar) {
      const pct = visibleCount > 0 && selectedCount > 0 ? Math.round((selectedCount / visibleCount) * 100) : 0;
      progressBar.style.width = pct + "%";
    }
  });
}

function changeQty(id, field, delta) {
  const q = qty[id] || { bottles: 0, cases: 0 };
  const prevVal = q[field] || 0;
  q[field] = Math.max(0, prevVal + delta);
  qty[id] = q;
  syncLinkedField(id, field);
  updateQtyDOM(id);
  updateCategoryBadges();
  updateSummaryBar();
  if (delta > 0) triggerQtyFeedback(id);
}

function setQty(id, field, value) {
  const n = Math.max(0, parseInt(value, 10) || 0);
  const q = qty[id] || { bottles: 0, cases: 0 };
  const prevVal = q[field] || 0;
  q[field] = n;
  qty[id] = q;
  syncLinkedField(id, field);
  updateQtyDOM(id);
  updateCategoryBadges();
  updateSummaryBar();
  if (n > prevVal) triggerQtyFeedback(id);
}

function syncLinkedField(id, changedField) {
  const p = findProduct(id);
  if (!p || !p.caseSize || p.caseOnly || p.gebinde === "Pack" || p.gebinde === "Einzeln & Pack" || (p.allowSingleBottle && p.caseSize > 1)) return;
  const q = qty[id];
  if (changedField === "cases") {
    q.bottles = q.cases * p.caseSize;
  } else if (changedField === "bottles") {
    q.cases = Math.floor(q.bottles / p.caseSize);
  }
}

function findProduct(identifier) {
  if (!identifier) return null;
  const strId = String(identifier);
  for (const cat of CATEGORIES) {
    const found = (cat.items || []).find(p => p.id === strId || String(p.art) === strId);
    if (found) return found;
  }
  return null;
}

function getUnitPrice(p) {
  if (p.priceSingle) return p.priceSingle;
  return (p.caseSize && p.caseSize > 0) ? (p.price / p.caseSize) : p.price;
}

function getItemTotal(p, q) {
  if (p.caseOnly || p.gebinde === "Pack" || p.allowSingleBottle === false) {
    return (q.cases || 0) * (p.pricePack || p.price);
  }
  if (!p.caseSize || p.caseSize <= 1 || p.gebinde === "Einzeln") {
    return (q.bottles || 0) * (p.priceSingle || p.price);
  }
  const packPrice = p.pricePack !== undefined && p.pricePack !== null ? p.pricePack : (p.priceSingle ? p.priceSingle * p.caseSize : p.price);
  const singlePrice = p.priceSingle !== undefined && p.priceSingle !== null ? p.priceSingle : (packPrice / p.caseSize);
  return ((q.cases || 0) * packPrice) + ((q.bottles || 0) * singlePrice);
}

function getSelectedProducts() {
  const result = [];
  const processedIds = new Set();
  CATEGORIES.forEach(cat => {
    (cat.items || []).forEach(p => {
      if (processedIds.has(p.id)) return;
      processedIds.add(p.id);

      const q = qty[p.id] || { bottles: 0, cases: 0 };
      const n = getBottleCount(p);
      if (n > 0 || q.cases > 0) {
        const total = getItemTotal(p, q);
        result.push({ product: p, count: n, cases: q.cases, unitPrice: getUnitPrice(p), total: total });
      }
    });
  });
  return result;
}

// =========================================================================
// FESTMATERIAL & LOGISTIK LOGIK
// =========================================================================

const DEFAULT_FESTMATERIAL = (typeof FESTMATERIAL_SORTIMENT !== "undefined" && Array.isArray(FESTMATERIAL_SORTIMENT))
  ? FESTMATERIAL_SORTIMENT
  : [
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

let festmaterialList = [...DEFAULT_FESTMATERIAL];
const festQty = {};

// LocalStorage Init für Festmaterial mit Preiskompatibilität & Art.-Nr.
try {
  const cachedFest = localStorage.getItem("landi_festmaterial");
  if (cachedFest) {
    const parsed = JSON.parse(cachedFest);
    if (Array.isArray(parsed) && parsed.length > 0) {
      festmaterialList = parsed.map(item => {
        const def = DEFAULT_FESTMATERIAL.find(d => d.art === item.art || d.id === item.id || d.art === item.id);
        const artCode = String(item.art || (def ? def.art : item.id) || '').trim();
        let p = (item.price !== undefined && item.price !== null) ? parseFloat(item.price) : (def ? def.price : 0);
        let notice = item.priceNotice || "";

        // Einweggeschirr: Immer echte Preise, kein 'Preis auf Anfrage'
        if (item.category === "Einweggeschirr" || (def && def.category === "Einweggeschirr")) {
          if (isNaN(p) || p <= 0) {
            p = def ? def.price : 3.50;
          }
          if (notice.toLowerCase().includes("anfrage") || notice.toLowerCase().includes("pack")) {
            notice = "";
          }
        }

        return {
          ...def,
          ...item,
          id: artCode,
          art: artCode,
          price: isNaN(p) ? 0 : p,
          priceNotice: notice
        };
      });
    }
  }
} catch (e) {
  console.warn("Festmaterial cache read error:", e);
}

function renderFestmaterial() {
  const container = document.getElementById("festmaterialContainer");
  if (!container) return;

  const categories = [
    {
      key: "Mietmobiliar",
      title: "<svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='vertical-align: text-bottom; margin-right: 4px;'><path d='M19 20 10 4'/><path d='m5 20 9-16'/><path d='M3 20h18'/><path d='m12 15-3 5'/><path d='m12 15 3 5'/></svg> Mietmobiliar",
      subtitle: "Auf Anfrage / je nach Verfügbarkeit",
      badge: "Verfügbarkeit auf Anfrage",
      items: festmaterialList.filter(f => f.category === "Mietmobiliar" && !f.disabled)
    },
    {
      key: "Einweggeschirr",
      title: "<svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='vertical-align: text-bottom; margin-right: 4px;'><path d='M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2'/><path d='M7 2v20'/><path d='M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7'/></svg> Einweggeschirr & Festbedarf",
      subtitle: "Gabeln, Messer, Becher für Ihren Anlass",
      badge: "",
      items: festmaterialList.filter(f => f.category === "Einweggeschirr" && !f.disabled)
    }
  ];

  container.innerHTML = categories.map(cat => {
    if (cat.items.length === 0) return "";
    const itemsHtml = cat.items.map(item => {
      const currentQty = festQty[item.id] || 0;
      const isSelected = currentQty > 0;
      
      let priceHtml = "";
      if (item.price && item.price > 0) {
        // Exakt wie bei den Getränkekarten oben: product-price-box mit price-val und price-sub
        priceHtml = `
          <div class="product-price-box" style="margin-top:2px;">
            <span class="price-val">${money(item.price)}</span>
            ${item.unitDesc ? `<span class="price-sub">/ ${escapeHtml(item.unitDesc)}</span>` : ''}
          </div>
        `;
      } else {
        priceHtml = `
          <div class="festmaterial-item-unit">${escapeHtml(item.unitDesc || "")}</div>
          <span class="festmaterial-item-price">${escapeHtml(item.priceNotice || "Auf Anfrage")}</span>
        `;
      }

      return `
        <div class="festmaterial-item-row ${isSelected ? 'selected' : ''}" id="fest_row_${escapeHtml(item.id)}">
          <div class="festmaterial-item-info">
            <div class="festmaterial-item-name">${escapeHtml(item.name)}</div>
            ${item.art ? `<span class="product-meta" style="font-size:0.75rem; color:var(--text-muted); display:inline-block; margin-bottom:2px;">Art.-Nr. ${escapeHtml(item.art)}</span>` : ''}
            ${priceHtml}
          </div>
          <div class="stepper">
            <button type="button" class="qty-btn" onclick="changeFestQty('${escapeHtml(item.id)}', -1)">−</button>
            <input type="number" class="stepper-value" id="fest_input_${escapeHtml(item.id)}" value="${currentQty}" min="0" onchange="setFestQty('${escapeHtml(item.id)}', this.value)">
            <button type="button" class="qty-btn" onclick="changeFestQty('${escapeHtml(item.id)}', 1)">+</button>
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="festmaterial-group-card">
        <div class="festmaterial-group-head">
          <div>
            <h3 class="festmaterial-group-title">${cat.title}</h3>
            <div class="festmaterial-group-sub">${cat.subtitle}</div>
          </div>
          ${cat.badge ? `<span class="festmaterial-avail-pill">${cat.badge}</span>` : ""}
        </div>
        <div class="festmaterial-items-list">
          ${itemsHtml}
        </div>
      </div>
    `;
  }).join("");

  updateFestCollapsedBadge();
}

function changeFestQty(id, delta) {
  const current = festQty[id] || 0;
  const next = Math.max(0, current + delta);
  festQty[id] = next;

  const input = document.getElementById(`fest_input_${id}`);
  if (input) input.value = next;

  const row = document.getElementById(`fest_row_${id}`);
  if (row) {
    if (next > 0) row.classList.add("selected");
    else row.classList.remove("selected");
  }

  updateSummaryBar();
}

function setFestQty(id, value) {
  const num = Math.max(0, parseInt(value, 10) || 0);
  festQty[id] = num;

  const input = document.getElementById(`fest_input_${id}`);
  if (input) input.value = num;

  const row = document.getElementById(`fest_row_${id}`);
  if (row) {
    if (num > 0) row.classList.add("selected");
    else row.classList.remove("selected");
  }

  updateSummaryBar();
}

function getSelectedFestmaterial() {
  const result = [];
  festmaterialList.forEach(item => {
    const q = festQty[item.id] || 0;
    if (q > 0) {
      result.push({ item, qty: q });
    }
  });
  return result;
}

let isFestmaterialCollapsed = true;

function toggleFestmaterialSection(forceState) {
  const section = document.getElementById("festmaterialSection");
  const body = document.getElementById("festmaterialCollapsibleBody");
  const btnText = document.getElementById("festToggleBtnText");
  if (!section || !body) return;

  if (typeof forceState === "boolean") {
    isFestmaterialCollapsed = !forceState;
  } else {
    isFestmaterialCollapsed = !isFestmaterialCollapsed;
  }

  if (isFestmaterialCollapsed) {
    section.classList.add("is-collapsed");
    body.style.display = "none";
    if (btnText) btnText.textContent = "Aufklappen";
  } else {
    section.classList.remove("is-collapsed");
    body.style.display = "block";
    if (btnText) btnText.textContent = "Einklappen";
  }
  updateFestCollapsedBadge();
}

function updateFestCollapsedBadge() {
  const badge = document.getElementById("festCollapsedBadge");
  if (!badge) return;
  const selectedFest = getSelectedFestmaterial();
  const totalQty = selectedFest.reduce((sum, f) => sum + f.qty, 0);

  if (totalQty > 0) {
    badge.textContent = `${totalQty} Festartikel gewählt`;
    badge.style.display = "inline-flex";
    badge.style.background = "#edf5e8";
    badge.style.color = "#3d7d1e";
    badge.style.borderColor = "#d4e7cb";
  } else {
    badge.style.display = "none";
  }
}

function toggleLogisticsType(type) {
  const cardPickup = document.getElementById("logisticsCardPickup");
  const cardDelivery = document.getElementById("logisticsCardDelivery");
  const radioPickup = document.getElementById("radioLogisticsPickup");
  const radioDelivery = document.getElementById("radioLogisticsDelivery");
  const panelPickup = document.getElementById("logisticsPickupDetails");
  const panelDelivery = document.getElementById("logisticsDeliveryDetails");

  if (type === "delivery") {
    if (cardDelivery) cardDelivery.classList.add("active");
    if (cardPickup) cardPickup.classList.remove("active");
    if (radioDelivery) radioDelivery.checked = true;
    if (panelDelivery) panelDelivery.style.display = "block";
    if (panelPickup) panelPickup.style.display = "none";
  } else {
    if (cardPickup) cardPickup.classList.add("active");
    if (cardDelivery) cardDelivery.classList.remove("active");
    if (radioPickup) radioPickup.checked = true;
    if (panelPickup) panelPickup.style.display = "block";
    if (panelDelivery) panelDelivery.style.display = "none";
  }
}

// Admin Festmaterial Management
let editingFestItemId = null;

function openAdminFestmaterialModal() {
  if (!isAdminAuthenticated) {
    openAdminModal();
    return;
  }
  renderAdminFestmaterialTable();
  const overlay = document.getElementById("adminFestmaterialOverlay");
  if (overlay) overlay.classList.add("open");
}

function closeAdminFestmaterialModal() {
  const overlay = document.getElementById("adminFestmaterialOverlay");
  if (overlay) overlay.classList.remove("open");
}

function renderAdminFestmaterialTable() {
  const tbody = document.getElementById("adminFestTableBody");
  if (!tbody) return;

  const search = (document.getElementById("adminFestSearch")?.value || "").trim().toLowerCase();
  const catFilter = document.getElementById("adminFestCatFilter")?.value || "all";
  const statusFilter = document.getElementById("adminFestStatusFilter")?.value || "all";

  const filtered = festmaterialList.filter(item => {
    if (search && !item.name.toLowerCase().includes(search) && !(item.unitDesc || "").toLowerCase().includes(search) && !(item.art || "").toLowerCase().includes(search)) {
      return false;
    }
    if (catFilter !== "all" && item.category !== catFilter) return false;
    if (statusFilter === "active" && item.disabled) return false;
    if (statusFilter === "disabled" && !item.disabled) return false;
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:24px; color:var(--text-muted);">Keine Artikel gefunden.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    const isMob = item.category === "Mietmobiliar";
    const priceDisplay = (item.price && item.price > 0)
      ? `<strong style="color:var(--accent-dark);">CHF ${item.price.toFixed(2)}</strong>`
      : `<span style="color:var(--text-muted); font-size:0.84rem;">${escapeHtml(item.priceNotice || "Auf Anfrage")}</span>`;

    return `
      <tr>
        <td style="font-weight:600; font-family:monospace; color:var(--text);">${escapeHtml(item.art || "—")}</td>
        <td style="font-weight:600; color:var(--text);">${escapeHtml(item.name)}</td>
        <td>
          <span class="admin-fest-badge-cat ${isMob ? 'badge-mobiliar' : 'badge-geschirr'}">
            ${escapeHtml(item.category)}
          </span>
        </td>
        <td style="color:var(--text-muted); font-size:0.84rem;">${escapeHtml(item.unitDesc || "—")}</td>
        <td>${priceDisplay}</td>
        <td>
          <button class="admin-fest-status-btn ${item.disabled ? 'disabled' : 'active'}" onclick="toggleFestStatus('${escapeHtml(item.id)}')">
            ${item.disabled ? '<i class="fa-solid fa-triangle-exclamation"></i> Ausgeblendet' : '<i class="fa-solid fa-check"></i> Aktiv'}
          </button>
        </td>
        <td style="text-align:right;">
          <button onclick="openEditFestmaterialModal('${escapeHtml(item.id)}')" style="background:var(--bg); border:1px solid var(--border); padding:5px 9px; border-radius:6px; cursor:pointer; font-size:0.82rem; margin-right:4px;" title="Bearbeiten"><i class="fa-solid fa-pen"></i></button>
          <button onclick="deleteFestmaterialItem('${escapeHtml(item.id)}')" style="background:#fee2e2; border:1px solid #fca5a5; color:#991b1b; padding:5px 9px; border-radius:6px; cursor:pointer; font-size:0.82rem;" title="Löschen"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `;
  }).join("");
}

function toggleFestStatus(id) {
  const item = festmaterialList.find(f => f.id === id);
  if (!item) return;
  item.disabled = !item.disabled;
  saveFestmaterialLocal();
  renderAdminFestmaterialTable();
  renderFestmaterial();
  updateSummaryBar();
  showAdminToast(`Status für «${item.name}» aktualisiert`);
}

function openAddFestmaterialModal() {
  editingFestItemId = null;
  document.getElementById("modalFestTitle").innerHTML = '<i class="fa-solid fa-plus"></i> Neuer Festartikel';
  document.getElementById("formFestArt").value = "";
  document.getElementById("formFestName").value = "";
  document.getElementById("formFestCategory").value = "Einweggeschirr";
  document.getElementById("formFestUnit").value = "";
  document.getElementById("formFestPrice").value = "";
  document.getElementById("formFestPriceNotice").value = "";
  document.getElementById("formFestDisabled").checked = false;
  document.getElementById("adminFestEditOverlay").classList.add("open");
}


let editingFestOldArt = null;

function openEditFestmaterialModal(id) {
  const item = festmaterialList.find(f => String(f.id) === String(id) || String(f.art) === String(id));
  if (!item) return;
  editingFestItemId = String(item.id || item.art);
  editingFestOldArt = String(item.art || item.id || "");
  document.getElementById("modalFestTitle").innerHTML = '<i class="fa-solid fa-pen"></i> Festartikel bearbeiten';
  document.getElementById("formFestArt").value = item.art || "";
  document.getElementById("formFestName").value = item.name || "";
  document.getElementById("formFestCategory").value = item.category || "Mietmobiliar";
  document.getElementById("formFestUnit").value = item.unitDesc || "";
  document.getElementById("formFestPrice").value = (item.price !== undefined && item.price !== null && item.price > 0) ? item.price : "";
  document.getElementById("formFestPriceNotice").value = item.priceNotice || "";
  document.getElementById("formFestDisabled").checked = !!item.disabled;
  document.getElementById("adminFestEditOverlay").classList.add("open");
}

function closeFestEditModal() {
  editingFestItemId = null;
  editingFestOldArt = null;
  document.getElementById("adminFestEditOverlay").classList.remove("open");
}

function saveFestmaterialFromModal() {
  const art = (document.getElementById("formFestArt").value || "").trim();
  const name = document.getElementById("formFestName").value.trim();
  const category = document.getElementById("formFestCategory").value;
  const unitDesc = document.getElementById("formFestUnit").value.trim();
  const priceRaw = parseFloat(document.getElementById("formFestPrice").value);
  const price = !isNaN(priceRaw) && priceRaw >= 0 ? Math.round(priceRaw * 100) / 100 : 0;
  const priceNotice = document.getElementById("formFestPriceNotice").value.trim();
  const disabled = document.getElementById("formFestDisabled").checked;

  if (!name) {
    alert("Bitte geben Sie einen Artikelnamen ein.");
    return;
  }

  const isEdit = !!editingFestItemId;
  const oldArt = editingFestOldArt;

  if (isEdit) {
    const item = festmaterialList.find(f => 
      String(f.id) === String(editingFestItemId) || 
      String(f.art) === String(editingFestItemId) ||
      (oldArt && String(f.art) === String(oldArt))
    );

    if (item) {
      // Wenn Artikel-Nr. geändert wurde, alten Eintrag aus Supabase löschen und Mengen migrieren
      if (oldArt && art && String(oldArt) !== String(art)) {
        if (festQty[oldArt] !== undefined) {
          festQty[art] = festQty[oldArt];
          delete festQty[oldArt];
        }
        if (supabaseClient && isAdminAuthenticated) {
          supabaseClient.from('festmaterial').delete().eq('art', oldArt).catch(e => console.warn("Konnte alte Art.-Nr. nicht löschen:", e));
        }
      }

      item.art = art || item.art || item.id;
      item.id = item.art;
      item.name = name;
      item.category = category;
      item.unitDesc = unitDesc;
      item.price = price;
      item.priceNotice = priceNotice || (price > 0 ? "" : (category === "Mietmobiliar" ? "Preis auf Anfrage" : ""));
      item.disabled = disabled;
    }
  } else {
    const newId = art || ("fest-" + Date.now());
    festmaterialList.push({
      id: newId,
      art: newId,
      name,
      category,
      unitDesc,
      price,
      priceNotice: priceNotice || (price > 0 ? "" : (category === "Mietmobiliar" ? "Preis auf Anfrage" : "")),
      disabled,
      sortOrder: festmaterialList.length + 1
    });
  }

  editingFestItemId = null;
  editingFestOldArt = null;

  saveFestmaterialLocal();
  closeFestEditModal();
  renderAdminFestmaterialTable();
  renderFestmaterial();
  updateSummaryBar();
  showAdminToast(isEdit ? "Artikel aktualisiert" : "Neuer Artikel hinzugefügt");
}

function deleteFestmaterialItem(id) {
  const item = festmaterialList.find(f => String(f.id) === String(id) || String(f.art) === String(id));
  if (!item) return;
  if (!confirm(`Möchten Sie «${item.name}» (Art. ${item.art || item.id}) wirklich löschen?`)) return;

  const targetId = String(item.id);
  const targetArt = String(item.art || item.id);
  festmaterialList = festmaterialList.filter(f => String(f.id) !== targetId && String(f.art) !== targetArt);
  delete festQty[targetId];
  if (targetArt) delete festQty[targetArt];

  saveFestmaterialLocal();
  renderAdminFestmaterialTable();
  renderFestmaterial();
  updateSummaryBar();

  if (supabaseClient && isAdminAuthenticated && targetArt) {
    supabaseClient.from('festmaterial').delete().eq('art', targetArt).catch(e => console.warn("Supabase delete festmaterial error:", e));
  }

  showAdminToast("Artikel gelöscht");
}

function saveFestmaterialLocal() {
  try {
    localStorage.setItem("landi_festmaterial", JSON.stringify(festmaterialList));
  } catch (e) {
    console.warn("Festmaterial local save error:", e);
  }
}

async function saveFestmaterialToSupabase(showToast = false) {
  saveFestmaterialLocal();
  if (!supabaseClient) {
    if (showToast) showAdminToast("Lokal gespeichert (Supabase nicht verbunden)");
    return;
  }

  if (!isAdminAuthenticated) {
    if (showToast) {
      alert("🔒 Bitte melde dich zuerst als Admin mit dem Admin-Passwort an, um in Supabase zu speichern.");
      openAdminModal();
    }
    return;
  }

  try {
    const rows = festmaterialList.map((item, idx) => {
      const artVal = String(item.art || item.id || '').trim();
      return {
        art: artVal,
        id: artVal,
        name: item.name,
        category: item.category,
        unit_desc: item.unitDesc || "",
        price: item.price || 0,
        price_notice: item.priceNotice || (item.category === "Mietmobiliar" ? "Preis auf Anfrage" : ""),
        disabled: !!item.disabled,
        sort_order: item.sortOrder || (idx + 1)
      };
    });

    // 1. Alle aktuellen Zeilen upserten
    const { error: upsertErr } = await supabaseClient
      .from('festmaterial')
      .upsert(rows, { onConflict: 'art' });

    if (upsertErr) throw upsertErr;

    // 2. Nicht mehr vorhandene / gelöschte Zeilen aus Supabase bereinigen
    const validArts = new Set(rows.map(r => r.art).filter(Boolean));
    const { data: existingRows } = await supabaseClient.from('festmaterial').select('art');
    if (existingRows && existingRows.length > 0) {
      const obsoleteArts = existingRows.map(r => r.art).filter(a => a && !validArts.has(a));
      if (obsoleteArts.length > 0) {
        console.log("Entferne veraltete Festmaterial-Artikel aus Supabase:", obsoleteArts);
        await supabaseClient.from('festmaterial').delete().in('art', obsoleteArts);
      }
    }

    if (showToast) showAdminToast("Festmaterial erfolgreich in Supabase gesichert");
  } catch (e) {
    console.error("Supabase Festmaterial Error:", e);
    if (showToast) {
      alert("❌ Fehler beim Speichern in Supabase:\n" + (e.message || JSON.stringify(e)));
    }
  }
}

async function loadFestmaterialFromSupabase() {
  if (!supabaseClient) return false;
  try {
    const { data, error } = await supabaseClient
      .from('festmaterial')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return false;
    }

    // Falls '73779' (alte Art.-Nr.) noch rumliegt, aber '73778' existiert, '73779' ignorieren
    const cleanRows = [];
    data.forEach(d => {
      const artVal = String(d.art || d.id || '').trim();
      if (artVal === '73779' && data.some(x => String(x.art) === '73778')) {
        return;
      }
      cleanRows.push({
        id: artVal,
        art: artVal,
        name: d.name,
        category: d.category,
        unitDesc: d.unit_desc,
        price: d.price !== undefined && d.price !== null ? parseFloat(d.price) : 0,
        priceNotice: d.price_notice,
        disabled: !!d.disabled,
        sortOrder: d.sort_order
      });
    });

    festmaterialList = cleanRows;
    saveFestmaterialLocal();
    renderFestmaterial();
    renderAdminFestmaterialTable();
    updateSummaryBar();
    return true;
  } catch (e) {
    console.warn("Error loading festmaterial from Supabase:", e);
    return false;
  }
}

function updateSummaryBar() {
  const selectedDrinks = getSelectedProducts();
  const totalDrinks = selectedDrinks.reduce((sum, s) => sum + s.total, 0);
  const selectedFest = getSelectedFestmaterial();
  const totalFest = selectedFest.reduce((sum, f) => sum + ((f.item.price || 0) * f.qty), 0);
  const hasUnpricedFest = selectedFest.some(f => !f.item.price || f.item.price === 0);
  const combinedTotal = totalDrinks + totalFest;
  const totalItemsCount = selectedDrinks.length + selectedFest.length;

  let countText = totalItemsCount === 0 ? "0 Artikel ausgewählt" : totalItemsCount + " Positionen ausgewählt";
  if (selectedFest.length > 0 && selectedDrinks.length > 0) {
    countText = `${selectedDrinks.length} Getränke + ${selectedFest.length} Festartikel`;
  } else if (selectedFest.length > 0) {
    countText = `${selectedFest.length} Festartikel ausgewählt`;
  } else if (selectedDrinks.length > 0) {
    countText = `${selectedDrinks.length} ${selectedDrinks.length === 1 ? "Artikel" : "Artikel"} ausgewählt`;
  }

  const itemCountEl = document.getElementById("itemCount");
  if (itemCountEl) itemCountEl.textContent = countText;

  const totalEl = document.getElementById("totalPrice");
  if (totalEl) {
    if (hasUnpricedFest && combinedTotal > 0) {
      totalEl.innerHTML = `${money(combinedTotal)} <span style="font-size:0.75rem; font-weight:normal; opacity:0.85;">(+ Mobiliar auf Anfrage)</span>`;
    } else if (hasUnpricedFest && combinedTotal === 0) {
      totalEl.innerHTML = `<span style="font-size:0.92rem; font-weight:700;">Preise auf Anfrage</span>`;
    } else {
      totalEl.textContent = money(combinedTotal);
    }
  }

  const revBtn = document.getElementById("reviewBtn");
  if (revBtn) {
    revBtn.disabled = (selectedDrinks.length === 0 && selectedFest.length === 0);
  }

  updateFloatingCartBtn();
  updateFestCollapsedBadge();
  if (typeof updateCalculatorTracker === "function") {
    updateCalculatorTracker();
  }
}

function changeReviewQty(id, field, delta) {
  if (!qty[id]) qty[id] = { bottles: 0, cases: 0 };
  const current = qty[id][field] || 0;
  const next = Math.max(0, current + delta);
  qty[id][field] = next;

  const input = document.getElementById(`input_${id}_${field}`);
  if (input) input.value = next;

  renderProducts();
  updateCategoryBadges();
  updateSummaryBar();
  openReview();
}

function changeReviewFestQty(id, delta) {
  changeFestQty(id, delta);
  openReview();
}

window.validateAndOpenReview = function() {
  const custName = document.getElementById('custName');
  const custPhone = document.getElementById('custPhone');
  const logisticsPickup = document.getElementById('radioLogisticsPickup');
  const logisticsDelivery = document.getElementById('radioLogisticsDelivery');
  const custDate = document.getElementById('custDate');
  const deliveryAddress = document.getElementById('deliveryAddress');
  const deliveryDate = document.getElementById('deliveryDate');

  let hasError = false;
  let missingFields = [];

  // Reset styles
  [custName, custPhone, custDate, deliveryAddress, deliveryDate].forEach(el => {
    if (el) el.style.border = '1.5px solid var(--border)';
  });

  if (!custName.value.trim()) {
    hasError = true;
    custName.style.border = '1.5px solid #EF4444';
    missingFields.push('Name / Firma');
  }
  if (!custPhone.value.trim()) {
    hasError = true;
    custPhone.style.border = '1.5px solid #EF4444';
    missingFields.push('Telefon');
  }

  if (logisticsPickup && logisticsPickup.checked) {
    if (!custDate.value) {
      hasError = true;
      custDate.style.border = '1.5px solid #EF4444';
      missingFields.push('Abholdatum');
    }
  } else if (logisticsDelivery && logisticsDelivery.checked) {
    if (!deliveryAddress.value.trim()) {
      hasError = true;
      deliveryAddress.style.border = '1.5px solid #EF4444';
      missingFields.push('Lieferadresse');
    }
    if (!deliveryDate.value) {
      hasError = true;
      deliveryDate.style.border = '1.5px solid #EF4444';
      missingFields.push('Lieferdatum');
    }
  }

  if (hasError) {
    showErrorToast(`Bitte füllen Sie folgende Pflichtfelder aus: ${missingFields.join(', ')}`);
    return;
  }

  // If no error, proceed to review
  setWizardStep(4);
};

function openReview() {
  const selected = getSelectedProducts();
  const selectedFest = getSelectedFestmaterial();
  const totalDrinks = selected.reduce((sum, s) => sum + s.total, 0);
  const totalFest = selectedFest.reduce((sum, f) => sum + ((f.item.price || 0) * f.qty), 0);
  const hasUnpricedFest = selectedFest.some(f => !f.item.price || f.item.price === 0);
  const combinedTotal = totalDrinks + totalFest;

  const list = document.getElementById("reviewList");

  if (selected.length === 0 && selectedFest.length === 0) {
    list.innerHTML = '<p class="empty-note" style="padding:24px 0; text-align:center; color:var(--text-muted);">Keine Artikel in der Zusammenstellung.</p>';
    document.getElementById("overlay").classList.add("open");
    return;
  }

  let drinksHtml = "";
  if (selected.length > 0) {
    let rows = selected.map(s => {
      const p = s.product;
      const q = qty[p.id] || { bottles: 0, cases: 0 };
      const encId = encodeURIComponent(p.id);
      
      let controlsHtml = "";

      if (p.caseOnly || p.gebinde === "Pack" || p.allowSingleBottle === false) {
        controlsHtml = `
          <div class="review-qty-control">
            <button class="review-qty-btn" onclick="changeReviewQty(decodeURIComponent('${encId}'), 'cases', -1)">−</button>
            <span style="font-weight:600; padding:0 4px; font-size:0.85rem;">${q.cases} ${escapeHtml(getCaseLabel(p, true))}</span>
            <button class="review-qty-btn" onclick="changeReviewQty(decodeURIComponent('${encId}'), 'cases', 1)">+</button>
          </div>
        `;
      } else if (q.cases > 0 && q.bottles > 0 && p.caseSize) {
        controlsHtml = `
          <div style="display:flex; flex-direction:column; gap:4px;">
            <div class="review-qty-control">
              <button class="review-qty-btn" onclick="changeReviewQty(decodeURIComponent('${encId}'), 'cases', -1)">−</button>
              <span style="font-weight:600; padding:0 4px; font-size:0.82rem;">${q.cases} ${escapeHtml(getCaseLabel(p, true))}</span>
              <button class="review-qty-btn" onclick="changeReviewQty(decodeURIComponent('${encId}'), 'cases', 1)">+</button>
            </div>
            <div class="review-qty-control">
              <button class="review-qty-btn" onclick="changeReviewQty(decodeURIComponent('${encId}'), 'bottles', -1)">−</button>
              <span style="font-weight:600; padding:0 4px; font-size:0.82rem;">${q.bottles} ${escapeHtml(getUnitLabel(p, true))} einz.</span>
              <button class="review-qty-btn" onclick="changeReviewQty(decodeURIComponent('${encId}'), 'bottles', 1)">+</button>
            </div>
          </div>
        `;
      } else if (q.cases > 0 && p.caseSize) {
        controlsHtml = `
          <div class="review-qty-control">
            <button class="review-qty-btn" onclick="changeReviewQty(decodeURIComponent('${encId}'), 'cases', -1)">−</button>
            <span style="font-weight:600; padding:0 4px; font-size:0.85rem;">${q.cases} ${escapeHtml(getCaseLabel(p, true))}</span>
            <button class="review-qty-btn" onclick="changeReviewQty(decodeURIComponent('${encId}'), 'cases', 1)">+</button>
          </div>
        `;
      } else {
        controlsHtml = `
          <div class="review-qty-control">
            <button class="review-qty-btn" onclick="changeReviewQty(decodeURIComponent('${encId}'), 'bottles', -1)">−</button>
            <span style="font-weight:600; padding:0 4px; font-size:0.85rem;">${q.bottles || s.count} ${escapeHtml(getUnitLabel(p, true))}</span>
            <button class="review-qty-btn" onclick="changeReviewQty(decodeURIComponent('${encId}'), 'bottles', 1)">+</button>
          </div>
        `;
      }

      return `
      <tr>
        <td>
          <strong>${escapeHtml(p.name)}</strong><br>
          <span style="color:var(--text-muted);font-size:0.78rem">Art.-Nr. ${escapeHtml(p.art)}</span>
        </td>
        <td>${controlsHtml}</td>
        <td style="font-weight:700; color:var(--primary-dark); text-align:right;">${money(s.total)}</td>
      </tr>
      `;
    }).join("");

    drinksHtml = `
      <div style="margin-bottom:16px;">
        <h3 style="font-size:1rem; font-weight:700; color:var(--text); margin-bottom:8px; display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-wine-bottle"></i> Getränke
        </h3>
        <table style="width:100%;">
          <thead>
            <tr>
              <th>Produkt</th>
              <th>Menge</th>
              <th style="text-align:right;">Total</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  }

  let festHtml = "";
  if (selectedFest.length > 0) {
    let festRows = selectedFest.map(f => {
      const encId = encodeURIComponent(f.item.id);
      const hasPrice = f.item.price && f.item.price > 0;
      const rowTotal = hasPrice ? money(f.item.price * f.qty) : (f.item.priceNotice || "Auf Anfrage");
      const unitPriceNote = hasPrice ? `${money(f.item.price)} / Stk.` : (f.item.priceNotice || "Auf Anfrage");

      return `
        <tr>
          <td>
            <strong>${escapeHtml(f.item.name)}</strong><br>
            <span style="color:var(--text-muted);font-size:0.78rem">${f.item.art ? 'Art.-Nr. ' + escapeHtml(f.item.art) + ' • ' : ''}${escapeHtml(f.item.category)} • ${escapeHtml(f.item.unitDesc || "")} (${unitPriceNote})</span>
          </td>
          <td>
            <div class="review-qty-control">
              <button class="review-qty-btn" onclick="changeReviewFestQty(decodeURIComponent('${encId}'), -1)">−</button>
              <span style="font-weight:600; padding:0 6px; font-size:0.85rem;">${f.qty} Stk.</span>
              <button class="review-qty-btn" onclick="changeReviewFestQty(decodeURIComponent('${encId}'), 1)">+</button>
            </div>
          </td>
          <td style="font-weight:700; font-size:0.86rem; color:var(--primary-dark); text-align:right;">
            ${rowTotal}
          </td>
        </tr>
      `;
    }).join("");

    festHtml = `
      <div style="margin-top:16px; padding-top:14px; border-top:1.5px solid var(--border);">
        <h3 style="font-size:1rem; font-weight:700; color:var(--text); margin-bottom:8px; display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-tent"></i> Festmaterial & Mietmobiliar
        </h3>
        <table style="width:100%;">
          <thead>
            <tr>
              <th>Artikel</th>
              <th>Menge</th>
              <th style="text-align:right;">Total</th>
            </tr>
          </thead>
          <tbody>${festRows}</tbody>
        </table>
      </div>
    `;
  }

  list.innerHTML = `
    ${drinksHtml}
    ${festHtml}
    <div class="sheet-total" style="margin-top:18px;">
      <span>Gesamttotal (unverbindlich):</span>
      <span>${money(combinedTotal)}</span>
    </div>
    ${hasUnpricedFest ? '<div style="font-size:0.8rem; color:var(--text-muted); text-align:right; margin-top:4px;">* Mietmobiliar (auf Anfrage) wird nach Absprache separat verrechnet</div>' : ''}
  `;

  document.getElementById("overlay").classList.add("open");
}

function closeReview() {
  document.getElementById("overlay").classList.remove("open");
}

function handleOverlayClick(e) {
  if (e.target.id === "overlay") closeReview();
}

function makeReference() {
  const now = new Date();
  const pad = n => String(n).padStart(2, "0");
  return pad(now.getDate()) + pad(now.getMonth() + 1) + "-" + pad(now.getHours()) + pad(now.getMinutes());
}

function formatDateCH(raw) {
  if (!raw) return "—";
  const parts = raw.split("-");
  if (parts.length === 3) {
    return parts[2] + "." + parts[1] + "." + parts[0];
  }
  return raw;
}

/* START: pdf_extended */
async function downloadPdf() {
/* END: pdf_extended */
  const selected = getSelectedProducts();
  const selectedFest = getSelectedFestmaterial();
  if (selected.length === 0 && selectedFest.length === 0) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const totalDrinks = selected.reduce((sum, s) => sum + s.total, 0);
  const totalFest = selectedFest.reduce((sum, f) => sum + ((f.item.price || 0) * f.qty), 0);
  const hasUnpricedFest = selectedFest.some(f => !f.item.price || f.item.price === 0);
  const combinedTotal = totalDrinks + totalFest;

  /* START: pdf_extended */
  const downloadBtn = document.querySelector('button[onclick="downloadPdf()"]');
  const origBtnText = downloadBtn ? downloadBtn.innerText : "PDF erstellen";
  if (downloadBtn) downloadBtn.innerText = "Speichere... Bitte warten";

  let ref = makeReference(); // Fallback
  let supabaseOrderId = null;
  
  try {
      if (supabaseClient) {
          const itemsPayload = [];
          selected.forEach(s => {
              const q = qty[s.product.id] || { bottles: 0, cases: 0 };
              let gebindeDetail = "";
              if (q.cases > 0 && q.bottles > 0 && s.product.caseSize) {
                gebindeDetail = `${q.cases} ${getCaseLabel(s.product, true)} + ${q.bottles} ${getUnitLabel(s.product, true)}`;
              } else if (q.cases > 0 && s.product.caseSize) {
                gebindeDetail = `${q.cases} ${getCaseLabel(s.product, true)}`;
              } else {
                gebindeDetail = `${s.count} ${getUnitLabel(s.product, true)}`;
              }
              itemsPayload.push({
                  art: s.product.art, 
                  name: s.product.name, 
                  qty: s.count, 
                  display_qty: gebindeDetail,
                  unit_price: s.product.price, 
                  row_total: s.total,
                  price_per_unit: s.unitPrice,
                  is_pack: false, 
                  type: 'drink'
              });
          });
          selectedFest.forEach(f => {
              itemsPayload.push({
                  art: f.item.id || f.item.art, 
                  name: f.item.name, 
                  qty: f.qty, 
                  display_qty: `${f.qty}x ${f.item.unitDesc || "Stk."}`,
                  unit_price: f.item.price || 0, 
                  is_pack: false, 
                  type: 'fest'
              });
          });
          
          const { data: refNr, error } = await supabaseClient.rpc('submit_order', {
              p_items: itemsPayload,
              p_total: combinedTotal,
              p_deposit: 0
          });
          
          if (!error && refNr) {
              ref = refNr;
          } else {
              console.error("Supabase Order Insert Error:", error);
          }
      }
  } catch (err) {
      console.error("Error saving order:", err);
      if (typeof window.showErrorToast === "function") window.showErrorToast("Fehler beim Speichern der Bestellung im System. PDF wird trotzdem erstellt.");
  } finally {
      if (downloadBtn) downloadBtn.innerText = origBtnText;
  }
  /* END: pdf_extended */
  const name = document.getElementById("custName") ? document.getElementById("custName").value.trim() : "";
  const phone = document.getElementById("custPhone") ? document.getElementById("custPhone").value.trim() : "";
  const email = document.getElementById("custEmail") ? document.getElementById("custEmail").value.trim() : "";
  const today = new Date().toLocaleDateString("de-CH");

  const isDelivery = document.querySelector('input[name="logisticsType"]:checked')?.value === "delivery";

  // PDF Styling
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(31, 58, 46); // Deep Forest Green
  doc.text("LANDI Event- & Getränke-Zusammenstellung", 14, 18);

  doc.setTextColor(28, 36, 33);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text("Referenz-Nr.: " + ref, 14, 25);
  doc.text("Erstellt am: " + today, 14, 30);
  doc.text("Kunde / Firma: " + (name || "____________________"), 14, 37);
  doc.text("Telefon / Kontakt: " + (phone || "____________________") + (email ? " • E-Mail: " + email : ""), 14, 42);

  // LOGISTIK-BLOCK (Gross hervorgehoben)
  let nextTableStartY = 85;

  if (isDelivery) {
    const delivAddr = document.getElementById("deliveryAddress") ? document.getElementById("deliveryAddress").value.trim() : "";
    const delivDate = formatDateCH(document.getElementById("deliveryDate")?.value);
    const delivTime = document.getElementById("deliveryTime")?.value || "";
    const returnDate = formatDateCH(document.getElementById("deliveryReturnDate")?.value);
    const delivNotes = document.getElementById("deliveryNotes") ? document.getElementById("deliveryNotes").value.trim() : "";

    doc.setFillColor(237, 245, 232); // Landi Green Tint
    doc.roundedRect(14, 47, 182, 38, 2, 2, "F");
    doc.setDrawColor(61, 125, 30);
    doc.setLineWidth(0.5);
    doc.roundedRect(14, 47, 182, 38, 2, 2, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(49, 100, 24);
    doc.text("LOGISTIK: LIEFERUNG DURCH DIE LANDI", 18, 54);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(28, 36, 33);
    doc.text("Lieferadresse / Festort: " + (delivAddr || "________________________________________"), 18, 60);
    doc.text(`Wunschtermin Lieferung: ${delivDate} ${delivTime ? "um ca. " + delivTime + " Uhr" : ""}`, 18, 66);
    doc.text(`Wunschtermin Rücktransport: ${returnDate}`, 18, 72);
    
    if (delivNotes) {
      doc.text("Chauffeur-Notiz: " + delivNotes.substring(0, 85), 18, 78);
    } else {
      doc.setTextColor(92, 101, 97);
      doc.text("Hinweis: Lieferpauschale ab CHF 69.– (Richtpreis, Bestätigung durch Filiale).", 18, 78);
    }

    nextTableStartY = 92;
  } else {
    const pickupDate = formatDateCH(document.getElementById("custDate")?.value);
    const pickupTime = document.getElementById("custPickupTime")?.value || "";
    const returnDate = formatDateCH(document.getElementById("custReturnDate")?.value);

    doc.setFillColor(245, 247, 244);
    doc.roundedRect(14, 47, 182, 28, 2, 2, "F");
    doc.setDrawColor(200, 210, 195);
    doc.setLineWidth(0.5);
    doc.roundedRect(14, 47, 182, 28, 2, 2, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(31, 58, 46);
    doc.text("LOGISTIK: SELBSTABHOLUNG AN DER FILIALE", 18, 54);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(28, 36, 33);
    doc.text(`Wunschtermin Abholung: ${pickupDate} ${pickupTime ? "um ca. " + pickupTime + " Uhr" : ""}`, 18, 61);
    doc.text(`Rückgabetermin Leergut & Mietmaterial: ${returnDate}`, 18, 68);

    nextTableStartY = 81;
  }

  // TABELLE 1: GETRÄNKE
  let finalY = nextTableStartY;

  if (selected.length > 0) {
    let totalCasesCount = 0;
    let totalBottlesCount = 0;
    selected.forEach(s => {
      totalCasesCount += (s.cases || 0);
      totalBottlesCount += (s.count || 0);
    });

    doc.autoTable({
      startY: nextTableStartY,
      head: [["Art.-Nr.", "Getränk", "Stückzahl", "Gebinde / Bereitstellung", "Total"]],
      body: selected.map(s => {
        const q = qty[s.product.id] || { bottles: 0, cases: 0 };
        let gebindeDetail = "";
        if (q.cases > 0 && q.bottles > 0 && s.product.caseSize) {
          gebindeDetail = `${q.cases} ${getCaseLabel(s.product, true)} + ${q.bottles} ${getUnitLabel(s.product, true)} einz.`;
        } else if (q.cases > 0 && s.product.caseSize) {
          gebindeDetail = `${q.cases} ${getCaseLabel(s.product, true)} (${s.count} ${getUnitLabel(s.product, true)})`;
        } else {
          gebindeDetail = `${s.count} ${getUnitLabel(s.product, true)} einzeln`;
        }
        return [
          s.product.art,
          s.product.name,
          s.count + " " + getUnitLabel(s.product, true),
          gebindeDetail,
          "CHF " + s.total.toFixed(2)
        ];
      }),
      styles: { fontSize: 8.5, font: "helvetica" },
      headStyles: { fillColor: [31, 58, 46], textColor: [255, 255, 255], fontStyle: "bold" },
      alternateRowStyles: { fillColor: [247, 245, 239] },
    });

    finalY = doc.lastAutoTable.finalY + 8;
  }

  // TABELLE 2: FESTMATERIAL & EINWEGGESCHIRR (Nur wenn ausgewählt)
  if (selectedFest.length > 0) {
    if (finalY > 260) {
      doc.addPage();
      finalY = 20;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(31, 58, 46);
    doc.text("Festmaterial & Einweggeschirr", 14, finalY);

    doc.autoTable({
      startY: finalY + 3,
      head: [["Art.-Nr.", "Bereich", "Artikel", "Menge / Gebinde", "Einzelpreis", "Total"]],
      body: selectedFest.map(f => {
        const hasPrice = f.item.price && f.item.price > 0;
        const rowTotal = hasPrice ? "CHF " + (f.item.price * f.qty).toFixed(2) : "Auf Anfrage";
        const unitPrice = hasPrice ? "CHF " + f.item.price.toFixed(2) : (f.item.priceNotice || "Auf Anfrage");
        return [
          f.item.art || "—",
          f.item.category,
          f.item.name,
          `${f.qty}× (${f.item.unitDesc || "Stk."})`,
          unitPrice,
          rowTotal
        ];
      }),
      styles: { fontSize: 8.5, font: "helvetica" },
      headStyles: { fillColor: [61, 125, 30], textColor: [255, 255, 255], fontStyle: "bold" },
      alternateRowStyles: { fillColor: [247, 249, 245] },
    });

    finalY = doc.lastAutoTable.finalY + 8;
  }

  // BEREITSTELLUNG & TOTAL-ZUSAMMENFASSUNG
  if (finalY > 250) {
    doc.addPage();
    finalY = 20;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(31, 58, 46);

  doc.text("Gesamttotal Zusammenstellung (unverbindlich): CHF " + combinedTotal.toFixed(2), 14, finalY);
  finalY += 6;
  
  // Zzgl. Depot Section (for manual entry)
  finalY += 4;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(31, 58, 46);
  doc.text("Zzgl. Depot (wird bei Abholung/Lieferung separat erfasst):", 14, finalY);
  
  finalY += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  
  // Harassen Box
  doc.setDrawColor(150, 150, 150);
  doc.roundedRect(14, finalY - 4, 10, 6, 1.5, 1.5, "S");
  doc.text("x  Harassen (CHF 5.00)", 26, finalY + 0.5);
  
  // Flaschen 0.30 Box
  doc.roundedRect(75, finalY - 4, 10, 6, 1.5, 1.5, "S");
  doc.text("x  Flaschen (CHF 0.30)", 87, finalY + 0.5);
  
  // Flaschen 0.50 Box
  doc.roundedRect(136, finalY - 4, 10, 6, 1.5, 1.5, "S");
  doc.text("x  Flaschen (CHF 0.50)", 148, finalY + 0.5);
  
  // Zzgl. Lieferung Section
  finalY += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(31, 58, 46);
  doc.text("Zzgl. Lieferung (falls gewünscht):", 14, finalY);
  
  finalY += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.roundedRect(14, finalY - 4, 10, 6, 1.5, 1.5, "S");
  doc.text("x  Lieferung (CHF 69.00)", 26, finalY + 0.5);
  
  finalY += 10;

  if (hasUnpricedFest) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(92, 101, 97);
    doc.text("• Mietmobiliar (auf Anfrage) wird nach Aufwand & Absprache separat verrechnet.", 14, finalY);
    finalY += 5;
  }

  if (isDelivery) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(92, 101, 97);
    doc.text("• Lieferpauschale ab CHF 69.– (pro Palette / nach Aufwand) wird von der Filiale bestätigt.", 14, finalY);
    finalY += 5;
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "Diese Zusammenstellung dient der unverbindlichen Übersicht. Preise und Verfügbarkeiten können abweichen.\nIhre Zusammenstellung wird erst nach Bestätigung durch unsere Filiale bearbeitet.",
    14, finalY + 4
  );

  tempCustomerPdf = doc;
  tempCustomerRef = ref;
  
  if (downloadBtn) {
      downloadBtn.innerText = origBtnText;
  }
  document.getElementById("customerActionOverlay").classList.add("open");
}

let tempCustomerPdf = null;
let tempCustomerRef = null;

function executeCustomerAction(isMail) {
  if (!tempCustomerPdf || !tempCustomerRef) return;
  
  tempCustomerPdf.save("landi-event-zusammenstellung-" + tempCustomerRef + ".pdf");
  
  if (isMail) {
    const subject = encodeURIComponent("Getränkebestellung Event - Ref: " + tempCustomerRef);
    const body = encodeURIComponent("Guten Tag,\n\nBitte finden Sie anbei meine Getränkebestellung für unser Event.\n(Hinweis: Bitte vergessen Sie nicht, das soeben heruntergeladene PDF 'landi-event-zusammenstellung-" + tempCustomerRef + ".pdf' manuell hier als Anhang hinzuzufügen!)\n\nFreundliche Grüsse");
    window.location.href = `mailto:getraenke.rorschach@landisgo.ch?subject=${subject}&body=${body}`;
  }
  
  document.getElementById("customerActionOverlay").classList.remove("open");
  
  // Show Feedback Modal
  setTimeout(() => {
    document.getElementById("customerFeedbackOverlay").classList.add("open");
  }, 400);
}

async function submitCustomerFeedback() {
  if (!supabaseClient) {
      showCustomerFinal(false);
      return;
  }
  const text = document.getElementById("customerFeedbackText").value.trim();
  if (!text) {
      showCustomerFinal(false);
      return;
  }
  
  const btn = document.getElementById("btnSubmitCustFeedback");
  btn.disabled = true;
  btn.innerText = "Sendet...";
  
  try {
      const { error } = await supabaseClient.from('feedbacks').insert([{
          name: "Kunde: " + (tempCustomerRef || "Unbekannt"),
          message: text
      }]);
      
      if (error) throw error;
      
      document.getElementById("customerFeedbackMessage").style.display = "block";
      setTimeout(() => { showCustomerFinal(true); }, 1000);
  } catch (err) {
      console.error(err);
      showCustomerFinal(false);
  }
}

function finishCustomerFlow() {
  // Wenn nur abgebrochen wird
  showCustomerFinal(false);
}

function showCustomerFinal(feedbackSent) {
  document.getElementById("customerFeedbackOverlay").classList.remove("open");
  tempCustomerPdf = null;
  tempCustomerRef = null;
  document.getElementById("customerFeedbackText").value = "";
  document.getElementById("customerFeedbackMessage").style.display = "none";
  const btn = document.getElementById("btnSubmitCustFeedback");
  if (btn) {
    btn.disabled = false;
    btn.innerText = "Feedback senden";
  }
  
  if (feedbackSent) {
    document.getElementById("finalModalTitle").innerText = "Feedback gesendet";
    document.getElementById("finalModalThanks").innerText = "Vielen Dank, Ihr Feedback wurde gesendet!";
  } else {
    document.getElementById("finalModalTitle").innerText = "Abgeschlossen";
    document.getElementById("finalModalThanks").innerText = "Vielen Dank für die Nutzung des Tools!";
  }
  
  document.getElementById("customerFinalOverlay").classList.add("open");
}

function closeCustomerFinalOverlay() {
  document.getElementById("customerFinalOverlay").classList.remove("open");
}



function toggleCartDrawer() {
  const overlay = document.getElementById("overlay");
  if (overlay && overlay.classList.contains("open")) {
    closeReview();
  } else {
    openReview();
  }
}

function updateFloatingCartBtn() {
  const btn = document.getElementById("floatingCartBtn");
  const textSpan = document.getElementById("floatingCartText");
  if (!btn || !textSpan) return;

  const selectedDrinks = getSelectedProducts();
  const selectedFest = getSelectedFestmaterial();
  const totalCount = selectedDrinks.length + selectedFest.length;

  if (totalCount > 0) {
    let t = "";
    if (selectedDrinks.length > 0 && selectedFest.length > 0) {
      t = `${selectedDrinks.length} Getränke + ${selectedFest.length} Festartikel`;
    } else if (selectedFest.length > 0) {
      t = `${selectedFest.length} Festartikel ausgewählt`;
    } else {
      t = selectedDrinks.length + (selectedDrinks.length === 1 ? " Artikel ausgewählt" : " Artikel ausgewählt");
    }
    textSpan.textContent = t;
    btn.classList.add("visible");
  } else {
    btn.classList.remove("visible");
    closeReview();
  }
}

function triggerQtyFeedback(id) {
  const inputs = document.querySelectorAll(`input[id="input_${id}_bottles"], input[id="input_${id}_cases"]`);
  inputs.forEach(inputEl => {
    const productCard = inputEl.closest(".product");
    if (!productCard) return;

    productCard.classList.remove("qty-just-added");
    const oldToast = productCard.querySelector(".qty-confirm-toast");
    if (oldToast) oldToast.remove();

    void productCard.offsetWidth;
    productCard.classList.add("qty-just-added");

    const toast = document.createElement("div");
    toast.className = "qty-confirm-toast";
    toast.innerHTML = `<span>✓</span> <span>Hinzugefügt</span>`;
    productCard.appendChild(toast);

    setTimeout(() => {
      productCard.classList.remove("qty-just-added");
      toast.remove();
    }, 2200);
  });
}

/* =========================================================================
   GETRÄNKE- & EVENT-RECHNER MIT BEDARFS-TRACKER & STANDARD-PRODUKTEN
   ========================================================================= */

// Factory Standard-Produkte je Anlass
const DEFAULT_CALCULATOR_STANDARDS = {
  grillfest: {
    mineral: "87524",  // Mineralwasser Farmer blau 6×150cl (9 L)
    soft: "13152",     // Coca-Cola 8 × 150 cl (12 L)
    beer: "111698",    // Farmer Bier Lager Dose 24x33cl (7.92 L)
    wine: "66471"      // Fleurance Pinot Noir 50 cl
  },
  apero: {
    mineral: "87524",  // Mineralwasser Farmer blau 6×150cl
    soft: "13152",     // Coca-Cola 8 × 150 cl
    beer: "105553",    // Bier Quoellfrisch 24x33cl
    wine: "88160"      // Fendant VS 50 cl
  },
  party: {
    mineral: "87524",  // Mineralwasser Farmer blau 6×150cl
    soft: "13152",     // Coca-Cola 8 × 150 cl
    beer: "111698",    // Farmer Bier Lager Dose 24x33cl
    wine: "66471"      // Pinot Noir
  },
  family: {
    mineral: "87524",  // Mineralwasser Farmer blau 6×150cl
    soft: "13152",     // Coca-Cola 8 × 150 cl
    beer: "111698",    // Farmer Bier Lager
    wine: "88160"      // Fendant
  }
};

let calcStandards = JSON.parse(JSON.stringify(DEFAULT_CALCULATOR_STANDARDS));
try {
  const savedCalc = localStorage.getItem("landi_calc_standards");
  if (savedCalc) {
    calcStandards = Object.assign(JSON.parse(JSON.stringify(DEFAULT_CALCULATOR_STANDARDS)), JSON.parse(savedCalc));
  }
} catch(e) {
  calcStandards = JSON.parse(JSON.stringify(DEFAULT_CALCULATOR_STANDARDS));
}

// Reusable SVG Icons für Rechner und Tracker (Keine Emojis)
const CALC_SVGS = {
  target: `<svg class="icon-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  calculator: `<svg class="icon-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="16" y1="18" x2="16" y2="18.01"/><line x1="12" y1="18" x2="12" y2="18.01"/><line x1="8" y1="18" x2="8" y2="18.01"/></svg>`,
  chevronDown: `<svg class="icon-svg sfb-chevron-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  chevronUp: `<svg class="icon-svg sfb-chevron-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`,
  mineral: `<svg class="icon-svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
  soft: `<svg class="icon-svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 21h10l1.5-12H5.5L7 21z"/><line x1="5" y1="9" x2="19" y2="9"/><line x1="14" y1="3" x2="11" y2="9"/></svg>`,
  beer: `<svg class="icon-svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#B45309" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h10v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8z"/><path d="M15 10h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3"/><path d="M5 8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2"/></svg>`,
  wine: `<svg class="icon-svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#991B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h8"/><path d="M12 15v7"/><path d="M7 3h10c0 4.5-2.5 8-5 8s-5-3.5-5-8z"/></svg>`,
  grillfest: `<svg class="icon-svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  apero: `<svg class="icon-svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h8"/><path d="M12 15v7"/><path d="M7 4h10l-1 5a4 4 0 0 1-8 0L7 4z"/><line x1="5" y1="2" x2="19" y2="2"/></svg>`,
  party: `<svg class="icon-svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#9333EA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  family: `<svg class="icon-svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  check: `<svg class="icon-svg check-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  checkDone: `<svg class="icon-svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#166534" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="8 12 11 15 16 9"/></svg>`,
  refresh: `<svg class="icon-svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`
};

// Rechner-Zustand
let calcEventType = "grillfest";
let calcGuests = 25;
let calcHours = 4;
let calcHotWeather = false;
let calcTrackerActive = false;
let isDrinkCalcCollapsed = true;
let calcHasUserSelected = false;

// Berechnete Soll-Ziele
let calcTargets = {
  mineralLiters: 18,
  mineralCases: 2,
  softLiters: 16,
  softCases: 2,
  beerLiters: 16,
  beerCases: 2,
  wineBottles: 6,
  wineLiters: 4.5,
  totalLiters: 40
};

// Hilfsfunktionen für Gebinde- und Volumen-Erkennung
function getProductVolumeLiters(p) {
  if (!p) return 0.75;
  const name = (p.name || "").toLowerCase();
  const mCl = name.match(/(\d+(?:\.\d+)?)\s*cl/i);
  if (mCl) return parseFloat(mCl[1]) / 100;
  const mL = name.match(/(\d+(?:\.\d+)?)\s*(?:l|liter)\b/i);
  if (mL) return parseFloat(mL[1]);
  if (name.includes("75 cl") || (p.category && p.category.toLowerCase().includes("wein"))) return 0.75;
  if (name.includes("33 cl") || (p.category && p.category.toLowerCase().includes("bier"))) return 0.33;
  return 1.0;
}

function getProductCaseVolumeLiters(p) {
  if (!p) return 1.0;
  const size = p.caseSize || 1;
  return getProductVolumeLiters(p) * size;
}

function getProductCategoryGroup(p) {
  if (!p) return "other";
  const cat = (p.category || "").toLowerCase();
  const name = (p.name || "").toLowerCase();

  if (cat.includes("mineral") || name.includes("mineral") || name.includes("wasser") || name.includes("quelle") || name.includes("henniez") || name.includes("valser") || name.includes("rhäzünser")) {
    return "mineral";
  }
  if (cat.includes("süss") || cat.includes("suess") || cat.includes("soft") || name.includes("cola") || name.includes("rivella") || name.includes("soda") || name.includes("citro") || name.includes("eistee") || name.includes("schorle") || name.includes("sinalco") || name.includes("granini") || name.includes("saft") || name.includes("gazosa") || name.includes("chino") || name.includes("aranc")) {
    return "soft";
  }
  if (cat.includes("bier") || name.includes("bier") || name.includes("panach") || name.includes("lager") || name.includes("quöllfrisch") || name.includes("quoellfrisch") || name.includes("moretti") || name.includes("peroni") || name.includes("feldschlösschen") || name.includes("chopfab") || name.includes("calanda")) {
    return "beer";
  }
  if (cat.includes("wein") || name.includes("wein") || name.includes("fendant") || name.includes("dôle") || name.includes("dole") || name.includes("pinot") || name.includes("merlot") || name.includes("prosecco") || name.includes("champagn") || name.includes("cava") || name.includes("heida") || name.includes("pescaito") || name.includes("moscato") || name.includes("aigle") || name.includes("chasselas") || name.includes("rosé") || name.includes("rose") || name.includes("75 cl")) {
    return "wine";
  }
  if (cat.includes("spirituosen")) {
    return "spirits";
  }
  return "other";
}

// Rechner Event-Typ setzen
function setCalcEvent(type) {
  calcHasUserSelected = true;
  calcEventType = type;
  const btnIds = ["grillfest", "apero", "party", "family"];
  btnIds.forEach(id => {
    const el = document.getElementById(`calcEventBtn_${id}`);
    if (el) {
      if (id === type) el.classList.add("active");
      else el.classList.remove("active");
    }
  });
  recalculateCalcNeeds();
  updateCollapsedSummary();
}

// Hilfsfunktionen für synchrone Regler-Skalierung (10, 25, 50, 75, 100+)
function sliderPosToGuests(pos) {
  const p = Math.max(0, Math.min(100, parseFloat(pos) || 0));
  let val;
  if (p <= 25) {
    val = 10 + (p / 25) * 15;
  } else if (p <= 50) {
    val = 25 + ((p - 25) / 25) * 25;
  } else if (p <= 75) {
    val = 50 + ((p - 50) / 25) * 25;
  } else {
    val = 75 + ((p - 75) / 25) * 25;
  }
  return Math.round(val);
}

function guestsToSliderPos(guests) {
  const g = Math.max(5, parseInt(guests, 10) || 25);
  if (g <= 10) return 0;
  if (g >= 100) return 100;
  if (g <= 25) {
    return ((g - 10) / 15) * 25;
  } else if (g <= 50) {
    return 25 + ((g - 25) / 25) * 25;
  } else if (g <= 75) {
    return 50 + ((g - 50) / 25) * 25;
  } else {
    return 75 + ((g - 75) / 25) * 25;
  }
}

function updateGuestTickHighlight(guests) {
  const container = document.getElementById("calcGuestsTicks");
  if (!container) return;
  const ticks = container.querySelectorAll(".calc-tick");
  const targets = [10, 25, 50, 75, 100];
  let minDiff = Infinity;
  let closestIdx = -1;
  targets.forEach((target, idx) => {
    const diff = Math.abs(guests - target);
    if (diff < minDiff) {
      minDiff = diff;
      closestIdx = idx;
    }
  });
  ticks.forEach((tick, idx) => {
    if (idx === closestIdx && minDiff <= 6) {
      tick.classList.add("active");
    } else {
      tick.classList.remove("active");
    }
  });
}

function updateHoursTickHighlight(hours) {
  const container = document.getElementById("calcHoursTicks");
  if (!container) return;
  const ticks = container.querySelectorAll(".calc-tick");
  const targets = [2, 4, 6, 8];
  ticks.forEach((tick, idx) => {
    const target = targets[idx];
    if ((idx === 3 && hours >= 8) || hours === target) {
      tick.classList.add("active");
    } else {
      tick.classList.remove("active");
    }
  });
}

function onCalcGuestsRangeChange(val) {
  calcHasUserSelected = true;
  calcGuests = sliderPosToGuests(val);
  const input = document.getElementById("calcGuestsInput");
  if (input) input.value = calcGuests;
  updateGuestTickHighlight(calcGuests);
  recalculateCalcNeeds();
  updateCollapsedSummary();
}

function onCalcGuestsInputChange(val) {
  calcHasUserSelected = true;
  calcGuests = Math.max(5, parseInt(val, 10) || 5);
  const range = document.getElementById("calcGuestsRange");
  if (range) range.value = guestsToSliderPos(calcGuests);
  updateGuestTickHighlight(calcGuests);
  recalculateCalcNeeds();
  updateCollapsedSummary();
}

function setCalcGuests(num) {
  calcHasUserSelected = true;
  calcGuests = parseInt(num, 10) || 25;
  const input = document.getElementById("calcGuestsInput");
  if (input) input.value = calcGuests;
  const range = document.getElementById("calcGuestsRange");
  if (range) range.value = guestsToSliderPos(calcGuests);
  updateGuestTickHighlight(calcGuests);
  recalculateCalcNeeds();
  updateCollapsedSummary();
}

function onCalcHoursChange(val) {
  calcHasUserSelected = true;
  calcHours = Math.max(2, parseInt(val, 10) || 2);
  const display = document.getElementById("calcHoursDisplay");
  if (display) display.textContent = calcHours >= 8 ? '8+' : calcHours;
  updateHoursTickHighlight(calcHours);
  recalculateCalcNeeds();
  updateCollapsedSummary();
}

function setCalcHours(num) {
  calcHasUserSelected = true;
  calcHours = Math.max(2, parseInt(num, 10) || 4);
  const display = document.getElementById("calcHoursDisplay");
  if (display) display.textContent = calcHours >= 8 ? '8+' : calcHours;
  const range = document.getElementById("calcHoursRange");
  if (range) range.value = Math.min(8, calcHours);
  updateHoursTickHighlight(calcHours);
  recalculateCalcNeeds();
  updateCollapsedSummary();
}

// Kern-Berechnung der empfohlenen Mengen
function recalculateCalcNeeds() {
  const hotWeatherEl = document.getElementById("calcHotWeather");
  calcHotWeather = hotWeatherEl ? hotWeatherEl.checked : false;

  // Flüssigkeitsbedarf pro Person:
  // 1.0L für die ersten 2 Stunden, danach +0.3L pro weiterer Stunde
  // Standardmässig 20% Sicherheitsmarge auf alle Berechnungen aufschlagen
  let perPersonLiters = (1.0 + Math.max(0, calcHours - 2) * 0.3) * 1.2;
  if (calcHotWeather) {
    perPersonLiters *= 1.2; // zusätzliche +20% bei Hitze
  }

  let totalEventLiters = Math.round(calcGuests * perPersonLiters);

  // Verteilung je nach Event-Typ
  let minPct = 0.32, softPct = 0.23, beerPct = 0.35, winePct = 0.10;

  if (calcEventType === "apero") {
    minPct = 0.35;
    softPct = 0.15;
    beerPct = 0.15;
    winePct = 0.35; // Weine & Schaumwein im Fokus
  } else if (calcEventType === "party") {
    minPct = 0.25;
    softPct = 0.18;
    beerPct = 0.45; // Hoher Bierkonsum
    winePct = 0.12;
  } else if (calcEventType === "family") {
    minPct = 0.52;
    softPct = 0.48;
    beerPct = 0.00;
    winePct = 0.00;
  }

  let minLiters = totalEventLiters * minPct;
  let softLiters = totalEventLiters * softPct;
  let beerLiters = totalEventLiters * beerPct;
  let wineLiters = totalEventLiters * winePct;

  // Harassen-Abschätzungen & Liter auf volle Packs runden:
  // Mineral: Farmer blau 6x1.5L = 9L pro Pack -> Harassen = aufrunden(L / 9)
  const minCases = Math.max(1, Math.ceil(minLiters / 9));
  minLiters = minCases * 9;
  
  // Soft: Cola 8x1.5L = 12L pro Pack -> Harassen = aufrunden(L / 12)
  const softCases = Math.max(1, Math.ceil(softLiters / 12));
  softLiters = softCases * 12;
  
  // Bier: 24x33cl = 7.92L pro Pack -> Packs = aufrunden(L / 8)
  const beerCases = beerPct > 0 ? Math.max(1, Math.ceil(beerLiters / 8)) : 0;
  beerLiters = beerCases * 8;
  
  // Wein: 0.75L pro Flasche
  const wineBottles = winePct > 0 ? Math.max(1, Math.ceil(wineLiters / 0.75)) : 0;
  wineLiters = Math.round(wineBottles * 0.75 * 10) / 10;
  
  // Update total liters to reflect the rounded-up pack sizes
  totalEventLiters = Math.round(minLiters + softLiters + beerLiters + wineLiters);

  calcTargets = {
    mineralLiters: minLiters,
    mineralCases: minCases,
    softLiters: softLiters,
    softCases: softCases,
    beerLiters: beerLiters,
    beerCases: beerCases,
    wineBottles: wineBottles,
    wineLiters: wineLiters,
    totalLiters: totalEventLiters
  };

  // DOM aktualisieren
  const summaryTitle = document.getElementById("calcResultsSummaryTitle");
  if (summaryTitle) {
    summaryTitle.textContent = `Bedarfsempfehlung für ${calcGuests} Personen (ca. ${calcHours} Std.):`;
  }
  const totalTag = document.getElementById("calcTotalLitersTag");
  if (totalTag) {
    totalTag.textContent = `ca. ${totalEventLiters} L gesamt`;
  }

  const elMinC = document.getElementById("resMineralCases");
  if (elMinC) elMinC.textContent = `${minCases} ${minCases === 1 ? 'Harass/Pack' : 'Harassen/Packs'}`;
  const elMinL = document.getElementById("resMineralLiters");
  if (elMinL) elMinL.textContent = `ca. ${minLiters} Liter (mit & ohne Kohlensäure)`;

  const elSoftC = document.getElementById("resSoftCases");
  if (elSoftC) elSoftC.textContent = `${softCases} ${softCases === 1 ? 'Harass/Pack' : 'Harassen/Packs'}`;
  const elSoftL = document.getElementById("resSoftLiters");
  if (elSoftL) elSoftL.textContent = `ca. ${softLiters} Liter (Cola, Rivella, Most)`;

  const elBeerC = document.getElementById("resBeerCases");
  if (elBeerC) elBeerC.textContent = beerCases > 0 ? `${beerCases} ${beerCases === 1 ? 'Pack / Harass' : 'Packs / Harassen'}` : `0 Packs (Alkoholfrei)`;
  const elBeerL = document.getElementById("resBeerLiters");
  if (elBeerL) elBeerL.textContent = beerLiters > 0 ? `ca. ${beerLiters} Liter (ca. ${Math.round(beerLiters / 0.33)} Dosen/Fl.)` : `Rein alkoholfreies Fest`;

  const elWineB = document.getElementById("resWineBottles");
  if (elWineB) elWineB.textContent = wineBottles > 0 ? `${wineBottles} ${wineBottles === 1 ? 'Flasche' : 'Flaschen'}` : `0 Flaschen`;
  const elWineL = document.getElementById("resWineLiters");
  if (elWineL) elWineL.textContent = wineBottles > 0 ? `ca. ${wineLiters} Liter (Weiss / Rot / Schaumwein)` : `Kein Alkohol eingeplant`;

  const trackerSummary = document.getElementById("trackerSummaryText");
  if (trackerSummary) {
    trackerSummary.textContent = `Ziel: ${calcGuests} Personen • ${calcHours} Std. (${calcEventType.toUpperCase()})`;
  }
  const sfbSummary = document.getElementById("sfbSummaryText");
  if (sfbSummary) {
    sfbSummary.textContent = `Ziel: ${calcGuests} Personen • ${calcHours} Std. (${calcEventType.toUpperCase()})`;
  }

  updateCalculatorTracker();
  updateCollapsedSummary();
}

// Aktuelle Mengen im Warenkorb nach den 4 Getränkegruppen auswerten
function getCurrentCartQuantitiesByCategory() {
  let mineralLiters = 0;
  let softLiters = 0;
  let beerLiters = 0;
  let wineBottles = 0;
  let wineLiters = 0;

  const selected = getSelectedProducts();
  selected.forEach(s => {
    const p = s.product;
    const grp = getProductCategoryGroup(p);
    const vol = getProductVolumeLiters(p);
    const count = s.count || getBottleCount(p);

    if (grp === "mineral") {
      mineralLiters += count * vol;
    } else if (grp === "soft") {
      softLiters += count * vol;
    } else if (grp === "beer") {
      beerLiters += count * vol;
    } else if (grp === "wine") {
      wineBottles += count;
      wineLiters += count * vol;
    }
  });

  return {
    mineralLiters: Math.round(mineralLiters * 10) / 10,
    softLiters: Math.round(softLiters * 10) / 10,
    beerLiters: Math.round(beerLiters * 10) / 10,
    wineBottles: Math.round(wineBottles),
    wineLiters: Math.round(wineLiters * 10) / 10
  };
}

// Fortschrittsbalken & Tracker aktualisieren
function updateCalculatorTracker() {
  const cart = getCurrentCartQuantitiesByCategory();

  const minTgt = Math.max(1, calcTargets.mineralLiters);
  const softTgt = Math.max(1, calcTargets.softLiters);
  const beerTgt = Math.max(0, calcTargets.beerLiters);
  const wineTgt = Math.max(0, calcTargets.wineBottles);

  const minPct = Math.round((cart.mineralLiters / minTgt) * 100);
  const softPct = Math.round((cart.softLiters / softTgt) * 100);
  const beerPct = beerTgt > 0 ? Math.round((cart.beerLiters / beerTgt) * 100) : 100;
  const winePct = wineTgt > 0 ? Math.round((cart.wineBottles / wineTgt) * 100) : 100;

  // DOM Elemente aktualisieren
  const fillMin = document.getElementById("trackerFillMineral");
  if (fillMin) fillMin.style.width = Math.min(100, minPct) + "%";
  const valMin = document.getElementById("trackerValMineral");
  if (valMin) valMin.textContent = `${cart.mineralLiters} / ${minTgt} L (${minPct}%)`;
  const statMin = document.getElementById("trackerStatusMineral");
  const itemMin = document.getElementById("trackerItemMineral");
  if (statMin) {
    if (minPct >= 100) {
      statMin.innerHTML = `<span style="display:inline-flex; align-items:center; gap:4px; color:#059669;">${CALC_SVGS.check} Gedeckt</span>`;
      if (itemMin) itemMin.classList.add("completed");
    } else {
      const diff = Math.round(minTgt - cart.mineralLiters);
      statMin.innerHTML = `<span>Noch ca. ${diff} L</span> <span>(~${Math.ceil(diff / 9)} Har.)</span>`;
      if (itemMin) itemMin.classList.remove("completed");
    }
  }

  const fillSoft = document.getElementById("trackerFillSoft");
  if (fillSoft) fillSoft.style.width = Math.min(100, softPct) + "%";
  const valSoft = document.getElementById("trackerValSoft");
  if (valSoft) valSoft.textContent = `${cart.softLiters} / ${softTgt} L (${softPct}%)`;
  const statSoft = document.getElementById("trackerStatusSoft");
  const itemSoft = document.getElementById("trackerItemSoft");
  if (statSoft) {
    if (softPct >= 100) {
      statSoft.innerHTML = `<span style="display:inline-flex; align-items:center; gap:4px; color:#059669;">${CALC_SVGS.check} Gedeckt</span>`;
      if (itemSoft) itemSoft.classList.add("completed");
    } else {
      const diff = Math.round(softTgt - cart.softLiters);
      statSoft.innerHTML = `<span>Noch ca. ${diff} L</span> <span>(~${Math.ceil(diff / 12)} Har.)</span>`;
      if (itemSoft) itemSoft.classList.remove("completed");
    }
  }

  const fillBeer = document.getElementById("trackerFillBeer");
  if (fillBeer) fillBeer.style.width = Math.min(100, beerPct) + "%";
  const valBeer = document.getElementById("trackerValBeer");
  if (valBeer) valBeer.textContent = beerTgt > 0 ? `${cart.beerLiters} / ${beerTgt} L (${beerPct}%)` : `Alkoholfrei (100%)`;
  const statBeer = document.getElementById("trackerStatusBeer");
  const itemBeer = document.getElementById("trackerItemBeer");
  if (statBeer) {
    if (beerPct >= 100) {
      statBeer.innerHTML = `<span style="display:inline-flex; align-items:center; gap:4px; color:#059669;">${CALC_SVGS.check} Gedeckt</span>`;
      if (itemBeer) itemBeer.classList.add("completed");
    } else {
      const diff = Math.round(beerTgt - cart.beerLiters);
      statBeer.innerHTML = `<span>Noch ca. ${diff} L</span> <span>(~${Math.ceil(diff / 8)} Packs)</span>`;
      if (itemBeer) itemBeer.classList.remove("completed");
    }
  }

  const fillWine = document.getElementById("trackerFillWine");
  if (fillWine) fillWine.style.width = Math.min(100, winePct) + "%";
  const valWine = document.getElementById("trackerValWine");
  if (valWine) valWine.textContent = wineTgt > 0 ? `${cart.wineBottles} / ${wineTgt} Fl. (${winePct}%)` : `Alkoholfrei (100%)`;
  const statWine = document.getElementById("trackerStatusWine");
  const itemWine = document.getElementById("trackerItemWine");
  if (statWine) {
    if (winePct >= 100) {
      statWine.innerHTML = `<span style="display:inline-flex; align-items:center; gap:4px; color:#059669;">${CALC_SVGS.check} Gedeckt</span>`;
      if (itemWine) itemWine.classList.add("completed");
    } else {
      const diff = wineTgt - cart.wineBottles;
      statWine.innerHTML = `<span>Noch ${diff} ${diff === 1 ? 'Flasche' : 'Flaschen'}</span>`;
      if (itemWine) itemWine.classList.remove("completed");
    }
  }

  // Gesamt-Status Badge
  let coveredCount = 0;
  let totalTracked = 2; // Mineral + Soft immer
  if (minPct >= 100) coveredCount++;
  if (softPct >= 100) coveredCount++;
  if (beerTgt > 0) {
    totalTracked++;
    if (beerPct >= 100) coveredCount++;
  }
  if (wineTgt > 0) {
    totalTracked++;
    if (winePct >= 100) coveredCount++;
  }

  const overallEl = document.getElementById("trackerOverallStatus");
  if (overallEl) {
    if (coveredCount === totalTracked) {
      overallEl.innerHTML = `<span style="display:inline-flex; align-items:center; gap:5px;">${CALC_SVGS.checkDone} Alle ${totalTracked} Bereiche gedeckt</span>`;
      overallEl.style.background = "#DCFCE7";
      overallEl.style.color = "#166534";
      overallEl.style.borderColor = "#86EFAC";
    } else {
      overallEl.textContent = `${coveredCount} von ${totalTracked} Bereichen gedeckt`;
      overallEl.style.background = "var(--accent-light)";
      overallEl.style.color = "var(--accent-dark)";
      overallEl.style.borderColor = "var(--accent-border)";
    }
  }

  // Festbedarf Sticky Bar aktualisieren (Grösser & unter dem grünen Banner)
  const sfbFillMin = document.getElementById("sfbFillMineral");
  if (sfbFillMin) sfbFillMin.style.width = Math.min(100, minPct) + "%";
  const sfbValMin = document.getElementById("sfbValMineral");
  if (sfbValMin) sfbValMin.textContent = `${cart.mineralLiters} / ${minTgt} L (${minPct}%)`;
  const sfbSubMin = document.getElementById("sfbSubMineral");
  const sfbColMin = document.getElementById("sfbColMineral");
  if (sfbSubMin) {
    if (minPct >= 100) {
      sfbSubMin.innerHTML = `<span style="display:inline-flex; align-items:center; gap:4px; color:#059669;">${CALC_SVGS.check} 100% Gedeckt</span>`;
      if (sfbColMin) sfbColMin.classList.add("completed");
    } else {
      const diff = Math.round(minTgt - cart.mineralLiters);
      sfbSubMin.textContent = `Noch ca. ${diff} L (~${Math.ceil(diff / 9)} Har.)`;
      if (sfbColMin) sfbColMin.classList.remove("completed");
    }
  }

  const sfbFillSoft = document.getElementById("sfbFillSoft");
  if (sfbFillSoft) sfbFillSoft.style.width = Math.min(100, softPct) + "%";
  const sfbValSoft = document.getElementById("sfbValSoft");
  if (sfbValSoft) sfbValSoft.textContent = `${cart.softLiters} / ${softTgt} L (${softPct}%)`;
  const sfbSubSoft = document.getElementById("sfbSubSoft");
  const sfbColSoft = document.getElementById("sfbColSoft");
  if (sfbSubSoft) {
    if (softPct >= 100) {
      sfbSubSoft.innerHTML = `<span style="display:inline-flex; align-items:center; gap:4px; color:#059669;">${CALC_SVGS.check} 100% Gedeckt</span>`;
      if (sfbColSoft) sfbColSoft.classList.add("completed");
    } else {
      const diff = Math.round(softTgt - cart.softLiters);
      sfbSubSoft.textContent = `Noch ca. ${diff} L (~${Math.ceil(diff / 12)} Har.)`;
      if (sfbColSoft) sfbColSoft.classList.remove("completed");
    }
  }

  const sfbFillBeer = document.getElementById("sfbFillBeer");
  if (sfbFillBeer) sfbFillBeer.style.width = Math.min(100, beerPct) + "%";
  const sfbValBeer = document.getElementById("sfbValBeer");
  if (sfbValBeer) sfbValBeer.textContent = beerTgt > 0 ? `${cart.beerLiters} / ${beerTgt} L (${beerPct}%)` : "Alkoholfrei (100%)";
  const sfbSubBeer = document.getElementById("sfbSubBeer");
  const sfbColBeer = document.getElementById("sfbColBeer");
  if (sfbSubBeer) {
    if (beerTgt === 0 || beerPct >= 100) {
      sfbSubBeer.innerHTML = beerTgt === 0 ? "Alkoholfrei" : `<span style="display:inline-flex; align-items:center; gap:4px; color:#059669;">${CALC_SVGS.check} 100% Gedeckt</span>`;
      if (sfbColBeer) sfbColBeer.classList.add("completed");
    } else {
      const diff = Math.round(beerTgt - cart.beerLiters);
      sfbSubBeer.textContent = `Noch ca. ${diff} L (~${Math.ceil(diff / 8)} Packs)`;
      if (sfbColBeer) sfbColBeer.classList.remove("completed");
    }
  }

  const sfbFillWine = document.getElementById("sfbFillWine");
  if (sfbFillWine) sfbFillWine.style.width = Math.min(100, winePct) + "%";
  const sfbValWine = document.getElementById("sfbValWine");
  if (sfbValWine) sfbValWine.textContent = wineTgt > 0 ? `${cart.wineBottles} / ${wineTgt} Fl. (${winePct}%)` : "Alkoholfrei (100%)";
  const sfbSubWine = document.getElementById("sfbSubWine");
  const sfbColWine = document.getElementById("sfbColWine");
  if (sfbSubWine) {
    if (wineTgt === 0 || winePct >= 100) {
      sfbSubWine.innerHTML = wineTgt === 0 ? "Alkoholfrei" : `<span style="display:inline-flex; align-items:center; gap:4px; color:#059669;">${CALC_SVGS.check} 100% Gedeckt</span>`;
      if (sfbColWine) sfbColWine.classList.add("completed");
    } else {
      const diff = wineTgt - cart.wineBottles;
      sfbSubWine.textContent = `Noch ${diff} ${diff === 1 ? 'Flasche' : 'Flaschen'}`;
      if (sfbColWine) sfbColWine.classList.remove("completed");
    }
  }

  const sfbBadge = document.getElementById("sfbStatusBadge");
  if (sfbBadge) {
    if (coveredCount === totalTracked) {
      sfbBadge.innerHTML = `<span style="display:inline-flex; align-items:center; gap:5px;">${CALC_SVGS.checkDone} Alle ${totalTracked} Bereiche gedeckt</span>`;
      sfbBadge.classList.add("all-done");
    } else {
      sfbBadge.textContent = `${coveredCount} von ${totalTracked} Bereichen gedeckt`;
      sfbBadge.classList.remove("all-done");
    }
  }

  updateCollapsedSummary();
}

// Option 1: Standard-Produkte mit 1 Klick übernehmen
function applyCalculatorStandardProducts() {
  calcHasUserSelected = true;
  updateCollapsedSummary();
  const std = calcStandards[calcEventType] || DEFAULT_CALCULATOR_STANDARDS[calcEventType];
  if (!std) return;

  // Mineral
  if (std.mineral) {
    const p = findProduct(std.mineral);
    if (p) {
      const caseVol = getProductCaseVolumeLiters(p);
      const casesNeeded = Math.max(1, Math.ceil(calcTargets.mineralLiters / caseVol));
      if (!qty[p.id]) qty[p.id] = { bottles: 0, cases: 0 };
      qty[p.id].cases = (qty[p.id].cases || 0) + casesNeeded;
      updateQtyDOM(p.id);
    }
  }

  // Softdrinks
  if (std.soft) {
    const p = findProduct(std.soft);
    if (p) {
      const caseVol = getProductCaseVolumeLiters(p);
      const casesNeeded = Math.max(1, Math.ceil(calcTargets.softLiters / caseVol));
      if (!qty[p.id]) qty[p.id] = { bottles: 0, cases: 0 };
      qty[p.id].cases = (qty[p.id].cases || 0) + casesNeeded;
      updateQtyDOM(p.id);
    }
  }

  // Bier
  if (std.beer && calcTargets.beerLiters > 0) {
    const p = findProduct(std.beer);
    if (p) {
      const caseVol = getProductCaseVolumeLiters(p);
      const casesNeeded = Math.max(1, Math.ceil(calcTargets.beerLiters / caseVol));
      if (!qty[p.id]) qty[p.id] = { bottles: 0, cases: 0 };
      qty[p.id].cases = (qty[p.id].cases || 0) + casesNeeded;
      updateQtyDOM(p.id);
    }
  }

  // Wein
  if (std.wine && calcTargets.wineBottles > 0) {
    const p = findProduct(std.wine);
    if (p) {
      if (!qty[p.id]) qty[p.id] = { bottles: 0, cases: 0 };
      if (!p.caseOnly && p.allowSingleBottle !== false) {
        qty[p.id].bottles = (qty[p.id].bottles || 0) + calcTargets.wineBottles;
      } else {
        const cSize = p.caseSize || 6;
        const casesNeeded = Math.max(1, Math.ceil(calcTargets.wineBottles / cSize));
        qty[p.id].cases = (qty[p.id].cases || 0) + casesNeeded;
      }
      updateQtyDOM(p.id);
    }
  }

  renderProducts();
  updateCategoryBadges();
  updateSummaryBar();
  activateTrackerMode(false);

  showCalculatorToast(`Mengen für ${calcGuests} Personen (${calcHours} Std.) übernommen!`);

  // Wizard: Springe direkt zu Schritt 3 (Angaben), markiere 2 als übersprungen/fertig
  setTimeout(() => {
    setWizardStep(3);
  }, 250);
}

let isProgrammaticScrollingToTracker = false;

// Option 2: Bedarfs-Tracker aktivieren ("Selbst zusammenstellen mit Fortschrittsbalken")
function activateTrackerMode(shouldScroll) {
  calcHasUserSelected = true;
  calcTrackerActive = true;
  updateCollapsedSummary();
  updateCalculatorTracker();

  // Sticky Festbedarf-Tracker im Header sofort sichtbar machen
  const bar = document.getElementById("stickyFestbedarfBar");
  if (bar) {
    bar.classList.add("visible");
  }

  if (shouldScroll) {
    showCalculatorToast("Bedarfs-Tracker aktiv: Wähle jetzt deine Produkte!");
    // Springe in Wizard-Schritt 2
    setTimeout(() => {
      setWizardStep(2);
    }, 250);
  }
}

function deactivateTrackerMode() {
  calcTrackerActive = false;
  const panel = document.getElementById("calcTrackerPanel");
  if (panel) panel.style.display = "none";
  checkStickyTrackerVisibility();
}

function toggleDrinkCalculator(forceState) {
  isDrinkCalcCollapsed = false;
  const subText = document.getElementById("calcSubText");
  if (subText) subText.style.display = "block";
}

function updateCollapsedSummary() {
  // Not used in Wizard UI
}

function checkStickyTrackerVisibility() {
  const bar = document.getElementById("stickyFestbedarfBar");
  if (!bar) return;

  // Der Tracker soll erst angezeigt werden, wenn man auf "Selbst zusammenstellen" geklickt hat!
  if (!calcTrackerActive) {
    bar.classList.remove("visible");
    return;
  }

  // Im reinen Admin-Dashboard niemals den Festbedarf-Tracker einblenden
  if (typeof isEditPricesMode !== "undefined" && isEditPricesMode && !isCustomerPreviewMode) {
    bar.classList.remove("visible");
    return;
  }

  // Während des automatischen Scrollens Tracker immer sichtbar halten
  if (isProgrammaticScrollingToTracker) {
    bar.classList.add("visible");
    return;
  }

  const topCat = document.querySelector('details.category[data-cat-name="Top-Angebote"]') || document.getElementById("categories");
  if (!topCat) return;

  const header = document.querySelector("header.top");
  const headerBottom = header ? header.getBoundingClientRect().bottom : 85;
  const topRect = topCat.getBoundingClientRect();
  const actionsGrid = document.querySelector(".calc-actions-grid");
  const actionsRect = actionsGrid ? actionsGrid.getBoundingClientRect() : null;

  // Regel:
  // - Alles oberhalb von Top-Angebote / Aktionsbereich (Rechner-Eingaben für Gäste, Stunden, etc.): Tracker ist ausgeblendet.
  // - Ab genau hier (Aktionsbuttons bzw. Top-Angebote im Sichtbereich, sodass Top-Angebote perfekt zu sehen ist):
  //   Tracker wird eingeblendet und bleibt über alle Kategorien hinweg sichtbar!
  let shouldShow = false;

  if (isDrinkCalcCollapsed) {
    // Wenn Rechner zugeklappt ist: Tracker sichtbar, sobald aus dem obersten Headerbereich gescrollt wird
    shouldShow = window.scrollY > 40 || topRect.top <= headerBottom + 120;
  } else {
    // Wenn Rechner aufgeklappt ist:
    // Im oberen Teil (Gäste, Stunden, Anlass) ausgeblendet.
    // Sobald die Aktionsbuttons die Kopfzeile erreichen bzw. Top-Angebote im Viewport sichtbar ist:
    const isActionsReached = actionsRect && actionsRect.top <= headerBottom + 120;
    const isTopCatVisible = topRect.top <= 550;
    const isScrolledPast = topRect.top <= headerBottom + 30;

    shouldShow = isActionsReached || isTopCatVisible || isScrolledPast;
  }

  if (shouldShow) {
    bar.classList.add("visible");
  } else {
    bar.classList.remove("visible");
  }
}

window.addEventListener("resize", () => {
  checkStickyTrackerVisibility();
}, { passive: true });

function scrollToAndOpenCalculator() {
  toggleDrinkCalculator(true); // Sicherstellen, dass Rechner offen ist
  const el = document.getElementById("drinkCalculatorSection");
  if (el) {
    const header = document.querySelector("header.top");
    const headerH = header ? header.offsetHeight : 80;
    const y = el.getBoundingClientRect().top + window.pageYOffset - (headerH + 15);
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }
}

function scrollToCategorySection(type) {
  const catKeywords = {
    mineral: "mineral",
    soft: "süssgetränke",
    beer: "bier",
    wine: "wein"
  };
  const kw = catKeywords[type] || type;
  const allDetails = document.querySelectorAll("details.category");
  for (const det of allDetails) {
    const name = (det.dataset.catName || "").toLowerCase();
    if (name.includes(kw)) {
      det.open = true;
      const header = document.querySelector("header.top");
      const headerH = header ? header.offsetHeight : 220;
      const y = det.getBoundingClientRect().top + window.pageYOffset - (headerH + 16);
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      break;
    }
  }
}

function scrollToCalculator() {
  scrollToAndOpenCalculator();
}

// Toast-Benachrichtigung
function showCalculatorToast(msg) {
  let container = document.getElementById("presetToastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "presetToastContainer";
    container.style.cssText = "position:fixed; bottom:90px; left:50%; transform:translateX(-50%); z-index:9999; pointer-events:none; display:flex; flex-direction:column; gap:8px; align-items:center;";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.style.cssText = "background:#1F3A2E; color:#ffffff; padding:12px 22px; border-radius:30px; font-weight:700; font-size:0.92rem; box-shadow:0 10px 25px rgba(0,0,0,0.25); display:flex; align-items:center; gap:8px; animation: slideUpToast 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; border:1px solid #C9A227;";
  toast.innerHTML = `<span>${msg}</span>`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// =========================================================================
// ADMIN: STANDARD-PRODUKTE KONFIGURIEREN & BEARBEITEN
// =========================================================================

let activeAdminStandardsTab = "grillfest";
let adminChangingSlot = null;

function openCalcStandardsModal() {
  activeAdminStandardsTab = "grillfest";
  adminChangingSlot = null;
  renderAdminStandardsTabs();
  renderAdminStandardsSlots();
  const overlay = document.getElementById("adminCalcStandardsOverlay");
  if (overlay) overlay.classList.add("open");
}

function closeCalcStandardsModal() {
  const overlay = document.getElementById("adminCalcStandardsOverlay");
  if (overlay) overlay.classList.remove("open");
}

function switchAdminStandardsTab(tab) {
  activeAdminStandardsTab = tab;
  adminChangingSlot = null;
  renderAdminStandardsTabs();
  renderAdminStandardsSlots();
}

function renderAdminStandardsTabs() {
  const tabs = ["grillfest", "apero", "party", "family"];
  tabs.forEach(t => {
    const btn = document.getElementById(`tabBtn_${t}`);
    if (btn) {
      if (t === activeAdminStandardsTab) btn.classList.add("active");
      else btn.classList.remove("active");
    }
  });
}

function renderAdminStandardsSlots() {
  const container = document.getElementById("adminStandardsSlotsContainer");
  if (!container) return;

  const std = calcStandards[activeAdminStandardsTab] || DEFAULT_CALCULATOR_STANDARDS[activeAdminStandardsTab];
  const categoriesDef = [
    { key: "mineral", name: "Mineralwasser", icon: CALC_SVGS.mineral },
    { key: "soft", name: "Süssgetränke / Eistee", icon: CALC_SVGS.soft },
    { key: "beer", name: "Bier", icon: CALC_SVGS.beer },
    { key: "wine", name: "Wein / Schaumwein", icon: CALC_SVGS.wine }
  ];

  container.innerHTML = categoriesDef.map(cat => {
    const art = std[cat.key];
    const p = findProduct(art);
    const prodName = p ? p.name : (art ? `Artikel ${art}` : "Kein Produkt zugewiesen");
    const prodPrice = p ? money(p.price) : "";
    const prodArt = p ? `Art.-Nr. ${p.art}` : "";
    const isChanging = adminChangingSlot === cat.key;

    return `
      <div style="background:var(--bg); border:1px solid var(--border); border-radius:var(--radius-sm); padding:14px; display:flex; flex-direction:column; gap:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-size:1.8rem; line-height:1; display:inline-flex; align-items:center;">${cat.icon}</span>
            <div>
              <div style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">Standard für ${cat.name}</div>
              <strong style="font-size:0.95rem; color:var(--text); display:block;">${prodName}</strong>
              ${p ? `<span style="font-size:0.8rem; color:var(--text-muted);">${prodArt} • ${prodPrice}</span>` : ''}
            </div>
          </div>
          <button type="button" onclick="startChangeAdminSlot('${cat.key}')" style="background:#0284C7; color:white; border:none; padding:7px 14px; border-radius:6px; font-size:0.82rem; font-weight:600; cursor:pointer; display:inline-flex; align-items:center; gap:6px;">
            ${isChanging ? 'Abbrechen' : `${CALC_SVGS.refresh} Produkt ändern`}
          </button>
        </div>

        ${isChanging ? `
          <div style="margin-top:6px; padding-top:10px; border-top:1px dashed var(--border); position:relative;">
            <label style="font-size:0.78rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;">Landi-Produkt suchen:</label>
            <input type="text" id="adminSlotSearchInput_${cat.key}" placeholder="Name oder Art.-Nr. tippen…" oninput="filterAdminSlotSearch(this.value, '${cat.key}')" style="width:100%; padding:8px 12px; border-radius:6px; border:1px solid var(--border); font-size:0.86rem; background:var(--card); color:var(--text);" autocomplete="off">
            <div id="adminSlotSearchResults_${cat.key}" style="margin-top:4px; max-height:190px; overflow-y:auto; background:var(--card); border:1px solid var(--border); border-radius:6px; box-shadow:0 8px 24px rgba(0,0,0,0.15);"></div>
          </div>
        ` : ''}
      </div>
    `;
  }).join("");

  if (adminChangingSlot) {
    setTimeout(() => {
      const inp = document.getElementById(`adminSlotSearchInput_${adminChangingSlot}`);
      if (inp) {
        inp.focus();
        filterAdminSlotSearch("", adminChangingSlot);
      }
    }, 50);
  }
}

function startChangeAdminSlot(slotKey) {
  if (adminChangingSlot === slotKey) {
    adminChangingSlot = null;
  } else {
    adminChangingSlot = slotKey;
  }
  renderAdminStandardsSlots();
}

function filterAdminSlotSearch(query, slotKey) {
  const container = document.getElementById(`adminSlotSearchResults_${slotKey}`);
  if (!container) return;

  const q = (query || "").trim().toLowerCase();
  const allProds = [];
  const seenArts = new Set();

  CATEGORIES.forEach(cat => {
    (cat.items || []).forEach(p => {
      if (!seenArts.has(String(p.art))) {
        seenArts.add(String(p.art));
        allProds.push(p);
      }
    });
  });

  let matches = [];
  if (!q) {
    matches = allProds.filter(p => getProductCategoryGroup(p) === slotKey).slice(0, 12);
    if (matches.length === 0) matches = allProds.slice(0, 10);
  } else {
    matches = allProds.filter(p =>
      (p.name || "").toLowerCase().includes(q) ||
      String(p.art).includes(q) ||
      (p.category || "").toLowerCase().includes(q)
    ).slice(0, 15);
  }

  if (matches.length === 0) {
    container.innerHTML = '<div style="padding:10px; color:var(--text-muted); font-size:0.84rem; text-align:center;">Kein passendes Produkt gefunden.</div>';
    return;
  }

  container.innerHTML = matches.map(p => {
    const encSlot = encodeURIComponent(slotKey);
    const encArt = encodeURIComponent(p.art);
    return `
    <div onclick="selectAdminSlotProduct(decodeURIComponent('${encSlot}'), decodeURIComponent('${encArt}'))" style="padding:8px 12px; cursor:pointer; border-bottom:1px solid var(--border); font-size:0.84rem; display:flex; justify-content:space-between; align-items:center;" onmouseover="this.style.background='var(--primary-light)'" onmouseout="this.style.background='transparent'">
      <div>
        <strong>${escapeHtml(p.name)}</strong>
        <span style="color:var(--text-muted); font-size:0.78rem; display:block;">Art.-Nr. ${escapeHtml(p.art)} • ${escapeHtml(p.category || '')}</span>
      </div>
      <span style="font-weight:700; color:var(--primary); font-size:0.85rem;">${money(p.price)}</span>
    </div>
  `;
  }).join("");
}

function selectAdminSlotProduct(slotKey, art) {
  if (!calcStandards[activeAdminStandardsTab]) {
    calcStandards[activeAdminStandardsTab] = {};
  }
  calcStandards[activeAdminStandardsTab][slotKey] = String(art);
  adminChangingSlot = null;
  renderAdminStandardsSlots();
}

function saveCalcStandardsFromModal() {
  localStorage.setItem("landi_calc_standards", JSON.stringify(calcStandards));
  closeCalcStandardsModal();
  recalculateCalcNeeds();
  showCalculatorToast("Standard-Produkte für den Rechner gespeichert!");
}

function resetCalcStandardsToDefault() {
  if (confirm("Möchtest du die Standard-Produkte wirklich auf die Landi-Werkseinstellungen zurücksetzen?")) {
    calcStandards = JSON.parse(JSON.stringify(DEFAULT_CALCULATOR_STANDARDS));
    localStorage.removeItem("landi_calc_standards");
    renderAdminStandardsSlots();
    recalculateCalcNeeds();
    showCalculatorToast("Standards erfolgreich zurückgesetzt.");
  }
}

// Initialisierung des Getränkerechners
function initDrinkCalculator() {
  const adminCalcBtn = document.getElementById("adminCalcSettingsBtnContainer");
  if (adminCalcBtn) adminCalcBtn.style.display = isEditPricesMode ? "block" : "none";
  updateGuestTickHighlight(calcGuests);
  updateHoursTickHighlight(calcHours);
  recalculateCalcNeeds();
  updateCollapsedSummary();
  checkStickyTrackerVisibility();
}

// Kompatibilitäts-Alias für frühere Aufrufe
function renderPresets() {
  initDrinkCalculator();
}

function confirmResetAll() {
  const modal = document.getElementById("resetModalOverlay");
  if (modal) modal.classList.add("open");
}

function closeResetModal() {
  const modal = document.getElementById("resetModalOverlay");
  if (modal) modal.classList.remove("open");
}

function handleResetOverlayClick(e) {
  if (e.target.id === "resetModalOverlay") closeResetModal();
}

function executeResetAll() {
  window.location.reload();
}

let isHeaderScrolled = false;
let scrollTicking = false;

window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      const header = document.querySelector("header.top");
      if (header) {
        const sy = window.scrollY;
        if (!isHeaderScrolled && sy > 45) {
          isHeaderScrolled = true;
          header.classList.add("scrolled");
        } else if (isHeaderScrolled && sy < 10) {
          isHeaderScrolled = false;
          header.classList.remove("scrolled");
        }
      }

      checkStickyTrackerVisibility();

      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });

function initTheme() {
  document.body.classList.remove("dark-mode");
  document.body.classList.add("light-mode");
  localStorage.setItem("landi_theme", "light");
}

initTheme();

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
  if (!localStorage.getItem("landi_theme")) {
    initTheme();
  }
});

updateAdminHeaderBtn();
renderPresets();
renderProducts();
renderFestmaterial();

// Welcome-Modal nur für normale Kunden anzeigen (niemals wenn /admin oder #admin aufgerufen wird)
initWelcomeModal();

// Sortiment live aus Supabase nachladen (falls Tabellen vorhanden)
if (typeof loadCatalogFromSupabase === "function") {
  loadCatalogFromSupabase();
}
if (typeof loadFestmaterialFromSupabase === "function") {
  loadFestmaterialFromSupabase();
}

/* START: pdf_extended */
let currentOrders = [];
let currentReturnOrder = null;

function openAdminOrdersModal() {
  document.getElementById("adminOrdersOverlay").classList.add("open");
  loadOrders();
}

function closeAdminOrdersModal() {
  document.getElementById("adminOrdersOverlay").classList.remove("open");
}

async function loadOrders() {
  if (!supabaseClient) return;
  const tbody = document.getElementById("adminOrdersTbody");
  tbody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>Lade Bestellungen...</td></tr>";
  
  const { data, error } = await supabaseClient.from('orders').select('*').order('created_at', { ascending: false }).limit(200);
  if (error) {
    console.error("Error loading orders", error);
    tbody.innerHTML = "<tr><td colspan='6' style='text-align:center; color:red;'>Fehler beim Laden.</td></tr>";
    return;
  }
  
  currentOrders = data;
  renderOrdersTable();
}

function filterOrders() {
  renderOrdersTable();
}

function renderOrdersTable() {
  const tbody = document.getElementById("adminOrdersTbody");
  const search = document.getElementById("adminOrdersSearch").value.toLowerCase();
  
  tbody.innerHTML = "";
  if (currentOrders.length === 0) {
      tbody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>Keine Bestellungen gefunden.</td></tr>";
      return;
  }
  
  currentOrders.forEach(order => {
      const refFormatted = order.ref_nr || String(order.id).padStart(6, '0');
      if (search && !refFormatted.toLowerCase().includes(search)) return;
      
      const date = new Date(order.created_at).toLocaleString('de-CH');
      const itemCount = (order.items || []).length;
      
      let statusBg = "#f1f5f9"; let statusColor = "#475569"; let statusText = "Offen";
      let currentStatus = order.status || "offen";
      
      if (currentStatus === "in_bearbeitung") {
          statusBg = "#fef08a"; statusColor = "#854d0e"; statusText = "In Bearbeitung";
      } else if (currentStatus === "abgeschlossen") {
          statusBg = "#fecaca"; statusColor = "#991b1b"; statusText = "Abgeschlossen";
      }
      
      let statusBadge = `<button onclick="cycleOrderStatus(${order.id}, '${currentStatus}')" style="padding: 4px 10px; border: none; border-radius: 12px; background: ${statusBg}; color: ${statusColor}; font-size: 12px; font-weight: bold; cursor: pointer; transition: opacity 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">${statusText}</button>`;
      
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>#${refFormatted}</strong></td>
        <td>${date}</td>
        <td>${itemCount} Pos.</td>
        <td>CHF ${parseFloat(order.total_amount).toFixed(2)}</td>
        <td>${statusBadge}</td>
        <td style="text-align: right;">
          <button class="admin-fest-status-btn" onclick="viewOrderDetails(${order.id})" title="Details anzeigen">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            Öffnen
          </button>
          <button class="admin-fest-status-btn" onclick="openReturnModal(${order.id})" title="Retoure verbuchen" ${order.status === 'abgeschlossen' ? 'disabled' : ''}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Retoure
          </button>
          <button class="admin-fest-status-btn danger" onclick="event.stopPropagation(); deleteOrder(${order.id})" title="Löschen">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
  });
}



async function cycleOrderStatus(id, currentStatus) {
    if (!supabaseClient) return;
    
    let nextStatus = "offen";
    if (currentStatus === "offen") nextStatus = "in_bearbeitung";
    else if (currentStatus === "in_bearbeitung") nextStatus = "abgeschlossen";
    else if (currentStatus === "abgeschlossen") nextStatus = "offen";
    
    // Optimistic UI update
    const orderIndex = currentOrders.findIndex(o => o.id === id);
    if (orderIndex > -1) {
        currentOrders[orderIndex].status = nextStatus;
        renderOrdersTable();
    }
    
    try {
        const { error } = await supabaseClient.from("orders").update({ status: nextStatus }).eq("id", id);
        if (error) throw error;
    } catch (err) {
        console.error("Fehler beim Status Update:", err);
        // revert on error
        if (orderIndex > -1) {
            currentOrders[orderIndex].status = currentStatus;
            renderOrdersTable();
        }
        alert("Status konnte nicht aktualisiert werden.");
    }
}

function viewOrderDetails(id) {
  const order = currentOrders.find(o => o.id === id);
  if (!order) return;
  window.currentViewOrder = order;
  
  const refFormatted = order.ref_nr || String(order.id).padStart(6, '0');
  document.getElementById("viewModalTitle").innerText = `Bestellung: #${refFormatted}`;
  
  const tbody = document.getElementById("adminOrderViewTbody");
  tbody.innerHTML = "";
  
  (order.items || []).forEach(item => {
      const displayPrice = parseFloat(item.unit_price);
      let rowTotal = item.row_total;
      if (rowTotal === undefined) {
          let calcPrice = displayPrice;
          if (item.display_qty && (item.display_qty.includes("Pck") || item.display_qty.includes("Harass"))) {
              let caseSize = 1;
              const aMatch = item.display_qty.match(/à\s*(\d+)/);
              if (aMatch) caseSize = parseInt(aMatch[1]);
              if (caseSize > 1) calcPrice = displayPrice / caseSize;
          }
          rowTotal = item.qty * calcPrice;
      }

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.art || '-'}</td>
        <td>${item.name}</td>
        <td>${item.display_qty || item.qty + 'x'}</td>
        <td>CHF ${displayPrice.toFixed(2)}</td>
        <td><strong>CHF ${rowTotal.toFixed(2)}</strong></td>
      `;
      tbody.appendChild(tr);
  });
  
  document.getElementById("viewTotalAmount").innerText = `CHF ${parseFloat(order.total_amount).toFixed(2)}`;
  
  document.getElementById("adminOrderViewOverlay").classList.add("open");
}

function closeAdminOrderViewModal() {
  document.getElementById("adminOrderViewOverlay").classList.remove("open");
}

async function downloadPickingList() {
    if (!window.currentViewOrder) return;
    const order = window.currentViewOrder;
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const refFormatted = order.ref_nr || String(order.id).padStart(6, "0");
    const today = new Date().toLocaleDateString("de-CH");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(31, 58, 46);
    doc.text("RÜSTLISTE / PICKING LIST", 14, 20);
    
    doc.setFontSize(14);
    doc.text("Referenz-Nr.: #" + refFormatted, 14, 30);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Datum: " + today, 14, 38);
    
    if (order.items && order.items.length > 0) {
        doc.autoTable({
            startY: 45,
            head: [["Art-Nr.", "Artikel", "Menge (Gebinde/Pack/Flaschen)", "Gerüstet"]],
            body: order.items.map(item => [
                item.art || "-",
                item.name,
                item.display_qty || (item.qty + "x"),
                "[      ]"
            ]),
            styles: { fontSize: 11, font: "helvetica", cellPadding: 4 },
            headStyles: { fillColor: [31, 58, 46], textColor: [255, 255, 255], fontStyle: "bold" },
            alternateRowStyles: { fillColor: [247, 249, 245] }
        });
    }
    
    doc.save("ruestliste-" + refFormatted + ".pdf");
}

function openReturnModal(id) {
  currentReturnOrder = currentOrders.find(o => o.id === id);
  if (!currentReturnOrder) return;
  
  const refFormatted = currentReturnOrder.ref_nr || String(currentReturnOrder.id).padStart(6, '0');
  document.getElementById("returnModalTitle").innerText = `Fest-Rücknahme: #${refFormatted}`;
  
  const tbody = document.getElementById("adminReturnTbody");
  tbody.innerHTML = "";
  
  if (document.getElementById("returnDepotHarassen")) document.getElementById("returnDepotHarassen").value = 0;
  if (document.getElementById("returnDepotFlaschen30")) document.getElementById("returnDepotFlaschen30").value = 0;
  if (document.getElementById("returnDepotFlaschen50")) document.getElementById("returnDepotFlaschen50").value = 0;
  
  (currentReturnOrder.items || []).forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>CHF ${parseFloat(item.unit_price).toFixed(2)}</td>
        <td>
          <input type="number" min="0" max="${item.qty}" value="0" id="retQty_${index}" onchange="calcReturn()" onkeyup="calcReturn()" style="width: 70px; padding: 5px; border: 1px solid #cbd5e1; border-radius: 4px;">
        </td>
        <td id="retRowTotal_${index}">CHF 0.00</td>
      `;
      tbody.appendChild(tr);
  });
  
  document.getElementById("returnTotalOriginal").innerText = `CHF ${parseFloat(currentReturnOrder.total_amount).toFixed(2)}`;
  document.getElementById("returnTotalDeposit").innerText = `CHF ${parseFloat(currentReturnOrder.total_deposit || 0).toFixed(2)}`;
  
  calcReturn();
  document.getElementById("adminReturnOverlay").classList.add("open");
}

function openAdminFeedbackModal() {
  document.getElementById("feedbackName").value = "";
  document.getElementById("feedbackText").value = "";
  document.getElementById("feedbackMessage").style.display = "none";
  document.getElementById("btnSubmitFeedback").disabled = false;
  document.getElementById("btnSubmitFeedback").innerText = "Notiz senden";
  document.getElementById("adminFeedbackOverlay").classList.add("open");
}

let currentConfirmCallback = null;

function showConfirmModal(title, message, btnText, callback) {
    document.getElementById("confirmTitle").innerText = title;
    document.getElementById("confirmMessage").innerText = message;
    document.getElementById("confirmBtn").innerText = btnText;
    currentConfirmCallback = callback;
    
    document.getElementById("confirmBtn").onclick = function() {
        closeConfirmModal();
        if (currentConfirmCallback) currentConfirmCallback();
    };
    
    document.getElementById("confirmOverlay").classList.add("open");
}

function closeConfirmModal() {
    document.getElementById("confirmOverlay").classList.remove("open");
    currentConfirmCallback = null;
}

function closeAdminFeedbackModal() {
  document.getElementById("adminFeedbackOverlay").classList.remove("open");
}

function openAdminFeedbackListModal() {
  document.getElementById("adminFeedbackListOverlay").classList.add("open");
  loadFeedbackList();
}

function closeAdminFeedbackListModal() {
  document.getElementById("adminFeedbackListOverlay").classList.remove("open");
}

async function loadFeedbackList() {
  const container = document.getElementById("adminFeedbackListContainer");
  container.innerHTML = "<div style='text-align:center; padding:20px; color:#64748b;'>Lade Notizen...</div>";
  if (!supabaseClient) return;
  
  const { data, error } = await supabaseClient.from('feedbacks').select('*').order('created_at', { ascending: false });
  if (error) {
    container.innerHTML = "<div style='text-align:center; padding:20px; color:red;'>Fehler beim Laden.</div>";
    return;
  }
  
  if (!data || data.length === 0) {
    container.innerHTML = "<div style='text-align:center; padding:20px; color:#64748b;'>Keine Entwicklungsnotizen vorhanden.</div>";
    return;
  }
  
  container.innerHTML = "";
  data.forEach(note => {
    const isSuperAdmin = (currentAdminRole === "super_admin");
    const date = new Date(note.created_at).toLocaleString('de-CH');
    const idStr = String(note.id).padStart(3, '0');
    const name = note.name || "Unbekannt";
    const text = note.message || "";
    
    let delBtn = "";
    if (isSuperAdmin) {
      delBtn = `<button class="admin-fest-status-btn danger" style="padding:4px 8px; font-size:12px;" onclick="deleteFeedbackNote(${note.id})">Löschen</button>`;
    }
    
    const div = document.createElement("div");
    div.style.cssText = "background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; position: relative; box-shadow: 0 1px 2px rgba(0,0,0,0.05);";
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
        <div>
          <div style="font-weight:600; color:#1e293b;">#${idStr} - ${escapeHtml(name)}</div>
          <div style="font-size:12px; color:#94a3b8;">${date}</div>
        </div>
        ${delBtn}
      </div>
      <div style="color:#475569; font-size:14px; white-space:pre-wrap; line-height: 1.5;">${escapeHtml(text)}</div>
    `;
    container.appendChild(div);
  });
}

async function deleteFeedbackNote(id) {
  showConfirmModal("Notiz löschen", "Möchtest du diese Notiz wirklich löschen?", "Löschen", async () => {
    if (!supabaseClient) return;
    
    try {
      const { error } = await supabaseClient.from('feedbacks').delete().eq('id', id);
      if (error) throw error;
      loadFeedbackList();
    } catch (err) {
      console.error(err);
      alert("Fehler beim Löschen der Notiz.");
    }
  });
}

async function saveFeedback() {
  if (!supabaseClient) return;
  const name = document.getElementById("feedbackName").value.trim();
  const text = document.getElementById("feedbackText").value.trim();
  
  if (!name || !text) {
    alert("Bitte Name und Anliegen ausfüllen.");
    return;
  }
  
  const btn = document.getElementById("btnSubmitFeedback");
  btn.disabled = true;
  btn.innerText = "Sendet...";
  
  try {
      const { error } = await supabaseClient.from('feedbacks').insert([{
          name: name,
          message: text
      }]);
      
      if (error) throw error;
      
      document.getElementById("feedbackMessage").style.display = "block";
      setTimeout(closeAdminFeedbackModal, 2000);
  } catch (err) {
      console.error(err);
      alert("Fehler beim Senden des Feedbacks.");
      btn.disabled = false;
      btn.innerText = "Notiz senden";
  }
}

function closeAdminReturnModal() {
  document.getElementById("adminReturnOverlay").classList.remove("open");
  currentReturnOrder = null;
}

function calcReturn() {
  if (!currentReturnOrder) return;
  let totalRefund = 0;
  
  (currentReturnOrder.items || []).forEach((item, index) => {
      const retQtyInput = document.getElementById(`retQty_${index}`);
      if (retQtyInput) {
          let qty = parseInt(retQtyInput.value) || 0;
          if (qty > item.qty) { qty = item.qty; retQtyInput.value = qty; } // constrain
          
          let calcPrice = item.price_per_unit;
          if (calcPrice === undefined) {
              calcPrice = parseFloat(item.unit_price);
              if (item.display_qty && (item.display_qty.includes("Pck") || item.display_qty.includes("Harass"))) {
                  let caseSize = 1;
                  const aMatch = item.display_qty.match(/à\s*(\d+)/);
                  if (aMatch) caseSize = parseInt(aMatch[1]);
                  if (caseSize > 1) calcPrice = parseFloat(item.unit_price) / caseSize;
              }
          }
          
          const refundValue = qty * calcPrice;
          document.getElementById(`retRowTotal_${index}`).innerText = `CHF ${refundValue.toFixed(2)}`;
          totalRefund += refundValue;
      }
  });
  
  const hQty = parseInt(document.getElementById("returnDepotHarassen")?.value) || 0;
  const f30Qty = parseInt(document.getElementById("returnDepotFlaschen30")?.value) || 0;
  const f50Qty = parseInt(document.getElementById("returnDepotFlaschen50")?.value) || 0;
  
  const depotRefund = (hQty * 5) + (f30Qty * 0.3) + (f50Qty * 0.5);
  totalRefund += depotRefund;
  
  document.getElementById("returnTotalRefund").innerText = `CHF ${totalRefund.toFixed(2)}`;
  
  const orig = parseFloat(currentReturnOrder.total_amount);
  const isPaid = document.getElementById("returnAlreadyPaid") && document.getElementById("returnAlreadyPaid").checked;
  const newTotal = isPaid ? -totalRefund : (orig - totalRefund);
  
  document.getElementById("returnNewTotal").innerText = `CHF ${newTotal.toFixed(2)}`;
  if (isPaid) {
      document.getElementById("returnNewTotal").style.color = "#DC2626"; // Red for payout
  } else {
      document.getElementById("returnNewTotal").style.color = "inherit";
  }
}


async function generateReturnPdf(order, returns, totalRefund, isPaid, festRetour) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const refFormatted = order.ref_nr || String(order.id).padStart(6, "0");
    const today = new Date().toLocaleDateString("de-CH");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(220, 38, 38); // Red color for RETOUR
    doc.text("RETOUR / RÜCKNAHME", 14, 20);
    
    doc.setFontSize(14);
    doc.setTextColor(31, 58, 46);
    doc.text("Referenz-Nr.: #" + refFormatted, 14, 30);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Datum der Rücknahme: " + today, 14, 38);
    
    if (returns.length > 0) {
        doc.autoTable({
            startY: 45,
            head: [["Art.-Nr.", "Zurückgebrachter Artikel", "Menge", "Gutschrift"]],
            body: returns.map(r => [
                r.art || "—",
                r.name,
                r.returned_qty + "x",
                "CHF " + parseFloat(r.refund_value).toFixed(2)
            ]),
            styles: { fontSize: 10, font: "helvetica" },
            headStyles: { fillColor: [220, 38, 38], textColor: [255, 255, 255], fontStyle: "bold" },
            alternateRowStyles: { fillColor: [254, 242, 242] },
        });
        
        let finalY = doc.lastAutoTable.finalY + 10;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(220, 38, 38);
        doc.text("Total Gutschrift: CHF " + parseFloat(totalRefund).toFixed(2), 14, finalY);
        
        const orig = parseFloat(order.total_amount);
        doc.setTextColor(31, 58, 46);
        doc.text("Ursprünglicher Rechnungsbetrag: CHF " + orig.toFixed(2), 14, finalY + 8);
        
        let currentY = finalY + 18;
        if (isPaid) {
            doc.setFont("helvetica", "bold");
            doc.setTextColor(220, 38, 38);
            doc.text("Auszahlungsbetrag (unverbindlich): CHF " + totalRefund.toFixed(2), 14, currentY);
        } else {
            const newTotal = orig - totalRefund;
            doc.text("Neuer Rechnungsbetrag nach Retoure (unverbindlich): CHF " + newTotal.toFixed(2), 14, currentY);
        }
        
        if (festRetour) {
            currentY += 8;
            doc.setFont("helvetica", "bold");
            doc.setTextColor(3, 105, 161);
            doc.text("Info: Festmobiliar & Mietmaterial komplett retourniert.", 14, currentY);
        }
        
        currentY += 10;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(100, 100, 100);
        doc.text("Diese Abrechnung dient der Übersicht. Alle Beträge und Gutschriften sind unverbindlich.", 14, currentY);
        doc.text("Massgeblich ist die finale Abrechnung und Prüfung durch die LANDI Filiale.", 14, currentY + 4);
    } else {
        doc.text("Es wurden keine Artikel retourniert (Total Gutschrift: CHF 0.00).", 14, 45);
    }
    
    doc.save("retour-beleg-" + refFormatted + ".pdf");
}

async function saveReturn() {
  if (!currentReturnOrder || !supabaseClient) return;
  
  const btn = document.getElementById("btnSaveReturn");
  const origText = btn.innerText;
  btn.innerText = "Speichere...";
  btn.disabled = true;
  
  const returns = [];
  let totalRefund = 0;
  
  (currentReturnOrder.items || []).forEach((item, index) => {
      const retQtyInput = document.getElementById(`retQty_${index}`);
      if (retQtyInput) {
          let qty = parseInt(retQtyInput.value) || 0;
          if (qty > 0) {
              let calcPrice = item.price_per_unit;
              if (calcPrice === undefined) {
                  calcPrice = parseFloat(item.unit_price);
                  if (item.display_qty && (item.display_qty.includes("Pck") || item.display_qty.includes("Harass"))) {
                      let caseSize = 1;
                      const aMatch = item.display_qty.match(/à\s*(\d+)/);
                      if (aMatch) caseSize = parseInt(aMatch[1]);
                      if (caseSize > 1) calcPrice = parseFloat(item.unit_price) / caseSize;
                  }
              }
              const refundValue = qty * calcPrice;
              returns.push({ art: item.art, name: item.name, returned_qty: qty, refund_value: refundValue });
              totalRefund += refundValue;
          }
      }
  });
  
  const hQty = parseInt(document.getElementById("returnDepotHarassen")?.value) || 0;
  if (hQty > 0) {
      returns.push({ art: "—", name: "Leergut Harassen (Depot)", returned_qty: hQty, refund_value: hQty * 5 });
      totalRefund += hQty * 5;
  }
  
  const f30Qty = parseInt(document.getElementById("returnDepotFlaschen30")?.value) || 0;
  if (f30Qty > 0) {
      returns.push({ art: "—", name: "Leergut Flaschen 0.30 (Depot)", returned_qty: f30Qty, refund_value: f30Qty * 0.30 });
      totalRefund += f30Qty * 0.30;
  }
  
  const f50Qty = parseInt(document.getElementById("returnDepotFlaschen50")?.value) || 0;
  if (f50Qty > 0) {
      returns.push({ art: "—", name: "Leergut Flaschen 0.50 (Depot)", returned_qty: f50Qty, refund_value: f50Qty * 0.50 });
      totalRefund += f50Qty * 0.50;
  }
  
  try {
      const { error } = await supabaseClient.from('orders').update({
          returns: returns,
          refund_amount: totalRefund,
          status: 'abgeschlossen'
      }).eq('id', currentReturnOrder.id);
      
      if (error) throw error;
      
      // PDF generieren
      const isPaid = document.getElementById("returnAlreadyPaid") && document.getElementById("returnAlreadyPaid").checked;
      const festRetour = document.getElementById("returnFestmobiliar") && document.getElementById("returnFestmobiliar").checked;
      await generateReturnPdf(currentReturnOrder, returns, totalRefund, isPaid, festRetour);
      
      closeAdminReturnModal();
      loadOrders(); // reload
      
  } catch (err) {
      console.error("Fehler beim Speichern der Retoure:", err);
      alert("Fehler beim Speichern. Bitte Konsole prüfen.");
  } finally {
      btn.innerText = origText;
      btn.disabled = false;
  }
}

function deleteOrder(id) {
  if (!supabaseClient) return;
  
  const order = currentOrders.find(o => o.id === id);
  if (!order) return;
  
  const refFormatted = order.ref_nr || String(order.id).padStart(6, '0');
  
  showConfirmModal("Bestellung löschen", `Möchtest du die Referenz #${refFormatted} wirklich unwiderruflich aus der Datenbank löschen?`, "Löschen", async () => {
    try {
        if (window.currentViewOrder && window.currentViewOrder.id === id) closeAdminOrderViewModal();
        if (typeof currentReturnOrder !== 'undefined' && currentReturnOrder && currentReturnOrder.id === id) closeReturnModal();
        
        const { error } = await supabaseClient.from('orders').delete().eq('id', id);
        if (error) throw error;
        loadOrders();
    } catch (err) {
        console.error("Fehler beim Löschen:", err);
        alert("Fehler beim Löschen.");
    }
  });
}
/* END: pdf_extended */

function openPrivacyModal(e) {
  if (e) e.preventDefault();
  document.getElementById('privacyModalOverlay').classList.add('open');
}
function closePrivacyModal() {
  document.getElementById('privacyModalOverlay').classList.remove('open');
}
