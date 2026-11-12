const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');
const baseline=require('./fixtures/baseline-v104.json');const sha=s=>require('node:crypto').createHash('sha256').update(s).digest('hex');
const source=fs.readFileSync('js/script-09.js','utf8'),html=JSON.parse(source.match(/frame\.srcdoc=("(?:\\.|[^"\\])*")/)[1]);
const actorData=JSON.parse(html.slice(html.indexOf('const HERO_ACTORS87=')+'const HERO_ACTORS87='.length,html.indexOf(',VK_ENEMIES87=')));
function animation(){
 const actors=JSON.parse(JSON.stringify(actorData));
 for(const actor of Object.values(actors))for(const frames of [...Object.values(actor.indoor),...Object.values(actor.walk)])for(let i=0;i<frames.length;i++)if(Number.isInteger(frames[i].frameRef96))frames[i]=frames[frames[i].frameRef96];
 const cache={};function images(style){return cache[style]??=(function(){const prepare=set=>Object.fromEntries(Object.entries(set).map(([direction,frames])=>[direction,frames.map(f=>({...f,im:{complete:true,naturalWidth:f.size[0],naturalHeight:f.size[1]}}))]));return{indoor:prepare(actors[style].indoor),walk:prepare(actors[style].walk),get idle(){throw Error('Selection portraits must not be used for movement');}};})();}
 const start=html.indexOf('const HERO_FRAME_MS92='),end=html.indexOf('function player(){',start);
 const c=vm.createContext({interior:null,heroStyle:'adventurer',animFrom:{},HERO_ACTORS87:actors,heroFacing:'right',actorImages87:images});vm.runInContext(html.slice(start,end)+'\nglobalThis.advance=vkAdvanceHero92;globalThis.state=heroAnimation92;globalThis.pick=vkHeroFrame87;',c);
 return c;
}
test('exterior copies the proven 90-ms indoor gait without resetting at tile boundaries',()=>{const c=animation(),sequence=[];c.advance(0,false);for(let i=0;i<5;i++){sequence.push(c.pick().index);c.advance(90,true);}assert.deepEqual(sequence,[0,1,2,3,0]);c.animFrom={};c.advance(45,true);assert.equal(c.state.phase,1.5);});
test('stopping finishes the nearest contact pose and rests on an neutral frame from the original small set',()=>{const c=animation();c.advance(90,true);c.advance(45,true);c.animFrom=null;c.advance(45,true);assert.equal(c.pick().index,2);const image=c.pick().frame.image;c.advance(500,false);assert.equal(c.pick().frame.image,image);assert.equal(c.pick().frame.image,c.HERO_ACTORS87.adventurer.walk.right[0].image);assert.equal(c.pick().pose,'stand');});
test('direction changes retain cadence and skin/context changes reset cleanly',()=>{const c=animation();c.advance(120,true);const phase=c.state.phase;c.heroFacing='left';c.advance(15,true);assert.equal(c.state.phase,phase+15/90);c.heroStyle='chef';c.advance(0,true);assert.equal(c.pick().index,0);c.interior={};c.advance(0,true);assert.equal(c.pick().index,0);});
test('all 12 exterior skins use only the small template with stand-left-stand-right order',()=>{
 const c=animation();assert.equal(Object.keys(actorData).length,12);
 for(const style of Object.keys(actorData))for(const direction of ['up','down','left','right']){
  c.heroStyle=style;c.heroFacing=direction;c.advance(0,true);const expected=actorData[style].walk[direction],scale=expected[0].renderHeight;
  for(let index=0;index<4;index++){c.state.phase=index;const result=c.pick(),slot=[0,1,0,3][index],original=Number.isInteger(expected[slot].frameRef96)?expected[expected[slot].frameRef96]:expected[slot];assert.equal(result.frame.image,original.image);assert.equal(result.referenceHeight,scale);assert.notEqual(result.frame.image,actorData[style].indoor[direction][0].image);assert.equal(result.height,34);}
 }
});
test('indoor timing and selection are identical to the previously accepted version',()=>{
 const tail=html.match(/function vkAdvanceHero92[\s\S]*?(if\(wasMoving\|\|animFrom\)[\s\S]*?)\nfunction vkHeroFrame87/)[1];assert.equal(tail,baseline.indoorAdvanceTail);
 const current=animation(),previous=animation();current.interior={};previous.interior={};vm.runInContext(baseline.heroFrameFunction+'\nglobalThis.pick=vkHeroFrame87;',previous);
 for(const style of Object.keys(actorData))for(const direction of ['up','down','left','right'])for(const moving of [true,false])for(const phase of [0,.5,1,1.5,2,2.5,3,3.5]){
  for(const c of [current,previous]){c.heroStyle=style;c.heroFacing=direction;c.animFrom=moving?{}:null;c.advance(0,moving);c.state.phase=phase;}
  const a=current.pick(),b=previous.pick();assert.equal(a.frame.image,b.frame.image);assert.equal(a.index,b.index);assert.equal(a.height,b.height);assert.equal(a.height,60);assert.equal(a.height/(a.referenceHeight||a.frame.renderHeight||a.actor.walkHeight),b.height/(b.frame.renderHeight||b.actor.walkHeight));
 }
});
test('loading fallback stays within the same stand/step family',()=>{const c=animation();c.advance(90,true);const images=c.actorImages87('adventurer');images.walk.right[1].im.complete=false;assert.equal(c.pick().frame.image,images.walk.right[0].image);});
test('all character artwork and the explicit exterior render key remain intact',()=>{
 const actors=html.slice(html.indexOf('const HERO_ACTORS87='),html.indexOf('const VK_ENEMY_POOLS87='));assert.equal(sha(actors),baseline.actorHash);
 const normalize=h=>h.replace(/function vkAdvanceHero92[\s\S]*?(?=function player\(\))/,'ANIMATION').replace('state.height/(state.referenceHeight||frame.renderHeight||actor.walkHeight)','state.height/(frame.renderHeight||actor.walkHeight)').replace('const poseKey99=interior||animFrom?Math.floor(heroAnimation92.phase+1e-7)%4:0;','const poseKey99=Math.floor(heroAnimation92.phase+1e-7)%4;');assert.ok(normalize(html).includes('function vkWildGuardBlocks(nx,ny)'));
 assert.ok(html.includes('const poseKey99=Math.floor(heroAnimation92.phase+1e-7)%4;'),'final standing contact triggers a redraw');
});
test('outer script and every embedded script parse; maintained Wildlands bridge matches',()=>{
 new vm.Script(source);let count=0;for(const m of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)){new vm.Script(m[1]);count++;}assert.ok(count>0);
 assert.equal(html.match(/\/\/ BEGIN VAELKOR WILDLANDS SCENE BRIDGE v1[\s\S]*?\/\/ END VAELKOR WILDLANDS SCENE BRIDGE v1/)[0],fs.readFileSync('js/world/embedded-wildlands.inc.js','utf8').trim());
});

test('slow exterior frames cannot skip both leg poses and show only neutral contact frames',()=>{const c=animation(),seen=new Set();for(let i=0;i<12;i++){c.advance(180,true);seen.add(c.pick().index);}assert.deepEqual([...seen].sort(),[0,1,2,3]);});
