const{test}=require('node:test'),assert=require('node:assert/strict');const library=require('../js/world/transition-templates.js');
test('paired transition appearance is symmetric and ordinary routes never choose magic portals',()=>{
 const seen=new Set();for(let n=1;n<=1500;n++){const options={mapId:'main:'+n,targetId:'main:'+(n+1),biome:'forest',targetBiome:'forest',axis:'vertical'};const a=library.choose(options),b=library.choose({...options,mapId:options.targetId,targetId:options.mapId});assert.deepEqual(a,b);assert.ok(['plain','sign','rocks','arch'].includes(a.variant));seen.add(a.variant);}assert.equal(seen.size,4);
 for(let n=1;n<100;n++)assert.notEqual(library.choose({mapId:'main:'+n,targetId:'side:'+n+':left:1',axis:'horizontal'}).variant,'arch');
});
test('biome palettes and straight, bend, T and cross masks are explicit',()=>{
 assert.equal(library.junction(5),'straight');assert.equal(library.junction(10),'straight');assert.equal(library.junction(3),'corner');assert.equal(library.junction(7),'t');assert.equal(library.junction(15),'cross');
 const colors=new Set();for(const b of ['forest','desert','jungle','snow','volcano','swamp','mushroom']){const p=library.palette(b);assert.match(p.mid,/^#[0-9a-f]{6}$/);colors.add(p.mid);}assert.equal(colors.size,7);
});
test('signs describe destinations without painting labels on their images',()=>{
 assert.equal(library.message({targetId:'main:1'}),'Zurück nach Grünwald');assert.match(library.message({targetTown:true,targetLabel:'Sonnenmarkt'}),/nächsten Dorf/);assert.equal(library.message({returning:true}),'Zurück zum Hauptpfad');assert.match(library.message({biome:'volcano'}),/Gebirgspass/);
});
test('new arch asset exists and its runtime crop has safe dimensions',()=>{const fs=require('node:fs');const bytes=fs.readFileSync('assets/images/trail-wooden-arch.png');assert.equal(bytes.subarray(1,4).toString(),'PNG');const width=bytes.readUInt32BE(16),height=bytes.readUInt32BE(20),[x,y,w,h]=library.arch.rect;assert.ok(w>0&&h>0&&x>=0&&y>=0&&x+w<=width&&y+h<=height);assert.equal(bytes[25],6,'RGBA PNG');});
