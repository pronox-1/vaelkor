// BEGIN VAELKOR QUEST WORLD v146
const vkQuestArt146=window.parent.VaelkorQuestItems146,vkQuestSprites146=new Map();let vkQuestSheetImage146=null;
function vkQuestSheet146(){if(!vkQuestArt146)return null;if(!vkQuestSheetImage146){const image=new Image();image.decoding='async';image.fetchPriority='high';image.onload=()=>{vkQuestSprites146.clear();invalidateScene();requestWorldDraw96();};image.src=vkQuestArt146.image;vkQuestSheetImage146=image;}return vkQuestSheetImage146;}
function vkQuestSprite146(id){if(vkQuestSprites146.has(id))return vkQuestSprites146.get(id);const record=vkQuestArt146?.byId[id],image=vkQuestSheet146();if(!record||!image?.complete||!image.naturalWidth)return null;const cv=document.createElement('canvas');cv.width=record.rect[2];cv.height=record.rect[3];cv.getContext('2d').drawImage(image,...record.rect,0,0,cv.width,cv.height);cv.complete=true;cv.naturalWidth=cv.width;cv.naturalHeight=cv.height;vkQuestSprites146.set(id,cv);return cv;}
Object.defineProperty(vkNewAtlasImages,'lostMoonshine134',{configurable:true,get:()=>vkQuestSprite146('moonshine')});
function vkQuestRect146(x,y){return{l:(x-1.1)*T,r:(x+1.1)*T,t:(y-3.3)*T,b:(y+.5)*T};}
function vkQuestObstacle146(o){return o.block||['tree','pine','bush','rock','vkDecor','biomeDecor'].includes(o.type);}
function vkQuestBlockers146(x,y,own){const rect=vkQuestRect146(x,y);return objects.filter(o=>o!==own&&(!own?.resourceId146||o.resourceId146!==own.resourceId146)&&vkQuestObstacle146(o)&&vkOverlap96(rect,vkBounds96(o)));}
function vkQuestPosition146(x,y,own,allowPath=true){if(x<2||x>W-2||y<4||y>H-3||!pass(x,y)||![types.GRASS,...(allowPath?[types.PATH]:[])].includes(cell(Math.floor(x),Math.floor(y))))return false;
 if(Object.values(vkWildExits).some(q=>Math.hypot(q.x-x,q.y-y)<2.5)||guardian?.present&&!guardian.defeated&&Math.hypot(guardian.x-x,guardian.y-y)<3)return false;
 if([...townBuildings,...wildBuildings102].some(b=>x>b.x-1.3&&x<b.x+b.w+1.3&&y>b.y-1.3&&y<b.y+b.h+1.3))return false;
 if(townMode&&townProps.some(o=>Math.hypot(o.x-x,o.y-y)<2))return false;
 return vkQuestBlockers146(x,y,own).length===0;
}
function vkQuestCanClear146(o){return!o.playerPlaced&&!o.poi&&!o.chest102&&!o.wildHouse102&&!o.transitionPort&&!o.questItem146&&!vkResource134(o)&&(['tree','pine','flower'].includes(o.type)||o.type==='biomeDecor'&&/tree|pine|oak|grass|flower|fern/.test(o.asset||''));}
function vkEnsureQuestVisibility146(plan){if(!plan||!vkQuestArt146)return false;const quest=window.parent.VaelkorNPC134?.quest('joe')||window.parent.VaelkorNPCState134?.()?.quests?.joe;
 if(quest?.stage==='active')vkQuestSheet146();
 if(!quest||quest.stage!=='active'||quest.targetMapId!==plan.id){if(objects.some(o=>o.moonshine134)){objects=objects.filter(o=>!o.moonshine134);invalidateScene();}return false;}
 vkQuestSheet146();let item=objects.find(o=>o.moonshine134);if(item){if(objects.some(o=>o!==item&&o.moonshine134)){objects=objects.filter(o=>!o.moonshine134||o===item);invalidateScene();}item.resourceId146=item.resourceId146||vkResource134(item).id;item.questItem146='moonshine';item.asset='lostMoonshine134';item.w=vkQuestArt146.size('moonshine','outdoor').width/T;item.block=false;if(vkQuestPosition146(item.x,item.y,item))return true;}
 const reachable=vkWildReach(p),choices=[...reachable].map(k=>({x:k%W+.5,y:Math.floor(k/W)+.5})).filter(q=>q.x>2&&q.x<W-2&&q.y>4&&q.y<H-3&&Math.hypot(p.x-q.x,p.y-q.y)>2);
 const nearRoad=q=>{let d=5;for(let yy=-3;yy<=3;yy++)for(let xx=-3;xx<=3;xx++)if(roadAt(Math.floor(q.x)+xx,Math.floor(q.y)+yy))d=Math.min(d,Math.abs(xx)+Math.abs(yy));return d;};
 for(const choice of choices){choice.roadScore146=nearRoad(choice);choice.randomScore146=hash(choice.x,choice.y,146);}choices.sort((a,b)=>a.roadScore146-b.roadScore146||a.randomScore146-b.randomScore146);let spot=choices.find(q=>cell(Math.floor(q.x),Math.floor(q.y))===types.GRASS&&vkQuestPosition146(q.x,q.y,item));
 if(!spot)spot=choices.find(q=>vkQuestPosition146(q.x,q.y,item));
 if(!spot)for(const q of choices){if(![types.GRASS,types.PATH].includes(cell(Math.floor(q.x),Math.floor(q.y))))continue;const blockers=vkQuestBlockers146(q.x,q.y,item);if(blockers.length>4||!blockers.every(vkQuestCanClear146))continue;const keep=objects;objects=objects.filter(o=>!blockers.includes(o));vkWildReachCache=null;invalidateScene();if(vkQuestPosition146(q.x,q.y,item)){spot=q;break;}objects=keep;}
 if(!spot)return false;
 if(!item){item={type:'vkDecor',asset:'lostMoonshine134',w:vkQuestArt146.size('moonshine','outdoor').width/T,block:false,moonshine134:true,questItem146:'moonshine',resourceId146:plan.id+'|lostMoonshine|joe|'+(quest.startedAt??quest.round??1)};objects.push(item);}item.x=spot.x;item.y=spot.y;item.questPlacement146=1;objects=objects.filter(o=>!o.moonshine134||o===item);vkWildReachCache=null;invalidateScene();return true;
}
const vkQuestQualityBefore146=vkWorldQuality130;vkWorldQuality130=function(plan){const result=vkQuestQualityBefore146(plan);vkEnsureQuestVisibility146(plan);return result;};
function vkDrawQuestItem146(id,x,y,view=interior?'indoor':'outdoor'){const record=vkQuestArt146?.byId[id],image=vkQuestSheet146();if(!record||!image?.complete||!image.naturalWidth||!record.views[view]?.width)return false;const width=record.views[view].width,height=width*record.rect[3]/record.rect[2];ctx.save();ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(image,...record.rect,x*T-width/2,y*T-height,width,height);ctx.restore();return true;}
let vkQuestLayer146=false;const vkQuestDecorBefore146=vkNewDecor;vkNewDecor=function(o){if(!o.questItem146&&!o.moonshine134)return vkQuestDecorBefore146(o);if(vkQuestLayer146)return vkDrawQuestItem146(o.questItem146||'moonshine',o.x,o.y);};
// Quest art is painted last as a second safeguard against late-loading canopies.
const vkQuestDrawBefore146=draw;draw=function(){vkQuestDrawBefore146();if(!interior){vkQuestLayer146=true;try{for(const o of objects)if(o.moonshine134)vkNewDecor(o);}finally{vkQuestLayer146=false;}}};
window.VaelkorQuestWorld146={canPlaceOutdoor:vkQuestPosition146,canPlace:vkQuestPosition146,draw:vkDrawQuestItem146,ensure:()=>vkEnsureQuestVisibility146(vkWildSpec),visible:o=>vkQuestPosition146(o.x,o.y,o),rect:vkQuestRect146,sprite:vkQuestSprite146,viewSize:(id,view)=>vkQuestArt146?.size(id,view)};
// END VAELKOR QUEST WORLD v146
