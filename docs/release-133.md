# Release 133

Repairs the single missing paving tile near the southwest house, including saved towns. Existing wall positions are retained; rendering now repeats whole high-resolution stone segments at native proportions with a 2x backing cache instead of stretching fence fragments. Guardian rendering uses the full original source with smooth high-quality reduction; trainer portrait CSS no longer forces nearest-neighbor scaling.

NPC outdoor walking is 1.8 tiles/second, includes a short pause at the shared town waypoint, and preserves home/visitor/night schedules. Proximity-only speech alternates between two nearby NPCs and includes reviewed German/English text. No extra timer or off-map simulation is added.

The southern arena moves to x=6.5, y=11, retains its stable room identity and uses a grid-centered, connected entrance. Property scenery increases to a minimum of 36 natural objects plus additional thematic decorations.

Three new reviewed template sheets provide 36 transparent crops with stable IDs, checksums, dimensions, view and context metadata. Residential/tent and arena props stay indoors; town and wilderness props use separate outdoor contexts. Four exterior building variants reuse the existing connected building/room system. New building appearances are selected only for newly generated building sites. Current complete starter-town interior pictures are retained. See generator-assets-133.md for the full catalog and future suggestions.

Validation covers saved paving repairs, scenery persistence, collision-safe NPC movement/speech, native guardian proportions, modular indoor placement, arena/team/healing behavior, day/night distributions, English movement, gate cancellation and return/reload safety. New sprite transparency and original NPC atlas hashes are checked. Automated traversal additionally checks connected main and side maps and reload stability. Browser/phone visual QA was not performed: the managed Sites browser-control tool is not available.
