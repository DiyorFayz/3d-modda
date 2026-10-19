"""Deterministic RDKit depictions; inputs transcribed only from MCP-retrieved PubChem/ChEBI records."""
from pathlib import Path
import json, io
from rdkit import Chem, rdBase
from rdkit.Chem import rdDepictor, rdMolDescriptors
from rdkit.Chem.Draw import rdMolDraw2D
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[1]
FIG=ROOT/'figures'
(ROOT/'drafts/figure_insertions.md').write_text('# Generated figure source blocks\n')
rows=json.loads((ROOT/'data/verified_structures.json').read_text())
fontpath='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
fontbold='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def font(n,bold=False): return ImageFont.truetype(fontbold if bold else fontpath,n)
colors={'A':(0.73,0.88,0.97),'B':(1.0,0.85,0.60),'C':(0.84,0.79,0.95),'D':(0.96,0.76,0.82)}
INK='#183247'
report=[]
mols=[]
for idx,row in enumerate(rows,2):
 m=Chem.MolFromSmiles(row['pubchem_smiles']); c=Chem.MolFromSmiles(row['chebi_smiles'])
 assert m and c
 assert Chem.MolToSmiles(m)==Chem.MolToSmiles(c),row['name']
 assert Chem.MolToInchiKey(m)==row['inchikey']
 assert rdMolDescriptors.CalcMolFormula(m)==row['formula']
 assert len(Chem.GetMolFrags(m))==1
 assert Chem.GetFormalCharge(m)==0
 mols.append(m)
 groups={}; labels={}
 rings=m.GetRingInfo().AtomRings()
 aromatic_n=[r for r in rings if all(m.GetAtomWithIdx(a).GetIsAromatic() for a in r) and any(m.GetAtomWithIdx(a).GetSymbol()=='N' for a in r) and not any(m.GetAtomWithIdx(a).GetSymbol()=='S' for a in r)]
 if row['slug']=='bosutinib':
  chosen=set(a for r in aromatic_n for a in r)
  for r in rings:
   if len(set(r)&chosen)>=2: chosen.update(r)
  groups['A']=chosen; labels['A']='Fused quinoline rings'
 else:
  groups['A']=set(a for r in aromatic_n for a in r); labels['A']='N-containing aromatic rings'
 q=Chem.MolFromSmarts('C#N' if row['slug']=='bosutinib' else 'C(=O)N')
 groups['B']=set(a for match in m.GetSubstructMatches(q) for a in match)
 labels['B']='Nitrile: C triple-bond N' if row['slug']=='bosutinib' else 'Amide: C(=O)-NH'
 q=Chem.MolFromSmarts('N1CCNCC1')
 pip=set(a for match in m.GetSubstructMatches(q) for a in match)
 if pip: groups['C']=pip; labels['C']='Piperazine: non-aromatic ring'
 if row['slug']=='nilotinib':
  groups['D']=set(a for match in m.GetSubstructMatches(Chem.MolFromSmarts('C(F)(F)F')) for a in match);labels['D']='Trifluoromethyl: CF3'
 if row['slug']=='dasatinib':
  groups['D']=set(a for r in rings if any(m.GetAtomWithIdx(a).GetSymbol()=='S' for a in r) for a in r);labels['D']='Thiazole: five-membered N/S ring'
 rdDepictor.Compute2DCoords(m)
 drawer=rdMolDraw2D.MolDraw2DCairo(1600,640)
 opts=drawer.drawOptions();opts.padding=0.06;opts.bondLineWidth=3.1;opts.minFontSize=26;opts.maxFontSize=36
 opts.highlightBondWidthMultiplier=15
 ac={a:colors[k] for k,aa in groups.items() for a in aa}
 bc={b.GetIdx():colors[k] for k,aa in groups.items() for b in m.GetBonds() if b.GetBeginAtomIdx() in aa and b.GetEndAtomIdx() in aa}
 drawer.DrawMolecule(m,highlightAtoms=list(ac),highlightBonds=list(bc),highlightAtomColors=ac,highlightBondColors=bc)
 drawer.FinishDrawing()
 panel=Image.new('RGB',(1600,850),'white');panel.paste(Image.open(io.BytesIO(drawer.GetDrawingText())),(0,0));d=ImageDraw.Draw(panel)
 d.line((30,640,1570,640),fill='#d9e1e8',width=2)
 for i,(k,lab) in enumerate(labels.items()):
  x=40+(i%2)*790;y=670+(i//2)*70
  rgb=tuple(int(z*255) for z in colors[k]);d.rounded_rectangle((x,y,x+44,y+44),radius=8,fill=rgb)
  d.text((x+11,y+4),k,font=font(27,True),fill=INK);d.text((x+60,y+4),lab,font=font(29),fill=INK)
 p=FIG/f'bcr-abl-inhibitors-fig{idx:02d}-{row["slug"]}.png';panel.save(p,dpi=(300,300))
 # Insert immediately into the evolving report skeleton, later filled with teaching prose.
 with (ROOT/'drafts/figure_insertions.md').open('a') as f:
  f.write(f'\n## {row["name"]}\n\n![{row["name"]}: neutral parent structure. PubChem CID {row["cid"]}; ChEBI {row["chebi"]}.](../figures/{p.name})\n')
 report.append({'drug':row['name'],'connectivity_crosscheck':'PASS','formula':row['formula'],'inchikey':row['inchikey'],'neutral_parent':True,'aromatic_rings':rdMolDescriptors.CalcNumAromaticRings(m),'piperazine':bool(pip),'highlight_labels':labels,'image':str(p)})
# Reusable chemical vocabulary drawn by the same chemical renderer, not an image model.
key=Image.new('RGB',(1600,620),'white');d=ImageDraw.Draw(key)
items=[('Benzene','c1ccccc1','6 carbon atoms; aromatic'),('Pyridine','c1ccncc1','6-membered ring; 1 N'),('Pyrimidine','c1ncncc1','6-membered ring; 2 N'),('Piperazine','N1CCNCC1','Non-aromatic ring; 2 N'),('Amide','CC(=O)NC','Find C(=O)-N'),('Nitrile','CC#N','Find a triple bond to N')]
for i,(title,smi,note) in enumerate(items):
 x=(i%3)*530;y=(i//3)*310
 mol=Chem.MolFromSmiles(smi);rdDepictor.Compute2DCoords(mol)
 if title=='Pyrimidine':
  ns=[a.GetIdx() for a in mol.GetAtoms() if a.GetSymbol()=='N']
  assert len(Chem.GetShortestPath(mol,*ns))==3, 'Pyrimidine must have 1,3 ring nitrogens'
 dr=rdMolDraw2D.MolDraw2DCairo(490,185);o=dr.drawOptions();o.bondLineWidth=3;o.minFontSize=29;o.maxFontSize=35;dr.DrawMolecule(mol);dr.FinishDrawing()
 d.text((x+25,y+10),title,font=font(31,True),fill=INK)
 key.paste(Image.open(io.BytesIO(dr.GetDrawingText())),(x+10,y+60))
 d.text((x+25,y+255),note,font=font(25),fill=INK)
key.save(FIG/'bcr-abl-inhibitors-fig01-reading-key.png',dpi=(300,300))
with (ROOT/'drafts/figure_insertions.md').open('a') as f:f.write('\n![Chemical vocabulary: small motif examples, not additional drugs.](../figures/bcr-abl-inhibitors-fig01-reading-key.png)\n')
(ROOT/'data/structure_validation.json').write_text(json.dumps({'rdkit_version':rdBase.rdkitVersion,'results':report},indent=2))
print(json.dumps(report,indent=2))
