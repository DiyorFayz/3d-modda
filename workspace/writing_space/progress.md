# Progress — BCR–ABL inhibitors visual study guide

## Scope
Beginner English report; established imatinib mesylate, nilotinib, dasatinib, bosutinib. No novel molecular design or clinical recommendations.

## Research completed
- MCP PubChem PUG-REST retrieval: parent CIDs 5291, 644241, 3062316, 5328940; connectivity SMILES, formula, InChIKey and descriptions.
- Independent ChEBI records read: CHEBI:45783, 52172, 49375, 39112. Connectivity/formula/InChIKey cross-check planned in rendering script.
- DailyMed product records identified for Gleevec, Tasigna, Sprycel and Bosulif. Only specific product forms discussed; not generalized to all formulations.
- MCP paper searches retrieved Hantschel et al. (2008), Rix et al. (2007), Jabbour and Kantarjian (2025). Several targeted paper searches returned unrelated results; these are excluded. Full text unavailable for selected papers, so no detailed binding-contact claims will be made.

## Visual plan (all explanatory)
| ID | Target | Route | Asset | Caption |
|---|---|---|---|---|
| 01 | Reading key | visual-assets → scientific-schematics → RDKit exception | bcr-abl-inhibitors-fig01-reading-key.png | Six small chemical motifs teach rings, amides, nitriles and piperazine. |
| 02 | Imatinib | same | bcr-abl-inhibitors-fig02-imatinib.png | Neutral imatinib parent; highlights identify named structural regions. |
| 03 | Nilotinib | same | bcr-abl-inhibitors-fig03-nilotinib.png | Neutral nilotinib parent with distinctive CF3 group. |
| 04 | Dasatinib | same | bcr-abl-inhibitors-fig04-dasatinib.png | Anhydrous neutral dasatinib parent with thiazole and hydroxyethyl group. |
| 05 | Bosutinib | same | bcr-abl-inhibitors-fig05-bosutinib.png | Anhydrous neutral bosutinib parent with fused quinoline and nitrile. |
| Table 1 | Comparison | visual-assets → native Markdown table | source table | Recognition features only, not a clinical ranking. |

Scientific-schematics consulted. Its image-generation route is deliberately replaced by deterministic RDKit chemistry rendering to preserve verified atom connectivity, as explicitly required. No image model will draw molecules. Color is redundant with labels and prose; atom letters retain standard colors, while pale region highlights serve as learning cues. All figures inserted as soon as created.

## Completed
- All eight teaching sections drafted (2,573 approximate source words); abstract not applicable to requested educational report.
- Five explanatory figures generated and integrated; native comparison table included.
- PubChem/ChEBI identity cross-checks and functional-group checks passed for all four drugs.
- Full Markdown report exported using pdf-export. Initial math-syntax errors fixed and 14-page overflow layout revised to eight A4 pages.
- Peer review completed; introductory motif key corrected from pyrazine pattern to pyrimidine, with a new graph-distance assertion. Drug structures unaffected.
- All eight PDF pages rendered and inspected through image tools; corrected first page re-inspected. Final pages 2–8 pixel-identical to reviewed images.
- pdfinfo, pdffonts, pdftotext, page-boundary and citation/source-trail checks passed.
- Actual-file report acceptance gate PASS: 8 pages, 5 integrated figures, 7 reference groups, all required sections.
- SUMMARY.md, PEER_REVIEW.md and reproducibility/source bundle prepared. Delivery follows immediately.
