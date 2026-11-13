# Release 136

- Combat has an upper-right fullscreen toggle using the existing native/fullscreen-fallback owner.
- Every new fight initializes both sides at the active monster's full normal energy and clears all battle-only modifiers. Completed movement and held input are settled when returning to the world.
- Energy-up cards grant immediate and recurring battle energy (up to +3). Twelve collectible energy-drain variants use the supplied down-arrow artwork, cost 2, reduce energy by 1 for that fight and preserve a minimum of one per round, including after switching monsters. Higher rarity also receives the existing utility shield budget.
- Breeding costs 1,000 coins; Joe's single-use discount reduces it to 500. Obsolete purchasable nursery price reductions are removed; saved building data and breeding progress remain intact.
- Harvested bushes use a separate cached foliage tint without red berries; ripe visuals return after the existing one-day regrowth period. Original art files are untouched.
- Map teleporters have a directional stone-arrow tile with a matching one-tile trigger. The existing 1.5-second cancelable countdown remains. Outward movement stops on the tile; walking inward or sideways cancels it. Buildings retain their door triggers.
- Side branches are capped at two maps. Existing third-map saves retain their contents and return link. Side-map roads connect their actual exits and building entrances, rather than inheriting unused north/south roads. Labels include the parent wilderness number, side and branch index.
- Storage transfers are permitted inside the nursery. A living active team monster can be selected while traveling. Inventory and denial messages explain the difference; the home adventure view renders the current active monster.
- Quest view separates active NPC quests from the existing achievement rewards.
- Appearance changes at beds require deliberate interaction; closing no longer reopens automatically.
- Tent atlases prewarm from the starting town; a bounded high-density drawing surface preserves detail. Furniture scales are reduced consistently while collision footprints use the same dimensions.
- Furniture/prop edge preparation reduces remaining green spill and adds a subtle near-black contour. Town lamps use the same artwork and size; extra lamps around the fountain are removed, retaining its four existing lamps. Light pools/cones are wider and softer.

Validation uses real game code in Node VM fixtures, including battle state, energy effects, quest/breeding economy, actual map movement, transitions, saved-map migration, portraits and card rendering. This environment does not provide phone/browser visual testing; those appearance checks remain a manual release check.

Completed verification: 30 main maps and all generated side chains, exact returns and stable reload geometry; legacy town exit migration; 41 focused card/language/stat/team checks; 30 economy/status/teleporter checks; 14 audit/foundation checks; 14 latest fullscreen/combat checks. The first full-suite run passed 255 checks; eight findings concerned old nursery/card-count expectations or intentional script changes, and one identified an incorrect roadside-lamp classification introduced by the size normalization. The classification was corrected; all nine affected checks were rerun successfully. The latest town-biome regression passed all six checks.

Final cold-start check: reloading directly in the desert town requests the caravan tent atlas during scene preparation. Door prewarming resolves normal and ruined tent flags before entering; both focused checks passed.
