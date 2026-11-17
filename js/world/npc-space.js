/* Shared foot-space reservations. Movement and interaction read the same resolved roster. */
(function(r,f){const a=f();if(typeof module==='object'&&module.exports)module.exports=a;else r.VaelkorNPCSpace175=a;})(globalThis,()=>{
 function create(){const tracks=new Map();let context='',last=-Infinity,cached=null,cachedRows=null;
  function reset(){tracks.clear();last=-Infinity;cached=cachedRows=null;}
  function sample(rows,{key,now,pass,gap=1.25,speed=2.1}={}){
   if(context!==key){reset();context=key;}if(last===now&&cachedRows===rows)return cached;
   const dt=Math.max(0,Math.min(1,(now-last)/1000)),jump=!Number.isFinite(last)||now<last||now-last>1500;if(jump)tracks.clear();
   const ids=new Set(rows.map(n=>n.id));for(const id of tracks.keys())if(!ids.has(id))tracks.delete(id);
   const ordered=[...rows].sort((a,b)=>(!!b.merchant-!!a.merchant)||String(a.id).localeCompare(String(b.id))),occupied=new Map();
   const free=(q,ignore)=>pass(q.x,q.y)&&[...occupied].every(([id,p])=>id===ignore||Math.hypot(q.x-p.x,q.y-p.y)>=gap-1e-6);
   const clear=(a,b)=>[.25,.5,.75,1].every(t=>pass(a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t));
   function spawn(n){if(free(n,n.id))return{x:n.x,y:n.y};for(let ring=1;ring<=6;ring++)for(let i=0;i<16;i++){const angle=i*Math.PI/8,q={x:n.x+Math.cos(angle)*gap*.55*ring,y:n.y+Math.sin(angle)*gap*.55*ring};if(free(q,n.id)&&(!pass(n.x,n.y)||clear(n,q)))return q;}return{x:n.x,y:n.y};}
   // Existing bodies reserve their current space before anyone advances.
   for(const n of ordered){const t=tracks.get(n.id);if(t&&pass(t.x,t.y))occupied.set(n.id,t);}
   for(const n of ordered)if(!occupied.has(n.id)){const q=spawn(n);tracks.set(n.id,{...q,travel:0});occupied.set(n.id,tracks.get(n.id));}
   const result=new Map();
   for(const n of ordered){const previous=tracks.get(n.id);occupied.delete(n.id);let q={x:previous.x,y:previous.y};const dx=n.x-q.x,dy=n.y-q.y,d=Math.hypot(dx,dy),step=Math.min(d,dt*speed),angle=Math.atan2(dy,dx);
    let avoidSign=previous.avoidSign||1,avoidUntil=previous.avoidUntil||0;
    if(n.moving&&step>1e-6){const turns=[0,avoidSign*Math.PI/4,avoidSign*Math.PI/2,...(now>=avoidUntil?[-avoidSign*Math.PI/4,-avoidSign*Math.PI/2]:[])];for(const turn of turns){const candidate={x:q.x+Math.cos(angle+turn)*step,y:q.y+Math.sin(angle+turn)*step};if(!free(candidate,n.id)||!clear(q,candidate))continue;q=candidate;if(turn){avoidSign=Math.sign(turn);avoidUntil=now+600;}break;}}
    // Resolve invalid starting reservations only into verified free floor.
    if(!free(q,n.id)){const candidate=spawn({...n,x:q.x,y:q.y});if(free(candidate,n.id))q=candidate;}
    const moved=Math.hypot(q.x-previous.x,q.y-previous.y),sourceSame=n.x===previous.sourceX&&n.y===previous.sourceY,sourceAt=sourceSame?previous.sourceAt:now,hold=!!n.moving&&sourceSame&&now-sourceAt<40&&previous.moving,moving=jump?!!n.moving:moved>1e-5||!!hold,look=moved>1e-5&&!jump?(Math.abs(q.x-previous.x)>Math.abs(q.y-previous.y)?q.x<previous.x?'left':'right':q.y<previous.y?'up':'down'):n.moving&&previous.facing?previous.facing:n.facing;
    const t={...q,travel:(previous.travel||0)+moved,sourceX:n.x,sourceY:n.y,sourceAt,moving,facing:look,avoidSign,avoidUntil};tracks.set(n.id,t);occupied.set(n.id,t);result.set(n.id,{...n,...q,moving,facing:look,gaitDistance:t.travel});
   }
   while(tracks.size>128)tracks.delete(tracks.keys().next().value);last=now;cachedRows=rows;cached=rows.map(n=>result.get(n.id)||n);return cached;
  }return{sample,reset,size:()=>tracks.size};
 }return{create};
});
