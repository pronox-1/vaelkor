/* Shared quadruped mannequin and distance-driven follower. Coordinates are measured in pose fractions. */
(function(r,f){const a=f();if(typeof module==='object'&&module.exports)module.exports=a;else r.VaelkorMountRig152=a;})(globalThis,()=>{
 const rigs={
 'horse-brown':{saddle:{left:[.59,.32],right:[.43,.32],down:[.5,.24],up:[.5,.28]}},
 'horse-white':{saddle:{left:[.59,.34],right:[.43,.34],down:[.5,.25],up:[.5,.29]}},
 bull:{saddle:{left:[.65,.37],right:[.35,.37],down:[.5,.29],up:[.5,.31]},mirrorRight:true,reverseSideFrames:[2,3]},
 donkey:{saddle:{left:[.60,.43],right:[.40,.43],down:[.5,.30],up:[.5,.32]},mirrorRight:true,reverseSideFrames:[2,3]},
 camel:{saddle:{left:[.62,.24],right:[.40,.24],down:[.5,.25],up:[.5,.29]}},
 zebra:{saddle:{left:[.57,.35],right:[.43,.35],down:[.5,.26],up:[.5,.30]},mirrorRight:true,reverseSideFrames:[2,3]}
 };
 function rig(id,facing='down'){const data=rigs[id]||rigs['horse-brown'];return{bodySplit:.64,stride:3.2,...data,id,facing,mirror:!!data.mirrorRight&&facing==='right',sourceFacing:data.mirrorRight&&facing==='right'?'left':facing,saddle:data.saddle[facing]||data.saddle.down};}
 function motion154(delta=[0,0],scale=1,gait=0,moving=false,mirror=false){return{paintX:0,paintY:0,saddleX:0,saddleY:0,lean:moving?.006*Math.sin(gait*Math.PI*2):0};}
 function facing(dx,dy,last='down'){return Math.hypot(dx,dy)<.04?last:Math.abs(dx)>Math.abs(dy)?dx<0?'left':'right':dy<0?'up':'down';}
 const distance=(a,b)=>Math.hypot(b.x-a.x,b.y-a.y);
 function follower(options={}){const pass=options.pass||(()=>true),route=options.route||((a,b)=>[a,b]);let nodes=[],total=0,progress=0,travelled=0,pos=null,moving=false,look='down';
  function append(p){if(!Number.isFinite(p.x+p.y))return;if(!nodes.length){nodes.push({...p,s:0});return;}const last=nodes.at(-1),d=distance(last,p);if(d<.0001)return;total+=d;const prev=nodes.at(-2);if(prev&&Math.abs((last.x-prev.x)*(p.y-last.y)-(last.y-prev.y)*(p.x-last.x))<1e-7&&(last.x-prev.x)*(p.x-last.x)+(last.y-prev.y)*(p.y-last.y)>=0&&last.s>progress+.1)nodes[nodes.length-1]={...p,s:total};else nodes.push({...p,s:total});}
  function reset(points){nodes=[];total=progress=travelled=0;moving=false;for(const p of points||[])append(p);pos=nodes[0]?{x:nodes[0].x,y:nodes[0].y}:null;}
  function point(s){for(let i=1;i<nodes.length;i++)if(nodes[i].s>=s){const a=nodes[i-1],b=nodes[i],t=(s-a.s)/Math.max(.0001,b.s-a.s);return{x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t};}return nodes.length?{x:nodes.at(-1).x,y:nodes.at(-1).y}:null;}
  function update(player,dt,gap=2.4,speed=5.56){if(!pos){reset([player]);return read(player);}const last=nodes.at(-1);if(distance(last,player)>.005){const direct=[.25,.5,.75,1].every(t=>pass(last.x+(player.x-last.x)*t,last.y+(player.y-last.y)*t));const path=direct?[player]:route(last,player);for(const p of path||[])append(p);}
   const target=Math.max(0,total-gap);let advance=Math.min(Math.max(0,target-progress),Math.max(0,Math.min(.12,dt))*speed*(target-progress>1?1.3:1));const corner=nodes.find(n=>n.s>progress+.0001);if(corner)advance=Math.min(advance,corner.s-progress);const next=point(progress+advance);moving=false;
   if(next&&advance>.0001){if([.25,.5,.75,1].every(t=>pass(pos.x+(next.x-pos.x)*t,pos.y+(next.y-pos.y)*t))){progress+=advance;travelled+=advance;pos=next;moving=true;}else{const path=route(pos,player);if(path?.length>1){const keep=travelled;reset([{...pos},...path]);travelled=keep;}}}
   while(nodes.length>2&&nodes[1].s<progress-.1)nodes.shift();if(nodes.length>256){const path=route(pos,player);if(path?.length>1){const keep=travelled;reset([{...pos},...path]);travelled=keep;}}
   look=facing(player.x-pos.x,player.y-pos.y,look);return read(player);
  }
  function read(player){if(pos&&player)look=facing(player.x-pos.x,player.y-pos.y,look);return pos?{...pos,moving,facing:look,gaitDistance:travelled/3.2,pathNodes:nodes.length}:null;}
  return{reset,update,read};
 }
 return{version:152,rig,rigs,motion154,facing,follower};
});
