"""Extract the 3 reviewed 4x3 generator sheets; preserve sources and clear the green matte."""
from pathlib import Path
from PIL import Image
import json,hashlib
from generator_layout import generator_path
root=Path(__file__).resolve().parents[1];folder=root/'assets/templates-133';out=folder/'objects';out.mkdir(parents=True,exist_ok=True)
names={
'interior':['stove','kitchen-bench','linen-shelf','sewing-basket','dining-table','pantry','washstand','writing-desk','training-dummy','practice-rack','archery-target','trophy'],
'town':['cottage','ranger-hut','chapel','caravan','noticeboard','trough','produce-cart','planter','stone-wall','palisade','market-stall','campfire'],
'nature':['fallen-log','hollow-stump','fern-rocks','berry-bush','broken-column','waystone','supply-cart','bedroll','reeds','oasis-palm','ruined-arch','woodland-shrine']}
assets={};sheets={}
for group,items in names.items():
 src=folder/(group+'.png');im=Image.open(src).convert('RGBA');w,h=im.size;sheets[group]={'image':src.relative_to(root).as_posix(),'size':[w,h],'sha256':hashlib.sha256(src.read_bytes()).hexdigest()}
 for i,name in enumerate(items):
  x0=round(i%4*w/4);y0=round(i//4*h/3);x1=round((i%4+1)*w/4);y1=round((i//4+1)*h/3);tile=im.crop((x0,y0,x1,y1));pixels=list(tile.getdata());clean=[]
  for r,g,b,a in pixels:
   # Key only saturated neon backdrop; preserve the darker greens of foliage.
   if g>185 and g-r>95 and g-b>95:clean.append((0,0,0,0))
   elif g>155 and g-r>65 and g-b>65:clean.append((r,max(r,b)+30,b,min(a,150)))
   else:clean.append((r,g,b,a))
  tile.putdata(clean);box=tile.getbbox();assert box;tile=tile.crop(box);final=Image.new('RGBA',(tile.width+8,tile.height+8));final.paste(tile,(4,4));dest=root/str(generator_path(group,name));dest.parent.mkdir(parents=True,exist_ok=True);final.save(dest,'WEBP',lossless=True,method=6)
  id='gen133-'+group+'-'+name;view='indoor' if group=='interior' else 'outdoor';rooms=['house','tent'] if i<8 else ['arena']
  if group=='interior':contexts=rooms
  elif group=='town':contexts=['town','property'] if i>=4 else ['forest','jungle','swamp']
  else:contexts=['desert'] if name=='oasis-palm' else ['swamp','jungle'] if name=='reeds' else ['forest','jungle','swamp']
  assets[id]={'id':id,'image':dest.relative_to(root).as_posix(),'size':list(final.size),'view':view,'contexts':contexts,'kind':'building' if group=='town' and i<4 else 'prop','source':group,'cell':[x0,y0,x1-x0,y1-y0],'crop':list(box),'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()}
  if group=='town' and i<4:assets[id].update(interiorKind='church' if name=='chapel' else 'tent' if name=='caravan' else 'house',doorFraction=.5)
data={'version':133,'sheets':sheets,'assets':assets}
(root/'js/world/generator-catalog.js').write_text('/* Reviewed generator assets: distinct indoor/outdoor contexts, source crops and stable IDs. */\n(function(root,api){if(typeof module===\'object\'&&module.exports)module.exports=api;else root.VaelkorGeneratorCatalog133=api;})(globalThis,'+json.dumps(data,separators=(',',':'))+');\n')
print('Extracted',len(assets),'transparent, individually bounded sprites.')
