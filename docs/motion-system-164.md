# VAELKOR: gemeinsame Mannequin-Basis

`motion-system.js` steuert zwei Mannequins: Mensch (zwei Beine) und Reittier (vier Beine plus Sattelpunkt). Beide verwenden Stand → linker Schritt → Stand → rechter Schritt. Außen- und Innenansicht haben eigene Optiken und feste Größen.

## Verantwortlichkeiten

1. Bewegung liefert reale Weltposition, Zeitstempel, Blickrichtung und Bewegungsabsicht an `controller.advance`. Der Controller misst die zurückgelegte Strecke. Gleiche Zeitstempel sind idempotent; Stillstand, Teleports und Szenenwechsel setzen die Pose zurück. Tatsächliche Translation bestimmt beim Laufen die Blickrichtung.
2. Die Zeichenwarteschlange aktualisiert alle sichtbaren Mannequins einmal vor dem Zeichnen. `controller.read` verändert nichts. Neutrale Bildabfragen und Sattel-/Kopfabfragen haben keinen Zugriff auf die Laufuhr.
3. `motion-skins.js` ordnet Optiken semantischen Posen zu. Es existiert eine aktive Auflösung, statt verschachtelter alter Frame-Selektoren. Vollständige Originalbilder bleiben erhalten.
4. `drawLayers` unterstützt separat gezeichnete Körperteile mit benannten Gelenken, Pivot, Größe und Ebenenreihenfolge. Bestehende flache Bilder werden nicht automatisch in Körperteile zerlegt. Die neutralen Mannequins sind Prüfmodelle und werden nicht als Ersatzbeine über vorhandene Figuren gezeichnet.

## Neue Optik auflegen

Eine Sprite-Optik benötigt je Ansicht und Richtung `stand`, `leftStep`, `rightStep`. Alle Bilder einer Ansicht brauchen denselben Maßstab und denselben Boden-/Körperanker. Quellen, Ausschnitte und Anker stehen in `assets/motion-164/skins.json`; die Werkstatt exportiert die gewählte Zuordnung.

Eine segmentierte Optik kann stattdessen pro Richtung eine Liste eigener PNG-Teile definieren:

```json
{"kind":"human","layers":{"down":[
  {"image":"torso","joint":"chest","rect":[0,0,80,100],"pivot":[0.5,0],"width":0.5,"height":0.3,"z":2},
  {"image":"left-leg","joint":"leftKnee","endJoint":"leftFoot","rect":[0,0,24,80],"pivot":[0.5,0],"width":0.12,"height":0.18,"z":1}
]}}
```

Weitere Gelenke: `root`, `head`, `neck`, `pelvis`, `leftShoulder`, `rightShoulder`, `leftHand`, `rightHand`, `leftKnee`, `rightKnee`, `leftFoot`, `rightFoot`. Beim Reittier: `head`, `neck`, `chest`, `pelvis`, `saddle` sowie `frontNearKnee/Foot`, `frontFarKnee/Foot`, `rearNearKnee/Foot`, `rearFarKnee/Foot`.

Teile müssen passend gezeichnet sein; der Renderer erfindet keine Anatomie. Die aktuelle Werkstatt zeigt die neutralen Modelle und die vorhandenen vollständigen Sprite-Optiken. Der Layer-Renderer ist implementiert und getestet; bestehende Bildvorlagen sind noch keine segmentierten Layer-Optiken.

## Prüfung

Die Werkstatt bietet alle vorhandenen Profile, vier Richtungen, beide Ansichten, Einzelposen, Loslaufen/Anhalten und optional Gelenke über der Optik. Fehlende oder identische Quellposen werden ausgewiesen. Der Quellen-Audit ist strukturell: Unterschiedliche Ausschnitte beweisen keine saubere künstlerische Bewegung. Vier ältere Innenraum-NPCs haben weiterhin nur Standbilder. Für sie fehlen echte Schrittvorlagen.

Browser-/Handy-Sichtprüfung ist in dieser Arbeitsumgebung nicht verfügbar. Automatische Zustands-, Integrations- und native Canvas-Prüfungen ersetzen diese Sichtprüfung nicht.
