> Historischer Bericht zu Auftrag 1. Die inzwischen aktive Integration ist in [wildlands-master-2.md](wildlands-master-2.md) beschrieben.

# Kartenidentität: technische Grundlage

Basis: GitHub `pronox-1/vaelkor`, Commit `be00288ae7f00c50c19f0520958e334d44e6dcd9`, Versionskennung 104. Das Projekt besitzt 23 geordnete JavaScript-Dateien und ausgelagerte Bilder. Die ältere hier bearbeitete Einzeldatei wurde nicht übernommen.

## Umfang und Dateien

- `js/world/map-registry.js`: kleine, eigenständig testbare Metadatenstruktur.
- `js/world/legacy-map-adapter.js`: Anbindung an bestehendes `data` und `vkPersistUnified()`.
- `index.html`: zwei zusätzliche Skripte nach sämtlichen bisherigen Skripten.
- `tests/map-foundation.test.cjs`: gezielte Node-Tests ohne zusätzliche Abhängigkeiten.
- Dieses Dokument.

Alle bestehenden Spielskripte, Weltmodus-Quellen, CSS und Bilder bleiben unverändert. Die aktive Navigation verwendet weiterhin `level`, `build()` und die vorhandenen Übergangs- und Innenraumfunktionen. Das Register steuert keine Bewegung und generiert keine Karten.

## IDs und Verbindungen

`main:12` bezeichnet die Hauptkarte 12. `side:12:left:1` bezeichnet die erste von maximal drei Nebenwegkarten links dieser Hauptkarte. `inside:main%3A12:house%3A4%3A5` bezeichnet einen Innenraum mit stabilem Türanker. Türanker sollen Objekt-/Türkoordinaten oder bestehende `lootId102` verwenden, keine Anzeigenamen oder Sortierindizes.

IDs sind unabhängig von Zufallszahlen und Einfügereihenfolge. Hauptnummern können für spätere große Welten als kanonische Dezimalzeichenketten übergeben werden; unsichere JavaScript-Zahlen werden zurückgewiesen. Vorbereitete Seeds sind deterministisch aus Weltseed und ID abgeleitet. Bereits vorhandene Hauptkarten behalten die bestehende Seedformel `1041 + zone`.

`VaelkorWorldMaps` bietet `ensureMain`, `ensureInterior`, `create`, `get`, `connect`, `resolve`, `disconnect`, `getState`, `patchState`, `snapshot`, `currentMainId` und `ids`. Diese API registriert nur Metadaten:

```js
const maps = VaelkorWorldMaps;
const main = maps.ensureMain(12);
const side = maps.ids.side(main, 'right', 1);
maps.create({id: side, type: 'side', templateId: 'forest-path-v1'});
maps.connect(main, 'right', side, 'left');
maps.resolve(side, 'left'); // {mapId: 'main:12', entry: 'right'}
maps.patchState(side, {openedChests: {chest1: true}});
```

Dieses Beispiel wird nicht automatisch ausgeführt. `connect` belegt beide Gegenrichtungen gemeinsam und weist Konflikte zurück, ohne bestehende Verbindungen zu überschreiben. `disconnect` entfernt beide Richtungen. Auflösen erzeugt keine Karte. Hauptfortschritt verwendet `next/previous`, weil Stadt- und Wildnisausgänge unterschiedliche Bildschirmrichtungen besitzen. Innenraumverbindungen verwenden `enter:<kodierter Anker>/exit`.

Der Adapter erfasst zunächst ausschließlich die aktuelle Hauptkarte. Weitere bereits besuchte Hauptkarten werden bei vertrauenswürdigen `ready`-Meldungen des vorhandenen Welt-Iframes erfasst. Nur beobachtete benachbarte Level werden verbunden. Positionsmeldungen lösen keine Registerarbeit aus. Innenräume und Nebenwege werden nicht automatisch registriert oder erzeugt.

## Speicherung und Kompatibilität

Das bestehende atomare Speichersystem `vaelkor-save-v2` bleibt maßgeblich. Das zusätzliche Feld `world.mapRegistry` enthält Schema-Version, Weltseed und Kartenobjekte mit ID, Typ, Seed, optionaler Vorlagen-ID, Verbindungen und dauerhaftem JSON-Zustand. `patchState` führt flache Änderungen auf oberster Zustandsebene zusammen. Gelieferte und zurückgegebene Zustandsobjekte werden kopiert.

Änderungen bündeln sich in einer Microtask und rufen das vorhandene `vkPersistUnified()` auf. Keine neuen Speicher-Schlüssel, Timer oder Frame-Schleifen. Alte Spielstände ohne Register erhalten Standardwerte; Welt-, Inventar- und Fusion-Daten bleiben erhalten. Ein beschädigtes Register oder eine unbekannte Schema-Version wird nicht ersetzt: Der Adapter deaktiviert sich mit Konsolenhinweis, das bisherige Spiel bleibt aktiv. Beim Wechsel des Spielstandobjekts wird das zugehörige Register neu gebunden.

Bestehende Truhen bleiben ausschließlich in `data.adventureChests102` gespeichert. `isLegacyChestOpened()` liest diesen vorhandenen Zustand. Es gibt keine zweite Truhenverwaltung. Zukünftige neue Karten dürfen eigenen dauerhaften Zustand verwenden. Sehr große Welten werden den bestehenden vollständigen JSON-Spielstand langfristig vergrößern; eine spätere Speichersegmentierung ist hier bewusst noch nicht implementiert.

## Prüfung

`node --test tests/*.test.cjs`: 8 Tests erfolgreich. Geprüft werden kanonische IDs, Seeds, Gegenverbindungen, atomare Konflikte, Innenraum-Rückverbindungen, JSON-Rundlauf, ungültige Zustände, Altstände, unveränderte bestehende Felder, zusammengefasste Speichervorgänge, ignorierte Positions-/Fremdmeldungen, Spielstandwechsel und ausfallsichere Browser-Initialisierung. Alle 23 Originalskripte werden syntaktisch geprüft und mit dem Basiscommit bytegenau verglichen. Auch die HTML-Datei ist abgesehen von den zwei angehängten Skripten identisch.

Kein interaktiver Spiel-/Mobilbrowser-Test durchgeführt. Die für diese Umgebung geltende [Sites-Skill-Anweisung](skill://plugin_connector_1p_689987207de08191979cf68eca2941c6/sites/SKILL.md) lautet: “If `cua_repl.js` is unavailable, skip browser QA”. Das benötigte Browserwerkzeug ist hier nicht verfügbar. Die Tests belegen die Datenintegration, ersetzen keinen visuellen Durchlauf des Spiels.

## Nächster Auftrag: tatsächliche Generierung

Ein versionierter Vorlagenkatalog, seedbasierte Platzierung und ein Haupt-/Nebenwegplaner müssen ergänzt werden. Erst danach sollte ein getesteter Navigationsadapter Karten anhand von IDs laden, einschließlich korrekter Ankunftspositionen. Neue Kartengeometrie und permanente Änderungen müssen gespeichert werden; Kreaturen-Respawns bleiben davon getrennt. Für Höhlen und Tempel folgen eigene Raumgrundrisse und Verbindungen. Nichts davon wird mit diesem Auftrag automatisch aktiviert.
