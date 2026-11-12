/* VAELKOR map identity foundation. Metadata only: no terrain generation or navigation. */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.VaelkorMapData = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const VERSION = 1;
  const opposites = Object.freeze({ left: 'right', right: 'left', north: 'south', south: 'north', next: 'previous', previous: 'next' });
  const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
  const plain = value => value !== null && typeof value === 'object' && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
  function fail(message) { throw new Error('Map registry: ' + message); }
  function ordinal(value) {
    if (typeof value === 'number') { if (!Number.isSafeInteger(value) || value < 1) fail('invalid ordinal'); value = String(value); }
    if (typeof value !== 'string' || !/^[1-9][0-9]{0,127}$/.test(value)) fail('invalid ordinal');
    return value;
  }
  function mainId(index) { return 'main:' + ordinal(index); }
  function component(text) {
    if (typeof text !== 'string' || !text.length || text.length > 256) fail('invalid anchor');
    return encodeURIComponent(text);
  }
  function parseId(id) {
    if (typeof id !== 'string' || id.length > 2048) fail('invalid id');
    let m = /^main:([1-9][0-9]{0,127})$/.exec(id);
    if (m) return { type: 'main', ordinal: m[1] };
    m = /^property:([a-z][a-z0-9-]{0,63})$/.exec(id);
    if (m) return { type: 'property', settlement: m[1] };
    m = /^side:([1-9][0-9]{0,127}):(left|right):([1-3])$/.exec(id);
    if (m) return { type: 'side', mainId: mainId(m[1]), side: m[2], index: Number(m[3]) };
    m = /^inside:([^:]+):([^:]+)$/.exec(id);
    if (m) {
      let parentId, anchor;
      try { parentId = decodeURIComponent(m[1]); anchor = decodeURIComponent(m[2]); } catch (_) { fail('invalid encoded id'); }
      if (encodeURIComponent(parentId) !== m[1] || component(anchor) !== m[2]) fail('noncanonical id');
      parseId(parentId);
      return { type: 'interior', parentId, anchor };
    }
    fail('invalid id');
  }
  function sideId(parent, side, index) {
    const info = parseId(parent);
    if (info.type !== 'main' || !['left', 'right'].includes(side) || ![1, 2, 3].includes(index)) fail('invalid side identity');
    return 'side:' + info.ordinal + ':' + side + ':' + index;
  }
  function interiorId(parent, anchor) {
    parseId(parent);
    const id = 'inside:' + encodeURIComponent(parent) + ':' + component(anchor);
    parseId(id); return id;
  }
  function port(value) {
    if (typeof value !== 'string' || (!own(opposites, value) && value !== 'exit' && !/^enter:[^:]+$/.test(value))) fail('invalid port');
    if (value.startsWith('enter:')) {
      let anchor; try { anchor = decodeURIComponent(value.slice(6)); } catch (_) { fail('invalid entry anchor'); }
      if (component(anchor) !== value.slice(6)) fail('noncanonical entry anchor');
    }
    return value;
  }
  function entryPort(anchor) { return 'enter:' + component(anchor); }
  function opposite(value) { port(value); return opposites[value] || (value.startsWith('enter:') ? 'exit' : null); }
  function checkPair(a, b) {
    port(a); port(b);
    if (own(opposites, a) ? opposites[a] !== b : a === 'exit' ? !b.startsWith('enter:') : b !== 'exit') fail('ports are not reciprocal');
  }
  function jsonCopy(value) {
    const seen = new Set(); let nodes = 0;
    function copy(v, depth) {
      if (++nodes > 20000 || depth > 40) fail('state too large or too deep');
      if (v === null || typeof v === 'string' || typeof v === 'boolean') return v;
      if (typeof v === 'number' && Number.isFinite(v)) return v;
      if (!Array.isArray(v) && !plain(v)) fail('state must be JSON data');
      if (seen.has(v)) fail('cyclic state'); seen.add(v);
      let result;
      if (Array.isArray(v)) result = Array.from(v, item => copy(item, depth + 1));
      else {
        result = {};
        for (const key of Object.keys(v)) {
          if (['__proto__', 'prototype', 'constructor'].includes(key)) fail('unsafe state key');
          result[key] = copy(v[key], depth + 1);
        }
        if (Object.getOwnPropertySymbols(v).length) fail('symbol state key');
      }
      seen.delete(v); return result;
    }
    return copy(value, 0);
  }
  function seedFor(worldSeed, id) {
    parseId(id);
    if (!Number.isInteger(worldSeed) || worldSeed < 0 || worldSeed > 0xffffffff) fail('invalid world seed');
    let hash = 2166136261;
    for (const char of String(worldSeed) + '|' + id) { hash ^= char.charCodeAt(0); hash = Math.imul(hash, 16777619); }
    return hash >>> 0;
  }
  function open(raw, options = {}) {
    if (raw != null && (!plain(raw) || raw.version !== VERSION)) fail('unsupported schema; existing data must be preserved');
    const worldSeed = raw?.worldSeed ?? options.worldSeed ?? 1042;
    seedFor(worldSeed, 'main:1');
    const document = { version: VERSION, worldSeed, maps: {} };
    function record(input) {
      if (!plain(input)) fail('invalid record');
      const info = parseId(input.id);
      if (input.type !== info.type) fail('id/type mismatch');
      const seed = input.seed ?? seedFor(worldSeed, input.id);
      if (!Number.isSafeInteger(seed)) fail('invalid seed');
      if (input.templateId != null && (typeof input.templateId !== 'string' || !input.templateId.length)) fail('invalid template');
      const state = input.state == null ? {} : jsonCopy(input.state);
      if (!plain(state)) fail('map state must be an object');
      const result = { id: input.id, type: info.type, seed, templateId: input.templateId ?? null, links: {}, state };
      if (input.legacy != null) result.legacy = jsonCopy(input.legacy);
      return result;
    }
    if (raw?.maps != null && !plain(raw.maps)) fail('invalid maps');
    for (const [id, value] of Object.entries(raw?.maps || {})) {
      if (value?.id !== id) fail('record key/id mismatch');
      document.maps[id] = record(value);
    }
    for (const [id, value] of Object.entries(raw?.maps || {})) {
      if (value.links != null && !plain(value.links)) fail('invalid links');
      for (const [fromPort, link] of Object.entries(value.links || {})) {
        if (!plain(link) || !own(document.maps, link.mapId)) fail('dangling link');
        checkPair(fromPort, link.entry);
        if (id === link.mapId) fail('self connection');
        document.maps[id].links[fromPort] = { mapId: link.mapId, entry: link.entry };
      }
    }
    for (const map of Object.values(document.maps)) for (const [fromPort, link] of Object.entries(map.links)) {
      const reverse = document.maps[link.mapId].links[link.entry];
      if (!reverse || reverse.mapId !== map.id || reverse.entry !== fromPort) fail('asymmetric saved connection');
    }
    function required(id) { parseId(id); if (!own(document.maps, id)) fail('unknown map ' + id); return document.maps[id]; }
    function changed() { if (typeof options.onChange === 'function') options.onChange(); }
    const api = {
      create(input) {
        const next = record(input), previous = document.maps[next.id];
        if (input.links != null && Object.keys(input.links).length) fail('use connect to create links');
        if (previous) {
          if (previous.seed !== next.seed || previous.templateId !== next.templateId) fail('identity metadata conflict');
          return jsonCopy(previous);
        }
        document.maps[next.id] = next; changed(); return jsonCopy(next);
      },
      setTemplate(id, templateId) {
        const map = required(id);
        if (typeof templateId !== 'string' || !templateId.length) fail('invalid template');
        if (map.templateId !== null && map.templateId !== templateId) fail('template identity conflict');
        if (map.templateId === templateId) return false;
        map.templateId = templateId; changed(); return true;
      },
      has(id) { parseId(id); return own(document.maps, id); },
      get(id) { return jsonCopy(required(id)); },
      connect(fromId, fromPort, toId, toPort = opposite(fromPort)) {
        const from = required(fromId), to = required(toId); checkPair(fromPort, toPort);
        if (fromId === toId) fail('self connection');
        const a = from.links[fromPort], b = to.links[toPort];
        if (a && (a.mapId !== toId || a.entry !== toPort) || b && (b.mapId !== fromId || b.entry !== fromPort)) fail('occupied port');
        if (a && b) return false;
        from.links[fromPort] = { mapId: toId, entry: toPort }; to.links[toPort] = { mapId: fromId, entry: fromPort };
        changed(); return true;
      },
      resolve(id, fromPort) { const map = required(id); port(fromPort); return map.links[fromPort] ? { ...map.links[fromPort] } : null; },
      disconnect(id, fromPort) {
        const from = required(id); port(fromPort); const link = from.links[fromPort]; if (!link) return false;
        const to = required(link.mapId), reverse = to.links[link.entry];
        if (!reverse || reverse.mapId !== id || reverse.entry !== fromPort) fail('asymmetric connection');
        delete from.links[fromPort]; delete to.links[link.entry]; changed(); return true;
      },
      getState(id) { return jsonCopy(required(id).state); },
      patchState(id, patch) {
        const map = required(id), clean = jsonCopy(patch); if (!plain(clean)) fail('state patch must be an object');
        const next = { ...map.state, ...clean };
        if (JSON.stringify(next) === JSON.stringify(map.state)) return false;
        map.state = next; changed(); return true;
      },
      snapshot() { return JSON.parse(JSON.stringify(document)); },
      attach(world) { if (!plain(world)) fail('invalid save owner'); world.mapRegistry = document; },
      size() { return Object.keys(document.maps).length; }
    };
    return api;
  }
  return Object.freeze({ version: VERSION, mainId, sideId, interiorId, parseId, entryPort, opposite, seedFor, open });
});
