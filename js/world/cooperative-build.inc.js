// BEGIN VAELKOR COOPERATIVE BUILD v147
function* vkBuildSteps147(n,fromTop=false){
 if(vkWildSpec?.isTown??(level===1||level%10===0)){if(vkWorldBiome().key==='forest')buildTown(n,fromTop);else buildBiomeHub(n,fromTop);return}
 townMode=false;interior=null;townBuildings=[];vkExpansionEnsure(vkWorldBiome().key);
 seed=n;rng=randomGen(seed);mapTheme=rand(0,3);riverSide=rand(0,2);
 map=Array.from({length:H},()=>Array(W).fill(types.GRASS));objects=[];roadCells=[];
 entryX=rand(11,18);exitX=rand(11,18);
 yield;
 // Stage 1: coherent terrain. Water must not be overwritten by road decorations.
 const rolledWaterKind=rand(0,3),waterKind=vkWildSpec?.waterKind??rolledWaterKind;let waterRows=[],bridgeX=-1,riverMid=-1;
 if(waterKind===0){ // river running north-south near either side; main trail stays inland
  let left=rng()<.5,base=left?rand(3,5):rand(24,26),phase=rng()*6.28;
  for(let y=0;y<H;y++){let rx=Math.max(2,Math.min(W-3,Math.round(base+1.4*Math.sin(y*.19+phase))));for(let d=-1;d<=1;d++)map[y][rx+d]=types.WATER}
 }else if(waterKind===1){ // one horizontal crossing, exactly one bridge
  riverMid=rand(14,23);let phase=rng()*6.28;
  for(let x=0;x<W;x++){let ry=riverMid+Math.round(1.1*Math.sin(x*.21+phase));for(let d=-1;d<=1;d++)map[ry+d][x]=types.WATER}
 }else if(waterKind===2){ // isolated lake, safely outside the main route
  let left=rng()<.5,cx=left?rand(3,5):rand(24,26),cy=rand(12,25),rx=rand(3,4),ry=rand(4,6);
  for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(((x-cx)/rx)**2+((y-cy)/ry)**2<1)map[y][x]=types.WATER;
 }else{ // dry forest
 }
 yield;
 // Stage 2: a walkable spine, with at most one tile of horizontal shift per row.
 const anchors=[[entryX,H-1]];
 for(let y=H-8;y>5;y-=rand(7,10))anchors.push([rand(10,19),y]);
 anchors.push([exitX,0]);
 const xByY=Array(H).fill(entryX);
 for(let i=0;i<anchors.length-1;i++){
  const [ax,ay]=anchors[i],[bx,by]=anchors[i+1];
  for(let y=ay;y>=by;y--){let t=(ay-y)/(ay-by);xByY[y]=Math.round(ax+(bx-ax)*t)}
 }
 if(waterKind===1){
  bridgeX=xByY[riverMid];
  // Straight approaches on both shores; no stair-step bridge segments.
  for(let y=Math.max(0,riverMid-6);y<=Math.min(H-1,riverMid+6);y++)xByY[y]=bridgeX;
 }
 const mainCells=new Set(),key=(x,y)=>y*W+x;
 const carve=(x,y)=>{
  if(x<0||x>=W||y<0||y>=H)return;
  mainCells.add(key(x,y));
  if(map[y][x]===types.WATER){map[y][x]=types.BRIDGE}
  else if(map[y][x]!==types.BRIDGE)map[y][x]=types.PATH;
 };
 for(let y=H-1;y>=0;y--){
  const x=xByY[y];carve(x,y);
  if(y<H-1){const prev=xByY[y+1];for(let xx=Math.min(x,prev);xx<=Math.max(x,prev);xx++)carve(xx,y)}
 }
 // A bridge is valid only over water, on a straight north-south axis.
 // Clear any incidental shoreline water beneath the main path as a real bridge.
 if(waterKind===1){
  for(let y=0;y<H;y++)if(map[y][bridgeX]===types.BRIDGE){
   // ensure a safe approach on the bank immediately before and after the bridge
   if(y>0&&map[y-1][bridgeX]!==types.WATER&&map[y-1][bridgeX]!==types.BRIDGE)carve(bridgeX,y-1);
   if(y<H-1&&map[y+1][bridgeX]!==types.WATER&&map[y+1][bridgeX]!==types.BRIDGE)carve(bridgeX,y+1);
  }
 }
 // Stage 3: side trails only to actual destinations, never over water.
 const destinations=[];
 function landRoute(sx,sy,tx,ty){
  const q=[[sx,sy]],seen=new Set([key(sx,sy)]),parent=new Map();let found=false;
  for(let i=0;i<q.length;i++){
   let [x,y]=q[i];if(x===tx&&y===ty){found=true;break}
   for(let [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){
    let nx=x+dx,ny=y+dy,id=key(nx,ny);
    if(nx<1||ny<2||nx>=W-1||ny>=H-2||seen.has(id)||map[ny][nx]===types.WATER)continue;
    seen.add(id);parent.set(id,[x,y]);q.push([nx,ny]);
   }
  }
  if(!found)return false;
  let x=tx,y=ty;
  while(x!==sx||y!==sy){if(map[y][x]!==types.BRIDGE)map[y][x]=types.PATH;let prev=parent.get(key(x,y));if(!prev)return false;[x,y]=prev}
  return true;
 }
 for(let k=0;k<2;k++){
  let yy=k===0?rand(8,14):rand(24,30),left=rng()<.5;
  let tx=left?rand(3,7):rand(22,26),ty=yy;
  if(map[ty][tx]===types.WATER)continue;
  if(landRoute(xByY[yy],yy,tx,ty))destinations.push([tx,ty,k]);
 }
 // Stage 4: encounter patches never replace roads or bridge surfaces.
 for(let i=0;i<rand(10,17)*(vkWildSpec?.patchScale??1);i++){
  let cx=rand(2,W-3),cy=rand(4,H-5),rx=rand(2,4),ry=rand(2,4);
  for(let y=Math.max(1,cy-ry);y<=Math.min(H-2,cy+ry);y++)for(let x=Math.max(1,cx-rx);x<=Math.min(W-2,cx+rx);x++){
   if(map[y][x]===types.GRASS&&((x-cx)/rx)**2+((y-cy)/ry)**2<.85)map[y][x]=types.TALL;
  }
 }
 yield;
 // Stage 5: collisions after road carving, with a reserved safety buffer.
 for(let i=0;i<rand(75,115)*(vkWildSpec?.density??1);i++){
  let x=rand(1,W-2),y=rand(2,H-3),v=rng();
  if(map[y][x]!==types.GRASS||nearRoad(x,y))continue;
  let o=v<.36?{type:'tree',radius:.62}:v<.55?{type:'pine',radius:.47}:v<.75?{type:'rock',radius:.47}:v<.88?{type:'bush',radius:.38}:{type:'flower',radius:.1};
  objects.push({...o,x:x+.5,y:y+.5,block:o.type!=='flower'});
 }
 yield;
 // Additional woodland clusters and small non-blocking scenery, away from all routes.
 for(let cluster=0;cluster<Math.round(22*(vkWildSpec?.density??1));cluster++){
  const cx=rand(2,W-3),cy=rand(3,H-4);
  for(let j=0;j<rand(2,5);j++){
   let x=Math.max(1,Math.min(W-2,cx+rand(-2,2))),y=Math.max(2,Math.min(H-3,cy+rand(-2,2)));
   if(map[y][x]!==types.GRASS||nearRoad(x,y)||objects.some(o=>o.block&&Math.hypot(o.x-(x+.5),o.y-(y+.5))<1.4))continue;
   let kind=rng()<.6?'tree':'pine';objects.push({type:kind,x:x+.5,y:y+.5,radius:kind==='tree'?.62:.47,block:true});
  }
 }
 for(let i=0;i<110;i++){if(i%8===0)yield;
  let x=rand(1,W-2),y=rand(2,H-3);
  if(map[y][x]!==types.GRASS||nearRoad(x,y)||objects.some(o=>o.block&&Math.hypot(o.x-(x+.5),o.y-(y+.5))<.9))continue;
  {const type=rng()<.68?'flower':'bush';objects.push({type,x:x+.5,y:y+.5,radius:type==='bush'?.38:0,block:type==='bush'});}
 }
 for(let [x,y,k] of destinations){objects=objects.filter(o=>Math.hypot(o.x-(x+.5),o.y-(y+.5))>2);objects.push({type:k===0?'crystal':'flower',x:x+.5,y:y+.5,radius:.15,block:false})}
 yield;
 // Woodland silhouette: layered tree line along both edges, clear of roads and water.
 for(let y=2;y<H-1;y+=2){for(const base of [1.0,3.0,W-3.0,W-1.0]){
  const x=base+(rng()-.5)*.7,yy=y+(rng()-.5)*.8;
  if(map[Math.floor(yy)]?.[Math.floor(x)]!==types.GRASS||nearRoad(Math.floor(x),Math.floor(yy)))continue;
  if(objects.some(o=>o.block&&Math.hypot(o.x-x,o.y-yy)<1.15))continue;
  objects.push({type:rng()<.3?'pine':'tree',x,y:yy,block:true,radius:.3});
 }}
 vkExpansionWild(destinations);yield;
 vkPopulateWildDecor();yield;
 yield;
 // Stage 6: validate every MAIN ROAD tile against the actual player collision function.
 const mainValid=()=>{
  for(let id of mainCells){let x=id%W,y=Math.floor(id/W);if(!pass(x+.5,y+.5))return false}
  for(let y=1;y<H;y++){
   let ax=xByY[y],bx=xByY[y-1];
   // movement is orthogonal: every horizontal connector and its vertical step must be passable
   for(let x=Math.min(ax,bx);x<=Math.max(ax,bx);x++)if(!pass(x+.5,y+.5))return false;
  }
  return pass(entryX+.5,H-2+.5)&&pass(exitX+.5,1.5);
 };
 // Repair only the planned corridor; never erase water except with an explicit bridge.
 if(!mainValid()){
  for(let id of mainCells){let x=id%W,y=Math.floor(id/W);objects=objects.filter(o=>!o.block||Math.hypot(o.x-(x+.5),o.y-(y+.5))>1.3);if(map[y][x]===types.WATER)map[y][x]=types.BRIDGE}
 }
 for(let y=0;y<3;y++)carve(exitX,y);
 for(let y=H-3;y<H;y++)carve(entryX,y);
 yield;
 // Final grid flood-fill uses the same pass() as actual movement.
 function reachable(){let q=[[entryX,H-2]],seen=new Set([key(entryX,H-2)]);
  for(let i=0;i<q.length;i++){let [x,y]=q[i];if(x===exitX&&y===1)return true;
   for(let [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){let nx=x+dx,ny=y+dy,id=key(nx,ny);
    if(nx<0||ny<0||nx>=W||ny>=H||seen.has(id)||!pass(nx+.5,ny+.5))continue;
    seen.add(id);q.push([nx,ny]);
   }
  }return false;
 }
 const verified=mainValid()&&reachable();
 guardian={x:exitX+.5,y:3.25,defeated:false,present:level%3!==0};
 p={x:(fromTop?exitX:entryX)+.5,y:fromTop?3.5:H-2.5};target={...p};animFrom=null;animElapsed=135;walkPhase=0;walkAnimMs=0;invalidateScene();steps=0;encounters=0;
 status.textContent='Level '+level+' · '+(verified?'Weg und Kollisionen geprüft':'ACHTUNG: Wegprüfung fehlgeschlagen')+' · '+(['Randfluss','eine Flussbrücke','Waldsee','Wald ohne Wasser'][waterKind])+(guardian.present?' · Ausgangswächter':'');draw();
}

function* vkHouseAccessSteps147(plan){
 if(townMode||plan.type==='property'||vkHouseVersion>=2)return;
 const fractions={abenteuer_haus_gross:.29,abenteuer_haus_stroh:.34,abenteuer_haus_balkon:.43,abenteuer_haus_blau:.34,abenteuer_haus_rot:.54,abenteuer_haus_turm:.31};
 for(const object of objects.filter(o=>/haus_/.test(o.asset||'')||o.type==='biomeDecor'&&['hut','tent'].includes(o.asset)||window.parent.VaelkorGeneratorCatalog133?.assets[o.asset]?.kind==='building')){
  object.wildHouse102=true;let b=wildBuildings102.find(h=>h.object102===object);
  if(!b){b={kind:'house',name:'Wildnishaus '+(wildBuildings102.length+1),wild102:true,object102:object,doorPoint102:{x:object.x+object.w*((fractions[object.asset]??.5)-.5),y:object.y+.05},x:object.x-object.w/2,y:object.y-4,w:object.w,h:4,lootId102:(plan.type==='side'?plan.id+'|':'')+level+':house:'+object.asset+':'+object.x+':'+object.y};wildBuildings102.push(b);}
  const extra=window.parent.VaelkorGeneratorCatalog133?.assets[object.asset];if(extra){b.kind=extra.interiorKind;b.name=({'cottage':'Waldhaus','ranger-hut':'Waldhüterhütte','chapel':'Wegkapelle','caravan':'Reisewagen'})[object.asset.replace('gen133-town-','')]||b.name;}
  if(object.asset==='tent'){b.ruinedTent=true;b.name='Verlassenes Wildniszelt';}
  const raw=b.doorPoint102,trigger={x:Math.round(raw.x-.5)+.5,y:Math.round(raw.y-.5)+.5};if(Math.hypot(trigger.x-raw.x,trigger.y-raw.y)>.55)b.triggerPoint102=trigger;
  const gate=vkDoorPoint101(b);vkWildReachCache=null;vkWildConnect(gate,p);yield;b.returnPoint102={x:Math.round(raw.x-.5)+.5,y:Math.round(object.y+1)+.5};vkWildConnect(b.returnPoint102,p);yield;
 }
 vkHouseVersion=2;vkWildReachCache=null;
}

function* vkTrailSteps147(plan){
 if(vkTrailVersion===3||!vkTrailLibrary())return;
 objects=objects.filter(o=>!o.transitionPort);vkWildReachCache=null;
 const old=vkWildExits;vkWildExits=vkWildExitGeometry(plan);if(!townMode)for(const port of Object.keys(vkWildExits))if(old[port])vkWildExits[port]=vkWildExits[port].dx?old[port]:{...vkWildExits[port],x:old[port].x};
 if(townMode&&guardian?.present&&vkWildExits.next){const q=vkWildExits.next;guardian.x=q.x+q.dx*1.4;guardian.y=q.y+q.dy*1.4;}
 if(plan.type==='side'){
   for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(map[y][x]===types.PATH)map[y][x]=types.GRASS;
   vkWildReachCache=null;const safe=[...vkWildReach(p)].map(k=>({x:k%W+.5,y:Math.floor(k/W)+.5})).sort((a,b)=>Math.hypot(a.x-15.5,a.y-19.5)-Math.hypot(b.x-15.5,b.y-19.5));const anchor=safe[0]||p;map[Math.floor(anchor.y)][Math.floor(anchor.x)]=types.PATH;vkWildReachCache=null;
   for(const q of Object.values(vkWildExits)){vkWildConnect(q,anchor);yield;}
   for(const b of wildBuildings102){vkWildConnect(vkDoorPoint101(b),anchor);yield;}
  }
  for(const q of Object.values(vkWildExits)){vkWildConnect(q,p);vkTrailExtendToBorder(q);yield;}
 vkTrailDecor={};vkTrailDecorate(plan);vkTrailVersion=3;invalidateScene();requestWorldDraw96();
}


// END VAELKOR COOPERATIVE BUILD v147
