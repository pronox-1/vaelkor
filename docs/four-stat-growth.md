# AP, SP, HK und Energie: neues Wachstum

## Regeln

Basisintervalle sind fünf Level für Angriffspunkte (AP), Schutzpunkte (SP) und Heilkraft (HK) sowie zehn Level für Energie (E). Erste Zuwächse sind je Art deterministisch gestaffelt. Nach dem ersten Zuwachs gilt für jeden Wert dessen festes Intervall. Später können mehrere Zuwächse auf ein Level fallen. Ein normaler Zuwachs erhöht den Grundwert um genau einen Punkt; Shiny und Entwicklung wirken wie bisher auf AP und jetzt auch SP/HK.

Elementvorteile: Feuer/Dunkel bevorzugen AP gegen HK; Gift/Drache AP gegen SP; Wasser/Licht/Psycho HK gegen AP; Natur/Geist HK gegen SP; Erde/Stein/Stahl SP gegen HK; Eis SP gegen AP; Blitz/Luft Energie gegen SP. Striker erhalten einen weiteren AP-Vorteil gegen langsameres SP-Wachstum, Wächter SP gegen AP. Bei etwa einem Viertel der Arten kommt ein deterministischer individueller Tausch hinzu. Alle Tauschschritte sind −1 Level für einen Wert gegen +1 Level für einen anderen. Grenzen: AP/SP/HK-Intervalle 3–7, Energie 8–12; im aktuellen Katalog liegen Energieintervalle bei 9–11. So können einzelne Vorteile bis −2 Level reichen, ohne alle Werte einer Art gleichzeitig zu beschleunigen.

Aktueller Katalog: 239 Arten. Auf Level 50 liegen normale AP bei 10–23, SP bei 10–21, HK bei 10–21 und E bei 7–8. Auf Level 100 AP 17–40, SP 17–38, HK 17–37, E 11–14. Individuelle Zucht-, Starter-, Shiny- und Entwicklungsboni sind in diesen Bereichen nicht enthalten. Vollständige Werte und nächste Zuwachslevel: reports/stat-growth.json und .csv. Die HTML-Prüfseite zeigt alle vier Intervalle je Art.

## Kampf

AP greift weiterhin wie zuvor in direkten Schaden ein. Normale Schildkarten verwenden nun Kartenbasis + SP × Energiekosten; Heilkarten Basis + HK × Energiekosten. Seltenheitsfaktoren bleiben erhalten. Regeneration, Reflexion und Reinigung verwenden dieselbe zentrale Support-Funktion mit den bestehenden Teilfaktoren. Heilende und schützende Synchros behalten ihren ursprünglichen schadensabhängigen Anteil und erhalten zusätzlich 50 % HK beziehungsweise SP je Energiekosten. Vorschau und tatsächliche Anwendung rufen dieselben Funktionen auf. Schaden über Zeit bleibt bei 25 % AP; Lebensentzug bleibt ein Anteil des tatsächlichen Schadens.

Beispiel: gewöhnlicher 1-E-Schild mit 8 SP ergibt 6 Basis + 8 SP = 14 Schild. Eine gewöhnliche 1-E-Heilung mit 6 HK ergibt 5 + 6 = 11 Heilung. Hohe AP verstärken diese Karten nicht mehr nebenbei. Bestehende Schild-Obergrenzen, temporärer Angriffsbonus, Ziehgrenzen und Statusregeln bleiben bestehen.

Energie pro Runde ist Grundenergie 3 + Energie-Anlage + Levelzuwachs + temporärer Energiebonus. Der temporäre Bonus bleibt auf +3 begrenzt. Die bisherige Gesamtgrenze neun entfällt für diese Berechnung, damit spätere Levelpunkte wirken. Beide Seiten verwenden beim Kampfstart und Rundenwechsel dasselbe System. Tutorialkämpfe behalten ihre kontrollierten Energie- und Schadenswerte. Ein Wechsel füllt die laufende Energie nicht neu auf.

## Vererbung und alte Spielstände

Das bestehende optionale Monsterfeld vkGenesA1 wird weiterverwendet; neue Kinder tragen Trait-Version 2 mit zusätzlichen SP-/HK-Anlagen. Diese sind wie AP auf −2 bis +3 begrenzt und werden aus den Anlagen der Eltern berechnet, nicht aus trainierten Levelwerten. LP- und E-Anlagen behalten ihre bisherigen Grenzen. Alte Eltern/Kinder ohne die neuen Felder verwenden null SP-/HK-Anlage. LP, Verletzungen, XP, Inventar, Karten und Hauptspeicherformat Version 2 bleiben erhalten. Die Wachstumswerte werden aus Art und Level berechnet und müssen nicht nachträglich als Punkte vergeben werden; dadurch gibt es keine Doppelvergaben beim Laden.

Monsterübersicht zeigt AP/SP/HK/E und nächste Zuwachslevel. Im Kampf werden SP, HK und intrinsische Energie zusätzlich angezeigt. Levelmeldungen nennen tatsächlich gewonnene Werte. Hilfe und beide Tutorials erklären die neuen Regeln; das Zuchtfenster trennt Anlagen von trainierten Werten.

## Kartenoptik

Eine ältere, spezifischere Bibliotheksregel setzte noch Padding und einen Zwei-Pixel-Rand. Eine gezielte gemeinsame Regel entfernt diese Innenabstände und Rahmen in Deck und Kampf. Hover-/Antippverschiebungen sind ebenfalls ausgesetzt. Spielbarkeit hebt ausschließlich die benötigte Energieanzeige hervor, goldfarben bei normalen Karten und cyan bei Synchros. Der Ornamentrahmen erhält keinen zusätzlichen Filter oder Glanz. Während des Abwerfens leuchtet keine Energieanzeige, auch wenn die Karte zum Abwerfen anklickbar bleibt.

## Prüfung

110 gezielte automatisierte Tests bestanden. Neue Prüfungen: alle 239 Arten über 160 Level für alle vier Werte und exakte nächste Zuwachslevel; Element-/Rollen- und Artunterschiede; Schild-/Heilvorschau gegen echte Anwendung; Regeneration und Reflexion; Synchro-Schild/Heilung/Regeneration; tatsächliche Energieauffrischung für Spieler und Trainer oberhalb neun; SP-/HK-Vererbung über 1.000 Generationen; Standardwerte alter Gene; keine Kartenglut außerhalb der Energieanzeige und kein falsches Leuchten beim Abwerfen. Bisherige Karten-, Booster-, Migrations-, Tutorial-, AP-, Zucht-, Bewegungs-, Welt- und Speicherprüfungen laufen weiter.

Katalogaudit: 368 Kampfkarten, 80 Synchros, 239 Teamkartenvarianten; kein teurerer Direktangriff gleichen Elements und gleicher Seltenheit mit höchstens dem Schaden einer günstigeren Karte im neutralisierten Referenzvergleich. Der Audit setzt AP/SP/HK auf je 10 und ist keine Gewinnraten-Simulation. Keine echte PC-/Handy-Browserprüfung in dieser Umgebung.
