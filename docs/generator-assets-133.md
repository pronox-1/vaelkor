# Generator-Ergänzungen 133

Drei neue Template-Seiten mit 36 einzeln freigestellten Objekten. Die Originalseiten liegen unverändert unter `assets/templates-133/`; die verwendeten transparenten Ausschnitte unter `assets/generator/`. `js/world/generator-catalog.js` enthält eindeutige IDs, Ansicht, Einsatzorte, Maße, Ausschnittkoordinaten und Prüfsummen.

## Innenansicht: Wohnen und Arena

Wohnhäuser und intakte Zelte: Kochherd, Küchenarbeitsbank, Wäscheschrank, Nähkorb, Esstisch, Vorratsschrank, Waschstand und Schreibpult. Arena: Trainingspuppe, Übungsschwerter, Zielscheibe und Pokalsockel. Neue modulare Räume wählen bis zu zwei Ergänzungen deterministisch nach Raumschlüssel; belegte Flächen und die zentrale Durchgangsachse bleiben frei. Die kompletten bestehenden Startstadt-Raumbilder bleiben erhalten.

## Außenansicht: Gebäude und Stadt

Waldhaus, Waldhüterhütte, Wegkapelle und Reisewagen sind neue Außenvarianten für bereits vom Landschaftssystem erzeugte Gebäudeplätze. Sie erhalten die bestehenden Haus-, Kirchen- beziehungsweise Zelt-Innenräume und einen angeschlossenen Eingang. Bestehende Häuser werden nicht ersetzt. Weitere Stadtobjekte: Anschlagtafel, Wassertränke, Handkarren, Blumenkasten, Steinmauer, Palisade, Marktstand und Lagerfeuer. Mauern verwenden die neuen Steinsegmente in unverzerrten Wiederholungen.

## Außenansicht: Natur und Rastplätze

Moosstamm, hohler Stumpf, Farnfelsen, Beerenbusch, Säulenrest, Wegstein, Vorratswagen, Gepäckrolle, Schilf, Oasenpalme, Ruinenbogen und Waldschrein. Schilf ist auf feuchte Biome begrenzt, die Oasenpalme auf Wüste. Neue Objekte bleiben neben Wegen, Ausgängen, Türen und Belohnungen. Jeder Platzierungsschritt wird auf Erreichbarkeit geprüft.

## Weitere sinnvolle Erweiterungen

Später passen eine Waldmühle an Flüsse, ein Steinbruch bei Felsbiomen, ein Wachturm an Nebenwegen sowie ein Oasenhandelsposten in die vorhandene Architektur. Dafür fehlen noch passende Außen-/Innenraum-Paare und Spielinteraktionen; diese sind hier nicht als leere Gebäude eingebaut.

## Katalog

| ID | Ansicht | Erlaubte Kontexte |
|---|---|---|
| gen133-interior-stove | indoor | house, tent |
| gen133-interior-kitchen-bench | indoor | house, tent |
| gen133-interior-linen-shelf | indoor | house, tent |
| gen133-interior-sewing-basket | indoor | house, tent |
| gen133-interior-dining-table | indoor | house, tent |
| gen133-interior-pantry | indoor | house, tent |
| gen133-interior-washstand | indoor | house, tent |
| gen133-interior-writing-desk | indoor | house, tent |
| gen133-interior-training-dummy | indoor | arena |
| gen133-interior-practice-rack | indoor | arena |
| gen133-interior-archery-target | indoor | arena |
| gen133-interior-trophy | indoor | arena |
| gen133-town-cottage | outdoor | forest, jungle, swamp |
| gen133-town-ranger-hut | outdoor | forest, jungle, swamp |
| gen133-town-chapel | outdoor | forest, jungle, swamp |
| gen133-town-caravan | outdoor | forest, jungle, swamp |
| gen133-town-noticeboard | outdoor | town, property |
| gen133-town-trough | outdoor | town, property |
| gen133-town-produce-cart | outdoor | town, property |
| gen133-town-planter | outdoor | town, property |
| gen133-town-stone-wall | outdoor | town, property |
| gen133-town-palisade | outdoor | town, property |
| gen133-town-market-stall | outdoor | town, property |
| gen133-town-campfire | outdoor | town, property |
| gen133-nature-fallen-log | outdoor | forest, jungle, swamp |
| gen133-nature-hollow-stump | outdoor | forest, jungle, swamp |
| gen133-nature-fern-rocks | outdoor | forest, jungle, swamp |
| gen133-nature-berry-bush | outdoor | forest, jungle, swamp |
| gen133-nature-broken-column | outdoor | forest, jungle, swamp |
| gen133-nature-waystone | outdoor | forest, jungle, swamp |
| gen133-nature-supply-cart | outdoor | forest, jungle, swamp |
| gen133-nature-bedroll | outdoor | forest, jungle, swamp |
| gen133-nature-reeds | outdoor | swamp, jungle |
| gen133-nature-oasis-palm | outdoor | desert |
| gen133-nature-ruined-arch | outdoor | forest, jungle, swamp |
| gen133-nature-woodland-shrine | outdoor | forest, jungle, swamp |
