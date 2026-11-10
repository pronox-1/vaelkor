
// These two replacements are cropped exclusively from the approved individual art templates.
/* Starter artwork now uses calibrated original source. */
(function(){
 const starterIds=['sprig','tidalon','volt','creature020'];
 function draw(){
  for(const id of starterIds){
   const btn=document.querySelector('#starters [data-starter="'+id+'"]');if(!btn)continue;
   const species=S(id);if(!species)continue;
   const sample=monster(id,5,false);sample.vkStarter66=true;sample.hp=maxhp(sample);const hp=maxhp(sample);const attack=fusionUnit(sample).atk;
   const old=btn.querySelector('.starter-art');if(old)old.remove();
   const image=document.createElement('div');image.className='vk-starter-image';
   image.innerHTML=creatureArt(id,false,sample);
   const name=document.createElement('strong');name.textContent=species.name;
   const type=document.createElement('small');type.textContent=({'Feuer':'🔥','Wasser':'💧','Natur':'🌿','Blitz':'⚡'}[species.type]||'✦')+' '+species.type+' · LEVEL 5';
   const stats=document.createElement('div');stats.className='vk-starter-stats';
   const hpText=document.createElement('em');hpText.textContent='❤️ '+hp+'/'+hp+' LP';
   const atkText=document.createElement('em');atkText.textContent='⚔️ '+(Number.isFinite(attack)?attack:species.atk||2)+' Angriff';
   const shield=document.createElement('em');shield.textContent='🛡️ 0 Block';stats.append(hpText,atkText,shield);
   const bar=document.createElement('div');bar.className='vk-starter-hpbar';
   const pick=document.createElement('span');pick.className='vk-starter-pick';pick.textContent='⭐ Als Starter wählen';
   btn.replaceChildren(image,name,type,stats,bar,pick);
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',draw,{once:true});else draw();
})();
