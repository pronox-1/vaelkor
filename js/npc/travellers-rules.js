/* Deterministic visits, pinned return destinations and one-time quest/duel rewards. */
(function(r,f){const api=f(typeof module==='object'&&module.exports?require('../world/day-cycle.js'):r.VaelkorDayCycle);if(typeof module==='object'&&module.exports)module.exports=api;else r.VaelkorTravellerRules149=api;})(globalThis,(clock)=>{
 const DAY=1080000,REGIONS=['forest','desert','volcano','snow','jungle','mushroom','swamp'];
 function hash(s){let n=2166136261;for(const c of String(s))n=Math.imul(n^c.charCodeAt(0),16777619);return n>>>0;}
 function settlement(level,biome){const n=Math.max(1,Number(level)||1),start=Math.floor(n/70)*70,index=REGIONS.indexOf(biome);if(index===0)return 'main:'+(start||1);const town=start+index*10;return'main:'+Math.max(1,town);}
 function create(data,catalog,h){data.npc149=data.npc149||{};const s=data.npc149;s.version=1;s.quests=s.quests||{};s.duels=s.duels||{};s.guests=Array.isArray(s.guests)?s.guests:[];s.revision=s.revision||0;const profiles=Object.values(catalog.profiles),get=id=>catalog.profiles[id],time=()=>Math.max(0,h.time()),cycle=()=>Math.floor(time()/DAY),changed=()=>{s.revision++;h.persist?.();};
  // Older saves could retain all three contestants. Keep one without extending the deadline.
  if(s.guestPolicy179!==1){const live=s.guests.filter(g=>g.until>time()&&get(g.profile)?.trainer).sort((a,b)=>b.until-a.until||String(a.profile).localeCompare(String(b.profile)));s.guests=live.slice(0,1);s.guestPolicy179=1;s.revision++;}
  function rows(scene){const visualTime=Number.isFinite(scene.elapsed)?Math.max(time(),Math.min(time()+1500,scene.elapsed)):time(),out=[],town=settlement(scene.level,scene.biome),current=scene.id;const add=(p,id,extra={})=>{if(!p||out.some(a=>a.id===id))return;out.push({id,name:p.name,appearance:p.id,biome:p.biome,service:p.service,trainer:p.trainer,homeMap:town,...extra});};
   if(scene.town&&['desert','snow','swamp'].includes(scene.biome))for(const p of profiles.filter(p=>p.biome===scene.biome&&p.service))add(p,'resident:'+current+':'+p.id,{homeMap:current,resident:true});
   for(const q of Object.values(s.quests))if(q.stage==='active'&&q.returnMap===current)add(get(q.profile),q.npcId,{homeMap:q.returnMap,pinned:true,visitor:q.visitor});
   for(const g of s.guests)if(g.until>visualTime){
    const home=g.mapId||'main:1',trip=clock?.settlementJourney?.(home,'arena','arena',visualTime-(g.until-DAY)),mapId=trip?.mapId||home;
    if(mapId===current)add(get(g.profile),g.id,{homeMap:home,name:g.name||get(g.profile)?.name,level:g.level,tournamentGuest:true,settlementTrip:trip});
   }
   if(scene.level<2||current==='property:gruenwald')return out;
   const seed=hash(current+':'+cycle()+':149'),local=profiles.filter(p=>!p.service&&!p.trainer&&p.biome===scene.biome),away=profiles.filter(p=>!p.service&&!p.trainer&&p.biome!==scene.biome),trainers=profiles.filter(p=>p.trainer),wanted=[];
   if(scene.town){if(local.length)wanted.push(local[seed%local.length]);if(seed%13===0)wanted.push(away[(seed>>>5)%away.length]);}
   else{if(seed%10<4&&local.length)wanted.push(local[(seed>>>3)%local.length]);if(seed%7===0)wanted.push(trainers[(seed>>>8)%trainers.length]);if(seed%37===0)wanted.push(away[(seed>>>12)%away.length]);}
   for(const p of wanted){const id='visitor:'+p.id,q=s.quests[id];if(q?.stage==='active')continue;add(p,id,{visitor:p.biome!==scene.biome&&!p.trainer,homeMap:town});}return out.slice(0,14);
  }
  function quest(id){return s.quests[id]||null;}
  function offer(actor){const q=quest(actor.id);return !actor.service&&!actor.trainer&&(!q||q.stage==='done'&&time()-q.completedAt>=DAY);}
  function ready(id){const q=quest(id);if(q?.stage!=='active')return false;return q.kind==='duels'?(s.duelWins||0)-q.baseline>=q.count:(h.items()[q.kind]||0)>=q.count;}
  function accept(actor){if(!offer(actor))return false;const n=hash(actor.id+':'+cycle()),kinds=['berries','stones','duels'],kind=kinds[n%3];s.quests[actor.id]={id:actor.id,npcId:actor.id,profile:actor.appearance,stage:'active',kind,count:kind==='duels'?1+n%2:3+n%4,baseline:s.duelWins||0,returnMap:actor.homeMap,visitor:!!actor.visitor,startedAt:time(),reward:80+Math.min(200,Math.floor(Number(actor.homeMap.split(':')[1])||1)*3)};changed();return s.quests[actor.id];}
  function turnIn(id,map){const q=quest(id);if(!q||q.returnMap!==map||!ready(id))return false;if(q.kind!=='duels'){const items=h.items();if(items[q.kind]<q.count)return false;items[q.kind]-=q.count;}data.coins+=q.reward;q.stage='done';q.completedAt=time();changed();return q.reward;}
  function duelAllowed(id){const d=s.duels[id];return!d||time()-d.at>=(d.won?DAY:60000);}
  function duel(id,won){if(!duelAllowed(id))return false;s.duels[id]={at:time(),won:!!won};if(won){s.duelWins=(s.duelWins||0)+1;s.guests=s.guests.filter(g=>g.id!==id);}changed();return true;}
  function guests(roster,key){if(s.lastTournament===key)return false;s.lastTournament=key;const candidates=roster.filter(r=>get(r.appearance)?.trainer).slice().sort((a,b)=>a.appearance.localeCompare(b.appearance)),r=candidates.length?candidates[hash(key)%candidates.length]:null,now=time();s.guests=r?[{id:'guest:'+r.appearance,profile:r.appearance,name:r.name,mapId:'main:1',level:r.team?.[0]?.lv||5,until:now+DAY}]:[];if(r)delete s.duels['guest:'+r.appearance];changed();return true;}

  return{state:s,rows,quest,offer,ready,accept,turnIn,duelAllowed,duel,guests,indicator:actor=>ready(actor.id)?'gold':offer(actor)?'blue':null};
 }
 return{DAY,REGIONS,hash,settlement,create};
});
