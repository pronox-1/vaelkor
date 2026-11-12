# Einheitliche Karten und vorbereitete Kampfportraits

## Neues Kartendesign
Kampfkarten, Monster-Grundangriffe und Synchrokarten verwenden denselben Aufbau: Element mit Symbol und ausgeschriebenem Namen oben links, Energie oben rechts, Kartenname, ruhiger Motiv-/Materialbereich, Wirkung mit Zahl, Zusatzeffekt und Kartentyp im Fußbereich.

Die Elementfarbe liegt als schmale Leiste und im Kopfbereich im Inneren. Die Seltenheit bleibt unabhängig davon am Rahmen: grau/silber für gewöhnlich/ungewöhnlich, blau für selten, violett für episch und gold für legendär. Karten verwenden keine neue aufwendige Illustration. Teamkarten zeigen eine unveränderte Miniatur der zugehörigen Kreatur und deren Namen. Synchrokarten zeigen Materialanzahlen sowie die benötigten Elemente. Alternativen wie Erde **oder** Stein werden von zusätzlich benötigtem Feuer klar getrennt; gleiche Elemente mit mehreren benötigten Karten erhalten ihre Stückzahl.

Die sechs Inhaltsbereiche liegen bei allen Vollkarten gleich. Sammlung/Deck verwenden 292 Pixel Höhe am Desktop und 246 Pixel am Handy. Das bestehende mobile Zwei-Spalten-Raster bleibt erhalten. Handkarten bleiben bei den vorhandenen kompakten Maßen und der bestehenden Höhenanpassung. Gesperrte Karten bleiben lesbar und nennen einen Grund; die Detailansicht zeigt die vollständige Wirkung und aktuelle Voraussetzungen. Spielbare Karten erhalten eine helle innere Kontur; bereite Synchros ein dezentes zusätzliches Leuchten. Die normale Deckliste und ausgerüstete Synchroplätze bleiben kompakte Zusammenfassungen, um unnötiges Scrollen zu vermeiden.

## Gegnerportraits
Die bisherige Kampfansicht setzte img-Elemente ein, ohne das erfolgreiche Laden und Dekodieren der Bilder abzuwarten. Ein eigener Loader lädt die tatsächlich verwendeten Original-/Shiny-URLs vor. Aktive Gegner und eigene aktive Kreatur erhalten hohe Priorität; die übrigen Teammitglieder werden im Hintergrund vorbereitet.

Kampfregeln und Kampfstart bleiben synchron; nur die Darstellung wartet auf die aktiven Portraits. Bis dahin steht eine stabile, kurze Ladeansicht. Mehrere Anfragen derselben Datei teilen sich einen Vorgang. Der Cache hält höchstens 32 Einträge und wartet pro Bild höchstens 4,5 Sekunden. Bei Netzwerk-/Dekodierfehlern blockiert der Kampf nicht dauerhaft: Eine beschriftete Element-Ersatzfläche erscheint, mit einem Knopf zum erneuten Laden. Eine verspätete Antwort aus einem bereits verlassenen Kampf kann keinen alten Kampf neu öffnen.

Die Ladeansicht zählt für die vorhandene Navigation als Kampfansicht, damit währenddessen nicht versehentlich die Welt-Menüleiste eingeblendet wird. Die Originaldateien, deren Zuschnitt, Shinyfarben und Welt-/Innenraumfiguren werden nicht verändert.

## Dateien
- index.html, css/style-57.css: neue Module und gemeinsames Layout.
- js/interface/card-design.js: einheitliche Vollkarten, kompakte Synchroplätze, Live-Wirkungen und gesperrte Gründe; vorhandene Spielaktionen bleiben bestehen.
- js/interface/portrait-loader.js: Cache, Vorladen/Dekodierung, kurze Ladeansicht, Ersatzfläche und Wiederholung.
- js/interface/update-ui.js: neue Karten nicht nachträglich mit alten Metadaten überschreiben; Detailansicht an die neue Wirkungsanzeige anbinden.
- tools/build-card-preview.cjs, reports/card-preview.html: reproduzierbare statische Vorschauseite aus dem vorhandenen Katalog.
- tests/card-design.test.cjs, tests/portrait-loader.test.cjs sowie Importprüfung in tests/map-foundation.test.cjs.

## Tests
58 unterschiedliche gezielte Prüfungen bestanden; die dreizehn neuen Karten-/Loaderprüfungen wurden nach der abschließenden Initialisierungsanpassung erneut erfolgreich ausgeführt.

Enthalten sind: alle 458 regulären/Synchro-Katalogkarten rendern; gleiche Inhaltsbereiche; Materialalternativen und Stückzahlen; Seltenheiten und Elementsymbole; sichere Maskierung von Namen; echte Live-Werte auch bei kampfunfähiger aktiver Kreatur in der Vorschau; unveränderte Kartenregeln; erhaltene Handaktionen/disabled-Zustände; kompakte Synchro-Entfernaktion; Gründe in der Detailansicht; gemeinsames Laden, Cachegrenze, Dekodierwartezeit, Fehler, Timeout und erneutes Laden; kein verspätetes Wiederöffnen eines alten Kampfes; Vergleich des synchronen echten Kampfstarts einschließlich Startenergie, LP, Deck und Hand mit und ohne Bildloader.

Zusätzlich liefen die bisherigen UI-/Vollbild-/Kampfhöhen-/mobile-Deck-/Balance-/Registry-/Außenbewegungs-/Animations-/Kartenrandtests. Vor Veröffentlichung werden Dateiverweise und Assets mit dem bestehenden Site-Build geprüft. Der Weltgenerator und Spielstandsformate wurden nicht geändert; die langen Weltketten-Tests wurden deshalb nicht erneut ausgeführt.

## Prüfgrenzen
Die Tests führen den echten Code mit simuliertem DOM, Bildladeereignissen und Decoder-Promises aus. Sie bestätigen keine echten Netzwerk-Latenzen, Pixelmaße oder wahrgenommene Lesbarkeit auf einem Handy. Die Vorschauseite ermöglicht eine separate manuelle Betrachtung.

Echte Browser-Sichtprüfung und Kaltstart bei langsamer Mobilverbindung bleiben offen: Das vorgesehene Browserwerkzeug ist hier nicht verfügbar. Der Sites-Skill verlangt: “If `cua_repl.js` is unavailable, skip browser QA: do not start a preview server, install a browser, or improvise another browser-control path.” Quelle: skill://plugin_connector_1p_689987207de08191979cf68eca2941c6/sites/SKILL.md.
