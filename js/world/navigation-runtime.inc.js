// BEGIN VAELKOR NAVIGATION RUNTIME v137
// A snapshot lasts only for one read-only search. Movement keeps the original
// collision owner; no rounded coordinates or persistent collision cache.
let vkCollisionSearch137=null;
const vkNavigationMetrics137={snapshots:0,queries:0,candidates:0};
function vkCollisionSnapshot137(){
 const buckets=new Map(),stride=W+8;
 const key=(x,y)=>(Math.floor(y)+4)*stride+Math.floor(x)+4;
 function add(left,top,right,bottom,hit){if(![left,top,right,bottom].every(Number.isFinite))return;const record={left,top,right,bottom,hit};for(let y=Math.max(-2,Math.floor(top));y<=Math.min(H+2,Math.floor(bottom));y++)for(let x=Math.max(-2,Math.floor(left));x<=Math.min(W+2,Math.floor(right));x++){const k=key(x,y);if(!buckets.has(k))buckets.set(k,[]);buckets.get(k).push(record);}}
 if(townMode){for(const o of townProps)add(o.x-o.rx,o.y-o.ry,o.x+o.rx,o.y+o.ry,(x,y)=>Math.abs(x-o.x)<o.rx&&Math.abs(y-o.y)<o.ry);
 for(const b of townBuildings)add(b.x-.16,b.y-.12,b.x+b.w+.16,b.y+b.h+.18,(x,y)=>x>=b.x-.16&&x<=b.x+b.w+.16&&y>=b.y-.12&&y<=b.y+b.h+.18&&!vkDoorCorridor101(b,x,y));}
 const houses=new Map();for(const b of wildBuildings102)if(!houses.has(b.object102))houses.set(b.object102,b);
 for(const o of objects){if(!o.block)continue;const f=collisionFootprint(o),rect=o.type==='vkDecor',rx=f.rx+(rect?.12:.13),ry=f.ry+(rect?.12:.13),b=o.wildHouse102?houses.get(o):null;
 add(o.x-rx,f.cy-ry,o.x+rx,f.cy+ry,(x,y)=>{if(b&&vkDoorCorridor101(b,x,y))return false;if(rect)return Math.abs(x-o.x)<rx&&Math.abs(y-f.cy)<ry;const dx=(x-o.x)/rx,dy=(y-f.cy)/ry;return dx*dx+dy*dy<1;});}
 vkNavigationMetrics137.snapshots++;
 return(x,y)=>{if(interior)return false;vkNavigationMetrics137.queries++;for(const r of buckets.get(key(x,y))||[]){vkNavigationMetrics137.candidates++;if(x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom&&r.hit(x,y))return true;}return false;};
}
function vkWithCollision137(work){const previous=vkCollisionSearch137;vkCollisionSearch137=previous||vkCollisionSnapshot137();try{return work();}finally{vkCollisionSearch137=previous;}}
const vkObjBlockBefore137=objBlock;objBlock=function(x,y){return vkCollisionSearch137?vkCollisionSearch137(x,y):vkObjBlockBefore137(x,y);};
const vkFloodBefore137=vkWildFlood;vkWildFlood=function(start){return vkWithCollision137(()=>vkFloodBefore137(start));};
const vkRouteBefore137=vkNPCRoute127;vkNPCRoute127=function(from,to){const key=[vkWildCurrentId,seed,from.x,from.y,to.x,to.y].join('|');if(vkNPCPaths127.has(key))return vkNPCPaths127.get(key);return vkWithCollision137(()=>vkRouteBefore137(from,to));};
window.VaelkorPerformance137={navigation:()=>({...vkNavigationMetrics137}),collisionProbe(points){const check=vkCollisionSnapshot137();return points.map(q=>({x:q.x,y:q.y,original:vkObjBlockBefore137(q.x,q.y),indexed:check(q.x,q.y)}));}};
// END VAELKOR NAVIGATION RUNTIME v137
