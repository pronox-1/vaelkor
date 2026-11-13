# Release 134 — Monsterzucht und NPC-Aufträge

## Zuchtstation und Figuren

Die drei mitgelieferten PNG-Originale bleiben unter assets/breeding-134 unverändert erhalten. Außenansicht, Innenhof und 32 separat freigestellte Joe-Posen verwenden diese Originale. Richtungen wurden nach Bildinhalt statt nach den teilweise falschen Spaltenüberschriften ausgewählt; Rechtsansichten werden aus den passenden Linksansichten gespiegelt. Figurenausschnitte verwenden die größte zusammenhängende Figur, damit keine Nachbarfiguren oder Tabellenrahmen mitlaufen. Innen- und Außenmaßstab entsprechen dem Spieler; die Schrittfolge ist Stand–links–Stand–rechts.

Die Zucht liegt oben rechts im südlichen Gebiet gegenüber der Arena. Eingang und Rückweg nutzen das bestehende Gebäudesystem. Hillbilly Joe bewegt sich im Innenhof und besucht morgens/abends die Arena. Der bisherige Zauberer heißt Animux, behält seine stabile Rollen-ID und besucht abends das südliche Gebiet. Bei Nähe streiten sich die beiden. Der Koch spricht in seinen Unterhaltungen über Monstergerichte.

## Zucht und Gegenstände

Das bestehende Zuchtmenü öffnet sich beim Gespräch mit Joe und wird aus der normalen Navigation entfernt. Der Job bleibt im bestehenden breedingJob gespeichert. Eine Zucht dauert exakt 1.080.000 ms sichtbare Spielzeit: zwölf Minuten Tag plus sechs Minuten Nacht. Kartenwechsel schließen die Zucht nicht mehr vorzeitig ab. Laufende alte Jobs behalten Eltern und Nachwuchs und erhalten beim Migrieren einen vollständigen Tageszyklus. Abschluss während eines Kampfes verschiebt die Teamrückgabe bis nach dem Kampf. Mindestens ein lebendes Monster muss verfügbar bleiben.

Beeren heilen über das Inventar bis zu 10 LP. Büsche wachsen nach einem Spieltag wieder nach; gesammelte Steine bleiben entfernt. Moonshine erhöht maximale LP um 5 Prozent (auf ganze LP gerundet), ist nicht stapelbar und endet nach einem Tageszyklus. Ablauf begrenzt aktuelle LP sicher und entfernt keine anderen Kampfboni. Gene werden dadurch nicht verändert. Ein Zuchtgutschein halbiert genau die nächsten Zuchtkosten und wird nur bei erfolgreichem Start verbraucht.

## NPC-Aufträge

Blaues Ausrufezeichen: neuer Auftrag. Goldenes Ausrufezeichen: Ziel erfüllt, Abgabe/Belohnung noch offen.

- Joe: Moonshine auf einer benannten Wildniskarte suchen und persönlich zurückbringen. Einmalige Wahl: 250 Münzen, ein 50-Prozent-Zuchtgutschein oder ein Moonshine-Trank.
- Koch: wiederholbare Lieferung von drei elementspezifischen Monstern; zuerst zwei Erde und ein Wasser. Ausschließlich Lager-Monster werden verwendet, die günstigsten passenden zuerst. Die drei Namen stehen vor der endgültigen Abgabe im Dialog. Belohnung ist aufgerundet 140 Prozent ihrer tatsächlichen Verkaufspreise.
- Heiltrank-Händlerin: zehn Beeren für 100 Münzen, wiederholbar.
- Materialhändler: zehn Steine für 120 Münzen, wiederholbar.
- Animux: zehn freie normale Kampfkarten gleicher Seltenheit gegen eine zufällige Karte der nächsten Stufe. Gewöhnlich → ungewöhnlich → selten → episch → legendär. Ausgerüstete Karten, Teamangriffe und Synchrokarten werden nicht verbraucht.

NPC-Fortschritt, Gegenstände und Erntezeitpunkte liegen in data.npc134 im vorhandenen einheitlichen Spielstand. Objekt- und Karten-IDs bleiben stabil. Abgaben und Belohnungen prüfen den Zustand erneut und können nicht doppelt ausgezahlt werden. Kartenlisten und Questanzeigen werden begrenzt berechnet; keine Hintergrundsimulation entfernter Karten oder neuen Laufzeitbibliotheken.

## Prüfung

Gezielte Tests prüfen originale Asset-Prüfsummen, beide Joe-Maßstäbe, Eintritt/Begehbarkeit/Austritt des Innenhofs, tatsächliche Begegnungen von Joe und Animux, persistentes Moonshine-Fundobjekt, Ressourcen, alle Abgaben und Belohnungen, Rabattverbrauch, genaue Zuchtfrist, Kampfaufschub und LP-Bonusablauf. Bestehende NPC-, Sprach-, Händler-, Karten-, Arena- und Rückwegtests wurden ergänzend ausgeführt. Browser-/Handy-Sichtprüfung bleibt offen, da kein unterstütztes Browser-Steuerungswerkzeug verfügbar ist.
