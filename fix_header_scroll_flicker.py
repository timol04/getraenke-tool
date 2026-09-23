import shutil

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_header_css = """  /* KOPFZEILE (Deep Forest Green Banner) */
  header.top {
    background: linear-gradient(135deg, #1F3A2E 0%, #15271F 100%);
    color: white;
    position: sticky;
    top: 0;
    z-index: 20;
    padding: 16px 24px 16px;
    box-shadow: 0 8px 24px rgba(21, 39, 31, 0.3);
    border-bottom: 1px solid rgba(201, 162, 39, 0.2);
    transition: padding 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  }
  header.top.scrolled {
    padding: 10px 24px 10px;
    box-shadow: 0 10px 30px rgba(15, 30, 24, 0.45);
  }

  .header-collapsible {
    max-height: 140px;
    opacity: 1;
    overflow: hidden;
    transition: max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, margin 0.35s ease;
    margin-top: 8px;
    margin-bottom: 12px;
  }
  header.top.scrolled .header-collapsible {
    max-height: 0;
    opacity: 0;
    margin-top: 0;
    margin-bottom: 6px;
  }"""

new_header_css = """  /* KOPFZEILE (Deep Forest Green Banner) - ULTRA SMOOTH & FLICKER-FREE */
  header.top {
    background: linear-gradient(135deg, #1F3A2E 0%, #15271F 100%);
    color: white;
    position: sticky;
    top: 0;
    z-index: 20;
    padding: 16px 24px 16px;
    box-shadow: 0 8px 24px rgba(21, 39, 31, 0.3);
    border-bottom: 1px solid rgba(201, 162, 39, 0.2);
    transition: padding 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease, background 0.35s ease;
    will-change: padding, box-shadow;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }
  header.top.scrolled {
    padding: 10px 24px 10px;
    box-shadow: 0 12px 32px rgba(15, 30, 24, 0.5);
  }

  .header-collapsible {
    max-height: 200px;
    opacity: 1;
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), 
                opacity 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), 
                margin 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
    margin-top: 8px;
    margin-bottom: 12px;
    will-change: max-height, opacity, margin;
  }
  header.top.scrolled .header-collapsible {
    max-height: 0;
    opacity: 0;
    margin-top: 0;
    margin-bottom: 0;
  }"""

if old_header_css in content:
    content = content.replace(old_header_css, new_header_css)
    print("Updated header CSS for flicker-free hardware acceleration!")

old_scroll_js = """let isHeaderScrolled = false;
window.addEventListener("scroll", () => {
  const header = document.querySelector("header.top");
  if (!header) return;
  const sy = window.scrollY;

  if (!isHeaderScrolled && sy > 80) {
    isHeaderScrolled = true;
    header.classList.add("scrolled");
  } else if (isHeaderScrolled && sy < 20) {
    isHeaderScrolled = false;
    header.classList.remove("scrolled");
  }
}, { passive: true });"""

new_scroll_js = """let isHeaderScrolled = false;
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
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });"""

if old_scroll_js in content:
    content = content.replace(old_scroll_js, new_scroll_js)
    print("Updated scroll JS with requestAnimationFrame & hysteresis!")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

shutil.copy('index.html', 'getraenke-bestelltool.html')
print("Successfully synced ultra-smooth header scroll changes in index.html & getraenke-bestelltool.html!")
