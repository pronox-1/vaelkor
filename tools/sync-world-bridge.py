"""Synchronize the small maintained bridge with the existing embedded world HTML."""
from pathlib import Path
import json,re
root=Path(__file__).resolve().parents[1]
p=root/'js/script-09.js';source=p.read_text();match=re.search(r'frame.srcdoc=("(?:\\.|[^"\\])*")',source);html=json.loads(match[1]);fragment=(root/'js/world/embedded-wildlands.inc.js').read_text().rstrip()
pattern=r'// BEGIN VAELKOR WILDLANDS SCENE BRIDGE v1[\s\S]*?// END VAELKOR WILDLANDS SCENE BRIDGE v1'
assert len(re.findall(pattern,html))==1
html=re.sub(pattern,lambda _:fragment,html)
town=(root/'js/world/town-landscape.inc.js').read_text().rstrip()
town_pattern=r'// BEGIN VAELKOR TOWN AND LANDSCAPE v1[\s\S]*?// END VAELKOR TOWN AND LANDSCAPE v1'
if re.search(town_pattern,html):html=re.sub(town_pattern,lambda _:town,html)
else:html=html.replace('// BEGIN VAELKOR WILDLANDS SCENE BRIDGE v1',town+'\n// BEGIN VAELKOR WILDLANDS SCENE BRIDGE v1',1)
rooms=(root/'js/world/interior-templates.inc.js').read_text().rstrip()
room_pattern=r'// BEGIN VAELKOR MODULAR INTERIORS v1[\s\S]*?// END VAELKOR MODULAR INTERIORS v1'
if re.search(room_pattern,html):html=re.sub(room_pattern,lambda _:rooms,html)
else:html=html.replace('// BEGIN VAELKOR TOWN AND LANDSCAPE v1',rooms+'\n// BEGIN VAELKOR TOWN AND LANDSCAPE v1',1)
life=(root/'js/world/supplied-life.inc.js').read_text().rstrip()
life_pattern=r'// BEGIN VAELKOR SUPPLIED LIFE v127[\s\S]*?// END VAELKOR SUPPLIED LIFE v127'
if re.search(life_pattern,html):html=re.sub(life_pattern,lambda _:life,html)
else:html=html.replace('// END VAELKOR WILDLANDS SCENE BRIDGE v1','// END VAELKOR WILDLANDS SCENE BRIDGE v1\n'+life,1)
quality=(root/'js/world/scene-quality.inc.js').read_text().rstrip()
quality_pattern=r'// BEGIN VAELKOR SCENE QUALITY v130[\s\S]*?// END VAELKOR SCENE QUALITY v130'
if re.search(quality_pattern,html):html=re.sub(quality_pattern,lambda _:quality,html)
else:html=html.replace('// END VAELKOR SUPPLIED LIFE v127','// END VAELKOR SUPPLIED LIFE v127\n'+quality,1)
content=(root/'js/world/generator-content.inc.js').read_text().rstrip()
content_pattern=r'// BEGIN VAELKOR GENERATOR CONTENT v133[\s\S]*?// END VAELKOR GENERATOR CONTENT v133'
if re.search(content_pattern,html):html=re.sub(content_pattern,lambda _:content,html)
else:html=html.replace('// BEGIN VAELKOR SCENE QUALITY v130',content+'\n// BEGIN VAELKOR SCENE QUALITY v130',1)
npc=(root/'js/world/npc-world.inc.js').read_text().rstrip()
npc_pattern=r'// BEGIN VAELKOR NPC WORLD v134[\s\S]*?// END VAELKOR NPC WORLD v134'
if re.search(npc_pattern,html):html=re.sub(npc_pattern,lambda _:npc,html)
else:html=html.replace('// END VAELKOR SCENE QUALITY v130','// END VAELKOR SCENE QUALITY v130\n'+npc,1)
navigation=(root/'js/world/navigation-runtime.inc.js').read_text().rstrip()
navigation_pattern=r'// BEGIN VAELKOR NAVIGATION RUNTIME v137[\s\S]*?// END VAELKOR NAVIGATION RUNTIME v137'
if re.search(navigation_pattern,html):html=re.sub(navigation_pattern,lambda _:navigation,html)
else:html=html.replace("vkExpansionEnsure('forest');setHeroSex",navigation+"\n\nvkExpansionEnsure('forest');setHeroSex",1)
render_runtime=(root/'js/world/render-runtime.inc.js').read_text().rstrip()
render_pattern=r'// BEGIN VAELKOR RENDER RUNTIME v137[\s\S]*?// END VAELKOR RENDER RUNTIME v137'
if re.search(render_pattern,html):html=re.sub(render_pattern,lambda _:render_runtime,html)
else:html=html.replace("vkExpansionEnsure('forest');setHeroSex",render_runtime+"\n\nvkExpansionEnsure('forest');setHeroSex",1)
html=html.replace("for(let y=0;y<H;y++)for(let x=0;x<W;x++)tileStyled(x,y,cell(x,y));vkDrawEncounterGrass();vkDrawExitShadows103();\n // Gebäude", "vkPaintGround137();\n // Gebäude")
travel=(root/'js/world/npc-travel.inc.js').read_text().rstrip()
travel_pattern=r'// BEGIN VAELKOR NPC TRAVEL v138[\s\S]*?// END VAELKOR NPC TRAVEL v138'
if re.search(travel_pattern,html):html=re.sub(travel_pattern,lambda _:travel,html)
else:html=html.replace("vkExpansionEnsure('forest');setHeroSex",travel+"\n\nvkExpansionEnsure('forest');setHeroSex",1)
# Base village sprites and foreground copies must use identical preparation.
html=html.replace('ctx.drawImage(im,Math.round(x),Math.round(y),Math.round(w),Math.round(h));','vkQualityDraw130(im,[0,0,im.naturalWidth,im.naturalHeight],x,y,w,h,\'town:\'+name);')
html=html.replace("ctx.drawImage(im,Math.round(x+(b.kind==='church'?T/2:0)),Math.round(y+b.h*T-height),Math.round(width),height);", "vkQualityDraw130(im,[0,0,im.naturalWidth,im.naturalHeight],x+(b.kind==='church'?T/2:0),y+b.h*T-height,width,height,'town:'+name);")
html=html.replace('ctx.drawImage(im,Math.round(o.x*T-width/2),Math.round(o.y*T-height+7),width,height);',"vkQualityDraw130(im,[0,0,im.naturalWidth,im.naturalHeight],o.x*T-width/2,o.y*T-height+7,width,height,'town:'+o.kind);")
html=re.sub(r'^function vkChurchSprite.*$',lambda m:m.group(0).replace("'town:'+name","'church:'+id"),html,flags=re.M)
if 'teamAccess:()=>({' not in html:
 html=html.replace('window.VaelkorAdventure102={','window.VaelkorAdventure102={\n teamAccess:()=>({allowed:!battleActive&&(interior?.kind===\'arena\'||!!vkNearHeal102()),reason:interior?.kind===\'arena\'?\'arena\':vkNearHeal102()?\'heal\':null}),',1)
# Keep small hooks in the legacy movement loop; the maintained fragment owns behavior.
# Arrival placement is already validated by the map engine. Do not overwrite
# its safe edge recovery with the old unvalidated initialization coordinates.
html=html.replace('!interior&&pass(m.x,m.y)){p={x:m.x,y:m.y}', '!interior&&(!vkWildService()?.currentId||!vkNearExit131(m.x,m.y))&&pass(m.x,m.y)){p={x:m.x,y:m.y}')
html=html.replace('gateScene101=scene;gateLatch101=gate?.id||null;return;', 'gateScene101=scene;gateLatch101=null;return;')

html=html.replace("return inside(exit.x,exit.y,.55)?", "return vkInteriorExitContains129(exit)?")
html=html.replace("if(inside(q.x,q.y,.45)&&!(port==='next'", "if(vkWildGateContains129(q)&&!(port==='next'")
if "function vkPreloadGate100(gate){if(gate.kind==='enter')vkWarmInterior129" not in html:
 html=html.replace("function vkPreloadGate100(gate){", "function vkPreloadGate100(gate){if(gate.kind==='enter')vkWarmInterior129(gate.building.kind);")
if "vkLifeNeedsFrame129(t,lastPaint)" not in html:
 html=html.replace("const poseKey99=Math.floor(heroAnimation92.phase+1e-7)%4;", "if(vkLifeNeedsFrame129(t,lastPaint))requestWorldDraw96();\n const poseKey99=Math.floor(heroAnimation92.phase+1e-7)%4;")
# Guardians use their full-resolution source with smooth reduction, not nearest-neighbor steps.
html=html.replace("ctx.drawImage(im,Math.round(x-enemy.anchor*scale),Math.round(y-enemy.bounds[3]*scale),Math.round(im.naturalWidth*scale),Math.round(im.naturalHeight*scale));", "ctx.save();ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(im,x-enemy.anchor*scale,y-enemy.bounds[3]*scale,im.naturalWidth*scale,im.naturalHeight*scale);ctx.restore();")
html=html.replace("label:(port==='left'||port==='right'?'Nebenweg':'Abschnitt')+' betreten'", "label:'Teleporter · '+(port==='left'?'links':port==='right'?'rechts':port==='next'||port==='north'?'oben':'unten')")
html=html.replace('ctx.drawImage(sceneCache,0,0);\n player();','ctx.drawImage(sceneCache,0,0);\n vkPaintTeleporters136();player();')
html=html.replace("function attempt(dx,dy){if(vkTransitionBusy100())return;", "function attempt(dx,dy){if(vkTransitionBusy100())return;if(!interior&&Object.values(vkWildExits).some(q=>Math.abs(target.x-q.x)<=.5&&Math.abs(target.y-q.y)<=.5&&dx*q.dx+dy*q.dy<0))return;")
html=html.replace("vkWarmInterior129(gate.building.kind)","vkWarmInterior129(gate.building.desertTent?'tent':gate.building.ruinedTent?'ruined':gate.building.kind)")
# v136: explicit appearance action, settled encounter position and nursery-only storage.
html=html.replace("if(nearBed88())wardrobe88();else wardrobeLatch88=false;", "if(!nearBed88())wardrobeLatch88=false;")
html=html.replace("if(m.vkCommand==='wardrobeClose'){battleActive=false;releaseInput();return;}", "if(m.vkCommand==='wardrobeClose'){battleActive=false;wardrobeLatch88=true;releaseInput();target={...p};animFrom=null;return;}")
html=html.replace("if(m.vkCommand==='battleEnd'){battleActive=false;", "if(m.vkCommand==='battleEnd'){releaseInput();p={...target};animFrom=null;animElapsed=STEP_MS;stepClock=0;battleActive=false;")
html=html.replace("allowed:!battleActive&&(interior?.kind==='arena'||!!vkNearHeal102()),reason:interior?.kind==='arena'?'arena':vkNearHeal102()?'heal':null", "allowed:!battleActive&&interior?.kind==='nursery',reason:interior?.kind==='nursery'?'nursery':null")
p.write_text(source[:match.start(1)]+json.dumps(html,ensure_ascii=False,separators=(',',':'))+source[match.end(1):])
print('Embedded world bridge synchronized.')
