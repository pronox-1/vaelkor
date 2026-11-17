/* Shared, bounded sprite preparation. Original source files are never modified. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.VaelkorArtPolish130=api;})(globalThis,()=>{
 function clean(data,w,h){const out=new Uint8ClampedArray(data),core=new Uint8Array(w*h),key=new Uint8Array(w*h),queue=[];
 for(let n=0;n<core.length;n++){const i=n*4;core[n]=out[i+3]&&out[i+1]>210&&out[i]<85&&out[i+2]<110&&out[i+1]-out[i]>110&&out[i+1]-out[i+2]>100?1:0;}
 const add=n=>{if(n>=0&&n<core.length&&core[n]&&!key[n]){key[n]=1;queue.push(n);}};
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const n=y*w+x,i=n*4;if(!core[n])continue;if(!x||!y||x===w-1||y===h-1||out[i+1]>235&&out[i]<30&&out[i+2]<30||(x&&out[(n-1)*4+3]===0)||(x<w-1&&out[(n+1)*4+3]===0)||(y&&out[(n-w)*4+3]===0)||(y<h-1&&out[(n+w)*4+3]===0))add(n);}
 for(let j=0;j<queue.length;j++){const n=queue[j],x=n%w,y=Math.floor(n/w);out[n*4+3]=0;if(x)add(n-1);if(x<w-1)add(n+1);if(y)add(n-w);if(y<h-1)add(n+w);}
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const n=y*w+x,i=n*4;if(!out[i+3]||out[i+1]<145||out[i+1]-out[i]<65||out[i+1]-out[i+2]<65)continue;const near=(x&&key[n-1])||(x<w-1&&key[n+1])||(y&&key[n-w])||(y<h-1&&key[n+w]);const edge=out[i+3]<230&&(x&&out[(n-1)*4+3]<30||x<w-1&&out[(n+1)*4+3]<30||y&&out[(n-w)*4+3]<30||y<h-1&&out[(n+w)*4+3]<30);if(near||edge){const excess=out[i+1]-Math.max(out[i],out[i+2]);out[i+1]=Math.max(out[i],out[i+2])+24;out[i+3]=Math.min(out[i+3],Math.max(30,255-excess));}}
 return out;
 }

 function cleanNPC(data,w,h,role){const out=role==='cook'?new Uint8ClampedArray(data):clean(data,w,h);if(role!=='cook')return out;for(let n=0;n<w*h;n++){const i=n*4,r=out[i],g=out[i+1],b=out[i+2];if(out[i+3]&&g>50&&g>Math.max(r,b)*1.28&&g-Math.max(r,b)>20)out[i+3]=0;}const alpha=new Uint8Array(w*h);for(let n=0;n<alpha.length;n++)alpha[n]=out[n*4+3];for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const n=y*w+x,i=n*4;if(!alpha[n]||out[i+1]<=Math.max(out[i],out[i+2])+16)continue;if([n-1,n+1,n-w,n+w].some(j=>!alpha[j])){out[i+1]=Math.max(out[i],out[i+2])+10;out[i+3]=Math.min(out[i+3],200);}}return out;}
 return{version:130,clean,cleanNPC,limits:{entries:96,pixels:2_000_000}};
});
