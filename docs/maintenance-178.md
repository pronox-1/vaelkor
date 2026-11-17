# Performance und Stabilität 178

Die vom Nutzer bestätigten Spieler-, NPC- und Reittierbewegungen aus Release177 bleiben unverändert. `approved-movement-177.json` enthält die Prüfsummen der elf Bewegungs-/Optikdateien. Alle bisherigen Bilddateien und Generator-Vorlagen bleiben erhalten.

## Änderungen

- **Überdeckung:** Ein kleiner Cache hält die unveränderten Vordergrund-/Möbelbeschreibungen der aktuellen Szene. Personen und Tiere werden weiterhin bei jedem Bild an ihrer aktuellen Position geprüft und gezeichnet. Bei Szeneninvalidierung, Ortswechsel, Objektlistenänderungen oder anderen Raumplänen wird neu aufgebaut. Der Cache hält nur eine Szene. Feste Stall-/Zuchtmasken benötigen keine neue Geometrie pro Bild.
- **Ladefehler:** Nach zwei erfolglosen Versuchen kann ein erneut sichtbares Bild nach 15 Sekunden im selben Bildobjekt neu angefordert werden. Es gibt keine dauernd laufende Wiederholungsuhr. Unsichtbare Hintergrundbilder starten keine Wiederholung. Der zuletzt registrierte Ansichtsaufruf wird bei erfolgreicher Erholung geweckt. Pro Versuch gelten weiterhin Zeitlimit, maximal vier parallele Anfragen und maximal zwei optionale Anfragen.
- **Sichtbare Priorität:** Bereits ladende optionale Bilder dürfen eine höhere Browser-Priorität erhalten, ohne die belegten optionalen Plätze falsch zu zählen.
- **Optionales Vorladen:** Lade-/Fehlerereignisse schließen einen Auftrag nur einmal ab. Ein fehlerhafter optionaler Lader oder eine abgelehnte Promise lässt die Queue weiterarbeiten.

## Prüfung

`profile-maintenance-178.cjs` misst denselben Geometriepfad vor/nach dem Patch an fünf Orten. Je 1.500 Abfragen erzeugten zuvor 1.500 Listen, danach eine Liste plus 1.499 Wiederverwendungen. Die CPU-Zeit dieses Teilpfads sank im Test um rund 96–99 Prozent. Das ist kein FPS-Wert und keine entsprechend große Beschleunigung des gesamten Spiels.

`profile-stability-178.cjs` prüft sechs Übergänge mit echter CPU-Uhr, zwei beschleunigte Spieltage und 14 weitere Kartenwechsel mit aktiviertem gemeinsamen Bildlader. Keine Renderfehler und keine Überschreitung des geschätzten Ressourcenbudgets. Mock-Bilder und Mock-Canvas bilden reale Browser-/GPU-Speichernutzung nicht vollständig ab. Einzelne synchrone Generatorabschnitte sind weiterhin länger als ein Frame; dieser Patch verspricht keine durchgehend kurzen Generierungsblöcke.

Zusätzliche Prüfungen decken das Wiederanfordern nach Ladefehlern, Prioritätswechsel, doppelte Ereignisse, fehlerhafte optionale Lader, Cache-Invalidierung und die unveränderten Bewegungsdateien ab. Bestehende Überdeckungs-, Speicher-, Kampf-, NPC-, Sprach- und Kartenprüfungen bleiben Teil des Gesamtlaufs. Keine echte Handy-/Browser-GPU-Prüfung in dieser Umgebung.
