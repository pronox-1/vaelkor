# Screenshot-Korrekturen: Kampf und Sonnenmarkt

## Kampf

Der Höhenfitter misst weiterhin die eingeklappte Ansicht, setzt die Hand zunächst auf 180 px und verteilt zusätzlich verfügbare Höhe auf die Karten. Erst wenn die Grundansicht zu hoch ist, verkleinert er sie wie bisher. Geöffnete Team-, Synchro- und Protokollbereiche sind bei der Messung ausgeblendet und dürfen anschließend im äußeren Container scrollen. Kein vertikales Scrollen im eingeklappten Zustand; horizontales Blättern in der Hand bleibt möglich. Normale und Synchro-Kampfkarten sind 134 statt 148 px breit. Materialsortierung im Synchro-Panel entfernt; vorhandene automatische Materialwahl bleibt bestehen.

Eigene skalierbare SVG-Wirkungssymbole neben dem Element: gekreuzte Schwerter, Schild, Heilkreuz, Blitz, Flamme, Karten, Energiediamant, Richtungswechsel, Verstärkung/Schwächung und Reinigung. Die Symbole besitzen zugängliche Namen und Titel. Element und Wirkung sind getrennt. Gold- und Cyan-Beleuchtung bleibt in reduzierter Stärke erhalten. Statuszeilen wie „Spielbar“ oder „Energie fehlt“ sind auf den Karten ausgeblendet; zugängliche Beschriftungen und Kartendetails behalten die Begründung.

## Sonnenmarkt

Nur Wüstenstädte werden einmalig um den abgerundeten Brunnenplatz, passende Pflanzen und Karawanendekoration erweitert. Die alte Pfadtextur enthielt wiederholte Motive aus einem Vorlagenausschnitt; der Wüstenstadtboden verwendet nun kontinuierliche, zurückhaltende Sandsteinfugen ohne Poster-Ausschnitt. Bestehende Karten werden migriert, nicht neu generiert. Ein Markierungsfeld im gespeicherten Zeltobjekt verhindert Duplikate.

Das größere beige Karawanenzelt verwendet vorhandene freigestellte Grafiken. Es ist über den bisherigen Türtimer und die vorhandene Haus-Innenraumverwaltung betretbar. Der Innenraum hat reduzierte Einrichtung und eine Truhe mit stabiler Karten-ID. Außen- und Innenanimation bleiben unverändert. Die Tür und der Rückkehrpunkt werden an das vorhandene Wegenetz angeschlossen. Vorhandene Quests, Schatzkennungen und Objekte bleiben erhalten.

## Prüfung

75 gezielte automatische Tests bestanden: Höhenbudget samt geöffneten Reitern, Vektorsymbole, Entfernung der Sortierung, Sonnenmarkt-Zugang und Zelteintritt, Neuladen und Migration alter Karten sowie bestehende AP-, Zucht-, Tutorial-, Karten-, Vollbild-, Bewegungs- und Kartenrandtests. Die Tests führen den tatsächlichen Spielcode mit DOM/Canvas-Ersatz aus. Eine Sicht- oder Bedienprüfung auf einem echten Telefon wurde nicht durchgeführt; Browsersteuerung ist in dieser Umgebung nicht verfügbar.

Geändert: index.html, css/style-59.css, js/interface/battle-fit.js, js/interface/card-design.js, js/script-16.js, js/world/town-landscape.inc.js und daraus synchronisiert js/script-09.js. Tests und Vorschau wurden entsprechend ergänzt.
