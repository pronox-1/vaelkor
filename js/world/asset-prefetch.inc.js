// BEGIN VAELKOR ASSET PREFETCH v139
// Only request shared image sources; never generate or persist a neighbour map.
const vkPrefetch139={queue:[],keys:new Set(),active:0,started:0,peak:0,timer:null,scene:null};
function vkPrefetchAllowed139(){const net=navigator.connection;return !document.hidden&&!net?.saveData&&!/^(slow-)?2g$/.test(net?.effectiveType||'');}
function vkQueueImage139(key,load){if(!vkPrefetchAllowed139()||vkPrefetch139.keys.has(key)||vkPrefetch139.queue.length>=24)return;vkPrefetch139.keys.add(key);while(vkPrefetch139.keys.size>96)vkPrefetch139.keys.delete(vkPrefetch139.keys.values().next().value);vkPrefetch139.queue.push({key,load});vkPumpImages139();}
function vkPumpImages139(){if(vkPrefetch139.timer||!vkPrefetch139.queue.length||vkPrefetch139.active>=2||!vkPrefetchAllowed139())return;vkPrefetch139.timer=setTimeout(()=>{vkPrefetch139.timer=null;if(!vkPrefetchAllowed139())return;const job=vkPrefetch139.queue.shift();if(!job)return;vkPrefetch139.active++;vkPrefetch139.started++;vkPrefetch139.peak=Math.max(vkPrefetch139.peak,vkPrefetch139.active);const queue=window.parent.VaelkorAssetQueue145;
 let settled=false,watched=null,onLoad=null,onError=null;const finish=result=>{if(settled)return;settled=true;watched?.removeEventListener?.('load',onLoad);watched?.removeEventListener?.('error',onError);vkPrefetch139.active--;if(!result.ok)vkPrefetch139.keys.delete(job.key);vkPumpImages139();};
 if(queue)queue.enqueue('world:'+job.key,()=>{if(!vkPrefetchAllowed139())return null;return window.parent.VaelkorGraphics147?.optional?window.parent.VaelkorGraphics147.optional(()=>job.load()):job.load();}).then(finish,()=>finish({ok:false}));
 else{let im;try{im=window.parent.VaelkorGraphics147?.optional?window.parent.VaelkorGraphics147.optional(()=>job.load()):job.load();}catch(_){finish({ok:false});return;}if(!im){finish({ok:false});return;}if(im.complete&&im.naturalWidth)finish({ok:true});else{watched=im;onLoad=()=>finish({ok:true});onError=()=>finish({ok:false});im.addEventListener?.('load',onLoad,{once:true});im.addEventListener?.('error',onError,{once:true});}}
 vkPumpImages139();},250);}
function vkPrefetchRoom145(id){const record=vkRecords127.get(id);return record?vkImage127(record.set,'low'):vkSourceImageBefore127(id,'low');}
function vkPrefetchMap139(id){const meta=window.parent.VaelkorWildlandsCore.info(id),region=VK_GRAPHIC_REGIONS[Math.floor(Math.max(1,meta.level)/10)%VK_GRAPHIC_REGIONS.length];vkQueueImage139('biome:'+region.key,()=>vkExpansionEnsure(region.key));
 if(id==='property:gruenwald'||id==='main:1'){
  // Arena exterior first: this used to be requested only on entering -1.
  vkQueueImage139('arena-outside',()=>vkNewAtlasImages.abenteuer_arena);
  vkQueueImage139('arena-inside',()=>vkImage127('arena','low'));
  vkQueueImage139('nursery-outside',()=>vkPrefetchRoom145('nurseryOutside134'));
  if(vkMountArt150){vkQueueImage139('stable-outside',()=>vkRoomImage91('stableOutside150'));vkQueueImage139('stable-inside',()=>vkRoomImage91('stable150'));for(const name of ['luca','erik']){const view=vkMountArt150.profiles[name]?.render155?.outdoor;if(view)vkQueueImage139('staff:'+name,()=>vkImage127(view.set,'low'));}}
 }
 // At a biome boundary the shared atlas and a small selection of that biome's
 // generator sources cover the adjacent scenery without retaining whole scenes.
 for(const a of Object.values(vkGeneratorCatalog133?.assets||{}).filter(a=>a.view==='outdoor'&&a.contexts.includes(meta.isTown?'town':region.key)).slice(0,4))vkQueueImage139('asset:'+a.id,()=>vkPrefetchRoom145(a.id));
}
function vkPrefetchNeighbours139(){if(!vkWildSpec||!vkPrefetchAllowed139())return;const id=vkWildCurrentId;if(vkPrefetch139.scene===id){vkPumpImages139();return;}vkPrefetch139.scene=id;for(const job of vkPrefetch139.queue)vkPrefetch139.keys.delete(job.key);vkPrefetch139.queue.length=0;window.parent.VaelkorAssetQueue145?.cancelQueued?.('world:');
 // Drop cancelled queued keys so returning to this neighbourhood can queue them.
 if(id==='main:1'||id==='property:gruenwald'){vkQueueImage139('arena-outside',()=>vkNewAtlasImages.abenteuer_arena);vkQueueImage139('arena-inside',()=>vkImage127('arena','low'));}
 const links=Object.values(vkWildSpec.exits||{}).slice(0,4);for(const link of links)vkPrefetchMap139(link.mapId);
 vkPumpImages139();
}
const vkWarmSceneBefore139=vkWarmScene135;
vkWarmScene135=function(){vkWarmSceneBefore139();vkPrefetchNeighbours139();};
document.addEventListener('visibilitychange',()=>{if(!document.hidden)vkPrefetchNeighbours139();});
Object.assign(window.VaelkorPerformance137,{prefetch:()=>({active:vkPrefetch139.active,queued:vkPrefetch139.queue.length,started:vkPrefetch139.started,peak:vkPrefetch139.peak,keys:vkPrefetch139.keys.size})});
// END VAELKOR ASSET PREFETCH v139
