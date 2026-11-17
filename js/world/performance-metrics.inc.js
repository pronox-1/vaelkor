// BEGIN VAELKOR PERFORMANCE METRICS v145
const vkMetrics145=window.parent.VaelkorMetrics145;
if(vkMetrics145){for(const name of ['draw','renderStatic','vkNPCRoute127','vkWildFlood']){const old=({draw,renderStatic,vkNPCRoute127,vkWildFlood})[name],wrapped=function(...args){return vkMetrics145.time('world:'+name,()=>old.apply(this,args));};if(name==='draw')draw=wrapped;else if(name==='renderStatic')renderStatic=wrapped;else if(name==='vkNPCRoute127')vkNPCRoute127=wrapped;else vkWildFlood=wrapped;}}
Object.assign(window.VaelkorPerformance137,{timing:()=>vkMetrics145?.snapshot?.()||{},graphics:()=>({scale:vkRenderScale145,width:c.width,height:c.height,preparedPixels:vkPreparedPixels130,preparedEntries:vkPrepared130.size,background:window.parent.VaelkorAssetQueue145?.stats?.()})});
// END VAELKOR PERFORMANCE METRICS v145
