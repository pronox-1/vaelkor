> Historischer Stand vor den natürlichen Übergängen. Hauptwege führen inzwischen durchgehend nach Norden, Rückwege nach Süden; siehe [natural-transitions.md](natural-transitions.md).

# VAELKOR Wildlands – Auftrag 2

## Grundlage und Umfang

Aufbau auf der zuletzt veröffentlichten GitHub-basierten Version: `pronox-1/vaelkor`, Basiscommit `be00288ae7f00c50c19f0520958e334d44e6dcd9`, Versionskennung 104, ergänzt um die Kartenbasis aus Auftrag 1 und den zuletzt verbesserten Außenanimationsrhythmus. Kein neues Spiel und kein zweiter Weltsimulator. Das bestehende Level-/Biomsystem bleibt für Kämpfe und Spielfortschritt zuständig; das vorhandene Kartenregister erhält die Navigation und dauerhafte Szenen.

## Geänderte Dateien

- `js/world/wildlands.js`: erweiterbare Vorlagen, deterministische Haupt-/Nebenwegplanung, verzögerte Erzeugung, Laden, Übergangssicherung, Zustand und Speichern.
- `js/world/embedded-wildlands.inc.js`: kleine Integrationsschicht innerhalb des bestehenden Weltmodus; Szenenaufnahme/-wiederherstellung, Anschlusswege, Eintrittspunkte und sichtbare Ausgänge. Diese gepflegte Quelldatei wird in den eingebetteten Weltmodus kopiert, nicht als eigenes Weltsystem gestartet.
- `js/script-09.js`: gezielte Erweiterungen am vorhandenen Generator und den vorhandenen Toren; enthält die eingebettete Integrationsschicht.
- `js/world/map-registry.js`: vorhandenes Register um sicheres einmaliges Setzen einer Vorlagen-ID ergänzt.
- `js/world/legacy-map-adapter.js`: vorhandene Registermethoden weitergereicht; Nebenweg-Meldungen werden nicht als Hauptkartenbesuche interpretiert.
- `index.html`: lädt das neue Modul nach den vorhandenen Kartenmodulen und versieht geänderte Skripte mit einem Cache-Parameter.
- `js/script-10.js`: bestehende Rückkehr-/Teleportbefehle nennen zusätzlich ausdrücklich ihre Hauptkarten-ID, damit eine Rückkehr in die Stadt auch von deren Nebenweg funktioniert.
- `tools/sync-world-bridge.py`: hält die gepflegte Integrationsschicht und das eingebettete HTML synchron.
- `tests/wildlands-runtime.test.cjs`: neue Tests mit dem tatsächlichen eingebetteten Spielcode.
- Die bisherigen Kartenbasis-/Animationstests wurden an die jetzt aktive Integration angepasst.
- `tests/fixtures/baseline-v104.json`: kleine Prüfreferenzen des Basisstands; die Tests benötigen dadurch weder Git-Metadaten noch eine Netzwerkverbindung.
- Dieses Dokument. Die älteren Dokumente beschreiben jeweils ihren damaligen Zwischenstand.

## A/B – Bestehende Verwaltung und Hauptstrang

Die einzige Kartenverwaltung bleibt `data.mapRegistry`. Hauptkarten heißen weiterhin `main:1`, `main:2` usw. Hauptnummern sind Zeichenketten; die Fortschreibung benutzt Ganzzahlarithmetik, ohne Präzisionsverlust bei der Karten-ID. Jede Hauptkarte plant `next` und – außer der ersten – `previous`. Die Gegenrichtung ist semantisch, weil Städte ursprünglich nur einen südlichen Vorwärtsausgang besaßen. Städte erhalten deshalb einen geprüften Rückweg nahe dem nordwestlichen Rand, ohne Kirche oder Brunnen zu versetzen.

Der bestehende `build()`-Generator und dessen Erweiterungen erzeugen eine Karte nur dann, wenn für sie noch keine gespeicherte Szene existiert. Einmal besuchte Karten werden aus ihrem Zustand wiederhergestellt. Es wird keine zusätzliche Folge zukünftiger Karten vorausgeneriert.

## C – Nebenwege

Standardkonfiguration:

```js
data.wildlandsConfig = {
  branchProbability: 0.5,
  bothProbability: 0.16, // Anteil der Abzweigungen mit beiden Seiten
  maxBranchLength: 3
};
```

Die Entscheidung und Länge werden aus Weltseed und Karten-ID bestimmt und beim ersten Planen gespeichert. Konfigurationsänderungen gelten für noch nicht geplante Karten. Links, rechts oder beide Seiten sind möglich; die Längen 1, 2 und 3 werden gleichmäßig gewählt. IDs wie `side:12:left:2` unterscheiden Nebenwege eindeutig. Ein linker Nebenweg führt auf seinen Karten nach links weiter und rechts zurück; ein rechter Nebenweg entsprechend umgekehrt. Endkarten besitzen nur ihren Rückweg.

Nebenwege verwenden das Biom und Begegnungslevel ihrer Hauptkarte. Sie erzeugen keine weiteren Hauptkarten oder zusätzlichen Dörfer. Ihre Wächter sind deaktiviert; vorhandene wilde Begegnungen, Dekoration und Truhen bleiben nutzbar. Geplante Ziele enthalten zunächst nur Identität/Topologie; tatsächliche Szenen entstehen beim ersten Betreten. Verbindungen zwischen existierenden Karten werden mit dem bisherigen atomaren `connect()` in beiden Richtungen gespeichert und vor dem Übergang auf Konsistenz geprüft.

## D – Vorlagen und kontrollierte Variation

Vier versionierte Außenstruktur-Vorlagen nutzen den vorhandenen Generator:

1. Randfluss mit Weg im Landesinneren.
2. Flussquerung mit bestehender Brückenerzeugung.
3. See neben dem Hauptweg.
4. Trockener Pfad.

Sie definieren den Geländetyp, die vorhandene begehbare Hauptachse, die Platzierungsregeln für Hindernisse und Dekoration sowie skalierte Begegnungs- und Vegetationsdichten. Ausgänge werden durch den Kartenplan festgelegt. Der vorhandene Generator liefert die konkreten Weganker, Vegetation, Steine, Kreaturengras und Dekorationsplätze. Alle bisherigen Biomgrafiken werden wiederverwendet. Weitere Vorlagen können durch neue versionierte Einträge und passende Generatoroptionen ergänzt werden.

Alte bereits erreichte Hauptkarten verwenden die bisherige Seedformel und Dichte ohne neue Vorlagenvariation. Die bekannte Fortschrittsgrenze wird einmalig festgehalten. Zusätzliche Anschlusswege zu neuen Ausgängen sind die beabsichtigte Erweiterung dieser Karten.

Neue Ausgangspositionen werden gegen feste Gebäude und Gegenstände geprüft. Falls ein Ausgang nicht bereits erreichbar ist, sucht die Integration einen Anschluss an die vorhandene begehbare Fläche. Sie bevorzugt Land und legt nur bei Bedarf Brückenkacheln über Wasser. Nur störende gewöhnliche Vegetation/Hindernisse im notwendigen Anschlusskorridor werden entfernt; Gebäude und Truhen werden erhalten. Anschließend werden die Ausgänge mit derselben `pass()`-Funktion und denselben Viertelschritten wie beim Laufen geprüft. Truhen benötigen einen erreichbaren Interaktionspunkt.

## E – Zustand, Übergänge und Performance

Jeder Karteneintrag speichert Seed, Typ, Vorlagen-ID, Gegenverbindungen, geplante Abzweigungen sowie die fertige Szene: Gelände, Objekte, Gebäudeanker, Ausgänge, Heilpunkte und Wächterzustand. Der Generator wird beim erneuten Betreten nicht erneut aufgerufen.

Temporär bleiben Bewegungsinterpolation, gedrückte Tasten, Animation, Szenen-/Geländecaches, Übergangstimer und Kampfzustand. Es wird nur eine Karte mit ihren aktuellen Objekten simuliert und gezeichnet. Entfernte Karten sind gespeicherte JSON-Daten; es gibt keine laufenden Objektlisten oder Timer für diese Karten. Die Erreichbarkeitsprüfung besitzt nur einen Cache für die aktuelle Geometrie.

Das gemeinsame Speichersystem `vaelkor-save-v2` und `vkPersistUnified()` bleiben erhalten. Positionsspeicherungen beim Laufen werden mit einem einzigen 750-ms-Timer zusammengefasst und beim Verlassen/Verbergen der Seite sofort geschrieben; Kartenwechsel und sonstige Spielspeicherungen bleiben unmittelbar. Alte Felder, Inventar, Team und Fusion-Speicher werden nicht gelöscht. Geöffnete Truhen bleiben in der bisherigen einzigen Tabelle `adventureChests102`; bei Hauptkarten bleiben deren alte Schlüssel unverändert. Nebenwege erhalten einen Karten-ID-Präfix, damit gleichartige Truhen in unterschiedlichen Karten keine Belohnung teilen. Weitere dauerhafte Veränderungen können über den vorhandenen Kartenzustand gespeichert werden.

Vor einem Übergang wird die aktuelle Szene aufgenommen. Das Ziel wird geladen oder einmalig erzeugt, geprüft, mit einer freien Eintrittsposition versehen und synchron gespeichert. Fehlgeschlagene Erzeugung oder Speicherung stellt die vorherige Szene und Kartenidentität wieder her. Unlesbare alte Register werden nicht überschrieben. Die bisherige abbrechbare 1,5-Sekunden-Toranimation bleibt zuständig; Eintrittspositionen liegen außerhalb ihres Auslösebereichs. Ein wiederholter Aufruf während eines laufenden synchronen Kartenwechsels wird abgewiesen. Spät geladene Elternmodule können sich an die bereits initialisierte Welt anbinden, ohne deren gespeicherten Nebenweg zu verlieren.

## F – Tests und Grenzen der Prüfung

Ausführen im Projektordner:

```sh
node --test tests/*.test.cjs
python3 tools/sync-world-bridge.py
```

**Ergebnis: 27 unterschiedliche automatisierte Tests erfolgreich.** Der abschließende Gesamtdurchlauf einschließlich Kartengenerierung und Positionsspeicher-Bündelung bestand (27/27, etwa 154 Sekunden im Node-Testmodell). Zusätzlich bestehen Syntax-, Import-/Bildreferenz- und Whitespace-Prüfungen.

Die Tests prüfen IDs/Seeds, reziproke Verbindungen, atomare Konflikte, Altstände, JSON-Speicherung, dauerhafte Flags, Außen-/Innenanimation und die Synchronität der eingebetteten Integrationsschicht. In der Stichprobe besitzen 1.436 von 3.000 Hauptkarten mindestens einen Nebenweg (47,9 %); 236 besitzen beide. Die Längen verteilen sich auf 578 / 538 / 556 Nebenwege mit 1 / 2 / 3 Karten.

Hinzu kommen 3.000 deterministische Hauptkartenpläne, ein Durchlauf über 30 Hauptkarten mit erzwungenen linken UND rechten Nebenwegen aller Längen, sämtliche Rückwege, freie Eintrittspunkte, gespeicherte Geometrie, erneutes Initialisieren und Laden auf einem Nebenweg, spätere Biome/Städte, Rücknahme bei Speicherfehler sowie tatsächliche Tasten-/Bewegungs-/Torlogik mit simuliertem Zeitverlauf.

Das Node-Testmodell führt den echten eingebetteten Spielcode aus und ersetzt nur DOM, Bilder und Canvas durch Testadapter. Es ist kein Browser- oder visueller Test. Handy-Touchbedienung, tatsächliche Bilddarstellung, GPU-Verhalten, native Vollbildmodi und Langzeitperformance auf einem physischen Gerät wurden nicht interaktiv geprüft. Die hier geltende [Sites-Skill-Anweisung](skill://plugin_connector_1p_689987207de08191979cf68eca2941c6/sites/SKILL.md) sagt: “If `cua_repl.js` is unavailable, skip browser QA”. Das notwendige Werkzeug ist in dieser Umgebung nicht vorhanden.

## Praktische Grenzen und nächster Schritt

Die Topologie hat keine fest eingebaute letzte Karte. Der bestehende numerische Kampf-/Leveladapter bleibt innerhalb sicherer JavaScript-Zahlen; extrem große Karten-IDs werden weiter unterschieden, während der alte numerische Levelwert begrenzt wird. Das ist keine Zusage unbegrenzter Gerätespeicherung: gespeicherte Szenen vergrößern das bisherige vollständige JSON-Save, das dem Browser-Speicherlimit unterliegt. Bei einem tatsächlichen Speicherfehler wird der Wechsel abgebrochen. Eine Speichersegmentierung in IndexedDB wäre ein sinnvoller gesonderter Folgeauftrag, bevor sehr große Welten erkundet werden.

Neue Innenräume und Dungeons sind nicht implementiert. Vorhandene Häuser und deren Innenräume bleiben erhalten; das Kartenregister besitzt bereits Innenkarten-IDs und Türverbindungen. Als nächster inhaltlicher Schritt bieten sich mehr explizite Vorlagen mit Ressourcen-/Belohnungsplätzen an; anschließend können Höhlen und Tempel als eigene persistente Raumgraphen an diese Verwaltung angeschlossen werden.
