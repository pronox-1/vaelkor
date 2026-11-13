from pathlib import Path
from PIL import Image,ImageOps
import json,hashlib,statistics
import numpy as np
from scipy import ndimage
r=Path(__file__).resolve().parents[1];p=r/'assets/breeding-134'
def clean(im):
 im=im.convert('RGBA');out=[]
 for red,g,b,a in im.getdata():
  if g>180 and g-red>90 and g-b>90:a=0
  elif g>155 and g-red>65 and g-b>65:g=max(red,b)+25;a=min(a,145)
  out.append((red,g,b,a))
 im.putdata(out);return im
out=clean(Image.open(p/'1000120235.png'));box=out.getbbox();out=out.crop(box);out.save(p/'exterior.webp',lossless=True)
Image.open(p/'1000120237.png').save(p/'interior.webp',lossless=True)
source=Image.open(p/'1000120236.png');rig={}
# Use the actual pose directions in the picture, rather than its incorrect column labels.
rects={'outdoor':{'down':[[282,850,65,130],[346,850,62,130],[407,850,65,130],[471,850,69,130]],'left':[[572,850,73,130],[643,850,70,130],[712,850,73,130],[784,850,76,130]],'up':[[1215,850,80,130],[1291,850,78,130],[1366,850,77,130],[1439,850,78,130]]},'indoor':{'down':[[244,72,118,170],[390,72,99,170],[493,72,100,170],[596,72,108,170]],'left':[[242,258,118,154],[387,258,110,154],[499,258,100,154],[601,258,105,154]],'up':[[241,593,123,174],[383,593,112,174],[497,593,105,174],[604,593,102,174]]}}
for mode,dirs in rects.items():
 poses={};heights=[]
 for direction,cells in dirs.items():
  frames=[]
  for i,rect in enumerate(cells):
   x,y,w,h=rect;im=clean(source.crop((x,y,x+w,y+h)));arr=np.array(im);labels,n=ndimage.label(arr[:,:,3]>0);sizes=np.bincount(labels.ravel());sizes[0]=0;selected=labels==sizes.argmax();arr[:,:,3]=np.where(selected,arr[:,:,3],0);im=Image.fromarray(arr);bounds=im.getbbox();assert bounds;im=im.crop(bounds);im.save(p/(mode+'-'+direction+'-'+str(i)+'.webp'),lossless=True);heights.append(im.height);frames.append({'image':(p/(mode+'-'+direction+'-'+str(i)+'.webp')).relative_to(r).as_posix(),'size':list(im.size)})
  poses[direction]=frames
 poses['right']=[]
 for i,a in enumerate(poses['left']):
  im=ImageOps.mirror(Image.open(r/a['image']));dest=p/(mode+'-right-'+str(i)+'.webp');im.save(dest,lossless=True);poses['right'].append({'image':dest.relative_to(r).as_posix(),'size':list(im.size)})
 # A fixed reference height for the mannequin, not per-frame resizing.
 rig[mode]={'referenceHeight':statistics.median(heights),'directions':poses}
data={'version':134,'exterior':'assets/breeding-134/exterior.webp','interior':'assets/breeding-134/interior.webp','sourceHashes':{f.name:hashlib.sha256(f.read_bytes()).hexdigest() for f in p.glob('*.png')},'joe':rig}
(r/'js/world/breeding-art.js').write_text('(function(r,a){if(typeof module===\'object\'&&module.exports)module.exports=a;else r.VaelkorBreedingArt134=a;})(globalThis,'+json.dumps(data,separators=(',',':'))+');\n')
print('Breeding building, room and 32 Joe poses prepared.')
