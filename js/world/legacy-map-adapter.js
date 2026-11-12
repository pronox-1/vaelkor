/* Bridge to the existing numeric wilderness and unified save. No map switching. */
(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./map-registry.js'));
  else {
    const adapter = factory(root.VaelkorMapData);
    try {
      root.VaelkorWorldMaps = adapter.install({
        getWorld: () => data,
        persist: () => vkPersistUnified(),
        getFrame: () => document.getElementById('vkIntegratedWorld'),
        listen: handler => root.addEventListener('message', handler),
        report: error => console.warn('VAELKOR: Kartenmetadaten bleiben erhalten; bisherige Wildnis bleibt aktiv.', error.message)
      });
    } catch (error) {
      // Never replace an unreadable/newer registry, or prevent the old game starting.
      console.warn('VAELKOR: Kartenregister nicht aktiviert; Spielstand unverändert.', error.message);
      root.VaelkorWorldMaps = { available: false, error: error.message };
    }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (maps) {
  'use strict';
  function legacyZone(value) {
    if (!Number.isSafeInteger(value) || value < 1 || value > Number.MAX_SAFE_INTEGER - 1041) throw new Error('Invalid legacy zone');
    return value;
  }
  function install(options) {
    let owner = null, registry = null, pending = false, lastLevel = null;
    const queue = options.queue || (callback => queueMicrotask(callback));
    function persistSoon() {
      if (pending) return; pending = true;
      queue(() => { pending = false; try { options.persist(); } catch (error) { options.report?.(error); } });
    }
    function store() {
      const world = options.getWorld();
      if (world !== owner) {
        // Opening is transactional: on failure the original save field is untouched.
        const next = maps.open(world.mapRegistry, { onChange: persistSoon });
        next.attach(world); owner = world; registry = next; lastLevel = null;
      }
      return registry;
    }
    function ensureMain(zone) {
      legacyZone(zone); const graph = store(), id = maps.mainId(zone);
      if (!graph.has(id)) graph.create({ id, type: 'main', seed: 1041 + zone, legacy: { zone }, state: {} });
      return id;
    }
    function capture(zone = options.getWorld().zone) {
      const graph = store(), previous = lastLevel, id = ensureMain(zone);
      // Semantic progression ports, not screen directions: town exits differ from wilderness exits.
      if (previous !== null && Math.abs(previous - zone) === 1) {
        const low = Math.min(previous, zone), high = Math.max(previous, zone);
        graph.connect(ensureMain(low), 'next', ensureMain(high), 'previous');
      }
      lastLevel = zone;
      return id;
    }
    const api = {
      available: true,
      ids: Object.freeze({ main: maps.mainId, side: maps.sideId, interior: maps.interiorId }),
      currentMainId() { return maps.mainId(legacyZone(options.getWorld().zone)); },
      ensureMain,
      ensureInterior(zone, kind, anchor, templateId = null, chestId = null) {
        if (typeof kind !== 'string' || !kind) throw new Error('Invalid interior kind');
        const parentId = ensureMain(zone), id = maps.interiorId(parentId, anchor), graph = store();
        if (!graph.has(id)) graph.create({ id, type: 'interior', templateId, legacy: { zone, kind, anchor, chestId }, state: {} });
        graph.connect(parentId, maps.entryPort(anchor), id, 'exit'); return id;
      },
      create(record) { return store().create(record); },
      has(id) { return store().has(id); },
      setTemplate(...args) { return store().setTemplate(...args); },
      get(id) { return store().get(id); },
      connect(...args) { return store().connect(...args); },
      disconnect(...args) { return store().disconnect(...args); },
      resolve(...args) { return store().resolve(...args); },
      getState(id) { return store().getState(id); },
      patchState(id, patch) { return store().patchState(id, patch); },
      snapshot() { return store().snapshot(); },
      // Existing rewards retain their single, original owner. No duplicate chest flags.
      isLegacyChestOpened(chestId) { return options.getWorld().adventureChests102?.[chestId] === true; },
      captureLegacy: capture
    };
    store(); capture();
    if (options.listen) options.listen(event => {
      const message = event.data, frame = options.getFrame?.();
      if (!frame || event.source !== frame.contentWindow || message?.vkWorld !== 'ready' || message.interior || message.mapId && message.mapId !== maps.mainId(message.level)) return;
      const actual = frame.contentWindow?.VaelkorAdventure102?.snapshot();
      if (!actual || actual.level !== message.level || options.getWorld().zone !== message.level) return;
      try { capture(message.level); } catch (error) { options.report?.(error); }
    });
    return api;
  }
  return Object.freeze({ install });
});
