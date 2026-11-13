# Weltoptik – Release 130

Wüstenpfade verwenden ausschließlich eine passende Sandpalette; der frühere Wald-Textur-Ersatz entfällt. Städte bekommen zusammenhängende Sandsteinfugen in Weltkoordinaten. Begegnungsgras in der Wüste erscheint als trockene, sandfarbene Halme statt großer Agaven. Gelände- und Begegnungsregeln bleiben gleich.

Ein gemeinsamer Grafikpfad bereinigt Greenscreen-Reste und Randfarbsaum, erhält gewöhnliche grüne Pflanzen und umschlossene grüne Details und zeichnet zurückhaltende Konturen. Welt-/Biome-Deko, Dorfgebäude, Wegmarkierungen und modulare Raumobjekte nutzen dieselbe Vorbereitung. Figuren und Kartenbilder werden nicht verändert. Kantenglättung erfolgt mit bis zu zwei Abtastungen je Zielpixel. Ergebnisse werden wiederverwendet: höchstens 96 Grafiken bzw. zwei Millionen vorbereitete Pixel, zwölf zusammengesetzte Zaungrafiken. Bei gesperrtem lokalen Pixelzugriff bleibt die Originalgrafik als sicherer Fallback verfügbar. Keine neuen Browser-Bibliotheken.

Zielwerte für genügend Natur: 26 Elemente in Städten, 44 in der Wildnis, 18 auf dem südlichen Grundstück. Zusätzlich werden freie Kartenabschnitte und – soweit geeignete Flächen vorhanden sind – größere Bäume berücksichtigt. Deko bekommt ebenfalls eine Grundmenge. Wege, hohes Gras, Ausgänge, Türen, Truhen, Heilpunkte und der gespeicherte Spielerstandort bleiben geschützt. Neue blockierende Elemente werden gegen die echte Erreichbarkeit geprüft; ungeeignete Platzierungen entfallen.

Städte erhalten Laternen neben dem Pflaster, mit Abstand zu Türen und zueinander; bestehende Lampen zählen mit. Die vorhandene Nachtbeleuchtung nutzt auch diese Lampen. Lose, automatisch gesetzte Zaunstücke werden durch bis zu drei zusammenhängende, vier bis sieben Felder lange Abschnitte neben Straßen ersetzt. Spielerplatzierte Teile bleiben erhalten.

Die Arena liegt bei gleichem Maßstab höher (Fußpunkt y=13). Der Weg führt vom nördlichen Hauptpfad direkt über eine Querstrecke zum Eingang. Nur der alte erzeugte Zugangsbereich wird bereinigt; Truhen, andere Gebäude und dauerhafte Daten werden erhalten. Liegt eine alte Spielerposition unter der verschobenen Arena, wird der freie Eingang verwendet.

Alle Änderungen werden einmalig über qualityVersion im vorhandenen Kartenzustand gespeichert. Alte Spielstände behalten IDs, Seeds und Beutezustände; Karten werden nicht neu generiert.

Validierung: 38/38 gezielte Tests bestanden, zusätzlich 7/7 abschließende Grafik-/Stil-/Originaldateiprüfungen. 40/41 Kompatibilitätstests bestanden im ersten Lauf; die verbleibende Erwartung begrenzte das Grundstück noch auf die frühere, sehr geringe Dekomengen-Zahl. Sie wurde auf die jetzt gewünschten, weiterhin begrenzten Mengen aktualisiert und die drei Grundstück-/Kirchenübergangsszenarien bestanden anschließend vollständig. Langlauf: 30 Hauptkarten samt allen Nebenketten, 50 Karten mit unterschiedlichen Seeds, alte gespeicherte Städte, stabile Rückwege und erreichbare Ausgänge bestanden. DE/EN, Spielerbewegung bei 60/30/15 FPS, Innenräume und alle 1299 geschützten Originalgrafiken sind geprüft.

Ein interaktiver Browser- oder Handy-Sichttest wurde nicht durchgeführt: Das angebotene Werkzeugset enthält kein cua_repl.js-Steuerwerkzeug. Die automatischen Prüfungen ersetzen keine Sichtprüfung auf einem echten Gerät.
