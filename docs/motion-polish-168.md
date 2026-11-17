# Bewegungspatch168

Die vorangegangene Korrektur167 behandelte doppelte Positionsproben, ersetzte aber keine kaum unterscheidbaren Bilder.168 ergänzt echte vollständige Stand-/Gegenschrittposen.

- 32 NPC-Optiken erhalten getrennte Innen- und Außensätze; jede Ansicht enthält Stand, linken und rechten Schritt in vier Richtungen. Die rechte Seitenansicht spiegelt die vollständige linke Figur. Kleidung, Köpfe und Accessoires sind anhand der bestehenden Figuren erstellt.
- Alle zwölf Spieleroptiken erhalten neue Außenposen für vorne/hinten. Die genehmigten seitlichen Spielerbilder und Innenposen bleiben unverändert. Die Schrittfolge bleibt Stand–links–Stand–rechts, beginnt/endet im Stand.
- Unregelmäßige Vorlagenzeilen werden anhand der zusammenhängenden ganzen Figuren erkannt. Kein festes Raster schneidet Hüte, Körper oder Füße ab. Ein gemeinsamer Maßstab pro Richtungsreihe und eine feste Bodenlinie vermeiden Größenwechsel. Es werden keine fremden Füße auf Figuren montiert.
- Reittiere behalten ihre eigenen acht Ganzkörper-Laufphasen. Bei hoher Reisegeschwindigkeit dauert ein kompletter Schrittzyklus mindestens850ms. Bei langsamer Bewegung bleibt die distanzgebundene Abfolge bestehen. Reiterbewegung und Beinfolge lesen denselben begrenzten Animationsfortschritt.
- Je zwei NPC-Optiken teilen einen960×700-Atlas, unter2,7MB dekodiert. Nur sichtbare/erwartete Optiken werden geladen; bestehende begrenzte Bild- und Ausschnittspeicher bleiben bestehen.

Quellen: human-walk-168-sources.json; alle Vorlagen bleiben im Quellarchiv erhalten. Builder: tools/build-human-walk-168.cjs. Die Bildausrichtung folgt denselben Menschen-Mannequins; es gibt keine separaten NPC-Animationsuhren.

Native Canvas-Vergleichsbilder und Eingabesimulationen prüfen konkrete Figuren, Richtungen, Schritte und Standübergänge. Sie ersetzen keine Smartphone-/Browser-GPU-Messung und beweisen keine perfekte anatomische Bewegung.
