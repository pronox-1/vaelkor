// BEGIN VAELKOR NPC TRAVEL v138
function vkNPCTrip138(role,s,home,guest,current,elapsed){
 const a=vkDoorPoint101(s.stage==='return'?guest:home),z=vkDoorPoint101(s.stage==='return'?home:guest),mid=current==='property:gruenwald'?{x:15.5,y:12.5}:{x:15.5,y:22.5};
 const room=interior;let path;try{interior=null;path=[...vkNPCRoute127({x:a.x,y:a.y+1},mid),...vkNPCRoute127(mid,{x:z.x,y:z.y})].filter((v,i,rows)=>!i||v.x!==rows[i-1].x||v.y!==rows[i-1].y);}finally{interior=room;}if(!path.length)return{arrived:false,npc:null};
 const speed=1.8,center=Math.max(0,path.findIndex(q=>q.x===mid.x&&q.y===mid.y)),seconds=Math.max(0,Math.min(1,Number(s.progress)||0))*(s.stage==='return'?40:50),arrival=center/speed,pause=3.5,age=seconds-arrival,paused=age>=0&&age<pause,travel=seconds>arrival?Math.max(arrival,seconds-pause):seconds,pos=Math.min(path.length-1,travel*speed);
 if(pos>=path.length-1)return{arrived:true,npc:null};
 const i=Math.floor(pos),u=path[i],v=path[Math.min(i+1,path.length-1)],f=pos-i,dx=v.x-u.x,dy=v.y-u.y;let x=u.x+dx*f,y=u.y+dy*f,moving=!paused,facing=Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy<0?'up':'down';
 if(paused){const index=vkCycle127.roles.filter(r=>r.mapId===current||r.id==='wizard'&&current==='property:gruenwald').findIndex(r=>r.id===role.id),offset={x:index%2?.65:-.65,y:Math.floor(index/2)%2?.45:-.45},weight=Math.min(1,age/.4,(pause-age)/.4);if([.25,.5,.75,1].every(t=>pass(mid.x+offset.x*t,mid.y+offset.y*t))){x+=offset.x*Math.max(0,weight);y+=offset.y*Math.max(0,weight);}moving=age<.4||age>pause-.4;facing=offset.x>0?'left':'right';if(moving&&age<.4)facing=offset.x>0?'right':'left';}
 return{arrived:false,npc:{...role,x,y,facing,moving,gaitDistance:pos+(paused?Math.min(age,.4)*2:0),inside:false,talking:paused&&!moving,talkAge:paused?age*1000:0}};
}
// END VAELKOR NPC TRAVEL v138
