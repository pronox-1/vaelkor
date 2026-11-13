/* Persistent, lazy map expansion on the existing registry and scene generator. */
(function(root,factory){
 'use strict';
 const library=factory(typeof module==='object'&&module.exports?require('./map-registry.js'):root.VaelkorMapData);
 if(typeof module==='object'&&module.exports)module.exports=library;
 else {root.VaelkorWildlandsCore=library;try{root.VaelkorWildlands=library.install({maps:root.VaelkorWorldMaps,getWorld:()=>data,persist:()=>vkPersistUnified()});const frame=root.document.getElementById('vkIntegratedWorld');const attach=()=>frame?.contentWindow?.VaelkorWildScene?.attach();frame?.addEventListener('load',attach);root.addEventListener('pagehide',()=>root.VaelkorWildlands.flushPositions());root.document.addEventListener('visibilitychange',()=>{if(root.document.hidden)root.VaelkorWildlands.flushPositions();});attach();}catch(error){console.warn('VAELKOR Wildlands bleibt deaktiviert:',error.message);root.VaelkorWildlands={available:false};}}
})(typeof globalThis!=='undefined'?globalThis:this,function(identity){
 'use strict';
 const VERSION=1;
 const templates=Object.freeze([
  {id:'wildlands-v1/edge-river',waterKind:0,density:.9,patchScale:1},
  {id:'wildlands-v1/river-crossing',waterKind:1,density:.85,patchScale:.9},
  {id:'wildlands-v1/lake-trail',waterKind:2,density:1,patchScale:1.1},
  {id:'wildlands-v1/dry-trail',waterKind:3,density:1.05,patchScale:1}
 ].map(t=>Object.freeze({...t,terrain:'existing-biome-grass',walkable:'existing-north-south-spine',obstacles:'off-road-with-existing-collision-buffer',objectPositions:'grass-away-from-road-and-buildings',exits:'plan-defined-with-validated-connectors'})));
 const defaults=Object.freeze({branchProbability:.5,bothProbability:.16,maxBranchLength:2});
 function increment(text,delta=1){let n=BigInt(text)+BigInt(delta);if(n<1n)throw Error('No previous main map');return n.toString();}
 function info(id){const p=identity.parseId(id);if(p.type==='property')return {...p,ordinal:'1',level:1,wildLevel:0,isTown:false};const ordinal=p.type==='main'?p.ordinal:p.type==='side'?identity.parseId(p.mainId).ordinal:null;if(!ordinal)throw Error('Interior generation is reserved for a later update');return {...p,ordinal,wildLevel:Math.max(0,Math.min(Number(ordinal)-1,Number.MAX_SAFE_INTEGER-1043)),level:Math.min(Number(ordinal),Number.MAX_SAFE_INTEGER-1042),isTown:p.type==='main'&&(ordinal==='1'||ordinal.endsWith('0'))};}
 function config(raw={}){const c={...defaults,...raw};if(c.maxBranchLength===3)c.maxBranchLength=2;for(const k of ['branchProbability','bothProbability'])if(!Number.isFinite(c[k])||c[k]<0||c[k]>1)throw Error('Invalid '+k);if(!Number.isInteger(c.maxBranchLength)||c.maxBranchLength<1||c.maxBranchLength>3)throw Error('Invalid branch length');return c;}
 function plan(id,worldSeed,settings={}){
  const c=config(settings),m=info(id),random=tag=>identity.seedFor(worldSeed,identity.interiorId(id,tag))/4294967296;
  const exits={},branches={};
  if(m.type==='main'){
   exits.next={mapId:identity.mainId(increment(m.ordinal)),entry:'previous'};
   if(m.ordinal!=='1')exits.previous={mapId:identity.mainId(increment(m.ordinal,-1)),entry:'next'};
   if(random('branch')<c.branchProbability){
    const sides=random('both')<c.bothProbability?['left','right']:[random('side')<.5?'left':'right'];
    for(const side of sides){branches[side]=1+Math.floor(random('length-'+side)*c.maxBranchLength);exits[side]={mapId:identity.sideId(id,side,1),entry:identity.opposite(side)};}
   }
  }
  if(id==='main:1')exits.south={mapId:'property:gruenwald',entry:'north'};
  if(m.type==='property')exits.north={mapId:'main:1',entry:'south'};
  const template=m.type==='property'?{id:'property-v1/plain-grass',waterKind:3,density:0,patchScale:0}:m.isTown?{id:'legacy-v104/hub',waterKind:null}:templates[Math.floor(random('template')*templates.length)];
  return {version:VERSION,id,level:m.level,wildLevel:m.wildLevel,isTown:m.isTown,type:m.type,templateId:template.id,waterKind:template.waterKind,density:template.density??1,patchScale:template.patchScale??1,branches,exits};
 }
 function install(options){
  if(!options.maps?.available)throw Error('Existing map registry is unavailable');
  const maps=options.maps;let owner=null,activeId=null,busy=false,positionTimer=null;
  const schedule=options.schedule||setTimeout,cancel=options.cancel||clearTimeout;
  function cancelPosition(){if(positionTimer!==null){cancel(positionTimer);positionTimer=null;}}
  function flushPositions(){if(positionTimer===null)return true;cancelPosition();return options.persist();}
  function world(){const w=options.getWorld();if(w!==owner){cancelPosition();owner=w;activeId=null;}return w;}
  function seed(){return world().mapRegistry?.worldSeed??1042;}
  function ensure(id){
   const w=world(),m=info(id);
   if(!maps.has(id)){
    const safe=m.type==='main'&&Number.isSafeInteger(Number(m.ordinal))&&Number(m.ordinal)<=Number.MAX_SAFE_INTEGER-1042;
    maps.create({id,type:m.type,seed:safe?1041+m.level:identity.seedFor(seed(),id),templateId:null,legacy:{zone:m.level}});
   }
   let state=maps.getState(id);
   if(!state.wildlands){
    const p=plan(id,seed(),w.wildlandsConfig||options.config);
    // Preserve the original seed-based layout of already reached legacy main maps.
    const frontier=Number(w.wildlandsLegacyFrontier??Math.max(w.zone||1,w.maxZone||1));
    if(m.type==='main'&&m.level<=frontier){p.templateId='legacy-v104/existing';p.waterKind=null;p.density=1;p.patchScale=1;}
    if(m.type==='side'){
     const parent=ensure(m.mainId).plan,length=parent.branches[m.side];
     if(!length||m.index>length)throw Error('Side map is outside its saved branch');
     p.branch={side:m.side,index:m.index,length,parentId:m.mainId};
     const back=identity.opposite(m.side);
     p.exits[back]={mapId:m.index===1?m.mainId:identity.sideId(m.mainId,m.side,m.index-1),entry:m.side};
     if(m.index<length)p.exits[m.side]={mapId:identity.sideId(m.mainId,m.side,m.index+1),entry:back};
    }
    maps.setTemplate(id,p.templateId);maps.patchState(id,{wildlands:p});state=maps.getState(id);
   }
   if(m.type==='main'&&Object.values(state.wildlands.branches||{}).some(n=>n>2)){const p={...state.wildlands,branches:{...state.wildlands.branches}};for(const side of Object.keys(p.branches))p.branches[side]=Math.min(2,p.branches[side]);maps.patchState(id,{wildlands:p});state=maps.getState(id);}
   if(m.type==='side'&&state.wildlands.branch?.length>2){const p={...state.wildlands,branch:{...state.wildlands.branch,length:2},exits:{...state.wildlands.exits}};delete p.exits[m.side];if(m.index<2)p.exits[m.side]={mapId:identity.sideId(m.mainId,m.side,m.index+1),entry:identity.opposite(m.side)};maps.patchState(id,{wildlands:p});state=maps.getState(id);}
   if(state.wildlands.version!==VERSION)throw Error('Unknown Wildlands plan version');
   if(state.wildlands.wildLevel==null||id==='main:1'&&!state.wildlands.exits.south){const p={...state.wildlands,wildLevel:m.wildLevel,exits:{...state.wildlands.exits}};if(id==='main:1')p.exits.south={mapId:'property:gruenwald',entry:'north'};maps.patchState(id,{wildlands:p});state=maps.getState(id);}
   if(m.type==='property'&&!state.construction){maps.patchState(id,{construction:{version:1,reservedAreas:[{kind:'entrance',x:14,y:0,width:3,height:7}],buildableBounds:{x:3,y:6,width:24,height:28},buildings:[],decorations:[],paths:[],plants:[]}});state=maps.getState(id);}

   return {id,record:maps.get(id),plan:state.wildlands,scene:state.scene||null};
  }
  const clone=value=>JSON.parse(JSON.stringify(value)); // also normalizes iframe objects into the save's realm
  function remember(engine){if(!activeId)return;const scene=clone(engine.capture());scene.level=info(activeId).level;maps.patchState(activeId,{scene});}
  function open(id,engine,entry=null,position=null){
   world();if(busy)return false;cancelPosition();busy=true;
   const previousId=activeId,previous=previousId?clone(engine.capture()):null;
   if(previous)previous.level=info(previousId).level;
   const w=world(),before={zone:w.zone,vkMapId:w.vkMapId,vkWorldX:w.vkWorldX,vkWorldY:w.vkWorldY,trainerCleared:w.trainerCleared,vkWorldFromTop:w.vkWorldFromTop};
   try{
    if(w.wildlandsLegacyFrontier==null)w.wildlandsLegacyFrontier=Math.max(w.zone||1,w.maxZone||1);
    remember(engine);const destination=ensure(id);
    const scenePlan={...destination.plan,cleared:destination.plan.type==='main'&&!!w.clearedZones?.[destination.plan.level]};
    if(destination.scene){engine.restore(clone(destination.scene),scenePlan);engine.upgrade?.(scenePlan);}
    else {engine.generate({...scenePlan,seed:destination.record.seed});engine.prepare(scenePlan);}
    engine.validate(destination.plan);
    engine.place(entry,position,destination.plan);
    const scene=clone(engine.capture());maps.patchState(id,{scene});
    activeId=id;w.vkMapId=id;w.zone=destination.plan.level;w.vkWorldFromTop=false;
    w.trainerCleared=!!scene.guardian?.defeated;const point=engine.position();w.vkWorldX=point.x;w.vkWorldY=point.y;
    if(options.persist()===false)throw Error('Spielstand konnte nicht gespeichert werden (Speicher voll?).');
    return true;
   }catch(error){
    activeId=previousId;Object.assign(w,before);
    if(previous)engine.restore(previous,maps.getState(previousId).wildlands);
    engine.report?.(error);return false;
   }finally{busy=false;}
  }
  function travel(port,engine){
   world();if(busy||!activeId)return false;const source=ensure(activeId),link=source.plan.exits[port];if(!link)return false;
   const target=ensure(link.mapId),back=target.plan.exits[link.entry];
   if(!back||back.mapId!==activeId||back.entry!==port)throw Error('Planned exit has no matching return');
   maps.connect(activeId,port,link.mapId,link.entry);return open(link.mapId,engine,link.entry);
  }
  return Object.freeze({available:true,templates,ensure,open,travel,flushPositions,
   persistPosition(){world();if(positionTimer===null)positionTimer=schedule(()=>{positionTimer=null;options.persist();},750);},
   openLegacy(level,engine,fromTop=false,requestedId=null,requestedPosition=null){
    const w=world(),saved=w.vkMapId;let id=identity.mainId(level);
    if(requestedId&&info(requestedId).level===level)id=requestedId;
    else if(activeId&&info(activeId).level===level)id=activeId;
    else if(!activeId&&saved){try{if(info(saved).level===level)id=saved;}catch(_){}}
    const position=requestedPosition&&Number.isFinite(requestedPosition.x)&&Number.isFinite(requestedPosition.y)?requestedPosition:!activeId&&Number.isFinite(w.vkWorldX)&&Number.isFinite(w.vkWorldY)?{x:w.vkWorldX,y:w.vkWorldY}:null;
    return open(id,engine,position?null:fromTop?'next':null,position);
   },
   saveCurrent(engine){world();if(busy)return false;remember(engine);return options.persist();},
   get worldSeed(){return seed();},get currentId(){world();return activeId;},get busy(){return busy;}
  });
 }
 return Object.freeze({version:VERSION,templates,defaults,info,increment,plan,install});
});
