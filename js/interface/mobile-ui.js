/* Touch-safe game surfaces and notices anchored to the actual world viewport. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else{root.VaelkorMobile142=api.install(root);}})(globalThis,()=>{
 const css='body{-webkit-user-select:none!important;user-select:none!important;-webkit-touch-callout:none}img,canvas,svg{-webkit-user-drag:none}input,textarea,select,[contenteditable]:not([contenteditable="false"]){-webkit-user-select:text!important;user-select:text!important;-webkit-touch-callout:default}';
 function editable(target){target=target?.nodeType===3?target.parentElement:target;return!!target?.closest?.('input,textarea,select,[contenteditable]:not([contenteditable="false"])');}
 function guard(doc){if(!doc||doc.__vkTouch142)return;doc.__vkTouch142=true;if(!doc.getElementById('vkTouchStyle142')){const style=doc.createElement('style');style.id='vkTouchStyle142';style.textContent=css;(doc.head||doc.documentElement).appendChild(style);}for(const type of['contextmenu','selectstart','dragstart'])doc.addEventListener(type,e=>{if(!editable(e.target))e.preventDefault();},true);}
 function anchor(rect,height,viewportWidth,minTop=0){const width=Math.max(1,Math.min(rect.width,viewportWidth-16)),left=Math.max(8,Math.min(rect.left,viewportWidth-width-8)),top=Math.max(minTop+2,rect.top-Math.max(0,height)-6);return{left,width,top,reserve:Math.max(0,minTop+2+Math.max(0,height)+6-rect.top)};}
 function install(root){const doc=root.document,notice=doc.getElementById('gameNotice'),world=doc.getElementById('world'),frame=doc.getElementById('vkIntegratedWorld');guard(doc);let lastWidth=null,lastPosition='',queued=false,reserved=0;
  function reserveSpace(space){space=Math.max(0,Math.ceil(space));if(space===reserved)return;reserved=space;doc.body.style?.setProperty?.('--vk-world-notice-space',space+'px');if(space)doc.body.classList.add?.('vkWorldNotice172');else doc.body.classList.remove?.('vkWorldNotice172');}
  function releaseSpace(){reserveSpace(0);}
  const child=()=>{try{guard(frame?.contentDocument);}catch(_){}};frame?.addEventListener('load',child);child();
  function positionNotice(exploring){
   const overlay=doc.getElementById('fusionOverlay'),legacy=doc.getElementById('battleoverlay'),combat=overlay&&!overlay.hidden?overlay:legacy&&!legacy.hidden&&!legacy.classList?.contains('hidden')&&legacy.getBoundingClientRect?.().width?legacy:null;
   const clearBattle=()=>{if(doc.body.classList.contains('vkBattleNotice161'))doc.body.classList.remove?.('vkBattleNotice161');};
   if(!notice||notice.style.display==='none'||notice.hidden){releaseSpace();clearBattle();return;}
   const active=typeof exploring==='boolean'?exploring:doc.body.classList.contains('vk-exploring'),map=world?.querySelector('.mapwrap'),visibleMap=map&&root.getComputedStyle?.(world)?.display!=='none';
   if(!combat&&!active&&!visibleMap){releaseSpace();clearBattle();notice.classList.remove('vkWorldNotice142');lastPosition='';const header=doc.querySelector('.wrap>header')||doc.querySelector('header');if(header&&notice.parentElement===doc.body)header.insertAdjacentElement('afterend',notice);return;}
   const target=combat?.querySelector?.('.v9Battle')||combat||map;if(!target)return;let rect=target.getBoundingClientRect();if(!rect.width||!rect.height)return;
   if(notice.parentElement!==doc.body)doc.body.appendChild(notice);notice.classList.add('vkWorldNotice142');
   const view=root.visualViewport,offset=view?.offsetLeft||0,viewport=view?.width||root.innerWidth||doc.documentElement.clientWidth,measure=anchor({...rect,left:rect.left-offset},0,viewport),width=measure.width+'px';
   if(width!==lastWidth){lastWidth=width;notice.style.setProperty('--vk-notice-width',width);}const height=notice.getBoundingClientRect().height;let floor=view?.offsetTop||0,box;
   if(combat){releaseSpace();const space=Math.min(height+16,(view?.height||root.innerHeight||800)*.3),value=space+'px';if(doc.body.style?.getPropertyValue?.('--vk-battle-notice-space')!==value){doc.body.style?.setProperty('--vk-battle-notice-space',value);if(root.Event&&root.dispatchEvent)root.dispatchEvent(new root.Event('resize'));}if(!doc.body.classList.contains('vkBattleNotice161'))doc.body.classList.add?.('vkBattleNotice161');box={left:measure.left,width:measure.width,top:floor+8};}
   else{clearBattle();const header=doc.querySelector('.wrap>header')||doc.querySelector('header'),fullscreen=!!(doc.fullscreenElement||doc.webkitFullscreenElement||root.VaelkorFullscreen?.active||doc.documentElement?.classList?.contains?.('vk-expanded'));floor=Math.max(floor,header?.getBoundingClientRect().bottom||0);
    if(fullscreen){reserveSpace(height+8);rect=map.getBoundingClientRect();box={...anchor({...rect,left:rect.left-offset},height,viewport,floor),top:floor+4};}
    else{reserveSpace(Math.max(0,height+8-(rect.top-reserved-floor)));rect=map.getBoundingClientRect();box=anchor({...rect,left:rect.left-offset},height,viewport,floor);}
   }
   box.left+=offset;const key=[box.left,box.top,box.width].join('|');if(key!==lastPosition){lastPosition=key;notice.style.setProperty('--vk-notice-left',box.left+'px');notice.style.setProperty('--vk-notice-top',box.top+'px');}
  }
  function schedule(){if(queued)return;queued=true;root.requestAnimationFrame(()=>{queued=false;positionNotice();});}
  for(const event of['resize','orientationchange','scroll'])root.addEventListener(event,schedule);for(const event of['fullscreenchange','webkitfullscreenchange'])doc.addEventListener(event,schedule);root.visualViewport?.addEventListener('resize',schedule);root.visualViewport?.addEventListener('scroll',schedule);if(root.MutationObserver&&notice)new root.MutationObserver(schedule).observe(notice,{attributes:true,attributeFilter:['style','hidden']});if(root.MutationObserver){const observer=new root.MutationObserver(schedule);for(const target of[doc.body,doc.getElementById('fusionOverlay'),doc.getElementById('battleoverlay')])if(target)observer.observe(target,{attributes:true,attributeFilter:['class','hidden']});}if(root.ResizeObserver){const observer=new root.ResizeObserver(schedule);for(const node of[notice,world?.querySelector('.mapwrap')])if(node)observer.observe(node);}positionNotice();return{positionNotice,anchor,protect:guard};
 }
 return{install,anchor,guard,editable,css};
});
