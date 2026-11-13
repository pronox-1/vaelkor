# Generator-Bibliothek

Produktionsgrafiken nach Inhalt, nicht nach Versionsnummer:

| Ordner | Inhalt |
|---|---|
| `assets/generator/indoor/household/` | Wohnen, Küche, Vorräte, intakte Zelte |
| `assets/generator/indoor/arena/` | Trainingsgeräte und Trophäen |
| `assets/generator/outdoor/buildings/` | Nur Gebäude-Außenansichten |
| `assets/generator/outdoor/town/borders/` | Mauern und Zäune |
| `assets/generator/outdoor/town/furniture/` | Markt-, Platz- und Straßendekoration |
| `assets/generator/outdoor/nature/` | Pflanzen, Büsche und Naturrequisiten |
| `assets/generator/outdoor/ruins/` | Ruinen, Schreine und Wegsteine |
| `assets/generator/outdoor/camping/` | Wagen und Lagerausstattung |

`js/world/generator-catalog.js` bleibt der Laufzeitkatalog: stabile IDs, Bildpfade, Ansicht, erlaubte Biome/Räume, Maße, Herkunft und Prüfsummen. Bestehende Spielstände speichern IDs; diese ändern sich durch die Ordnerstruktur nicht. Originalvorlagen und frühere Kirchen-/Zelt-/Arena-/Naturtempel-Bibliotheken bleiben unverändert erhalten. `assets/generator/library.json` indexiert auch diese Bestände thematisch, ohne ihre bewährten URLs umzubenennen.

Neue Objekte erhalten eine stabile ID und eine explizite Ansicht (`indoor` oder `outdoor`), erlaubte Kontexte sowie eine bewusst festgelegte Breite in Weltkacheln. Die Quelldatei mit Herkunft und Prüfsumme behalten. Für ein neues Gebäude immer Außenansicht, Raumtyp, Türpunkt und freien Weg zusammen definieren. Innenraum-Möbel dürfen nicht automatisch im Außenbereich platziert werden. Keine Dateisuche oder Pixel-Freistellung während des Laufens verwenden.

`tools/generator_layout.py` enthält die einheitliche Pfadzuordnung. `tools/build-generator-assets.py` exportiert die 36 ergänzten Requisiten direkt in diese Struktur. `tools/build-generator-library.cjs` aktualisiert den vollständigen Themenindex. `tests/performance-stability-137.test.cjs` prüft Pfade, IDs, Originalbytes und Kontexte.

Auf dem Hosting bleiben die bisherigen 36 Bild-URLs als bytegleiche Kompatibilitätskopien für bereits geöffnete Spiel-Tabs verfügbar. Die neue Generator-Quelle und das neue ZIP verwenden die Themenordner. Diese begrenzten URL-Aliase sind keine zweite Generator-Bibliothek.
