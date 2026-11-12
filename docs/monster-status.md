# Einheitliche Statuswerte und Kartenformeln

Kampf und Monsterübersicht teilen LP/AP/SP/HK/E mit dem gelieferten Herz-, Schwert-, Schild-, Plus- und Blitzmotiv. Ein transparenter, separierter 3×2-Atlas wird zentral in card-assets.js über feste quadratische, einzeln begrenzte SVG-Ausschnitte verwendet. Keine eingebrannten Zahlen. Statussymbole werden nur einmal als Bild geladen und wiederverwendet.

## Berechnung

Direkte Angriffe behalten Kartenbasis + Energiefaktor × AP sowie bestehende Element-/Level-/Wettermodifikatoren. Schild- und Heilkarten verwenden nun ebenfalls eine bereits mit Seltenheit verrechnete Basis plus Energiefaktor × SP beziehungsweise HK. Seltenheit multipliziert den Statusanteil nicht zusätzlich. Teilwirkungen von Regeneration, Reinigung und Reflexion behalten ihre bisherigen Faktoren.

Synchro-Heilung, -Schutz und -Regeneration verwenden eine feste Basis der jeweiligen Karte und 0,5 × Energiekosten × HK/SP. Ihre Heil-/Schutzbasis hängt nicht mehr vom Angriffswert, gegnerischen Element oder dem errechneten Angriffsschaden ab. Lebensentzug verwendet HK (normal: eigene Kartenbasis + 0,4 × Energiekosten × HK; Synchro: deren HK-Unterstützung) und heilt höchstens den tatsächlich verursachten Schaden; ohne verursachten Schaden keine Heilung. Die Beschreibungen, Detailtexte und normale KI-Bewertung berücksichtigen dies. Kleine Zusatzschilde verwenden ebenfalls einen reduzierten SP-Faktor. Bestehende Energieboni bleiben direkt additiv, ab der folgenden Runde und auf +3 begrenzt; weder HK noch SP verstärken Energie.

## Kampfstatus

Jede Kampfeinheit enthält einen flüchtigen Snapshot ihrer fünf normalen Werte. Die Anzeige setzt sich aus Grundwert und Differenz zum aktuellen Kampfwert zusammen, beispielsweise AP 5+3, LP 72+12 oder E 5+1. Verletzungen verändern nicht den normalen LP-Wert; aktuelle/restliche LP stehen separat am Lebensbalken. Verfügbare Zugenergie bleibt bei der Hand sichtbar. Aufgebaute Schildpunkte verändern SP nicht und stehen ausschließlich im etwas transparenteren Portrait-Overlay. Die alte Blockplakette, zusätzliche Schildüberschrift und Schildleiste entfallen. Statusänderungen werden nicht in die Kreatur zurückgeschrieben; neue Kampfeinheiten starten wieder mit normalen Werten.

## Monsterübersicht

Native aufklappbare Details für Team und Reserve, sowohl im Welt-Monstermenü als auch im Karten-Monstermenü. Die gemeinsame Statuszeile bleibt zugeklappt sichtbar; beim Antippen erscheinen aktueller Wert, nächstes Zuwachslevel, dann erreichter Wert und regelmäßiger Levelabstand. LP wachsen weiterhin wie bisher jedes Level. Element-/Art-/Rollenprofile, Shiny, Entwicklung und Zucht bleiben unverändert; angezeigt werden die tatsächlich berechneten Werte.

## Prüfung

Gezielte Laufzeittests für seltenheitsunabhängige Statusfaktoren, Synchro-Unterstützung ohne AP-Abhängigkeit, HK-Lebensentzug inklusive Nullschaden, reale Stärkung/Entzauberung/Energiekarten, unveränderte Grundwerte bei verbrauchten LP/E und aktivem Schild, Bonusende bei neuer Kampfeinheit, beide Monsterübersichten, echte Kampfanzeige und die zentralen Bildausschnitte. Bestehende Wachstums-, Zucht-, Tutorial-, Booster-, Karten-, Speicher-, Kartenwechsel- und Animationsprüfungen werden mit ausgeführt.

Statische SVG-Vorschau der fünf zugeschnittenen Symbole visuell geprüft. Keine echte Handy-/Browser-Sichtprüfung; insbesondere exakte Vollbildproportionen bleiben auf einem Gerät zu prüfen. Kein neuer Speicherbereich und keine Spielstandmigration erforderlich.

Ergebnis: 122 gezielte Tests bestanden (vollständige Prüfrunde mit 121 Tests plus anschließend ergänzter Atlas-Test; betroffene Prüfungen nach der letzten Änderung erneut bestanden). Karten-/Kreaturenzahl unverändert: 239 Kreaturen, 368 normale Kampfkarten, 80 aktive Synchros. Keine manuelle Browserprüfung.
