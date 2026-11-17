(function(r,f){const a=f();if(typeof module==='object'&&module.exports)module.exports=a;else r.VaelkorMountRules150=a;})(globalThis,()=>{
 const DAY=1080000,speedFor=id=>['camel','zebra'].includes(id)?2:1.5;
 const animals=['horse-brown','horse-white','bull','donkey','camel','zebra'],starter=animals.slice(0,4),vendorFor=id=>starter.includes(id)?'luca':'desert-merchant';
 function create(data,persist=()=>{},clock=()=>Number(data.worldClock127?.elapsedMs)||120000){const s=data.mounts150||(data.mounts150={owned:{},active:null,riding:false});s.owned=s.owned||{};
 const returned=id=>{const a=s.owned[id];if(a){a.mode='vendor';a.location=null;a.vendor=vendorFor(id);}};
 s.selected=animals.includes(s.selected)&&s.owned[s.selected]?s.selected:s.owned[s.active]?s.active:animals.find(id=>s.owned[id]?.mode==='wait')||null;
 for(const id of Object.keys(s.owned)){if(!animals.includes(id)){delete s.owned[id];continue;}s.owned[id].vendor=vendorFor(id);if(id!==s.selected)returned(id);}
 if(!s.owned[s.active]||s.active!==s.selected){s.active=null;s.riding=false;}s.version=153;
 const change=()=>persist(),now=()=>Math.max(0,Number(clock())||0);
 function buy(id,where){if(!animals.includes(id))return false;if(!s.owned[id])s.owned[id]={mode:'vendor',location:null,vendor:vendorFor(id)};change();return true;}
 function select(id,where){if(!s.owned[id]||!animals.includes(id))return false;for(const other of Object.keys(s.owned))if(other!==id)returned(other);s.selected=id;s.active=id;s.riding=false;s.owned[id].mode='follow';s.owned[id].location={...where};change();return true;}
 function ride(id,where){if(!select(id,where))return false;s.riding=true;change();return true;}
 function wait(where){if(!s.active)return false;s.owned[s.active].mode='wait';s.owned[s.active].location={...where};s.riding=false;s.active=null;change();return true;}
 function returnToStable(id=s.selected){if(!id||id!==s.selected||!s.owned[id]||s.owned[id].mode==='vendor')return false;returned(id);s.active=null;s.selected=null;s.riding=false;change();return true;}
 function dismount(){if(!s.riding)return false;s.riding=false;change();return true;}
 function feed(id){const a=s.owned[id],items=data.npc134?.items;if(id!==s.selected||!a||!(items?.berries>0)||(a.berryUntil153||0)>now())return false;items.berries--;a.berryUntil153=now()+DAY;change();return true;}
 function boosted(id=s.selected){return(s.owned[id]?.berryUntil153||0)>now();}
 return{state:s,buy,select,ride,wait,returnToStable,dismount,feed,boosted,speed:inside=>s.riding&&!inside?speedFor(s.active)*(boosted(s.active)?1.1:1):1,chance:base=>s.riding?base/2:base};}
 return{DAY,animals,starter,vendorFor,speedFor,create};
});
