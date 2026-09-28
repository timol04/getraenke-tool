import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract styles
style_pattern = re.compile(r'<style>(.*?)</style>', re.DOTALL)
m = style_pattern.search(content)
if m:
    with open('styles.css', 'w', encoding='utf-8') as f:
        f.write(m.group(1).strip() + '\n')
    content = content[:m.start()] + '<link rel="stylesheet" href="styles.css">' + content[m.end():]

# Extract big scripts
script_pattern = re.compile(r'<script>(.*?)</script>', re.DOTALL)
matches = list(script_pattern.finditer(content))

app_js_content = ""
new_content = ""
last_end = 0

for m in matches:
    script_text = m.group(1).strip()
    if len(script_text) > 1000: # Only big blocks
        app_js_content += script_text + "\n\n"
        new_content += content[last_end:m.start()]
    else:
        new_content += content[last_end:m.end()]
    last_end = m.end()

new_content += content[last_end:]

# Insert <script src="app.js"></script> before </body>
new_content = new_content.replace('</body>', '<script src="app.js"></script>\n</body>')

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app_js_content.strip() + '\n')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Split completed successfully.")
