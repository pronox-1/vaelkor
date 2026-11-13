"""Read-only release inventory with an explicit, reviewable change plan."""
from pathlib import Path
import hashlib,json,collections,argparse
root=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--reference',type=Path,default=Path('/workspace/sites/vaelkor-download/dist/assets'));parser.add_argument('--changes',type=Path);args=parser.parse_args();reference=args.reference
plan=json.loads(args.changes.read_text()) if args.changes else {}
relative=lambda name:Path(name).relative_to('assets').as_posix()
relocations=json.loads((root/plan['relocationsFile']).read_text()) if plan.get('relocationsFile') else {}
previous={relative(new):relative(old) for old,new in relocations.items()};allowed={relative(n) for n in plan.get('modified',[])};additions={relative(n) for n in plan.get('added',[])}
files=[];duplicates=collections.defaultdict(list);used=set();moved=[];modified=[];added=[]
for p in sorted((root/'assets').rglob('*')):
 if not p.is_file():continue
 rel=p.relative_to(root/'assets').as_posix();digest=hashlib.sha256(p.read_bytes()).hexdigest();oldrel=rel if (reference/rel).exists() else previous.get(rel,rel);old=reference/oldrel
 if not old.exists():
  assert rel in additions,f'Unplanned new asset: {rel}'
  added.append(rel)
 else:
  used.add(oldrel);before=hashlib.sha256(old.read_bytes()).hexdigest()
  if digest!=before:
   assert rel in allowed,f'Unplanned asset modification: {rel}'
   modified.append({'path':rel,'before':before,'after':digest})
  if oldrel!=rel:moved.append({'from':oldrel,'to':rel,'sha256':digest});assert digest==before,'Moving must preserve original bytes'
 files.append({'path':rel,'bytes':p.stat().st_size,'sha256':digest});duplicates[digest].append(rel)
missing={p.relative_to(reference).as_posix() for p in reference.rglob('*') if p.is_file()}-used
known_aliases=json.loads((root/'tools/generator-relocations-137.json').read_text()) if (root/'tools/generator-relocations-137.json').exists() else {}
retained=[]
for oldname,newname in known_aliases.items():
 oldrel,newrel=relative(oldname),relative(newname)
 if oldrel in missing and (reference/newrel).is_file() and hashlib.sha256((reference/oldrel).read_bytes()).hexdigest()==hashlib.sha256((root/'assets'/newrel).read_bytes()).hexdigest():missing.remove(oldrel);retained.append(oldrel)
assert not missing,f'Unplanned deletions: {sorted(missing)}'
report={'files':len(files),'bytes':sum(f['bytes'] for f in files),'reference':'Previous published release; SHA-256 comparison with explicit changes only','removedAssets':0,'retainedHostingAliases':len(retained),'relocatedAssets':len(moved),'modifiedAssets':len(modified),'addedAssets':len(added),'relocations':moved,'modifications':modified,'additions':added,'policy':'No ambiguous or unused-looking generator graphics are deleted. Relocations preserve bytes. Only explicitly declared changes are accepted.','duplicateGroups':[p for p in duplicates.values() if len(p)>1],'inventory':files}
(root/'reports/release-asset-inventory.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({k:report[k] for k in ['files','bytes','removedAssets','relocatedAssets','modifiedAssets','addedAssets']}))
