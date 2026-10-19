from pathlib import Path
root=Path('/home/novix/workspace/writing_space')
s=(root/'drafts/v3_draft.md').read_text()
s=s.replace('    \\setlength{\\parskip}{5pt}', '    \\geometry{a4paper,margin=1.7cm}\n    \\AtBeginDocument{\\fontsize{10.5}{12.5}\\selectfont}\n    \\setlength{\\parskip}{4pt}')
s=s.replace('A visual guide to reading and remembering their chemical structures','Read the landmarks. Learn the differences.')
s=s.replace('    \\setcounter{secnumdepth}{0}', '    \\setcounter{secnumdepth}{0}\n    \\usepackage{titlesec}\n    \\titlespacing*{\\section}{0pt}{8pt}{5pt}\n    \\titlespacing*{\\subsection}{0pt}{7pt}{4pt}\n    \\titlespacing*{\\subsubsection}{0pt}{6pt}{3pt}')
# More compact salt expression, keeping the important separation explicit.
a='\\underbrace{\\mathrm{[imatinib+H]^+}}_{\\text{drug ion}}\n\\quad+\\quad\n\\underbrace{\\mathrm{CH_3SO_3^-}}_{\\text{mesylate counterion}}'
b='\\mathrm{[imatinib+H]^+}\\quad+\\quad\\mathrm{CH_3SO_3^-}'
s=s.replace(a,b)
(root/'drafts/v4_draft.md').write_text(s)
