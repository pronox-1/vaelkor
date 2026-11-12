
(function(){'use strict';
const KEY='vaelkor-ui-language-v1';
const phrases=[
['Monster & Karten','Monsters & Cards'],['Vollbild','Fullscreen'],['Wildnis','Wildlands'],['Team & Lager','Team & Storage'],['Monsterbuch','Monster Codex'],['Zucht','Breeding'],['Basis','Base'],['Quests','Quests'],['Dein Abenteuer','Your Adventure'],['Dein Team','Your Team'],['Monsterlager','Monster Storage'],['Team & Monsterlager','Team & Monster Storage'],['Reisen & Prestige','Travel & Prestige'],['Prestige starten','Start Prestige'],['Spielstand komplett zurücksetzen','Reset All Progress'],['Inventar','Inventory'],['Am Brunnen heilen (nur in der Nähe)','Heal at Fountain (nearby only)'],['Monsterzucht','Monster Breeding'],['Ausbau deiner Basis','Upgrade Your Base'],['Abenteuer & Erfolge','Adventures & Achievements'],['Wähle deinen Starter!','Choose Your Starter!'],['Monsterkampf!','Monster Battle!'],['Wildes Monster','Wild Monster'],['Dein Monster','Your Monster'],['Waldwinkel-Shop','Woodland Shop'],['Shop-Kategorien','Shop Categories'],['Sprache','Language'],['Deutsch','German'],['Englisch','English'],['Schritte','Steps'],['Schritt','Step'],['Zone','Zone'],['Zonen','Zones'],['Trainerkampf','Trainer Battle'],['Wilde Begegnung','Wild Encounter'],['Trainer besiegt!','Trainer defeated!'],['Trainer wartet in der Mitte','Trainer awaits in the center'],['Gegnerlevel ab','Enemy level from'],['BIOM-BOSS','BIOME BOSS'],['Vorherige Zone','Previous Zone'],['Nächste Zone','Next Zone'],['Zur Basis teleportieren','Teleport to Base'],['Seelensteine','Soul Spheres'],['Heiltränke','Healing Potions'],['Mega-Tränke','Mega Potions'],['Team-Tränke','Team Potions'],['Teleporter','Teleporters'],['Truhen','Chests'],['EXP-Tränke','EXP Potions'],['klein','small'],['mittel','medium'],['groß','large'],['Noch keine Monster im Lager.','No monsters in storage yet.'],['Kein Monster verfügbar.','No monster available.'],['Als aktiv wählen','Set as Active'],['Ins Lager','Move to Storage'],['Ins Team holen','Add to Team'],['verkaufen','sell'],['Aktiv','Active'],['Dunkelform','Dark Form'],['Entwickeln','Evolve'],['vorhanden','available'],['Ausbauen','Upgrade'],['Belohnung abholen','Claim Reward'],['Abgeholt','Claimed'],['Noch offen','Not Available Yet'],['Belohnung','Reward'],['Münzen','Coins'],['Kaufen','Buy'],['Öffnen','Open'],['Schließen','Close'],['Wähle eine Kategorie.','Choose a category.'],['Sammle Münzen durch Kämpfe und Abenteuer.','Earn coins through battles and adventures.'],['Seltenheits-Booster','Rarity Boosters'],['Booster ansehen und öffnen','View and Open Boosters'],['Gewöhnlich','Common'],['Selten','Rare'],['Episch','Epic'],['Legendär','Legendary'],['gewöhnlich','common'],['selten','rare'],['episch','epic'],['legendär','legendary'],['Angriffe & Zauber','Attacks & Spells'],['Gesammelte Karten','Collected Cards'],['Im Besitz','Owned'],['Karten im Besitz','Cards Owned'],['Karten','Cards'],['Karte','Card'],['Deck','Deck'],['Angriffe','Attacks'],['Zauber','Spells'],['Elementkarten','Element Cards'],['Neutrale Karten','Neutral Cards'],['Monster','Monsters'],['Kreaturen','Creatures'],['Handlimit','Hand Limit'],['Hand','Hand'],['Energie','Energy'],['Runde','Round'],['Schaden','Damage'],['Heilung','Healing'],['Schutz','Shield'],['Schild','Shield'],['Gegner','Enemy'],['GEGNER','ENEMY'],['DEIN MONSTER','YOUR MONSTER'],['Gegnerabsicht','Enemy Intent'],['Monster übrig','Monsters Remaining'],['Team wechseln','Switch Team'],['kampffähig','Ready to Fight'],['Öffnen','Open'],['Zug beenden','End Turn'],['Aufgeben','Surrender'],['Kampfprotokoll','Battle Log'],['Zugende','End of Turn'],['Karten abwerfen','Discard Cards'],['Nicht genug Energie','Not Enough Energy'],['Jetzt spielbar','Playable Now'],['Kein aktives Monster','No Active Monster'],['Benötigt','Requires'],['Betäuben','Stun'],['betäuben','stun'],['Angriff schwächen','Weaken Attack'],['Schild durchdringen','Pierce Shield'],['Ausweichen','Dodge'],['Reflektieren','Reflect'],['Angriff für diesen Kampf','Attack for this Battle'],['Energie je Runde für diesen Kampf','Energy per Round for this Battle'],['Heilen','Heal'],['heilen','heal'],['ziehen','draw'],['SIEG','VICTORY'],['NIEDERLAGE','DEFEAT'],['Wetter','Weather'],['Arten entdeckt','Species Discovered'],['Shinys im Besitz','Shinies Owned'],['dunkle Evolutionen','Dark Evolutions'],['Stufe','Level'],['Level','Level'],['Wächter','Guardian'],['Wilde Monster','Wild Monsters'],['Besiege alle','Defeat all'],['Monster!','Monsters!'],['Zucht läuft','Breeding in Progress'],['Elternteil','Parent'],['Nachwuchs wird ausgebrütet','Egg is Hatching'],['Kosten','Cost'],['Gefangenes Monster','Captured Monster'],['Übungs-Siegel','Training Sigil'],['Platzhalter','Placeholder'],['Bonuskarte','Bonus Card'],['TEAM · BONUSKARTE','TEAM · BONUS CARD'],['Teamkarten','Team Cards'],['Deck-Sets','Deck Sets'],['Sichern','Save'],['Laden','Load'],['Leer','Empty'],['Hinzufügen','Add'],['Entfernen','Remove'],['Zur Welt','Back to World'],['Auswahl','Selection'],['Bestätigen','Confirm'],['Abbrechen','Cancel'],['Zurück','Back'],['Weiter','Continue'],['Sieg','Victory'],['Verloren','Lost'],['Fangen','Catch'],['Fangchance','Capture Chance'],['Rückkehr','Return'],['Starten','Start'],['Zur Welt zurück','Back to World'],['Abenteuer','Adventure'],['Element','Element'],['Neutral','Neutral'],['Feuer','Fire'],['Wasser','Water'],['Natur','Nature'],['Blitz','Lightning'],['Strom','Electric'],['Stein','Stone'],['Erde','Earth'],['Eis','Ice'],['Dunkel','Dark'],['Licht','Light'],['Geist','Spirit'],['Luft','Air'],['Gift','Poison'],['Stahl','Steel'],['Drache','Dragon'],['Chaos','Chaos'],['Zeit','Time'],['Raum','Space'],['Kampf','Fighting'],['Psycho','Psychic'],['Fee','Fairy'],['Pflanze','Plant']
];
const paragraphs=[
['Steuerung: WASD / Pfeiltasten oder die Buttons · Im hohen Gras lauern wilde Monster','Controls: WASD / arrow keys or the buttons · Wild monsters lurk in tall grass'],
['In der Arena wartet ein Trainer mit 1 bis 4 Monstern. Besiege alle Monster, um zu gewinnen. Besiege ihn, um zur nächsten Zone zu reisen. Auf Level 10, 20, 30 … beginnt ein neues Biom mit einem besonderen Ort.','A trainer with 2 to 4 monsters awaits in the arena. Defeat the entire team to win and unlock the next zone. A new biome begins every 10 trainers!'],
['Nach dem Trainersieg die Medaille in der Arena antippen, um weiterzureisen.','After defeating the trainer, tap the medal in the arena to travel onward.'],
['Am blauen Heilbrunnen im Dorf wird dein Team kostenlos geheilt. Tränke kannst du auch außerhalb von Kämpfen im 🎒 Inventar verwenden.','The blue village fountain heals your team for free. You can also use potions during battle.'],
['Wähle ein aktives Kampfmonster. Bis zu 4 Monster können im Team sein, alle weiteren wohnen im Lager.','Choose an active fighter. Your team can hold up to 4 monsters; all others stay in storage.'],
['Wähle zwei Monster unterschiedlicher Arten aus Team oder Lager. Gleiche Arten dürfen sich nicht paaren; Babys starten auf Level 1. Der Nachwuchs kombiniert Tierform und Element der Eltern und kann als neue Hybridkreation entstehen. Pro Shiny-Elternteil steigt die Shiny-Chance um 40 Prozentpunkte.','Choose two monsters of different species from your team or storage. Babies start at level 1 and may inherit hybrid traits. Each shiny parent increases the shiny chance by 40 percentage points.'],
['Entdecke Monster, entwickle sie und finde mit etwas Glück eine schillernde Variante. Die Shiny-Chance in der Wildnis beträgt 1 zu 500 (0,2 %) mit 10 % stärkeren Attributen.','Discover monsters, evolve them and hunt rare shinies. The wild shiny chance is 1 in 500 (0.2%), with 5% stronger stats.'],
['Investiere Münzen in dauerhafte Verbesserungen. Deine Basis bleibt auch nach Prestige erhalten.','Invest coins in permanent upgrades. Your base survives prestige.'],
['Erfülle Aufgaben, sammle Belohnungen und schalte legendäre Herausforderungen frei.','Complete quests, collect rewards and unlock legendary challenges.'],
['Die Wildnis und ihre Trainer warten auf dich. Wähle dein erstes Monster und beginne dein Abenteuer. Dein Spielstand wird automatisch gespeichert.','The wildlands and their trainers await! Choose your first monster and begin your adventure. Progress is saved automatically.'],
['VAELKOR ist ein eigenständiges Offline-Spiel mit lokal gezeichneten Tier-Fabelwesen und ohne Server. Der Spielstand wird lokal im Browser gespeichert.','VAELKOR is a standalone offline game featuring locally drawn fantasy creatures. Your progress is saved in this browser.']
];
const additionalPhrases=[
['In der Arena wartet ein Trainer mit 1 bis 4 Monstern. Besiege alle Monster, um zu gewinnen. Besiege ihn, um zur nächsten Zone zu reisen. Auf Level 10, 20, 30 … beginnt ein neues Biom mit einem besonderen Ort.','A trainer with 2 to 4 monsters awaits in the arena. Defeat their entire team to win and unlock the next zone. A new biome begins every 10 trainers!'],
['Nach dem Trainersieg die Medaille in der Arena antippen, um weiterzureisen.','After defeating the trainer, tap the medal in the arena to travel onward.'],
['Am blauen Heilbrunnen im Dorf wird dein Team kostenlos geheilt. Tränke kannst du auch außerhalb von Kämpfen im 🎒 Inventar verwenden.','The blue village fountain heals your team for free. You can also use potions during battle.'],
['In diesem Biom sind andere Monsterarten häufiger.','Different monster species are more common in this biome.'],
['Alle 100 Zonen wartet eine legendäre Herausforderung.','A legendary challenge awaits every 100 zones.'],
['Legendäre Prüfung: Besiege zuerst den Biom-Boss und stelle dich dann dem legendären Monster!','Legendary trial: defeat the biome boss first, then face the legendary monster!'],
['Legendären Wächter herausfordern','Challenge the Legendary Guardian'],
['Trainer wartet in der Mitte','Trainer awaits in the center'],
['Trainer besiegt!','Trainer defeated!'],
['Gegnerlevel ab','Enemy level from'],
['-Attacken sind verstärkt.',' attacks are boosted.'],
['Attacken sind verstärkt.','attacks are boosted.'],
['Auf Level 10, 20, 30 … beginnt ein neues Biom mit einem besonderen Ort.','A new biome begins every 10 trainers!'],
['Besiege alle Monster, um zu gewinnen.','Defeat all monsters to win.'],
['Besiege ihn, um zur nächsten Zone zu reisen.','Defeat the trainer to unlock the next zone.'],
['Gewitter','Thunderstorm'],['Schneesturm','Blizzard'],['Mondschein','Moonlight'],['Klar','Clear'],['Regen','Rain'],['Nebel','Fog'],
['Smaragdlichtung','Emerald Clearing'],['Glutsteppe','Ember Steppe'],['Kristallhöhle','Crystal Cave'],
['Trainer schickt','Trainer sends out'],['Tippe auf die Medaille in der Arena, um weiterzureisen!','Tap the medal in the arena to travel onward!'],
['Extragold erhalten. Das nächste Biom ist freigeschaltet!','Bonus gold earned. The next biome is unlocked!'],
['Legendäres Monster als Belohnung im Lager!','Legendary monster awarded to your storage!'],
['Prestige starten? Zurück zu Zone 1, deine Monster-Level sinken, aber wilde Monster und Trainer bleiben stärker.','Start prestige? Return to zone 1. Your monster levels decrease, but wild monsters and trainers stay stronger.'],
['Bonuslevel','bonus levels'],['Zurück zu Zone','Back to zone'],['deine Monster-Level sinken','your monster levels decrease'],
['Monstern','monsters'],['Monsterarten','monster species'],['Monsterart','monster species'],['Monster-Level','monster levels'],
['Trainer','Trainer'],['Biom','biome'],['Bioms','biomes'],['im Kampf','in battle'],['für diesen Kampf','for this battle'],
['Wetter:','Weather:'],['Alle','Every'],['wartet eine','awaits a'],['legendäre Herausforderung','legendary challenge'],
['Trainer wartet','Trainer awaits'],['Gegnerlevel','Enemy level'],['verstärkt','boosted'],['häufiger','more common'],
['Monstern.','monsters.'],['Gorilla Kleber','Gorilla Glue'],['Erde','Earth'],['LP','HP'],['XP','XP'],
['Sieg!','Victory!'],['Niederlage!','Defeat!'],['Gefangen!','Captured!'],
['Kampf gewonnen','Battle won'],['Niederlage! Du wurdest zum Heilbrunnen zurückgebracht und hast','Defeat! You were returned to the healing fountain and lost'],['Münzen (10 %) verloren.','coins (10%).'],['Dein Team wurde besiegt. Du kehrst zum Heilbrunnen zurück und verlierst','Your team was defeated. You return to the healing fountain and lose'],['Münzen (10 %).','coins (10%).'],['Kampf verloren','Battle lost'],['Monster gefangen','Monster captured'],
['Deine Karten','Your cards'],['Dein Deck','Your deck'],['Karten auswählen','Choose cards'],
['Seltenheit','Rarity'],['Elementangriff','Element attack'],['Karten erhalten','Cards received'],
['Schaden über Zeit','Damage over time'],['Runden','rounds'],['Runde lang','for one round'],
['Münzen erhalten','Coins earned'],['Heilung erhalten','Healing received'],['nicht genug','not enough'],
['Du brauchst','You need'],['Kein Platz','No space'],['Volles Team','Team full'],
['Erfahrung','Experience'],['Erfahrungspunkte','Experience points'],['Entwicklung','Evolution'],
['Fortschritt','Progress'],['zurücksetzen','reset'],['Zurücksetzen','Reset'],
['Kampf beginnt','Battle begins'],['Der Gegner','The enemy'],['Dein Zug','Your turn'],['Gegnerzug','Enemy turn'],
['wurde besiegt','was defeated'],['ist besiegt','is defeated'],['ist betäubt','is stunned'],
['Schaden verursacht','damage dealt'],['wird geheilt','is healed'],['geheilt','healed'],
['erhalten','received'],['besiegt','defeated'],['heilt','heals'],['greift an','attacks'],
['verursacht','deals'],['blockt','blocks'],['betäubt','stunned'],['Schilde','shields'],
['Energie pro Runde','energy per round'],['Energie je Runde','energy each round'],
['Wähle','Choose'],['Wähle aus','Choose from'],['Noch','Still'],['Keine','No'],['Kein','No'],
['Einsetzen','Use'],['Verwenden','Use'],['Bestand','Owned'],['Preis','Price'],['Anzahl','Quantity'],
['Gespeichert','Saved'],['Speichern','Save'],['Entdecken','Discover'],['Aufwerten','Upgrade'],
['Gewonnen','Won'],['Verloren','Lost'],['Erledigt','Completed'],['Abgeschlossen','Completed'],
['Aufgabe','Quest'],['Aufgaben','Quests'],['Ziele','Objectives'],['Ziel','Objective'],
['Im Team','In team'],['Im Lager','In storage'],['Zurück ins Team','Back to team'],
['Wildes','Wild'],['Wilder','Wild'],['Wilde','Wild'],['Glänzend','Shiny'],
['Gewöhnliche','Common'],['Seltene','Rare'],['Epische','Epic'],['Legendäre','Legendary']
];
const dictionary=new Map([...paragraphs,...phrases,...additionalPhrases]);
const sorted=[...paragraphs,...phrases,...additionalPhrases].sort((a,b)=>b[0].length-a[0].length);
// Additional reviewed English menu, card, battle and collection labels.
const reviewedTranslations=[['Startseite', 'Home'], ['Welt', 'World'], ['Kartendeck', 'Card Deck'], ['Karten-Deck', 'Card Deck'], ['Deck bearbeiten', 'Edit Deck'], ['Deck verwalten', 'Manage Deck'], ['Deck erstellen', 'Create Deck'], ['Deck auswählen', 'Select Deck'], ['Deck speichern', 'Save Deck'], ['Deck laden', 'Load Deck'], ['Deck zurücksetzen', 'Reset Deck'], ['Deck wechseln', 'Switch Deck'], ['Meine Karten', 'My Cards'], ['Alle Karten', 'All Cards'], ['Kartensammlung', 'Card Collection'], ['Kartenübersicht', 'Card Overview'], ['Kartenverwaltung', 'Card Management'], ['Kartenfilter', 'Card Filters'], ['Kartenart', 'Card Type'], ['Kartenname', 'Card Name'], ['Kartenkosten', 'Card Cost'], ['Kartenanzahl', 'Card Count'], ['Karten hinzufügen', 'Add Cards'], ['Karten entfernen', 'Remove Cards'], ['Karte auswählen', 'Select Card'], ['Karte spielen', 'Play Card'], ['Karte ziehen', 'Draw Card'], ['Karte abwerfen', 'Discard Card'], ['Kartentext', 'Card Text'], ['Karteneffekt', 'Card Effect'], ['Karteneffekte', 'Card Effects'], ['Kartentyp', 'Card Type'], ['Kartenset', 'Card Set'], ['Kartenpaket', 'Card Pack'], ['Kartenpakete', 'Card Packs'], ['Deckplätze', 'Deck Slots'], ['Deckplatz', 'Deck Slot'], ['Kartenslots', 'Card Slots'], ['Karten im Deck', 'Cards in Deck'], ['Karten in deinem Deck', 'Cards in Your Deck'], ['Karten verfügbar', 'Cards Available'], ['Keine Karten vorhanden', 'No Cards Available'], ['Keine Karten gefunden', 'No Cards Found'], ['Noch keine Karten', 'No Cards Yet'], ['Karte bereits im Deck', 'Card Already in Deck'], ['Deck ist voll', 'Deck Is Full'], ['Deck voll', 'Deck Full'], ['Deck ist leer', 'Deck Is Empty'], ['Karte hinzufügen', 'Add Card'], ['Karte entfernen', 'Remove Card'], ['Im Deck', 'In Deck'], ['Nicht im Deck', 'Not in Deck'], ['Sammlung', 'Collection'], ['Sammlungsfortschritt', 'Collection Progress'], ['Sammelalbum', 'Collection Album'], ['Alle Elemente', 'All Elements'], ['Alle Seltenheiten', 'All Rarities'], ['Alle Typen', 'All Types'], ['Alle Monster', 'All Monsters'], ['Alle anzeigen', 'Show All'], ['Sortieren', 'Sort'], ['Filtern', 'Filter'], ['Suche', 'Search'], ['Suchen', 'Search'], ['Name suchen', 'Search Name'], ['Keine Treffer', 'No Results'], ['Keine Ergebnisse', 'No Results'], ['Zur Startseite', 'Back to Home'], ['← Zur Startseite', '← Back to Home'], ['Zurück zur Startseite', 'Back to Home'], ['Zurück zum Menü', 'Back to Menu'], ['Hauptmenü', 'Main Menu'], ['Einstellungen', 'Settings'], ['Fortsetzen', 'Resume'], ['Neues Spiel', 'New Game'], ['Spiel laden', 'Load Game'], ['Spiel speichern', 'Save Game'], ['Spielstand', 'Save Data'], ['Spielstand gespeichert', 'Game Saved'], ['Automatisch gespeichert', 'Autosaved'], ['Speichern erfolgreich', 'Saved Successfully'], ['Vollbildmodus', 'Fullscreen Mode'], ['Vollbild beenden', 'Exit Fullscreen'], ['Vollbild einschalten', 'Enter Fullscreen'], ['Vollbild verlassen', 'Exit Fullscreen'], ['Steuerung', 'Controls'], ['Bewegen', 'Move'], ['Interagieren', 'Interact'], ['Verlassen', 'Exit'], ['Details', 'Details'], ['Informationen', 'Information'], ['Übersicht', 'Overview'], ['Beschreibung', 'Description'], ['Wirkung', 'Effect'], ['Effekt', 'Effect'], ['Effekte', 'Effects'], ['Dauer', 'Duration'], ['Stärke', 'Power'], ['Verteidigung', 'Defense'], ['Verteidigen', 'Defend'], ['Angriffskraft', 'Attack Power'], ['Maximale Lebenspunkte', 'Maximum HP'], ['Maximale Energie', 'Maximum Energy'], ['Energiekosten', 'Energy Cost'], ['Energiebedarf', 'Energy Cost'], ['Energie erhalten', 'Gain Energy'], ['Energie gewinnen', 'Gain Energy'], ['Schild erhalten', 'Gain Shield'], ['Schutz erhalten', 'Gain Shield'], ['Schildpunkte', 'Shield Points'], ['Schaden zufügen', 'Deal Damage'], ['Schaden verursachen', 'Deal Damage'], ['Schaden erleiden', 'Take Damage'], ['Schaden blocken', 'Block Damage'], ['Leben wiederherstellen', 'Restore HP'], ['Gesundheit', 'Health'], ['Heiltrank', 'Healing Potion'], ['Mega-Trank', 'Mega Potion'], ['Team-Trank', 'Team Potion'], ['Seelenstein', 'Soul Sphere'], ['Kampf starten', 'Start Battle'], ['Kampf fortsetzen', 'Continue Battle'], ['Kampf beenden', 'End Battle'], ['Kampf gewonnen!', 'Battle Won!'], ['Kampf verloren!', 'Battle Lost!'], ['Kampfbelohnung', 'Battle Reward'], ['Kampfbelohnungen', 'Battle Rewards'], ['Kampfergebnis', 'Battle Result'], ['Kampfrunde', 'Battle Round'], ['Kampfverlauf', 'Battle History'], ['Kampfprotokoll öffnen', 'Open Battle Log'], ['Kampfprotokoll schließen', 'Close Battle Log'], ['📜 Kampfprotokoll öffnen ▲', '📜 Open Battle Log ▲'], ['📜 Kampfprotokoll öffnen ▼', '📜 Open Battle Log ▼'], ['📜 Kampfprotokoll schließen ▲', '📜 Close Battle Log ▲'], ['📜 Kampfprotokoll schließen ▼', '📜 Close Battle Log ▼'], ['Gegnerischer Zug', 'Enemy Turn'], ['Zug überspringen', 'Skip Turn'], ['Zugbeginn', 'Start of Turn'], ['Nächste Runde', 'Next Round'], ['Nächster Gegner', 'Next Enemy'], ['Aktives Team', 'Active Team'], ['Team auswählen', 'Select Team'], ['Monster auswählen', 'Select Monster'], ['Monster wechseln', 'Switch Monster'], ['Monster tauschen', 'Swap Monsters'], ['Monster freilassen', 'Release Monster'], ['Monster freigeben', 'Release Monster'], ['Monster entwickeln', 'Evolve Monster'], ['Monster heilen', 'Heal Monster'], ['Monster fangen', 'Capture Monster'], ['Monster gefangen!', 'Monster Captured!'], ['Fangversuch', 'Capture Attempt'], ['Fangversuch fehlgeschlagen', 'Capture Failed'], ['Nicht genug Münzen', 'Not Enough Coins'], ['Nicht genug Platz', 'Not Enough Space'], ['Nicht verfügbar', 'Unavailable'], ['Verfügbar', 'Available'], ['Freigeschaltet', 'Unlocked'], ['Gesperrt', 'Locked'], ['Ausgerüstet', 'Equipped'], ['Ausrüsten', 'Equip'], ['Abwählen', 'Deselect'], ['Auswählen', 'Select'], ['Ausgewählt', 'Selected'], ['Aktivieren', 'Activate'], ['Deaktivieren', 'Deactivate'], ['Erhalten', 'Received'], ['Erhalte', 'Gain'], ['Gewinne', 'Gain'], ['Benutzen', 'Use'], ['Voraussetzung', 'Requirement'], ['Voraussetzungen', 'Requirements'], ['Stapel', 'Stack'], ['Ablagestapel', 'Discard Pile'], ['Nachziehstapel', 'Draw Pile'], ['Handkarten', 'Cards in Hand'], ['Starthand', 'Starting Hand'], ['Starthand ziehen', 'Draw Starting Hand'], ['Angriffskarten', 'Attack Cards'], ['Zauberkarten', 'Spell Cards'], ['Kreaturenkarten', 'Creature Cards'], ['Unterstützungskarten', 'Support Cards'], ['Unterstützung', 'Support'], ['Spezialkarte', 'Special Card'], ['Spezialkarten', 'Special Cards'], ['Aktionskarte', 'Action Card'], ['Aktionskarten', 'Action Cards'], ['Seltene Karte', 'Rare Card'], ['Epische Karte', 'Epic Card'], ['Legendäre Karte', 'Legendary Card'], ['Kartenpaket öffnen', 'Open Card Pack'], ['Booster öffnen', 'Open Booster'], ['Booster kaufen', 'Buy Booster'], ['Paket öffnen', 'Open Pack'], ['Kaufen für', 'Buy for'], ['Kostenlos', 'Free'], ['Ausverkauft', 'Sold Out'], ['Besitzt', 'Owned'], ['Münzen gewonnen', 'Coins Won'], ['Gold erhalten', 'Gold Earned'], ['Belohnung erhalten', 'Reward Received'], ['Belohnungen', 'Rewards'], ['Quest abgeschlossen', 'Quest Completed'], ['Aufgabe abgeschlossen', 'Quest Completed'], ['Erfolge', 'Achievements'], ['Statistiken', 'Statistics'], ['Seltenheitsgrad', 'Rarity'], ['Ungewöhnlich', 'Uncommon'], ['Mythisch', 'Mythic'], ['Schillernd', 'Shiny'], ['Entdeckt', 'Discovered'], ['Unentdeckt', 'Undiscovered'], ['Entwicklungsstufe', 'Evolution Stage'], ['Stufe aufgestiegen', 'Level Up'], ['Levelaufstieg', 'Level Up'], ['Nächste Stufe', 'Next Level'], ['Weltkarte', 'World Map'], ['Welt erkunden', 'Explore World'], ['Trainer besiegt', 'Trainer Defeated'], ['Heilbrunnen', 'Healing Fountain'], ['Händler', 'Merchant'], ['Shop öffnen', 'Open Shop'], ['Shop schließen', 'Close Shop'], ['Lager', 'Storage'], ['Zucht starten', 'Start Breeding'], ['Zucht abbrechen', 'Cancel Breeding'], ['Eltern auswählen', 'Select Parents'], ['Elternteil auswählen', 'Select Parent'], ['Nachwuchs', 'Offspring'], ['Ei ausbrüten', 'Hatch Egg'], ['Ei', 'Egg'], ['Eier', 'Eggs'], ['Wartezeit', 'Wait Time'], ['Verbleibende Zeit', 'Time Remaining'], ['Fertig', 'Done'], ['Fertigstellen', 'Finish'], ['Erneut versuchen', 'Try Again'], ['Wiederholen', 'Repeat'], ['Bestätigen?', 'Confirm?'], ['Bist du sicher?', 'Are you sure?'], ['Ja', 'Yes'], ['Nein', 'No'], ['Karten und Decks', 'Cards and Decks'], ['Monster und Karten', 'Monsters and Cards'], ['Startseite', 'Home']];
for(const [de,en] of reviewedTranslations)dictionary.set(de,en);
sorted.length=0;sorted.push(...dictionary.entries());sorted.sort((a,b)=>b[0].length-a[0].length);

// v5.2: Complete combat-screen vocabulary, tutorials and card terminology.
const combatTranslations=[
['ca.','approx.'],['2 ziehen','Draw 2 cards'],['1 monsters remaining','1 monster remaining'],['Dein erstes Monster','Your first monster'],['Hirsch','Deer'],['Fuchs','Fox'],['Otter','Otter'],['Eichhörnchen','Squirrel'],['Maulwurf','Mole'],['Monster','Monster'],['⭐ DEIN AKTIVES MONSTER','⭐ YOUR ACTIVE MONSTER'],['🔴 AKTIVER GEGNER','🔴 ACTIVE ENEMY'],
['⚡ MONSTER-ANGRIFF','⚡ MONSTER ATTACK'],['⚔️ NEUTRALER ANGRIFF','⚔️ NEUTRAL ATTACK'],
['✦ CHARAKTERZAUBER','✦ SUPPORT SPELL'],['🔗 TEAMKARTE','🔗 TEAM CARD'],
['🃏 TEAM · BONUSKARTE','🃏 TEAM · BONUS CARD'],
['🎓 Training: 1 einfacher Angriff','🎓 Training: 1 basic attack'],
['🎓 Training: Spiele eine Karte. Danach kannst du den Zug beenden.','🎓 Tutorial: Play a card. Then you can end your turn.'],
['✨ Tippe auf eine leuchtende Karte, um anzugreifen','✨ Tap a glowing card to attack'],
['✨ Tippe hier, um deinen Zug zu beenden','✨ Tap here to end your turn'],
['✨ HIER TIPPEN','✨ TAP HERE'],
['Tippe auf ein Monster, um es aktiv einzusetzen.','Tap a monster to make it active.'],
['Der Kampf beginnt. Spiele eine Karte oder beende deinen Zug.','The battle begins. Play a card or end your turn.'],
['Training: Spiele eine Karte. Danach kannst du den Zug beenden.','Tutorial: Play a card. Then you can end your turn.'],
['Training: 1 einfacher Angriff','Training: 1 basic attack'],
['Zugende: Wähle','End of turn: Choose'],['Karte(n) zum Abwerfen. Tippe auf die Karten.','card(s) to discard. Tap the cards.'],
['Erst Karten abwerfen','Discard cards first'],['Kampf abschließen','Finish Battle'],
['Training abschließen','Finish Tutorial'],['Zerstören · Beute','Defeat · Loot'],
['Fangchance abhängig von Level und Seltenheit. Jeder Versuch verbraucht einen Seelenstein; bei Fehlschlag entkommt das Monster.','Capture chance depends on level and rarity. Each attempt uses one Soul Sphere; on failure the monster escapes.'],
['Wähle','Choose'],['zum Abwerfen','to discard'],['Tippe auf die Karten.','Tap the cards.'],
['Aktiver Gegner','Active Enemy'],['Aktives Monster','Active Monster'],
['DEIN AKTIVES MONSTER','YOUR ACTIVE MONSTER'],['Lebenspunkte','Hit Points'],['Angriffswert','Attack Power'],['Aktiver Schutzschild','Active Shield'],['Block','Block'],['Angriff','Attack'],['Zusätzliche Energie pro Runde','Extra Energy per Turn'],['Schaden über Zeit','Damage over Time'],['Runden','Rounds'],['Betäubt','Stunned'],['Geschwächt','Weakened'],['Reflexion','Reflection'],['Verwundbar','Vulnerable'],['AKTIVER GEGNER','ACTIVE ENEMY'],
['MONSTER-ANGRIFF','MONSTER ATTACK'],['NEUTRALER ANGRIFF','NEUTRAL ATTACK'],
['CHARAKTERZAUBER','SUPPORT SPELL'],['TEAMKARTE','TEAM CARD'],
['Nachwirkung','Damage over time'],['Entzug','Life steal'],
['1 Runde betäuben','Stun for 1 turn'],['Angriff schwächen','Weaken attack'],
['Schild durchdringen','Pierce shield'],['Ausweichen','Dodge'],['Reflektieren','Reflect'],
['Handlimit +','Hand limit +'],['Angriff für diesen Kampf','Attack for this battle'],
['Energie je Runde für diesen Kampf','energy per round for this battle'],
['für diesen Kampf','for this battle'],['Karten ziehen','Draw cards'],['ziehen','draw'],
['Wächter','Guardian'],['TRAINER · Besiege alle','TRAINER · Defeat all'],
['Monster übrig','monsters remaining'],['kampffähig','ready to fight'],
['Gegnerabsicht','Enemy intent'],['Passen','Pass'],['Aktionen','actions'],
['Kampfruf','Battle Cry'],['Runenwissen','Rune Knowledge'],['Energiesiegel','Energy Sigil'],
['Kleiner Hieb','Quick Strike'],['Steinwurf','Stone Throw'],['Kurzer Stoß','Short Jab'],
['Klingenhieb','Blade Strike'],['Wirbeltritt','Whirlwind Kick'],['Doppelschlag','Double Strike'],
['Schutzzeichen','Protection Sigil'],['Schildwall','Shield Wall'],['Heilkräuter','Healing Herbs'],
['Weite Gedanken','Expanded Mind'],['Runenfächer','Rune Fan'],
['Veteranenschlag','Veteran Strike'],['Bastion','Bastion'],['Erste Hilfe','First Aid'],
['Königsklinge','Royal Blade'],['Lebensquell','Spring of Life'],['Sternenrüstung','Star Armor'],
['Gorilla Kleber','Gorilla Glue'],
['Feuer','Fire'],['Wasser','Water'],['Natur','Nature'],['Blitz','Lightning'],
['Eis','Ice'],['Erde','Earth'],['Stein','Stone'],['Stahl','Steel'],
['Luft','Air'],['Geist','Spirit'],['Dunkel','Dark'],['Licht','Light'],
['Gift','Poison'],['Drache','Dragon'],['Psycho','Psychic'],['Kampf','Fighting'],
['Normal','Normal'],['Schaden','damage'],['Heilung','healing'],['Schutz','shield'],
['Karte','card'],['Karten','cards'],['Runde','round'],['Energie','energy'],
['spielt','plays'],['greift an','attacks'],['verursacht','deals'],
['erhält','gains'],['erhalten','received'],['verliert','loses'],
['wird geheilt','is healed'],['heilt','heals'],['ist betäubt','is stunned'],
['Betäubung endet.','Stun wears off.'],['Gegner ist betäubt und setzt diesen Zug aus!','Enemy is stunned and skips this turn!'],
['Trainingshieb','Training Strike'],['Trainer schickt','Trainer sends out'],
['Verstärkung','Boost'],['Abwerfen','Discard'],['Wähle ein','Choose a'],
['Aufgeben','Surrender'],['Zug beenden','End Turn'],['Kampfprotokoll','Battle Log'],
['Sieg!','Victory!'],['Niederlage','Defeat'],['Hand','Hand'],['Energie','Energy'],
['Schließen','Close'],['Öffnen','Open'],['Team wechseln','Switch Team']
];
// Card names in the shared pool use descriptive German compounds. Translate
// their components without rewriting arbitrary substrings of unrelated words.
const cardWordTranslations=[
['Flammen','Flame'],['Feuer','Fire'],['Glut','Ember'],['Brand','Blaze'],['Inferno','Inferno'],
['Wasser','Water'],['Flut','Flood'],['Wellen','Wave'],['Welle','Wave'],['Gezeiten','Tide'],
['Natur','Nature'],['Wald','Forest'],['Blätter','Leaf'],['Blatt','Leaf'],['Wurzel','Root'],['Wurzeln','Roots'],
['Blitz','Lightning'],['Donner','Thunder'],['Funken','Spark'],['Strom','Electric'],
['Stein','Stone'],['Fels','Rock'],['Erde','Earth'],['Eis','Ice'],['Frost','Frost'],
['Dunkel','Dark'],['Schatten','Shadow'],['Licht','Light'],['Sonnen','Sun'],
['Geist','Spirit'],['Seelen','Soul'],['Luft','Air'],['Wind','Wind'],['Sturm','Storm'],
['Gift','Poison'],['Toxin','Toxin'],['Stahl','Steel'],['Eisen','Iron'],
['Drachen','Dragon'],['Drache','Dragon'],['Psycho','Psychic'],['Kampf','Battle'],
['Schlag','Strike'],['Hieb','Strike'],['Stoß','Thrust'],['Klinge','Blade'],
['Schild','Shield'],['Panzer','Armor'],['Rüstung','Armor'],['Wand','Wall'],
['Heilung','Healing'],['Heil','Healing'],['Lebens','Life'],['Kraft','Power'],
['Energie','Energy'],['Runen','Rune'],['Rune','Rune'],['Siegel','Sigil'],
['Aura','Aura'],['Segen','Blessing'],['Fluch','Curse'],['Impuls','Pulse'],
['Woge','Surge'],['Quelle','Spring'],['Quell','Spring'],['Strahl','Beam'],
['Explosion','Explosion'],['Ketten','Chain'],['Zorn','Wrath'],['Wut','Rage'],
['Herz','Heart'],['Schutz','Protection'],['Echo','Echo'],['Schrei','Cry'],
['Hauch','Breath'],['Stachel','Spike'],['Dornen','Thorn'],['Dorn','Thorn'],
['Nebel','Mist'],['Nacht','Night'],['Sternen','Star'],['Stern','Star'],
['Himmel','Sky'],['Königs','Royal'],['Meister','Master'],['Groß','Great'],
['Klein','Small'],['Schnell','Quick'],['Doppel','Double'],['Wirbel','Whirl'],
['Tanz','Dance'],['Biss','Bite'],['Klaue','Claw'],['Krallen','Claws'],
['Bogen','Bow'],['Faust','Fist'],['Speer','Spear'],['Pfeil','Arrow']
];
function translateCardName(name){
 const manual={'Feuerball':'Fireball','Flammenstoß':'Flame Burst','Blitzschlag':'Lightning Strike','Eislanze':'Ice Lance','Wasserstrahl':'Water Jet','Heilende Berührung':'Healing Touch','Schattenhieb':'Shadow Strike','Steinhaut':'Stone Skin','Wurzelgriff':'Root Grasp','Giftstachel':'Poison Sting','Drachenatem':'Dragon Breath','Sternenlicht':'Starlight','Kampfruf':'Battle Cry','Runenwissen':'Rune Knowledge','Energiesiegel':'Energy Sigil','Doppelschlag':'Double Strike','Kleiner Hieb':'Quick Strike','Steinwurf':'Stone Throw','Kurzer Stoß':'Short Jab','Klingenhieb':'Blade Strike','Wirbeltritt':'Whirlwind Kick','Schutzzeichen':'Protection Sigil','Schildwall':'Shield Wall','Heilkräuter':'Healing Herbs'};
 if(manual[name])return manual[name];
 if(dictionary.has(name))return dictionary.get(name);
 let result=name;
 for(const [de,en] of cardWordTranslations){
  // Deliberately translate compound parts only in card names, never in the UI.
  result=result.replace(new RegExp(de,'g'),en);
 }
 return result;
}
// Cover every registered collectible card by its own full name, including
// procedurally registered element and rarity variants.
try{if(window.AetherEngine?.BYID){
 for(const card of Object.values(window.AetherEngine.BYID)){
  if(card?.name&&typeof card.name==='string'&&!dictionary.has(card.name)){
   const translated=translateCardName(card.name);
   if(translated!==card.name)combatTranslations.push([card.name,translated]);
  }
 }
}}catch(e){}
for(const [de,en] of combatTranslations)dictionary.set(de,en);
sorted.length=0;sorted.push(...dictionary.entries());sorted.sort((a,b)=>b[0].length-a[0].length);

// Compile once; process changed subtrees only. No language work runs in the movement loop.
const original=new WeakMap(),last=new WeakMap(),attributeState=new WeakMap(),cache=new Map(),dirty=new Set(),watched=new WeakMap(),canvases=new WeakSet();
let language='de',pending=false,matcher=null,compiled=0,visited=0,flushes=0,fullScans=0;
const SKIP=new Set(['SCRIPT','STYLE','TEXTAREA','NOSCRIPT','CODE','SVG','CANVAS','IMG','PICTURE','IFRAME']);
const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
function compile(){for(const[de,en]of [...dictionary])if(de.length<65&&de!==de.toUpperCase())dictionary.set(de.toUpperCase(),en.toUpperCase());sorted.length=0;sorted.push(...dictionary.entries());sorted.sort((a,b)=>b[0].length-a[0].length);matcher=new RegExp(sorted.filter(([de,en])=>de&&de!==en).map(([de])=>(/^[\p{L}\p{N}]/u.test(de)?'(?<![\\p{L}\\p{N}])':'')+escape(de)+(/[\p{L}\p{N}]$/u.test(de)?'(?![\\p{L}\\p{N}])':'')).join('|'),'gu');compiled++;cache.clear();}
function translate(str){if(typeof str!=='string'||!/[\p{L}]/u.test(str))return str;if(cache.has(str))return cache.get(str);const exact=dictionary.get(str.trim()),out=exact?str.replace(str.trim(),exact):str.replace(matcher,key=>dictionary.get(key)||key);if(cache.size>=1024)cache.delete(cache.keys().next().value);cache.set(str,out);return out;}
function nodeText(n){const current=n.nodeValue;if(!original.has(n)||last.has(n)&&current!==last.get(n))original.set(n,current);const target=language==='en'?translate(original.get(n)):original.get(n);last.set(n,target);if(current!==target)n.nodeValue=target;}
function attrs(el){let state=attributeState.get(el);if(!state){state={};attributeState.set(el,state);}for(const attr of ['title','aria-label','placeholder','alt']){if(!el.hasAttribute?.(attr))continue;const current=el.getAttribute(attr),old=state[attr];const base=!old||current!==old.last?current:old.base,target=language==='en'?translate(base):base;state[attr]={base,last:target};if(current!==target)el.setAttribute(attr,target);}}
function process(root){const stack=[root];while(stack.length){const n=stack.pop();if(!n)continue;visited++;if(n.nodeType===3){nodeText(n);continue;}if(n.nodeType!==1&&n.nodeType!==9)continue;if(n.nodeType===1){if(n.id==='vkLanguage'||n.hasAttribute?.('data-no-translate'))continue;const tag=String(n.tagName||'').toUpperCase();if(SKIP.has(tag)){if(tag==='IFRAME')attachFrame(n);continue;}attrs(n);}const children=n.childNodes||[];for(let i=children.length-1;i>=0;i--)stack.push(children[i]);}}
function schedule(root){if(!root||language!=='en')return;dirty.add(root);if(pending)return;pending=true;(window.requestAnimationFrame||((fn)=>setTimeout(fn,0)))(flush);}
function flush(){pending=false;flushes++;const roots=[...dirty];dirty.clear();for(const root of roots){if(root.isConnected===false)continue;if(roots.some(other=>other!==root&&other.contains?.(root)))continue;process(root);}}
function mutations(records){if(language!=='en')return;for(const m of records){if(m.type==='characterData'){if(last.get(m.target)!==m.target.nodeValue)schedule(m.target);}else if(m.type==='attributes'){const prior=attributeState.get(m.target)?.[m.attributeName];if(!prior||prior.last!==m.target.getAttribute(m.attributeName))schedule(m.target);}else if(m.type==='childList'){for(const n of m.addedNodes||[])schedule(n);}}}
function watch(doc){if(!doc?.body||watched.has(doc))return;const observer=new MutationObserver(mutations);observer.observe(doc.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['title','aria-label','placeholder','alt']});watched.set(doc,observer);}
const frames=new Set(),boundFrames=new WeakSet();
function canvasText(frame){try{const win=frame.contentWindow,proto=win.CanvasRenderingContext2D?.prototype,contexts=proto?[proto]:Array.from(frame.contentDocument?.querySelectorAll?.('canvas')||[],canvas=>canvas.getContext('2d'));for(const ctx of contexts){if(!ctx||canvases.has(ctx))continue;canvases.add(ctx);for(const key of ['fillText','strokeText','measureText']){const fn=ctx[key];if(typeof fn==='function')ctx[key]=function(text,...args){return fn.call(this,language==='en'?translate(text):text,...args);};}}}catch(e){/* A cross-origin frame is not part of the embedded game. */}}
function attachFrame(frame){if(frame.id!=='vkIntegratedWorld')return;if(!boundFrames.has(frame)){boundFrames.add(frame);frame.addEventListener('load',()=>attachFrame(frame));}try{const doc=frame.contentDocument;if(!doc?.body)return;frames.add(frame);canvasText(frame);watch(doc);doc.documentElement.lang=language;process(doc.body);}catch(e){}}
function refreshCards(){let changed=false;try{for(const card of Object.values(window.AetherEngine?.BYID||{})){if(!card?.name||dictionary.has(card.name))continue;const name=translateCardName(card.name);if(name!==card.name){dictionary.set(card.name,name);changed=true;}}}catch(e){}if(changed)compile();}
function update(){dirty.clear();fullScans++;process(document.body);const caption=document.getElementById('vkLangCaption');if(caption){const title=language==='en'?'Language':'Sprache';if(caption.textContent!==title)caption.textContent=title;const n=caption.firstChild;if(n){original.set(n,'Sprache');last.set(n,caption.textContent);}}document.documentElement.lang=language;for(const frame of frames){try{frame.contentDocument.documentElement.lang=language;process(frame.contentDocument.body);frame.contentWindow.VaelkorWildScene?.languageChanged?.();}catch(e){}}}
const select=document.getElementById('vkLanguage');try{language=localStorage.getItem(KEY)==='en'?'en':'de'}catch(e){}if(select)select.value=language;
select?.addEventListener('change',()=>{language=select.value==='en'?'en':'de';try{localStorage.setItem(KEY,language)}catch(e){}refreshCards();update();});
for(const[de,en]of Object.entries(window.VaelkorLanguageCatalog||{}))dictionary.set(de,en);
compile();watch(document);update();
window.VaelkorLanguage={get:()=>language,set:l=>{if(select)select.value=l==='en'?'en':'de';language=l==='en'?'en':'de';try{localStorage.setItem(KEY,language)}catch(e){}refreshCards();update();},translate,refresh:()=>{refreshCards();update();},attachFrame,metrics:()=>({compiled,visited,flushes,fullScans,cacheSize:cache.size,cacheLimit:1024,dirty:dirty.size})};
document.addEventListener('DOMContentLoaded',()=>{refreshCards();update();});
})();
