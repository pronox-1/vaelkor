// BEGIN VAELKOR RENDER RUNTIME v137
const vkRenderMetrics137={groundBuilds:0,groundHits:0,errors:0,lastError:null};
let vkGroundCache137=null;
function vkPaintGround137(){
 const biome=vkWorldBiome().key,im=vkExpansionEnsure(biome),ready=image=>image?.complete&&image.naturalWidth?image.naturalWidth:0;
 const key=[seed,level,townMode,biome,map.map(row=>row.join('')).join(''),Object.values(vkWildExits).map(q=>q.x+':'+q.y).join('|'),ready(im),...['grass_a','path_a','water'].map(k=>ready(ART[k]))].join('|');
 if(!vkGroundCache137||vkGroundCache137.key!==key){const output=ctx,canvas=document.createElement('canvas');canvas.width=W*T;canvas.height=H*T;try{ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;for(let y=0;y<H;y++)for(let x=0;x<W;x++)tileStyled(x,y,cell(x,y));vkDrawEncounterGrass();vkDrawExitShadows103();}finally{ctx=output;}vkGroundCache137={key,canvas};vkRenderMetrics137.groundBuilds++;}else vkRenderMetrics137.groundHits++;
 ctx.drawImage(vkGroundCache137.canvas,0,0);
}
const vkWarmPlans137=new Set();
function vkWarmRoomAssets137(kind){const key=kind+':'+seed;if(vkWarmPlans137.has(key))return;vkWarmPlans137.add(key);while(vkWarmPlans137.size>24)vkWarmPlans137.delete(vkWarmPlans137.values().next().value);if(!['house','shop','forge','church','tent','ruined','arena','natureTemple'].includes(kind))return;for(const a of Object.values(vkGeneratorCatalog133?.assets||{}))if(a.view==='indoor'&&a.contexts.includes(kind))vkDecode135(vkRoomImage91(a.id));const plan=vkGenerateInterior91(kind,seed);for(const o of plan?.items||[]){const record=vkRecords127.get(o.id);vkDecode135(record?vkImage127(record.set):vkRoomImage91(o.id));}}
const vkIndoorAnchors137=new WeakMap();
function vkIndoorAnchor137(plan,id,q){if(!plan)return q;let cache=vkIndoorAnchors137.get(plan);if(!cache){cache=new Map();vkIndoorAnchors137.set(plan,cache);}if(cache.has(id))return cache.get(id);let point=q;if(!vkInteriorPass91(q.x,q.y)){let distance=Infinity;for(let y=11.5;y<29;y++)for(let x=3.5;x<27;x++)if(vkInteriorPass91(x,y)){const d=Math.hypot(x-q.x,y-q.y);if(d<distance){distance=d;point={x,y};}}}cache.set(id,point);return point;}
let vkNPCFrameCache137=null;
const vkNPCsBefore137=vkNPCs127;
vkNPCs127=function(){const stamp=Math.floor(vkTime127()/16),cache=vkNPCFrameCache137;if(cache&&cache.stamp===stamp&&cache.map===vkWildCurrentId&&cache.room===interior&&cache.objects===objects&&cache.count===objects.length)return cache.rows;const rows=vkNPCsBefore137();vkNPCFrameCache137={stamp,map:vkWildCurrentId,room:interior,objects,count:objects.length,rows};return rows;};
// Keep the animation heartbeat alive if a future optional asset/NPC renderer fails.
// Release input and retry only after a short backoff rather than a failure loop.
let vkRetryAfter137=0;
const vkTickBefore137=tick;
tick=function(t){if(t<vkRetryAfter137){requestAnimationFrame(tick);return;}try{vkTickBefore137(t);}catch(error){vkRenderMetrics137.errors++;vkRenderMetrics137.lastError=String(error?.message||error);vkRetryAfter137=t+500;releaseInput();animFrom=null;target={...p};ctx=c.getContext('2d');invalidateScene();if(vkRenderMetrics137.errors<=3)console.warn('VAELKOR world frame recovered:',error);status.textContent='Ansicht wird neu aufgebaut …';requestAnimationFrame(tick);}};
Object.assign(window.VaelkorPerformance137,{render:()=>({...vkRenderMetrics137}),invalidateGround(){vkGroundCache137=null;invalidateScene();requestWorldDraw96();}});
// END VAELKOR RENDER RUNTIME v137
