# VAELKOR – Optimierungsprotokoll und Freigabe

Dieses Protokoll wird bei künftigen Änderungen fortgeführt. „Automatisiert bestanden“, „im Browser geprüft“ und „offen“ sind unterschiedliche Zustände. Eine Veröffentlichung allein ersetzt keine Sichtprüfung.

## Patch: Vollbild und Menü-Reiter

### Ursachen und Korrektur
- Zwei responsive CSS-Regeln zeichneten gleichzeitig ein Vollbildsymbol über ::before und ::after. Es gibt jetzt genau ein Symbol.
- Der bisherige Handler unterstützte nur die Standard-API. Der neue Controller verwendet Standard-/WebKit-API, synchronisiert Browser-Escape und Zustand und sperrt Mehrfachtipps während einer Anfrage. Er fängt den bestehenden Button ab, damit nicht zwei Handler gleichzeitig umschalten.
- Nicht unterstütztes oder verweigertes Vollbild erhält eine ausdrücklich als „Erweiterte Ansicht“ gekennzeichnete Ersatzansicht. Diese blendet Browserleisten nicht aus. Erneuter Knopfdruck oder Escape beendet sie.
- Menü-Reiter und dynamisch ergänzte Buttons waren nicht vollständig vom Theme erfasst. Gemeinsame dunkle Grund-, Auswahl-, Fokus- und deaktivierte Zustände sowie dunkle Optionslisten ergänzen die bisherigen Stile. Kartenrahmen und weltinterne Steuerung behalten ihre speziellen Regeln.

Geänderte Spieldateien: index.html, css/style-53.css, js/interface/fullscreen.js. Zusätzlich: tests/fullscreen.test.cjs und die Importnormalisierung in tests/map-foundation.test.cjs. Keine Änderungen an Spielständen, Weltgenerator, Kämpfen, Kreaturenbildern oder Charakteranimationen.

## Wiederkehrende Prüfmatrix

| Schritt | Umfang | Abnahme | Status dieses Patches |
| --- | --- | --- | --- |
| Vollbild | Ein/Aus, Escape, Standard, WebKit, verweigerter Zugriff, fehlende API, schnelle Mehrfachtipps | Keine Doppelanfragen; Knopf folgt Zustand; Ersatzansicht schließbar | Automatisiert bestanden; echte Geräte offen |
| Theme | Start, Pause, Einstellungen, Inventar, Monster, Team, Sammlung, Deck, Synergie, Händler, Tutorials, Dialoge, Speicher/Laden | Keine weißen Standardflächen; aktive Reiter und Tastaturfokus erkennbar | CSS-/Bootstrap-Prüfungen bestanden; Sichtprüfung jedes Menüs offen |
| Layout | 320/375 px Handy, Querformat, 768 px Tablet, 1024/1440 px Desktop; drehen und Vollbildwechsel | Keine Überlagerungen, abgeschnittenen Buttons oder ungewollten horizontalen Scrollflächen | CSS-Verträge geprüft; gemessene Browserlayouts offen |
| Bedienung | Touch, Tastatur, Scrollen, Zurück, Schließen | Keine hängenbleibende Bewegung; jedes Fenster zuverlässig verlassbar | Vollbild-Interaktion automatisiert bestanden; manuelle Geräteprüfung offen |
| Spielabläufe | Kampf, Inventar, Gebäude, Haupt- und Nebenwege, Grundstück | Bestehende Abläufe, Innen-/Außenfiguren und Karten bleiben erhalten | Animationen geprüft; Weltcode in diesem Patch unverändert, früherer Runtime-Nachweis übernommen |
| Speicherung | Alter Spielstand; Speichern/Laden vor und nach Übergängen; Sicherungsexport | Team, Inventar, Quests, Truhen und Karten bleiben erhalten | Speicherformat-/Registry-Prüfungen bestanden; keine Speichercodeänderung |
| Performance | Wiederholte Menüwechsel, mindestens 15 Minuten auf Handy, Kartenwechsel | Keine zunehmenden Ruckler oder wachsenden aktiven Objektlisten | Reale FPS/Langzeittest offen; keine neuen Renderloops oder Bibliotheken |
| Freigabe | Relevante Tests, Import-/Assetprüfung, Änderungen und Grenzen dokumentieren | Keine bekannten fehlgeschlagenen Prüfungen; offene Punkte benannt | Automatisierte Prüfung bestanden; Veröffentlichung mit offener Geräte-Sichtprüfung |

## Ausführung
Vom Projektverzeichnis: `node --test tests/fullscreen.test.cjs tests/ui-update.test.cjs tests/map-foundation.test.cjs tests/outdoor-animation.test.cjs tests/transition-templates.test.cjs`.
Dieser Patch: 31 Prüfungen bestanden, keine fehlgeschlagen. Geprüft sind reale Controller-Aufrufe mit simulierten Browser-APIs und DOM sowie CSS-Verträge, keine echte Browserdarstellung.

Bei Änderungen an Welt oder Speicherung zusätzlich: `node --test tests/*.test.cjs`. Der vorherige Stand bestand 54 Prüfungen, einschließlich 50 verschiedener Seeds und 30 Hauptkarten mit sämtlichen Nebenwegen. Diese langen Weltprüfungen wurden im jetzigen UI-Patch nicht erneut ausgeführt.

Vor einer vollständigen Gerätefreigabe: dieselbe gespeicherte Spielsitzung in den genannten Größen durch alle Menü-Reiter führen, Vollbild mehrfach wechseln, Gerät drehen, Kampf betreten/verlassen und Speicherung nach Neuladen vergleichen. Auffälligkeiten mit Menü, Gerät/Browser, Schritten und erwartetem/tatsächlichem Ergebnis dokumentieren.

## Offene Verifikation
Das vorgesehene Browserwerkzeug steht hier nicht zur Verfügung. Der Sites-Skill verlangt: “If `cua_repl.js` is unavailable, skip browser QA: do not start a preview server, install a browser, or improvise another browser-control path.” Quelle: skill://plugin_connector_1p_689987207de08191979cf68eca2941c6/sites/SKILL.md. Deshalb werden keine echten Smartphone-, Tablet- oder Desktop-Sichtprüfungen behauptet. Weiß erscheinende native System-Auswahldialoge müssen insbesondere auf iOS am Gerät nachgeprüft werden.

## Ergänzung: Kampfansicht im Vollbild
Kompaktes Höhenbudget und scrollbare ausgeklappte Bereiche implementiert. 34 gezielte Prüfungen bestanden. Reale Hoch-/Querformat-Sichtprüfung einschließlich Sieg/Fangansicht und Tutorial bleibt offen; Einzelheiten in battle-viewport.md.

## Ergänzung: mobiles Deck und Kirchenweg
Zwei flexible Kartenspalten und kompaktere Karten bis 600 px; überflüssiger Kirchenweg auch in alten Stadt-Szenen bereinigt. 40 unterschiedliche gezielte Prüfungen bestanden. Reale Handy-Sichtprüfung bleibt offen. Bericht: mobile-deck-church.md.

## Ergänzung: Holzbögen an oberen/unteren Kartenrändern
Ausgerichtete Rahmen und randnähere Auslösepunkte mit einmaliger Migration gespeicherter Szenen. 65 gezielte Prüfungen bestanden, einschließlich erneutem 50-Seed-Test mit Rahmenkontrolle. Andere Bogen-/Portaldesigns bleiben für spätere Generator-Varianten vorgesehen. Sichtprüfung offen. Bericht: edge-arches.md.

## Qualitätspass 1
Fehlerhafte Schadensvorschau, LP-Konvertierung, Kartenziehtexte und Scrollverhalten korrigiert; Referenzbilder erhalten. Vollständiger Karten-/Kreaturenaudit einschließlich Biompools und durchsuchbarer Übersicht ergänzt. 45 gezielte Prüfungen; echte Geräte-Sichtprüfung und Gewinnratensimulation offen. Bericht: quality-pass-1.md.

## Gemeinsames Kartendesign und Portrait-Vorladen
Einheitliche Element-/Energie-/Wirkungsplätze für Kampf-, Team- und Synchrokarten; kompakte Deckzusammenfassungen erhalten. Kampfportraits werden vor der Anzeige vorgeladen und dekodiert, mit beschriftetem Ersatz und Wiederholung im Fehlerfall. 58 gezielte Prüfungen bestanden; Sichtprüfung und echter langsamer Netzwerk-Kaltstart offen. Bericht: card-overhaul.md.
