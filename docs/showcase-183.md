# VAELKOR Vorführversion183

## Start
Die aktuelle Webversion ist unter https://vaelkor-gruenwald-download-v76.dearmyna34.chatgpt.site erreichbar. Für die ZIP-Version das gesamte Archiv entpacken und index.html öffnen; alle Unterordner zusammenlassen. Vollbild kann über das Symbol oben geöffnet und geschlossen werden. Vorhandene Spielstände bleiben erhalten; vor einer Vorführung kann über die Spieleinstellungen eine Sicherung exportiert werden.

## Geprüfter Stand
Karten einschließlich934 eindeutiger DE/EN Namen, Synchro-Rahmen, LP-Übernahme und Schild-Reset; Städte/Wildnis und Nebenwege; NPC- und Reittiersysteme; Zucht/Quests/Arena und Inventar bleiben Bestandteil des vorhandenen Spiels. Freigegebene Bewegungs- und Bilddateien sind unverändert.

## Performance und Stabilisierung
Katalog-Vorschauen haben einen auf1024Einträge begrenzten Cache, der bei Metadatenänderungen neu rechnet. Kampf- und Teamkarten bleiben live. Gleiche Karten-HTML-Schlüssel liegen in einer WeakMap statt in DOM-Attributen. Reine Textübersetzungen und unsichtbare Oberflächen starten keine Karten-Neudekoration. Sichtbare Kampfportraits bleiben vor optionalem Vorladen geschützt; fehlerhafte Bildquellen werden abgefangen.

CPU-Vergleich mit dem vorherigen Quellstand: identischer Vorschau-HTML-Hash, ungefähr64% weniger Rechenzeit bei wiederholten Katalogdurchläufen im Node-Test. Das ist keine Smartphone-FPS-Messung. Zusätzlich6 Übergänge,4 beschleunigte Spieltage und24 weitere Karten mit Speicher-/Warteschlangengrenzen geprüft. Testbilder bleiben absichtlich unvollständig, um Zeitüberschreitungen zu prüfen. Keine Renderfehler oder Budgetüberschreitungen; echte Netzladezeiten/GPU werden damit nicht gemessen.
