// BEGIN VAELKOR NPC TRAVEL v138
const vkNPCTripPaths139=new WeakMap(),vkNPCLanes139=new WeakMap();
function vkNPCTrip138(role,s,home,guest,current,elapsed){
 const remote=current==='main:1'?'property:gruenwald':'main:1',port=Object.keys(vkWildSpec.exits).find(k=>vkWildSpec.exits[k].mapId===remote),edge=vkWildExits[port];
 if((s.fromEdge||s.toEdge)&&!edge)return{arrived:false,npc:null};
 const a=s.fromEdge?edge:vkDoorPoint101(s.stage==='return'?guest:home),z=s.toEdge?edge:vkDoorPoint101(s.stage==='return'?home:guest),mid=current==='property:gruenwald'?{x:15.5,y:12.5}:{x:15.5,y:22.5};
 const room=interior;let path;try{interior=null;const first=vkNPCRoute127({x:a.x,y:a.y+(s.fromEdge||s.settlementGuest174?0:1)},mid),second=vkNPCRoute127(mid,{x:z.x,y:z.y});let pairs=vkNPCTripPaths139.get(first);if(!pairs){pairs=new WeakMap();vkNPCTripPaths139.set(first,pairs);}path=pairs.get(second);if(!path){path=[...first,...second].filter((v,i,rows)=>!i||v.x!==rows[i-1].x||v.y!==rows[i-1].y);pairs.set(second,path);}}finally{interior=room;}if(!path.length)return{arrived:false,npc:null};
 const speed=s.tripSeconds?Math.max(1.8,(path.length-1)/Math.max(1,s.tripSeconds-3.5)):1.8,center=Math.max(0,path.findIndex(q=>q.x===mid.x&&q.y===mid.y)),seconds=Math.max(0,Math.min(1,Number(s.progress)||0))*(s.tripSeconds||(s.stage==='return'?40:50)),arrival=center/speed,pause=3.5,age=seconds-arrival,paused=age>=0&&age<pause,travel=seconds>arrival?Math.max(arrival,seconds-pause):seconds,pos=Math.min(path.length-1,travel*speed);
 if(pos>=path.length-1&&!s.toEdge)return{arrived:true,npc:null};
 const i=Math.floor(pos),u=path[i],v=path[Math.min(i+1,path.length-1)],f=pos-i,dx=v.x-u.x,dy=v.y-u.y;let x=u.x+dx*f,y=u.y+dy*f,moving=!paused,facing=Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy<0?'up':'down';
 if(f<1e-6&&i>0){const previous=path[i-1],dx=u.x-previous.x,dy=u.y-previous.y;facing=Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy<0?'up':'down';}
 // Ease into a passing lane over several forward steps, not a sideways
 // step out followed by a step backwards when a conversation ends.
 const index=[...vkCycle127.roles,...(vkCycle127.staffRoles||[])].filter(r=>r.mapId===current||r.id==='wizard'&&current==='property:gruenwald').findIndex(r=>r.id===role.id),offset={x:index%2?.65:-.65,y:Math.floor(index/2)%2?.45:-.45},weight=s.settlementGuest174?0:Math.max(0,1-Math.abs(pos-center)/3);
 let lanes=vkNPCLanes139.get(path);if(!lanes){lanes=new Map();vkNPCLanes139.set(path,lanes);}if(!lanes.has(index)){let clear=true;for(let n=Math.max(0,center-3);n<=Math.min(path.length-1,center+3);n+=.2){const i=Math.floor(n),a=path[i],b=path[Math.min(i+1,path.length-1)],f=n-i,w=Math.max(0,1-Math.abs(n-center)/3);if(!pass(a.x+(b.x-a.x)*f+offset.x*w,a.y+(b.y-a.y)*f+offset.y*w)){clear=false;break;}}lanes.set(index,clear);}
 if(weight&&lanes.get(index)){x+=offset.x*weight;y+=offset.y*weight;}
 if(paused){moving=false;facing=offset.x>0?'left':'right';}

 return{arrived:false,npc:{...role,x,y,facing,moving,gaitDistance:pos,inside:false,talking:paused&&!moving,talkAge:paused?age*1000:0}};
}
const vkIndoorWalks139=new WeakMap();
function vkIndoorWalk139(plan,id,anchor,elapsed){
 let cache=vkIndoorWalks139.get(plan);if(!cache){cache=new Map();vkIndoorWalks139.set(plan,cache);}let route=cache.get(id);
 if(!route){route=[];let best=0;const clear=(a,b)=>{const n=Math.ceil(Math.hypot(b.x-a.x,b.y-a.y)*5);for(let i=0;i<=n;i++)if(!vkInteriorPass91(a.x+(b.x-a.x)*i/n,a.y+(b.y-a.y)*i/n))return false;return true;};
  for(const w of[4,3,2])for(const h of[3,2,1])for(const dx of[1,-1])for(const dy of[1,-1]){if(w*h<=best)continue;const corners=[anchor,{x:anchor.x+dx*w,y:anchor.y},{x:anchor.x+dx*w,y:anchor.y+dy*h},{x:anchor.x,y:anchor.y+dy*h}];if(corners.every((a,i)=>clear(a,corners[(i+1)%4]))){route=corners;best=w*h;}}
  cache.set(id,route);
 }
 if(!route.length)return{...anchor,moving:false,facing:'down',gaitDistance:0};
 const speed=1.15,pause=2.4,legs=route.map((a,i)=>Math.hypot(route[(i+1)%4].x-a.x,route[(i+1)%4].y-a.y)),duration=legs.reduce((sum,n)=>sum+n/speed+pause,0);let t=(elapsed/1000)%duration,walked=Math.floor(elapsed/1000/duration)*legs.reduce((a,b)=>a+b,0);
 for(let i=0;i<4;i++){const a=route[i],b=route[(i+1)%4],seconds=legs[i]/speed;if(t<=seconds+pause){const f=Math.min(1,t/seconds),dx=b.x-a.x,dy=b.y-a.y;return{x:a.x+dx*f,y:a.y+dy*f,moving:t<seconds,facing:Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up',gaitDistance:walked+legs[i]*f};}t-=seconds+pause;walked+=legs[i];}
 return{...anchor,moving:false,facing:'down',gaitDistance:walked};
}
// END VAELKOR NPC TRAVEL v138
