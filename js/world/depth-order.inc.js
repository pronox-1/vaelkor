// BEGIN VAELKOR DEPTH ORDER v157
// Cached scenery remains intact. Repaint only opaque scenery overlapping an actor,
// with every actor and selected prop in one foot-depth queue; never redraw actors on top afterwards.
let vkDepthQueue157=[],vkDepthBase157=false;
function vkActorBounds157(x,y){return{l:x*T-70,r:x*T+70,t:y*T-(interior?140:100),b:y*T+12};}
function vkPaintRoomItem157(o){
 if(vkRecords127.has(o.id)){vkDrawPart127(o.id,o.x,o.y,o.w,o.h,o.flipX);return;}
 const rec=VK_INTERIOR_LIBRARY91.assets[o.id];if(!rec)return;const im=vkRoomImage91(rec.rect?'room-atlas:'+rec.set:o.id);if(!im?.complete||!im.naturalWidth)return;
 ctx.save();if(o.flipX){ctx.translate((o.x*2+o.w)*T,0);ctx.scale(-1,1);}vkQualityDraw130(im,rec.rect||[0,0,im.naturalWidth,im.naturalHeight],o.x*T,o.y*T,o.w*T,o.h*T,'room-depth157:'+o.id);ctx.restore();
}
const vkStableSlices157=[
 {id:'upper-left-panel',depth:17.5,polygon:[[94,465],[567,465],[567,535],[94,535]]},
 {id:'upper-right-panel',depth:17.5,polygon:[[970,465],[1435,465],[1435,535],[970,535]]},
 {id:'lower-left-panel',depth:22.5,polygon:[[94,683],[567,683],[567,758],[94,758]]},
 {id:'lower-right-panel',depth:22.5,polygon:[[970,683],[1435,683],[1435,758],[970,758]]},
 ...[82,558,939,1420].map((x,i)=>({id:'stall-post-'+i,depth:22.5,polygon:[[x,446],[x+40,446],[x+40,790],[x,790]]})),
 ...[594,934].flatMap((x,i)=>[410,622].map((y,j)=>({id:'stall-lantern-'+i+'-'+j,depth:22.5,polygon:[[x-8,y],[x+12,y+10],[x+12,y+53],[x,y+68],[x-16,y+52],[x-16,y+12]]})))
];
const vkNurserySlices157=[
 {id:'nursery-supply-awning',depth:18.05,polygon:[[104,340],[167,287],[277,332],[285,552],[106,552]]},
 {id:'nursery-shelter',depth:20.9,polygon:[[1255,540],[1353,483],[1434,532],[1434,708],[1255,708]]},
 ...[[350,673],[862,1184]].map(([x1,x2],i)=>({id:'nursery-back-rail-'+i,depth:14.65,polygon:[[x1,340],[x2,340],[x2,389],[x1,389]]})),
 {id:'nursery-counter',depth:17.8,polygon:[[120,484],[269,484],[269,545],[120,545]]},
 ...[[438,600],[916,1098]].flatMap(([x1,x2],i)=>[742,762].map((y,j)=>({id:'nursery-front-rail-'+i+'-'+j,depth:22.35,polygon:[[x1,y],[x2,y],[x2,y+10],[x1,y+10]]}))),
 ...[428,509,591,908,1008,1087].map((x,i)=>({id:'nursery-front-post-'+i,depth:22.35,polygon:[[x,727],[x+21,727],[x+21,782],[x,782]]})),
 ...[[79,614],[916,1445]].map(([x1,x2],i)=>({id:'nursery-front-wall-'+i,depth:25.5,polygon:[[x1,869],[x2,869],[x2,939],[x1,939]]}))
];
function vkTemplateSlices157(plan){if(!plan?.stable150&&!plan?.nursery134)return[];const scale=30/1536,slices=plan.stable150?vkStableSlices157:vkNurserySlices157,image=plan.stable150?'stable150':'nursery134';return slices.map(slice=>{
 const points=slice.polygon.map(([x,y])=>({x:x*scale*T,y:(7+y*scale)*T})),xs=points.map(p=>p.x),ys=points.map(p=>p.y),bounds={l:Math.min(...xs),r:Math.max(...xs),t:Math.min(...ys),b:Math.max(...ys)};
 return{id:slice.id,kind:'prop',depth:slice.depth,bounds,paint(){const im=vkRoomImage91(image);if(!im?.complete||!im.naturalWidth)return;ctx.save();ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.clip();ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(im,0,7*T,30*T,20*T);ctx.restore();}};
 });}
function vkBuildOccluders157(){
 if(interior){const plan=vkInteriorPlan91();if(plan?.stable150||plan?.nursery134)return vkTemplateSlices157(plan);
  return(plan?.items||[]).filter(o=>o.solid&&!o.collected152).map(o=>({id:o.id,kind:'prop',depth:o.y+o.h,bounds:{l:o.x*T,r:(o.x+o.w)*T,t:o.y*T,b:(o.y+o.h)*T},paint(){vkPaintRoomItem157(o);for(const child of plan.items.filter(c=>c.mountedOn===o.id))vkPaintRoomItem157(child);}}));
 }
 const out=[];for(const o of objects)if(['tree','pine','bush','rock','vkDecor','biomeDecor'].includes(o.type)&&!o.moonshine134)out.push({id:o.asset||o.type,kind:'prop',depth:o.y,bounds:vkBounds96(o),paint:()=>o.type==='vkDecor'?vkNewDecor(o):o.type==='biomeDecor'?vkExpansionDraw(o):prop(o)});
 if(townMode){for(const b of townBuildings){const name=b.name==='Wohnhaus Ost'?'house3':({church:'church',shop:'shop',forge:'forge',house:'house1'}[b.kind]),im=townImages[name],width=b.w*T,height=im?.naturalWidth?width*im.naturalHeight/im.naturalWidth:b.h*T,x=b.x*T+(b.kind==='church'?T/2:0),bottom=(b.y+b.h)*T;out.push({id:'building:'+b.name,kind:'prop',depth:b.y+b.h,bounds:{l:x-2,r:x+width+2,t:bottom-height-2,b:bottom+2},paint(){if(im?.complete&&im.naturalWidth)vkQualityDraw130(im,[0,0,im.naturalWidth,im.naturalHeight],x,bottom-height,width,height,'town:'+name);}});}
  for(const o of townProps){const size={fountain:[74,58],board:[36,40],market:[53,40],lamp:[18,42]}[o.kind];if(!size)continue;const[w,h]=size,x=o.x*T-w/2,y=o.y*T-h+7;out.push({id:'town:'+o.kind,kind:'prop',depth:o.y,bounds:{l:x-2,r:x+w+2,t:y-2,b:y+h+2},paint(){const im=townImages[o.kind];if(im?.complete&&im.naturalWidth)vkQualityDraw130(im,[0,0,im.naturalWidth,im.naturalHeight],x,y,w,h,'town:'+o.kind);}});}
 }return out;
}
// One scene only: actors are still tested at their current position on every paint.
let vkOccluderCache178=null;const vkDepthCacheStats178={builds:0,hits:0};
function vkOccluders157(){
 const rawPlan=interior?vkInteriorPlan91():null,plan=rawPlan?.stable150?'stable150':rawPlan?.nursery134?'nursery134':rawPlan,old=vkOccluderCache178,revision=vkAssetRevision147;
 if(old&&old.revision===revision&&old.room===interior&&old.plan===plan&&old.items===plan?.items&&old.itemCount===(plan?.items?.length||0)&&old.objects===objects&&old.count===objects.length&&old.buildings===townBuildings&&old.buildingCount===townBuildings.length&&old.props===townProps&&old.propCount===townProps.length&&old.town===townMode&&old.seed===seed&&old.level===level){vkDepthCacheStats178.hits++;return old.rows;}
 const rows=vkBuildOccluders157();vkDepthCacheStats178.builds++;vkOccluderCache178={revision,room:interior,plan,items:plan?.items,itemCount:plan?.items?.length||0,objects,count:objects.length,buildings:townBuildings,buildingCount:townBuildings.length,props:townProps,propCount:townProps.length,town:townMode,seed,level,rows};return rows;
}
Object.assign(window.VaelkorPerformance137,{depthCache:()=>({...vkDepthCacheStats178,entries:vkOccluderCache178?.rows.length||0})});
function vkDepthDraw157(base,npcs){
 const wasBase=vkDepthBase157,paintPlayer=player,paintNPC=vkDrawNPC127,paintGuardian=vkDrawGuardian87;vkDepthBase157=true;player=()=>{};vkDrawNPC127=()=>{};vkDrawGuardian87=()=>{};
 try{base();}finally{player=paintPlayer;vkDrawNPC127=paintNPC;vkDrawGuardian87=paintGuardian;vkDepthBase157=wasBase;}
 const actors=[{id:'player',kind:'actor',depth:p.y+.04,bounds:vkActorBounds157(p.x,p.y),paint:paintPlayer},...npcs.map(n=>({id:n.id,kind:'actor',depth:n.y+.04,bounds:vkActorBounds157(n.x,n.y),paint:()=>paintNPC(n)}))];
 if(!interior&&guardian?.present&&!guardian.defeated)actors.push({id:'guardian',kind:'actor',depth:guardian.y+.04,bounds:vkActorBounds157(guardian.x,guardian.y),paint:()=>paintGuardian(guardian.x*T,guardian.y*T)});
 const props=vkOccluders157().filter(o=>actors.some(a=>o.depth>a.depth&&vkOverlap96(o.bounds,a.bounds)));vkDepthQueue157=[...actors,...props].sort((a,b)=>a.depth-b.depth||(a.kind==='prop'?0:1)-(b.kind==='prop'?0:1));
 ctx.save();ctx.beginPath();ctx.rect(0,0,W*T,H*T);ctx.clip();try{for(const entry of vkDepthQueue157)entry.paint();}finally{ctx.restore();}
}
window.VaelkorDepth157={snapshot:()=>vkDepthQueue157.map(({id,kind,depth})=>({id,kind,depth})),stableSlices:()=>vkStableSlices157.map(({id,depth})=>({id,depth}))};
// END VAELKOR DEPTH ORDER v157
