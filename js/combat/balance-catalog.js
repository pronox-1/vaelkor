/* Register extensions before existing deck/save migration; use the shared registry. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.VaelkorBalanceCatalog=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 const tiers=['common','uncommon','rare','epic','legendary'];
 const preferences={Feuer:['dot','rally'],Wasser:['renew','ward'],Natur:['mend','root'],Blitz:['stun','weave'],Erde:['root','ward'],Eis:['stun','ward'],Dunkel:['dot','drain'],Licht:['mend','cleanse'],Geist:['drain','weaken'],Stein:['root','ward'],Luft:['dodge','draw'],Gift:['dot','weaken'],Stahl:['ward','pierce'],Drache:['rally','strike'],Psycho:['stun','draw']};
 const labels={strike:'Angriff',dot:'Nachwirkung',rally:'Stärkung',renew:'Regeneration',ward:'Schutz',mend:'Heilung',root:'Festsetzen',stun:'Betäubung',weave:'Energie',drain:'Lebensentzug',cleanse:'Reinigung',weaken:'Schwächung',dodge:'Ausweichen',draw:'Nachziehen',pierce:'Durchdringung'};
 function register(DD,normalizer,ELEMENTS,synCatalog){if(DD.BYID['bal2-0-0-attack-1'])return{added:DD.CARDS.filter(c=>c.id.startsWith('bal2-')).length,addedSynchro:DD.CARDS.filter(c=>c.id.startsWith('syn-bal2-')).length};
 // Starter-friendly existing IDs retain their ownership; their free versions are low rarity.
 for(const c of DD.CARDS){if(c.kind!=='spell'||c.teamAttack)continue;if(/^spell-neutral-(?:[0-9]|1[01])$/.test(c.id)||/^spell-\d+-[01]$/.test(c.id))c.rarity=c.cost===1?'common':'uncommon';c.balanceVersion=2;}
 // A low-rarity starter thrust supplies a shield counter instead of another identical strike.
 const jab=DD.BYID['spell-neutral-2'];if(jab){jab.effect='pierce';jab.power=3;jab.desc='Ignoriert 80 % Schild; geringere Kartenbasis.';}
 const cards=[];
 for(const [i,element]of ELEMENTS.entries())for(const [t,rarity]of tiers.entries()){
  for(const cost of[1,2,3])cards.push({id:`bal2-${i}-${t}-attack-${cost}`,name:element+' · Angriff '+cost,kind:'spell',element,rarity,cost,power:5*cost-1,effect:'strike'});
  for(const[j,effect]of preferences[element].entries()){
   const cost=['root','weave','dodge'].includes(effect)?2:1+(i+j+t)%3,c={id:`bal2-${i}-${t}-${effect}`,name:element+' · '+(element==='Eis'&&effect==='stun'?'Einfrieren':labels[effect]),kind:'spell',element,rarity,cost,power:1,effect};
   if(effect!=='root'){normalizer.normalize(c);c.cost=cost;const normalized={...c,cost};normalizer.normalize(normalized);c.power=normalized.power;if(effect==='weave')c.power=1;if(effect==='dodge')c.power=1;}else{c.power=1;c.desc='Festsetzen: 1 eigene Runde keine Angriffe; Heilung und Schutz bleiben möglich. Danach eine Runde Kettenschutz.';}
   cards.push(c);
  }
 }
 for(const[i,element]of ELEMENTS.entries())if(!['Natur','Erde','Stein'].includes(element))for(const rarity of ['rare','epic'])cards.push({id:`bal2-${i}-${rarity}-binding`,name:element+' · Festsetzen',kind:'spell',element,rarity,cost:2,power:1,effect:'root',desc:'Festsetzen mit verringerter Chance; Schutz und Heilung bleiben möglich.'});
 DD.register(cards);
 const syn=[];const syneffect={dot:'dot',rally:'expose',renew:'renew',ward:'ward',mend:'mend',root:'root',stun:'shock',weave:'cleanse',drain:'drain',cleanse:'cleanse',weaken:'weaken',dodge:'dodge',draw:'expose',pierce:'pierce',strike:'pierce'};
 for(const[i,element]of ELEMENTS.entries())for(const[t,rarity]of tiers.entries()){
  const partner=({Feuer:'Erde',Gift:'Natur',Dunkel:'Geist',Natur:'Wasser',Licht:'Natur',Stein:'Natur',Erde:'Stein',Eis:'Wasser',Blitz:'Luft'})[element]||ELEMENTS[(i+1)%ELEMENTS.length],n=(i+t)%2?3:2,e=preferences[element][0];
  const requirements=[{types:[element],count:n-1},{types:[partner],count:1}],effect=e==='stun'&&element==='Eis'?'freeze':syneffect[e];
  syn.push({id:`syn-bal2-${i}-${t}`,name:element+' · Elementarbund',kind:'synergy',effect:'synergy',element,rarity,cost:n,power:1,requirements,synergyEffects:[effect],desc:'Elementarsynchro · '+n+' Opfer · '+n+' Energie.'});
 }
 DD.register(syn);synCatalog.push(...syn);
 // Existing plant/rock combinations gain the same root identity. Existing saves keep IDs.
 for(const c of synCatalog)if(['syn87-021','syn87-022','syn87-048'].includes(c.id))c.synergyEffects=['root'];
 return{added:cards.length,addedSynchro:syn.length};}
 return{register,preferences,labels};});
