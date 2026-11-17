# Release181

Desert encounter grass: five rather than three dry tussocks per tile, darker ochre stems, light highlights, stronger sand tint with the existing feathered edge masks and bounded tile cache. Encounter tiles and probabilities unchanged.

Combat layout: portraits align to the upper edge; a fixed25px horizontal effect row stays present independently of stun, damage over time and other effects. The shield bar retains its layout slot at zero, without showing an active shield. Five normal stats remain distinct from combat effects.

HP: one shared transfer helper copies only finite, clamped HP by monster ID for normal finishes and arena finishes. Existing level-up and item healing remain valid. Fight cleanup explicitly zeros actor and unit shields/wards and clears unit status/stat/energy bonus fields on all bench members too. Fresh fights keep zero shield while preserving normal SP as the card multiplier. Continuing an existing saved arena fight keeps that fight's state.

Validation: 4 targeted regressions including consecutive fights, wins/losses, KO/bench HP, shield/stat reset and real Canvas desert contrast/soft edges; broader combat regressions and full suite. Browser/phone GPU verification unavailable. Original images and movement files untouched.
