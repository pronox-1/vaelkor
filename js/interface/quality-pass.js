/* Quality pass 1: valid previews and faithful combat HP, with existing rules preserved. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else api.install(root);})(typeof globalThis!=='undefined'?globalThis:this,function(){
 function hp(value,maximum){const n=typeof value==='number'?value:typeof value==='string'&&value.trim()?Number(value):NaN;return Number.isFinite(n)?Math.max(0,Math.min(maximum,n)):maximum;}
 function install(root){
  if(root.VaelkorQualityPass?.version===1)return root.VaelkorQualityPass;
  const unitBefore=fusionUnit;fusionUnit=function(m,guard=false){const unit=unitBefore(m,guard);unit.hp=hp(m.hp,unit.max);return unit;};
  for(const c of DD.CARDS)if(c.effect==='draw')c.desc=c.desc.replace('höchstens neun Karten gleichzeitig','höchstens zehn Karten gleichzeitig; zum Zugende gilt dein Handlimit');
  const describe=(text,c)=>c?.effect==='draw'?text.replace('bis 9 gleichzeitig','bis 10 gleichzeitig; am Zugende gilt dein Handlimit'):text;
  const effectBefore=vkCardEffectText;vkCardEffectText=function(c,b=null,sideName='hero'){
   if(b||c?.kind!=='spell')return describe(effectBefore(c,b,sideName),c);
   const monster=data.team?.length?active():null;
   const unit=monster?fusionUnit(monster):{atk:5,max:60,hp:60,level:5,element:c.element||'Normal',damageScale:1};
   const actor={...unit,hp:Math.max(1,unit.max)},target={...actor,hp:99999,max:99999,element:'Normal'};
   const preview={round:1,hero:{team:[actor],active:0,energy:9,ward:0},enemy:{team:[target],active:0,energy:9,ward:0},hand:[],deck:[],discard:[],log:[]};
   return describe(effectBefore(c,preview,'hero'),c);
  };
  const doc=root.document,overlay=doc?.getElementById('fusionOverlay');if(overlay){
   let queued=false;const annotate=()=>{queued=false;if(overlay.hidden||overlay.querySelector('.v9Battle'))return;const grid=overlay.querySelector('.fusionGrid');if(!grid||overlay.querySelector('.vkPreviewReference'))return;const note=doc.createElement('p');note.className='vkPreviewReference';note.textContent=data.team?.length?'Wertevorschau: mit deinem aktiven Monster gegen ein neutrales Ziel. Elementvorteile, Wetter und Kampfeffekte können die Werte verändern.':'Beispielwerte ohne aktives Monster: Angriff 5 gegen ein neutrales Ziel. Mit deinem Team ändern sich die Werte.';grid.before(note);};
   new root.MutationObserver(()=>{if(queued)return;queued=true;root.queueMicrotask(annotate);}).observe(overlay,{childList:true,subtree:true});annotate();
  }
  root.VaelkorQualityPass={version:1,hp};
 }
 return{hp,install};
});
