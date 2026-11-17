// BEGIN VAELKOR OUTDOOR ANIMATION v148
// Cache one high-quality reduction at the canvas's actual backing resolution.
// Draw it 1:1 in backing pixels; logical-pixel rounding otherwise jitters on HiDPI.
const vkOutdoorRasters148=new Map(),vkOutdoorSources148=new WeakMap();let vkOutdoorSourceId148=0;
function vkPaintOutdoor148(image,rect,x,y,anchor,foot,scale,step=0){
 if(!image||!rect[2]||!rect[3])return false;
 let sourceId=vkOutdoorSources148.get(image);if(!sourceId){sourceId=++vkOutdoorSourceId148;vkOutdoorSources148.set(image,sourceId);}
 const density=vkRenderScale145,width=Math.max(1,Math.round(rect[2]*scale*density)),height=Math.max(1,Math.round(rect[3]*scale*density)),key=sourceId+':'+rect.join(',')+':'+width+':'+height;
 let raster=vkOutdoorRasters148.get(key);if(!raster){raster=document.createElement('canvas');raster.width=width;raster.height=height;const g=raster.getContext('2d');g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';g.drawImage(image,...rect,0,0,width,height);vkOutdoorRasters148.set(key,raster);while(vkOutdoorRasters148.size>96)vkOutdoorRasters148.delete(vkOutdoorRasters148.keys().next().value);}else{vkOutdoorRasters148.delete(key);vkOutdoorRasters148.set(key,raster);}
 const snap=value=>Math.round(value*density)/density,px=snap(x-(anchor-rect[0])*scale),py=snap(y-(foot-rect[1])*scale);
 ctx.save();ctx.imageSmoothingEnabled=false;
 // Preserve the complete source stride: moving individual boot patches breaks foot contact.
 ctx.drawImage(raster,px,py,width/density,height/density);
 ctx.restore();return true;
}
window.parent.VaelkorGraphicsBudget147?.observeMap(vkOutdoorRasters148,window.parent.VaelkorGraphics147,'world:outdoor-actors148');
window.VaelkorOutdoor148={cache:()=>({entries:vkOutdoorRasters148.size,pixels:[...vkOutdoorRasters148.values()].reduce((n,c)=>n+c.width*c.height,0)}),paint:vkPaintOutdoor148};
// Use the proven full-stride source set at the existing outdoor height. Mounts
// keep their separate seated source; this selector belongs only to the walking player.
function vkWalkingFrame160(){
 if(interior)return vkHeroFrame87();
 const actor=HERO_ACTORS87[heroStyle],frames=actorImages87(heroStyle).walk[heroFacing],moving=!!animFrom;
 const travelled=walkDistance+(moving?Math.min(1,Math.max(0,animElapsed/vkStepDuration95())):0),index=moving?Math.floor(travelled/1.25*4+1e-7)%4:0;
 let selected=frames[index];if(!selected.im.complete||!selected.im.naturalWidth)selected=frames.find(f=>f.im.complete&&f.im.naturalWidth)||selected;
 return{actor,moving,index,frame:selected,indoor:false,poseSet:'outdoor',pose:moving?'walk':'stand',referenceHeight:frames[0].renderHeight||(frames[0].bounds[3]-frames[0].bounds[1]),height:34};
}
window.VaelkorWalking160={frame:vkWalkingFrame160,strideTiles:1.25};
// END VAELKOR OUTDOOR ANIMATION v148
