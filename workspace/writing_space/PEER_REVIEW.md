# Skill-guided peer review — visual structure study guide

## Scope and review method
Proportionate scientific/educational self-review using the peer-review skill; not an independent external expert review. Reviewed v4 report source, PubChem/ChEBI structure records, rendering script, validation JSON, reference trail, extracted PDF text, and all eight rendered page images. No experiments, clinical recommendations, or novel molecular designs are claimed.

## Summary and recommendation
The guide provides a clear beginner progression: notation → four established drug structures → recognition comparison → mechanism limits → active recall. It is appropriate for introductory medicinal-chemistry learning. Recommendation: ready after correcting the motif-key error identified below and rerunning final validation/export.

## Major comment resolved before release
1. **Pyrimidine example connectivity (Figure 1).** The initial renderer's motif example used `c1nccnc1`, which places the two ring nitrogens opposite one another (pyrazine), despite the pyrimidine label. Corrected to `c1ncncc1` (1,3-diazine). Added a graph-distance assertion to prevent recurrence. All four drug structures were separately cross-checked and were unaffected. Regenerate Figure 1 and re-export before release.

## Chemistry and factual review
- Parent-drug identities: four PubChem and four ChEBI records independently retrieved through MCP; canonical connectivity, formula and InChIKey comparisons pass in RDKit.
- Imatinib: pyridine, pyrimidine, two benzene rings, one amide, N-methylpiperazine. Mesylate explicitly separate; no covalent drug–counterion bond implied.
- Nilotinib: pyridine/pyrimidine, imidazole, CF3 and amide; no piperazine. Relative amide direction described correctly rather than presenting it as a simple imatinib tail swap.
- Dasatinib: thiazole, pyrimidine, amide, chlorinated benzene, piperazine and hydroxyethyl alcohol. Sulfur correctly belongs to parent drug.
- Bosutinib: quinoline, nitrile, two covalent chlorines, piperazine and three ether oxygens. No amide. Fused rings distinguished from singly linked rings.
- Salt/hydrate forms are product-specific examples, with neutral anhydrous parent drawings labeled explicitly. No mixture of parent/salt molecular masses.
- Mechanism is limited to ATP-site inhibition and broad BCR–ABL signaling concepts, supported by verified open-access review. Binding contact maps, potency rankings, safety rankings and clinical superiority are not inferred from depictions.

## Minor comments addressed
- Initial export split most drug pages and left short overflow pages. Revised to A4 with 17-mm margins, 10.5-pt body text, compact heading spacing and fixed figure placement. Eight coherent pages now replace the 14-page layout.
- Salt equation simplified to avoid underbrace clutter; adjacent prose explains drug ion and counterion.
- Clarified that the motif-key amide/nitrile examples contain attached carbon groups outside the functional group.
- Pale region colors are supplemented by letters, chemical atom labels and prose; no dependence on color alone.

## Reproducibility and citation integrity
Verified machine-readable structures, rendering code, software version and validation output are retained. Source uses seven numbered reference groups, with four parent records grouped under PubChem and four under ChEBI. Database/product citations are direct authoritative records, not papers; the single mechanism paper was found through MCP paper search and its metadata and opening full text verified through PMC. Targeted searches returning unrelated papers were excluded. No original patient data, statistics or ethics approvals apply.

## Limitations
This is an introductory teaching resource, not a systematic review or a validated pedagogical trial. No 3D bound poses or measured physicochemical data are presented. Not all molecular regions have individual callout arrows; highlights and prose provide region-level labels. Rendered-page review is complemented by automated checks, not a substitute for chemist/instructor feedback.

## Final disposition
Correction completed, figures regenerated, and release PDF exported. Actual-file acceptance gate PASS: eight A4 pages, five integrated figures, 2,573 source words, seven reference groups, all required sections. Corrected first page reopened as a rendered image; final pages 2–8 pixel-identical to the reviewed pages. Additional chemical-feature, citation-provenance and page-boundary checks pass. Ready for educational delivery; see SUMMARY.md and data/final_quality_gate.json.
