/* Active play time: twelve minutes of daylight and six minutes of night. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else{root.VaelkorDayCycle=api;api.install(root);}})(globalThis,function(){
 const DAY=720000,NIGHT=360000,CYCLE=DAY+NIGHT;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),smooth=t=>{t=clamp(t,0,1);return t*t*(3-2*t);};
 function state(elapsed=120000){elapsed=Math.max(0,Number(elapsed)||0);const t=elapsed%CYCLE,day=t<DAY,minute=(day?360+t/DAY*720:1080+(t-DAY)/NIGHT*720)%1440,hour=Math.floor(minute/60),phase=!day?'night':t<120000?'morning':t>=600000?'evening':'day';let night=day?Math.max(1-smooth(t/90000),smooth((t-630000)/90000)):1;return{elapsed,cycle:Math.floor(elapsed/CYCLE),phase,minute,hour,text:String(hour).padStart(2,'0')+':'+String(Math.floor(minute%60)).padStart(2,'0'),night,daylight:day,phaseMs:phase==='evening'?t-600000:phase==='night'?t-DAY:t};}
 const roles=[{id:'healer',name:'Heiltrank-Händlerin',home:'shop',guest:'east',mapId:'main:1'},{id:'cook',name:'Koch',home:'west',guest:'shop',mapId:'main:1'},{id:'material',name:'Materialhändler',home:'forge',guest:'west',mapId:'main:1'},{id:'joe',name:'Hillbilly Joe',home:'nursery',guest:'arena',mapId:'property:gruenwald'}, {id:'traveler',name:'Arena-Leiter',home:'arena',guest:'nursery',mapId:'property:gruenwald'},{id:'wizard',name:'Animux',home:'church',guest:'east',mapId:'main:1',night:true}];
 const staffRoles=[{id:'stable:luca',appearance:'luca',name:'Luca',home:'stable',guest:'nursery',mapId:'property:gruenwald',outdoorsWork:true},{id:'stable:erik',appearance:'erik',name:'Erik',home:'stable',guest:'arena',mapId:'property:gruenwald',outdoorsWork:true}];
 function activity(elapsed){const h=state(elapsed).hour;return h>=8&&h<18?'work':h>=22||h<4?'sleep':'social';}
 function schedule(id,elapsed){const r=[...roles,...staffRoles].find(r=>r.id===id);if(!r)return null;const s=state(elapsed),mode=activity(elapsed);
 // Animux keeps his existing evening visit to Joe and stays available at night.
 if(id==='wizard'){if(s.hour>=18&&s.hour<22){const age=(elapsed%CYCLE-DAY)%60000,visit={...r,mapId:'property:gruenwald',home:'arena',guest:'nursery'};return age<25000?{...visit,where:'outside',stage:'visit',progress:age/25000,tripSeconds:25}:age<35000?{...visit,where:'nursery',stage:'guest'}:{...visit,where:'outside',stage:'return',progress:(age-35000)/25000,tripSeconds:25};}if(s.phase==='night'||s.phase==='day')return{...r,where:r.home,stage:'home'};if(s.phase==='evening'){const t=s.phaseMs,visit={...r,mapId:'property:gruenwald',home:'arena',guest:'nursery'};return t<50000?{...visit,where:'outside',stage:'visit',progress:t/50000}:t<80000?{...visit,where:'nursery',stage:'guest'}:{...visit,where:'outside',stage:'return',progress:Math.min(1,(t-80000)/40000)};}}
 if(mode==='sleep')return{...r,where:null,stage:'sleep'};
 if(mode==='work')return{...r,where:r.outdoorsWork?'yard':r.home,stage:'home'};
 const t=elapsed%CYCLE,age=s.hour>=18?t-DAY:t>=1020000?t-1020000:t+60000,window=60000,u=age%window;
 if(u<25000)return{...r,where:'outside',stage:'visit',progress:u/25000,tripSeconds:25};
 if(u<35000)return{...r,where:r.guest,stage:'guest'};
 return{...r,where:'outside',stage:'return',progress:Math.min(1,(u-35000)/25000),tripSeconds:25};
 }

 // One deterministic round trip through the real connecting map edge. No duplicate actors.
 function settlementJourney(homeMap,home,guest,age){
  const remote=homeMap==='main:1'?'property:gruenwald':'main:1',u=((age%120000)+120000)%120000;
  if(u<25000)return{mapId:homeMap,where:'outside',stage:'visit',home,guest:home,toEdge:true,progress:u/25000,tripSeconds:25};
  if(u<50000)return{mapId:remote,where:'outside',stage:'visit',home:guest,guest,fromEdge:true,progress:(u-25000)/25000,tripSeconds:25};
  if(u<70000)return{mapId:remote,where:guest,stage:'guest',home:guest,guest,progress:(u-50000)/20000};
  if(u<95000)return{mapId:remote,where:'outside',stage:'return',home:guest,guest,toEdge:true,progress:(u-70000)/25000,tripSeconds:25};
  return{mapId:homeMap,where:'outside',stage:'return',home,guest:home,fromEdge:true,progress:(u-95000)/25000,tripSeconds:25};
 }
 function settlementSchedule(id,elapsed){
  const r=[...roles,...staffRoles].find(r=>r.id===id);if(!r||activity(elapsed)!=='social')return schedule(id,elapsed);
  const t=elapsed%CYCLE,age=state(elapsed).hour>=18?t-DAY:t>=1020000?t-1020000:t+60000;
  const localUntil=state(elapsed).hour>=18?60000:120000;if(age<localUntil)return schedule(id,elapsed);
  const guests={healer:'nursery',cook:'arena',material:'stable',joe:'west',traveler:'shop',wizard:'nursery','stable:luca':'east','stable:erik':'forge'};
  const trip=settlementJourney(r.mapId,r.home,guests[id],(age-localUntil)*2);return{...r,...trip,...(trip.tripSeconds?{tripSeconds:trip.tripSeconds/2}:{})};
 }
 function install(root){if(root.VaelkorClock)return;const doc=root.document;let total=Number.isFinite(Number(data.worldClock127?.elapsedMs))?Math.max(0,Number(data.worldClock127.elapsedMs)):120000,last=root.performance.now(),saved=0;data.worldClock127={version:1,elapsedMs:total};const frame=()=>doc.getElementById('vkIntegratedWorld');
 function tick(){const now=root.performance.now(),dt=clamp(now-last,0,5000);last=now;if(!doc.hidden)total+=dt;data.worldClock127.elapsedMs=total;const api=frame()?.contentWindow?.VaelkorLife127;api?.setTime(total);root.VaelkorNPC134?.tick(total);saved+=doc.hidden?0:dt;if(saved>=30000){saved=0;if(typeof vkPersistUnified==='function')vkPersistUnified();}return state(total);}
 root.VaelkorClock={state:()=>state(total),elapsed:()=>total,tick};root.setInterval(tick,1000);frame()?.addEventListener('load',()=>frame()?.contentWindow?.VaelkorLife127?.setTime(total));doc.addEventListener('visibilitychange',()=>{last=root.performance.now();if(doc.hidden&&typeof vkPersistUnified==='function')vkPersistUnified();});tick();
 }
 return{DAY,NIGHT,CYCLE,state,schedule,settlementSchedule,settlementJourney,activity,roles,staffRoles,install};
});
