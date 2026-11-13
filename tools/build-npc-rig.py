"""Rebuild fixed NPC pose metrics from the unchanged source JPEGs. Requires Pillow, NumPy and SciPy for this offline build tool only."""
from pathlib import Path
from PIL import Image
import numpy as np,json,statistics,hashlib,shutil,base64
from scipy import ndimage
r=Path(__file__).resolve().parents[1];old=(r/'js/world/npc-rig.js').read_text();rig=json.loads(old[old.index('()=>(')+5:old.rindex('));')]);rig['version']=129;rig['sheets']={};dest=r/'assets/templates-129';dest.mkdir(exist_ok=True)
for name,source in [('npc-outdoor129','1000120217.png'),('npc-indoor129','1000120215.png')]:
 target=dest/(name+'.jpg');p=target;rig['sheets'][name]={'image':target.relative_to(r).as_posix(),'width':1536,'height':1024,'matte':'green','sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'items':[]}
roles=['healer','cook','material','traveler','wizard'];images={n:np.array(Image.open(r/p['image']).convert('RGB')).astype(int) for n,p in rig['sheets'].items()}
def metrics(a):
 h,w=a.shape[:2];mask=~((a[:,:,1]>170)&(a[:,:,1]>a[:,:,0]+65)&(a[:,:,1]>a[:,:,2]+65));mask[:,(np.count_nonzero(mask,axis=0)>h*.97)&(np.count_nonzero(a.max(axis=2)<60,axis=0)>h*.9)]=False;labels,count=ndimage.label(mask);sizes=np.bincount(labels.ravel());sizes[0]=0;component=labels==int(sizes.argmax());ys,xs=np.where(component);q=list(zip(xs.tolist(),ys.tolist()));xs,ys=zip(*q);bounds=[min(xs),min(ys),max(xs)-min(xs)+1,max(ys)-min(ys)+1];lo=bounds[1]+bounds[3]*.38;hi=bounds[1]+bounds[3]*.78;body=[x for x,y in q if lo<=y<=hi];return{'bounds':bounds,'center':round(statistics.median(body),2),'foot':max(ys)+1}
for mode in ['outdoor','indoor']:
 for role in roles:
  if mode=='indoor'and role=='traveler':continue
  directions={};i=roles.index(role)
  for facing in ['down','left','right','up']:
   poses=[]
   for f in range(4):
    if mode=='outdoor':
     x={'down':[304,378,451,524],'left':[612,688,764,840],'right':[936,1011,1086,1161],'up':[1248,1318,1388,1458]}[facing][f];w={'down':74,'left':76,'right':75,'up':70}[facing];y=[106,295,472,644,817][i];h=[116,116,116,116,140][i];name='npc-outdoor129'
    else:
     row={'healer':0,'cook':1,'material':2,'wizard':3}[role];y=[0,258,499,722][row];h=[257,240,221,302][row];x={'down':120,'right':405,'up':675,'left':955}[facing];w=190 if facing=='up' else 185;name='npc-indoor129'
    a=images[name][y:y+h,x:x+w];poses.append({'rect':[x,y,w,h],**metrics(a)})
   directions[facing]={'frames':poses,'anchor':round(statistics.median(p['center'] for p in poses),2),'foot':max(p['foot'] for p in poses)}
  ref=statistics.median(p['bounds'][3] for v in directions.values() for p in v['frames']);rig[mode][role]={'set':name,'referenceHeight':ref,'puppet':mode=='indoor','directions':directions}
  print(mode,role,ref)
(r/'js/world/npc-rig.js').write_text('// Version 129: measured pose anchors from the fresh supplied originals.\n(function(r,f){const a=f();if(typeof module===\'object\'&&module.exports)module.exports=a;else r.VaelkorNPCRig=a;})(typeof globalThis!==\'undefined\'?globalThis:this,()=>('+json.dumps(rig,separators=(',',':'))+'));\n')
# Offline originals use the same verified bytes; online loads stay lazy.
p=r/'js/world/atlases-offline.js';s=p.read_text();marker='\n// Fresh NPC originals v129\n';s=s.split(marker)[0];inline={n:'data:image/jpeg;base64,'+base64.b64encode((r/v['image']).read_bytes()).decode() for n,v in rig['sheets'].items()};inline['shop-display-table129']='data:image/webp;base64,'+base64.b64encode((r/'assets/images/84cfaaca7dce8e130899.webp').read_bytes()).decode();s+=marker+"(function(r,a){if(typeof module==='object'&&module.exports)Object.assign(module.exports,a);else Object.assign(r.VaelkorSuppliedArt.inline,a);})(globalThis,"+json.dumps(inline,separators=(',',':'))+");\n";p.write_text(s)
(dest/'catalog.json').write_text(json.dumps({'version':129,'sheets':rig['sheets'],'notes':'Original JPEG bytes preserved. Outdoor sheets supply four-direction walking; indoor sheet contains four roles in standing poses. Traveler indoors reuses the established source.'},indent=2)+'\n')
