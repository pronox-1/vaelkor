# Arena und Teamwechsel

Die vorhandene südliche Karte `property:gruenwald` bleibt mit ihrer ID und ihrem Speicherzustand erhalten. Links steht die Arena; ihr Innenraum verwendet vorhandene Waffenladen-Bauteile mit freier Kampffläche. Keine Gegner werden automatisch hinzugefügt.

Teamumbauten (Aktiv wählen, Einlagern, Auslagern) sind außerhalb eines Kampfes nur nahe einem tatsächlichen Heilpunkt oder im Arena-Innenraum erlaubt. Dieselbe Abfrage schützt Monster-Menü und Inventar. Eine spätere Ausnahme gehört in `VaelkorAdventure102.teamAccess`, nicht in einen weiteren Team-Editor.

Ein freiwilliger Kampfwechsel kostet die volle maximale Energie des abgebenden Monsters, einschließlich laufendem Energiebonus, und beendet den Zug. Automatische Ersatzwechsel nach Kampfunfähigkeit bleiben erhalten.

Kartenboni und aktiver Schild werden beim Kampfende entfernt. Jeder neue Kampf verwendet frische Einheiten und Grundwerte; angeborene SP bleiben erhalten, aktiver Schild ist null. Weltweite Tranklaufzeiten und geerbte Werte werden nicht entfernt.
