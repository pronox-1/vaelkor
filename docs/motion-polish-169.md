# Bewegungspatch169

Der Patch verändert gezielt den vertikalen Spieleranker und die Reittierfolgen. Die32 NPC-Optiken und ihre Innen-/Außenbilder bleiben identisch zu168; auch die seitlichen Spielerbilder bleiben identisch. Die Regression verwendet dafür festgehaltene SHA256-Werte.

Der Spieler behält alle bestehenden Vorder-/Rückbilder. Statt die unterschiedliche Bildhöhe an den Füßen auszurichten, gleicht der Zeichenanker die sichtbare Kopfhöhe gegen das Standbild aus. Maßstab und Schrittfolge bleiben unverändert.

Alle sechs Reittiere erhalten neue vollständige Vorder-/Rückfolgen: je acht Schrittphasen und eine separate Standpose. Die Figuren bleiben am Kopf ausgerichtet und teilen feste Maßstäbe und Sattelanker. Ein576×1152-Atlas pro Tier liegt unter2,7MB dekodierter Größe. Sichtbare Tiere werden einschließlich der vertikalen Ansichten vorgeladen; unbenutzte alte Reittieratlanten werden nicht zusätzlich angefordert.

Die vorhandenen seitlichen Posen bleiben in zyklischer Reihenfolge, beginnen nun aber mit dem angewinkelten Vorderbein: bisherige Bilder1,2,3,4,5,6,7,0. Auch die Kontaktanzeige des Mannequins berücksichtigt diesen Startversatz. Das850ms-Mindestintervall aus168 bleibt bestehen. Beim Esel wurde zusätzlich der eingebackene helle Hintergrund entfernt; seine alten Quelldateien bleiben erhalten.

Neue Quellbilder und Zuschnitt: assets/mount-vertical-169/originals und tools/build-mount-vertical-169.cjs. Zuschnitt nach zusammenhängenden ganzen Figuren; keine fremden Füße oder synthetischen Beinsegmente. Die gemeinsame Hilfsdatei sprite-components-169.cjs erkennt unregelmäßige Vorlagenzeilen.

Prüfungen: tatsächliche Eingabe nach oben/unten auf einem Reittier, alle acht Phasen und Rückkehr zum Stand; feste Spieler-Kopfhöhe für alle24 Richtungsreihen; native Canvas-Sichtprüfung mit864 Reittier-/Reiteransichten und384 Spieleransichten. Eine echte Smartphone-/Browser-GPU-Prüfung ist in dieser Umgebung nicht verfügbar. Die Kontaktanzeige ist ein Modell und garantiert keine pixelgenau rutschfreien Hufe.
