# Bewegungsstabilisierung 167

Spielerbilder, Innen-/Außentempo und Schrittlängen bleiben wie in166. NPCs verwenden weiterhin denselben distanzgebundenen Menschenzyklus Stand–linker Schritt–Stand–rechter Schritt.

Fehler: Zusätzliche Zeichnungen innerhalb des 16-ms-NPC-Positionscaches lieferten dieselben Koordinaten mit neuem Zeichenzeitstempel. Der Bewegungscontroller interpretierte dies als Stop und setzte die Phase zurück. NPCs und Reittiere behalten nun ihre Phase bei identischen Positionsproben, solange der Bewegungsverantwortliche moving=true meldet. Explizites Anhalten, Szenenwechsel und Teleport setzen weiterhin zurück. Die Blickrichtung bleibt bei doppelten Proben erhalten. Spieler verwendet unverändert die bisherige Behandlung.

Keine neuen Bilder, keine zusätzlichen Timer, unverändert begrenzter Track-Cache. Die teilweise identischen alten Innenraum-NPC-Quellposen werden damit nicht zu neuen Zeichnungen. Automatische Lauf-/Stresstests prüfen Abläufe, ersetzen aber keine visuelle Smartphone-Prüfung.
