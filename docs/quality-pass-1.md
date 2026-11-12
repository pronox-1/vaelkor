# VAELKOR – Qualitätspass 1

## Umfang und Freigabestatus
Dies ist der erste überschaubare Qualitätspatch des vorgeschlagenen Stufenplans: Handy-Menüs/Kampfansicht prüfen und punktuell korrigieren, Außenbewegung absichern, sämtliche Karten und Kreaturen auswerten. Es ist keine Behauptung, dass alle sechs späteren Qualitätsphasen oder echte Geräte-Sichtprüfungen abgeschlossen seien.

## Konkrete Korrekturen
1. Schadensvorschau: Sammlung und Deck zeigten bei Angriffen außerhalb des Kampfes „ca. 0 Schaden“. Die alte Vorschau setzte die LP der Referenzeinheit auf 0; die Schadensberechnung fand dadurch keinen lebenden Angreifer. Die Vorschau verwendet jetzt eine lebende Kopie des aktiven Monsters und ein neutrales Ziel. Ohne aktives Monster werden ausdrücklich Beispielwerte mit Angriff 5 angezeigt. Tatsächliche Kampfformeln werden nicht geändert.
2. LP-Treue: `Number(m.hp)||maximum` behandelte 0 LP als fehlenden Wert und füllte eine neue Kampfeinheit auf. 0 LP, teilweise verbrauchte LP und gültige numerische Altspeicherwerte bleiben jetzt erhalten. Die Ausgangskreatur wird dabei nicht verändert. Die bestehenden Regeln für Kampfstart und Brunnenheilung bleiben erhalten.
3. Kartenziehen: Die Beschreibung behauptete höchstens 9 gleichzeitig gehaltene Karten; die tatsächliche Regel erlaubt vorübergehend 10. Beschreibung und Effektanzeige unterscheiden jetzt diese Obergrenze vom Handlimit am Zugende. Die Spielregel selbst bleibt unverändert.
4. Kampfbedienung: Ein erneutes Rendern mit geöffneter Team-/Protokollansicht setzt deren Scrollposition nicht mehr ausdrücklich auf 0. Nach Bildladeereignissen wird die verfügbare Höhe erneut geprüft; temporäre Messklassen werden auch nach Messfehlern entfernt.
5. Menü-Lesbarkeit: Vergleichswerte erhalten einen klaren Hinweis auf das Referenzmonster. Tastaturfokus, reduzierte Menüanimationen und ausreichende Mindesthöhe der Menü-Reiter und Detailbuttons sind ergänzt. Das zweispaltige Handy-Deck und die bestehenden Kartenrahmen bleiben erhalten.

## Außenbewegung
Der echte eingebettete Spielcode wurde mit nominalen Frame-Schritten von 16, 33 und 66 ms in allen vier Bewegungsrichtungen ausgeführt. Beide Schrittposen werden erreicht; nach Loslassen bleibt die Figur ohne weitere Ortsbewegung auf einer neutralen Pose stehen. Das ist ein deterministischer Laufzeittest, keine Messung realer Handy-FPS oder optische Bewertung eines gerenderten Videos.

Die zwölf kleinen Außenfiguren bleiben ausschließlich ihren ursprünglichen Laufbildern zugeordnet. Die akzeptierte Innenraumsequenz wird weiterhin in 768 Zuständen gegen die Referenz verglichen. Es wurden keine Charakterbilder, Kreaturenbilder, Bewegungsreihenfolgen oder Weltsprites ersetzt.

## Vollständige Balanceübersicht
`node tools/balance-audit.cjs` lädt den echten Kartenengine, die Kreaturen-/Spawnregeln, die späteren Kartenpatches, Synchroregeln und die relevanten Kampf-/Trankwrapper in einer isolierten Laufzeit. Sie arbeitet ohne Nutzerspielstand und schreibt keine Spielspeicherstände.

Erfasst sind:
- 239 Kreaturen mit eindeutigem Namen und eigener Bildzuordnung, Shinybild, Rolle und Lebensräumen.
- LP, Angriff und Rollen-Schadensfaktor auf Level 5, 20 und 50, einschließlich Shinywerten.
- 368 reguläre Kampfkarten und 90 Synchrokarten: Energie, tatsächlicher Effekt, Schaden, Heilung, Schild, Nachwirkung, Regeneration sowie Materialvoraussetzungen.
- 239 dynamische Monster-Grundangriff-Varianten; jeweils genau eine Variante pro Kreatur.
- Normale und legendäre Spawnverteilungen aller sieben Biome. Alle Pools sind normalisiert, jede Kreatur ist einem gültigen Pool zugeordnet.
- 102 technische Kreaturenkarten des alten Kartenengines, getrennt vom aktiven Weltkreaturenkatalog und den regulären Ziehkarten. Diese sind keine zusätzlichen defekten Weltkreaturen und werden nicht ohne Kompatibilitätsprüfung entfernt.

Für den Kartenvergleich werden Elementvorteil, Wetter und Levelunterschied nur in der isolierten Auswertung neutralisiert. Vergleichsangriff ist 10. Beispiele: Feuerfunke 1 E / 12 Schaden, Feuerschlag 2 E / 26 Schaden, seltener Feuersturm 3 E / 45 Schaden. Die tatsächlichen Spielkosten und Kräfte wurden nicht pauschal neu gesetzt.

Es gibt in diesem Vergleich keine teureren reinen Angriffskarten mit gleichem Element und gleicher Seltenheit, die höchstens den Schaden einer billigeren Alternative erreichen. Diese enge Dominanzprüfung ist kein Beweis für vollständige Balance. Kontrollfähigkeiten, Energieaufbau, langfristige Buffs, Synergie-Materialverlust, Teamzusammenstellung und Gegnerverhalten benötigen zusätzliche kontextabhängige Spieltests.

27 Gruppen besitzen gleiche Element-/Effekt-/Kosten-/Seltenheits-/Stärkewerte. Diese Redundanz ist dokumentiert. Der nächste spielerische Patch sollte ihnen unterschiedliche sinnvolle Rollen geben, ohne erworbene Karten zu löschen oder ohne Vergleichsdaten die gesamte Sammlung umzubauen. Eine statistische Gewinnraten-/Wirtschaftssimulation ist in diesem ersten Patch noch nicht enthalten.

## Dateien und Artefakte
- `js/interface/quality-pass.js`, `css/style-56.css`, `index.html`: gezielte Korrekturen und Darstellung der Referenzwerte.
- `js/interface/battle-fit.js`: Scrollverhalten und Nachmessung nach Bildladen.
- `tools/quality-runtime.cjs`, `tools/balance-audit.cjs`: reproduzierbare Laufzeit und Auswertung.
- `reports/balance-audit.json`, `reports/cards.csv`, `reports/creatures.csv`: vollständige maschinenlesbare Übersicht; die Karten-CSV enthält 697 reguläre, Synchro- und Teamvarianten zusammen.
- `reports/quality.html`: durchsuchbare Übersicht mit Filtern, Fundorten, Vergleichswerten, Befunden und Downloads.
- `tests/quality-pass.test.cjs`, `tests/quality-report.test.cjs`, `tests/outdoor-playtest.test.cjs`: tatsächliche Vorschau-/LP-Fälle, Katalogprüfung, Dashboardbedienung und Außenbewegung.
- `tests/battle-fit.test.cjs`, `tests/map-foundation.test.cjs`, `tests/helpers/embedded-world.cjs`: neue Integrationsdateien, Scrollregression und variable Frame-Schritte berücksichtigen.

## Prüfprotokoll
Die gezielte Testsuite umfasst 45 Prüfungen: Vorschaufehler reproduziert und korrigiert; tatsächliche Kampfwerte erhalten; 0/teilweise/volle LP einschließlich alter Zahlenstrings; alle Katalogeinträge und Bilddateien; Energiekosten und angewandte Effekte sämtlicher regulärer Kampfkarten; Synchro-Materialkosten; normierte Spawnpools; filterbare Übersicht mit Pagination und Maskierung; Bewegung in vier Richtungen; bestehende Vollbild-, Kampfgrößen-, mobile Deck-, Kartenrand-, Import- und Referenzanimationstests.

CSV-Dateien werden zusätzlich mit einem unabhängigen CSV-Parser eingelesen. Referenzierte Spieldateien und Assets werden vor Veröffentlichung mit dem vorhandenen Site-Build geprüft. Die langen 50-Seed-/30-Hauptkartenprüfungen werden für diesen Patch nicht wiederholt, weil Weltgenerator, Randübergänge und Speicherung unverändert sind.

## Echte Geräteprüfung – offen
Kein verfügbares `cua_repl.js` wurde gefunden. Der Sites-Skill verlangt: “If `cua_repl.js` is unavailable, skip browser QA: do not start a preview server, install a browser, or improvise another browser-control path.” Quelle: skill://plugin_connector_1p_689987207de08191979cf68eca2941c6/sites/SKILL.md.

Deshalb bleiben Sichtprüfung aller Menüs auf Smartphone/Tablet/Desktop, reale Touchzielgrößen nach der Vollbildskalierung, echte Geräte-FPS, lange Sitzungen und wahrgenommene Schrittqualität ausdrücklich offen. Die Simulationen sind keine visuelle Abnahme. Vor einer vollständigen Gerätefreigabe müssen Start/Pause/Einstellungen, Inventar, Monster/Team, Sammlung/Deck/Synchro, Händler, Dialoge und Speichern/Laden auf echten Geräten durchlaufen und Kampfbereiche in Hoch-/Querformat geöffnet/geschlossen werden.
