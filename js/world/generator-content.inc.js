// BEGIN VAELKOR GENERATOR CONTENT v133
const vkGeneratorCatalog133=window.parent.VaelkorGeneratorCatalog133;
if(vkGeneratorCatalog133)for(const [id,a]of Object.entries(vkGeneratorCatalog133.assets)){
 VK_INTERIOR_LIBRARY91.assets[id]={...a,anchor:'bottom-center'};VK_INTERIOR_LIBRARY91.keys[id]=id;
 if(a.view==='outdoor')Object.defineProperty(vkNewAtlasImages,id,{configurable:true,get:()=>vkRoomImage91(id)});
}
const vkRoomBefore133=vkGenerateInterior91;
vkGenerateInterior91=function(kind,roomSeed){const plan=vkRoomBefore133(kind,roomSeed);if(!vkGeneratorCatalog133||!plan?.items||plan.generator133)return plan;
 const floorIds=new Set(['house.floor','shop.floor','armory.floor'].map(k=>VK_INTERIOR_LIBRARY91.keys[k]));
 const candidates=Object.values(vkGeneratorCatalog133.assets).filter(a=>a.view==='indoor'&&a.contexts.includes(kind)),slots=[12,15,18,21,24,27].flatMap(y=>[3.4,6.3,9.3,20.5,23.8].map(x=>[x,y]));let count=0;
 for(let n=0;n<slots.length&&count<2;n++){if(!candidates.length)break;const a=candidates[((roomSeed>>>0)+n)%candidates.length],[x,y]=slots[n],w=2.1,h=w*a.size[1]/a.size[0];
  if(plan.items.some(o=>!o.roomFloor&&!floorIds.has(o.id)&&!/floor|rug|medallion|stairs|steps/.test(o.id)&&(o.solid||o.w<8)&&x<o.x+o.w+.25&&x+w+.25>o.x&&y<o.y+o.h+.25&&y+h+.25>o.y))continue;
  plan.items.push({id:a.id,x,y,w,h,solid:true,generator133:true});plan.blockers.push({x:x+.12,y:y+h*.6,w:w-.24,h:h*.4});count++;
 }plan.generator133=true;return plan;};
if(window.VaelkorInteriors91)Object.assign(window.VaelkorInteriors91,{generate:vkGenerateInterior91,assetCount:Object.keys(VK_INTERIOR_LIBRARY91.assets).length,generatorCatalog:vkGeneratorCatalog133});
function vkGeneratorDecor133(plan){if(!vkGeneratorCatalog133||objects.some(o=>o.generator133))return;
 const biome=vkWorldBiome().key,property=plan.type==='property',context=townMode?'town':biome;
 const assets=Object.values(vkGeneratorCatalog133.assets).filter(a=>a.view==='outdoor'&&a.kind==='prop'&&a.id!=='gen133-town-stone-wall'&&a.id!=='gen133-town-palisade'&&(a.contexts.includes(context)||property&&(a.contexts.includes('property')||a.contexts.includes('forest'))));
 if(!assets.length)return;const choices=[];for(let y=4;y<H-3;y++)for(let x=2;x<W-2;x++)if(vkQualitySpot130(x+.5,y+.5,1.25))choices.push({x:x+.5,y:y+.5,score:hash(x,y,1339)});choices.sort((a,b)=>a.score-b.score);
 let n=0;for(const q of choices){if(n>=(property?10:townMode?5:6))break;if(!vkQualitySpot130(q.x,q.y,1.25)||objects.some(o=>o.wallRun130&&Math.abs(o.x-q.x)<o.w/2+1.2&&Math.abs(o.y-q.y)<1.5))continue;const a=assets[Math.floor(hash(n,seed,1337)*assets.length)],w=/cart|arch|stall|fallen-log/.test(a.id)?2:1.3;
  objects.push({type:'vkDecor',asset:a.id,x:q.x,y:q.y,w,block:true,generator133:true,transitionFootprint:{rx:w*.32,ry:.18,cy:q.y-.1}});n++;
 }vkWildReachCache=null;
}
// END VAELKOR GENERATOR CONTENT v133
