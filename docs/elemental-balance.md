# Kartenbalance: Energie, Seltenheit und Elementvorlieben

Ausgangspunkt ist die veröffentlichte Version 7ec82eeb7ad65e8953d41ce54790b5e4e69e0b25. Die vorhandene Kartenverwaltung, Kampfauflösung, Booster, Spielstände und Grafiken werden erweitert.

## Status und Darstellung

Alle 239 Arten haben jetzt 2 statt 3 Grundenergie. Levelzuwächse und vererbte Energie kommen unverändert dazu; Kampfboni bleiben direkt additiv und auf +3 begrenzt. Alte Monster verlieren keine Level, Anlagen oder LP. Die Starterauswahl verwendet dieselben fünf Statussymbole und berechneten Level-5-Werte wie der Kampf: LP, AP, SP, H und E. Sichtbare Heilkraft heißt H; interne hk-Felder bleiben für kompatible Spielstände erhalten.

Angriffskarten zeigen wieder Basis + Faktor × AP, auch automatisch erzeugte Teamkarten. Betäubungsangriffe zeigen ihren reduzierten Faktor; Synchros zeigen Basis/AP, Kombinationsfaktor und einen kurzen Effekthinweis. Vollständige Berechnungen bleiben in den Details. Alle 922 aktiven Karten haben kurze Beschreibungen ohne Ellipsen und explizite englische Namen.

## Katalog und Seltenheit

399 normale Karten und 75 Synchros wurden hinzugefügt: insgesamt 767 normale sammelbare Kampfkarten und 155 Synchros. Die 239 Kreaturen und deren Teamkarten bleiben erhalten. Die 102 technischen Alteinträge werden weiterhin nicht zu Spielkarten. Keine neuen Grafikdateien.

Jedes Element besitzt direkte Angriffe aller fünf Seltenheiten zu jeweils 1, 2 und 3 E. Kosten werden explizit definiert; Seltenheit bestimmt die Qualität der Basis. Für direkte Basiswerte gilt max(gerundete Rohbasis + Seltenheitsstufe, gerundete Rohbasis × Seltenheitsfaktor). Dadurch steigt der Basiswert auch bei kleinen Zahlen zwischen jeder Stufe, ohne AP nochmals mit Seltenheit zu multiplizieren.

Beispiel vor Element-, Wetter- und Levelmodifikatoren mit AP 5:

| E | Gewöhnlich | Ungewöhnlich | Selten | Episch | Legendär |
|---|---|---|---|---|---|
| 1 | 8 + 5 = 13 | 9 + 5 = 14 | 10 + 5 = 15 | 11 + 5 = 16 | 12 + 5 = 17 |
| 2 | 18 + 10 = 28 | 19 + 10 = 29 | 20 + 10 = 30 | 22 + 10 = 32 | 23 + 10 = 33 |
| 3 | 28 + 15 = 43 | 30 + 15 = 45 | 31 + 15 = 46 | 34 + 15 = 49 | 36 + 15 = 51 |

Das neue Starterdeck hat 12 normale Karten, darunter eine 3-E-Karte und ein für 2 E spielbares Energiesiegel. Dessen Bonus ermöglicht ab dem nächsten Zug 3 E. Alle Starterkarten sind gewöhnlich oder ungewöhnlich. Vorhandene Starter-IDs wurden entsprechend eingestuft; Besitz und Kopien werden nicht gelöscht. Kurzer Stoß hat als günstiger Konter geringere Basis und Schilddurchdringung.

Gewöhnliche Booster: 80 % gewöhnlich, 20 % ungewöhnlich, keine höheren Stufen. Seltene Booster verwenden 25/45/30/0/0; epische 5/20/45/30/0; legendäre 0/10/25/40/25 als Grundgewichte. Die bisherigen garantierten normalen Kartenstufen bleiben erhalten. Ein Pack enthält weiter 4 normale Karten + 1 Synchro. Die bestehende Synchro-Mindeststufenregel bleibt bestehen; nun gibt es wieder echte legendäre Rezepte mit maximal drei Opfern.

Gegnerische normale Kartenpools werden schrittweise freigeschaltet: gewöhnlich unter Level 7, ungewöhnlich ab 7, selten ab 15, episch ab 35, legendär ab 60. Bereits erlangte Spielerkarten bleiben unabhängig davon nutzbar.

## Elementvorlieben und Kontrolle

- Feuer, Gift, Dunkel: häufiger Nachwirkung; deren Nachwirkungen erhalten 20 % verstärkte Basis und 30 statt 25 % AP.
- Natur und Licht: mehr Heilung; Heilbasis +12 %, zusätzlich zu ihren bestehenden H-Wachstumsprofilen. Erde/Stein/Stahl erhalten +8 % Schildbasis.
- Natur, Erde, Stein: zuverlässiges Festsetzen. Alle anderen Elemente erhalten seltene/epische Varianten mit 65/70 % Chance. Festsetzen kostet 2 E, sperrt nur Angriffe und schädigende Synchros für eine eigene Runde; Schutz, Heilung und andere nicht schädigende Aktionen bleiben erlaubt. Danach eine freie Runde Kettenschutz. Reinigung entfernt Festsetzen.
- Eis und Blitz: erhöhte Einfrier-/Betäubungschance, begrenzt auf 70 % bei normalen Karten und 65 % bei Synchros. Betäubung sperrt den gesamten Zug und behält den bestehenden Kettenschutz.
- Wasser bevorzugt Regeneration/Schutz; Luft Ausweichen/Nachziehen; Geist Entzug/Schwächung; Stahl Schutz/Durchdringung; Drache Angriff/Stärkung; Psycho Betäubung/Nachziehen. Andere Effekte bleiben über den vorhandenen Katalog verfügbar.

Neue Synchros verbinden passende Elemente mit diesen Vorlieben; jedes Element hat neue Rezepte aller Seltenheiten. Zwei oder drei Opfer, passende Teamelemente/aktives Monster, Energieverbrauch und Abklingzeit bleiben erhalten. Auch schädigende Betäubungskarten können Material sein; reine Fesselkarten nicht.

Schilddurchdringung wurde präzisiert: 80 % des Trefferschadens umgehen den Schild. Zuvor konnte ein sehr großer Schild trotz Durchdringung den ganzen Treffer absorbieren. Die KI bewertet auch den Abbau von Schildpunkten; das verhindert häufiges Festfahren durch die alte Bewertung „geblockter Schaden ist wertlos“.

## Speicherung und Integration

balance-catalog.js registriert die Erweiterungen im bestehenden DD-Register vor der bestehenden Deck-/Synchro-Migration. Während des frühen Ladens werden definierte bal2-IDs bis zur Registrierung erhalten, danach durch die bestehende Validierung geprüft. Dies verhindert Verlust neuer ausgerüsteter Karten beim Neuladen. element-balance.js ergänzt nur die vorhandene VaelkorBalance-API; Welt-/Spawnfunktionen bleiben erhalten. Neue Kampfeffekte bleiben flüchtige Einheitenwerte. Kein neues Speichersystem, kein Reset.

## Prüfungen und Grenzen

147 gezielte Tests bestanden: alle Arten mit 2 Grundenergie, Kosten/Seltenheitsmatrix, Starterwerte und Starterdeck, Booster aller Stufen, H-Bezeichnung und Formeln, Vorlieben, Festsetzen/Heilen/Schützen/Reinigung/Kettenschutz, Materialverbrauch, alle 155 tatsächlich ausgespielten Synchros, alte und neue Spielstände, Englisch/Deutsch, Weltbewegung und bestehende Kartenwechsel. Der allgemeine Karten-Audit findet keine streng dominierten direkten Angriffe innerhalb seiner Vergleichsgruppen.

Zusätzlich 180 reproduzierbare Testkämpfe mit der echten Kartenanwendung, Zugauflösung und KI auf Level 5/20/50/100 über alle 15 Elemente. Normale und seltene Decks wurden in beiden Rollen getestet. 178 Kämpfe endeten innerhalb von 40 Runden; zwei defensive Level-100-Spiegelduelle erreichten das Simulationslimit. Das ist kein eingeführtes Spiellimit. Der starke Erstzugvorteil in identischen Spiegelduellen bedeutet, dass diese Läufe keine belastbare allgemeine Gewinnratenmessung sind. Element-/Wetter-/Levelmodifikatoren wurden zur Isolation der Karten neutralisiert. Menschliche Entscheidungen, echte Geräte-FPS und Handy-Browser-Darstellung wurden nicht getestet. Defensive Endspielkonstellationen benötigen weiteres Feinbalancing anhand echter Partien.

Maschinenlesbare Ergebnisse: reports/balance-audit.json, reports/stat-growth.json und reports/card-balance-battles.json.

Der ungefilterte Gesamtlauf wurde zugunsten des gezielten Release-Satzes beendet; die langlaufende Datei tests/wildlands-runtime.test.cjs wurde dabei nicht abgeschlossen. Die gezielten Bewegungs-, Kartenwechsel- und Speicherprüfungen des Release-Satzes sind bestanden.
