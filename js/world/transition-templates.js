/* Natural trail endpoints. Appearance only; the existing Wildlands registry owns every connection. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.VaelkorTransitionTemplates=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const palettes=Object.freeze({
  forest:{mid:'#bb9e69',light:'#c5ab79',dark:'#aa8d5e',accent:'#d9bd89'},
  desert:{mid:'#d2ad70',light:'#e1c18c',dark:'#bc985e',accent:'#eed7a5'},
  jungle:{mid:'#a48c57',light:'#b8a068',dark:'#8c7c4e',accent:'#c6b37a'},
  snow:{mid:'#b7cbd7',light:'#dce8ed',dark:'#9db4c4',accent:'#f2f8fa'},
  volcano:{mid:'#65545a',light:'#7b6669',dark:'#51434c',accent:'#a48270'},
  swamp:{mid:'#8c8158',light:'#a09769',dark:'#727349',accent:'#b2a774'},
  mushroom:{mid:'#96816e',light:'#ad957c',dark:'#7e6e69',accent:'#c7b18c'}
 });
 function hash(text){let h=2166136261;for(const c of text){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}h^=h>>>16;h=Math.imul(h,0x7feb352d);h^=h>>>15;return h>>>0;}
 function choose({mapId,targetId,worldSeed=1042,biome='forest',targetBiome=biome,isTown=false,targetTown=false,axis='vertical'}){
  const edge=[mapId,targetId].sort().join('|'),roll=hash(worldSeed+'|'+edge)/4294967296;
  const rocky=[biome,targetBiome].some(b=>['desert','volcano','snow'].includes(b));
  let variant=isTown||targetTown?(roll<.55?'plain':roll<.84?'sign':'arch'):rocky?(roll<.48?'plain':roll<.68?'sign':roll<.96?'rocks':'arch'):(roll<.59?'plain':roll<.84?'sign':roll<.96?'rocks':'arch');
  if(variant==='arch'&&axis==='horizontal')variant='sign';
  return {version:1,edge,variant,biome,axis};
 }
 function message({port,targetId,targetTown,targetLabel,biome,returning=false}){
  if(targetId==='main:1')return 'Zurück nach Grünwald';
  if(targetTown)return (port==='previous'||returning?'Zurück nach ':'Zum nächsten Dorf: ')+(targetLabel||'Dorf');
  if(returning)return 'Zurück zum Hauptpfad';
  if(port==='previous')return 'Zurück zum vorherigen Abschnitt';
  return biome==='volcano'?'Gebirgspass · Weiter in die Wildnis':biome==='forest'?'Waldpfad · Weiter in die Wildnis':'Weiter in die Wildnis';
 }
 function junction(mask){const count=[1,2,4,8].filter(n=>mask&n).length;if(count===4)return'cross';if(count===3)return't';if(count===2)return mask===5||mask===10?'straight':'corner';return count===1?'end':'isolated';}
 return Object.freeze({version:1,palette:b=>palettes[b]||palettes.forest,choose,message,junction,arch:{asset:'trail_wood_arch',rect:[154,170,1006,818]}});
});
