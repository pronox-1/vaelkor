// BEGIN VAELKOR WILDLANDS SCENE BRIDGE v1
// This fragment lives inside the existing iframe closure; it does not own a second map registry.
function vkInteriorExitContains129(exit){return Math.abs(p.x-exit.x)<=.55&&p.y>=exit.y-.55&&p.y<=exit.y+1.6;}
function vkExitBand131(q,x,y,width=.8,inner=.45){const along=(x-q.x)*q.dx+(y-q.y)*q.dy,across=Math.abs((x-q.x)*q.dy-(y-q.y)*q.dx);return across<=width+1e-6&&along<=inner+1e-6&&along>=-1.6;}
function vkNearExit131(x,y){return Object.values(vkWildExits).find(q=>vkExitBand131(q,x,y,1.3,.8));}
function vkWildGateContains129(q){
 // A player may stand on integer coordinates after an old building return.
 // Include that half-tile offset within the actual opening and keep the
 // outward strip to the border so holding a direction cannot skip the timer.
 return Math.abs(p.x-q.x)<=.5&&Math.abs(p.y-q.y)<=.5;
}
function vkWildService(){try{const api=window.parent.VaelkorWildlands;return api?.available?api:null;}catch(_){return null;}}
function vkWildGuardBlocks(nx,ny){
 if(!guardian?.present||guardian.defeated)return false;
 if(vkWildInitialized&&vkWildService()?.currentId){const gate=vkWildExits.next;return Math.hypot(nx-guardian.x,ny-guardian.y)<1.2||!!gate&&Math.hypot(nx-gate.x,ny-gate.y)<1.05;}
 return ny<2.5&&Math.abs(nx-(exitX+.5))<1.5||Math.hypot(nx-guardian.x,ny-guardian.y)<1.2||townMode&&ny>=H-2.5&&Math.abs(nx-(entryX+.5))<1.1;
}

function vkWildHard(x,y){
 const r=.52;
 if(townMode&&(townBuildings.some(b=>x>=b.x-r&&x<=b.x+b.w+r&&y>=b.y-r&&y<=b.y+b.h+r&&!vkDoorCorridor101(b,x,y))||townProps.some(o=>Math.abs(x-o.x)<o.rx+r&&Math.abs(y-o.y)<o.ry+r)))return true;
 return objects.some(o=>{if(!o.wildHouse102&&!o.chest102)return false;const f=collisionFootprint(o);return Math.abs(x-o.x)<f.rx+r&&Math.abs(y-f.cy)<f.ry+r&&!wildBuildings102.some(b=>b.object102===o&&vkDoorCorridor101(b,x,y));});
}
function vkWildFlood(start){
 const key=(x,y)=>y*W+x,q=[],seen=new Set(),valid=new Map();
 function allowed(x,y){const k=key(x,y);if(!valid.has(k))valid.set(k,pass(x+.5,y+.5));return valid.get(k);}
 const sx=Math.floor(start.x),sy=Math.floor(start.y);if(!allowed(sx,sy))return seen;q.push([sx,sy]);seen.add(key(sx,sy));
 for(let i=0;i<q.length;i++){const[x,y]=q[i];for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,k=key(nx,ny);if(nx<1||ny<1||nx>=W-1||ny>=H-1||seen.has(k)||!allowed(nx,ny))continue;if(![.25,.5,.75].every(f=>pass(x+.5+dx*f,y+.5+dy*f)))continue;seen.add(k);q.push([nx,ny]);}}
 return seen;
}
let vkWildReachCache=null;
function vkWildReach(start){const k=Math.floor(start.y)*W+Math.floor(start.x),cache=vkWildReachCache;if(cache&&cache.map===map&&cache.objects===objects&&cache.buildings===townBuildings&&cache.seen.has(k))return cache.seen;const seen=vkWildFlood(start);vkWildReachCache={map,objects,buildings:townBuildings,seen};return seen;}
function vkWildConnect(goal,start){
 const gx=Math.floor(goal.x),gy=Math.floor(goal.y),reachable=vkTrailRoadComponent(start),key=(x,y)=>y*W+x;
 if(reachable.has(key(gx,gy)))return;
 let route=null;
 for(const allowWater of [false,true]){
  const q=[[gx,gy]],prev=new Map([[key(gx,gy),null]]);let end=null;
  for(let i=0;i<q.length;i++){const[x,y]=q[i],k=key(x,y);if(reachable.has(k)){end=k;break;}for(const[dx,dy]of[[0,1],[0,-1],[1,0],[-1,0]]){const nx=x+dx,ny=y+dy,nk=key(nx,ny);if(nx<1||ny<1||nx>=W-1||ny>=H-1||prev.has(nk)||vkWildHard(nx+.5,ny+.5)||!allowWater&&cell(nx,ny)===types.WATER)continue;prev.set(nk,k);q.push([nx,ny]);}}
  if(end!==null){route=[];for(let k=end;k!==null;k=prev.get(k))route.push([k%W,Math.floor(k/W)]);break;}
 }
 if(!route)throw Error('Kein sicherer Weg zum Ausgang');
 for(const[x,y]of route){map[y][x]=map[y][x]===types.WATER?types.BRIDGE:map[y][x]===types.BRIDGE?types.BRIDGE:types.PATH;objects=objects.filter(o=>{if(!o.block||o.wildHouse102||o.chest102)return true;const f=collisionFootprint(o);return Math.abs(o.x-x-.5)>f.rx+.8||Math.abs(f.cy-y-.5)>f.ry+.8;});}
 vkWildReachCache=null;
 if(!vkWildReach(start).has(key(gx,gy)))throw Error('Ausgang ist trotz Weg nicht begehbar');
}
function vkWildExitGeometry(plan){
 const exits={};for(const port of Object.keys(plan.exits)){
  const q=port==='left'?{x:1.5,y:townMode?27.5:19.5,dx:1,dy:0}:port==='right'?{x:W-1.5,y:townMode?27.5:19.5,dx:-1,dy:0}:(port==='north'||port==='next')?(townMode?{x:plan.id==='main:1'?15.5:2.5,y:1.5,dx:0,dy:1}:{x:exitX+.5,y:1.5,dx:0,dy:1}):{x:entryX+.5,y:H-1.25,dx:0,dy:-1};
  if(vkWildHard(q.x,q.y)){
   const candidates=[];for(let d=1;d<12;d++)for(const sign of [1,-1]){const candidate={...q,y:q.y+sign*d};if(candidate.y>=2.5&&candidate.y<=H-2.5&&!vkWildHard(candidate.x,candidate.y))candidates.push(candidate);}
   if(!candidates.length)throw Error('Kein freier Rand für den Ausgang');Object.assign(q,candidates[0]);
  }
  exits[port]=q;
 }return exits;
}
let vkTrailVersion=0,vkTrailDecor={};
let vkTrailSnowSignCache=null;
function vkTrailSnowSign(image){
 if(vkTrailSnowSignCache)return vkTrailSnowSignCache;
 const canvas=document.createElement('canvas');canvas.width=32;canvas.height=Math.round(32*image.naturalHeight/image.naturalWidth);const g=canvas.getContext('2d');g.imageSmoothingEnabled=false;g.drawImage(image,0,0,canvas.width,canvas.height);g.globalCompositeOperation='source-atop';g.fillStyle='#e9f4fa';g.fillRect(4,Math.round(canvas.height*.13),24,2);g.fillRect(7,Math.round(canvas.height*.38),22,2);g.fillRect(13,1,6,1);g.globalCompositeOperation='source-over';vkTrailSnowSignCache=canvas;return canvas;
}
function vkTrailLibrary(){try{return window.parent.VaelkorTransitionTemplates||null;}catch(_){return null;}}
function vkTrailRoadComponent(start){
 const reachable=vkWildReach(start),roads=new Set([...reachable].filter(k=>[types.PATH,types.BRIDGE].includes(cell(k%W,Math.floor(k/W)))));let largest=new Set();
 while(roads.size){const first=Math.min(...roads),q=[first],group=new Set([first]);roads.delete(first);for(let i=0;i<q.length;i++){const k=q[i],x=k%W,y=Math.floor(k/W);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,nk=ny*W+nx;if(nx<0||nx>=W||!roads.has(nk))continue;roads.delete(nk);group.add(nk);q.push(nk);}}if(group.size>largest.size)largest=group;}
 return largest;
}
function vkTrailExtendToBorder(q){
 for(let distance=0;distance<4;distance++){const x=Math.floor(q.x-q.dx*distance),y=Math.floor(q.y-q.dy*distance);if(x<0||y<0||x>=W||y>=H)break;if(vkWildHard(x+.5,y+.5))throw Error('Kartenrand ist durch ein Gebäude versperrt');map[y][x]=cell(x,y)===types.WATER?types.BRIDGE:cell(x,y)===types.BRIDGE?types.BRIDGE:types.PATH;objects=objects.filter(o=>!o.block||o.wildHouse102||o.chest102||Math.abs(o.x-x-.5)>1||Math.abs(collisionFootprint(o).cy-y-.5)>1);}
 vkWildReachCache=null;
}
function vkTrailMarkerSafe(x,y){
 if(x<.5||y<1||x>W-.5||y>H-1||!pass(x,y)||vkWildHard(x,y))return false;
 if([types.PATH,types.BRIDGE,types.WATER].includes(cell(Math.floor(x),Math.floor(y))))return false;
 if(Math.hypot(x-p.x,y-p.y)<.85)return false;
 if(vkChestList102().some(o=>Math.hypot(x-o.x,y-o.y)<2.8)||healPoints102.some(o=>Math.hypot(x-o.x,y-o.y)<3))return false;
 if([...townBuildings,...wildBuildings102].some(b=>{const d=vkDoorPoint101(b);return Math.hypot(x-d.x,y-d.y)<2;}))return false;
 return objects.every(o=>!o.block||Math.hypot(o.x-x,collisionFootprint(o).cy-y)>.9);
}
function vkTrailDecorate(plan){
 const lib=vkTrailLibrary();if(!lib)return;
 for(const[port,q]of Object.entries(vkWildExits)){
  const target=window.parent.VaelkorWildlandsCore.info(plan.exits[port].mapId),biome=vkWorldBiome().key,targetBiome=VK_GRAPHIC_REGIONS[Math.floor(target.level/10)%VK_GRAPHIC_REGIONS.length];
  const style=lib.choose({mapId:plan.id,targetId:plan.exits[port].mapId,worldSeed:window.parent.VaelkorWildlands?.worldSeed??1042,biome,targetBiome:targetBiome.key,isTown:townMode,targetTown:target.isTown,axis:q.dx?'horizontal':'vertical'});
  const returning=plan.type==='side'&&port!==plan.branch?.side;
  if(plan.id==='main:1'&&port==='next')style.variant='sign';if(plan.id==='main:1'&&port==='south')style.variant='sign';if(plan.type==='property')style.variant='plain';
  style.message=lib.message({port,targetId:plan.exits[port].mapId,targetTown:target.isTown,targetLabel:targetBiome.hub,biome,returning});
  if(plan.id==='main:1'&&port==='next')style.message='Zur Wildnis';if(plan.exits[port].mapId==='property:gruenwald')style.message='Arena und Grundstück';
  const edgeFrame=q.dx===0;if(edgeFrame)style.variant='arch';
  let placed=false;
  if(edgeFrame){const height=3*lib.arch.rect[3]/lib.arch.rect[2];objects.push({type:'vkDecor',asset:lib.arch.asset,transitionRect:lib.arch.rect,x:q.x,y:Math.min(H-.02,q.y+height/2),w:3,block:false,transitionPort:port,transitionEdgeFrame:true});placed=true;}
  if(style.variant==='arch'&&!edgeFrame){
   const center={x:Math.max(1.8,Math.min(W-1.8,q.x)),y:q.y+q.dy*2},posts=[{x:center.x-1.27,y:center.y},{x:center.x+1.27,y:center.y}];
   if(posts.every(o=>vkTrailMarkerSafe(o.x,o.y))){
    objects.push({type:'vkDecor',asset:lib.arch.asset,transitionRect:lib.arch.rect,x:center.x,y:center.y,w:3.4,block:false,transitionPort:port});
    for(const o of posts)objects.push({type:'transitionCollider',x:o.x,y:o.y,block:true,radius:.18,transitionPort:port,transitionFootprint:{rx:.18,ry:.17,cy:o.y-.03}});placed=true;
   }
  }
  if(style.variant==='rocks'){
   for(const distance of [2.2,3.2,4.2]){const center={x:q.x+q.dx*distance,y:q.y+q.dy*distance},points=[-1,1].map(sign=>({x:center.x-q.dy*1.35*sign,y:center.y+q.dx*1.35*sign}));
    if(!points.every(o=>vkTrailMarkerSafe(o.x,o.y)))continue;
    for(const o of points){const asset=vkExpansionAsset(biome,'rock')?'rock':null;objects.push({type:asset?'biomeDecor':'rock',...(asset?{asset,biome,w:1.45,rx:.28,ry:.21}:{}),x:o.x,y:o.y,block:true,radius:.3,transitionPort:port,transitionFootprint:{rx:.28,ry:.21,cy:o.y-.15}});}placed=true;break;
   }
  }
  const framePlaced=edgeFrame&&placed;if(edgeFrame)placed=false;
  if(style.variant==='sign'||style.variant!=='plain'&&!placed||edgeFrame&&(plan.id==='main:1'||plan.type==='property')){
   for(const distance of [2.2,3.2,4.2,5.2]){for(const offset of [1.4,2.2]){for(const side of [1,-1]){const x=q.x+q.dx*distance-q.dy*offset*side,y=q.y+q.dy*distance+q.dx*offset*side;if(!vkTrailMarkerSafe(x,y))continue;objects.push({type:'vkDecor',asset:'dorf_wegweiser',x,y,w:1.2,block:true,transitionPort:port,transitionSign:style.message,transitionBiome:biome,transitionFootprint:{rx:.2,ry:.15,cy:y-.12}});placed=true;if(!edgeFrame)style.variant='sign';break;}if(placed)break;}if(placed)break;}
  }
  placed=placed||framePlaced;
  if(style.variant!=='plain'&&!placed)style.variant='plain';vkTrailDecor[port]=style;
 }
 vkWildReachCache=null;
 // Decoration is optional: never trade a valid route or reward for a marker.
 const reachable=vkWildReach(p),blocked=Object.values(vkWildExits).some(q=>!reachable.has(Math.floor(q.y)*W+Math.floor(q.x)))||vkChestList102().some(chest=>![...reachable].some(k=>Math.hypot(k%W+.5-chest.x,Math.floor(k/W)+.5-chest.y)<1.9));
 if(blocked){objects=objects.filter(o=>!o.transitionPort);for(const style of Object.values(vkTrailDecor))style.variant='plain';vkWildReachCache=null;}
}
function vkTrailUpgrade(plan){
 if(vkTrailVersion===3||!vkTrailLibrary())return;
 objects=objects.filter(o=>!o.transitionPort);vkWildReachCache=null;
 const old=vkWildExits;vkWildExits=vkWildExitGeometry(plan);if(!townMode)for(const port of Object.keys(vkWildExits))if(old[port])vkWildExits[port]=vkWildExits[port].dx?old[port]:{...vkWildExits[port],x:old[port].x};
 if(townMode&&guardian?.present&&vkWildExits.next){const q=vkWildExits.next;guardian.x=q.x+q.dx*1.4;guardian.y=q.y+q.dy*1.4;}
 if(plan.type==='side'){
   for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(map[y][x]===types.PATH)map[y][x]=types.GRASS;
   vkWildReachCache=null;const safe=[...vkWildReach(p)].map(k=>({x:k%W+.5,y:Math.floor(k/W)+.5})).sort((a,b)=>Math.hypot(a.x-15.5,a.y-19.5)-Math.hypot(b.x-15.5,b.y-19.5));const anchor=safe[0]||p;map[Math.floor(anchor.y)][Math.floor(anchor.x)]=types.PATH;vkWildReachCache=null;
   for(const q of Object.values(vkWildExits))vkWildConnect(q,anchor);
   for(const b of wildBuildings102)vkWildConnect(vkDoorPoint101(b),anchor);
  }
  for(const q of Object.values(vkWildExits)){vkWildConnect(q,p);vkTrailExtendToBorder(q);}
 vkTrailDecor={};vkTrailDecorate(plan);vkTrailVersion=3;invalidateScene();requestWorldDraw96();
}

function vkNormalize136(){if(!townMode)return;for(const o of objects)if(/laterne|lantern/.test(o.asset||'')){o.type='vkDecor';o.asset='abenteuer_laterne';o.w=18/T;}const fountain=townProps.find(o=>o.kind==='fountain')||objects.find(o=>/dorfbrunnen/.test(o.asset||''));if(!fountain)return;objects=objects.filter(o=>!(/laterne|lantern/.test(o.asset||'')&&Math.hypot(o.x-fountain.x,o.y-fountain.y)<7));}
const vkWildEngine={
 capture(){return{version:1,qualityVersion:vkQualityVersion130,level,seed,map,objects,mapTheme,riverSide,entryX,exitX,roadCells,townMode,townBuildings,guardian,spawn:{...(interior&&returnPoint?returnPoint:p)},exits:vkWildExits,healPoints:healPoints102,townVersion:vkTownVersion,landscapeVersion:vkNatureVersion,houseVersion:vkHouseVersion,landscapeFeatures:vkLandscapeFeatures,facing:heroFacing,transitionVersion:vkTrailVersion,transitionDecor:vkTrailDecor,wildBuildings:wildBuildings102.map(({object102,...b})=>({...b,objectIndex:objects.indexOf(object102)}))};},
 generate(spec){vkQualityVersion130=0;vkWildSpec=spec;vkWildCurrentId=spec.id;vkWildExits={};vkTrailVersion=0;vkTrailDecor={};level=spec.level;vkTownVersion=0;vkNatureVersion=0;vkHouseVersion=0;vkLandscapeFeatures=[];if(spec.type==='property')vkBuildProperty(spec.seed);else vkLegacyBuildWL(spec.seed,false);if(spec.type==='side'){guardian=null;healPoints102=[];}else if(spec.cleared&&guardian)guardian.defeated=true;vkTownUpgrade(spec);vkGenerateLandscape(spec);},
 prepare(plan){
  vkWildExits=vkWildExitGeometry(plan);
  if(plan.type==='side'){
   for(const o of objects)if(o.chest102&&!o.chest102.startsWith(plan.id+'|'))o.chest102=plan.id+'|'+o.chest102;
   for(const b of wildBuildings102)if(!b.lootId102.startsWith(plan.id+'|'))b.lootId102=plan.id+'|'+b.lootId102;
  }
  vkTownUpgrade(plan);vkFixHouseAccess(plan);vkEnsureRestStop(plan);vkTrailUpgrade(plan);vkTownClearRoadPlants();vkPropertyArena(plan);vkNPCWorldPrepare134(plan);vkSuppliedTemple127(plan);vkWarmTown129();vkWorldQuality130(plan);vkNormalize136();vkWarmScene135();
  invalidateScene();requestWorldDraw96();
 },
 upgrade:plan=>{vkTownUpgrade(plan);vkFixHouseAccess(plan);vkEnsureRestStop(plan);vkTrailUpgrade(plan);vkTownClearRoadPlants();vkPropertyArena(plan);vkNPCWorldPrepare134(plan);vkSuppliedTemple127(plan);vkWarmTown129();vkWorldQuality130(plan);vkNormalize136();vkWarmScene135();},
 restore(scene,plan){
  if(scene?.version!==1||scene.map?.length!==H||scene.map.some(row=>row.length!==W)||!Array.isArray(scene.objects)||scene.objects.length>1500)throw Error('Ungültige gespeicherte Karte');
  vkQualityVersion130=scene.qualityVersion||0;vkHouseVersion=scene.houseVersion||0;vkTownVersion=scene.townVersion||0;vkNatureVersion=scene.landscapeVersion||1;vkLandscapeFeatures=scene.landscapeFeatures||[];
  if(!vkWildService()?.currentId&&scene.facing)heroFacing=scene.facing;vkTrailVersion=scene.transitionVersion||0;vkTrailDecor=scene.transitionDecor||{};
  vkWildSpec=plan;vkWildCurrentId=plan.id;level=scene.level;seed=scene.seed;map=scene.map;objects=scene.objects;mapTheme=scene.mapTheme;riverSide=scene.riverSide;entryX=scene.entryX;exitX=scene.exitX;roadCells=scene.roadCells;townMode=scene.townMode;townBuildings=scene.townBuildings;guardian=scene.guardian;if(plan.cleared&&guardian)guardian.defeated=true;vkWildExits=scene.exits;healPoints102=scene.healPoints;wildBuildings102=scene.wildBuildings.map(({objectIndex,...b})=>({...b,object102:objects[objectIndex]}));
  if(objects.some(o=>o.chest102))vkNewAtlasImages.loot_chest102=vkRoomImage91(CHEST_ASSET102);
  interior=null;returnPoint=null;p={...scene.spawn};target={...p};animFrom=null;animElapsed=STEP_MS;walkDistance=0;heroAnimation92.phase=0;steps=0;encounters=0;rng=randomGen(seed);vkExpansionEnsure(vkWorldBiome().key);invalidateScene();requestWorldDraw96();
 },
 validate(plan){
  if(!pass(p.x,p.y))throw Error('Ungültiger Kartenstart');
  const reachable=vkWildReach(p);
  for(const port of Object.keys(plan.exits)){const q=vkWildExits[port];if(!q||!reachable.has(Math.floor(q.y)*W+Math.floor(q.x)))throw Error('Ausgang nicht erreichbar: '+port);}
  for(const chest of vkChestList102())if(![...reachable].some(k=>Math.hypot(k%W+.5-chest.x,Math.floor(k/W)+.5-chest.y)<1.9))throw Error('Truhe nicht erreichbar');
  for(const heal of healPoints102)if(![...reachable].some(k=>Math.hypot(k%W+.5-heal.x,Math.floor(k/W)+.5-heal.y)<heal.range))throw Error('Heilpunkt nicht erreichbar');
  for(const b of [...townBuildings,...wildBuildings102]){const door=vkDoorPoint101(b);if(![...reachable].some(k=>Math.hypot(k%W+.5-door.x,Math.floor(k/W)+.5-door.y)<=.55))throw Error('Tür nicht erreichbar: '+b.name);}
 },
 place(entry,position,plan){
  const gate=entry&&vkWildExits[entry];let desired=gate?{x:gate.x+2*gate.dx,y:gate.y+2*gate.dy}:position;if(plan.id==='property:gruenwald'&&desired&&Number.isFinite(desired.x)&&Number.isFinite(desired.y)&&!pass(desired.x,desired.y))desired=wildBuildings102.find(b=>b.propertyArena126)?.returnPoint102||desired;
  if(!gate&&desired&&Number.isFinite(desired.x)&&Number.isFinite(desired.y)){const near=vkNearExit131(desired.x,desired.y);if(near)desired={x:near.x+2*near.dx,y:near.y+2*near.dy};}
  if(desired&&Number.isFinite(desired.x)&&Number.isFinite(desired.y)){
   const reachable=vkWildReach(p),candidates=[...reachable].map(k=>({x:k%W+.5,y:Math.floor(k/W)+.5}));
   const safe=q=>Object.values(vkWildExits).every(g=>Math.hypot(g.x-q.x,g.y-q.y)>1)&&(!guardian?.present||guardian.defeated||Math.hypot(q.x-guardian.x,q.y-guardian.y)>1.4);
   candidates.sort((a,b)=>Math.hypot(a.x-desired.x,a.y-desired.y)-Math.hypot(b.x-desired.x,b.y-desired.y));const point=candidates.find(safe);if(!point)throw Error('Kein sicherer Eintrittspunkt');p={...point};
  }
  status.textContent=plan.type==='property'?'Südliches Gebiet (−1) · Arena und Grundstück':plan.isTown?vkWorldBiome().hub:vkWorldBiome().label+' · Wildnis '+plan.wildLevel+(guardian?.present&&!guardian.defeated?' · Ausgangswächter':'');
  target={...p};animFrom=null;animElapsed=STEP_MS;walkDistance=0;heroAnimation92.phase=0;heroAnimation92.outdoorMs=0;invalidateScene();requestWorldDraw96();
 },
 position:()=>({...p}),report:error=>{console.warn('VAELKOR Kartenwechsel abgebrochen:',error.message);status.textContent='Kartenwechsel abgebrochen: '+error.message;}
};
const vkLegacyBuildWL=build;
build=function(n,fromTop=false){const service=vkWildService();if(!vkWildInitialized||!service)return vkLegacyBuildWL(n,fromTop);const result=service.openLegacy(level,vkWildEngine,fromTop,vkWildRequestedId,vkWildRequestedPosition);vkWildRequestedId=null;vkWildRequestedPosition=null;if(!result&&!service.currentId){vkWildSpec=null;vkWildCurrentId=null;return vkLegacyBuildWL(n,fromTop);}return result;};
const vkLegacyExitPointsWL=vkExitPoints103;
vkExitPoints103=function(){return vkWildInitialized&&vkWildService()?.currentId&&!interior?Object.values(vkWildExits):vkLegacyExitPointsWL();};
const vkLegacyDrawWL=draw;
const vkTeleportImage136=new Image();vkTeleportImage136.fetchPriority='high';vkTeleportImage136.decoding='async';vkTeleportImage136.src='assets/world/teleporter-arrow.webp?design=137';vkTeleportImage136.onload=()=>{invalidateScene();requestWorldDraw96();};
function vkPaintTeleporters136(){if(interior||!vkWildSpec)return; for(const q of Object.values(vkWildExits)){ctx.save();ctx.translate(q.x*T,q.y*T);ctx.rotate(Math.atan2(-q.dx,q.dy));ctx.imageSmoothingEnabled=false;if(vkTeleportImage136.complete&&vkTeleportImage136.naturalWidth)ctx.drawImage(vkTeleportImage136,-T/2,-T/2,T,T);else{ctx.fillStyle='#b8a17b';ctx.fillRect(-T/2,-T/2,T,T);ctx.fillStyle='#382d22';ctx.textAlign='center';ctx.fillText('▲',0,5);}ctx.restore();}}
draw=function(){vkLegacyDrawWL();if(!interior&&vkWildSpec?.branch){const side=vkWildSpec.branch;pos.textContent=vkWorldBiome().label+' – Wildnis '+vkWildSpec.wildLevel+', Nebenweg '+(side.side==='left'?'links':'rechts')+' '+side.index;}};
const vkTrailInteractBefore=document.querySelector('#interact').onclick;
document.querySelector('#interact').onclick=()=>{if(!interior&&!battleActive&&!vkTransitionBusy100()){const sign=objects.find(o=>o.transitionSign&&Math.hypot(p.x-o.x,p.y-o.y)<1.85);if(sign){status.textContent=sign.transitionSign;window.parent.postMessage({vkWorld:'interact',kind:'expansion',message:sign.transitionSign},'*');return;}const landmark=objects.find(o=>o.landscapeHint&&Math.hypot(p.x-o.x,p.y-o.y)<2.2);if(landmark){status.textContent=landmark.landscapeHint;window.parent.postMessage({vkWorld:'interact',kind:'expansion',message:landmark.landscapeHint},'*');return;}}vkTrailInteractBefore();};
window.VaelkorWildScene={attach(){if(!vkWildInitialized||!vkWildService()||vkWildService().currentId)return false;const ok=vkWildService().openLegacy(level,vkWildEngine,false,vkWildRequestedId,vkWildRequestedPosition);if(ok){vkWildRequestedId=null;vkWildRequestedPosition=null;}if(ok)window.parent.postMessage({vkWorld:'ready',mapId:vkWildCurrentId,level,x:p.x,y:p.y},'*');return ok;},languageChanged(){invalidateScene();requestWorldDraw96();},get id(){return vkWildCurrentId;},get exits(){return JSON.parse(JSON.stringify(vkWildExits));},capture:()=>JSON.parse(JSON.stringify(vkWildEngine.capture())),pass:(x,y)=>pass(x,y),travel:port=>vkWildService()?.travel(port,vkWildEngine),save:()=>vkWildService()?.saveCurrent(vkWildEngine),validate:()=>vkWildEngine.validate(vkWildSpec)};
// END VAELKOR WILDLANDS SCENE BRIDGE v1
