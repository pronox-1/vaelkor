(function(){
'use strict';if(window.VaelkorCards?.version===81)return;
const rank={common:0,uncommon:1,rare:2,epic:3,legendary:4},rarityScale=[1,1.06,1.12,1.20,1.30];
const supported=new Set(['strike','pierce','dot','drain','mend','ward','stun','weaken','weave','rally','reflect','dodge','draw','handboost','cleanse','renew','expose','purge']);
const newCards=[],definitions=[['cleanse','Reinigung',1,'rare'],['renew','Regeneration',2,'rare'],['expose','Schwachstelle',1,'uncommon'],['purge','Entzauberung',2,'rare']];
for(let i=0;i<ELEMENTS.length;i++)for(const [effect,label,cost,rarity]of definitions)newCards.push({id:`vk81-${i}-${effect}`,name:`${ELEMENTS[i]} · ${label}`,kind:'spell',element:ELEMENTS[i],order:fusionOrders[ELEMENTS[i]]||'thorn',cost,power:1,effect,rarity});
const psychoSpecial=[['Gedankenfessel','weaken',1],['Traumblick','draw',2],['Astralfokus','rally',3],['Geistbruch','expose',3]];
const psychoTactics=[['Gedankenstoß','strike',1],['Gedankenschild','ward',2],['Vorahnung','renew',2],['Astralreinigung','cleanse',2]];
for(const [kind,items]of [['special',psychoSpecial],['tactical',psychoTactics]])items.forEach(([name,effect,cost],i)=>newCards.push({id:`vk-${kind}-14-${i}`,name,kind:'spell',element:'Psycho',order:'veil',cost,power:1,effect,rarity:['common','rare','epic','legendary'][i]}));
for(const [i,[effect,label,cost,rarity]]of definitions.entries())newCards.push({id:`vk81-neutral-${i}`,name:['Feldreinigung','Erholung','Gezielte Schwachstelle','Schutz brechen'][i],kind:'spell',element:null,order:'thorn',cost,power:1,effect,rarity:i===0?'common':rarity});
DD.register(newCards);
function r(c){return rank[c.rarity]||0}function mult(c){return rarityScale[r(c)]}function budget(c){return 5*c.cost-1}
function normalize(c){
 if(c.kind!=='spell'||c.teamAttack)return;
 c.effect=({guard:'ward',silence:'weaken',haste:'draw',pulse:'ward'})[c.effect]||c.effect;
 if(!supported.has(c.effect))throw Error('Unbekannter Karteneffekt: '+c.effect);
 c.cost=Math.max(1,Math.min(5,Math.round(c.cost||1)));
 if(c.effect==='weave'){c.cost=Math.max(2,c.cost);if(r(c)>=3)c.cost=Math.max(3,c.cost)}
 if(c.effect==='handboost'||c.effect==='dodge')c.cost=Math.max(2,c.cost);
 const cost=c.cost,base=budget(c);
 c.power=({strike:base,pierce:Math.round(base*.82),dot:Math.round(base*.68),drain:Math.round(base*.67),mend:[0,5,11,18,26,35][cost],ward:[0,6,12,19,27,36][cost],stun:Math.max(1,Math.round(base*.35)),weaken:Math.min(4,cost+Math.floor(r(c)/3)),weave:r(c)>=3&&cost>=3?2:Math.max(1,Math.floor(cost/2)),rally:Math.min(8,2*cost-1+Math.floor(r(c)/2)),reflect:[0,6,12,19,27,36][cost],dodge:Math.min(3,Math.max(1,cost-1)),draw:Math.min(6,2*cost-1+(r(c)>=2?1:0)),handboost:Math.min(4,Math.max(1,cost-1)),cleanse:1,renew:[0,5,11,18,26,35][cost],expose:Math.min(6,2*cost),purge:cost})[c.effect];
 c.balanceVersion=81;c.desc=(c.element?c.element+' · benötigt ein passendes aktives Monster. ':'Neutral · mit jedem Monster spielbar. ')+({strike:'Direkter Schaden.',pierce:'Ignoriert 80 % des gegnerischen Schilds.',dot:'Schaden plus zwei Runden Nachwirkung; stapelt nicht mehrfach.',drain:'Schaden und 40 % des verursachten Schadens als Heilung.',mend:'Sofortige Heilung bis zum LP-Maximum.',ward:'Schild bis zum kampfeigenen Schutzlimit.',stun:'Schaden und Chance auf eine Runde Betäubung; mit Kettenschutz.',weaken:'Verringert den Schaden für eine begrenzte Zahl eigener Runden.',weave:'Zusätzliche Energie ab der nächsten Runde; insgesamt höchstens +3.',rally:'Angriff für diesen Kampf; Bonus höchstens +10, Angriff höchstens 30.',reflect:'Schutz und einmaliger Gegenschaden.',dodge:'Weicht den nächsten Angriffen aus; höchstens drei Ladungen.',draw:'Zieht sofort Karten; höchstens neun Karten gleichzeitig.',handboost:'Mehr Karten zu Rundenbeginn; höchstens neun.',cleanse:'Entfernt Nachwirkung, Schwächung, Betäubung und Verwundbarkeit; kleine Heilung.',renew:'Heilt nach den nächsten zwei Runden; keine Wiederbelebung.',expose:'Die nächsten Treffer verursachen mehr Schaden.',purge:'Entfernt gegnerischen Schild sowie Regeneration und Angriffsstärkungen.'}[c.effect]);
}
for(const c of DD.CARDS)normalize(c);
Object.assign(VK_EFFECT_DE,{cleanse:'Reinigung',renew:'Regeneration',expose:'Schwachstelle',purge:'Entzauberung'});
Object.assign(fusionPalette,{Psycho:['#ad77da','#f1deff','🔮']});
Object.assign(VAELKOR_COLORS,{Blitz:['#e7b82b','#fff099'],Dunkel:['#9355d1','#edc9ff'],Luft:['#69b9bf','#dafaff'],Stahl:['#809cae','#e0edf5'],Psycho:['#ad77da','#f1deff'],Gift:['#91b638','#e8ffaf']});
if(typeof vkCardArtCache!=='undefined')vkCardArtCache.clear();
const utility=new Set(['stun','weaken','weave','rally','dodge','draw','handboost','cleanse','expose']);
function utilityShield(c){return utility.has(c.effect)?r(c):0}
function shieldCap(u){return Math.max(45,Math.round(u.max*.8+10))}
function support(c,u,kind){const base=(kind==='heal'?[0,5,11,18,26,35]:[0,6,12,19,27,36])[c.cost];return Math.max(1,Math.round((base+u.atk*(kind==='heal'?.35:.50)*c.cost)*mult(c)))}
function addShield(side,u,n){const gain=Math.max(0,Math.min(n,shieldCap(u)-(side.ward||0)));side.ward=(side.ward||0)+gain;return gain}
function applyHit(b,c,sideName,amount){
 const actor=b[sideName],target=b[sideName==='hero'?'enemy':'hero'],u=fusionActive(actor),v=fusionActive(target);if(!u||!v)return{dealt:0,dodged:false};
 let n=amount;if(target.dodge){target.dodge=Math.max(0,Number(target.dodge)-1);b.log.push('💨 Angriff ausgewichen!');return{dealt:0,dodged:true}}
 const shield=target.ward||0,blocked=Math.min(n,c.effect==='pierce'?Math.floor(shield*.2):shield);target.ward=Math.max(0,shield-blocked);n-=blocked;
 if(target.vulnerable&&n>0){n=Math.ceil(n*(1+(target.vulnerableScale||.20)));target.vulnerable--;if(!target.vulnerable)target.vulnerableScale=0}
 const dealt=Math.min(v.hp,n);v.hp=Math.max(0,v.hp-dealt);b.log.push((sideName==='hero'?'🟢 Du':'🔴 Gegner')+' · '+c.name+': '+dealt+' Schaden'+(blocked?' · '+blocked+' geblockt':''));
 if(target.reflect&&dealt>0){u.hp=Math.max(0,u.hp-Math.min(target.reflect,dealt));target.reflect=0}
 return{dealt,dodged:false};
}
vkRawCardDamage=function(b,c,sideName,power=c.power){
 const actor=b[sideName],target=b[sideName==='hero'?'enemy':'hero'],u=fusionActive(actor),v=fusionActive(target);if(!u||!v)return 0;
 const type=c.element?typeMultiplier(c.element,v.element):1,weatherBonus=c.element&&c.element===weatherType()?Math.max(1.05,weather()[1]):1;
 const early=sideName==='enemy'&&!fusionContext?.trainer&&!fusionContext?.legend&&Number(data.zone||1)<=3?.92:1;
 return Math.max(1,Math.round((power*1.32+(u.atk*.62+1)*c.cost)*(u.damageScale||1)*mult(c)*type*weatherBonus*vkLevelFactor(u,v)*(actor.weakened?1-(actor.weakenStrength||.25):1)*early));
};
vkApplyCard=function(b,c,sideName){
 const actor=b[sideName],target=b[sideName==='hero'?'enemy':'hero'],u=fusionActive(actor),v=fusionActive(target);if(!u||!c||c.cost>actor.energy||(c.element&&c.element!==u.element)||!supported.has(c.effect))return false;
 actor.energy-=c.cost;const raw=()=>vkRawCardDamage(b,c,sideName),prefix=sideName==='hero'?'🟢 Du':'🔴 Gegner';
 if(['strike','pierce','dot','drain'].includes(c.effect)){
  const hit=applyHit(b,c,sideName,raw());
  if(c.effect==='dot'&&!hit.dodged&&v?.hp>0)v.dot={damage:Math.max(v.dot?.damage||0,Math.max(1,Math.round(raw()*.22))),turns:Math.max(v.dot?.turns||0,2)};
  if(c.effect==='drain')u.hp=Math.min(u.max,u.hp+Math.ceil(hit.dealt*.40));
 }else if(c.effect==='mend'){const n=Math.min(u.max-u.hp,support(c,u,'heal'));u.hp+=n;b.log.push(prefix+' · '+c.name+': +'+n+' LP');}
 else if(c.effect==='ward'){const n=addShield(actor,u,support(c,u,'shield'));b.log.push(prefix+' · '+c.name+': +'+n+' Schild');}
 else if(c.effect==='stun'){
  const hit=applyHit(b,c,sideName,Math.max(1,Math.round(raw()*.45)));const chance=[.30,.35,.40,.50,.60][r(c)];
  if(!hit.dodged&&!target.stunGuard&&Math.random()<chance){target.stun=1;target.stunGuard=2;b.log.push('⚡ Eine Runde betäubt.')}else b.log.push('⚡ Betäubung abgewehrt oder fehlgeschlagen.');
 }else if(c.effect==='weaken'){target.weakened=Math.max(target.weakened||0,c.power);target.weakenStrength=Math.max(target.weakenStrength||0,.20+.025*r(c));}
 else if(c.effect==='weave')actor.energyBonus=Math.min(3,(actor.energyBonus||0)+c.power);
 else if(c.effect==='rally'){const n=Math.max(0,Math.min(c.power,10-(u.rallyBonus||0),30-u.atk));u.atk+=n;u.rallyBonus=(u.rallyBonus||0)+n;}
 else if(c.effect==='reflect'){actor.reflect=Math.max(actor.reflect||0,Math.round(support(c,u,'shield')*.75));addShield(actor,u,Math.round(support(c,u,'shield')*.5));}
 else if(c.effect==='dodge')actor.dodge=Math.min(3,(Number(actor.dodge)||0)+c.power);
 else if(c.effect==='draw'){
  if(sideName==='hero')fusionDraw(b,Math.min(c.power,10-b.hand.length));
  else{actor.hand=actor.hand||[];for(let i=0;i<c.power&&actor.hand.length<10;i++){if(!actor.cardDeck?.length)actor.cardDeck=fusionEnemyShuffle((actor.cardDiscard||[]).splice(0));if(!actor.cardDeck.length)break;actor.hand.push(actor.cardDeck.pop())}}
 }else if(c.effect==='handboost'){if(sideName==='hero')b.handLimit=Math.min(9,b.handLimit+c.power);else actor.handLimit=Math.min(9,(actor.handLimit||5)+c.power);}
 else if(c.effect==='cleanse'){u.dot=null;actor.weakened=0;actor.weakenStrength=0;actor.stun=0;actor.vulnerable=0;actor.vulnerableScale=0;u.hp=Math.min(u.max,u.hp+Math.max(1,Math.round(support(c,u,'heal')*.4)));}
 else if(c.effect==='renew')u.renew={heal:Math.max(u.renew?.heal||0,Math.max(1,Math.round(support(c,u,'heal')*.65))),turns:2};
 else if(c.effect==='expose'){target.vulnerable=Math.max(target.vulnerable||0,c.power);target.vulnerableScale=Math.max(target.vulnerableScale||0,.20+.03*r(c));}
 else if(c.effect==='purge'){target.ward=Math.max(0,(target.ward||0)-Math.round(support(c,u,'shield')*1.3));if(v){v.renew=null;if(v.rallyBonus){v.atk=Math.max(1,v.atk-v.rallyBonus);v.rallyBonus=0}}}
 addShield(actor,u,utilityShield(c));if(!['strike','pierce','dot','drain','mend','ward','stun'].includes(c.effect))b.log.push(prefix+' · '+c.name+': '+(VK_EFFECT_DE[c.effect]||c.effect));fusionCheck(b);return true;
};
function aiScore(c,b,sideName='enemy'){
 const actor=b[sideName],target=b[sideName==='hero'?'enemy':'hero'],u=fusionActive(actor),v=fusionActive(target);if(!u||!v)return -999;
 const raw=vkRawCardDamage(b,c,sideName),heal=support(c,u,'heal'),shield=support(c,u,'shield');let value=0;
 if(['strike','pierce','dot','drain'].includes(c.effect)){value=raw-(c.effect==='pierce'?Math.min(raw,(target.ward||0)*.2):Math.min(raw,target.ward||0));if(c.effect==='dot')value+=Math.round(raw*.22)*(v.dot?1:1.5);if(c.effect==='drain')value+=Math.min(u.max-u.hp,raw*.4);}
 else if(c.effect==='mend')value=Math.min(u.max-u.hp,heal)*1.1;
 else if(c.effect==='ward')value=Math.min(shield,Math.max(0,shieldCap(u)-(actor.ward||0)))*.85;
 else if(c.effect==='renew')value=u.renew?-5:Math.min(u.max-u.hp,heal*1.3)*.85;
 else if(c.effect==='cleanse')value=(u.dot?u.dot.damage*u.dot.turns:0)+(actor.stun?20:0)+(actor.weakened?8:0)+(actor.vulnerable?8:0)+Math.min(u.max-u.hp,heal*.4);
 else if(c.effect==='purge')value=Math.min(target.ward||0,shield*1.3)+(v.renew?v.renew.heal*v.renew.turns:0)+(v.rallyBonus||0)*3;
 else if(c.effect==='expose')value=target.vulnerable?-4:c.power*3.0;
 else if(c.effect==='weaken')value=target.weakened?-5:Math.min(3,c.power)*6;
 else if(c.effect==='weave')value=(actor.energyBonus||0)>=3?-20:b.round<=3?15*c.power:4*c.power;
 else if(c.effect==='rally')value=(u.rallyBonus||0)>=10||u.atk>=30?-20:c.power*(b.round<=4?5:2);
 else if(c.effect==='draw')value=actor.energy<=c.cost?-20:c.power*4;
 else if(c.effect==='handboost')value=(sideName==='hero'?b.handLimit:actor.handLimit||5)>=9?-20:b.round<=3?c.power*8:2;
 else if(c.effect==='reflect')value=(actor.reflect||0)>0?-4:shield*1.05;
 else if(c.effect==='dodge')value=(actor.dodge||0)>=2?-5:c.power*10;
 else if(c.effect==='stun')value=raw*.45+(target.stunGuard?0:15*[.30,.35,.40,.50,.60][r(c)]);
 return (value+utilityShield(c))/Math.max(1,c.cost);
}
vkEnemyScore=(c,b)=>aiScore(c,b,'enemy');
function enemyAct(b){
 const actor=b.enemy;actor.hand=actor.hand||[];actor.cardDiscard=actor.cardDiscard||[];if(fusionContext?.tutorial){const h=fusionActive(b.hero);if(h){h.hp=Math.max(0,h.hp-1);b.log.push('🎓 Trainingshieb: 1 Schaden')}fusionCheck(b);return}
 if(actor.stun){const i=(actor.hand||[]).findIndex(id=>{const c=DD.BYID[id];return c?.effect==='cleanse'&&c.cost<=actor.energy&&(!c.element||c.element===fusionActive(actor)?.element)});if(i<0){actor.stun=0;b.log.push('⚡ Gegner setzt diese Runde aus.');return}const id=actor.hand[i];vkApplyCard(b,DD.BYID[id],'enemy');actor.hand.splice(i,1);actor.cardDiscard.push(id)}
 for(let count=0;count<10&&!b.winner;count++){
  const unit=fusionActive(actor);const choices=(actor.hand||[]).map((id,i)=>({c:DD.BYID[id],i})).filter(x=>x.c&&x.c.cost<=actor.energy&&(!x.c.element||x.c.element===unit?.element));choices.sort((a,z)=>aiScore(z.c,b)-aiScore(a.c,b));if(!choices.length||aiScore(choices[0].c,b)<=0)break;
  const pick=choices[0];if(!vkApplyCard(b,pick.c,'enemy'))break;actor.hand.splice(pick.i,1);actor.cardDiscard.push(pick.c.id);
 }
}
vkTickDot=function(b,sideName){const unit=fusionActive(b[sideName]);if(!unit||unit.hp<=0)return;
 if(unit.dot){const n=Math.min(unit.hp,unit.dot.damage);unit.hp-=n;unit.dot.turns--;b.log.push('🔥 '+displayName(unit.m)+': '+n+' Nachwirkung');if(!unit.dot.turns)unit.dot=null;}
 if(unit.renew&&unit.hp>0){const n=Math.min(unit.max-unit.hp,unit.renew.heal);unit.hp+=n;unit.renew.turns--;b.log.push('🌱 '+displayName(unit.m)+': +'+n+' Regeneration');if(!unit.renew.turns)unit.renew=null;}
};
fusionResolveTurn=function(){
 const b=fusionBattle;if(!b||b.winner)return;
 if(b.hero.stun)b.hero.stun=0;
 if(b.hero.weakened>0){b.hero.weakened--;if(!b.hero.weakened)b.hero.weakenStrength=0}
 enemyAct(b);
 if(b.enemy.weakened>0){b.enemy.weakened--;if(!b.enemy.weakened)b.enemy.weakenStrength=0}
 vkTickDot(b,'enemy');vkTickDot(b,'hero');fusionCheck(b);
 for(const side of[b.hero,b.enemy])if(side.stunGuard>0)side.stunGuard--;
 b.enemy.cardDiscard=(b.enemy.cardDiscard||[]).concat(b.enemy.hand||[]);b.enemy.hand=[];b.enemy.plan=[];
 if(!b.winner){b.round++;b.hero.energy=Math.min(9,3+(b.hero.energyBonus||0));b.hero.switchUsed=false;fusionDraw(b,Math.max(0,b.handLimit-b.hand.length));fusionPlanEnemy(b)}renderFusionBattle();
};
function context(c,b,sideName){if(b)return{b,side:b[sideName],u:fusionActive(b[sideName])};let u=data.team.length?fusionUnit(active()):{atk:5,max:60,hp:60,level:5,element:c.element||'Normal',damageScale:1};u={...u,hp:0};const other={...u,hp:99999,max:99999,element:'Normal'};const mock={hero:{team:[u],active:0,energy:9,ward:0},enemy:{team:[other],active:0,energy:9,ward:0}};return{b:mock,side:mock.hero,u};}
window.vkCardEffectText=function(c,b=null,sideName='hero'){
 const q=context(c,b,sideName),u=q.u;if(!u)return c.desc||'';const extra=utilityShield(c)?' · +'+utilityShield(c)+' Schild':'';const heal=support(c,u,'heal'),shield=support(c,u,'shield');
 if(['strike','pierce','dot','drain'].includes(c.effect)){const n=vkRawCardDamage(q.b,c,b?sideName:'hero');return '💥 ca. '+n+' Schaden'+(c.effect==='pierce'?' · 80 % Schilddurchdringung':c.effect==='dot'?' · 2× '+Math.max(1,Math.round(n*.22))+' Nachwirkung':c.effect==='drain'?' · 40 % Lebensentzug':'');}
 return ({mend:'♥ bis '+heal+' Heilung',ward:'🛡 '+shield+' Schild',stun:'⚡ '+Math.round([.30,.35,.40,.50,.60][r(c)]*100)+' % Betäubung · Trefferschaden',weaken:'❄ −'+Math.round((.20+.025*r(c))*100)+' % Schaden für '+c.power+' eigene Runde(n)',weave:'◆ +'+c.power+' Energie ab nächster Runde (max. +3)',rally:'⚔ +'+c.power+' Angriff für diesen Kampf (Bonus max. +10)',reflect:'🛡 '+Math.round(shield*.5)+' Schutz · bis '+Math.round(shield*.75)+' Gegenschaden',dodge:'💨 '+c.power+' Angriff(e) ausweichen',draw:'🃏 '+c.power+' Karten ziehen (bis 9 gleichzeitig)',handboost:'🃏 Starthand +'+c.power+' für diesen Kampf (bis 9)',cleanse:'✦ Negative Effekte entfernen · bis '+Math.round(heal*.4)+' LP',renew:'🌱 2× bis '+Math.round(heal*.65)+' Regeneration',expose:'🎯 +'+Math.round((.20+.03*r(c))*100)+' % Schaden für '+c.power+' Treffer',purge:'✧ Bis '+Math.round(shield*1.3)+' Schild, Angriffsstärkungen und Regeneration entfernen'}[c.effect]||c.desc)+extra;
};
const originalFc=fc;fc=function(c){let html=originalFc(c);if(c?.kind==='spell')html=html.replace(/<div class="fusionStats">[\s\S]*?<\/div>/,'<div class="fusionStats"><span>'+fesc(vkCardEffectText(c))+'</span></div>');return html};
fusionCategory=c=>['strike','pierce','dot','drain'].includes(c.effect)?'attacks':'spells';
const originalCardArt=vaelkorCardArt;vaelkorCardArt=function(c){if(!['cleanse','renew','expose','purge'].includes(c.effect))return originalCardArt(c);const colors=fpal(c.element);const icon={cleanse:'<path d="M90 20 140 64 124 132 90 152 56 132 40 64Z"/><path d="M65 86 83 105 116 67"/>',renew:'<path d="M42 128Q25 55 141 28Q147 126 60 142Z"/><path d="M90 64v65M58 97h64"/>',expose:'<circle cx="90" cy="88" r="48"/><circle cx="90" cy="88" r="17"/><path d="M90 16v40M90 120v40M18 88h40M122 88h40"/>',purge:'<path d="M90 20 145 44 133 111 90 153 47 111 35 44Z"/><path d="M122 24 79 77 104 84 61 147"/>'}[c.effect];return '<svg viewBox="0 0 180 175" aria-hidden="true"><g fill="'+colors[0]+'" fill-opacity=".30" stroke="'+colors[1]+'" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">'+icon+'</g></svg>'};
window.VaelkorCards={version:81,hit:applyHit,added:newCards.length,effects:[...supported],score:aiScore,support,normalize,mult,audit:()=>({spells:DD.CARDS.filter(c=>c.kind==='spell'&&!c.teamAttack).length,byElement:Object.fromEntries([...ELEMENTS,null].map(e=>[e||'Neutral',DD.CARDS.filter(c=>c.kind==='spell'&&!c.teamAttack&&c.element===e).length]))})};
})();
