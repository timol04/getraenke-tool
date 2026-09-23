import shutil

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

preset_and_summary_dark_css = """
  /* PRESET SECTION & SUMMARY BAR DARK MODE FIXES */
  body.dark-mode .preset-section,
  @media (prefers-color-scheme: dark) {
    body:not(.light-mode) .preset-section {
      background: var(--card) !important;
      border-color: var(--border) !important;
    }
  }
  body.dark-mode .preset-title,
  @media (prefers-color-scheme: dark) {
    body:not(.light-mode) .preset-title {
      color: var(--text) !important;
    }
  }
  body.dark-mode .preset-card,
  @media (prefers-color-scheme: dark) {
    body:not(.light-mode) .preset-card {
      background: var(--bg-subtle) !important;
      border-color: var(--border) !important;
    }
  }
  body.dark-mode .preset-card:hover,
  @media (prefers-color-scheme: dark) {
    body:not(.light-mode) .preset-card:hover {
      background: var(--card-hover) !important;
      border-color: var(--accent) !important;
    }
  }
  body.dark-mode .preset-card-icon,
  @media (prefers-color-scheme: dark) {
    body:not(.light-mode) .preset-card-icon {
      background: var(--bg-inset) !important;
    }
  }
  body.dark-mode .preset-card-body h3,
  @media (prefers-color-scheme: dark) {
    body:not(.light-mode) .preset-card-body h3 {
      color: var(--text) !important;
    }
  }
  body.dark-mode .reset-top-btn,
  @media (prefers-color-scheme: dark) {
    body:not(.light-mode) .reset-top-btn {
      background: #3B1B1B !important;
      color: #F87171 !important;
      border-color: #7F1D1D !important;
    }
  }

  body.dark-mode .summary-bar,
  @media (prefers-color-scheme: dark) {
    body:not(.light-mode) .summary-bar {
      background: rgba(18, 22, 20, 0.94) !important;
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
      border-top: 1px solid var(--border) !important;
      box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.55) !important;
    }
  }
  body.dark-mode .summary-bar button:disabled,
  @media (prefers-color-scheme: dark) {
    body:not(.light-mode) .summary-bar button:disabled {
      background: #242E28 !important;
      color: #64756D !important;
      border-color: #2F3B34 !important;
      opacity: 0.7 !important;
    }
  }
"""

if "PRESET SECTION & SUMMARY BAR DARK MODE FIXES" not in content:
    content = content.replace("</style>", preset_and_summary_dark_css + "\n</style>")
    print("Added Dark Mode overrides for preset section and summary bar!")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

shutil.copy('index.html', 'getraenke-bestelltool.html')
print("Successfully synced preset & summary bar Dark Mode CSS in index.html & getraenke-bestelltool.html!")
