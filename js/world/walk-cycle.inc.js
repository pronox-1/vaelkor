// BEGIN VAELKOR WALK CYCLE v165
// Simulation writes the mannequin once before the depth queue. Painting only reads it.
const vkPlayerSide166=window.parent.VaelkorPlayerSide166;
for(const [id,poses]of Object.entries(vkPlayerSide166.profiles)){if(HERO_ACTORS87[id]){HERO_ACTORS87[id].walk.left=poses.left;HERO_ACTORS87[id].walk.right=poses.right;heroImages87.delete(id);}}
Object.assign(vkArt127.sets,window.parent.VaelkorMountVertical169.sheets);
const vkHumanWalk168=window.parent.VaelkorHumanWalk168;
Object.assign(vkArt127.sets,vkHumanWalk168.sheets);
for(const[id,dirs]of Object.entries(vkHumanWalk168.players)){if(HERO_ACTORS87[id]){Object.assign(HERO_ACTORS87[id].walk,dirs);heroImages87.delete(id);}}
Object.assign(vkArt127.sets,window.parent.VaelkorMountWalkArt165.sheets);
const vkMotionCore164=window.parent.VaelkorMotion164,vkSkinBindings164=window.parent.VaelkorMotionSkins164.create({characters:vkCharacterCatalog149,mounts:vkMountArt150,legacy:vkRig128,joe:vkBreedArt134.joe,mountRig:vkRig152});
const vkMotion164=vkMotionCore164.create(),vkPreviewMotion164=vkMotionCore164.create();let vkMotionDrawing164=false,vkMotionScene164='';
function vkWalkCycle163(key,distance,moving,stride=1,kind='human'){return vkPreviewMotion164.advanceDistance(key,distance,moving,stride,kind);}
function vkWalkContext163(){return vkWildCurrentId+':'+(interior?.kind||'outdoor')+':'+(interior?.name||'');}
const vkNPCSpace175=window.parent.VaelkorNPCSpace175?.create();let vkNPCSpaceSource175=null,vkNPCSpaceStamp175=-1,vkNPCSpaceKey175='',vkNPCSpaceResult175=null;
const vkNPCSpaceBefore175=vkNPCs127;vkNPCs127=function(){const rows=vkNPCSpaceBefore175();if(!vkNPCSpace175)return rows;const key=vkWalkContext163()+':'+seed,now=vkTime127();if(rows===vkNPCSpaceSource175&&now===vkNPCSpaceStamp175&&key===vkNPCSpaceKey175)return vkNPCSpaceResult175;const humans=rows.filter(n=>!vkMountArt150.profiles[n.appearance]?.mount),resolved=vkNPCSpace175.sample(humans,{key,now,pass:(x,y)=>pass(x,y),gap:interior?1.85*vkFigureScale151():1.25,speed:interior?1.7:2.4}),byId=new Map(resolved.map(n=>[n.id,n]));vkNPCSpaceSource175=rows;vkNPCSpaceStamp175=now;vkNPCSpaceKey175=key;return vkNPCSpaceResult175=rows.map(n=>byId.get(n.id)||n);};
function vkPrepareMotion164(npcs){const context=vkWalkContext163(),stamp=performance.now();vkMotionScene164=context;
 vkMotion164.advance({id:'player',x:p.x,y:p.y,moving:!!animFrom,facing:heroFacing,view:interior?'indoor':'outdoor',stamp,context});
 const mount=vkMountState150();if(mount?.riding&&mount.active)vkMotion164.advance({id:'ridden:'+mount.active,appearance:mount.active,cadence:vkMotionCore164.cadenceFor(mount.active),x:p.x,y:p.y,moving:!!animFrom,facing:heroFacing,kind:'quadruped',retainMotion:true,timeMs:stamp,view:interior?'indoor':'outdoor',stamp,context});
 for(const n of npcs)if(Number.isFinite(n.x+n.y)){const skin=vkHumanWalk168.profiles[n.appearance||n.id]?.[n.inside?'indoor':'outdoor'];if(skin)vkImage127(skin.set);vkMotion164.advance({id:n.id,appearance:n.appearance||n.id,quadrupedStride:n.stallDisplay&&n.inside ? 0.8 : undefined,cadence:vkMotionCore164.cadenceFor(n.appearance),x:n.x,y:n.y,retainMotion:true,timeMs:stamp,moving:!!n.moving,facing:n.facing,kind:vkMountArt150.profiles[n.appearance]?.mount?'quadruped':'human',view:n.inside?'indoor':'outdoor',stamp,context});}
}
const vkDepthBefore164=vkDepthDraw157;vkDepthDraw157=function(base,npcs){vkPrepareMotion164(npcs);const old=vkMotionDrawing164;vkMotionDrawing164=true;try{return vkDepthBefore164(base,npcs);}finally{vkMotionDrawing164=old;}};
vkWalkingFrame160=function(live=false){const indoor=!!interior,actor=HERO_ACTORS87[heroStyle],moving=!!animFrom,distance=walkDistance+(moving?Math.min(1,Math.max(0,animElapsed/vkStepDuration95())):0);
 const cycle=live&&vkMotionDrawing164?vkMotion164.read('player'):vkWalkCycle163('player:'+vkWalkContext163()+':'+heroStyle,distance,moving,vkMotionCore164.strideFor('human',indoor?'indoor':'outdoor')),index=cycle?.index||0,frames=actorImages87(heroStyle)[indoor?'indoor':'walk'][live&&vkMotionDrawing164&&cycle?.facing?cycle.facing:heroFacing];let selected=frames[index];if(!selected.im.complete||!selected.im.naturalWidth)selected=frames[0];
 return{actor,moving,index,cyclePhase:cycle?.phase||0,frame:selected,indoor,poseSet:indoor?'indoor':'outdoor',pose:cycle?.stand===false?'walk':'stand',referenceHeight:frames[0].renderHeight||frames[0].bounds[3]-frames[0].bounds[1],height:indoor?60:34};};
window.VaelkorWalking160.frame=vkWalkingFrame160;window.VaelkorWalking160.strideTiles=2;
vkNPCSpec127=function(npc){const id=npc.appearance||npc.id,facing=npc.facing||'down',key=!npc.id||npc.id==='ridden'?'ridden:'+id:npc.id;
 const neutral=!npc.id&&!npc.moving&&!!animFrom,live=vkMotionDrawing164&&vkMotionScene164===vkWalkContext163(),cycle=neutral?vkMotionCore164.at(0,false):live?(vkMotion164.read(key)||vkMotionCore164.at(0,false)):vkWalkCycle163('npc:'+vkWalkContext163()+':'+!!npc.inside+':'+key+':'+id,npc.gaitDistance,!!npc.moving,1,vkMountArt150.profiles[id]?.mount?'quadruped':'human');
 const skinFacing=live&&cycle.facing?cycle.facing:facing,b=vkSkinBindings164.npc(id,!!npc.inside,skinFacing,cycle.slot),height=b.kind==='quadruped'?((npc.inside?70*vkFigureScale151():41)*(b.displayScale170||1)):npc.inside?60:34,frame=b.slot==='stand'?(b.rig||id==='luca'||id==='erik'||vkCharacterCatalog149.profiles[id]&&npc.inside?'idle':b.sourceIndex):id==='joe'?b.sourceIndex:vkRig128[npc.inside?'indoor':'outdoor'][id]?b.sourceIndex:cycle.phase;
 return{set:b.set,rect:b.rect,bounds:b.bounds,anchor:b.anchor,foot:b.foot,referenceHeight:b.referenceHeight,height:b.kind==='human'&&npc.inside&&interior?.kind==='nursery'?height*vkFigureScale151():(id==='luca'||id==='erik')&&npc.inside?height*vkFigureScale151():height,frame,puppet:b.staticOnly,cyclePhase163:cycle.phase,stand163:cycle.stand,skinSlot164:b.slot,saddle156:b.saddle,authored165:b.authored165,authored168:b.authored168,authored169:b.authored169,contacts165:cycle.contacts,mannequin152:{referenceRect:b.rect,split:b.kind==='quadruped'?.64:.60,mirror:b.mirror,phaseMirror:b.phaseMirror,delta154:b.delta,rig:b.rig},key:'skin164:'+id+':'+!!npc.inside+':'+skinFacing+':'+b.slot};
};
window.VaelkorLife127.frameSpec=vkNPCSpec127;
window.VaelkorWalkCycle163={sample:vkWalkCycle163,reset:()=>vkPreviewMotion164.reset(),tracks:()=>vkPreviewMotion164.size()};
window.VaelkorMotion164={read:id=>vkMotion164.read(id),tracks:()=>vkMotion164.size(),bindings:vkSkinBindings164,prepare:vkPrepareMotion164};
const vkWarmHumanBefore168=vkWarmInterior129;vkWarmInterior129=function(kind){for(const id of ({church:['wizard'],shop:['healer'],forge:['material'],house:['cook'],stable:['luca','erik'],nursery:['joe']}[kind]||[])){const skin=vkHumanWalk168.profiles[id]?.indoor;if(skin)vkImage127(skin.set);}return vkWarmHumanBefore168(kind);};
// END VAELKOR WALK CYCLE v165
