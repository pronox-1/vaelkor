/* Dedicated lateral-sequence four-beat WALK. Never insert an idle frame while translating. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.VaelkorQuadruped165=api;})(globalThis,()=>{
 const slots=Object.freeze(Array.from({length:8},(_,i)=>'walk'+i));
 const legs=Object.freeze([{id:'rearNear',touch:0},{id:'frontNear',touch:.25},{id:'rearFar',touch:.5},{id:'frontFar',touch:.75}]);
 function contacts(phase){return legs.map(l=>{const t=((phase-l.touch)%1+1)%1,planted=t<.75,u=planted?t/.75:(t-.75)/.25;return{id:l.id,planted,x:planted?-.5+u:.5-(u*u*(3-2*u)),lift:planted?0:Math.sin(Math.PI*u),touch:l.touch};});}
 const sourcePhase=phase=>(phase+1)%8;
 const contactsForFrame=phase=>contacts(sourcePhase(phase)/8);
 function sample(distance,moving,stride=3.2){const phase=moving?Math.floor(Math.max(0,distance)/stride*8+1e-7)%8:0;return Object.freeze({phase,index:phase,slot:moving?slots[phase]:'stand',stand:!moving,moving:!!moving,contacts:contactsForFrame(phase)});}
 // Give the two authored rear-lift poses time to read in side view; keep the full poses and cycle length.
 const sideKnots=Object.freeze([0,.125,.2375,.3875,.5,.625,.7375,.8875,1]);
 function sideSample(distance,moving,stride=3.2){const base=sample(distance,moving,stride);if(!moving)return base;const progress=((Math.max(0,distance)/stride)%1+1)%1;let phase=0;for(let i=1;i<8;i++)if(progress+1e-7>=sideKnots[i])phase=i;return Object.freeze({...base,phase,index:phase,slot:slots[phase],contacts:contactsForFrame(phase)});}
 // Approved mount standard: four complete diagonal poses; one distance clock for every species.
 const trotTemplate=Object.freeze({id:"mount-trot-4",version:1,phaseCount:4,stride:4.8,slots:Object.freeze(["walk0","walk2","walk4","walk6"]),sideDirections:Object.freeze(["left","right"])});
 function trotSample(distance,moving,stride=trotTemplate.stride){
  const phase=moving?Math.floor(Math.max(0,distance)/stride*4+1e-7)%4:0;
  const contacts=legs.map(l=>{const a=l.id==='frontNear'||l.id==='rearFar',t=((phase/4-(a?0:.5))%1+1)%1,planted=t<.5,u=planted?t*2:(t-.5)*2;return{id:l.id,planted,x:planted?.5-u:-.5+u,lift:planted?0:Math.sin(Math.PI*u)};});
  return Object.freeze({phase:phase*2,index:phase*2,slot:moving?'walk'+phase*2:'stand',stand:!moving,moving:!!moving,contacts,gait:trotTemplate.id});
 }
 function poseIndex(slot){if(slot==='stand')return 8;const n=Number(String(slot).replace('walk',''));return Number.isInteger(n)&&n>=0&&n<8?n:0;}
 return{version:165,slots,legs,contacts,contactsForFrame,sourcePhase,sample,sideSample,sideKnots,trotTemplate,trotSample,poseIndex};
});
