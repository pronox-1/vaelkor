
(function(){
const overlay=document.getElementById('fusionOverlay');
if(!overlay)return;
let logOpen=false;
function update(){
 const battle=overlay.querySelector('.v9Battle');
 if(!battle)return;
 battle.classList.toggle('vkLogOpen',logOpen);
 const log=battle.querySelector('.vaelkorCombatLog');
 if(!log)return;
 let btn=battle.querySelector('.vkLogToggle');
 if(!btn){btn=document.createElement('button');btn.type='button';btn.className='vkLogToggle';log.before(btn)}
 btn.textContent=logOpen?'📜 Kampfprotokoll schließen ▲':'📜 Kampfprotokoll öffnen ▼';
 btn.setAttribute('aria-expanded',String(logOpen));
 }
overlay.addEventListener('click',e=>{
 if(!e.target.closest('.vkLogToggle'))return;
 logOpen=!logOpen;update();
});
const obs=new MutationObserver(()=>{if(!overlay.querySelector('.v9Battle')){logOpen=false;return}update()});
obs.observe(overlay,{childList:true,subtree:false});
update();
})();
