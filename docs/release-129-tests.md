# Prüfbericht – Release-Kandidat 129

Vollständiger Durchlauf der damaligen 34 Testdateien: 210 Testfälle, 207 bestanden, drei Befunde. Zwei Erwartungen stammten aus der Zeit vor der freigegebenen Arena bzw. vor späteren HTML-Erweiterungen. Die Arena-Erwartung wurde aktualisiert; unveränderte Legacy-Skripte werden nun gegen den tatsächlich zuvor freigegebenen Commit 5728644b947716d35f48484f1ef75aff932b86e3 geprüft. Der dritte Befund betraf das Weiterlaufen über den Kirchausgang hinaus; der schmale Türstreifen bis zum Ende des Ausgangs wurde korrigiert.

Nach den Korrekturen: 35/35 Tests in den betroffenen Bereichen bestanden (NPC-Vorlagen, Lauf-/Standfolge und Maße, freier Tresenbereich, tatsächliche Eingabewege von beiden Seiten, tatsächliche Zeichenreihenfolge, Kartenregister, Team-/Arena-Regeln, vorhandene Innenräume und alle 1299 freigegebenen Original-Assets). Die drei gezielt nachgetesteten Arena-/Grundstück-/Kirchen-Szenarien sind ebenfalls bestanden. Es gibt keine offenen Befunde aus dem vollständigen Durchlauf. Die langen Tests wurden nach den lokalen Innenraum-/Testkorrekturen nicht vollständig wiederholt.

Im vollständigen Durchlauf bestanden außerdem: 50 Wildniskarten mit unterschiedlichen Seeds, sieben Biome, erreichbare Türen/Truhen/Heilpunkte, deterministische Wiederkehr; 30 Hauptkarten samt Nebenketten und Hin-/Rückwegen; alte Spielstände; Karten-/Kampfregeln, Monsterwerte, Booster/Zucht, DE/EN, Spielerbewegung bei 60/30/15 FPS, Vollbild-/Handy-Layout-Verträge, Bildlader und Speicherkompatibilität.

Beide neuen NPC-Originale und die vorherigen Vorlagen bleiben bytegleich erhalten. Der Offline-Fallback enthält dieselben geprüften Bildbytes. Die Originalbilder sind JPEG-Dateien mit .png-Namen im Upload; gespeicherte Endungen und MIME-Typen entsprechen ihrem tatsächlichen Inhalt.

Statische Kontaktbögen der echten Quellausschnitte und Ansichten der tatsächlichen Raumpläne wurden geprüft. Ein interaktiver Browser-/Gerätetest ist nicht erfolgt: Im ausgewählten Managed-Environment wurde kein cua_repl.js-Steuerwerkzeug angeboten. Das subjektive Laufgefühl sowie das Vorladen bei echter Mobilfunk-Latenz müssen auf einem echten Handy geprüft werden.

Abschließende Offline-Absicherung: 19/19 weitere NPC-/Release-Prüfungen bestanden. Das Warentisch-Original wird auch im Offline-Fallback bytegleich eingebettet; ein simulierter SecurityError beim Lesen lokaler Bildpixel bricht den Laden nicht ab. Diese Nachprüfung ergänzt die 35/35 zuvor bestandenen betroffenen Tests und die 3/3 nachgetesteten Übergangsszenarien.
