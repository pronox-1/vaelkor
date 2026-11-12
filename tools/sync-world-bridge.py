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
p.write_text(source[:match.start(1)]+json.dumps(html,ensure_ascii=False,separators=(',',':'))+source[match.end(1):])
print('Embedded world bridge synchronized.')
