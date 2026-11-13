# Release 137 – Stabilität und Performance

## Reproduzierter Fehler

Animux erhielt im südlichen Gebiet während des abendlichen Zeitfensters zwischen 50 und 80 Sekunden einen negativen Wegfortschritt. Dadurch wurde ein nicht vorhandener Wegpunkt gelesen, die Zeichenroutine warf einen Fehler, und der nächste Animationsframe wurde nicht mehr eingeplant. Der Zeitplan hat jetzt wie andere NPCs einen echten Besuchsabschnitt. Wegfortschritt wird zusätzlich auf den gültigen Bereich begrenzt. Ein einzelner künftiger Zeichenfehler beendet nicht mehr dauerhaft die Animationsschleife; Eingaben werden freigegeben und der Aufbau nach kurzer Pause erneut versucht.

## Beschleunigung

- Erreichbarkeit und NPC-Wege prüfen räumlich eingegrenzte Kollisionskandidaten. Ein Snapshot besteht ausschließlich während einer unveränderlichen Suche. Die originale Bewegungskollision bleibt der Besitzer ihrer Regeln.
- Gegenüberprüfung der neuen Kollisionsabfragen mit den Originalabfragen in allen sieben Biomen und im südlichen Gebiet, einschließlich Türen.
- Bodenpixel bleiben bei nachladender Dekoration und Sprachwechseln erhalten. Geländeänderungen und neu geladene Bodentexturen erzeugen eine neue Version.
- NPC-Daten werden innerhalb eines Frames wiederverwendet; gültige Innenraum-Standorte werden pro Raum gespeichert.
- Zelte werden pro Frame einmal in hoher Auflösung gezeichnet. Der zusätzliche vollständige erste Zeichendurchlauf entfällt.
- Gewichte für Objektkonturen werden einmalig vorbereitet, anstatt für jeden Randpixel dieselben Abstände neu auszurechnen.
- Online wird das rund 6 MB große Base64-Paket für lokale Canvas-Fallbacks nicht mehr blockierend geladen. Beim Spielen aus dem ZIP über `file:` bleibt es synchron verfügbar.
- Beim Annähern werden die tatsächlichen Raum-Requisiten und Vorlagen vorgeladen. Teleporter verwenden ein kleines priorisiert geladenes Sprite mit eigener Design-Version.

CPU-Messung des echten eingebetteten Motors im Node-VM-Adapter, mit instrumentierten Funktionen und Canvas-Platzhaltern; kein Browser-/Handy-FPS-Versprechen:

| Vorgang | Vorher | Nachher |
|---|---:|---:|
| Initialisierung der Startkarte | 2.458 ms | 395–537 ms |
| Zwei Sekunden morgendlicher NPC-Ablauf, gesamte CPU-Zeit | 1.172 ms | 151–220 ms |
| Wechsel auf die nächste Wildniskarte | 1.776 ms | 492–639 ms |

Die ursprünglichen Kollisionsergebnisse bleiben gleich. Rohmessungen stehen in `reports/performance-137.json`; Wiederholung mit `node tools/profile-world-runtime.cjs`.

## Gestaltung und Generator

Der Teleporter ist jetzt ein warmes Pixelstein-Kachel mit großem hellem Pfeil und dunkler Kontur, auch verkleinert erkennbar. Ein Kachel bleibt genau ein Auslösebereich; der bestehende Countdown und die Richtungen bleiben erhalten. Gebäude erhalten keine solchen Teleporter.

36 Requisiten wurden bytegleich nach `assets/generator/` in Innenräume, Arena, Gebäude, Stadtmöbel, Grenzen, Natur, Ruinen und Camping verschoben. Ihre IDs und Kontexte bleiben stabil. Alte Hosting-URLs bleiben für bereits geöffnete Spiel-Tabs als bytegleiche Kompatibilitätskopien erreichbar. Der Themenindex enthält 727 Datensätze einschließlich der bisherigen Atlas- und Raum-Bibliotheken. Siehe `docs/generator/README.md`.

Die SHA-256-Bestandsprüfung gegen Release 136 bestätigt: keine entfernten Ressourcen, 36 unverändert verschobene Sprites, nur der ausdrücklich überarbeitete Teleporter geändert und der neue Bibliotheksindex ergänzt. Originalvorlagen bleiben erhalten.

## Prüfung

Der große Durchlauf umfasst 275 Prüfungen. 274 bestanden unmittelbar; ein veralteter Test verlangte die frühere CSS-Cache-Query statt der richtigen geladenen CSS-Datei. Nach Anpassung bestand auch dieser gezielt erneut. Enthalten sind 50 Wildniskarten, 30 Hauptkarten mit allen Nebenwegen und Rückwegen, alte Spielstände, die letzten Kampf-/Energie-/Zucht-/Quest-/Lager-Änderungen und zwei vollständige NPC-Tage. Alle sechs Rollen bewegen sich auf erreichbaren Wegen; Händler und Innenräume bleiben erreichbar. Ein künstlich ausgelöster Zeichenfehler prüft die Erholung des Bildlaufs.

Es ist kein vorgesehenes Browser-/Desktop-Steuerwerkzeug verfügbar. Die Tests ersetzen keine Sichtprüfung und keine Performance-Messung auf einem echten Handy. Es wurden keine Browser-FPS oder echte Netz-Ladezeiten behauptet.
