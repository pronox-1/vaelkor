(function(){'use strict';
const frame=document.getElementById('vkIntegratedWorld'),world=()=>frame?.contentWindow?.VaelkorAdventure102,valid=n=>Number.isSafeInteger(n)&&n>=1&&(n===1||n%10===0);let travelPending104=false,focusBefore104=null;
function cities(){const raw=data.fountainCities104||{};return Object.keys(raw).map(Number).filter(n=>valid(n)&&raw[n]===true).sort((a,b)=>a-b);}
function initializeHistory(){
 const visited={};for(const n of cities())visited[n]=true;visited[1]=true;
 if(data.fountainTravelVersion104!==104){
  // Older versions used linear progression; reached levels and cleared zones preserve that history.
  const reached=[Number(data.zone)||1,Number(data.maxZone)||1,...Object.keys(data.clearedZones||{}).filter(k=>data.clearedZones[k]).map(Number)].filter(n=>Number.isSafeInteger(n)&&n>=1);
  const highest=Math.max(1,...reached);for(let n=10;n<=highest;n+=10)visited[n]=true;
 }
 data.fountainCities104=visited;data.fountainTravelVersion104=104;vkPersistUnified();
}
function remember(level,silent=false){if(!valid(level))return false;data.fountainCities104=data.fountainCities104||{};if(data.fountainCities104[level])return false;data.fountainCities104[level]=true;vkPersistUnified();if(!silent&&cities().length>1)gameNotice('⛲ '+vkRegionForZone(level).hub+' entdeckt! Die Stadt ist jetzt im Brunnen-Reisenetz verfügbar.');return true;}
initializeHistory();
const dialog=document.createElement('dialog');dialog.id='vkFountain104';dialog.setAttribute('aria-labelledby','vkFountainTitle104');document.body.append(dialog);
function blocked(){return!!(battle||fusionBattle||travelPending104||frame.contentWindow?.VaelkorFountainWorld104?.busy||document.getElementById('vkInventory102')?.open)}
function atCity(){const point=world()?.nearHeal();return point?.city&&point.level===data.zone?point:null;}
function paint(){const current=data.zone;dialog.innerHTML='<div class="vkFountainTop104"><h2 id="vkFountainTitle104">⛲ Brunnenreise</h2><button type="button" data-fountain-close104 aria-label="Brunnenmenü schließen">✕</button></div><p>Dein Team kann hier kostenlos heilen. Reise zu den Brunnen der Städte, die du bereits besucht hast.</p><button type="button" data-fountain-heal104>💧 Team vollständig heilen</button><h3>Besuchte Städte · '+cities().length+'</h3><div class="vkFountainCities104">'+cities().map(n=>'<button type="button" class="vkFountainCity104" data-fountain-dest104="'+n+'" '+(n===current?'disabled aria-current="location"':'')+'><span><b>'+fesc(vkRegionForZone(n).hub)+'</b><small>'+fesc(vkRegionForZone(n).label)+' · Level '+n+'</small></span><span>'+(n===current?'Hier bist du':'Reisen →')+'</span></button>').join('')+'</div><p class="vkFountainInfo104">'+(cities().length<2?'Entdecke die zweite Stadt auf Level 10. Danach kannst du zwischen ihren Brunnen hin- und herreisen.':'Brunnenreisen sind kostenlos. Weitere Städte werden beim ersten Besuch automatisch freigeschaltet.')+'</p>';}
function open(){if(blocked()||!atCity())return false;remember(data.zone,true);focusBefore104=document.activeElement;stopHeldMovement();world()?.pause(true);paint();if(!dialog.open)dialog.showModal();return true;}
function close(){if(dialog.open)dialog.close();}
dialog.addEventListener('close',()=>{world()?.pause(false);focusBefore104?.focus?.({preventScroll:true});});
function interact(){if(blocked()||!atCity())return false;VaelkorExploration102.heal();return open();}
function travel(destination){const n=Number(destination);if(blocked()||!dialog.open||!atCity()||!valid(n)||n===data.zone||!cities().includes(n))return false;const api=frame.contentWindow?.VaelkorFountainWorld104;if(!api?.travel(n,!!data.clearedZones?.[n]))return false;travelPending104=true;close();document.querySelector('#fusionNav [data-vkmain="world"]')?.click();return true;}
dialog.addEventListener('click',e=>{const button=e.target.closest('button');if(!button)return;if(button.hasAttribute('data-fountain-close104'))close();else if(button.hasAttribute('data-fountain-heal104'))VaelkorExploration102.heal();else if(button.hasAttribute('data-fountain-dest104'))travel(button.dataset.fountainDest104);});
window.addEventListener('message',e=>{
 if(e.source!==frame.contentWindow)return;const m=e.data||{};
 if(m.vkWorld==='ready'||m.vkWorld==='position'){
  const scene=world()?.snapshot();if(scene?.level!==m.level)return;const highest=Math.max(Number(data.maxZone)||1,m.level);if(data.maxZone!==highest){data.maxZone=highest;vkPersistUnified();}
  if(!m.interior)remember(m.level);
  if(m.viaFountain104){travelPending104=false;data.zone=m.level;data.trainerCleared=!!data.clearedZones?.[m.level];data.vkWorldX=m.x;data.vkWorldY=m.y;data.vkWorldFromTop=false;save();gameNotice('⛲ Angekommen: '+vkRegionForZone(m.level).hub+' · Level '+m.level);}
 }
 if(m.vkWorld==='fountain104')interact();
 if(m.vkWorld==='fountainError104'){travelPending104=false;gameNotice('Der Zielbrunnen ist gerade nicht erreichbar. Du bleibst in deiner Stadt.');}
});
const oldHealButton104=document.getElementById('healbutton');if(oldHealButton104)oldHealButton104.onclick=()=>atCity()?interact():VaelkorExploration102.heal();
for(const hint of document.querySelectorAll('.vkHealingHint102'))hint.append(' An Stadtbrunnen öffnet ● außerdem die kostenlose Reise zu bereits besuchten Städten.');
window.VaelkorFountains104={open,close,interact,travel,visited:cities,get pending(){return travelPending104}};
})();