const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const baseline=require('./fixtures/baseline-v104.json');
const sha=s=>require('node:crypto').createHash('sha256').update(s).digest('hex');
const maps=require('../js/world/map-registry.js');
const {install}=require('../js/world/legacy-map-adapter.js');
const make=(g,id)=>g.create({id,type:maps.parseId(id).type});
test('canonical stable identities, large ordinals and escaped interior anchors',()=>{
 const big='9'.repeat(100);assert.equal(maps.mainId(big),'main:'+big);
 const ids=[maps.mainId(1),maps.sideId('main:1','left',1),maps.sideId('main:1','right',1),maps.interiorId('main:1','Tür:50%')];
 assert.equal(new Set(ids).size,4);assert.equal(maps.parseId(ids[3]).anchor,'Tür:50%');
 for(const bad of [0,-1,'01',Number.MAX_SAFE_INTEGER+1])assert.throws(()=>maps.mainId(bad));
 assert.throws(()=>maps.sideId('main:1','left',4));
 assert.equal(maps.seedFor(42,ids[3]),maps.seedFor(42,ids[3]));
 assert.notEqual(maps.seedFor(43,ids[3]),maps.seedFor(42,ids[3]));
});
test('reciprocal connections, atomic conflicts, disconnect and no implicit generation',()=>{
 const g=maps.open();for(let i=1;i<=3;i++)make(g,maps.mainId(i));
 assert.equal(g.resolve('main:1','right'),null);assert.equal(g.size(),3);
 assert.equal(g.connect('main:1','right','main:2'),true);
 assert.deepEqual(g.resolve('main:2','left'),{mapId:'main:1',entry:'right'});
 assert.equal(g.connect('main:1','right','main:2'),false);
 const before=g.snapshot();assert.throws(()=>g.connect('main:3','right','main:2'));assert.deepEqual(g.snapshot(),before);
 assert.throws(()=>g.connect('main:1','north','main:3','left'));
 assert.throws(()=>g.connect('main:1','next','main:1'));
 assert.throws(()=>g.connect('main:1','next','main:4'));
 assert.equal(g.disconnect('main:2','left'),true);assert.equal(g.resolve('main:1','right'),null);
});
test('JSON round trip retains templates, state, seeds and interior return link',()=>{
 const g=maps.open();make(g,'main:1');const id=maps.interiorId('main:1','house:4:5');
 g.create({id,type:'interior',templateId:'house-v1',state:{chest:{opened:true}}});g.connect('main:1',maps.entryPort('house:4:5'),id,'exit');
 const restored=maps.open(JSON.parse(JSON.stringify(g.snapshot())));
 assert.deepEqual(restored.snapshot(),g.snapshot());assert.equal(restored.get(id).templateId,'house-v1');
 const copy=restored.getState(id);copy.chest.opened=false;assert.equal(restored.getState(id).chest.opened,true);
 restored.patchState(id,{door:true});assert.equal(restored.getState(id).chest.opened,true);
 assert.equal(restored.resolve(id,'exit').mapId,'main:1');
});
test('invalid state and corrupted/future registries do not mutate input',()=>{
 const g=maps.open();make(g,'main:1');const cycle={};cycle.self=cycle;
 for(const state of [cycle,{n:NaN},{f(){}},JSON.parse('{"__proto__":{}}')])assert.throws(()=>g.patchState('main:1',state));
 const bad=g.snapshot();bad.maps['main:1'].links.right={mapId:'main:2',entry:'left'};
 const before=JSON.stringify(bad);assert.throws(()=>maps.open(bad));assert.equal(JSON.stringify(bad),before);
 assert.throws(()=>maps.open({version:999}));
 const asymmetric=maps.open();make(asymmetric,'main:1');make(asymmetric,'main:2');const raw=asymmetric.snapshot();raw.maps['main:1'].links.next={mapId:'main:2',entry:'previous'};assert.throws(()=>maps.open(raw));
});
function fixture(initial={zone:1,adventureChests102:{old:true},inventory:{potions:7}}){
 let world=initial,listener,writes=0;const queued=[];const child={VaelkorAdventure102:{snapshot:()=>({level:world.zone})}};
 const api=install({getWorld:()=>world,persist:()=>{writes++;return false},getFrame:()=>({contentWindow:child}),listen:h=>listener=h,queue:f=>queued.push(f)});
 return {api,initial,child,queued,get writes(){return writes},setWorld:w=>world=w,ready:level=>listener({source:child,data:{vkWorld:'ready',level}}),send:e=>listener(e),flush(){while(queued.length)queued.shift()()}};
}
test('legacy saves remain intact, only visited metadata is registered and writes coalesce',()=>{
 const f=fixture();assert.equal(f.api.snapshot().maps['main:1'].seed,1042);assert.equal(Object.keys(f.api.snapshot().maps).length,1);
 assert.equal(f.initial.inventory.potions,7);assert.equal(f.api.isLegacyChestOpened('old'),true);f.flush();assert.equal(f.writes,1);
 for(let i=0;i<1000;i++)f.send({source:f.child,data:{vkWorld:'position',level:2}});
 f.send({source:{},data:{vkWorld:'ready',level:2}});f.ready(2);f.flush();assert.equal(f.writes,1);
 f.initial.zone=2;f.ready(2);f.ready(2);f.flush();assert.equal(f.writes,2);
 assert.equal(f.api.resolve('main:2','previous').mapId,'main:1');assert.equal(f.initial.zone,2);
 f.api.patchState('main:2',{visited:true});f.flush();
 const save=JSON.parse(JSON.stringify({version:2,world:f.initial,fusion:{sentinel:9}}));
 const loaded=fixture(save.world);assert.equal(loaded.api.getState('main:2').visited,true);assert.equal(save.fusion.sentinel,9);assert.equal(loaded.api.isLegacyChestOpened('old'),true);
});
test('explicit interior registration and new game ownership do not switch gameplay',()=>{
 const f=fixture();const id=f.api.ensureInterior(1,'house','house:4:5','house-v1');
 assert.equal(f.api.ensureInterior(1,'house','house:4:5','house-v1'),id);assert.equal(f.api.resolve(id,'exit').mapId,'main:1');assert.equal(f.initial.zone,1);
 f.setWorld({zone:7});f.api.captureLegacy();assert.equal(Object.keys(f.api.snapshot().maps).length,1);assert.equal(f.api.currentMainId(),'main:7');
});
test('browser bootstrap preserves unreadable registry and never prevents existing game startup',()=>{
 const context=vm.createContext({console:{warn(){}},queueMicrotask(){},document:{getElementById:()=>null},addEventListener(){}});
 vm.runInContext('let data={zone:1,mapRegistry:{version:999,custom:"keep"}};function vkPersistUnified(){}',context);
 vm.runInContext(fs.readFileSync('js/world/map-registry.js','utf8'),context);
 vm.runInContext(fs.readFileSync('js/world/legacy-map-adapter.js','utf8'),context);
 assert.equal(context.VaelkorWorldMaps.available,false);assert.equal(vm.runInContext('data.mapRegistry.custom',context),'keep');
});
test('HTML retains foundation tags; unchanged legacy scripts remain byte identical and all parse',()=>{
 const suffix='\n<script src="js/world/map-registry.js"></script>\n<script src="js/world/legacy-map-adapter.js"></script>\n\n<script src="js/world/transition-templates.js"></script>\n<script src="js/world/wildlands.js"></script>\n';
 const index=fs.readFileSync('index.html','utf8').replace('<script src="js/combat/synchro-limit.js?syn=1"></script>\n','').replace(require('../js/interface/card-assets.js').filters+'\n','').replace('<script src="js/interface/language-catalog.js?locale=3"></script>','').replace('<script src="js/combat/element-balance.js?balance=2"></script>\n','').replace('<script src="js/combat/balance-catalog.js?balance=2"></script>\n','').replace('\n<link rel="stylesheet" href="css/style-59.css?layout=3">\n','').replace('\n<link rel="stylesheet" href="css/style-60.css?modular=10">\n','').replace('<script src="js/interface/card-assets.js?modular=10"></script>\n','').replace(/\?(?:wildlands=1|outdoor=3|trails=1|update=1|controls=1|battlefit=1|deckmobile=1|quality=1|cards=1|ap=1|layout=[234]|modular=(?:[89]|10)|syn=1|growth=[34]|locale=[123]|balance=[23])/g,'').replace('\n<link rel="stylesheet" href="css/style-52.css">\n<script src="js/interface/update-ui.js"></script>\n','');const clean=index.replace('<link rel="stylesheet" href="css/style-53.css">\n<script src="js/interface/fullscreen.js"></script>\n','');const original=clean.replace('<link rel="stylesheet" href="css/style-54.css">\n<script src="js/interface/battle-fit.js"></script>\n','');const previous=original.replace('<link rel="stylesheet" href="css/style-55.css">\n','');const base=previous.replace('<link rel="stylesheet" href="css/style-56.css">\n<script src="js/interface/quality-pass.js"></script>\n','');const old=base.replace('<link rel="stylesheet" href="css/style-57.css">\n<script src="js/interface/portrait-loader.js"></script>\n<script src="js/interface/card-design.js"></script>\n','');const legacy=old.replace('<script src="js/combat/stat-rules.js"></script>\n<script src="js/combat/stats-integration.js"></script>\n<link rel="stylesheet" href="css/style-58.css">\n','');assert.ok(legacy.endsWith(suffix));assert.equal(sha(legacy.slice(0,-suffix.length)),baseline.indexHash);
 for(const file of fs.readdirSync('js').filter(n=>/^script-\d+\.js$/.test(n)))new vm.Script(fs.readFileSync('js/'+file,'utf8'),{filename:file});
 for(const file of fs.readdirSync('js').filter(n=>/^script-\d+\.js$/.test(n)&&n!=='script-09.js')){let text=fs.readFileSync('js/'+file,'utf8').replace("mapId:'main:'+data.zone,",'');const hooks=require('./fixtures/ap-legacy-hooks.json')['js/'+file]||[];for(const hook of hooks){assert.ok(text.includes(hook.new),'AP integration hook '+file);text=hook.all?text.split(hook.new).join(hook.old):text.replace(hook.new,()=>hook.old);}assert.equal(sha(text),baseline.scriptHashes[file]);}
});
