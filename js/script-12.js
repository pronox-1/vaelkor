(function(){
'use strict';
document.querySelectorAll('#vkHome .vkReturnHome').forEach(button=>button.remove());
const home=document.querySelector('#vkHome>.panel'),gender=document.getElementById('vkGenderOverlay'),starter=document.getElementById('starteroverlay');
function begin(){if(data.team?.length)return;stopHeldMovement();starter.classList.add('hidden');gender.classList.add('show');gender.querySelector('[data-vk-gender]')?.focus();}
if(!data.team?.length&&home){const button=document.createElement('button');button.id='vkNewGame';button.className='btn primary';button.type='button';button.textContent='✨ Neues Spiel';button.addEventListener('click',begin);home.querySelector('.vkHomeGrid').before(button);}
const reset=document.getElementById('resetBtn');if(reset)reset.textContent='✨ Neues Spiel starten';
function refresh(){const hasTeam=!!data.team?.length;const button=document.getElementById('vkNewGame');if(button)button.hidden=hasTeam;if(reset)reset.hidden=!hasTeam;}document.addEventListener('click',()=>queueMicrotask(refresh));refresh();
const requested=sessionStorage.getItem('vaelkor-new-game-requested')==='1';sessionStorage.removeItem('vaelkor-new-game-requested');if(requested&&!data.team?.length)begin();
window.VaelkorInterface={version:83,portraitScale:.90};
})();