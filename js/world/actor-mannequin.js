/* One contact/IK model for people, one for quadrupeds. Original art is bound separately per view. */
(function(r,f){const a=f();if(typeof module==='object'&&module.exports)module.exports=a;else r.VaelkorActorMannequin161=a;})(globalThis,()=>{
 const mod=n=>(n%1+1)%1;
 function contact(phase,stride,lift,duty=.6){const t=mod(phase);if(t<duty)return{x:stride*(.5-t/duty),y:0,planted:true};const u=(t-duty)/(1-duty),smooth=u*u*(3-2*u);return{x:stride*(-.5+smooth),y:-lift*Math.sin(Math.PI*u),planted:false};}
 function knee(a,b,upper,lower,bend=1){const dx=b.x-a.x,dy=b.y-a.y,d=Math.max(.0001,Math.hypot(dx,dy)),stretch=Math.max(1,d/(upper+lower)*1.00001),u=upper*stretch,l=lower*stretch,along=(u*u-l*l+d*d)/(2*d),height=Math.sqrt(Math.max(0,u*u-along*along));return{x:a.x+dx*along/d+dy*height/d*bend,y:a.y+dy*along/d-dx*height/d*bend};}
 function settings(kind,inside){return kind==='quadruped'?{stride:inside?2.2:1.8,hip:.62,cut:.68,lift:.11}:{stride:inside?1.45:1.05,hip:.70,cut:.78,lift:.07};}
 function pose({kind='human',inside=false,facing='down',phase=0,moving=false,w=60,h=100,scale=1,robe=false}){const cfg=settings(kind,inside),side=facing==='left'||facing==='right',dir=facing==='left'||facing==='up'?-1:1,stride=cfg.stride*16/scale,legs=[],quad=kind==='quadruped';
  const add=(id,hx,offset,far,front=true)=>{const c=moving?contact(phase+offset,stride*.6,h*cfg.lift):{x:0,y:0,planted:true},hip={x:hx,y:h*cfg.hip},foot={x:hx+(side?c.x*dir:0)+(side&&!moving?(far?-1:1)*w*(quad?.025:.07):0),y:h+(side?0:c.x*dir*.62)+c.y},boot=h*(quad?.07:.075),ankle={x:foot.x,y:foot.y-boot*.5},length=h*(1-cfg.hip)*.46;legs.push({id,hip,knee:side?knee(hip,ankle,length,length,(front?1:-1)*dir):{x:hip.x,y:(hip.y+ankle.y)/2},ankle,foot,planted:c.planted,far,front,boot});};
  if(quad){if(side){add('far-front',w*(dir<0?.30:.70),.5,true);add('far-rear',w*(dir<0?.73:.27),0,true,false);add('near-rear',w*(dir<0?.73:.27),.5,false,false);add('near-front',w*(dir<0?.30:.70),0,false);}else{add('far-left',w*.36,.5,true);add('far-right',w*.64,0,true);add('near-left',w*.36,0,false);add('near-right',w*.64,.5,false);}}
  else{add('far',w*(side?.48:.34),.5,true);add('near',w*(side?.52:.66),0,false);}
  return{legs,cut:h*(robe?.89:cfg.cut),stride:cfg.stride,phase:moving?mod(phase):0};
 }
 return{version:161,contact,knee,settings,pose};
});
