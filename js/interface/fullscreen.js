/* One owner for fullscreen input; legacy handlers remain untouched. */
(function(root,factory){const install=factory();if(typeof module==='object'&&module.exports)module.exports=install;else root.VaelkorFullscreen=install(root);})(typeof globalThis!=='undefined'?globalThis:this,function(){return function(root){
 const doc=root.document,button=doc.getElementById('fullscreenBtn');if(!button)return null;let busy=false,expanded=false;
 const native=()=>doc.fullscreenElement||doc.webkitFullscreenElement;
 const active=()=>!!native()||expanded;
 function resize(){root.dispatchEvent(new root.Event('resize'));}
 function sync(){const on=active();doc.documentElement.classList.toggle('vk-expanded',expanded);button.textContent=expanded?'⛶ Erweiterte Ansicht beenden':on?'⛶ Vollbild beenden':'⛶ Vollbild';button.title=button.textContent;button.setAttribute('aria-label',button.textContent);button.setAttribute('aria-pressed',String(on));button.setAttribute('aria-busy',String(busy));button.disabled=busy;resize();}
 function notify(){if(typeof root.gameNotice==='function')root.gameNotice('Erweiterte Ansicht aktiv. Die Browserleisten lassen sich hier nicht ausblenden.');}
 async function toggle(){if(busy)return;busy=true;sync();try{
  if(native()){const exit=doc.exitFullscreen||doc.webkitExitFullscreen;if(exit)await exit.call(doc);}
  else if(expanded)expanded=false;
  else{const el=doc.documentElement,request=el.requestFullscreen||el.webkitRequestFullscreen;
   if(request&&doc.fullscreenEnabled!==false){try{await request.call(el);}catch(_){expanded=true;notify();}}
   else{expanded=true;notify();}
  }
 }finally{busy=false;sync();}return active();}
 doc.addEventListener('click',event=>{if(!event.target.closest?.('#fullscreenBtn'))return;event.preventDefault();event.stopImmediatePropagation();void toggle().catch(()=>{if(typeof root.gameNotice==='function')root.gameNotice('Vollbild konnte nicht geändert werden. Bitte erneut versuchen.');});},true);
 for(const name of ['fullscreenchange','webkitfullscreenchange'])doc.addEventListener(name,sync);
 doc.addEventListener('keydown',event=>{if(event.key==='Escape'&&expanded){expanded=false;sync();}},true);
 root.addEventListener('orientationchange',resize);root.visualViewport?.addEventListener('resize',resize);sync();return{toggle,get active(){return active();},get busy(){return busy;},get expanded(){return expanded;}};
};});
