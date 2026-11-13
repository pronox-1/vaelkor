# Release 138

NPCs enter their destination as soon as they arrive instead of waiting outside until their timetable phase ends. During short plaza meetings they stop, leave space between each other and face each other for dialogue. Outdoor route planning uses outdoor collisions even when the player is inside a building.

Deck cards show symbolic formulas independent of the last active monster, including attack, protection, healing and synchro cards. Combat cards put the current stat after its name, for example `7 + 2× AP (6)`. Damage and support calculations remain unchanged.

Validation: targeted NPC movement, early indoor arrival, facing and collision tests; all 934 card models checked for independence from the active monster; existing full regression suite and byte-for-byte asset audit. Phone appearance has not been manually checked in this environment.
