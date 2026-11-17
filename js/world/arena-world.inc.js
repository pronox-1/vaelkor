// BEGIN VAELKOR ARENA WORLD v140
const vkArenaNPCsBefore140=vkNPCs127;
vkNPCs127=function(){const rows=vkArenaNPCsBefore140();if(interior?.kind!=='arena')return rows;const actors=window.parent.VaelkorArena140?.actors?.()||[];return rows.concat(actors.map((a,i)=>({...a,...vkIndoorWalk139(vkInteriorPlan91(),'arena:'+a.id,{x:12.5+i*3,y:14.8},vkTime127()+i*2100),inside:true})));};
const vkDrawNPCBefore140=vkDrawNPC127;
vkDrawNPC127=function(npc){if(!npc.id.startsWith('arena-trainer-'))return vkDrawNPCBefore140(npc);ctx.save();if(npc.defeated)ctx.globalAlpha=.42;vkDrawNPCBefore140(npc);ctx.restore();ctx.save();ctx.textAlign='center';ctx.font='bold 10px system-ui';ctx.strokeStyle='#09202c';ctx.lineWidth=3;ctx.fillStyle=npc.defeated?'#9bc4ae':npc.current?'#ffdb73':'#a8c5d7';const text=(npc.defeated?'✓ ':npc.current?'⚔ ':'')+(npc.index+1)+' · '+npc.name;ctx.strokeText(text,npc.x*T,(npc.y-3.5)*T);ctx.fillText(text,npc.x*T,(npc.y-3.5)*T);ctx.restore();};
// All building exit paths share the tournament lock, including investigation.
let vkArenaExitNotice145=-Infinity;
function vkArenaExitLocked145(){return interior?.kind==='arena'&&window.parent.VaelkorArena140?.canLeave?.()===false;}
const vkLeaveBefore145=leaveBuilding;leaveBuilding=function(){if(vkArenaExitLocked145()){releaseInput();target={...p};if(performance.now()-vkArenaExitNotice145>2000){vkArenaExitNotice145=performance.now();window.parent.VaelkorArena140?.blockedExit?.();}return false;}return vkLeaveBefore145.apply(this,arguments);};
const vkGateBefore145=vkGateAt101;vkGateAt101=function(){const gate=vkGateBefore145();if(gate?.kind==='leave'&&vkArenaExitLocked145()){status.textContent='🔒 Turnier läuft · Arena-Ausgang geschlossen';return null;}return gate;};
const vkSceneTravelBefore145=window.VaelkorWildScene.travel;window.VaelkorWildScene.travel=function(){if(window.parent.VaelkorArena140?.canLeave?.()===false)return false;return vkSceneTravelBefore145.apply(this,arguments);};
addEventListener('message',event=>{if(event.source!==parent||event.data?.vkCommand!=='resumeArena145'||window.parent.VaelkorArena140?.canLeave?.()!==false)return;if(interior?.kind==='arena')return;if(vkWildCurrentId!=='property:gruenwald')vkWildService()?.openLegacy(1,vkWildEngine,false,'property:gruenwald');const arena=wildBuildings102.find(b=>b.propertyArena126);if(arena){enterBuilding(arena);requestWorldDraw96();}});
// END VAELKOR ARENA WORLD v140
