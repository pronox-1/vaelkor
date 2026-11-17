# Verbindliche Vorlage für Reittiere

Der Nutzer hat den seitlichen Vier-Posen-Trab des braunen Pferdes aus Release176 bestätigt und die Übertragung auf alle Reittiere sowie die Verwendung als künftige Vorlage beauftragt. Das bestätigte Bild und Profil sind in `approved-mount-reference-176.json` mit SHA256 festgehalten. Spieler-/NPC-Schritte behalten ihre bisherige Vorlage.

Alle Arten nutzen denselben distanzgebundenen Ablauf aus `quadruped-walk.js:trotTemplate` / `trotSample`. Kein artspezifischer Takt und keine unabhängigen Bein-Uhren. Seitlich vier vollständige Körperbilder, rechts als Ganzes gespiegelt. Ein eigener Standrahmen erscheint beim Anhalten. Die zuvor bestätigten acht vertikalen Posen bleiben getrennt bestehen.

## Neues Tier hinzufügen

1. Art, vertikale Ansichten und Innen-/Außengröße regulär registrieren. Den gemeinsamen Ablauf nicht kopieren oder eine artspezifische Uhr hinzufügen.
2. Eine transparente 2×2-Vorlage mit den vier Posen aus `mount-trot-template.json` erstellen. Reihenfolge: Kontakt eines diagonalen Beinpaares, Übergang, gegenüberliegender Kontakt, gegenüberliegender Übergang. Die beiden Reihen müssen verschiedene Gegenstellungen zeigen. Kopf, Körper und Sattel bleiben ruhig; entfernte Beine sind klar von nahen Beinen zu unterscheiden.
3. Vorlage prüfen, insbesondere keine abgeschnittenen Hufe, Größenwechsel oder zusätzlichen Beine. Ganze Posen verwenden, keine nachträglich geschätzten Beinsegmente.
4. `node tools/build-mount-trot.cjs ART QUELLBILD.png RELEASE` packt die vier Posen und übernimmt den Standrahmen, feste Anker und die bisherige Größe. Die Quelle separat unter `originals/` aufbewahren. Bereits bestätigte Vier-Posen-Grafik wird vom Werkzeug nicht überschrieben.
5. `node tools/build-motion-skins-164.cjs` aktualisiert die Werkstatt. `node tools/validate-mount-trot.cjs ART` prüft vier verschiedene Posen, freie Bildränder und feste Anker.
6. Mit und ohne Reiter, beide seitlichen Richtungen und beide Ansichten in Spielgröße prüfen. `mount-preview.html` bietet Auswahl, Zeitlupe und Einzelbilder. Die Renderer-Prüfung ergänzt diese Sichtprüfung, ersetzt sie aber nicht.

Die Vorlage beschreibt einen bewusst vereinfachten Spiel-Trab. Auch Kamel und Bulle verwenden dieses gemeinsame stilisierte Muster. Die Weltgeschwindigkeit, Kaufregeln und Tiergrößen werden dadurch nicht verändert. Neue Arten brauchen eigene stimmige Bilder; ein Mannequin ersetzt diese künstlerische Arbeit nicht.
