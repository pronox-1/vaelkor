/* Fit the collapsed battle to the real viewport; expanded panels remain scrollable. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else api.install(root);})(typeof globalThis!=='undefined'?globalThis:this,function(){
 function scale(height,available){return height>0&&available>0?Math.min(1,available/height):1;}
 function install(root){const doc=root.document,overlay=doc.getElementById('fusionOverlay');if(!overlay)return;let queued=false,adjusting=false,lastBattle=null,observer=null;
 function arena(battle){if(battle.querySelector('.vkBattleArena'))return;const nodes=[...battle.children],enemy=nodes.findIndex(n=>n.matches('.v9Encounter:not(.vaelkorHero)')),hero=nodes.findIndex(n=>n.matches('.vaelkorHero'));if(enemy<1||hero<=enemy)return;const start=nodes[enemy-1].matches('.v9SectionLabel')?enemy-1:enemy,split=nodes[hero-1].matches('.v9SectionLabel')?hero-1:hero,grid=doc.createElement('div');grid.className='vkBattleArena';battle.insertBefore(grid,nodes[start]);for(const group of[nodes.slice(start,split),nodes.slice(split,hero+1)]){const panel=doc.createElement('div');panel.className='vkBattleSide';grid.append(panel);panel.append(...group);}}
 function fit(){queued=false;const battle=overlay.querySelector('.v9Battle');if(!battle||overlay.hidden){lastBattle=null;delete overlay.dataset.battleExpanded;return;}adjusting=true;observer?.disconnect();try{arena(battle);if(lastBattle!==battle){if(!lastBattle)overlay.scrollTop=0;lastBattle=battle;}
  const expanded=!!battle.querySelector('.vaelkorTeamToggle[aria-expanded="true"],.vkLogToggle[aria-expanded="true"],.vkSynToggle87[aria-expanded="true"],details[open]');
  // Measure the collapsed layout even while optional panels are open, retaining its scale.
  battle.classList.add('vkBattleMeasuring');battle.style.setProperty('--vk-battle-scale','1');battle.style.setProperty('--battle-card-h','193px');battle.style.setProperty('--vk-hand-space','0px');
  const style=root.getComputedStyle(overlay),viewport=Math.min(overlay.clientHeight,root.visualViewport?.height||root.innerHeight),available=Math.max(1,viewport-parseFloat(style.paddingTop||0)-parseFloat(style.paddingBottom||0)-2);
  const natural=battle.getBoundingClientRect().height;battle.style.setProperty('--vk-hand-space',Math.min(12,Math.max(0,available-natural))+'px');
  let factor=scale(battle.getBoundingClientRect().height,available);battle.style.setProperty('--vk-battle-scale',String(factor));
  // Width wrapping can change after zoom: bounded corrections, never a perpetual render loop.
  for(let i=0;i<3;i++){const h=battle.getBoundingClientRect().height;if(h<=available+1)break;factor*=available/h;battle.style.setProperty('--vk-battle-scale',String(factor));}
  battle.classList.remove('vkBattleMeasuring');overlay.dataset.battleExpanded=String(expanded);if(!expanded)overlay.scrollTop=0;
 }finally{battle.classList.remove('vkBattleMeasuring');adjusting=false;observer?.observe(overlay,{childList:true,subtree:true,attributes:true,attributeFilter:['class','aria-expanded','open','hidden']});}}
 function schedule(){if(queued||adjusting)return;queued=true;root.requestAnimationFrame(fit);}
 observer=new root.MutationObserver(schedule);observer.observe(overlay,{childList:true,subtree:true,attributes:true,attributeFilter:['class','aria-expanded','open','hidden']});
 for(const name of['resize','orientationchange'])root.addEventListener(name,schedule);for(const name of['fullscreenchange','webkitfullscreenchange'])doc.addEventListener(name,schedule);root.visualViewport?.addEventListener('resize',schedule);overlay.addEventListener?.('load',schedule,true);doc.fonts?.ready?.then(schedule);schedule();return{fit,schedule};
 }
 return{scale,install};
});
