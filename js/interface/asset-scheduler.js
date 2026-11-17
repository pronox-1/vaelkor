/* One bounded queue for optional world and portrait requests. Critical art bypasses it. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.VaelkorAssetQueue145=api.create({setTimeout:root.setTimeout.bind(root),clearTimeout:root.clearTimeout.bind(root)});})(globalThis,()=>{
 function create({setTimeout,clearTimeout,limit=2,timeout=8000,maxQueue=32}){const jobs=new Map(),queue=[];let active=0,peak=0,started=0,stalled=0;
  function pump(){while(active<limit&&queue.length){const job=queue.shift();if(!jobs.has(job.key))continue;active++;started++;peak=Math.max(peak,active);let image,timer,closed=false,abort;
   const finish=ok=>{if(closed)return;closed=true;clearTimeout(timer);image?.removeEventListener?.('load',ready);image?.removeEventListener?.('error',failed);jobs.delete(job.key);active--;job.resolve({ok,image});pump();};
   const ready=()=>{if(typeof image?.decode==='function')Promise.resolve().then(()=>image.decode()).then(()=>finish(!!image.naturalWidth),()=>finish(false));else finish(!!image?.naturalWidth);},failed=()=>finish(false);
   try{const result=job.start();image=result?.image||result;abort=result?.abort;if(!image){finish(false);continue;}if(image.addEventListener){image.addEventListener('load',ready,{once:true});image.addEventListener('error',failed,{once:true});}else{image.onload=ready;image.onerror=failed;}timer=setTimeout(()=>{stalled++;if(abort){try{abort();}finally{finish(false);}}/* Shared images retain their slot until a real load/error; never undercount stalled downloads. */},timeout);if(image.complete&&image.naturalWidth)ready();}catch(_){finish(false);}
  }}
  return{enqueue(key,start){if(jobs.has(key))return jobs.get(key).promise;if(queue.length>=maxQueue)return Promise.resolve({ok:false,skipped:true});let resolve;const promise=new Promise(r=>resolve=r);const job={key,start,resolve,promise};jobs.set(key,job);queue.push(job);pump();return promise;},cancelQueued(prefix){for(let i=queue.length-1;i>=0;i--)if(queue[i].key.startsWith(prefix)){const job=queue.splice(i,1)[0];jobs.delete(job.key);job.resolve({ok:false,cancelled:true});}},stats:()=>({active,queued:queue.length,peak,started,stalled,limit})};
 }
 return{create};
});
