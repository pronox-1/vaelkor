# VAELKOR Wildlands – GitHub-Pages-Version

Diese Version wurde aus der ursprünglichen `index.html` ohne beabsichtigte Änderungen an der Spiellogik aufgeteilt.

## Veröffentlichung

1. **Alle Dateien und Ordner** aus diesem Verzeichnis in das Stammverzeichnis deines GitHub-Repositories hochladen.
2. Unter **Settings → Pages → Build and deployment** als Quelle **Deploy from a branch**, Branch `main`, Ordner `/ (root)` auswählen.
3. Die angezeigte GitHub-Pages-Adresse öffnen.

**Wichtig:** Nicht nur die `index.html` hochladen! Die Pfade zu `css/`, `js/` und `assets/images/` müssen erhalten bleiben. Groß-/Kleinschreibung beachten.

## Aufbau

- `index.html`: HTML und Verweise auf ausgelagerte Dateien
- `css/style-XX.css`: ursprüngliche Style-Blöcke in derselben Reihenfolge
- `js/script-XX.js`: ursprüngliche JavaScript-Blöcke in derselben Reihenfolge
- `assets/images/`: aus Data-URLs ausgelagerte Grafiken; identische Bilder werden nur einmal gespeichert

## Hinweise

- Vor dem Ersetzen der bestehenden Website ein Backup erstellen und das Spiel nach dem Upload testen.
- Lokale Tests am besten mit einem HTTP-Server durchführen, z. B. `python -m http.server 8000`, dann `http://localhost:8000` öffnen.
- Browser-Spielstände (localStorage) bleiben bei **gleicher Website-Adresse und gleichem Origin** normalerweise erhalten. Beim Wechsel der Domain werden sie nicht automatisch übernommen.
- Die automatische Aufteilung ist strukturell geprüft, aber ein vollständiger interaktiver Spieletest im Browser wurde nicht durchgeführt.
