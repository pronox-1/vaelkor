# Mobiles Deck-Menü und Kirchenweg

## Änderungen
Auf Smartphones bis 600 Pixel Breite verwenden Kartensammlung, hinzufügbare Deckkarten, Teamkarten und die Liste des aktuellen Decks zwei flexible Spalten. Die Sammlungs-Kartenhöhe sinkt von 322 auf 252 Pixel, Illustration und Abstände werden kompakter. Seltenheitsrahmen, Kartenkosten, Schaden/Effekte und die vorhandene Detailansicht bleiben erhalten. Das Kampf-Layout ist von diesen Regeln ausgenommen.

Der unnötige Pflasterweg westlich des Kirchenzugangs in Grünwald wird zu Gras. Die Korrektur betrifft ausschließlich Pfad-Tiles in den Spalten 0–4 und Zeilen 0–12. Der Weg vom tatsächlichen Kircheneingang nach Osten zum Nordweg bleibt erhalten. Gebäude-Sprites, Ausrichtung, Brunnen und andere Karten bleiben unverändert. Auch gespeicherte Stadt-Szenen erhalten diese kleine Korrektur ohne Neugenerierung; Quest- und Truhendaten bleiben erhalten. Die Weltdatei erhält eine neue Cachekennung.

## Dateien
index.html; css/style-55.css; js/world/town-landscape.inc.js; synchronisierte js/script-09.js; tests/deck-mobile.test.cjs; Importnormalisierung in tests/map-foundation.test.cjs.

## Prüfungen
36 gezielte Prüfungen bestanden: zweispaltiger CSS-Vertrag, kompakte Kartenslots, Abgrenzung zum Kampf, alte Stadt mit künstlich eingesetztem Wegrest laden, Erhalt von Gebäuden/Quests/Truhen, freie Zugänge und Hin-/Rückweg; außerdem bestehende Vollbild-, Battle-Fit-, UI-, Registry-, Animations- und Übergangstests. Vier zusätzliche gezielte Stadtprüfungen kontrollieren Fragment-Synchronisierung, Kirchenposition/Nordweg, tatsächliches Betreten/Verlassen der Kirche und Grundstückswechsel. Die Importprüfung wurde nach der Cachekennung erneut ausgeführt.

Reale Handy-Sichtprüfung und gemessene Browserlayouts bleiben offen; die CSS-Tests ersetzen keine Darstellung auf einem echten Gerät. Der Sites-Skill schreibt bei fehlendem vorgesehenem Browserwerkzeug vor: “If `cua_repl.js` is unavailable, skip browser QA.” Quelle: skill://plugin_connector_1p_689987207de08191979cf68eca2941c6/sites/SKILL.md. Der vollständige 50-Seed-/30-Hauptkarten-Test wurde für diese örtlich begrenzte Wegkorrektur nicht erneut ausgeführt.
