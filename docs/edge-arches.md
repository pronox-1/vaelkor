# Kartenränder: ausgerichtete Holzbögen

Die oberen und unteren Kartenübergänge bekommen den vorhandenen hölzernen Torbogen mit Laterne. Seine sichtbare Öffnung wird auf den jeweiligen Auslösepunkt zentriert. Der Rahmen bleibt innerhalb der Karte und blockiert die Figur nicht. Gewöhnliche Kartenwechsel verwenden weiterhin keine magischen Portale; andere vorhandene Bögen und Portale sind für spätere Generator-Varianten vorgesehen, wie vom Nutzer gewünscht.

Obere Punkte liegen jetzt bei y=1,5 statt y=2,5; untere bei y=36,75 statt y=36,5 auf der bestehenden 38-Tile-Karte. Die x-Position folgt dem jeweiligen Weg. In späteren Städten erhält der obere Übergang genügend seitlichen Abstand für den vollständigen Rahmen. Die 1,5-Sekunden-Wartezeit, Abbruch beim Weggehen, sichere Ankunft und die bidirektionalen Kartenverbindungen bleiben bestehen. Der Wegweiser „Zur Wildnis“ steht zusätzlich am Ausgang von Grünwald.

Gespeicherte Karten migrieren ihre Übergangsdekoration auf Version 2. Landschaft, Gebäude, Seeds, Truhen, Quests und Verbindungs-IDs werden nicht neu erzeugt. Die aktuelle Karte erhält nur aktualisierte Randpunkte, nötige kurze Pfadanschlüsse und neue Übergangsmarkierungen. Seitliche Übergänge behalten ihre gespeicherte Lage.

Geänderte Dateien: js/world/embedded-wildlands.inc.js; synchronisierte js/script-09.js; tests/edge-frames.test.cjs; ergänzte Randmarkierungsprüfungen in tests/large-update.test.cjs; aktualisierte Versions-/Öffnungsprüfung in tests/wildlands-runtime.test.cjs. Enthalten sind außerdem die mobilen Zwei-Spalten-Karten und die Kirchenweg-Korrektur aus mobile-deck-church.md.

## Verifikation
Neue Tests prüfen die Öffnungsmitte, sichtbare Randlage, freie Durchgänge, Hin-/Rückwege und einmalige Migration alter gespeicherter Karten. Der 50-Seed-Test kontrolliert zusätzlich auf jeder oberen/unteren Verbindung den vorhandenen Rahmen und die genaue Randkoordinate. Bestehende Tests prüfen die realen 1,5-Sekunden-Wechsel, Speicherstände, Städte, Grundstück und Wächter.

Eine echte Browser-Sichtprüfung bleibt offen. Der Sites-Skill schreibt bei fehlendem vorgesehenem Browserwerkzeug vor: “If `cua_repl.js` is unavailable, skip browser QA.” Quelle: skill://plugin_connector_1p_689987207de08191979cf68eca2941c6/sites/SKILL.md. Die Bilder werden deshalb nicht als am Handy visuell abgenommen bezeichnet.

65 unterschiedliche gezielte Prüfungen bestanden: 38 Basis-/UI-/Animations-/Randrahmen-Prüfungen, 9 Stadt-/Grundstück-/Generatorprüfungen einschließlich 50 Seeds und 18 Wildlands-Runtimeprüfungen. Diese Ergebnisse stammen aus mehreren gezielten Läufen. Der längere separate 30-Hauptkarten-Test mit erzwungenen beidseitigen Nebenwegen wurde dieses Mal ausgelassen; die übrigen vorhandenen Runtimefälle wurden geprüft.
