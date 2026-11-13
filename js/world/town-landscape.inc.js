// BEGIN VAELKOR TOWN AND LANDSCAPE v1
let vkTownVersion=0,vkNatureVersion=0,vkHouseVersion=0,vkLandscapeFeatures=[];
function vkBuildProperty(n){
 seed=n;rng=randomGen(n);townMode=false;interior=null;returnPoint=null;townBuildings=[];wildBuildings102=[];healPoints102=[];objects=[];roadCells=[];guardian=null;mapTheme=0;riverSide=0;entryX=exitX=15;
 map=Array.from({length:H},()=>Array(W).fill(types.GRASS));for(let y=0;y<=20;y++)map[y][15]=types.PATH;
 for(let i=0;i<18;i++){const side=i%4,x=side===0?1.5:side===1?W-1.5:3+Math.floor(hash(i,4,701)*(W-6))+.5,y=side===2?H-2.5:5+Math.floor(hash(i,8,702)*(H-9))+.5;if(Math.abs(x-15.5)<2&&y<6)continue;objects.push({type:['tree','bush','rock','flower'][i%4],x,y,block:i%4!==3,radius:.25});}
 p={x:15.5,y:5.5};target={...p};animFrom=null;animElapsed=STEP_MS;steps=0;encounters=0;invalidateScene();status.textContent='Mein Grundstück · Freie Grasfläche für spätere Gebäude, Wege und Pflanzen.';
}
function vkPropertyArena(plan){
 if(plan.id!=='property:gruenwald')return;
 let object=objects.find(o=>o.propertyArena126);
 if(!object){object={type:'vkDecor',asset:'abenteuer_arena',block:true,wildHouse102:true,propertyArena126:true};objects.push(object);}
 if(object.arenaLayout133!==1||object.x!==6.5||object.y!==11||object.w!==12){
  objects=objects.filter(o=>o===object||o.chest102||o.wildHouse102||o.playerPlaced||!(o.x>=.6&&o.x<=13.5&&o.y>=3&&o.y<=17));
  Object.assign(object,{x:6.5,y:11,w:12,arenaLayout128:1,arenaLayout130:1,arenaLayout133:1});
  // Only the old generated arena access strip is replaced. The northern exit,
  // stable room identity and persistent loot/construction data remain intact.
  for(let y=10;y<=21;y++)for(let x=5;x<=15;x++)if(cell(x,y)===types.PATH&&!wildBuildings102.some(b=>!b.propertyArena126&&Math.hypot(vkDoorPoint101(b).x-x-.5,vkDoorPoint101(b).y-y-.5)<2))map[y][x]=types.GRASS;
  for(let y=0;y<=12;y++)map[y][15]=types.PATH;for(let x=6;x<=15;x++)map[12][x]=types.PATH;map[11][6]=types.PATH;
 }
 let building=wildBuildings102.find(b=>b.propertyArena126);if(!building){building={kind:'arena',name:'Arena von Grünwald',wild102:true,propertyArena126:true};wildBuildings102.push(building);}
 Object.assign(building,{object102:object,doorPoint102:{x:6.5,y:11.5},returnPoint102:{x:6.5,y:12.5},x:.5,y:2.6,w:12,h:8.4});vkWildReachCache=null;if(!pass(p.x,p.y)){p={...building.returnPoint102};target={...p};animFrom=null;animElapsed=STEP_MS;}
}
function vkTownMoveDecor(o){
 const old={x:o.x,y:o.y},foot=collisionFootprint(o),radius=Math.min(1.8,Math.max(.4,foot.rx));const choices=[];
 for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++){
  const q={x:x+.5,y:y+.5};if(cell(x,y)!==types.GRASS||x>=13&&x<=17||x>=18&&x<=28&&y<=12)continue;
  if(townBuildings.some(b=>q.x>=b.x-radius-.5&&q.x<=b.x+b.w+radius+.5&&q.y>=b.y-.8&&q.y<=b.y+b.h+1))continue;
  if(townProps.some(b=>Math.abs(b.x-q.x)<b.rx+radius+.6&&Math.abs(b.y-q.y)<b.ry+.7))continue;
  if(objects.some(b=>b!==o&&b.block&&Math.abs(b.x-q.x)<collisionFootprint(b).rx+radius+.4&&Math.abs(collisionFootprint(b).cy-q.y)<.8))continue;
  choices.push(q);
 }
 choices.sort((a,b)=>Math.hypot(a.x-old.x,a.y-old.y)-Math.hypot(b.x-old.x,b.y-old.y));if(choices.length){o.x=choices[0].x;o.y=choices[0].y;o.townMovedVersion=1;}
}
function vkTownClearRoadPlants(){
 if(!townMode||interior)return;
 const vegetation=o=>['tree','pine','bush','flower'].includes(o.type)||['vkDecor','biomeDecor'].includes(o.type)&&/tree|pine|bush|flower|fern|grass|palm|oak|birch|blossom|berries|cactus|agave|mushroom|plant|baum|blum|busch|tanne|pflanz|gras/i.test(o.asset||'');
 const before=objects.length;objects=objects.filter(o=>{
  if(!vegetation(o)||o.chest102||o.wildHouse102||o.poi||o.transitionPort)return true;
  const rx=Math.min(2,Math.max(.35,(o.w||0)*.35,o.radius||0)),ry=.4;
  for(let y=Math.floor(o.y-ry);y<=Math.floor(o.y+ry);y++)for(let x=Math.floor(o.x-rx);x<=Math.floor(o.x+rx);x++)if(cell(x,y)===types.PATH||cell(x,y)===types.BRIDGE)return false;
  return true;
 });
 if(before!==objects.length){vkWildReachCache=null;invalidateScene();}
}
function vkTownSafeSpawn(){
 const anchor={x:15.5,y:20.5},reachable=vkWildFlood(anchor);if(!reachable.size)throw Error('Dorfplatz ist nicht erreichbar');
 if(!pass(p.x,p.y)||!reachable.has(Math.floor(p.y)*W+Math.floor(p.x))){const choices=[...reachable].map(k=>({x:k%W+.5,y:Math.floor(k/W)+.5}));choices.sort((a,b)=>Math.hypot(a.x-p.x,a.y-p.y)-Math.hypot(b.x-p.x,b.y-p.y));p={...choices[0]};target={...p};animFrom=null;}
}
function vkRemoveChurchSpur(){
 let changed=false;for(let y=0;y<=12;y++)for(let x=0;x<=4;x++)if(map[y]?.[x]===types.PATH){map[y][x]=types.GRASS;changed=true;}
 if(changed){vkWildReachCache=null;invalidateScene();}return changed;
}
function vkHouseRoadRepair133(){
 if(!townMode)return;let changed=false;
 for(const b of townBuildings){const q=vkDoorPoint101(b);for(let y=Math.floor(q.y);y<=Math.ceil(q.y+2);y++)for(let x=Math.floor(q.x)-2;x<=Math.ceil(q.x)+2;x++){
  if(cell(x,y)!==types.GRASS)continue;
  if([[1,0],[-1,0],[0,1],[0,-1]].filter(([dx,dy])=>cell(x+dx,y+dy)===types.PATH).length>=3){map[y][x]=types.PATH;changed=true;}
 }}if(changed){vkWildReachCache=null;invalidateScene();}
}
function vkTownUpgrade(plan){
 vkDesertTownUpgrade(plan);
 if(!townMode||!townBuildings.length)return;
 if(vkTownVersion===1){if(plan.id==='main:1')vkRemoveChurchSpur();vkHouseRoadRepair133();return;}
 if(plan.id==='main:1'){
  const church=townBuildings.find(b=>b.kind==='church');if(church){church.x=2;church.y=2;}
  // Only the start village is rearranged. Fixed fountain, market and lamps stay put.
  for(let y=0;y<13;y++)for(let x=0;x<W;x++)if(cell(x,y)===types.TALL)map[y][x]=types.GRASS;
  for(let y=0;y<23;y++)for(let x=14;x<=16;x++)map[y][x]=types.PATH;
  for(let y=3;y<=11;y++)for(let x=19;x<=27;x++)map[y][x]=types.TALL;
  for(let y=0;y<=3;y++)if(map[y][1]===types.PATH)map[y][1]=types.GRASS;
  for(const b of townBuildings)for(let y=b.y;y<b.y+b.h;y++)for(let x=b.x;x<b.x+b.w;x++)if(map[y]?.[x]!==undefined)map[y][x]=types.GRASS;
  for(const o of objects){const inside=church&&o.x>=church.x-.6&&o.x<=church.x+church.w+.6&&o.y>=church.y-1&&o.y<=church.y+church.h+.5;const corridor=o.block&&o.x>=13.3&&o.x<=17.3&&o.y<22;const grass=o.block&&o.x>=18.5&&o.x<=28&&o.y>=2.5&&o.y<=11.8;if(inside||corridor||grass)vkTownMoveDecor(o);}
 }
 // Original, unmirrored sprites have their actual doors connected to the village network.
 vkWildReachCache=null;
 for(const b of townBuildings){const q=vkDoorPoint101(b),x=Math.round(q.x-.5),first=Math.round(q.y-.5),last=Math.ceil(b.y+b.h+.6);for(let y=first;y<=last;y++)if(map[y]?.[x]!==undefined)map[y][x]=types.PATH;vkWildReachCache=null;vkWildConnect({x:x+.5,y:last+.5},{x:15.5,y:20.5});}
 if(plan.id==='main:1')vkRemoveChurchSpur();
 vkHouseRoadRepair133();vkTownVersion=1;vkTrailVersion=0;vkWildReachCache=null;vkTownSafeSpawn();invalidateScene();
}
function vkFeatureClearSpace(cx,cy){
 for(let y=cy-3;y<=cy+3;y++)for(let x=cx-3;x<=cx+3;x++)if(!ground(x,y)||vkWildHard(x+.5,y+.5))return false;
 if(objects.some(o=>!['tree','pine','bush','flower','rock'].includes(o.type)&&Math.hypot(o.x-cx-.5,o.y-cy-.5)<4+(o.w||0)/2))return false;
 return healPoints102.every(o=>Math.hypot(o.x-cx-.5,o.y-cy-.5)>5);
}
function vkFeatureAdd(asset,x,y,w,block,poi=null,sourceBiome=null){const biome=sourceBiome||vkWorldBiome().key;if(!asset||!vkExpansionAsset(biome,asset)||!ground(Math.floor(x),Math.floor(y))||!pass(x,y))return false;if(block){for(let yy=-1;yy<=1;yy++)for(let xx=-1;xx<=1;xx++){const tx=Math.floor(x)+xx,ty=Math.floor(y)+yy;if([types.PATH,types.BRIDGE].includes(cell(tx,ty))&&Math.hypot(tx+.5-x,ty+.5-y)<1.2)return false;}}objects.push({type:'biomeDecor',asset,biome,x,y,w,block,landscapeObject:true,rx:block?Math.min(.7,w*.26):0,ry:block?.22:0,poi,...(poi?{landscapeHint:poi==='camp'?'Verlassenes Lager':poi==='rune'?'Verwitterte Ruinen am Pfad':'Ein seltener Entdeckungsort'}:{})});return true;}
function vkGenerateLandscape(plan){
 vkNatureVersion=1;vkLandscapeFeatures=[];if(townMode||plan.type==='property'||plan.templateId==='legacy-v104/existing'||hash(level,321,957)>.72)return;
 let center=null;for(let i=0;i<90;i++){const x=5+Math.floor(hash(i,9,941)*20),y=8+Math.floor(hash(i,12,942)*22);if(vkFeatureClearSpace(x,y)){center={x:x+.5,y:y+.5};break;}}
 if(!center)return;
 const pick=hash(level,0,943),kind=pick<.22?'clearing':pick<.45?'rocks':pick<.65?'woodland':pick<.8?'ruin':pick<.94?'camp':'discovery';
 const cx=center.x,cy=center.y;objects=objects.filter(o=>!['tree','pine','bush','flower','rock'].includes(o.type)||Math.hypot(o.x-cx,o.y-cy)>2.7);
 for(let y=Math.floor(cy)-2;y<=Math.floor(cy)+2;y++)for(let x=Math.floor(cx)-2;x<=Math.floor(cx)+2;x++)if(cell(x,y)===types.TALL)map[y][x]=types.GRASS;
 vkWildReachCache=null;vkWildConnect(center,p);const biome=vkWorldBiome();
 if(kind==='rocks')for(const[dx,dy]of[[-1.5,-1.2],[1.4,-1.1],[1.7,1.5]]){if(!vkFeatureAdd('rock',cx+dx,cy+dy,1.6,true)&&!nearRoad(Math.floor(cx+dx),Math.floor(cy+dy)))objects.push({type:'rock',x:cx+dx,y:cy+dy,block:true,radius:.35,landscapeObject:true});}
 if(kind==='woodland')for(const[dx,dy]of[[-1.8,-1.8],[1.9,-1.5],[2,1.6],[-2,1.8]])vkFeatureAdd(vkBiomePick(biome.trees,Math.floor(dx+dy+10)),cx+dx,cy+dy,2.3,true);
 if(kind==='ruin'||kind==='discovery')vkFeatureAdd(['arch','ice_arch','rune_stone','altar','totem','obelisk'].find(a=>vkExpansionAsset(biome.key,a)),cx+1.7,cy-1.8,kind==='ruin'?2.2:1.6,true,kind==='ruin'?'rune':'altar');
 if(kind==='clearing'&&hash(level,4,944)<.65){const extras=Object.values(window.parent.VaelkorGeneratorCatalog133?.assets||{}).filter(a=>a.kind==='building'&&a.contexts.includes(biome.key));const extra=extras[Math.floor(hash(level,2,1338)*extras.length)];const asset=extra?extra.id:biome.key==='snow'?'abenteuer_haus_blau':biome.key==='desert'?'abenteuer_haus_stroh':'abenteuer_haus_rot';objects=objects.filter(o=>!['tree','pine','bush','flower','rock'].includes(o.type)||Math.hypot(o.x-cx,o.y-cy)>3.8);objects.push({type:'vkDecor',asset,x:cx,y:cy-1,w:3.4,block:true,landscapeObject:true});}
 if(kind==='camp'){vkFeatureAdd('tent',cx+1.5,cy-1.8,2.4,true,'camp',vkExpansionAsset(biome.key,'tent')?biome.key:'forest');vkFeatureAdd('fire',cx-1.2,cy+.9,.9,false,'camp',vkExpansionAsset(biome.key,'fire')?biome.key:'forest');vkFeatureAdd('barrel',cx+2,cy+.9,.85,true,null,vkExpansionAsset(biome.key,'barrel')?biome.key:'forest');}
 for(const[dx,dy]of[[-2,-.6],[2.2,.4],[-.5,2.1]])vkFeatureAdd(vkBiomePick(biome.flowers,Math.floor(dx+dy+20)),cx+dx,cy+dy,.7,false);
 if(kind==='discovery'&&objects.every(o=>!o.block||Math.hypot(o.x-cx,o.y-(cy+1.4))>1.4)){vkNewAtlasImages.loot_chest102=vkRoomImage91(CHEST_ASSET102);objects.push({type:'vkDecor',asset:'loot_chest102',x:cx,y:cy+1.4,w:1.25,block:true,chest102:plan.id+':discovery:v1'});}
 vkLandscapeFeatures=[{version:1,kind,x:cx,y:cy}];vkWildReachCache=null;
}
function vkFixHouseAccess(plan){
 if(townMode||plan.type==='property'||vkHouseVersion>=2)return;
 const fractions={abenteuer_haus_gross:.29,abenteuer_haus_stroh:.34,abenteuer_haus_balkon:.43,abenteuer_haus_blau:.34,abenteuer_haus_rot:.54,abenteuer_haus_turm:.31};
 for(const object of objects.filter(o=>/haus_/.test(o.asset||'')||o.type==='biomeDecor'&&['hut','tent'].includes(o.asset)||window.parent.VaelkorGeneratorCatalog133?.assets[o.asset]?.kind==='building')){
  object.wildHouse102=true;let b=wildBuildings102.find(h=>h.object102===object);
  if(!b){b={kind:'house',name:'Wildnishaus '+(wildBuildings102.length+1),wild102:true,object102:object,doorPoint102:{x:object.x+object.w*((fractions[object.asset]??.5)-.5),y:object.y+.05},x:object.x-object.w/2,y:object.y-4,w:object.w,h:4,lootId102:(plan.type==='side'?plan.id+'|':'')+level+':house:'+object.asset+':'+object.x+':'+object.y};wildBuildings102.push(b);}
  const extra=window.parent.VaelkorGeneratorCatalog133?.assets[object.asset];if(extra){b.kind=extra.interiorKind;b.name=({'cottage':'Waldhaus','ranger-hut':'Waldhüterhütte','chapel':'Wegkapelle','caravan':'Reisewagen'})[object.asset.replace('gen133-town-','')]||b.name;}
  if(object.asset==='tent'){b.ruinedTent=true;b.name='Verlassenes Wildniszelt';}
  const raw=b.doorPoint102,trigger={x:Math.round(raw.x-.5)+.5,y:Math.round(raw.y-.5)+.5};if(Math.hypot(trigger.x-raw.x,trigger.y-raw.y)>.55)b.triggerPoint102=trigger;
  const gate=vkDoorPoint101(b);vkWildReachCache=null;vkWildConnect(gate,p);b.returnPoint102={x:Math.round(raw.x-.5)+.5,y:Math.round(object.y+1)+.5};vkWildConnect(b.returnPoint102,p);
 }
 vkHouseVersion=2;vkWildReachCache=null;
}
function vkEnsureRestStop(plan){
 if(plan.type!=='main'||townMode||plan.wildLevel%10!==6||healPoints102.length)return;
 const reachable=vkWildReach(p),choices=[...reachable].map(k=>({x:k%W+.5,y:Math.floor(k/W)+.5})).filter(q=>q.x>3&&q.x<W-4&&q.y>7&&q.y<H-7&&cell(Math.floor(q.x),Math.floor(q.y))===types.GRASS&&Math.hypot(q.x-p.x,q.y-p.y)>2&&objects.every(o=>Math.hypot(o.x-q.x,o.y-q.y)>2));choices.sort((a,b)=>hash(a.x,a.y,969)-hash(b.x,b.y,969));
 for(const q of choices){const biome=vkWorldBiome().key,asset=['crystal','crystals','well','blue_fire','altar'].find(a=>vkExpansionAsset(biome,a));const object=asset?{type:'biomeDecor',asset,biome,x:q.x,y:q.y,w:1.8,block:true,rx:.35,ry:.22}:{type:'vkDecor',asset:'abenteuer_dorfbrunnen',x:q.x,y:q.y,w:1.8,block:true};objects.push(object);vkWildReachCache=null;const after=vkWildReach(p);if([...after].some(k=>Math.hypot(k%W+.5-q.x,Math.floor(k/W)+.5-q.y)<1.9)){healPoints102.push({x:q.x,y:q.y,range:1.9,label:'Heilrastplatz · Wildnis '+plan.wildLevel});return;}objects.pop();vkWildReachCache=null;}
 throw Error('Kein erreichbarer Heilrastplatz gefunden');
}

// A single cached-town migration. No world regeneration or permanent-state reset.
function vkDesertTownUpgrade(plan){
 if(!townMode||vkWorldBiome().key!=='desert'||objects.some(o=>o.desertPlazaVersion===1))return;
 // Retain existing connected roads; merge the square areas into a rounded public plaza.
 for(let y=20;y<=28;y++)for(let x=10;x<=20;x++)if(((x-15)/5.5)**2+((y-24)/4.7)**2<=1)map[y][x]=types.PATH;
 objects=objects.filter(o=>!o.block||o.chest102||o.wildHouse102||!(o.x>20&&o.x<28&&o.y>12&&o.y<20));
 const tent={type:'biomeDecor',asset:'tent',biome:'forest',x:24.5,y:17.5,w:6,block:true,rx:2.0,ry:.8,wildHouse102:true,desertPlazaVersion:1};
 objects.push(tent);vkExpansionEnsure('forest');
 const b={kind:'house',name:'Karawanenzelt',wild102:true,desertTent:true,object102:tent,doorPoint102:{x:24.5,y:17.5},x:21.5,y:13.5,w:6,h:4,lootId102:plan.id+'|caravan-tent',returnPoint102:{x:24.5,y:19.5}};
 wildBuildings102.push(b);vkWildReachCache=null;vkWildConnect(b.returnPoint102,{x:15.5,y:20.5});vkWildConnect(b.doorPoint102,b.returnPoint102);
 for(const [asset,x,y,w]of [['cactus',7.5,24.5,1.5],['cactus_round',22.5,29.5,1.2],['agave',8.5,29.5,1.2],['rock',25.5,26.5,1.6],['palm_small',5.5,22.5,2.8],['desert_flowers',20.5,31.5,1.1]]){
  if(!vkExpansionAsset('desert',asset)||objects.some(o=>Math.hypot(o.x-x,o.y-y)<1.2))continue;
  objects.push({type:'biomeDecor',biome:'desert',asset,x,y,w,block:false,desertTownDecor:true});
 }
 for(const [asset,x,y,w]of [['barrel',21.5,18.5,1.0],['crate',27.5,18.5,1.1],['banner',20.5,16.5,1.3]])if(vkExpansionAsset('forest',asset))objects.push({type:'biomeDecor',biome:'forest',asset,x,y,w,block:false,desertTownDecor:true});
 vkWildReachCache=null;vkTownSafeSpawn();invalidateScene();
}
const vkTownTerrainPathBefore=terrainPath;
terrainPath=function(x,y){
 if(!townMode||vkWorldBiome().key!=='desert')return vkTownTerrainPathBefore(x,y);
 // World-space sandstone joints. Never sample a sheet containing buildings or props.
 const X=x*T,Y=y*T;ctx.save();ctx.fillStyle='#d4b17b';ctx.fillRect(X,Y,T,T);
 for(let j=0;j<T;j+=4){const row=Math.floor((Y+j)/8),jointY=(Y+j)%8===0;for(let i=0;i<T;i+=4){const wx=X+i,offset=(row%2)*12,column=Math.floor((wx+offset)/24),n=hash(column,row,1107);ctx.fillStyle=n>.5?'#d9b981':'#d0ad77';ctx.fillRect(wx,Y+j,4,4);if(jointY){ctx.fillStyle='#c5a372';ctx.fillRect(wx,Y+j,4,1);}if((wx+offset)%24===0){ctx.fillStyle='#c5a372';ctx.fillRect(wx,Y+j,1,4);}}}
 ctx.globalAlpha=.20;ctx.fillStyle='#efcf98';ctx.fillRect(X,Y+1,T,1);ctx.restore();
};
const vkTentPlanBefore=vkInteriorPlan91;
vkInteriorPlan91=function(){
 const plan=vkTentPlanBefore();if(!interior?.desertTent||!plan||plan.caravan)return plan;
 // Reuse the proven house interior and movement with fewer furnishings for the tent.
 const remove=new Set(['house.fireplace','house.bookshelf','house.wardrobe'].map(k=>VK_INTERIOR_LIBRARY91.keys[k]));
 plan.items=plan.items.filter(o=>!remove.has(o.id));plan.blockers=plan.items.filter(o=>o.solid).map(o=>({x:o.x+.1,y:o.y+o.h*.52,w:o.w-.2,h:o.h*.48}));plan.caravan=true;return plan;
};
// END VAELKOR TOWN AND LANDSCAPE v1
