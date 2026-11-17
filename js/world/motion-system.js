/* VAELKOR motion contract v164. No source-art cutting, invented limbs or render-time clock. */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./quadruped-walk.js'):root.VaelkorQuadruped165);if(typeof module==='object'&&module.exports)module.exports=api;else root.VaelkorMotion164=api;})(globalThis,(quadruped)=>{
 const directions=Object.freeze(['down','left','right','up']),slots=Object.freeze(['stand','leftStep','stand','rightStep']);
 const rigs=Object.freeze({human:Object.freeze({stride:2.0,strideByView:{outdoor:2.0,indoor:2.4},height:{outdoor:34,indoor:60},legs:2}),quadruped:Object.freeze({stride:3.2,minCycleMs:850,height:{outdoor:41,indoor:70},legs:4})});
 const strideFor=(kind,view='outdoor')=>rigs[kind]?.strideByView?.[view]||rigs[kind]?.stride||2;
 const direction=d=>directions.includes(d)?d:'down';
 function at(distance,moving,stride=1,kind='human'){if(kind==='quadruped')return quadruped.sample(distance,moving,stride);const phase=moving?Math.floor(Math.max(0,distance)/stride*4+1e-7)%4:0;return Object.freeze({phase,slot:slots[phase],index:phase%2?phase:0,stand:phase%2===0,moving:!!moving});}
 function create({limit=128}={}){const tracks=new Map();let scene='';
  function store(id,row){tracks.delete(id);tracks.set(id,row);while(tracks.size>limit)tracks.delete(tracks.keys().next().value);return row.pose;}
  function reset(next=''){tracks.clear();scene=next;}
  function advanceDistance(id,distance,moving,stride=1,kind='human'){distance=Number.isFinite(distance)?distance:0;let t=tracks.get(id);if(!t||!moving||!t.moving||distance<t.last-1e-6||distance-t.last>3)t={origin:distance};return store(id,{...t,last:distance,moving:!!moving,pose:at(distance-t.origin,moving,stride,kind)});}
  function advance({id,x,y,moving,facing='down',kind='human',view='outdoor',stamp,timeMs,retainMotion=false,cadence=1,appearance,quadrupedStride,context=scene}){
   if(context!==scene)reset(context);if(!Number.isFinite(x+y))throw Error('Motion requires finite world coordinates');let t=tracks.get(id);
   if(t&&stamp!==undefined&&stamp===t.stamp)return t.pose;
   // Cached NPC snapshots can be painted more than once. Only their movement owner stops the gait.
   // The player retains its approved position-driven behavior unless explicitly opted in.
   const d=t?Math.hypot(x-t.x,y-t.y):0,teleported=d>2,walking=!!moving&&(!t||d>1e-5||retainMotion&&t.moving),travel=walking&&t?.moving&&!teleported?(t.travel||0)+d:0;
   // Position delta owns facing while translating; input-facing is used only at rest/turns.
   const dx=t?x-t.x:0,dy=t?y-t.y:0,keepAxis=kind==='human'&&retainMotion&&t?.moving&&Math.min(Math.abs(dx),Math.abs(dy))>1e-6&&Math.max(Math.abs(dx),Math.abs(dy))/Math.min(Math.abs(dx),Math.abs(dy))<1.2;
   const face=d>1e-5&&!teleported?keepAxis?(['left','right'].includes(t.pose.facing)?dx<0?'left':'right':dy<0?'up':'down'):(Math.abs(x-t.x)>Math.abs(y-t.y)?x<t.x?'left':'right':y<t.y?'up':'down'):retainMotion&&walking&&t?.moving&&!teleported?t.pose.facing:direction(facing);
   // Fast mounted translation must not turn the authored WALK into a frantic run.
   // Cached duplicate samples spend no animation time; only real movement consumes it.
   const dt=Number.isFinite(timeMs)&&Number.isFinite(t?.movedAt)?Math.max(0,timeMs-t.movedAt):null;
   const rate=kind==='quadruped'?Math.max(1,Math.min(1.25,Number(cadence)||1)):1;
   const step=kind==='quadruped'?Math.min(d,dt!==null?dt*strideFor(kind,view)/rigs.quadruped.minCycleMs:d)*rate:d;
   const poseTravel=walking&&t?.moving&&!teleported?(t.poseTravel??t.travel??0)+step:0;
   const movedAt=!t||!walking||!t.moving||d>1e-5?timeMs:t.movedAt;
   const trotSide=kind==='quadruped'&&quadruped.trotTemplate.sideDirections.includes(face);
   const sampled=trotSide?quadruped.trotSample(travel,walking,Number.isFinite(quadrupedStride)&&quadrupedStride>0?quadrupedStride:quadruped.trotTemplate.stride):kind==='quadruped'&&Number.isFinite(timeMs)&&['left','right'].includes(face)?quadruped.sideSample(poseTravel,walking,strideFor(kind,view)):at(kind==='quadruped'?poseTravel:travel,walking,strideFor(kind,view),kind);
   const pose=Object.freeze({...sampled,facing:face,kind,travel,...(kind==='quadruped'?{animationDistance:trotSide?travel:poseTravel}:{})});return store(id,{x,y,moving:walking,travel,poseTravel,movedAt,stamp,pose});
  }
  return{advance,advanceDistance,read:id=>tracks.get(id)?.pose||null,reset,size:()=>tracks.size};
 }
 // Named joints form the common mannequin. Skin layers attach to these joints, not cropped guessed body regions.
 function skeleton(kind='human',facing='down',slot='stand'){
  const side=facing==='left'||facing==='right',sign=facing==='left'||facing==='up'?-1:1,step=slot==='leftStep'?1:slot==='rightStep'?-1:0,p={root:[.5,1]},bones=[];
  const add=(name,v)=>{p[name]=v;return v;},bone=(a,b)=>bones.push([a,b]);
  if(kind==='quadruped'){
   add('pelvis',side?[.68,.58]:[.5,.45]);add('chest',side?[.32,.56]:[.5,.56]);add('neck',side?[.24,.39]:[.5,.39]);add('head',side?[.17,.28]:[.5,.25]);add('saddle',[.52,.45]);bone('pelvis','chest');bone('chest','neck');bone('neck','head');
   for(const[n,x,offset]of[['rearFar',.68,1],['frontFar',.32,-1],['rearNear',.68,-1],['frontNear',.32,1]]){const footPose=String(slot).startsWith('walk')?(side?quadruped.trotSample(Number(slot.slice(4))/8*quadruped.trotTemplate.stride,true).contacts:quadruped.contactsForFrame(Number(slot.slice(4)))).find(l=>l.id===n):null,k=footPose?footPose.x*2:step*offset,front=n.startsWith('front'),hip=front?'chest':'pelvis',sx=side?x:n.endsWith('Near')?.64:.36,ground=side?1:(front===(facing==='down')?1:.82);add(n+'Knee',[sx+k*(side?.045:.02),ground-.22]);add(n+'Foot',[sx+k*(side?.10:.035),ground-(footPose?footPose.lift*.08:k>0?.06:0)]);bone(hip,n+'Knee');bone(n+'Knee',n+'Foot');}
  }else{
   add('pelvis',[.5,.65]);add('chest',[.5,.40]);add('neck',[.5,.28]);add('head',[.5,.15]);bone('pelvis','chest');bone('chest','neck');bone('neck','head');
   for(const[n,offset]of[['left',1],['right',-1]]){const k=step*offset,x=side?.5:.5+offset*.12;add(n+'Knee',[x+k*.055,.82]);add(n+'Foot',[x+k*.11,1-(k>0?.04:0)]);add(n+'Shoulder',[.5+offset*.13,.40]);add(n+'Hand',[.5+offset*.16-k*.075,.64]);bone('pelvis',n+'Knee');bone(n+'Knee',n+'Foot');bone('chest',n+'Shoulder');bone(n+'Shoulder',n+'Hand');}
  }
  if(side&&sign>0)for(const j of Object.values(p))j[0]=1-j[0];return{kind,facing:direction(facing),slot,joints:p,bones};
 }
 function validateSkin(skin){const errors=[],missing=[];if(!rigs[skin.kind])errors.push('unknown mannequin');if(skin.layers||skin.layerViews){for(const view of['outdoor','indoor'])for(const d of directions){const layers=(skin.layerViews?.[view]||skin.layers)?.[d],joints=skeleton(skin.kind,d).joints;if(!Array.isArray(layers)||!layers.length){missing.push(view+':'+d+':layers');continue;}for(const l of layers)if(!joints[l.joint]||l.endJoint&&!joints[l.endJoint]||typeof l.image!=='string'||!Array.isArray(l.rect)||l.rect.length!==4||!l.rect.every(Number.isFinite)||!(l.rect[2]>0&&l.rect[3]>0&&l.width>0&&l.height>0)||l.pivot&&(!Array.isArray(l.pivot)||l.pivot.length!==2||!l.pivot.every(Number.isFinite)))errors.push(view+':'+d+':invalid-layer');}return{ready:!errors.length&&!missing.length,errors,missing};}for(const view of['outdoor','indoor'])for(const d of directions){const poses=skin.views?.[view]?.[d];for(const slot of['stand','leftStep','rightStep'])if(!poses?.[slot])missing.push(view+':'+d+':'+slot);if(poses){const ids=['stand','leftStep','rightStep'].map(s=>JSON.stringify(poses[s]?.source||poses[s]));if(new Set(ids).size<3)missing.push(view+':'+d+':distinct-step-art');}}return{ready:!errors.length&&!missing.length,errors,missing};}
 function drawMannequin(ctx,pose,x,y,height,width=height*.65){const point=n=>[x+(pose.joints[n][0]-.5)*width,y+(pose.joints[n][1]-1)*height];ctx.save();ctx.strokeStyle='#9fc6ce';ctx.fillStyle='#d4e8e6';ctx.lineCap='round';ctx.lineWidth=Math.max(2,height*.045);for(const[a,b]of pose.bones){ctx.beginPath();ctx.moveTo(...point(a));ctx.lineTo(...point(b));ctx.stroke();}const h=point('head');ctx.beginPath();ctx.arc(...h,height*.075,0,Math.PI*2);ctx.fill();ctx.restore();}
 function drawLayers(ctx,skin,pose,images,x,y,height,width=height*.65,view='outdoor'){const layers=(skin.layerViews?.[view]||skin.layers)?.[pose.facing];if(!layers)throw Error('Skin direction has no authored layers');for(const l of [...layers].sort((a,b)=>(a.z||0)-(b.z||0))){const joint=pose.joints[l.joint],im=images[l.image];if(!joint||!im)throw Error('Skin layer has missing image or joint');const end=l.endJoint&&pose.joints[l.endJoint],w=l.width*width,h=l.height*height;ctx.save();ctx.translate(x+(joint[0]-.5)*width,y+(joint[1]-1)*height);if(end)ctx.rotate(Math.atan2((end[1]-joint[1])*height,(end[0]-joint[0])*width)-Math.PI/2);ctx.drawImage(im,...l.rect,-(l.pivot?.[0]??.5)*w,-(l.pivot?.[1]??0)*h,w,h);ctx.restore();}}
 const cadenceFor=id=>id==='bull'?1.25:1.12;
 return{version:165,directions,slots,quadruped,rigs,strideFor,cadenceFor,at,create,skeleton,validateSkin,drawMannequin,drawLayers};
});
