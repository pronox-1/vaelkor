// BEGIN VAELKOR SUPPLIED LIFE v127
const vkArt127=window.parent.VaelkorSuppliedArt,vkCycle127=window.parent.VaelkorDayCycle,vkRig128=window.parent.VaelkorNPCRig;
if(vkRig128?.sheets)Object.assign(vkArt127.sets,vkRig128.sheets);
const vkImages127=new Map(),vkSprites127=new Map(),vkRecords127=new Map();
if(vkArt127)for(const [set,pack]of Object.entries(vkArt127.sets))for(const item of pack.items){const a={...item,set,image:pack.image,size:item.rect.slice(2),sourceRect:item.rect,anchor:'bottom-center'};vkRecords127.set(item.id,a);VK_INTERIOR_LIBRARY91.assets[item.id]=a;VK_INTERIOR_LIBRARY91.keys[item.id]=item.id;}
function vkImage127(set){if(vkImages127.has(set))return vkImages127.get(set);const im=new Image();im.onload=()=>{if(set==='nature-arches')invalidateScene();requestWorldDraw96();};im.src=vkArt127.inline[set]||vkArt127.sets[set].image;vkImages127.set(set,im);return im;}
function vkCut127(set,rect,key,npc=false){
 if(vkSprites127.has(key)){const a=vkSprites127.get(key);vkSprites127.delete(key);vkSprites127.set(key,a);return a;}
 if(!vkArt127?.sets[set])return null;const im=vkImage127(set);if(!im.complete||!im.naturalWidth)return null;
 const [sx,sy,w,h]=rect,cv=document.createElement('canvas');cv.width=w;cv.height=h;const gc=cv.getContext('2d',{willReadFrequently:true});gc.drawImage(im,sx,sy,w,h,0,0,w,h);
 try{const px=gc.getImageData(0,0,w,h),d=px.data,green=vkArt127.sets[set].matte==='green';
 if(green){for(let i=0;i<d.length;i+=4)if(d[i+1]>200&&d[i]<85&&d[i+2]<100)d[i+3]=0;
 const alpha=new Uint8Array(w*h);for(let i=0;i<alpha.length;i++)alpha[i]=d[i*4+3];for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const n=y*w+x,i=n*4;if(!alpha[n]||d[i+1]<=d[i]+70||d[i+1]<=d[i+2]+70)continue;if([n-1,n+1,n-w,n+w].some(k=>alpha[k]===0)){const excess=d[i+1]-Math.max(d[i],d[i+2]);d[i+1]=Math.min(d[i+1],Math.max(d[i],d[i+2])+20);d[i+3]=Math.min(d[i+3],Math.max(0,Math.round((255-excess)*1.8)));}}} 
 else if(vkRecords127.get(key)?.category!=='floor'){const seen=new Uint8Array(w*h),queue=[];const corners=[[1,1],[w-2,1],[1,h-2],[w-2,h-2]].map(([x,y])=>{const n=(y*w+x)*4;return[d[n],d[n+1],d[n+2]]});const bg=(i)=>corners.some(c=>Math.abs(d[i*4]-c[0])+Math.abs(d[i*4+1]-c[1])+Math.abs(d[i*4+2]-c[2])<56);
 const add=n=>{if(n>=0&&n<w*h&&!seen[n]&&bg(n)){seen[n]=1;queue.push(n);}};for(let x=0;x<w;x++){add(x);add((h-1)*w+x);}for(let y=0;y<h;y++){add(y*w);add(y*w+w-1);}for(let i=0;i<queue.length;i++){const n=queue[i];d[n*4+3]=0;const x=n%w,y=Math.floor(n/w);if(x)add(n-1);if(x<w-1)add(n+1);if(y)add(n-w);if(y<h-1)add(n+w);}}
 gc.putImageData(px,0,0);
 let box=[0,0,w,h];if(npc){let x1=w,y1=h,x2=0,y2=0;for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(d[(y*w+x)*4+3]>80){x1=Math.min(x1,x);y1=Math.min(y1,y);x2=Math.max(x2,x);y2=Math.max(y2,y);}if(x2>x1&&y2>y1)box=[x1,y1,x2-x1+1,y2-y1+1];}
 const entry={canvas:cv,box};vkSprites127.set(key,entry);while(vkSprites127.size>128)vkSprites127.delete(vkSprites127.keys().next().value);return entry;
 }catch(error){console.warn('Vorlagen-Ausschnitt konnte nicht vorbereitet werden:',key);return null;}
}
const vkSourceImageBefore127=vkRoomImage91;
vkRoomImage91=function(id){const a=vkRecords127.get(id);if(!a){
 const im=vkSourceImageBefore127(id);if(id!=='shop-028')return im;const offline=vkArt127.inline['shop-display-table129'];if(offline&&im.src!==offline)im.src=offline;
 const key='shop-display-alpha129';if(vkSprites127.has(key))return vkSprites127.get(key).canvas;
 if(!im?.complete||!im.naturalWidth)return null;try{const cv=document.createElement('canvas');cv.width=im.naturalWidth;cv.height=im.naturalHeight;const gc=cv.getContext('2d',{willReadFrequently:true});gc.drawImage(im,0,0);const px=gc.getImageData(0,0,cv.width,cv.height),d=px.data;for(let i=0;i<d.length;i+=4)if(d[i+1]>170&&d[i+1]>d[i]+65&&d[i+1]>d[i+2]+65)d[i+3]=0;gc.putImageData(px,0,0);cv.complete=true;cv.naturalWidth=cv.width;cv.naturalHeight=cv.height;vkSprites127.set(key,{canvas:cv});while(vkSprites127.size>128)vkSprites127.delete(vkSprites127.keys().next().value);return cv;}catch(_){return im;}
 }const sprite=vkCut127(a.set,a.rect,id);if(!sprite)return null;const canvas=sprite.canvas;canvas.complete=true;canvas.naturalWidth=canvas.width;canvas.naturalHeight=canvas.height;return canvas;};
if(vkArt127)Object.defineProperty(vkNewAtlasImages,'abenteuer_nature_temple127',{get:()=>vkRoomImage91('nature-arches.leaf-shrine')});
function vkDrawPart127(id,x,y,w,h){const a=vkRecords127.get(id);if(!a)return;const sprite=vkCut127(a.set,a.rect,id);if(sprite)ctx.drawImage(sprite.canvas,0,0,a.rect[2],a.rect[3],Math.round(x*T),Math.round(y*T),Math.round(w*T),Math.round(h*T));}
function vkSuppliedPlan127(kind,seed=1){
 const nature=kind==='natureTemple',group=nature?'temple':'arena',items=[],put=(name,x,y,w,solid=false,h=null,set=group)=>{const id=set+'.'+name,a=vkRecords127.get(id);if(!a)return;const o={id,x,y,w,h:h??w*a.size[1]/a.size[0],solid};items.push(o);return o;};
 for(let y=10;y<31;y+=3)for(let x=3;x<27;x+=3)put('floor',x,y,3,false,3);
 for(let x=3;x<27;x+=3)put('wall',x,5.8,3,false,5.2);for(let y=10;y<31;y+=3){put('pillar',1.8,y,1.2,false,3.2);put('pillar',27,y,1.2,false,3.2);}
 for(let x=3;x<27;x+=3)if(x<12||x>=18)put('wall-short',x,30.5,3,false,3.3);put('door',13.5,30.5,3,false,4);
 const lights=[];
 if(nature){
  put('statue',13.1,6.6,3.8,true,6);put('stairs-wide',11.7,12,6.6,false,2.5);
  put('pool',4.7,10.5,4.9,true,4.9);put('pool',20.4,10.5,4.9,true,4.9);put('waterfall-arch',5.7,5.8,3.1,false,7);put('waterfall-arch',21.3,5.8,3.1,false,7);
  put('banner',10.5,6.3,1.6,false,4);put('banner',18,6.3,1.6,false,4);put('medallion',10.4,18.4,9.2,false,6.7);
  for(const [x,y]of[[9.2,16],[20,16],[9.2,26],[20,26]]){put('green-fire',x,y,1.6,true,2.7);lights.push({x:x+.8,y:y+.5,green:true});}
  put('bench',4,26.8,5,true);put('bench',21,26.8,5,true);put('tree',3.5,9,2.4,true,6);put('tree',24.1,9,2.4,true,6);
  const windowName=['window-tree','window-round','niche-leaf'][(Number(seed)>>>0)%3];put(windowName,9,6.2,2,false,4,'nature-detail');put(windowName,19.5,6.2,2,false,4,'nature-detail');
  put('flowers',4,24.5,1.8,false);put('flowers',24,24.5,1.8,false);
 }else{
  put('door',12.4,6.5,5.2,false,6);put('steps',11.7,12,6.6,false,2.4);put('desk',4,10.2,4.5,true);put('chest',8.8,10.3,1.8,true);put('weapon-rack',21,9.6,3.5,true);put('target',24.6,10,1.8,true);
  for(const [x,y]of[[3.5,15.5],[23,15.5],[3.5,23],[23,23]])put('stands',x,y,3.5,true,4.2);
  for(const [x,y]of[[3,12],[25.2,12],[3,27.2],[25.2,27.2]]){put('fire-pillar',x,y,1.7,true,3.4);lights.push({x:x+.85,y:y+.3});}
  put('banner',7,7.2,1.6,false,3.7);put('banner',22,7.2,1.6,false,3.7);put('floor-craters',9,19,3,false,3);put('floor-blood',19,25,3,false,3);
 }
 const blockers=items.filter(o=>o.solid).map(o=>({x:o.x+.12,y:o.id==='temple.pool'?o.y+.12:o.y+o.h*.56,w:Math.max(.2,o.w-.24),h:o.id==='temple.pool'?o.h-.24:o.h*.44}));return{kind,seed,supplied127:true,modularRoomVersion:1,items,blockers,lights,spawn:{x:15.5,y:29.5},exit:{x:15.5,y:31.5},bed:null,chest:null};
}
if(vkArt127){const beforeGenerate=vkGenerateInterior91;vkGenerateInterior91=function(kind,seed){return ['arena','natureTemple'].includes(kind)?vkSuppliedPlan127(kind,seed):beforeGenerate(kind,seed);};
 const beforeEnabled=vkInteriorEnabled91;vkInteriorEnabled91=function(){return interior?.kind==='natureTemple'||beforeEnabled();};
 const beforePlan=vkInteriorPlan91;vkInteriorPlan91=function(){
 if(!['arena','natureTemple'].includes(interior?.kind)){
  let plan=beforePlan();
  // The baked first-town counter has no physical aisle behind it. Reuse its
  // existing modular shop pieces so drawing and collision share one layout.
  if(plan?.template==='shop'){
   const key='shop-access129:'+level+':'+interior.name;
   if(!vkRoomPlans91.has(key)){const generated=vkGenerateInterior91('shop',seed);generated.spawn={x:15.5,y:29.5};generated.exit={x:15.5,y:31.5};vkRoomPlans91.set(key,generated);}plan=vkRoomPlans91.get(key);
  }
  if(plan&&['shop','forge'].includes(interior?.kind)&&!plan.counterAccess129){
   const id=VK_INTERIOR_LIBRARY91.keys[(interior.kind==='forge'?'armory':'shop')+'.counter'],counter=plan.items.find(o=>o.id===id);counter.y=15;
   if(interior.kind==='shop'){const table='shop-028',a=VK_INTERIOR_LIBRARY91.assets[table];for(const x of[5,20])plan.items.push({id:table,x,y:23,w:5,h:5*a.size[1]/a.size[0],solid:true});}
   plan.blockers=plan.items.filter(o=>o.solid).map(o=>({x:o.x+.08,y:o.y+o.h*.36,w:o.w-.16,h:o.h*.64}));plan.counterAccess129=true;
  }while(vkRoomPlans91.size>24)vkRoomPlans91.delete(vkRoomPlans91.keys().next().value);return plan;
 }
 const key='supplied127:'+vkWildCurrentId+':'+interior.name;if(!vkRoomPlans91.has(key))vkRoomPlans91.set(key,vkSuppliedPlan127(interior.kind,seed));while(vkRoomPlans91.size>24)vkRoomPlans91.delete(vkRoomPlans91.keys().next().value);return vkRoomPlans91.get(key);
 };
 const beforeDraw=vkDrawInterior91;vkDrawInterior91=function(){const plan=vkInteriorPlan91();if(plan?.counterAccess129)return vkDrawCounterRoom129(plan);if(!plan?.supplied127)return beforeDraw();ctx.fillStyle='#13121a';ctx.fillRect(0,0,c.width,c.height);ctx.imageSmoothingEnabled=false;const draw=o=>vkDrawPart127(o.id,o.x,o.y,o.w,o.h);plan.items.filter(o=>!o.solid).forEach(draw);let painted=false;for(const o of plan.items.filter(o=>o.solid).sort((a,b)=>a.y+a.h-b.y-b.h)){if(!painted&&p.y<o.y+o.h){player();painted=true;}draw(o);}if(!painted)player();ctx.textAlign='center';ctx.fillStyle='#ffe4b0';ctx.font='bold 12px system-ui';ctx.fillText(interior.name,15*T,18);ctx.font='10px system-ui';ctx.fillText('▼ Ausgang',15.5*T,35*T);pos.textContent=interior.name+' · Innenraum';};
 Object.assign(window.VaelkorInteriors91,{generate:vkGenerateInterior91,suppliedCatalog:vkArt127,getSprite:vkRoomImage91,assetCount:Object.keys(VK_INTERIOR_LIBRARY91.assets).length,templateSets:[...window.VaelkorInteriors91.templateSets.filter(k=>k!=='natureTemple'),'natureTemple']});}
function vkSuppliedTemple127(plan){
 if(!vkArt127||plan.type==='property'||townMode||!['forest','jungle'].includes(vkWorldBiome().key))return;
 let object=objects.find(o=>o.natureTemple127);if(!object){if(hash(plan.seed,level,1271)>.12)return;const candidates=[];for(let y=10;y<H-6;y++)for(let x=5;x<W-5;x++)if(cell(x,y)===types.GRASS&&Math.hypot(x+.5-p.x,y+.5-p.y)>5&&!nearRoad(x,y)&&[-2,-1,0,1,2].every(dx=>[-2,-1,0,1].every(dy=>ground(x+dx,y+dy)))&&pass(x+.5,y+.5)&&Object.values(vkWildExits).every(q=>Math.hypot(q.x-x,q.y-y)>6)&&objects.every(o=>!o.chest102&&!o.wildHouse102&&!o.poi||Math.hypot(o.x-x,o.y-y)>5))candidates.push({x:x+.5,y:y+.5});candidates.sort((a,b)=>hash(a.x,a.y,1272)-hash(b.x,b.y,1272));const spot=candidates[0];if(!spot)return;
 objects=objects.filter(o=>o.chest102||o.wildHouse102||o.poi||!['tree','pine','bush','flower','rock'].includes(o.type)||Math.hypot(o.x-spot.x,o.y-spot.y)>3.7);
 object={type:'vkDecor',asset:'abenteuer_nature_temple127',x:spot.x,y:spot.y,w:5.3,block:true,wildHouse102:true,natureTemple127:true,transitionFootprint:{rx:1.8,ry:.4,cy:spot.y-.3}};objects.push(object);}
 if(!wildBuildings102.some(b=>b.natureTemple127))wildBuildings102.push({kind:'natureTemple',name:'Naturtempel',wild102:true,natureTemple127:true,object102:object,doorPoint102:{x:object.x,y:object.y+.1},returnPoint102:{x:object.x,y:object.y+1.0},x:object.x-2.65,y:object.y-5,w:5.3,h:5});
 vkWildReachCache=null;vkWildConnect({x:object.x,y:object.y+.5},p);vkWildReachCache=null;
}
let vkLifeTime127=120000,vkLifeAt127=performance.now();
function vkTime127(){return vkLifeTime127+Math.min(1500,Math.max(0,performance.now()-vkLifeAt127));}
const vkNPCPaths127=new Map();let vkNPCMap127='';
function vkNPCBuilding127(key){if(key==='nursery')return wildBuildings102.find(b=>b.nursery134);if(key==='arena')return wildBuildings102.find(b=>b.propertyArena126);if(key==='west')return townBuildings.find(b=>b.name==='Wohnhaus West');if(key==='east')return townBuildings.find(b=>b.name==='Wohnhaus Ost');return townBuildings.find(b=>b.kind===key);}
function vkNPCRoute127(from,to){const key=[vkWildCurrentId,seed,from.x,from.y,to.x,to.y].join('|');if(vkNPCPaths127.has(key))return vkNPCPaths127.get(key);const snap=q=>{let best=null,d=Infinity;for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++)if(pass(x+.5,y+.5)){const n=Math.hypot(x+.5-q.x,y+.5-q.y);if(n<d){d=n;best={x,y};}}return best;};const a=snap(from),z=snap(to);if(!a||!z)return[];const q=[a],seen=new Map([[a.y*W+a.x,null]]);let end=null;for(let i=0;i<q.length;i++){const v=q[i],k=v.y*W+v.x;if(v.x===z.x&&v.y===z.y){end=k;break;}for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const x=v.x+dx,y=v.y+dy,n=y*W+x;if(x<1||y<1||x>=W-1||y>=H-1||seen.has(n)||!pass(x+.5,y+.5)||![.25,.5,.75].every(t=>pass(v.x+.5+dx*t,v.y+.5+dy*t)))continue;seen.set(n,k);q.push({x,y});}}
 const path=[];if(end!==null)for(let n=end;n!==null;n=seen.get(n))path.push({x:n%W+.5,y:Math.floor(n/W)+.5});path.reverse();vkNPCPaths127.set(key,path);while(vkNPCPaths127.size>24)vkNPCPaths127.delete(vkNPCPaths127.keys().next().value);return path;}
function vkRoomTag127(){if(!interior)return null;if(interior.nursery134)return'nursery';if(interior.propertyArena126)return'arena';if(interior.name==='Wohnhaus West')return'west';if(interior.name==='Wohnhaus Ost')return'east';return interior.kind;}
function vkNPCs127(){if(!vkCycle127)return[];const current=vkWildCurrentId;if(vkNPCMap127!==current){vkNPCPaths127.clear();vkNPCMap127=current;}const elapsed=vkTime127(),time=vkCycle127.state(elapsed),tag=vkRoomTag127(),out=[];
 for(const role of vkCycle127.roles){let s=vkCycle127.schedule(role.id,elapsed);if(!s?.where||(s.mapId||role.mapId)!==current)continue;const home=vkNPCBuilding127(s.home||role.home),guest=vkNPCBuilding127(s.guest||role.guest)||home;if(!home)continue;
 if(s.where==='outside'){const trip=vkNPCTrip138(role,s,home,guest,current,elapsed);if(trip.arrived)s={...s,where:s.stage==='return'?(s.home||role.home):(s.guest||role.guest)};else if(!interior&&trip.npc)out.push(trip.npc);}
 if(s.where===tag){const plan=vkInteriorPlan91(),merchant=role.id==='healer'&&tag==='shop'||role.id==='material'&&tag==='forge'||role.id==='traveler'&&tag==='arena';let q=role.id==='joe'?{x:18.5,y:18.5}:role.id==='wizard'?{x:15.5,y:16.5}:role.id==='traveler'?{x:7.5,y:12.7}:merchant?{x:15.5,y:role.id==='healer'?14.7:14.7}:{x:21.5,y:15.5};
 if(merchant&&['shop','forge'].includes(tag)){const counter=plan.items.find(o=>o.id===VK_INTERIOR_LIBRARY91.keys[(tag==='forge'?'armory':'shop')+'.counter']);if(counter)q={x:counter.x+counter.w/2,y:counter.y+.8};}
 let moving=false,facing='down',gaitDistance=0;if(!merchant)q=vkIndoorAnchor137(plan,role.id,q);if(!merchant&&time.phase!=='night'){const raw=[{x:q.x+1,y:q.y},{x:q.x-1,y:q.y},{x:q.x,y:q.y+1}],neighbor=raw.find(z=>[.25,.5,.75,1].every(t=>vkInteriorPass91(q.x+(z.x-q.x)*t,q.y+(z.y-q.y)*t))),valid=neighbor?[q,neighbor]:[q];if(valid.length>1){const at=(elapsed%24000)/6000,i=Math.floor(at)%valid.length,u=valid[i],v=valid[(i+1)%valid.length],t=Math.min(1,(at%1)*2);q={x:u.x+(v.x-u.x)*t,y:u.y+(v.y-u.y)*t};if(vkInteriorPass91(q.x,q.y)){moving=t<1;gaitDistance=Math.floor(at)+t;facing=Math.abs(v.x-u.x)>Math.abs(v.y-u.y)?v.x>u.x?'right':'left':v.y<u.y?'up':'down';}else q=u;}}
 out.push({...role,...q,inside:true,moving,facing,merchant,gaitDistance});}
 }
 return out;
}
// The invisible mannequin shares one scale per role and view, plus a fixed
// measured pose anchors aligned to the same torso axis and ground line. No per-frame stretching.
function vkNPCSpec127(npc,elapsed=vkTime127()){
 const mode=npc.inside?'indoor':'outdoor',model=vkRig128?.[mode]?.[npc.id];if(!model)throw Error('NPC mannequin is missing: '+npc.id);
 const phase=Math.floor(Number.isFinite(npc.gaitDistance)?npc.gaitDistance*4:elapsed/HERO_FRAME_MS92)%4;
 const frame=npc.moving?[3,0,3,2][phase]:3,direction=model.directions[npc.facing]||model.directions.down,pose=direction.frames[frame];
 return{set:model.set||(npc.inside?'npc-large':'npc-small'),rect:pose.rect,bounds:pose.bounds,anchor:pose.center,foot:pose.foot,referenceHeight:model.referenceHeight,height:window.VaelkorAnimation92.heights[mode],frame,puppet:!!model.puppet,key:'npc-rig129:'+mode+':'+npc.id+':'+npc.facing+':'+(model.puppet?'base':frame)};
}

function vkNPCFrame127(npc){const spec=vkNPCSpec127(npc),sprite=vkCut127(spec.set,spec.rect,spec.key,true);return sprite?{...sprite,spec}:null;}

function vkDrawCounterRoom129(plan){
 ctx.fillStyle='#13121a';ctx.fillRect(0,0,c.width,c.height);ctx.imageSmoothingEnabled=false;
 const part=o=>{const im=vkRoomImage91(o.id);if(!im?.complete||!im.naturalWidth)return;const rec=VK_INTERIOR_LIBRARY91.assets[o.id],floor=o.id===VK_INTERIOR_LIBRARY91.keys['shop.floor']||o.id===VK_INTERIOR_LIBRARY91.keys['armory.floor'];if(floor)ctx.drawImage(im,7,7,im.naturalWidth-14,im.naturalHeight-14,Math.round(o.x*T),Math.round(o.y*T),Math.round(o.w*T),Math.round(o.h*T));else vkQualityDraw130(im,[0,0,im.naturalWidth,im.naturalHeight],o.x*T,o.y*T,o.w*T,o.h*T,'counter-room:'+o.id);};
 plan.items.filter(o=>!o.solid).forEach(part);
 const queue=plan.items.filter(o=>o.solid).map(o=>({depth:o.y+o.h,paint:()=>part(o)}));
 queue.push({depth:p.y,paint:player});for(const npc of vkNPCs127())queue.push({depth:npc.y,paint:()=>vkDrawNPC127(npc)});
 queue.sort((a,b)=>a.depth-b.depth).forEach(o=>o.paint());ctx.textAlign='center';ctx.fillStyle='#ffe4b0';ctx.font='bold 12px system-ui';ctx.fillText(interior.name,15*T,18);ctx.font='10px system-ui';ctx.fillText('▼ Ausgang',15.5*T,35*T);pos.textContent=interior.name+' · Innenraum';
}
function vkDrawNPC127(npc){const sprite=vkNPCFrame127(npc);if(!sprite)return;const spec=sprite.spec,b=spec.bounds,scale=spec.height/spec.referenceHeight,height=spec.height,x=npc.x*T,y=npc.y*T;ctx.save();ctx.imageSmoothingEnabled=false;
 ctx.fillStyle=npc.inside?'rgba(17,29,28,.32)':'rgba(17,29,28,.42)';ctx.beginPath();ctx.ellipse(Math.round(x),Math.round(y)+(npc.inside?2:.5),npc.inside?12:6.5,npc.inside?4:2,0,0,7);ctx.fill();
 const paint=(source,ox=0,oy=0)=>ctx.drawImage(sprite.canvas,...source,Math.round(x+(source[0]-spec.anchor)*scale)+ox,Math.round(y+(source[1]-spec.foot)*scale)+oy,Math.round(source[2]*scale),Math.round(source[3]*scale));
 if(spec.puppet&&npc.moving&&(spec.frame===0||spec.frame===2)){
  // The supplied indoor sheet has standing poses only. Keep the same torso,
  // hat and outfit; alternate the two original feet on a fixed mannequin.
  const split=b[1]+Math.floor(b[3]*.9),middle=Math.round(spec.anchor),step=spec.frame===0?-1:1;
  paint([b[0],b[1],b[2],split-b[1]]);paint([b[0],split,middle-b[0],b[1]+b[3]-split],-step,step<0?-1:0);paint([middle,split,b[0]+b[2]-middle,b[1]+b[3]-split],step,step>0?-1:0);
 }else paint(b);
 ctx.restore();
 if(window.parent.VaelkorNPC134){const mark=window.parent.VaelkorNPC134.indicator(npc.id);if(mark){ctx.save();ctx.fillStyle=mark==='gold'?'#ffd45c':'#51b8ff';ctx.strokeStyle='#102539';ctx.lineWidth=2;ctx.font='bold 12px system-ui';ctx.textAlign='center';ctx.strokeText('!',x,y-height-20);ctx.fillText('!',x,y-height-20);ctx.restore();}}
 if(npc.merchant&&interior?.kind==='arena')for(const o of vkInteriorPlan91().items.filter(o=>o.id==='arena.desk'))vkDrawPart127(o.id,o.x,o.y,o.w,o.h);
 if(Math.hypot(p.x-npc.x,p.y-npc.y)<3.5){ctx.save();ctx.textAlign='center';ctx.font='bold 8px system-ui';ctx.strokeStyle='#102333';ctx.lineWidth=3;ctx.strokeText(npc.name,x,y-height-4);ctx.fillStyle='#ffe5ac';ctx.fillText(npc.name,x,y-height-4);ctx.restore();}
}
function vkLights129(){
 if(interior){const plan=vkInteriorPlan91();if(plan?.lights)return plan.lights.map(o=>({...o,bulbY:o.y-.8}));const items=plan?.items||[];return items.filter(o=>/lantern|candle|candelabrum|fire/i.test(o.id)).slice(0,12).map(o=>({x:o.x+o.w/2,y:o.y+o.h,bulbY:o.y+o.h*.3}));}
 const lights=objects.filter(o=>/laterne|lantern|brunnen|fire/i.test(o.asset||'')).slice(0,14).map(o=>({...o,bulbY:o.y-(/laterne|lantern/.test(o.asset||'')?1.8:1.4),cold:/brunnen|crystal|kristall/i.test(o.asset||'')}));
 if(townMode)for(const o of townProps)if(o.kind==='lamp')lights.push({...o,bulbY:o.y-1.8});
 for(const o of objects.filter(o=>o.nursery134))for(const dx of[-1,1])lights.push({x:o.x+dx,y:o.y-1,bulbY:o.y-1.5});
 for(const o of objects)if(o.transitionEdgeFrame)lights.push({x:o.x+.85,y:o.y-.2,bulbY:o.y-2.1});
 for(const o of healPoints102.slice(0,3))lights.push({...o,cold:true,bulbY:o.y-.8});return lights.slice(0,24);
}
const vkLightStamps129=new Map();
function vkLightStamp129(green){const key=green?'green':'warm';if(vkLightStamps129.has(key))return vkLightStamps129.get(key);const cv=document.createElement('canvas');cv.width=cv.height=128;const g=cv.getContext('2d'),px=g.getImageData(0,0,128,128),d=px.data,color=green?[140,236,91]:[255,191,87];for(let y=0;y<128;y++){const t=y/127,radius=3+t*56,along=Math.pow(Math.sin(t*Math.PI),.6);for(let x=0;x<128;x++){const edge=Math.max(0,1-Math.abs(x-63.5)/radius),i=(y*128+x)*4;d[i]=color[0];d[i+1]=color[1];d[i+2]=color[2];d[i+3]=Math.round(45*along*Math.pow(edge,1.6));}}g.putImageData(px,0,0);vkLightStamps129.set(key,cv);return cv;}
function vkPaintLight129(o,night){
 const x=o.x*T,y=o.y*T,by=(o.bulbY??o.y-1.4)*T,color=o.green?'140,236,91':o.cold?'83,181,255':'255,191,87';
 ctx.save();ctx.globalCompositeOperation='screen';
 // A warm pool on the floor and a soft vertical cone anchored to the bulb.
 ctx.save();ctx.translate(x,y+5);ctx.scale(1,.52);const pool=ctx.createRadialGradient(0,0,0,0,0,70);pool.addColorStop(0,'rgba('+color+','+(.20*night)+')');pool.addColorStop(.45,'rgba('+color+','+(.085*night)+')');pool.addColorStop(1,'rgba('+color+',0)');ctx.fillStyle=pool;ctx.fillRect(-70,-70,140,140);ctx.restore();
 if(!o.cold){ctx.globalAlpha=night;ctx.imageSmoothingEnabled=true;ctx.drawImage(vkLightStamp129(o.green),x-70,by,140,y+38-by);ctx.globalAlpha=1;}
 const glow=ctx.createRadialGradient(x,by,1,x,by,15);glow.addColorStop(0,'rgba('+color+','+(.50*night)+')');glow.addColorStop(.32,'rgba('+color+','+(.24*night)+')');glow.addColorStop(1,'rgba('+color+',0)');ctx.fillStyle=glow;ctx.fillRect(x-15,by-15,30,30);ctx.restore();
}
function vkShader127(){if(!vkCycle127)return;const s=vkCycle127.state(vkTime127()),n=s.night*(interior?(interior.kind==='natureTemple'?.20:interior.kind==='arena'?.19:.17):.46);ctx.save();if(n>.005){ctx.fillStyle='rgba(12,24,66,'+n+')';ctx.fillRect(0,0,c.width,c.height);}if(s.phase==='morning'||s.phase==='evening'){ctx.fillStyle='rgba(244,142,65,'+(.055*(1-s.night))+')';ctx.fillRect(0,0,c.width,c.height);}
 const vignette=ctx.createRadialGradient(c.width/2,c.height*.42,c.width*.2,c.width/2,c.height*.5,c.height*.75);vignette.addColorStop(0,'rgba(4,10,32,0)');vignette.addColorStop(1,'rgba(4,10,32,'+(.06+s.night*.18)+')');ctx.fillStyle=vignette;ctx.fillRect(0,0,c.width,c.height);
 if(s.night>.02)for(const light of vkLights129())vkPaintLight129(light,s.night);
 ctx.restore();}
// Brief proximity conversations, no background simulation or extra timers.
function vkNPCConversations133(npcs,elapsed=vkTime127()){
 const phase=elapsed%12000;
 const en=window.parent.VaelkorLanguage?.get?.()==='en',pairs=[];
 const lines={joe:en?['The eggs need peace.','We will keep it quiet.']:['Die Eier brauchen Ruhe.','Wir sind ganz leise.'],cook:en?['Roast earth monster? Delicious!','You cannot eat everything!']:['Erdmonsterbraten! Köstlich!','Du isst doch nicht alles!'],healer:en?['Need any potions?','Better take one along.']:['Brauchst du Tränke?','Einer für unterwegs.'],material:en?['New supplies arrived.','I will stop by later.']:['Neue Vorräte sind da.','Ich komme später vorbei.'],wizard:en?['The forest is stirring.','We will be careful.']:['Der Wald ist erwacht.','Wir bleiben vorsichtig.'],traveler:en?['News from the road?','The arena is open.']:['Neuigkeiten vom Weg?','Die Arena ist offen.']};
 for(let i=0;i<npcs.length;i++)for(let j=i+1;j<npcs.length;j++)if(Math.hypot(npcs[i].x-npcs[j].x,npcs[i].y-npcs[j].y)<=3.2&&npcs[i].inside===npcs[j].inside)pairs.push([npcs[i],npcs[j]]);
 if(!pairs.length){const wizard=npcs.find(n=>n.id==='wizard');if(wizard&&interior?.kind==='church'&&phase<3500&&Math.hypot(wizard.x-p.x,wizard.y-p.y)<4.5)return[{id:'wizard',partner:null,x:wizard.x,y:wizard.y,text:window.parent.VaelkorAnimux135?.line(elapsed,en?'en':'de')||lines.wizard[0]}];return[];}const meeting=pairs.find(pair=>pair.every(n=>n.talking)&&pair.some(n=>n.id==='joe')&&pair.some(n=>n.id==='wizard'))||pairs.find(pair=>pair.every(n=>n.talking));if(meeting){pairs.splice(0,pairs.length,meeting);}
 const rivalry=pairs.find(pair=>pair.some(n=>n.id==='joe')&&pair.some(n=>n.id==='wizard'));if(!rivalry&&!meeting&&phase>=4500)return[];if(rivalry&&rivalry[0].id!=='joe')rivalry.reverse();const pair=rivalry||pairs[Math.floor(elapsed/12000)%pairs.length];if(!rivalry&&pair.some(n=>n.id==='cook')&&pair[0].id!=='cook')pair.reverse();if(!rivalry&&pair.some(n=>n.id==='wizard')&&pair[0].id!=='wizard')pair.reverse();for(const npc of pair)if(!npc.moving){const other=pair.find(n=>n!==npc),dx=other.x-npc.x,dy=other.y-npc.y;npc.facing=Math.abs(dx)>Math.abs(dy)?dx<0?'left':'right':dy<0?'up':'down';}const reply=meeting?Math.min(...meeting.map(n=>n.talkAge||0))>=1750:rivalry?Math.floor(elapsed/2250)%2===1:phase>=2250,index=reply?1:0,speaker=pair[index],other=pair[1-index],text=rivalry?(en?['Your fancy robe makes no man!','You drunken good-for-nothing!']:['Dein Fummel macht keinen Mann!','Du Säufer und Taugenichts!'])[index]:(pair[0].id==='wizard'?[window.parent.VaelkorAnimux135?.line(elapsed,en?'en':'de')||lines.wizard[0],en?'Should I wait outside?':'Soll ich draußen warten?']:(lines[pair[0].id]||lines.wizard))[index];
 // Standing characters turn toward their conversation partner.
 if(!speaker.moving){const dx=other.x-speaker.x,dy=other.y-speaker.y;speaker.facing=Math.abs(dx)>Math.abs(dy)?dx<0?'left':'right':dy<0?'up':'down';}
 return[{id:speaker.id,partner:other.id,x:speaker.x,y:speaker.y,text}];
}
function vkPaintSpeech133(npcs,speech=vkNPCConversations133(npcs)){for(const q of speech){ctx.save();ctx.font='600 7.5px system-ui';const lines=[];let line='';for(const word of q.text.split(' ')){const next=line?line+' '+word:word;if(line&&ctx.measureText(next).width>130){lines.push(line);line=word;}else line=next;}if(line)lines.push(line);const w=Math.min(142,Math.max(...lines.map(s=>ctx.measureText(s).width))+12),h=lines.length*10+6,x=Math.max(3,Math.min(W*T-w-3,q.x*T-w/2)),y=Math.max(4,q.y*T-(interior?.kind==='nursery'?30:interior?48:31)-h-24);ctx.fillStyle='#fff0d9';ctx.strokeStyle='#806b47';ctx.lineWidth=.8;ctx.beginPath();ctx.roundRect?ctx.roundRect(x,y,w,h,4):ctx.rect(x,y,w,h);ctx.fill();ctx.stroke();ctx.beginPath();const tail=Math.max(x+5,Math.min(x+w-5,q.x*T));ctx.moveTo(tail-3,y+h);ctx.lineTo(tail,y+h+4);ctx.lineTo(tail+3,y+h);ctx.fill();ctx.fillStyle='#283a39';ctx.textAlign='center';ctx.textBaseline='middle';lines.forEach((text,i)=>ctx.fillText(text,x+w/2,y+8+i*10));ctx.restore();}}

let vkClockHUD127=null,vkClockLabel127='';
if(vkCycle127){vkClockHUD127=document.createElement('div');vkClockHUD127.id='vkWorldClock127';vkClockHUD127.style.cssText='position:absolute;right:10px;top:10px;z-index:5;pointer-events:none;padding:5px 8px;border:1px solid #ba9c65;border-radius:9px;background:#102638de;color:#ffe6b0;font:600 10px system-ui;box-shadow:0 2px 8px #0004';if(c.parentElement){c.parentElement.style.position='relative';c.parentElement.appendChild(vkClockHUD127);}}
const vkLifeDrawBefore127=draw;draw=function(){vkLifeDrawBefore127();if(!vkArt127||!vkCycle127)return;ctx.save();ctx.imageSmoothingEnabled=false;
 const counterRoom=interior&&vkInteriorPlan91()?.counterAccess129,npcs=vkNPCs127();const speech=vkNPCConversations133(npcs);if(!counterRoom){for(const npc of npcs.sort((a,b)=>a.y-b.y))vkDrawNPC127(npc);if(npcs.some(n=>p.y>=n.y&&Math.abs(p.x-n.x)<1.8&&Math.abs(p.y-n.y)<3.5))player();}vkShader127();vkPaintSpeech133(npcs,speech);ctx.restore();if(vkClockHUD127){const s=vkCycle127.state(vkTime127()),names={morning:'Morgen',day:'Tag',evening:'Abend',night:'Nacht'};const label=(s.night>.5?'☾ ':'☀ ')+s.text+' · '+names[s.phase];if(label!==vkClockLabel127){vkClockLabel127=label;vkClockHUD127.textContent=label;}}};
const vkLifeInteractBefore127=document.querySelector('#interact').onclick;document.querySelector('#interact').onclick=()=>{if(!interior&&!vkNPCs127().some(n=>Math.hypot(n.x-p.x,n.y-p.y)<3.5)&&window.VaelkorNPCWorld134?.resourceCandidate()){window.parent.postMessage({vkWorld:'resource134'},'*');return;}if(vkNearHeal102()||vkNearbyChest102()||vkNearBed91()){vkLifeInteractBefore127();return;}const npc=window.VaelkorLife127?.nearNPC?.();if(npc&&window.parent.VaelkorNPC134){window.parent.postMessage({vkWorld:'npc134',id:npc.id},'*');return;}if(npc){status.textContent=npc.name+(npc.id==='wizard'?' · Karten und Wissen in der Kirche.':npc.id==='traveler'?' · Auch nachts in der Arena anzutreffen.':' · Willkommen in Grünwald.');return;}vkLifeInteractBefore127();};
window.VaelkorLife127={setTime(ms){if(Number.isFinite(ms)&&ms>=0){vkLifeTime127=ms;vkLifeAt127=performance.now();requestWorldDraw96();}},npcs:()=>vkNPCs127().map(n=>({...n})),nearNPC:()=>vkNPCs127().filter(n=>Math.hypot(n.x-p.x,n.y-p.y)<(n.merchant?5:3.5)).sort((a,b)=>Math.hypot(a.x-p.x,a.y-p.y)-Math.hypot(b.x-p.x,b.y-p.y))[0]||null,conversations:(npcs,t)=>vkNPCConversations133(npcs||vkNPCs127(),t),schedule:(id,t)=>vkCycle127?.schedule(id,t),frameSpec:vkNPCSpec127,spriteCacheSize:()=>vkSprites127.size,temple:vkSuppliedTemple127,lights:vkLights129,roomPlan:()=>vkInteriorPlan91(),needsFrame:vkLifeNeedsFrame129,position:()=>({...p})};
// Main animation loop requests at most 30 FPS while a current-map NPC moves.
function vkLifeNeedsFrame129(now,lastPaint){return !document.hidden&&!battleActive&&!menuPaused102&&now-lastPaint>=1000/30&&(vkWildCurrentId==='main:1'||vkWildCurrentId==='property:gruenwald')&&vkNPCs127().some(n=>n.moving);}
const vkWarmKinds129=new Set();
function vkWarmInterior129(kind){vkWarmRoomAssets137(kind);if(kind==='tent'){const im=vkRoomImage91('room-atlas:ruined');im?.decode?.().catch(()=>{});}if(vkWarmKinds129.has(kind))return;vkWarmKinds129.add(kind);void actorImages87(heroStyle).indoor;
 const group=kind==='church'?'church':kind==='tent'?'tent':kind==='ruined'?'ruined':null;if(group){const image=vkRoomImage91('room-atlas:'+group);if(typeof image?.decode==='function')image.decode().catch(()=>{});vkRoomImage91(VK_INTERIOR_LIBRARY91.keys[group==='church'?'church.floor':'house.floor']);}
 if(['shop','forge'].includes(kind)){const plan=vkGenerateInterior91(kind,seed);for(const o of plan.items)vkRoomImage91(o.id);}
 if(kind==='church'||kind==='shop'||kind==='forge')vkImage127('npc-indoor129');if(kind==='arena'){vkImage127('arena');vkImage127('npc-large');}
}
const vkDecoded135=new WeakSet();
function vkDecode135(im){if(!im||vkDecoded135.has(im)||typeof im.decode!=='function')return;vkDecoded135.add(im);im.decode().then(()=>requestWorldDraw96(),()=>{});}
function vkWarmScene135(){for(const b of [...townBuildings,...wildBuildings102])if(b.desertTent||b.ruinedTent||b.kind==='tent')vkWarmInterior129(b.desertTent?'tent':b.ruinedTent?'ruined':b.kind);for(const o of objects)if(o.type==='vkDecor')vkDecode135(o.wallRun130?vkRoomImage91('gen133-town-stone-wall'):vkNewAtlasImages[o.asset]);for(const zone of[level,level+1]){const enemy=vkTrainerForZone87(zone);if(!enemy)continue;let image=enemyImages87.get(enemy.id);if(!image){image=new Image();image.onload=requestWorldDraw96;image.fetchPriority='high';image.src=enemy.image;enemyImages87.set(enemy.id,image);}vkDecode135(image);}}
function vkWarmTown129(){const hero=actorImages87(heroStyle);for(const mode of['walk','indoor'])for(const poses of Object.values(hero?.[mode]||{}))for(const pose of Array.isArray(poses)?poses:[poses])vkDecode135(pose.im);
 if(townMode){vkDecode135(vkRoomImage91('gen133-town-stone-wall'));for(const b of townBuildings)vkWarmInterior129(b.kind);vkDecode135(vkRoomImage91('house'));}
 if(vkWildCurrentId==='main:1'){vkWarmInterior129('tent');vkWarmInterior129('ruined');vkImage127('npc-outdoor129');vkDecode135(vkRoomImage91('nursery134'));vkDecode135(vkRoomImage91('nurseryOutside134'));}
}
// END VAELKOR SUPPLIED LIFE v127
