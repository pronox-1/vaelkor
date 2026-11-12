# English language performance and coverage

The user-confirmed stable baseline is the published source commit f0a20ab6c8e8ec753a4cd0f5735a8db47f10c05b (12 November 2026). Its saved Site version remains available. This patch keeps graphics, sprites, movement timing, layouts, combat calculations, cards, world generation and save formats intact.

## Findings

The language observer scanned the entire parent document after any observed change, including each step counter update. Each translated string rebuilt regular expressions for the complete dictionary. Its own writes could schedule another full pass. Newly added nested accessibility attributes were not traversed. The embedded world document and canvas labels were outside translation coverage. Cards registered after language-engine initialization were missing from its name dictionary.

## Changes

- Compile one longest-match Unicode-aware translation expression per dictionary refresh; bounded 1,024-entry string cache. Exact reviewed phrases take priority. No cascading substring replacements.
- Queue only added/changed text subtrees and attributes, coalesced by animation frame. Ignore the translator's own writes. German-mode movement schedules no translation work. Full scans happen only at startup, language changes or explicit refresh, not each step.
- Translate nested title, aria-label, placeholder and alt attributes using original-value tracking. Restore original German on language changes, preserving dynamic game updates.
- Attach only to the existing same-origin vkIntegratedWorld frame. Observe its changed DOM text and translate canvas fillText/strokeText/measureText without touching coordinates or movement. Invalidate the existing world drawing cache once when the language changes. No second world loop or renderer.
- New reviewed language-catalog.js contains all 448 active combat/Synchro card names plus newer monster stats/growth, support formulas, inventory, fountain travel, world/entry labels, menu actions and tutorial text. Refresh late registered names on DOM ready. Monster species names, IDs, data attributes and saves remain unchanged.

## Verification

133 targeted automated tests passed. The 11 locale tests cover saved language and exact German restoration, 200 step updates with exactly 200 translated nodes and no additional full scan or compilation, feedback suppression, nested accessibility text, changing dynamic values, bounded cache, embedded DOM/canvas text, late registered cards, all 448 named cards, current stat lessons, complete basic/Synchro tutorial copy and real embedded movement/idle parity at 60/30/15 simulated FPS. Existing stats, genetics, card rendering, portrait loading, boosters, tutorials, world transitions, stable map IDs, old saves and animation tests passed alongside them. Relevant language/foundation tests repeated after final catalog additions.

No physical phone or browser visual/FPS test was performed. These are actual game-code runtime tests with DOM/canvas test doubles, not device performance measurements. English content coverage was audited for active card names/effect text, current menus and tutorial text; creature proper names intentionally stay unchanged. Future newly added prose still requires a reviewed catalog entry.
