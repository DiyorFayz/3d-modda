from pathlib import Path
import json,re,hashlib
import fitz
R=Path(__file__).resolve().parents[1]
s=(R/'bcr-abl-inhibitors-visual-study-guide.md').read_text()
pdf=fitz.open(R/'bcr-abl-inhibitors-visual-study-guide.pdf')
text='\n'.join(p.get_text() for p in pdf)
assets=re.findall(r'!\[[^\]]*\]\(([^)]+)\)',s)
# Captions contain numeric reference brackets; use path pattern independently.
assets=re.findall(r'\]\((figures/[^)]+)\)',s)
assert len(assets)==5 and all((R/a).is_file() for a in assets)
assert len(pdf)==8
assert all(len(p.get_text().strip())>300 for p in pdf)
assert all(f'[{i}]' in s for i in range(1,8))
assert 'References and structure provenance' in text
assert not re.search(r'citation needed|TODO cite|PLACEHOLDER|Smith et al\. 2023',s,re.I)
# Confirm the real mechanism paper originated in the MCP paper-search cache.
cache=json.loads((R.parent/'search_results/papers.json').read_text())
assert any(str(p.get('doi','')).lower()=='10.1158/0008-5472.can-12-1276' for p in cache)
# Identify source-supported feature checks beyond the depiction labels.
from rdkit import Chem
checks=[]
for row in json.loads((R/'data/verified_structures.json').read_text()):
 m=Chem.MolFromSmiles(row['pubchem_smiles'])
 amide=m.HasSubstructMatch(Chem.MolFromSmarts('C(=O)N'))
 nitrile=m.HasSubstructMatch(Chem.MolFromSmarts('C#N'))
 assert amide==(row['slug']!='bosutinib')
 assert nitrile==(row['slug']=='bosutinib')
 checks.append({'drug':row['name'],'amide':amide,'nitrile':nitrile})
# Inspect margins using actual PDF text bounding boxes, ignoring wide math glyph metrics.
out=[]
for i,p in enumerate(pdf):
 boxes=[b[:4] for b in p.get_text('blocks') if len(b)>4 and b[4].strip()]
 outside=[b for b in boxes if b[0]<15 or b[1]<10 or b[2]>p.rect.width-10 or b[3]>p.rect.height-10]
 assert not outside,(i+1,outside)
 out.append({'page':i+1,'text_words':len(p.get_text().split()),'text_within_page':True})
r={'passed':True,'pages':len(pdf),'integrated_figures':len(assets),'source_groups':7,'mechanism_paper_in_MCP_cache':True,'placeholders':False,'feature_checks':checks,'page_checks':out,'pdf_sha256':hashlib.sha256((R/'bcr-abl-inhibitors-visual-study-guide.pdf').read_bytes()).hexdigest()}
(R/'data/citation_and_release_checks.json').write_text(json.dumps(r,indent=2))
print(json.dumps(r,indent=2))
