# Kampfansicht: vertikales Höhenbudget

## Änderung
Die Kampfansicht verwendet ein kompaktes Grundlayout mit einheitlichen 180-Pixel-Kartenslots, kleineren Abständen und 84-Pixel-Kreaturenportraits. Im Querformat und ab 700 Pixel Breite stehen die beiden aktiven Kreaturen nebeneinander. Die Spielmechanik und Portraitbilder bleiben erhalten.

Der Controller misst die tatsächlich verfügbare Overlayhöhe einschließlich dynamischer Browserhöhe und Safe-Area-Abständen. Falls das eingeklappte Layout höher ist, passt er dessen Darstellungsmaßstab an. Er misst erneut bei Vollbildwechsel, Drehung, Fenster-/Visual-Viewport-Größenänderung, geladenen Schriften und neuen Kampfzuständen. Die Korrektur läuft ereignisbasiert und ist auf höchstens drei Nachmessungen begrenzt; es gibt keine dauerhafte Animationsschleife.

Die Teamliste, das Kampfprotokoll und der Synchro-Inhalt werden für die Höhenberechnung vorübergehend ausgeblendet. Geöffnete Bereiche behalten dadurch denselben Grundmaßstab und dürfen die Ansicht nach unten erweitern. Der äußere Kampfcontainer bleibt scrollbar; zusätzliche gefangene Scrollbereiche der Teamliste und des Protokolls entfallen. Beim Schließen aller Bereiche wird zum Anfang zurückgekehrt. Die Beobachtung ruht während eigener DOM-/Klassenänderungen, um Rückkopplungen zu verhindern.

Bei sehr kleinen Querformatfenstern kann der nötige Maßstab klein werden. Vollständige Kartentexte bleiben über die vorhandene Detailansicht erreichbar. Eine reale Geräteprüfung von Lesbarkeit und Touchzielgrößen bleibt erforderlich.

## Dateien
- index.html: neue Styles und Controller.
- css/style-54.css: kompaktes Kampf-Layout und ausklappbare Bereiche.
- js/interface/battle-fit.js: Höhenbudget, responsives Gruppieren der beiden Kämpfer und ereignisgesteuerte Messung.
- tests/battle-fit.test.cjs: Budgetberechnung, Verhalten beim Aufklappen, Begrenzung eigener Beobachteränderungen und CSS-Verträge.
- tests/map-foundation.test.cjs: neue Integrationsdateien berücksichtigen.

## Ergebnis und Grenzen
34 gezielte automatisierte Prüfungen bestanden (Kampfhöhenbudget, Vollbild, UI, Registry/Importintegration, Außen-/Innenanimation und Übergangstemplates). Die neuen Controller-Tests verwenden simulierte DOM-Geometrie und Browser-APIs. Sie ersetzen keine tatsächliche Messung auf Smartphone, Tablet oder Desktop. Weltgenerator und Speicherung sind unverändert; deren lange Runtimeprüfungen wurden für diesen Layoutpatch nicht erneut ausgeführt.

Eine echte Browser-Sichtprüfung konnte hier nicht durchgeführt werden. Der Sites-Skill schreibt bei fehlendem Browserwerkzeug vor: “If `cua_repl.js` is unavailable, skip browser QA: do not start a preview server, install a browser, or improvise another browser-control path.” Quelle: skill://plugin_connector_1p_689987207de08191979cf68eca2941c6/sites/SKILL.md.

## Manuelle Abnahme am Gerät – offen
- Vollbild in Hoch-/Querformat: aktive Kämpfer, Handkarten, Energie, Zugende, Aufgeben und alle eingeklappten Schalter ohne vertikales Scrollen sichtbar.
- Teamliste und Protokoll einzeln/gemeinsam öffnen: Inhalt scrollbar und vollständig erreichbar; Schließen stellt die Grundansicht wieder her.
- Synchro öffnen/schließen, Karte spielen, Runde wechseln, Sieg/Fangansicht, Niederlage sowie Tutorial prüfen.
- Während des Kampfes drehen und Vollbild verlassen/wieder aktivieren: keine abgeschnittenen Bedienelemente.
