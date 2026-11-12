const{test}=require('node:test');const assert=require('node:assert/strict');const vm=require('node:vm');const fs=require('node:fs');
const identity=require('../js/world/map-registry.js'),{install:adapter}=require('../js/world/legacy-map-adapter.js'),core=require('../js/world/wildlands.js');
const {fixture,embedded}=require('./helpers/embedded-world.cjs');
test('deterministic branch rates and lengths with saved configuration',()=>{
 let count=0,both=0;const lengths=new Set();for(let n=1;n<=3000;n++){const p=core.plan('main:'+n,1042);if(Object.keys(p.branches).length)count++;if(Object.keys(p.branches).length===2)both++;for(const length of Object.values(p.branches))lengths.add(length);assert.equal(p.exits.next.mapId,'main:'+(n+1));}
 assert.ok(count>1350&&count<1650,count);assert.ok(both>100);assert.deepEqual([...lengths].sort(),[1,2,3]);assert.deepEqual(core.plan('main:21',1042),core.plan('main:21',1042));assert.deepEqual(core.plan('main:2',1042,{branchProbability:0}).branches,{});
 assert.equal(core.plan('main:9007199254740993',1042).exits.next.mapId,'main:9007199254740994');
});
test('actual embedded game starts and captures original town without replacing systems',()=>{const f=fixture();const e=embedded(f);assert.equal(f.service.currentId,'main:1');assert.equal(e.scene.id,'main:1');assert.equal(f.maps.getState('main:1').scene.map.length,38);assert.ok(f.writes>0);e.scene.validate();});
function geometry(scene){const{map,objects,townBuildings,entryX,exitX,exits}=scene;const stable=objects.map(o=>JSON.stringify(o)).sort();return require('node:crypto').createHash('sha256').update(JSON.stringify({map,objects:stable,townBuildings,entryX,exitX,exits})).digest('hex');}
test('30 main maps and all their side chains have free exits, exact returns and stable geometry',()=>{
 const f=fixture({zone:1,maxZone:1,wildlandsConfig:{branchProbability:1,bothProbability:1}}),e=embedded(f),lengths=new Set(),variants=new Set();
 function inspect(){const snapshot=e.scene.capture();for(const style of Object.values(snapshot.transitionDecor))variants.add(style.variant);for(const o of snapshot.objects.filter(o=>o.transitionPort)){assert.ok(!/portal/.test(o.asset||''));if(o.block)assert.equal(e.scene.pass(o.x,o.y),false,'marker footprint blocks its base');if(o.asset==='trail_wood_arch'){const gate=snapshot.exits[o.transitionPort];assert.equal(e.scene.pass(o.transitionEdgeFrame?gate.x:o.x,o.transitionEdgeFrame?Math.floor(gate.y)+.5:o.y),true,'arch opening remains free');}}for(const q of Object.values(snapshot.exits)){for(let d=0;d<4;d++){const x=Math.floor(q.x-q.dx*d),y=Math.floor(q.y-q.dy*d);if(x<0||y<0||x>=30||y>=38)break;assert.ok([1,4].includes(snapshot.map[y][x]));}}}
 for(let n=1;n<=30;n++){
  const id='main:'+n;assert.equal(e.scene.id,id);e.scene.validate();inspect();const mainGeometry=geometry(e.scene.capture()),p=f.service.ensure(id).plan;
  for(const side of ['left','right']){
   const length=p.branches[side],back=identity.opposite(side);lengths.add(length);
   for(let i=1;i<=length;i++){assert.equal(e.scene.travel(side),true,`${id} ${side} ${i}`);assert.equal(e.scene.id,identity.sideId(id,side,i));assert.equal(e.scene.capture().townMode,false);e.scene.validate();inspect();assert.ok(e.scene.pass(e.scene.capture().spawn.x,e.scene.capture().spawn.y));}
   assert.equal(e.scene.travel(side),false,'terminal side has no outward exit');
   for(let i=length;i>=1;i--){assert.equal(e.scene.travel(back),true);assert.equal(e.scene.id,i===1?id:identity.sideId(id,side,i-1));}
   assert.equal(geometry(e.scene.capture()),mainGeometry,'main geometry survives side visit');
  }
  if(n<30)assert.equal(e.scene.travel('next'),true,'next main '+n);
 }
 assert.deepEqual([...lengths].sort(),[1,2,3]);assert.ok(variants.has('plain'));assert.ok(variants.has('sign'));assert.ok(variants.has('rocks'));assert.ok(variants.has('arch'),'rare wooden arch is actually placed');
 for(let n=30;n>1;n--){assert.equal(e.scene.travel('previous'),true);assert.equal(e.scene.id,'main:'+(n-1));}
 assert.equal(e.scene.travel('previous'),false);
});
test('save/reload on a side map preserves identity, geometry and opened chests without duplicate generation',()=>{
 const f=fixture({zone:6,maxZone:6,adventureChests102:{'6:outdoor':true},wildlandsConfig:{branchProbability:1,bothProbability:1}}),e=embedded(f);
 assert.equal(e.scene.travel('left'),true);const id=e.scene.id,before=geometry(e.scene.capture());
 f.maps.patchState(id,{permanentTest:{resourceTaken:true}});f.data.adventureChests102[id+'|6:outdoor']=true;assert.equal(e.scene.save(),true);
 const reloaded=fixture(JSON.parse(JSON.stringify(f.data))),r=embedded(reloaded);
 assert.equal(r.scene.id,id);assert.equal(geometry(r.scene.capture()),before);assert.equal(reloaded.maps.getState(id).permanentTest.resourceTaken,true);assert.equal(reloaded.data.adventureChests102[id+'|6:outdoor'],true);assert.equal(reloaded.data.adventureChests102['6:outdoor'],true);
 const count=Object.keys(reloaded.data.mapRegistry.maps).length;r.initialize();assert.equal(Object.keys(reloaded.data.mapRegistry.maps).length,count);assert.equal(geometry(r.scene.capture()),before);
});
test('planned but unvisited maps have no terrain and failed saves retain the current playable scene',()=>{
 const f=fixture(),e=embedded(f);assert.equal(f.maps.has('main:2'),false);const before=geometry(e.scene.capture());
 let capture=e.scene.capture();const maps=f.maps;let fail=false;
 const service=core.install({maps,getWorld:()=>f.data,persist:()=>!fail});
 const engine={capture:()=>capture,restore:s=>capture=s,generate:s=>capture={version:1,level:s.level,seed:s.seed,guardian:null},prepare(){},validate(){},place(){},position:()=>({x:3.5,y:3.5}),report(){}};
 assert.equal(service.open('main:1',engine),true);fail=true;assert.equal(service.travel('next',engine),false);assert.equal(service.currentId,'main:1');assert.equal(f.data.vkMapId,'main:1');assert.equal(geometry(capture),before);
});
test('actual movement and 1.5-second transition return from a side map once and save immediately',()=>{
 const f=fixture({zone:1,maxZone:1,wildlandsConfig:{branchProbability:1,bothProbability:1}}),e=embedded(f);assert.equal(e.scene.travel('left'),true);const before=f.writes;
 const start=e.scene.capture().spawn,goal=e.scene.exits.right,queue=[start],parents=new Map([[start.x+','+start.y,null]]);let end=null;
 for(let i=0;i<queue.length;i++){const p=queue[i],key=p.x+','+p.y;if(p.x===goal.x&&p.y===goal.y){end=key;break;}for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const q={x:p.x+dx,y:p.y+dy},id=q.x+','+q.y;if(q.x<1||q.y<1||q.x>=29||q.y>=37||parents.has(id)||![.25,.5,.75,1].every(t=>e.scene.pass(p.x+dx*t,p.y+dy*t)))continue;parents.set(id,{previous:key,dx,dy});queue.push(q);}}
 assert.ok(end);const route=[];for(let k=end;parents.get(k);k=parents.get(k).previous)route.unshift(parents.get(k));
 e.advance(16);for(const step of route){const key=step.dx===1?'ArrowRight':step.dx===-1?'ArrowLeft':step.dy===1?'ArrowDown':'ArrowUp';e.key(key);e.advance(1);e.key(key,true);e.advance(200);}
 assert.equal(e.scene.id,'side:1:left:1');e.advance(2000);assert.equal(e.scene.id,'main:1',JSON.stringify({p:e.scene.capture().spawn,exits:e.scene.exits,transition:e.context.VaelkorTransitions100.state}));assert.equal(f.data.vkMapId,'main:1');assert.ok(f.writes>before);const saved=f.writes;e.advance(3000);assert.equal(e.scene.id,'main:1');assert.equal(f.writes,saved,'no duplicate automatic transition');assert.ok(e.messages.some(m=>m.vkWorld==='ready'&&m.mapId==='main:1'));

});
test('existing biome hubs and nature maps keep their art and reachable graph exits',()=>{
 for(const zone of [39,40,49,50,59,60,69,70]){const f=fixture({zone,maxZone:zone}),e=embedded(f);e.scene.validate();assert.equal(e.scene.capture().townMode,zone%10===0);assert.equal(e.scene.travel('next'),true);e.scene.validate();assert.equal(e.scene.travel('previous'),true);assert.equal(e.scene.id,'main:'+zone);}
});
test('late parent module loading attaches to the saved side map without overwriting the loaded level',()=>{
 const f=fixture({zone:6,maxZone:6,wildlandsConfig:{branchProbability:1,bothProbability:1}}),e=embedded(f);assert.equal(e.scene.travel('left'),true);const save=JSON.parse(JSON.stringify(f.data)),id=e.scene.id;
 const next=fixture(save),late=embedded(next,true);assert.equal(next.service.currentId,null);assert.equal(next.data.zone,6);late.context.parent.VaelkorWildlands=next.service;assert.equal(late.scene.attach(),true);assert.equal(late.scene.id,id);assert.equal(next.data.zone,6);assert.equal(late.scene.attach(),false);
});
test('explicit legacy respawn selects the main town even from a side map at the same level',()=>{
 const f=fixture({zone:1,maxZone:1,wildlandsConfig:{branchProbability:1,bothProbability:1}}),e=embedded(f);assert.equal(e.scene.travel('left'),true);e.initialize(1,{mapId:'main:1',x:15.5,y:26.5});assert.equal(e.scene.id,'main:1');assert.equal(e.scene.capture().townMode,true);assert.equal(f.data.vkMapId,'main:1');
});
test('previously cleared main guardians stay cleared in both the scene and legacy battle state',()=>{
 const f=fixture({zone:10,maxZone:10,clearedZones:{10:true}}),e=embedded(f);assert.equal(e.scene.capture().guardian.defeated,true);assert.equal(f.data.trainerCleared,true);assert.equal(e.scene.travel('next'),true);assert.equal(e.scene.travel('previous'),true);assert.equal(e.scene.capture().guardian.defeated,true);assert.equal(f.data.trainerCleared,true);
});
test('position saves coalesce into one timer and flush immediately when leaving the page',()=>{
 const f=fixture(),scheduled=new Map();let count=0,writes=0;
 const service=core.install({maps:f.maps,getWorld:()=>f.data,persist:()=>{writes++;return true;},schedule:(fn,ms)=>{assert.equal(ms,750);scheduled.set(++count,fn);return count;},cancel:id=>scheduled.delete(id)});
 for(let i=0;i<100;i++)service.persistPosition();assert.equal(scheduled.size,1);assert.equal(writes,0);assert.equal(service.flushPositions(),true);assert.equal(scheduled.size,0);assert.equal(writes,1);service.flushPositions();assert.equal(writes,1);
 service.persistPosition();const callback=[...scheduled.values()][0];scheduled.clear();callback();assert.equal(writes,2);
});
test('changing save owners cancels pending position persistence without leaking the previous active map',()=>{
 let current={zone:1};const maps=adapter({getWorld:()=>current,persist:()=>true,queue:()=>{}});const scheduled=new Set();const service=core.install({maps,getWorld:()=>current,persist:()=>true,schedule:fn=>{scheduled.add(fn);return fn;},cancel:fn=>scheduled.delete(fn)});
 service.persistPosition();assert.equal(scheduled.size,1);current={zone:2};service.ensure('main:2');assert.equal(scheduled.size,0);assert.equal(service.currentId,null);assert.equal(Object.keys(current.mapRegistry.maps).length,1);
});
test('natural trails reach all four map edges and physical opposite entries without adding branches',()=>{
 const f=fixture({zone:1,maxZone:1,wildlandsConfig:{branchProbability:1,bothProbability:1}}),e=embedded(f);
 function edge(q){return q.dx===1?'west':q.dx===-1?'east':q.dy===1?'north':'south';}const opposite={west:'east',east:'west',north:'south',south:'north'};
 for(const port of ['next','previous','left','right']){
  if(!e.scene.exits[port])continue;const sourceId=e.scene.id,q=e.scene.exits[port],plan=f.service.ensure(sourceId).plan,back=plan.exits[port].entry;
  for(let i=0;i<4;i++){const x=Math.floor(q.x-q.dx*i),y=Math.floor(q.y-q.dy*i);if(x<0||y<0||x>=30||y>=38)break;assert.ok([1,4].includes(e.scene.capture().map[y][x]),'visible trail to boundary');}
  assert.equal(e.scene.travel(port),true);assert.equal(edge(e.scene.exits[back]),opposite[edge(q)]);assert.equal(e.scene.travel(back),true);assert.equal(e.scene.id,sourceId);
 }
});
test('old cached towns migrate exits once without regenerating buildings, seeds or treasure state',()=>{
 const f=fixture({zone:10,maxZone:10,adventureChests102:{'9:outdoor':true}}),e=embedded(f),saved=JSON.parse(JSON.stringify(f.data)),scene=saved.mapRegistry.maps['main:10'].state.scene;
 const seed=scene.seed,buildings=JSON.stringify(scene.townBuildings);scene.transitionVersion=0;scene.transitionDecor={};scene.objects=scene.objects.filter(o=>!o.transitionPort);scene.exits.next={x:scene.entryX+.5,y:36.5,dx:0,dy:-1};scene.exits.previous={x:1.5,y:2.5,dx:0,dy:1};
 const next=fixture(saved),n=embedded(next);assert.equal(n.scene.exits.next.dy,1);assert.equal(n.scene.exits.previous.dy,-1);assert.equal(n.scene.capture().seed,seed);assert.equal(JSON.stringify(n.scene.capture().townBuildings),buildings);assert.equal(next.data.adventureChests102['9:outdoor'],true);assert.equal(n.scene.capture().transitionVersion,2);const before=geometry(n.scene.capture());n.initialize();assert.equal(geometry(n.scene.capture()),before);
});
test('facing is retained across linked maps and reload',()=>{
 const f=fixture({zone:2,maxZone:2}),e=embedded(f);e.key('ArrowLeft');e.advance(1);e.key('ArrowLeft',true);e.advance(200);assert.equal(e.scene.capture().facing,'left');assert.equal(e.scene.travel('next'),true);assert.equal(e.scene.capture().facing,'left');const reloaded=fixture(JSON.parse(JSON.stringify(f.data))),r=embedded(reloaded);assert.equal(r.scene.capture().facing,'left');
});
test('a sign remains beside the route and presents its hint through the existing interaction',()=>{
 let found=false;for(let zone=1;zone<=12&&!found;zone++){const f=fixture({zone,maxZone:zone}),e=embedded(f),scene=e.scene.capture(),sign=scene.objects.find(o=>o.transitionSign);if(!sign)continue;
  const points=[];for(let y=1;y<37;y++)for(let x=1;x<29;x++)if(e.scene.pass(x+.5,y+.5)&&Math.hypot(x+.5-sign.x,y+.5-sign.y)<1.85)points.push({x:x+.5,y:y+.5});assert.ok(points.length);e.initialize(zone,{x:points[0].x,y:points[0].y,mapId:'main:'+zone});e.context.document.querySelector('#interact').onclick();assert.ok(e.messages.some(m=>m.vkWorld==='interact'&&m.message===sign.transitionSign));found=true;
 }assert.equal(found,true);
});
test('save immediately before a natural gate reloads there and crosses once without bouncing',()=>{
 const f=fixture({zone:2,maxZone:2,clearedZones:{2:true}}),e=embedded(f),gate=e.scene.exits.next,near={x:gate.x+gate.dx*2,y:gate.y+gate.dy*2};e.initialize(2,{mapId:'main:2',...near});e.scene.save();
 const next=fixture(JSON.parse(JSON.stringify(f.data))),r=embedded(next);assert.deepEqual(JSON.parse(JSON.stringify(r.scene.capture().spawn)),near);r.advance(16);
 for(let i=0;i<2;i++){r.key('ArrowUp');r.advance(1);r.key('ArrowUp',true);r.advance(200);}r.advance(2100);assert.equal(r.scene.id,'main:3');assert.equal(next.data.vkMapId,'main:3');assert.ok(r.scene.pass(next.data.vkWorldX,next.data.vkWorldY));r.advance(3000);assert.equal(r.scene.id,'main:3');
});
test('an uncleared town guardian does not block the southward return to the previous map',()=>{
 const f=fixture({zone:10,maxZone:10}),e=embedded(f),q=e.scene.exits.previous;e.initialize(10,{mapId:'main:10',x:q.x+q.dx*2,y:q.y+q.dy*2});e.advance(16);for(let i=0;i<2;i++){e.key('ArrowDown');e.advance(1);e.key('ArrowDown',true);e.advance(200);}e.advance(2100);assert.equal(e.scene.id,'main:9');assert.equal(e.messages.some(m=>m.vkWorld==='guardian'),false);
});
test('the relocated forward town guardian still starts the existing trainer battle',()=>{
 const f=fixture({zone:10,maxZone:10}),e=embedded(f),q=e.scene.exits.next;e.initialize(10,{mapId:'main:10',x:q.x+q.dx*2,y:q.y+q.dy*2});e.key('ArrowUp');e.advance(1);e.key('ArrowUp',true);e.advance(2200);assert.equal(e.scene.id,'main:10');assert.ok(e.messages.some(m=>m.vkWorld==='guardian'));
});
