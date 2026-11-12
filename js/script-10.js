
(function(){
'use strict';
const world=document.getElementById('world'),frame=document.getElementById('vkIntegratedWorld'),overlay=document.getElementById('fusionOverlay');
const panel=world?.querySelector('.layout>.panel'),pad=world?.querySelector('.dpad'),map=world?.querySelector('.mapwrap');
if(!frame||!panel||!pad||!map)return;
const hint=document.createElement('div');hint.id='vkWorldHint';hint.textContent='GRÜNWALD\nPfeiltasten oder WASD zum Gehen.\n● zum Untersuchen.';hint.style.whiteSpace='pre-line';panel.append(hint);
const names={up:'Nach oben',down:'Nach unten',left:'Nach links',right:'Nach rechts',center:'Untersuchen'};
const symbols={up:'▲',down:'▼',left:'◀',right:'▶',center:'●'};
pad.querySelectorAll('[data-move]').forEach(b=>{b.innerHTML=b.dataset.move==='center'?'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/></svg>':'<svg viewBox="0 0 24 24" aria-hidden="true" style="transform:rotate('+({up:0,right:90,down:180,left:270}[b.dataset.move])+'deg)"><path d="M12 4 22 20H2Z"/></svg>';b.setAttribute('aria-label',names[b.dataset.move]);b.setAttribute('aria-pressed','false')});
const keys={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',KeyW:'up',KeyS:'down',KeyA:'left',KeyD:'right'};
const held=new Map();let sent=null,exploring=false;
function command(vkCommand,extra={}){frame.contentWindow?.postMessage({vkCommand,...extra},'*')}
function available(){return !world.classList.contains('hidden')&&overlay.hidden&&document.getElementById('starteroverlay').classList.contains('hidden')&&!document.getElementById('vkGenderOverlay')?.classList.contains('show')}
function updateInput(){
 const dir=[...held.values()].pop()||null;
 if(dir!==sent){sent=dir;if(dir)command('movePress',{dir});else command('moveRelease')}
 pad.querySelectorAll('[data-move]').forEach(b=>{const active=dir===b.dataset.move;b.classList.toggle('vkHeld',active);b.setAttribute('aria-pressed',String(active))});
}
function stop(){held.clear();sent=null;command('moveRelease');pad.querySelectorAll('[data-move]').forEach(b=>{b.classList.remove('vkHeld');b.setAttribute('aria-pressed','false')})}
function sync(){const zl=document.getElementById('zoneLabel');if(zl)zl.textContent=vkRegionForZone(data.zone).label+' · '+(data.zone===1||data.zone%10===0?'Ort / Arena':'Abschnitt '+data.zone);const next=available();if(next){const notice=document.getElementById('gameNotice');if(notice&&notice.parentElement!==map)map.appendChild(notice);}if(next!==exploring){exploring=next;document.body.classList.toggle('vk-exploring',next);stop();if(!next)frame.contentWindow?.postMessage({vkCommand:'moveRelease'},'*')};}
window.addEventListener('keydown',e=>{
 if(!available()||e.target.closest('input,textarea,select,[contenteditable]')||e.ctrlKey||e.metaKey||e.altKey)return;
 const dir=keys[e.code];if(!dir&&e.code!=='Space'&&e.code!=='KeyE')return;
 e.preventDefault();e.stopImmediatePropagation();if(e.repeat)return;
 if(!dir){command('interact');return}held.delete(e.code);held.set(e.code,dir);updateInput();
},true);
window.addEventListener('keyup',e=>{if(!keys[e.code])return;if(held.has(e.code)){e.preventDefault();held.delete(e.code);updateInput()}},true);
pad.querySelectorAll('[data-move]').forEach(b=>{
 b.addEventListener('pointerdown',e=>{
  if(!available())return;e.preventDefault();e.stopImmediatePropagation();const dir=b.dataset.move;
  if(dir==='center'){command('interact');return}held.set('pointer:'+e.pointerId,dir);try{b.setPointerCapture(e.pointerId)}catch(_){}updateInput();
 },true);
 function end(e){held.delete('pointer:'+e.pointerId);updateInput()}
 b.addEventListener('pointerup',end);b.addEventListener('pointercancel',end);b.addEventListener('lostpointercapture',end);
});
window.addEventListener('blur',stop);window.addEventListener('pagehide',stop);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
window.addEventListener('message',e=>{if(e.source!==frame.contentWindow)return;if(['encounter','guardian'].includes(e.data?.vkWorld))stop();if(['ready','position'].includes(e.data?.vkWorld))sync()});
new MutationObserver(sync).observe(world,{attributes:true,attributeFilter:['class']});
new MutationObserver(sync).observe(overlay,{attributes:true,attributeFilter:['hidden']});
new MutationObserver(sync).observe(document.getElementById('starteroverlay'),{attributes:true,attributeFilter:['class']});


// Leaving the world with a held key must stop its embedded simulation too.
document.getElementById('fusionNav')?.addEventListener('pointerdown',stop,true);
sync();
})();
// World integration: use the same coordinates for healing, travel and the embedded map.
(function(){
const frame=document.getElementById('vkIntegratedWorld');if(!frame)return;
function relocate(x=null,y=null,fromTop=false){
 data.vkWorldX=x;data.vkWorldY=y;data.vkWorldFromTop=fromTop;
 frame.contentWindow?.postMessage({vkCommand:'initialize',mapId:'main:'+data.zone,sex:data.heroSex||'male',style:data.heroStyle,level:data.zone,x,y,fromTop,cleared:!!data.clearedZones?.[data.zone]},'*');save();
}
const heal=document.getElementById('healbutton');if(heal)heal.onclick=()=>{
 const village=data.zone===1||data.zone%10===0;
 if(!village||!Number.isFinite(data.vkWorldX)||!Number.isFinite(data.vkWorldY)||Math.hypot(data.vkWorldX-15,data.vkWorldY-24.5)>3.3){gameNotice('Gehe zum blauen Heilbrunnen auf dem Dorfplatz.');return}
 data.team.forEach(m=>m.hp=maxhp(m));save();gameNotice('Dein Team wurde vollständig geheilt!');
};
const previousFinish=finishFusion;finishFusion=function(mode){const lost=fusionBattle&&fusionBattle.winner!=='hero'&&!fusionContext?.tutorial;const result=previousFinish(mode);if(lost){data.zone=1;data.trainerCleared=!!data.clearedZones?.[1];relocate(15.5,26.5);}return result};
const previousTeleport=teleport;teleport=function(){const before=data.teleporters;const result=previousTeleport();if(data.teleporters<before)relocate(15.5,26.5);return result};
const previousNext=nextZone;nextZone=function(){const before=data.zone;const result=previousNext();if(data.zone!==before)relocate();return result};
const previousBack=travelBack;travelBack=function(zone){const before=data.zone;const result=previousBack(zone);if(data.zone!==before)relocate(null,null,true);return result};
})();

