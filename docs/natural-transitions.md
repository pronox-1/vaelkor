# Natürliche Wildnis-Verbindungen

## Umsetzung und verwendete Systeme

Die vorhandene Wildnis mit `build()`, `pass()`, `terrainPath()`, Kartenregister, Weltseed und dem gemeinsamen Spielstand bleibt erhalten. Die vorhandenen Karten-IDs, Haupt-/Nebenwege und Verbindungsziele werden nicht neu geplant. Es gibt keine zusätzlichen Abzweigungen oder neue magische Verbindungen.

Die normalen Übergänge sind Erd-/Biomwege. Große Portale aus dem zweiten Konzeptblatt werden dafür ausdrücklich nicht eingesetzt. Vorhandene Monumente im Spiel werden nicht entfernt; neue Portal-, Höhlen- oder Dungeonmechaniken sind nicht Teil dieser Änderung.

## Varianten A–E

| Variante | Umsetzung |
| --- | --- |
| A – Einfacher Weg | Häufigster Übergang. Begehbarer Anschluss an das vorhandene Wegenetz, bis zum tatsächlichen Kartenrand verlängert. |
| B – Wegweiser | Bestehender freigestellter Holzwegweiser seitlich neben dem Weg. Hinweise erscheinen über die vorhandene Interaktion, nicht auf den Sprite gemalt. |
| C – Felsdurchgang | Zwei vorhandene Biomfelsen beziehungsweise die vorhandenen neutralen Felsen flankieren einen freien Durchgang. |
| D – Holzbogen/Laterne | Neuer schlichter transparenter Holzbogen mit einer Laterne. Nur die zwei Pfosten kollidieren; die Öffnung bleibt frei. Seltene Variante, bei Dorfverbindungen etwas häufiger. |
| E – Verbindungsformen | Gerade Wege, Kurven, T- und Kreuzungsverbindungen nutzen die vorhandene kontinuierliche Wegdarstellung und deren Nachbarschaftsmaske. Keine aneinandergeklebten Konzeptbild-Ausschnitte. |

Die Bildvorlagen sind Konzeptblätter. Keine Beschriftungsrahmen, dunklen Konzeptblatt-Hintergründe oder kompletten Screenshots wurden als Spielboden übernommen.

## Erzeugung und Randanschlüsse

Ein lediglich begehbarer Grasbereich zählt nicht länger als fertiger Weganschluss. Neue Übergänge verbinden sich sichtbar mit dem größten begehbaren Teil des bestehenden Wegenetzes. Der Anschluss bevorzugt Land; falls nötig, entstehen Brückenkacheln über Wasser. Die letzten Wegkacheln reichen tatsächlich zum Rand. Vorhandene natürliche Wegschwünge, die weichen Wegschultern und die bisherige Wegbreite bleiben erhalten.

Hauptkarten führen vorwärts nach Norden und rückwärts nach Süden. Dörfer verwenden dazu den freien nordwestlichen Durchgang als Vorwärtsausgang und den bisherigen südlichen Weg als Rückweg. So trifft ein nördlicher Ausgang auf einen südlichen Eingang. Linke/rechte Nebenwege behalten ihre Ost-West-Gegenrichtungen. Startdorf und Endkarten von Nebenwegen erhalten keine zusätzlichen Verbindungen.

Die Dorfgebäude bleiben an ihren Plätzen. Nur die Ausgänge werden konsistent zugeordnet und notwendige Anschlusswege ergänzt. Ein einmaliger Versionswert am gespeicherten Szenenzustand verhindert wiederholte Migration oder zufälliges Umdekorieren. Bereits erzeugte Karten werden nicht komplett neu generiert.

Dorfwächter stehen wieder am Vorwärtsweg und lösen dort das vorhandene Trainerkampfsystem aus. Ein noch unbesiegter Wächter sperrt nicht den Rückweg. Die bestehende abbrechbare Wartezeit von 1,5 Sekunden und die kurze Überblendung bleiben erhalten. Eintrittspunkte liegen außerhalb der Auslösebereiche. Die Blickrichtung bleibt beim Wechsel möglichst erhalten und wird nun ebenfalls mit der Szene gespeichert.

## Assets und Kollisionen

Wiederverwendet:

- `dorf_wegweiser` aus `assets/images/5a7beea3930c850746ca.png`.
- Bestehende Fels-Sprites und Felsen der Biom-Atlanten.
- Vorhandene Gras-, Weg-, Wasser- und Brückendarstellung sowie die bestehenden Biomfarben.

Neu:

- `assets/images/trail-wooden-arch.png`, mit dem Bildwerkzeug aus der vorhandenen Bogenreferenz als einfacher Holzbogen erstellt: keine Blumen, keine Beschriftung, kein Bodenhintergrund.
- Der Renderer nutzt einen definierten Ausschnitt innerhalb des transparenten Bildes. Die originale Generierung bleibt unverändert erhalten; Transparenz der Öffnung und die Standfüße wurden zusätzlich anhand der Alphawerte geprüft.

Die Kamera arbeitet weiterhin mit 16-Pixel-Kacheln. Wegweiser und Bogen werden mit deaktivierter Bildglättung auf passende Kachelgrößen gezeichnet. Die Kollisionsflächen orientieren sich an den Standflächen, nicht an der gesamten Bildfläche. Bogenpfosten sind separate kleine Kollisionsobjekte. Unter dem Querbalken kann die Figur hindurchlaufen.

Gebäude, Truhen, Heilpunkte und deren Zugänge werden bei der Platzwahl geschützt. Wenn eine optische Variante keinen sicheren Platz findet, wird auf Wegweiser oder einfachen Weg zurückgefallen. Eine abschließende Erreichbarkeitsprüfung entfernt optionale Übergangsdekoration, falls sie doch einen Ausgang oder eine Truhe abschneiden sollte.

Ein eigener seitlich perspektivischer Holzbogen ist nicht vorhanden. Auf Ost-West-Verbindungen werden deshalb die passenden Weg-/Schild-/Felsvarianten verwendet; der frontale Bogen wird nicht unpassend um 90 Grad gekippt. Weitere Portal- und Höhlensprites aus dem Konzeptblatt können später separat technisch vorbereitet werden. Für die jetzt implementierten normalen Übergänge fehlen keine zwingenden Sprites.

## Biome

Alle sieben bestehenden Biome verwenden dieselbe Technik. Farbpaletten unterscheiden Erde, Sand, überwachsenen Boden, festgetretenen Schnee, Asche, feuchten Pfad und moosige Wege. Schneeschilder erhalten eine kleine, auf ihre transparente Bildfläche begrenzte Schneekappe; diese Fassung wird einmalig in einem kleinen Canvas zwischengespeichert. Biomfelsen und die vorhandene Vegetation ergänzen die jeweilige Umgebung.

Brücken und Holzbohlen richten ihre Planken an der Wegachse aus. Ein Ost-West-Wasserübergang zeigt dadurch keine falsch ausgerichtete Nord-Süd-Brücke.

## Speicherung und Kompatibilität

Das bestehende `vaelkor-save-v2` bleibt maßgeblich. Im vorhandenen Szenenzustand stehen zusätzlich Übergangs-Version, dauerhafte Dekorationswahl, Austrittspunkte und Blickrichtung. Geöffnete Truhen behalten ihre bisherigen Schlüssel und Zustände. Gebäude, Innenräume, Brunnen, Heilrastplätze, Inventar, Team und Kampfkarten bleiben erhalten.

Alte Szenen ohne diese zusätzlichen Felder werden beim Laden einmalig ergänzt. Gespeicherte Seeds und Gebäude bleiben erhalten. Beim verzögerten Laden des Elternmoduls wird die ursprünglich angeforderte Spielerposition aufbewahrt, damit ein gespeicherter Nebenweg nicht versehentlich an einer provisorischen Hauptkartenposition fortgesetzt wird.

Nur die aktuelle Karte wird gezeichnet und simuliert. Es gibt keine zusätzlichen laufenden Welten oder Hintergrundsimulationen. Übergangsobjekte gehören zur jeweiligen gespeicherten Objektliste; feste Bild- und Schneeschild-Caches wachsen nicht mit der Kartenzahl. Das bekannte Browser-Speicherlimit des bisherigen vollständigen JSON-Spielstands bleibt bestehen; bei einem tatsächlichen Speicherfehler bleibt die bisherige Karte spielbar.

## Kleine Außenfiguren – Korrektur

Die Außenansicht verwendet wieder ausschließlich die kleinen Figuren des bisherigen kleinen Template-Blatts. Nur der Schritt-/Standrhythmus wurde aus der funktionierenden Innenanimation übernommen. Beide Standphasen verwenden exakt dasselbe kleine Neutralbild. Die Größe bleibt außen 34 und innen 60 Pixel. Innenbilder werden draußen nicht als Ersatz ausgewählt. Die Innenansicht bleibt unverändert; Bildauswahl und Maßstab werden für 768 Innenzustände gegen die akzeptierte Fassung geprüft.

## Geänderte Dateien

- `js/world/transition-templates.js`: neue optische Varianten, Biompaletten, Wegweisertexte und Metadaten für Verbindungsformen.
- `js/world/embedded-wildlands.inc.js`: sichtbare Weganschlüsse, Migration, sichere Markerplätze, Pfostenkollisionen, Interaktion und Blickrichtung.
- `js/world/wildlands.js`: Erweiterung des vorhandenen Ladeablaufs um die einmalige optische Migration und explizite Startpositionen.
- `js/script-09.js`: synchronisierter eingebetteter Weltmodus, Bogenzeichnung, Kollisionsflächen, Wegfarben und Brückenrichtung; außerdem die korrigierte kleine Außenbildauswahl.
- `index.html`: neues Modul und Cache-Parameter.
- `assets/images/trail-wooden-arch.png`: neuer transparenter Sprite.
- `tests/transition-templates.test.cjs`: neue Katalog-/Assettests.
- `tests/wildlands-runtime.test.cjs`: erweiterte Laufzeit-, Richtungs-, Migrations-, Speicher- und Kollisionsprüfungen.
- `tests/outdoor-animation.test.cjs`, `tests/map-foundation.test.cjs`: angepasste Einbindung und ausdrückliche Prüfung der kleinen Außenbilder.
- Dokumentation und veröffentlichte Prüfbericht-Seiten. Das vorhandene Synchronisationswerkzeug wird weiterverwendet.

## Prüfungen und offene Grenzen

Ausführen im Projektordner:

```sh
node --test tests/*.test.cjs
```

**Ergebnis: 40 unterschiedliche automatisierte Tests erfolgreich.** Der Gesamtlauf mit 38 Tests einschließlich 30 Hauptkarten bestand in rund 211 Sekunden; die beiden zusätzlichen Wächtertests bestanden ebenfalls. Syntax-, Referenz- und Whitespace-Prüfungen sind fehlerfrei.

Geprüft werden unter anderem:

- Erster Vorwärts- und Rückweg, alle vier Randrichtungen, gegenläufige Ein-/Ausgänge.
- 30 aufeinanderfolgende Hauptkarten sowie linke/rechte Nebenwege aller Längen, ohne blockierte Ausgänge.
- Alle vier optischen Varianten werden tatsächlich platziert; solide Markerfüße kollidieren, die Bogenöffnung bleibt begehbar.
- Unterschiedliche Biome und Dorfwechsel.
- Speichern unmittelbar vor einem Ausgang, Neuladen und anschließendes einmaliges Überqueren.
- Wiederbetreten mit unveränderter Geometrie und geöffneten Truhen.
- Einmalige Migration alter Dörfer ohne Neubau oder Verlust von Truhenzuständen.
- Hinweis über die vorhandene Interaktion, freie Eintrittspositionen und keine Wechsel-Endlosschleife.
- Vorwärtswächter löst den bisherigen Kampf aus; Rückweg bleibt frei.
- Blickrichtung, verspätetes Laden, Speicherfehler und bestehende Außen-/Innenanimation.
- Syntax, Bildreferenzen und Transparenz des neuen Bogen-Assets.

Das Testmodell führt den echten eingebetteten Spielcode mit DOM-/Bild-/Canvas-Testadaptern aus. Es ist kein visueller Browser- oder Hardwaretest. Die Schärfe, Schneekappen und Überdeckung im laufenden Handyspiel wurden nicht auf einem physischen Gerät geprüft. Hier gilt die [Sites-Skill-Anweisung](skill://plugin_connector_1p_689987207de08191979cf68eca2941c6/sites/SKILL.md): “If `cua_repl.js` is unavailable, skip browser QA”. Das erforderliche Browserwerkzeug ist weiterhin nicht verfügbar.

Der sinnvollste nächste Schritt ist ein Sichttest auf dem tatsächlichen Handy, insbesondere an einem Holz-/Felsdurchgang und einem Schneeübergang. Danach können gezielt weitere seitliche Bogen- oder biomeigene Schildvarianten ergänzt werden. Neue Portale oder Dungeons sollten als gesonderte Erweiterung folgen.
