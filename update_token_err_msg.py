import shutil

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_get_err = """    if (!getResp.ok) {
      if (getResp.status === 401 || getResp.status === 403) {
        throw new Error("Ungültiger GitHub Token oder ungenügende Rechte. (Repo scope benötigt)");
      }
      throw new Error(`Fehler beim Abrufen von GitHub (Status ${getResp.status}).`);
    }"""

new_get_err = """    if (!getResp.ok) {
      if (getResp.status === 401 || getResp.status === 403) {
        throw new Error("Dein GitHub Token ist abgelaufen oder hat keine Schreibrechte. Bitte klicke im Admin-Banner auf '⚙️ Token erneuern' und füge deinen neuen GitHub Token (ghp_...) ein.");
      }
      throw new Error(`Fehler beim Abrufen von GitHub (Status ${getResp.status}).`);
    }"""

if old_get_err in content:
    content = content.replace(old_get_err, new_get_err)

old_put_err = """    if (!putResp.ok) {
      const errJson = await putResp.json().catch(() => ({}));
      throw new Error(errJson.message || `Fehler beim Speichern auf GitHub (Status ${putResp.status}).`);
    }"""

new_put_err = """    if (!putResp.ok) {
      const errJson = await putResp.json().catch(() => ({}));
      if (putResp.status === 403 || (errJson.message && errJson.message.includes("Resource not accessible"))) {
        throw new Error("Der aktuelle GitHub-Token hat keine Schreibrechte ('repo'-Scope fehlt). Bitte klicke im Admin-Banner auf '⚙️ Token erneuern' und füge einen neuen Token ein.");
      }
      throw new Error(errJson.message || `Fehler beim Speichern auf GitHub (Status ${putResp.status}).`);
    }"""

if old_put_err in content:
    content = content.replace(old_put_err, new_put_err)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

shutil.copy('index.html', 'getraenke-bestelltool.html')
print("Successfully updated error handling in savePricesToGithub!")
