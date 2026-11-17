# Pferde-Pilot 176

Nur das braune Pferd erhält seitlich vier vollständige Trabposen. Außen/innen und Reiter/Folgetier nutzen dieselben Zuordnungen. Oben/unten, andere Tiere und menschliche Animationen bleiben erhalten.

## Gemeinsamer Ablauf

- `quadruped-walk.js:trotSample`: vier gleich lange Phasen, 4,8 tatsächlich zurückgelegte Kacheln pro Zyklus. Diagonale Beinpaare als Entwurfsvorgabe.
- `motion-system.js`: aktiviert diesen Ablauf für die seitliche Ansicht des braunen Pferdes, ohne zusätzliche Haltephasen oder Multiplikatoren. Gleicher zurückgelegter Weg ergibt bei 15/30/60/120 FPS dieselbe Pose. Anhalten setzt auf die separate bisherige Standpose zurück.
- `motion-skins.js`: ordnet jeder der vier semantischen Phasen ein vollständiges Bild zu. Kein Zerlegen oder unabhängiges Bewegen von Beinen.
- Ein gemeinsamer Bildmaßstab und feste Boden-/Sattelanker; keine laufende Größenanpassung. Die bisherige Profilzuordnung ist unter `previous176` erhalten.

Die Bildfolge wurde zweimal mit dem Bildwerkzeug bearbeitet; die erste Ausgabe zeigte zu ähnliche Gegenstellungen und wurde verworfen. Die zweite Ausgabe ist der Pilot. Der Quellpfad und die Packdaten stehen in `reports/horse-pilot-176.json`. Das Ausgangsbild bleibt im Quellrepository erhalten.

## Vergleich und Prüfung

`mount-preview.html` zeigt vorher/nachher in Spielgröße und 3×, mit Zeitlupe, Einzelbild, Richtungswechsel und Innen-/Außengröße. Dies ist dieselbe Atlaszuordnung und derselbe Pilot-Sampler wie im Spiel.

144 Kompositionen mit dem tatsächlichen nativen Canvas-Spielrenderer prüfen Reiter, beide Ansichten, alle Richtungen und Stand. Automatisierte Prüfungen decken Distanz/Framerate, Blockierung/Stillstand, diagonale Kontakt-Metadaten, Bildzuordnung und Vorschau-Bedienung ab.

Grenze: Kontakt-Metadaten sind keine Messung der gezeichneten Hufe. Native Canvas-Prüfung ersetzt keine Browser-/Telefonprüfung und bestätigt keine anatomisch natürliche Bewegung. Die Vier-Bilder-Entscheidung ist eine bewusste Vereinfachung für diesen Pilot. Eine Übertragung auf alle Tiere erfolgt erst nach visueller Beurteilung dieses Vergleichs.

## Fachliche Grundlage

- https://animationapprentice.blogspot.com/2024/06/quadruped-horse-walk-tutorial.html — Kontaktstellungen zuerst, wenige Schlüsselpositionen.
- https://animationapprentice.blogspot.com/2023/05/how-quadrupeds-trot.html — vereinfachte Schlüsselposen für Trab, anschließend Übergänge.
- https://docs.godotengine.org/en/stable/tutorials/2d/2d_sprite_animation.html — einfache Sprite-Bildfolgen als technische Grundlage; keine Motorumstellung erforderlich.
