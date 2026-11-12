# Großes Update: Menüs, Karten, Grünwald und Wildnis

## Umsetzung
Die bestehende geteilte Spielarchitektur und der eingebettete Weltmodus bleiben erhalten. Neue CSS-Regeln lösen festgehaltene Menütitel und vereinheitlichen Dialoge, Buttons und Scrollcontainer. Kampf-, Team- und Synchrokarten verwenden feste Maße pro Ansicht; lange Texte sind über eine Detailansicht lesbar. Seltenheitsrahmen bleiben grau, blau, violett und gold. Pause/Einstellungen bieten Speichern und vollständigen JSON-Export sowie bestätigten Import des bestehenden Speicherformats.

Grünwald verwendet seine ursprünglichen Gebäude: Kirche oben links, Brunnen unverändert. Der freie Nordweg trägt den Holzwegweiser „Zur Wildnis“. Oben rechts liegt ein größeres hohes Grasfeld mit bestehenden Level-5-Begegnungen. Die alte Spiegelung des Westhauses wurde entfernt und dessen Türpunkt korrigiert. Alte Positionen im versetzten Kirchenbau werden sicher verlegt.

Nach Norden geht es zu „Wildnis 1“, nach Süden zu „Mein Grundstück“. Das Grundstück ist eine separate, gespeicherte Grasfläche mit wenigen Randobjekten und Rückweg. ID: `property:gruenwald`. Gebäude-, Dekorations-, Wege- und Pflanzenlisten sowie reservierter Eingang und Baugrenzen sind vorbereitet. Ein Bausystem ist ausdrücklich noch nicht implementiert.

Neue Wildniskarten bekommen deterministische Lichtungen, Felsgruppen, Waldgruppen, Ruinen, Lager und seltene Entdeckungsorte mit vorhandenen Assets. Gelegentliche Häuser verwenden die vorhandenen Innenraum- und Truhensysteme. Gespeicherte Naturkarten werden nicht neu ausgewürfelt. Türzugänge, Ausgänge, Truhen und Heilpunkte werden mit der tatsächlichen Kollision geprüft. Nur die aktuelle Szene bleibt aktiv.

## Speicherung und Kompatibilität
Die vorhandene Kartenregistry und der einheitliche Spielstand `vaelkor-save-v2` speichern alles. Team, Inventar, Quests, NPC-Daten und bestehende Truhenflags werden nicht ersetzt. Grundstück und Szenen speichern dauerhaft. Bestehende IDs bleiben unverändert: `main:2` heißt in der Anzeige „Wildnis 1“; die interne alte Zonennummer bleibt für Kampf, Fortschritt und Städte erhalten. Neue Heilrastplätze liegen bei angezeigter Wildnis 6,16,26 usw. Bereits gespeicherte zusätzliche alte Heilpunkte bleiben erhalten.

## Wiederverwendete Assets und Systeme
Unveränderte Kirchen-, Haus-, Brunnen- und Charakterbilder; vorhandene Biom-Atlanten, Schilder, Felsen, Zelte, Feuer, Ruinen und Truhen. Natürliche Übergänge nutzen das bereits integrierte Weg-/Holzbogen-System. Keine neuen Charakter- oder Gebäudezeichnungen. Außen bleiben ausschließlich die kleinen Originalfiguren mit Stand–Schritt–Stand–Schritt; Innenraumfiguren bleiben unverändert.

## Geänderte Dateien dieses Updates
- `index.html`: neue UI-Dateien und Cacheversionen.
- `css/style-52.css`, `js/interface/update-ui.js`: Menüs, feste Karten, Details, Pause und Sicherungen.
- `js/world/map-registry.js`, `js/world/wildlands.js`: Grundstück-ID, Daten und Anzeigenummern.
- `js/world/town-landscape.inc.js`: Grünwald, Grundstück, Landschaftsdetails, Türzugänge und Rastpunkte.
- `js/world/embedded-wildlands.inc.js`, `js/script-09.js`: Integration in den bestehenden Weltmodus.
- `tools/sync-world-bridge.py`: Synchronisierung beider gepflegter Weltfragmente.
- `tests/large-update.test.cjs`, `tests/ui-update.test.cjs`, `tests/helpers/embedded-world.cjs`: neue gezielte Tests und gemeinsam genutzter Runtime-Testaufbau.
- `tests/map-foundation.test.cjs`, `tests/wildlands-runtime.test.cjs`: neue Integrationsdateien berücksichtigen und kompakte Geometrie-Hashvergleiche.

## Testgrenzen
Die Runtime-Tests führen den echten eingebetteten Spielcode mit simuliertem DOM/Canvas aus. UI-Tests prüfen CSS-Verträge, lange Texte, Seltenheiten, Bootstrap und Speicherformat; sie messen keine echten Browserlayouts. Smartphone-, Tablet- und Desktop-Sichtprüfung sowie reale Mobil-FPS bleiben offen. Das vorgesehene Browserwerkzeug ist hier nicht verfügbar. Der Sites-Skill schreibt vor: “If `cua_repl.js` is unavailable, skip browser QA: do not start a preview server, install a browser, or improvise another browser-control path.” Quelle: skill://plugin_connector_1p_689987207de08191979cf68eca2941c6/sites/SKILL.md.

Sinnvoller nächster Schritt: optische Prüfung der veröffentlichten Version auf echten Geräten und danach die Grundstück-Bedienung ergänzen.

## Prüfumfang
- Grünwald: Originalkirche, Brunnenposition, Nordkorridor, Wegweiser, hohes Gras und Level-5-Begegnungsregel.
- Grundstück: Hin-/Rückweg, leere Fläche, stabile ID, gespeicherte Bau-Daten und identische Szene nach Laden.
- Kirche: tatsächliche Eingangssequenz und Rückkehr mit dem bestehenden Innenraumsystem.
- Migration: alte Position unter der verlegten Kirche wird frei platziert; Questdaten bleiben erhalten.
- Heilrastplätze: Wildnis 6,16,26,36,46,56,66 und vollständige Heilung einschließlich kampfunfähiger Teammonster.
- 50 unterschiedliche Karten-Seeds über alle sieben Biome: erreichbare Ausgänge, Häuser, Truhen, Rastpunkte, freie Spawns, begrenzte aktive Objektzahl (<1500), deterministische Wiederbesuche und Neuladen.
- Feste Kartenmaße und Texte für Mobil-/Desktop-CSS-Verträge, Seltenheiten und UI-Initialisierung; keine echten Browser-Pixelmessungen.
- Alle zwölf Außenfiguren verwenden weiterhin ausschließlich kleine Originalframes; Innenraumsequenzen werden gegen die akzeptierte Referenz geprüft.

- Zusätzlich bestanden: tatsächliche 1,5-Sekunden-Wechsel Grundstück ↔ Grünwald ohne Rücksprung sowie exakte Synchronisierung des gepflegten Stadtfragments mit dem eingebetteten Spielcode.

## Endergebnis der automatisierten Prüfungen
54 Prüfungen bestanden, 0 fehlgeschlagen: 26 Basis-/UI-/Animations-/Templateprüfungen, 9 Stadt-/Grundstück-/Generatorprüfungen und 19 bestehende Wildlands-Runtimeprüfungen. Die lange Runtimeprüfung umfasst 30 Hauptkarten mit erzwungenen linken und rechten Nebenwegen von 1–3 Karten, sämtliche Hin- und Rückwege und identische Geometrie. Der separate Generatortest umfasst 50 unterschiedliche Seeds in allen sieben Biomen. Diese Zahlen stammen aus mehreren gezielten Testläufen mit demselben abschließenden Spielcode. Reale Geräte-FPS und Browser-Sichtprüfung sind nicht enthalten.
