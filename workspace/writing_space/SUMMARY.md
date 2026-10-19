# Completed visual study guide

## Open first
- **bcr-abl-inhibitors-visual-study-guide.pdf** — eight-page illustrated guide.
- **bcr-abl-inhibitors-visual-study-guide.md** — editable Markdown; figures resolve relative to this file.
- **final/bcr-abl-inhibitors-source-bundle.zip** — portable source bundle with Markdown, figures, references, verified molecular inputs, renderer, and review reports.

## Contents
1. Skeletal-structure reading rules and six example motifs.
2. Imatinib parent structure and separate mesylate explanation.
3. Nilotinib with CF3 and imidazole landmarks.
4. Dasatinib with thiazole, chlorine and hydroxyethyl landmarks.
5. Bosutinib with fused quinoline and nitrile landmarks.
6. Comparison table and simplified BCR–ABL inhibition explanation.
7. Glossary, six self-check questions with answers, five-minute study routine.
8. Linked references and structure provenance.

## Final quality results
- Actual final PDF: **8 A4 pages**, five integrated explanatory images, embedded DejaVu and Latin Modern Math fonts.
- Acceptance gate: **PASS**, 2,573 approximate source words, seven bibliography source groups, all required report/drug/self-check sections present. See `data/final_quality_gate.json`.
- All four molecular structures: PubChem/ChEBI canonical connectivity, formula and InChIKey match; neutral one-component parents. `data/structure_validation.json`.
- Additional SMARTS feature checks: amides present only in imatinib/nilotinib/dasatinib; nitrile only in bosutinib among these drugs. `data/citation_and_release_checks.json`.
- Formatting: all eight pages rendered and opened as images. Initial overflow layout revised. Page 1 motif correction re-rendered and reopened. Final pages 2–8 pixel-identical to reviewed pages; automated bounds checks pass. No blank/overflow pages or missing figures detected. Temporary review images removed after checks.
- Citation integrity: seven numbered reference groups appear in source and references page. Database and product-label citations are authoritative non-paper records. Mechanism paper verified through MCP paper search and PMC metadata/full-text opening. No placeholders or invented papers. The general gate's citation-pattern counter does not recognize most numbered references; the dedicated release script checks all seven groups instead.
- Peer review: completed skill-guided self-review, not independent external review. Caught and corrected the introductory pyrimidine example; all four drug structures were already correct. `PEER_REVIEW.md`.

## Reproduce
With Python, RDKit and Pillow installed, run `python sources/render_structures.py`. Then export Markdown using the bundled `pdf-export` skill helper. Output is an educational report, not a systematic literature review; BibTeX is supplied for reference reuse, while this report uses explicit numbered Markdown citations.

## Limitations
No novel compounds, experimental results, molecular optimization or clinical treatment rankings. Neutral parent drawings deliberately omit counterions/water; named formulation examples are identified separately. No claim is made that AI discovered or validated these established drugs. The PDF is not tagged for screen readers; the editable Markdown provides selectable text and figure captions.
