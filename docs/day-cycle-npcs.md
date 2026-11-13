# Tageszeiten, Bewohner und Vorlagen

Ein Zyklus dauert 18 Minuten aktiver Spielzeit: Tageslicht von 06:00 bis 18:00 für 12 Minuten und Nacht von 18:00 bis 06:00 für 6 Minuten. Morgen (06–08) und Abend (16–18) liegen innerhalb des Tages. Startzeit ist 08:00. Bei ausgeblendetem Browser-Tab hält die Zeit an; offline vergangene Zeit wird nicht nachgerechnet. `worldClock127.elapsedMs` wird im vorhandenen gemeinsamen Spielstand gespeichert.

| Figur | Hauptort | Nachts |
|---|---|---|
| Heiltrank-Händlerin | linker Laden, Krämer | nicht sichtbar |
| Materialhändler | rechter Laden, Schmiede | nicht sichtbar |
| Koch | Wohnhaus West, unten links | nicht sichtbar |
| Zauberer | Kirche | dort sichtbar |
| Reisehändler | Arena, südliche Karte −1 | dort sichtbar |

Morgens und abends nehmen Bewohner kollisionsgeprüfte Wege durch die Stadt und besuchen andere Gebäude. Tagesüber bewegen sich Koch und Zauberer nur innerhalb ihres Raums; die Händler stehen hinter ihren Tresen beziehungsweise am Schreibtisch in der Arena. Die Figuren sind eigenständige NPCs und verändern die Spieler-Skins oder Spieleranimation nicht. Große Laufbilder stammen aus 1000120201; kleine Weltbilder aus 1000120200. Neutralpose und Schritte bleiben im selben Bildsatz. Die Blickrichtungen werden nach dem Bildinhalt zugeordnet, da das kleine Blatt vorne/hinten anders beschriftet.

Naturtempel erscheinen mit 12% Zielwahrscheinlichkeit auf geeigneten Grünwald- und Dschungelkarten, sofern ein sicherer freier Platz existiert. Beim ersten Erstellen entstehen Eingang und Wegverbindung. Das bestehende Kartenregister speichert sie; Wiederbetreten erzeugt keinen zweiten Tempel. Türen, Truhen, Ausgänge und der Spielerbereich werden geschützt.

Die neun Originaldateien sind tatsächlich JPEGs mit .png-Namen im ZIP; gespeichert werden unveränderte Bytes mit passender .jpg-Endung und korrektem MIME-Typ. Alle Originale samt SHA-256, 286 benannten Quellrechtecken und Generatorgruppen stehen unter assets/templates-127/catalog.json. Die Referenzbilder sind erhalten. Anzeige-Matten werden erst im Canvas entfernt. Es findet kein Neuzeichnen der Originalfiguren statt. Online werden die Originale bei Bedarf geladen; für file:// enthält atlases-offline.js einen nur dort geladenen Originaldaten-Fallback. Spritecache: 128 Ausschnitte, NPC-Wege: 24, Raumpläne: 24; simuliert wird nur die aktive Karte.

Abend- und Morgentönung, ruhige Nachtvignette, warme Lampen und kühle Heilpunktlichter liegen über der Welt und ihren Figuren; Innenräume werden dezenter abgedunkelt. Karten- und Menütexte bleiben lesbar.

## Anpassung 128
NPCs verwenden dieselben Zielhöhen wie der Spieler (34 Pixel außen, 60 innen). Ein festes unsichtbares Körperraster mit gemessener Rumpfmitte und Fußanker je Quellpose richtet alle Posen auf dieselbe Körperachse/Bodenlinie aus; der Maßstab bleibt pro Figur und Ansicht konstant. Keine wechselnde Normalisierung anhand des Ausschnitts. Schritt–Stand–Schritt–Stand folgt der Laufstrecke, doppelte Wegpunkte werden entfernt. Der schmale Gang hinter dem Ladentresen ist von beiden Seiten erreichbar; der Tresen selbst bleibt gesperrt und verdeckt die Beine hinter ihm. Die bestehende Arena migriert einmalig auf x=7/y=14.5, Breite 12 statt 10; Tür und Rückkehrpunkt wandern mit.

## Release 129 – neue NPC-Vorlagen und Korrekturen
Die beiden neuen Originale bleiben bytegleich unter assets/templates-129 (JPEG-Inhalt trotz .png-Namen im Upload). Das Außenblatt liefert echte Richtungs- und Laufbilder für alle fünf Figuren. Pro Richtung läuft neutral – linker Schritt – neutral – rechter Schritt, streckenabhängig und auf festem Körperraster (34 Pixel außen/60 innen). Aktive Figuren werden über die bestehende Animationsschleife mit maximal 30 FPS gezeichnet; die frühere 125-ms-Zusatzschleife entfällt.
Das neue Innenblatt liefert Standbilder für Händlerin, Koch, Materialhändler und Zauberer. Diese behalten beim Gehen denselben Körper und dieselbe Kleidung; eine dezente Zweibein-Animation verwendet die originalen Füße. Es werden keine anderen Charaktermodelle während eines Schritts eingeblendet. Der Reisehändler behält seine vorhandenen Innenbilder, da er auf dem neuen Innenblatt fehlt.
Der statisch eingebackene erste Ladentresen ließ keinen echten Durchgang hinter sich zu. Der Laden nutzt nun die bereits vorhandenen modularen Ladenelemente mit breiten Seitenwegen und zwei Warentischen. Schmiede und Laden verwenden gemeinsame Tiefensortierung für Möbel, Spieler und NPCs; es wird kein zweiter Tresen über den Spieler gezeichnet. Kollision und Darstellung beziehen sich auf dieselben Möbel.
Der Karten-Auslöser bleibt quer zum Weg schmal, umfasst aber jetzt den Streifen bis zum Kartenrand. Dadurch funktioniert der Rückweg aus −1 auch nach durchgehendem Laufen bis an den Rand. Der 1,5-Sekunden-Timer und das Herauslaufen zum Abbrechen bleiben erhalten.
Kirchenatlas und Innenfiguren werden schon in der Stadt angefordert und vor dem Türübergang vorbereitet. Langsame Netze können weiterhin Ladezeit verursachen; kein zusätzlicher Ladebildschirm wurde eingeführt.
Alle vier tatsächlichen Stadtlaternen werden als Lichtquellen berücksichtigt. Die Nachtbeleuchtung kombiniert einen weichen, einmal vorbereiteten Lichtkegel mit warmem Bodenlicht und Licht am Lampenkopf; Heilpunkte bleiben kühlblau. Maximal 24 Lichtquellen und zwei wiederverwendbare Kegel-Texturen, keine zusätzlichen Bibliotheken.
