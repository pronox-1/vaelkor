# Welt- und Detailpatch 179

- NPC-Abstand: Ausweichmanöver behalten kurz ihre Seite bei und verwenden keine rückwärts gerichteten Kandidaten mehr. Kurze Wiederholungen derselben AI-Position unterbrechen die Schrittfolge nicht. Eine echte Pause stoppt sofort. Nur NPCs erhalten eine kleine Hysterese für diagonale Blickrichtungswechsel; der Spieler und das normale Reiten behalten ihren bisherigen Ablauf.
- Seitliche blonde Spielerfiguren: Die letzte Zeile der Quellvorlage hatte Haare oberhalb der festen Zellgrenze. Die vollständigen Originalpixel werden jetzt aus einem größeren Ausschnitt übernommen. Es wird nichts neu gezeichnet. Körper, Fußanker, Maßstab und die drei vorhandenen Schrittstellungen bleiben erhalten; die alten Bilddateien bleiben verfügbar.
- Nach einem Turnier bleibt genau einer der beteiligten Trainer zurück, für exakt einen Ingame-Tag (18 Minuten aktive Spielzeit) ab Turnierende. Die Auswahl ist stabil und unabhängig von der Reihenfolge der Teilnehmer. Nach einem weiteren Sieg über diesen Gast verschwindet er; ein verlorenes Duell entfernt ihn nicht. Alte Mehrfach-Gast-Spielstände werden auf einen bestehenden Gast reduziert, ohne dessen Frist zu verlängern.
- Beeren heilen als Monster-Item genau5 LP, begrenzt auf die maximalen LP. Verbrauch, Ernte und Quests bleiben erhalten. Die Fütterung von Reittieren bleibt ein separater Geschwindigkeitseffekt.
- Unbenutzte Stalltiere sind von8 bis18 Uhr auf der südlichen Karte draußen, auch nachdem ein früheres Reittier zurückgeschickt wurde. Von18 bis8 Uhr stehen sie in ihren Boxen. Das ausgewählte Tier erscheint nicht doppelt.
- Kleine Boxenwege nutzen denselben bestätigten Vier-Posen-Ablauf mit einem kürzeren lokalen Animationsweg (0,8 Kacheln pro Zyklus), damit auf der kurzen Strecke alle Posen vorkommen. Normales Reiten, Folgen und Tiere draußen verwenden weiter den bestätigten Weg von4,8 Kacheln.

## Referenzen und Prüfung

`movement-amendments-179.json` benennt ausschließlich die vom Nutzer gewünschten Ausnahmen zur zuvor geschützten Bewegungsfassung. Die unveränderten Reittiergrafiken und die Spieler-/NPC-Quellbilder bleiben erhalten. Neue Haar-Ausschnitte liegen separat in `assets/player-crop-179/`; `restore-side-hair-179.cjs` dokumentiert die Herkunft und die unveränderte Skalierung.

Prüfungen: wiederholte120-Hz-Abfragen, Abstand/Kreuzungen, diagonale Blickrichtung, Stallzeiten inklusive zurückgeschickter Tiere, vier Boxenposen, Gast-Auswahl/Verfallsfrist/Neuladen/Entfernung nach Sieg und exakt5 LP pro Beere. Die vorhandenen Tests für drei Turniergegner innerhalb der Arena bleiben erhalten; nur die Besucher nach dem Turnier sind auf einen beschränkt.

Die CPU-/Canvas-Prüfungen sind kein echter Smartphone-/Browser-GPU-Test. Die Schritte der Reittiere wurden nicht neu gezeichnet oder neu getaktet; der kürzere Boxenweg gilt ausschließlich für die kleinen Innenraum-Bewegungen.
