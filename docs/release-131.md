# Release 131

Outdoor night opacity increased from 0.38 to 0.46; interior lighting unchanged.

Southern return gate now accepts half-tile lateral offsets. Arena exit uses tile-centered coordinates. Legacy edge saves recover inward safely, and first-frame gate detection no longer latches an unstarted transition. Manual cancellation and 1.5-second transition timing remain intact.

Validation: 18 gate/release/world-style tests and 42 gate/NPC/team/language/map tests passed (overlapping gate coverage). Actual embedded movement tested at 60, 30 and 15 FPS; arena visit, cancellation/re-entry and legacy save recovery covered. No real browser or phone visual test performed in this environment.

Includes the previously prepared release 130 world-style improvements. Original assets preserved.
