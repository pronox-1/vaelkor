// BEGIN VAELKOR STABILITY RUNTIME v147
let vkHold147=false;
const vkTransitionStats147={runs:0,yields:0,maxSlice:0,total:0};
let vkSliceAt147=null;
function vkYield147(){if(document.hidden)return Promise.reject(Error('Kartenwechsel pausiert: App im Hintergrund.'));const now=performance.now();if(vkSliceAt147!==null)vkTransitionStats147.maxSlice=Math.max(vkTransitionStats147.maxSlice,now-vkSliceAt147);vkTransitionStats147.yields++;return new Promise(resolve=>setTimeout(()=>{vkSliceAt147=performance.now();resolve();},0));}
async function vkRunSteps147(iterator){let done=false;while(!done){const at=performance.now();done=iterator.next().done;vkTransitionStats147.maxSlice=Math.max(vkTransitionStats147.maxSlice,performance.now()-at);if(!done)await vkYield147();}}
const vkDrawBefore147=draw;draw=function(){if(vkHold147){objects.sort((a,b)=>a.y-b.y);return;}return vkDrawBefore147.apply(this,arguments);};
const vkTickBefore147=tick;tick=function(t){if(vkHold147){releaseInput();requestAnimationFrame(tick);return;}return vkTickBefore147(t);};
const vkBusyBefore147=vkTransitionBusy100;vkTransitionBusy100=function(){return vkHold147||vkBusyBefore147();};
async function vkPaintChunks147(rows,paint,context){for(let i=0;i<rows.length;){const at=performance.now(),output=ctx;try{ctx=context;let count=0;do{paint(rows[i++]);count++;}while(i<rows.length&&count<8&&performance.now()-at<5);}finally{ctx=output;}vkTransitionStats147.maxSlice=Math.max(vkTransitionStats147.maxSlice,performance.now()-at);if(i<rows.length)await vkYield147();}}
let vkAssetRevision147=0;const vkInvalidateBefore147=invalidateScene;invalidateScene=function(){vkAssetRevision147++;return vkInvalidateBefore147();};
async function vkRenderScene147(retry=0){const at=performance.now();vkTransitionStats147.runs++;invalidateScene();const revision=vkAssetRevision147;vkTrailGeometry145.clear();
 // The ground renderer's exact key is captured by its normal cache lookup below.
 const ground=document.createElement('canvas');ground.width=c.width;ground.height=c.height;const g=ground.getContext('2d');g.setTransform(vkRenderScale145,0,0,vkRenderScale145,0,0);g.imageSmoothingEnabled=false;
 await vkPaintChunks147(Array.from({length:H},(_,y)=>y),y=>{for(let x=0;x<W;x++)tileStyled(x,y,cell(x,y));},g);
 {const output=ctx;try{ctx=g;vkDrawEncounterGrass();vkDrawExitShadows103();}finally{ctx=output;}}
 const biome=vkWorldBiome().key,im=vkExpansionEnsure(biome),ready=image=>image?.complete&&image.naturalWidth?image.naturalWidth:0;
 const key=[seed,level,townMode,biome,map.map(row=>row.join('')).join(''),Object.values(vkWildExits).map(q=>q.x+':'+q.y).join('|'),ready(im),...['grass_a','path_a','water'].map(k=>ready(ART[k]))].join('|');
 vkGroundCache137={key,canvas:ground};vkRenderMetrics137.groundBuilds++;
 const terrain=document.createElement('canvas');terrain.width=c.width;terrain.height=c.height;const tg=terrain.getContext('2d');tg.setTransform(vkRenderScale145,0,0,vkRenderScale145,0,0);tg.imageSmoothingEnabled=false;tg.drawImage(ground,0,0,W*T,H*T);objects.sort((a,b)=>a.y-b.y);
 await vkPaintChunks147(objects,o=>{if(o.type!=='tree'&&o.type!=='pine'&&o.type!=='biomeDecor')prop(o);},tg);
 if(showDebug){const output=ctx;try{ctx=tg;for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(cell(x,y)===types.WATER)fill('rgba(238,69,72,.20)',x*T,y*T,T,T);}finally{ctx=output;}}
 const scene=document.createElement('canvas');scene.width=c.width;scene.height=c.height;const sg=scene.getContext('2d');sg.setTransform(vkRenderScale145,0,0,vkRenderScale145,0,0);sg.imageSmoothingEnabled=false;sg.drawImage(terrain,0,0,W*T,H*T);
 await vkPaintChunks147(objects,o=>{if(o.type==='tree'||o.type==='pine')prop(o);else if(o.type==='vkDecor')vkNewDecor(o);else if(o.type==='biomeDecor')vkExpansionDraw(o);},sg);
 if(townMode){const output=ctx;try{ctx=sg;townArt();}finally{ctx=output;}}
 if(revision!==vkAssetRevision147&&retry<2){await vkYield147();return vkRenderScene147(retry+1);}
 terrainCache=terrain;cacheSeed=seed;cacheDebug=showDebug;cacheLevel=level;sceneCache=scene;sceneTerrain=terrain;vkTransitionStats147.total=performance.now()-at;window.parent.VaelkorGraphics147?.nextScene();if(revision!==vkAssetRevision147)invalidateScene();
}
const vkBudget147=window.parent.VaelkorGraphics147,vkBudgetAPI147=window.parent.VaelkorGraphicsBudget147;
if(vkBudget147&&vkBudgetAPI147){for(const[name,cache]of Object.entries({prepared:vkPrepared130,sprites:vkSprites127,walls:vkWallImages130,grass:vkGrassTiles146,quests:vkQuestSprites146,rooms:vkRoomImages91,atlases:vkImages127,biomes:vkExpansionImages,props:vkNewAtlasCache147,enemies:enemyImages87}))vkBudgetAPI147.observeMap(cache,vkBudget147,'world:'+name,{onDelete:value=>{if(name==='prepared')vkPreparedPixels130-=value.pixels;}});
 for(const[name,get]of Object.entries({screen:()=>c,terrain:()=>terrainCache,scene:()=>sceneCache,ground:()=>vkGroundCache137?.canvas}))vkBudget147.track('world:buffer:'+name,{bytes:()=>{const cv=get();return cv?cv.width*cv.height*4:0;},pinned:true});
 let trimAt=0;const before=draw;draw=function(){const result=before.apply(this,arguments);const now=performance.now();if(!vkHold147&&now>=trimAt){trimAt=now+2000;vkBudget147.trim();}return result;};
}
Object.assign(window.VaelkorPerformance137,{transition:()=>({...vkTransitionStats147,busy:vkHold147}),budget:()=>vkBudget147?.stats()||null});
// END VAELKOR STABILITY RUNTIME v147
