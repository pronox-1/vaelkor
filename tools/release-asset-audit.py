"""Read-only release asset inventory. Never remove ambiguous generator resources."""
from pathlib import Path
import hashlib,json,collections,argparse
root=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--reference',type=Path,default=Path('/workspace/sites/vaelkor-download/dist/assets'));reference=parser.parse_args().reference
files=[];duplicates=collections.defaultdict(list)
for p in sorted((root/'assets').rglob('*')):
 if not p.is_file():continue
 rel=p.relative_to(root/'assets').as_posix();digest=hashlib.sha256(p.read_bytes()).hexdigest();old=reference/rel
 assert old.exists(),f'Asset is not present in release reference: {rel}'
 assert digest==hashlib.sha256(old.read_bytes()).hexdigest(),f'Asset modified: {rel}'
 files.append({'path':rel,'bytes':p.stat().st_size,'sha256':digest});duplicates[digest].append(rel)
assert len(files)==sum(p.is_file() for p in reference.rglob('*')),'Asset file count differs'
report={'files':len(files),'bytes':sum(f['bytes'] for f in files),'reference':'Previous published release assets; compared byte-for-byte via SHA-256','removedAssets':0,'modifiedAssets':0,'policy':'All images, atlases, templates, masks and generator resources preserved. Identical bytes are review candidates only, not automatic deletion permission.','duplicateGroups':[p for p in duplicates.values() if len(p)>1],'inventory':files}
(root/'reports/release-asset-inventory.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:report[k] for k in ['files','bytes','removedAssets','modifiedAssets']}))
