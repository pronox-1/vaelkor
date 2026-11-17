// BEGIN VAELKOR RENDER RUNTIME v137
const vkRenderMetrics137={groundBuilds:0,groundHits:0,errors:0,lastError:null};
let vkGroundCache137=null,vkTrailGeometry145=new Map();
// Cache local road geometry, then take one square root instead of repeated hypot.
const vkTrailFieldBefore145=trailField;
trailField=function(wx,wy){const cx=Math.floor(wx/T),cy=Math.floor(wy/T),key=cy*W+cx;let lines=vkTrailGeometry145.get(key);if(!lines){const unique=new Map();for(let y=cy-1;y<=cy+1;y++)for(let x=cx-1;x<=cx+1;x++){if(!roadAt(x,y))continue;const x1=x*T+8,y1=y*T+8;unique.set(x1+':'+y1,[x1,y1,x1,y1]);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]])if(roadAt(x+dx,y+dy)){const x2=x1+dx*T,y2=y1+dy*T,a=Math.min(x1,x2),b=Math.min(y1,y2),c=Math.max(x1,x2),d=Math.max(y1,y2);unique.set([a,b,c,d].join(':'),[a,b,c,d]);}}lines=[...unique.values()];vkTrailGeometry145.set(key,lines);}let best=1e18;for(const[a,b,c,d]of lines){const dx=wx-Math.max(a,Math.min(c,wx)),dy=wy-Math.max(b,Math.min(d,wy));best=Math.min(best,dx*dx+dy*dy);}return Math.sqrt(best);};

let vkNoiseSeed145=null,vkNoiseCells145=new Map(),vkNoiseCount145=0;
const vkNoiseBefore145=noise2;
noise2=function(x,y,k=0){if(seed!==vkNoiseSeed145){vkNoiseSeed145=seed;vkNoiseCells145.clear();vkNoiseCount145=0;}const ix=Math.floor(x),iy=Math.floor(y);if(ix< -1024||ix>1023||iy< -1024||iy>1023)return vkNoiseBefore145(x,y,k);let cells=vkNoiseCells145.get(k);if(!cells){cells=new Map();vkNoiseCells145.set(k,cells);}const key=(iy+1024)*2048+ix+1024;let a=cells.get(key);if(!a){if(vkNoiseCount145>=8192){vkNoiseCells145.clear();vkNoiseCount145=0;cells=new Map();vkNoiseCells145.set(k,cells);}a=[hash(ix,iy,k),hash(ix+1,iy,k),hash(ix,iy+1,k),hash(ix+1,iy+1,k)];cells.set(key,a);vkNoiseCount145++;}let fx=x-ix,fy=y-iy;fx=fx*fx*(3-2*fx);fy=fy*fy*(3-2*fy);return(a[0]+(a[1]-a[0])*fx)*(1-fy)+(a[2]+(a[3]-a[2])*fx)*fy;};
let vkBiomeDraw145=null;const vkBiomeBefore145=vkWorldBiome;vkWorldBiome=function(){return vkBiomeDraw145||vkBiomeBefore145();};
function vkPaintGround137(){
 const biome=vkWorldBiome().key,im=vkExpansionEnsure(biome),ready=image=>image?.complete&&image.naturalWidth?image.naturalWidth:0;
 const key=[seed,level,townMode,biome,map.map(row=>row.join('')).join(''),Object.values(vkWildExits).map(q=>q.x+':'+q.y).join('|'),ready(im),...['grass_a','path_a','water'].map(k=>ready(ART[k]))].join('|');
 if(!vkGroundCache137||vkGroundCache137.key!==key){vkTrailGeometry145.clear();const output=ctx,canvas=document.createElement('canvas');canvas.width=Math.round(W*T*vkRenderScale145);canvas.height=Math.round(H*T*vkRenderScale145);try{vkBiomeDraw145=vkBiomeBefore145();ctx=canvas.getContext('2d');ctx.setTransform(vkRenderScale145,0,0,vkRenderScale145,0,0);ctx.imageSmoothingEnabled=false;for(let y=0;y<H;y++)for(let x=0;x<W;x++)tileStyled(x,y,cell(x,y));vkDrawEncounterGrass();vkDrawExitShadows103();}finally{ctx=output;vkBiomeDraw145=null;}vkGroundCache137={key,canvas};vkRenderMetrics137.groundBuilds++;}else vkRenderMetrics137.groundHits++;
 ctx.drawImage(vkGroundCache137.canvas,0,0,W*T,H*T);
}
const vkWarmPlans137=new Set();
function vkWarmRoomAssets137(kind){const key=kind+':'+seed;if(vkWarmPlans137.has(key))return;vkWarmPlans137.add(key);while(vkWarmPlans137.size>24)vkWarmPlans137.delete(vkWarmPlans137.values().next().value);if(!['house','shop','forge','church','tent','ruined','arena','natureTemple'].includes(kind))return;const plan=vkGenerateInterior91(kind,seed);for(const o of plan?.items||[]){const record=vkRecords127.get(o.id);vkDecode135(record?vkImage127(record.set):vkRoomImage91(o.id));}}
const vkIndoorAnchors137=new WeakMap();
function vkIndoorAnchor137(plan,id,q){if(!plan)return q;let cache=vkIndoorAnchors137.get(plan);if(!cache){cache=new Map();vkIndoorAnchors137.set(plan,cache);}if(cache.has(id))return cache.get(id);let point=q;if(!vkInteriorPass91(q.x,q.y)){let distance=Infinity;for(let y=11.5;y<29;y++)for(let x=3.5;x<27;x++)if(vkInteriorPass91(x,y)){const d=Math.hypot(x-q.x,y-q.y);if(d<distance){distance=d;point={x,y};}}}cache.set(id,point);return point;}
let vkNPCFrameCache137=null;
const vkNPCsBefore137=vkNPCs127;
vkNPCs127=function(){const stamp=Math.floor(vkTime127()/16),cache=vkNPCFrameCache137;if(cache&&cache.stamp===stamp&&cache.map===vkWildCurrentId&&cache.room===interior&&cache.objects===objects&&cache.count===objects.length)return cache.rows;const rows=vkNPCsBefore137();vkNPCFrameCache137={stamp,map:vkWildCurrentId,room:interior,objects,count:objects.length,rows};return rows;};
// Keep the animation heartbeat alive if a future optional asset/NPC renderer fails.
// Release input and retry only after a short backoff rather than a failure loop.
let vkRetryAfter137=0;
const vkTickBefore137=tick;
tick=function(t){if(t<vkRetryAfter137){requestAnimationFrame(tick);return;}try{vkTickBefore137(t);}catch(error){vkRenderMetrics137.errors++;vkRenderMetrics137.lastError=String(error?.message||error);vkRetryAfter137=t+500;releaseInput();animFrom=null;target={...p};ctx=c.getContext('2d');ctx.setTransform(vkRenderScale145,0,0,vkRenderScale145,0,0);invalidateScene();if(vkRenderMetrics137.errors<=3)console.warn('VAELKOR world frame recovered:',error);status.textContent='Ansicht wird neu aufgebaut …';requestAnimationFrame(tick);}};
Object.assign(window.VaelkorPerformance137,{render:()=>({...vkRenderMetrics137}),invalidateGround(){vkGroundCache137=null;invalidateScene();requestWorldDraw96();}});
// END VAELKOR RENDER RUNTIME v137
