# Finales modulares Kampfkartendesign

## Übernommene Assets und Aufbereitung

Die 15 Elementbilder und vier Rahmen wurden unverändert aus Karten_Assets_Codex.zip übernommen. Die 14 mitgelieferten Symbolzuschnitte bleiben als Referenz erhalten. Einige Zuschnitte schneiden Spitzen oder Leuchteffekte an; die tatsächliche Anzeige extrahiert deshalb die vollständigen Symbole über feste SVG-Ansichtsfenster aus dem Originalbogen (1536 × 768). Sämtliche Zuordnungen und Bildgrenzen sind zentral in js/interface/card-assets.js dokumentiert. assets/cards/provenance.json enthält SHA-256-Prüfsummen der übernommenen Bitmapdateien.

Die Dateien sind überwiegend voll deckend. Statt neue Grafiken zu generieren, erzeugt die Darstellung Transparenz durch Maskierung: Rahmen erhalten ein freies Bildfenster und eine freie Elementfassung; ein gemeinsamer SVG-Alpha-Filter entfernt den dunklen Außenbereich. Die Rahmen werden direkt als SVG-Bildebene mit PNG-Quelle und SVG-Ausschnitt eingebunden, ohne kombinierte CSS-Maskierung. Die Symbole erhalten eine gemeinsame Alpha-Filterung und explizite Ausschnittbegrenzungen. Die Originalpixel bleiben erhalten. Eine deckende Pergamentunterlage verhindert, dass Text über dunklen oder wechselnden Elementbildern schlecht lesbar wird.

## Ebenen und Maße

Alle Karten verwenden dieselbe 340:520-Fläche: Elementbild im großen Bildfenster, universelles Effektsymbol darüber, Ornamentrahmen, vorhandenes rundes Elementsymbol oben links sowie Name, Energie, Wirkung und Text in festen Positionen. Hintergrund, Symbole und Rahmen werden getrennt wiederverwendet. Teamkarten zeigen dieselben zentralen Wirkungssymbole wie normale Kampfkarten; Synchrokarten zeigen ihre Materialanforderungen im Bildfeld. Es werden keine vollständigen Kombinationsbilder erzeugt.

Karten skalieren proportional. In der Kampfhand bleibt die schmale Breite von 126 px; freier vertikaler Platz wird um die Karten verteilt, statt die Rahmen zu strecken. Sammlung und Deck behalten die mobilen zwei Spalten. Namen und Beschreibung haben begrenzte Textflächen und Mindestschriftgrößen. Die bestehende Detailansicht enthält vollständige Werte und Gründe, weshalb eine Karte nicht spielbar ist. Sichtbare Statuszeilen bleiben entfernt; Gold/Cyan-Spielbarkeitsleuchten bleibt dezent.

## Zuordnungen

Feuer→feuer, Wasser→wasser, Natur→natur, Blitz→blitz, Erde→erde, Stein→stein, Eis→eis, Luft→luft, Gift→gift, Stahl→stahl, Licht→licht, Dunkel→dunkel, Geist→geist, Drache→drache, Psycho→psycho. Die vorhandenen VK_ATLAS_ICONS liefern alle 15 runden Eckensymbole; keine neuen Elementsymbole wurden erzeugt. Neutrale Karten verwenden das nachgereichte silbergraue Hintergrundbild. Sein eigener äußerer Metallrahmen wurde mit dem Bildbearbeitungswerkzeug entfernt; das hochauflösende Ergebnis wird im gemeinsamen Bildfeld skaliert.

Gewöhnlich→gewoehnlich, Selten→selten, Episch→episch, Legendär→legendaer. Die Vorlagen unterscheiden sich durch Ornamente, nicht neue Seltenheitsfarben. Das Spiel besitzt außerdem „Ungewöhnlich“: diese Seltenheit behält ihre Werte und Wahrscheinlichkeiten und nutzt optisch den gewöhnlichen Rahmen. Es wurde keine Spielseltenheit gelöscht oder umgewandelt.

Angriff mit Nachwirkung→schaden_und_dot. Angriff mit Betäubung→angriff + betaeubung. Durchdringender Angriff→angriff + schutzbruch. Lebensentzug→schaden + heilung. Regeneration→heilung_ueber_zeit. Weitere vorhandene Wirkungen, für die das Paket kein korrektes Symbol enthält, etwa Kartenziehen, Energie oder Ausweichen, behalten ihre bestehenden benannten Vektorsymbole. Keine falsche Zuordnung zu Fesselung oder Schaden. Synchros verwenden passende Kombinationen mit maximal zwei Symbolen; alle Wirkungen stehen weiterhin im Text.

## Geänderte Dateien

Neu: assets/cards/**, js/interface/card-assets.js, css/style-60.css, tools/build-modular-preview.cjs, tools/render-card-assets-preview.py und tests/modular-cards.test.cjs. Angepasst: index.html, js/interface/card-design.js und battle-fit.js sowie Qualitätstest-Laufzeit und gezielte Darstellungsprüfungen. Die vorhandenen Kampffunktionen, AP-Berechnung, Kosten, Effekte, Wahrscheinlichkeiten und Speicherstände werden nicht verändert.

## Prüfung und offene Punkte

84 gezielte automatische Tests bestanden. Zusätzlich wurden nach der letzten Ausschnittkorrektur die betroffenen Rendering-, Zuordnungs- und Integrationsprüfungen erneut ausgeführt. Abgedeckt: alle 15 Hintergründe, vier Rahmen, 14 Symbolfenster, 60 Element-/Rahmenkombinationen, vorhandene Eckensymbole, lange Texte, Mehrfacheffekte, Escaping, unveränderte Kartendaten und Zustände sowie die bisherigen AP-, Zucht-, Tutorial-, Menü-, Welt- und Speicherprüfungen.

Visuell geprüft: gelieferte Vorlagen, Originalsymbolbogen und eine aus denselben Quellen und Ebenen gerenderte SVG/PNG-Kontaktvorschau. Dabei wurden Ausschnittgrenzen, ein falsches Quellseitenverhältnis, benachbarte Bildreste und Pergamentkontrast korrigiert. Diese statische Grafikprüfung ist keine Browserprüfung. Tatsächliches CSS-Rendering, Hover-/Fokusbedienung, Framerate und Sichtprüfung auf PC und Smartphone wurden nicht manuell getestet, weil Browsersteuerung hier nicht verfügbar ist. Automatische Struktur-/Laufzeitprüfungen und die Vorschauseite ersetzen diese Prüfung nicht vollständig. Die Maskierung benötigt einen aktuellen Browser mit CSS-Masken und SVG-Filtern.

Vorschau: karten-design.html enthält alle 60 Element-/Rahmenkombinationen, alle 14 Wirkungssymbole sowie lange Namen und Kombinationskarten. Die dortigen Werte sind ausdrücklich statische Beispiele. Im Spiel stammen Werte weiterhin aus dem vorhandenen Kampfsystem.

## Rahmenkorrektur
Die CSS-Mehrfachmaskierung der Rahmen wurde durch direkte SVG-image-Referenzen mit expliziten 340×520-Abmessungen ersetzt. Teamkarten zeigen keine Monsterporträts mehr, sondern dieselben zentralen Effektsymbole wie andere Kampfkarten. Neue Regressionstests prüfen Bildpfade aller vier Rahmen und die einheitliche Teamkarten-Darstellung. Browser-/Handy-Sichtprüfung weiterhin offen.

## Ausrichtung, Deckkraft und Neutral
Elementsymbole leicht nach oben/rechts versetzt und ihre Fassung kreisrund auf dem 340:520-Koordinatensystem definiert. Die SVG-Rahmenebene ist ohne Transformation, Rand oder Padding an derselben Kartenfläche ausgerichtet. Effektsymbole haben einen eigenen verstärkten Alpha-Filter; der Rahmen behält seine ursprüngliche Transparenz. Dunkle Hintergrundpixel bleiben ausgeblendet, Schildflächen werden deckend dargestellt. Zusätzliche äußere Pseudoelement-Rahmen sind entfernt. Spielbarkeit und Tastaturfokus werden direkt an der Ornament-Silhouette hervorgehoben. Die Vorschau enthält zusätzlich vier neutrale Karten.

## Lesbarkeit, kompakte Hand und Deckdarstellung
Alle 458 echten Kampf-/Synchrokarten haben eine kurze vollständige Wirkungsbeschreibung ohne Auslassungspunkte (maximal 54 Zeichen im geprüften Katalog); ausführliche Regeln und AP-Formeln bleiben in Kartendetails erhalten. Die Unterzeile für Kartentyp/Seltenheit ist größer und kontrastreich im Bildfeld platziert. Der verbleibende Platz auf dem Pergament ist für die Beschreibung reserviert.

Zusatzabstand um Handkarten ist auf insgesamt 12 px begrenzt, horizontaler Abstand beträgt 8 px. Handbereich und Aktionsfläche verwenden denselben transparenten Untergrund. Das Elementbild spart die kleine Symbolfassung durch eine skalierende radiale Maske aus. Ausgerüstete normale Karten und Synchros im Deckmenü verwenden dieselbe view()-Funktion wie die Kampfhand; Mengen und Entfernen-Aktionen bleiben außerhalb der Illustration erhalten. Geerbte kompakte Zeilentypografie wird überschrieben.

Neue Tests prüfen alle echten Kurzbeschreibungen und vollständigen Detailtexte, Aktions-/Mengenbeibehaltung im Deck, begrenzten Abstand, Kontrastflächen und die Aussparung. Echte Browser-/Handy-Sichtprüfung bleibt offen.

## Eigene Synchro-Vorlagen und maximal drei Opfer

Der nachgereichte Synchro-Hintergrund wurde ohne eigenen Metallrand aufbereitet. Die beiden gelieferten Ornamentrahmen wurden als transparenter Zweispalten-Atlas vorbereitet; Hintergrund und Rahmen werden gemeinsam für alle Synchros wiederverwendet. Der linke Rahmen hat zwei Materialfassungen, der rechte drei. Auswahl über die Summe der requirements.count-Werte, nicht über die Zahl unterschiedlicher Elemente. Zweimal Eis plus einmal Luft zeigt somit drei Fassungen. Die vorhandenen runden Elementsymbole füllen diese Fassungen; Alternativen wie Erde/Stein bleiben im Materialtext und in zugänglichen Beschriftungen erhalten. Rahmen verwenden direkte SVG-Bildreferenzen mit getrennter Begrenzung der beiden Atlas-Hälften.

Auf anschließenden ausdrücklichen Nutzerwunsch wurden die zehn Synchros mit vier oder fünf Opferkarten aus dem aktiven Katalog entfernt. Aktuell 80 Synchros: 60 mit zwei und 20 mit drei Opfern. Keine dieser zehn Karten kann neu registriert, aus Boostern gezogen oder von Trainern ausgewählt werden. Der bisherige Katalog bleibt die einzige Kartenverwaltung.

js/combat/synchro-limit.js begrenzt den vorhandenen Katalog vor dessen Registrierung. Alte Besitze werden einmalig und exemplarweise in zulässige möglichst passende Synchros umgewandelt; Elementnähe, Seltenheit und Effekte steuern die Wahl. Ausgerüstete Plätze, gespeicherte Sets und ausstehende Tutorialreferenzen werden angepasst. Die Migration funktioniert vor der ersten Anzeige und vergibt bei erneutem Laden keine weiteren Kopien. Es werden keine Gegenstände oder Währungen hinzugefügt.

Alle entfernten Synchros waren legendär. Der aktuelle Synchro-Katalog reicht deshalb bis episch. Wenn eine Boosterziehung eine nicht mehr vorhandene Seltenheit trifft, fällt ausschließlich der Synchro-Platz auf die nächstverfügbare Stufe zurück. Jeder Booster enthält weiter vier normale Kampfkarten plus eine Synchro; die Garantien der normalen Kampfkarten bleiben erhalten. Keine verbleibende Karte wurde dafür in ihren Kampfwerten oder ihrer Seltenheit verändert.

100 gezielte automatisierte Tests bestanden, darunter Zuordnung aller 80 Synchros, Mehrfachopfer desselben Elements, Altspielstand-Migration und Idempotenz, vollständige Booster aller Stufen sowie bestehende Kampf-, AP-, Zucht-, Tutorial-, Deck-, Welt- und Speicherprüfungen. Statische SVG-Ebenenvorschau der beiden Rahmen visuell geprüft; echte Browser-/Handy-Sichtprüfung weiterhin offen.

## Symbolzentrierung, Kontur und Energie-Feedback

Alle 16 Symbole besitzen eigene quadratische, zentrierte SVG-Ausschnitte und separate Quellbegrenzungen gegen Nachbarreste. Zwei nachgereichte Energiesymbole wurden freigestellt: Blau/Grün für den bestehenden Kampf-Energiebonus (weave), Violett/Rot als vorbereitete Grafik für Gegnerenergie senken. Für Letzteres existiert derzeit keine Karte; keine neue Mechanik oder Werteänderung eingeführt.

Statische dezente Kontur folgt der tatsächlichen Rahmen-Transparenz, auch bei Synchros. Ausschließlich die Energiekosten spielbarer Handkarten pulsieren sanft (1,8 Sekunden); reduzierte Bewegung deaktiviert die Animation. Horizontaler Handabstand jetzt 6 px.

114 gezielte automatisierte Tests bestanden. Symbolzuschnitt und Zentrierung zusätzlich anhand statisch gerenderter SVG-Ebenen geprüft. Echte Geräte-/Browserprüfung nicht durchgeführt.
