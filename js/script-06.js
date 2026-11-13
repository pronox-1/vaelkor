
(function(){
'use strict';
const nav=document.getElementById('fusionNav');
const world=document.getElementById('world');
const team=document.getElementById('team');
const overlay=document.getElementById('fusionOverlay');
if(!nav||!world||!team||!overlay)return;
const home=document.createElement('section');home.id='vkHome';home.className='hidden';
home.innerHTML='<div class="panel"><h2>🏠 Startseite</h2><p class="muted">Deine Abenteuer, Einrichtungen und Spielbereiche an einem Ort.</p><div class="vkHomeGrid">'+
[['shop','🛍️ Shop'],['guide','📖 Monsterbuch'],['base','🏡 Basis'],['quests','🏆 Quests'],['help','❔ Hilfe & Tutorials'],['adventure','🧭 Dein Abenteuer']].map(([id,label])=>'<button class="vkHomeTile" data-vkhome="'+id+'">'+label+'</button>').join('')+'</div></div>';
world.before(home);
const adventure=world.querySelector('aside.panel');
if(adventure){adventure.id='vkAdventurePanel';home.appendChild(adventure)}
const deckSwitch=document.createElement('div');deckSwitch.id='vkDeckSwitch';deckSwitch.hidden=true;
deckSwitch.innerHTML='<button data-vkdeck="deck">🃏 Deck</button><button data-vkdeck="collection">📚 Karten</button>';
document.body.appendChild(deckSwitch);
nav.innerHTML='<button data-vkmain="home">🏠 Startseite</button><button data-vkmain="world">🗺️ Welt</button><button data-vkmain="team">🐾 Monster</button><button data-vkmain="deck">🃏 Kartendeck</button>';
let main='home';
const sections=['world','team','shop','breeding','guide','base','quests','help','vkHome'];
function hideFusion(){if(typeof fusionBattle!=='undefined'&&fusionBattle)return;overlay.hidden=true}
function showSection(id){
 hideFusion();
 sections.forEach(k=>{const el=document.getElementById(k);if(el)el.classList.toggle('hidden',k!==id)});
 if(typeof stopHeldMovement==='function')stopHeldMovement();
 if(typeof render==='function')render();
}
function highlight(){nav.querySelectorAll('[data-vkmain]').forEach(b=>b.classList.toggle('vkCurrent',b.dataset.vkmain===main));deckSwitch.querySelectorAll('[data-vkdeck]').forEach(b=>b.classList.toggle('vkCurrent',b.dataset.vkdeck===window.vkDeckCurrent))}
function go(id){
 if(id==='deck'){
  main='deck';sections.forEach(k=>{let el=document.getElementById(k);if(el)el.classList.add('hidden')});
  deckSwitch.hidden=false;window.vkDeckCurrent='deck';
  if(typeof openFusion==='function')openFusion('deck');
 }else{
  deckSwitch.hidden=true;main=id;
  showSection(id==='home'?'vkHome':id==='team'?'team':'world');
 }
 highlight();window.scrollTo?.(0,0);
}
nav.addEventListener('click',e=>{const b=e.target.closest('[data-vkmain]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();go(b.dataset.vkmain)},true);
deckSwitch.addEventListener('click',e=>{const b=e.target.closest('[data-vkdeck]');if(!b)return;window.vkDeckCurrent=b.dataset.vkdeck;if(typeof openFusion==='function')openFusion(window.vkDeckCurrent);highlight()});
home.addEventListener('click',e=>{const b=e.target.closest('[data-vkhome]');if(!b)return;const id=b.dataset.vkhome;main='home';showSection(id==='adventure'?'vkHome':id);if(id==='adventure')adventure?.scrollIntoView({block:'start'});highlight()});
// Existing game logic can still switch panels; bottom navigation remains the single global navigation.
const originalOpen=window.openFusion;
if(typeof originalOpen==='function')window.openFusion=function(tab){originalOpen(tab);if(tab==='world'&&main==='deck')go('world')};
go('home');
})();
