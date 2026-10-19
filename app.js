/**
 * BCR-ABL 3D Molecule Viewer & Link Hub
 * Interactive 360-degree rotation engine & scientific reference portal
 */

// Application State
const state = {
  molecules: [],
  activeMoleculeId: 'imatinib',
  viewer: null,
  modalViewer: null,
  isSpinning: true,
  spinSpeed: 1.0,
  currentStyle: 'ballAndStick',
  viewMode: '3d', // '3d' or '2d'
  language: 'uz' // 'uz' or 'en'
};

// UI Translations
const translations = {
  uz: {
    brandTitle: "BCR–ABL 3D Link Hub",
    brandSub: "Kinaza ingibitorlari · 360° Interaktiv Strukturaviy Portal",
    btnCompare: "Qiyosiy tahlil",
    btnStudy: "O'rganish qo'llanmasi",
    heroBadge: "3D WebGL Molekulyar Dinamika",
    heroH2: "Moddalarning 3D strukturalarini <span>360° burchakda</span> tahlil qiling",
    heroP: "BCR–ABL leykemiya nishoniga ta'sir qiluvchi to'rtta asosiy ingibitor (Imatinib, Nilotinib, Dasatinib, Bosutinib) va yangi avlod moddalarining 3D fazoviy konformatsiyalari, anatomik belgilari va rasmiy xalqaro havola resurslari.",
    stat1: "Moddalar & Avlodlar",
    stat2: "Fazo aylanishi",
    stat3: "Baza & 3D vositalar",
    stat4: "Tasdiqlangan SMILES",
    spinLbl: "Aylanish:",
    spinBtn: "360° Avto",
    styleLbl: "Model:",
    linkHubTitle: "3D & Ma'lumotlar Link Hubi",
    linkHubDesc: "Mazkur moddaning tashqi interaktiv 3D vizualizatorlari va xalqaro kimyoviy bazalariga to'g'ridan-to'g'ri havolalar:",
    chemIdTitle: "Kimyoviy Parametrlar",
    propFormula: "Brutto Formula",
    propMw: "Molekulyar Og'irlik",
    memoryCueLabel: "Xotira Kaliti (Mnemonic)",
    landmarksTitle: "Molekulyar Anatomik Belgilar",
    mechanismTitle: "Ta'sir Mexanizmi",
    pdbBtnLabel: "PDB Kompleks",
    tableHeader: "BCR–ABL Ingibitorlarining Qiyosiy Tahlili (Table 1)",
    tableDesc: "Ushbu jadval o'quv qo'llanmasi ma'lumotlariga asoslangan bo'lib, molekulalarni tezda bir-biridan ajratish va 3D fazodagi o'ziga xos farqlarini ko'rish imkonini beradi.",
    thFeature: "Strukturaviy belgi",
    selfCheckTitle: "O'z-o'zini Tekshirish Savollari (Self-Check Q&A)",
    selfCheckDesc: "Strukturalarni o'rganish bo'yicha mustaqil bilimingizni sinab ko'ring. Javobni ochish uchun tugmani bosing:",
    showAnswer: "Javobni ko'rish",
    hideAnswer: "Yashirish",
    copied: "Nusxalandi!",
    hudSpinActive: "360° Aylanish faol",
    hudSpinPaused: "360° Aylanish to'xtatildi",
    atomDefaultPrompt: "Atom ma'lumotini ko'rish uchun molekula ustiga bosing"
  },
  en: {
    brandTitle: "BCR–ABL 3D Link Hub",
    brandSub: "Kinase Inhibitors · 360° Interactive Structural Portal",
    btnCompare: "Comparative Matrix",
    btnStudy: "Study Guide",
    heroBadge: "3D WebGL Molecular Dynamics",
    heroH2: "Inspect 3D molecular structures in full <span>360° rotation</span>",
    heroP: "Interactive 3D conformations, anatomical recognition landmarks, and curated international link hub for the four established BCR-ABL inhibitors (Imatinib, Nilotinib, Dasatinib, Bosutinib) and advanced generations.",
    stat1: "Substances & Gens",
    stat2: "Spatial Rotation",
    stat3: "Databases & 3D Tools",
    stat4: "Verified SMILES",
    spinLbl: "Rotation:",
    spinBtn: "360° Auto-spin",
    styleLbl: "Render:",
    linkHubTitle: "3D & Reference Link Hub",
    linkHubDesc: "Direct curated links to external interactive 3D viewers and official chemical/pharmacological databases:",
    chemIdTitle: "Chemical Identity",
    propFormula: "Chemical Formula",
    propMw: "Molecular Weight",
    memoryCueLabel: "Memory Cue (Mnemonic)",
    landmarksTitle: "Anatomical Recognition Landmarks",
    mechanismTitle: "Mechanism of Action",
    pdbBtnLabel: "PDB Complex",
    tableHeader: "BCR–ABL Inhibitors Comparative Matrix (Table 1)",
    tableDesc: "Summarizes the verified neutral parents to quickly distinguish motifs and compare structural properties in 3D space.",
    thFeature: "Structural Feature",
    selfCheckTitle: "Self-Check Questions (Section 7)",
    selfCheckDesc: "Test your retention of structural landmarks. Click to reveal answers:",
    showAnswer: "Show answer",
    hideAnswer: "Hide answer",
    copied: "Copied!",
    hudSpinActive: "360° Auto-rotation Active",
    hudSpinPaused: "360° Rotation Paused",
    atomDefaultPrompt: "Click or hover any atom to inspect coordinates"
  }
};

// Self Check Questions Data
const selfCheckData = [
  {
    id: 1,
    q_uz: "1. Skelet formulasining belgilanmagan burchagida qaysi element nazarda tutilgan?",
    q_en: "1. At an unlabeled corner of a skeletal drawing, which element is implied?",
    a_uz: "Uglerod (C). Neytral uglerod odatda to'rtta kovalent bog' hosil qiladi, unga birikkan vodorodlar odatda chizilmaydi.",
    a_en: "Carbon (C). Ordinary neutral carbon has four bonds in total; hydrogens attached to carbon are usually omitted."
  },
  {
    id: 2,
    q_uz: "2. Imatinib mezilatdagi oltingugurt (S) atomi imatinibning asosiy dori molekulasida bormi?",
    q_en: "2. Is the sulfur in 'imatinib mesylate' inside the imatinib parent drug?",
    a_uz: "YO'Q! Imatinibning o'zida oltingugurt yo'q. Oltingugurt faqat unga tuz sifatida qo'shilgan mezilat (metansulfonat, CH3SO3⁻) anioni tarkibida mavjud.",
    a_en: "NO! There is no sulfur in imatinib itself. It is present only in the added mesylate (methanesulfonate, CH3SO3⁻) counterion."
  },
  {
    id: 3,
    q_uz: "3. Nilotinibdagi uchta F belgisi uchta alohida ftorli halqani anglatadimi?",
    q_en: "3. Do the three F labels in nilotinib mean three separate fluorine-containing rings?",
    a_uz: "YO'Q! Uchta ftor (F) atomi bitta uglerod atomiga kovalent birikib, -CF3 (triftormetil) guruhini hosil qiladi.",
    a_en: "NO! Three fluorine atoms are attached to a single carbon atom, forming a trifluoromethyl (-CF3) group."
  },
  {
    id: 4,
    q_uz: "4. Dasatinib molekulasidagi ikkala kislorod (O) atomi qayerda joylashgan?",
    q_en: "4. Where are the two oxygen atoms located in dasatinib?",
    a_uz: "Birinchi kislorod amid guruhining karbonilida (C=O); ikkinchisi esa piperazin dumi uchidagi spirt (–CH2–CH2–OH) guruhida joylashgan.",
    a_en: "One is in the amide carbonyl (C=O); the other is in the terminal hydroxyethyl alcohol (–CH2–CH2–OH)."
  },
  {
    id: 5,
    q_uz: "5. Bosutinibdagi -C≡N nitril uch bog'i xinolin ichidagi azotlar sonini oshiradimi?",
    q_en: "5. Does the N at the end of the triple bond increase the number of nitrogen atoms inside quinoline?",
    a_uz: "YO'Q! Nitril azoti xinolin halqasidan tashqarida, zanjir uchida joylashgan.",
    a_en: "NO! The nitrile nitrogen is outside the fused ring skeleton."
  },
  {
    id: 6,
    q_uz: "6. Ushbu to'rtta asosiy ingibitordan qaysi birida umuman AMID (C(=O)-NH) guruhi YO'Q?",
    q_en: "6. Which of these four BCR-ABL inhibitors completely lacks an AMIDE group?",
    a_uz: "BOSUTINIBDA! Unda amid yo'q. Uning kislorodlari efirlarda (-OCH3 va propoksi ko'prik), aromatik halqalar esa oddiy ikkilamchi amin (-NH-) orqali bog'langan.",
    a_en: "BOSUTINIB! It has no C(=O)–NH amide group; its oxygens are in ethers and its rings are joined by an amine linkage."
  }
];

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', async () => {
  await loadMoleculeData();
  initPills();
  init3DViewer();
  setupEventListeners();
  renderSelfCheck();
  selectMolecule(state.activeMoleculeId);
  applyTranslations();
});

// Load molecules data
async function loadMoleculeData() {
  if (window.MOLECULES_DATA && Array.isArray(window.MOLECULES_DATA) && window.MOLECULES_DATA.length > 0) {
    state.molecules = window.MOLECULES_DATA;
    return;
  }
  
  try {
    const res = await fetch('data/molecules.json');
    state.molecules = await res.json();
  } catch (err) {
    console.error('Failed to fetch molecules.json:', err);
  }
}

// Initialize Molecule Selection Pills
function initPills() {
  const container = document.getElementById('molecule-pills');
  if (!container) return;
  
  container.innerHTML = '';
  state.molecules.forEach(mol => {
    const btn = document.createElement('button');
    btn.className = `mol-pill-btn ${mol.id === state.activeMoleculeId ? 'active' : ''}`;
    btn.id = `pill-${mol.id}`;
    btn.innerHTML = `
      <div class="pill-dot"></div>
      <div>
        <span class="pill-title">${mol.name}</span>
        <span class="pill-sub">${mol.tradeName} · ${mol.generation.split(' ')[0]}</span>
      </div>
    `;
    btn.addEventListener('click', () => selectMolecule(mol.id));
    container.appendChild(btn);
  });
}

// Select active molecule
function selectMolecule(molId) {
  state.activeMoleculeId = molId;
  
  // Update pills UI
  document.querySelectorAll('.mol-pill-btn').forEach(btn => btn.classList.remove('active'));
  const activePill = document.getElementById(`pill-${molId}`);
  if (activePill) activePill.classList.add('active');
  
  const mol = state.molecules.find(m => m.id === molId);
  if (!mol) return;
  
  // Update Header & Details
  document.getElementById('active-mol-name').textContent = mol.name;
  document.getElementById('active-mol-trade').textContent = mol.tradeName;
  document.getElementById('val-formula').textContent = mol.formula;
  document.getElementById('val-mw').textContent = mol.molWeight;
  document.getElementById('val-cid').textContent = mol.cid;
  document.getElementById('val-chebi').textContent = mol.chebi;
  document.getElementById('val-smiles').textContent = mol.smiles;
  document.getElementById('val-inchikey').textContent = mol.inchikey;
  
  // Memory Cue
  const memCue = state.language === 'en' ? mol.memoryCue.en : mol.memoryCue.uz;
  document.getElementById('val-memory-cue').textContent = `"${memCue}"`;
  
  // Salt & Form Explanation
  const formExp = mol.formExplanation;
  document.getElementById('val-form-title').textContent = formExp.title;
  document.getElementById('val-form-desc').textContent = state.language === 'en' ? formExp.en : formExp.uz;
  
  // Mechanism
  document.getElementById('val-mechanism-desc').textContent = state.language === 'en' ? mol.mechanism.en : mol.mechanism.uz;
  
  // Download SDF link
  const dlBtn = document.getElementById('btn-dl-sdf');
  if (dlBtn) {
    dlBtn.href = mol.sdfFile;
    dlBtn.download = `${mol.id}_3d.sdf`;
  }
  
  // View PDB button
  const pdbBtn = document.getElementById('btn-view-pdb');
  if (pdbBtn) {
    pdbBtn.onclick = () => window.open(mol.links.rcsbPdb, '_blank');
  }
  
  // Render Link Hub Grid
  renderLinkHub(mol);
  
  // Render Anatomical Landmarks
  renderLandmarks(mol);
  
  // Update 2D diagram
  const img2d = document.getElementById('overlay-2d-img');
  if (img2d) {
    if (mol.figureImage) {
      img2d.src = mol.figureImage;
      img2d.style.display = 'block';
    } else {
      img2d.src = '';
      img2d.style.display = 'none';
    }
  }
  
  // Load 3D model in viewer
  load3DStructure(mol);
}

// Render Link Hub Cards for the active molecule
function renderLinkHub(mol) {
  const container = document.getElementById('hub-links-container');
  if (!container) return;
  
  const links = [
    {
      name: "PubChem 3D Conformer",
      type: "360° WebGL 3D",
      url: mol.links.pubchem3d,
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`
    },
    {
      name: "MolView 3D Interactive",
      type: "Live 3D Explorer",
      url: mol.links.molview,
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`
    },
    {
      name: `RCSB PDB (${mol.pdbId})`,
      type: "Kristall Kinaza Kompleks",
      url: mol.links.rcsbPdb,
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`
    },
    {
      name: `PubChem (CID ${mol.cid})`,
      type: "Rasmiy Kimyoviy Baza",
      url: mol.links.pubchem,
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`
    },
    {
      name: `ChEBI (${mol.chebi})`,
      type: "EMBL-EBI Biologik Baza",
      url: mol.links.chebi,
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
    },
    {
      name: "DrugBank Monograph",
      type: "Klinik Farmakologiya",
      url: mol.links.drugbank,
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>`
    },
    {
      name: "DailyMed (FDA Label)",
      type: "AQSh FDA Yo'riqnomasi",
      url: mol.links.dailymed,
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`
    },
    {
      name: "PMC3517953 Ilmiy Maqola",
      type: "BCR-ABL Arsenal Tahlili",
      url: mol.links.paper,
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`
    }
  ];
  
  container.innerHTML = links.map(link => `
    <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="hub-link-item">
      <div class="hub-link-icon">${link.icon}</div>
      <div class="hub-link-info">
        <span class="hub-link-name">${link.name}</span>
        <span class="hub-link-type">${link.type} ↗</span>
      </div>
    </a>
  `).join('');
}

// Render Landmarks
function renderLandmarks(mol) {
  const container = document.getElementById('landmarks-list');
  if (!container) return;
  
  container.innerHTML = mol.landmarks.map(lm => {
    const desc = state.language === 'en' ? lm.en : lm.uz;
    return `
      <div class="landmark-item">
        <div class="landmark-badge">${lm.letter}</div>
        <div class="landmark-content">
          <h4>${lm.badge}</h4>
          <p>${desc}</p>
        </div>
      </div>
    `;
  }).join('');
}

// Initialize 3Dmol Viewer
function init3DViewer() {
  const element = document.getElementById('mol-viewport');
  if (!element || typeof $3Dmol === 'undefined') {
    console.error('3Dmol library or viewport element not ready');
    return;
  }
  
  const config = {
    backgroundColor: '#070b14',
    defaultcolors: $3Dmol.rasmolElementColors
  };
  
  state.viewer = $3Dmol.createViewer(element, config);
}

// Load and render 3D structure
async function load3DStructure(mol) {
  if (!state.viewer) return;
  
  let sdf = mol.sdfContent;
  
  if (!sdf) {
    try {
      const res = await fetch(mol.sdfFile);
      sdf = await res.text();
      mol.sdfContent = sdf;
    } catch (e) {
      console.error('Error fetching SDF:', e);
      return;
    }
  }
  
  state.viewer.clear();
  state.viewer.addModel(sdf, 'sdf');
  applyViewerStyle(state.viewer, state.currentStyle);
  
  // Set up hover atom inspector
  state.viewer.setHoverable({}, true, 
    (atom, viewer, event, container) => {
      if (!atom) return;
      showAtomInfo(atom);
    },
    (atom, viewer) => {
      // hover unselected
    }
  );
  
  // Also on click atom
  state.viewer.setClickable({}, true, (atom) => {
    if (atom) showAtomInfo(atom);
  });
  
  state.viewer.zoomTo();
  state.viewer.render();
  
  // Handle 360 spin
  if (state.isSpinning) {
    state.viewer.spin('y', state.spinSpeed);
  }
}

// Apply styling to 3D model
function applyViewerStyle(viewerInstance, styleName) {
  if (!viewerInstance) return;
  
  viewerInstance.removeAllSurfaces();
  
  switch (styleName) {
    case 'ballAndStick':
      viewerInstance.setStyle({}, {
        stick: { radius: 0.16, colorscheme: 'rasmol' },
        sphere: { scale: 0.28, colorscheme: 'rasmol' }
      });
      break;
    case 'spacefill':
      viewerInstance.setStyle({}, {
        sphere: { scale: 0.85, colorscheme: 'rasmol' }
      });
      break;
    case 'stick':
      viewerInstance.setStyle({}, {
        stick: { radius: 0.24, colorscheme: 'rasmol' }
      });
      break;
    case 'wireframe':
      viewerInstance.setStyle({}, {
        line: { linewidth: 3, colorscheme: 'rasmol' }
      });
      break;
    case 'surface':
      viewerInstance.setStyle({}, {
        stick: { radius: 0.14, colorscheme: 'rasmol' }
      });
      try {
        viewerInstance.addSurface($3Dmol.SurfaceType.VDW, {
          opacity: 0.82,
          color: 'spectrum'
        });
      } catch (err) {
        console.warn('Surface generation notice:', err);
      }
      break;
    default:
      viewerInstance.setStyle({}, {
        stick: { radius: 0.16 },
        sphere: { scale: 0.28 }
      });
  }
  
  viewerInstance.render();
}

// Display Atom Information in HUD
function showAtomInfo(atom) {
  const elem = atom.elem || 'C';
  const names = {
    'C': 'Uglerod (Carbon)',
    'N': 'Azot (Nitrogen)',
    'O': 'Kislorod (Oxygen)',
    'S': 'Oltingugurt (Sulfur)',
    'Cl': 'Xlor (Chlorine)',
    'F': 'Ftor (Fluorine)',
    'H': 'Vodorod (Hydrogen)'
  };
  
  const colors = {
    'C': '#909090',
    'N': '#3050F8',
    'O': '#FF0D0D',
    'S': '#FFFF30',
    'Cl': '#1FF01F',
    'F': '#90E050',
    'H': '#FFFFFF'
  };
  
  const name = names[elem] || elem;
  const color = colors[elem] || '#06B6D4';
  
  const indicator = document.getElementById('atom-indicator');
  const text = document.getElementById('atom-info-text');
  
  if (indicator) indicator.style.backgroundColor = color;
  if (text) {
    const x = atom.x ? atom.x.toFixed(2) : '0';
    const y = atom.y ? atom.y.toFixed(2) : '0';
    const z = atom.z ? atom.z.toFixed(2) : '0';
    text.innerHTML = `<strong>Atom #${atom.serial || atom.index || ''} ${elem}</strong>: ${name} [X: ${x}, Y: ${y}, Z: ${z}]`;
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // 360 Auto-spin Toggle
  const btnToggleSpin = document.getElementById('btn-toggle-spin');
  if (btnToggleSpin) {
    btnToggleSpin.addEventListener('click', () => {
      state.isSpinning = !state.isSpinning;
      btnToggleSpin.classList.toggle('active', state.isSpinning);
      
      const hudText = document.getElementById('hud-rotation-text');
      const t = translations[state.language];
      
      if (state.isSpinning) {
        state.viewer.spin('y', state.spinSpeed);
        if (hudText) hudText.textContent = t.hudSpinActive;
      } else {
        state.viewer.spin(false);
        if (hudText) hudText.textContent = t.hudSpinPaused;
      }
    });
  }
  
  // Speed Toggle (1x, 2x, 0.5x)
  const btnSpeed = document.getElementById('btn-speed-toggle');
  if (btnSpeed) {
    btnSpeed.addEventListener('click', () => {
      if (state.spinSpeed === 1.0) {
        state.spinSpeed = 2.0;
        btnSpeed.textContent = '2x';
      } else if (state.spinSpeed === 2.0) {
        state.spinSpeed = 0.5;
        btnSpeed.textContent = '0.5x';
      } else {
        state.spinSpeed = 1.0;
        btnSpeed.textContent = '1x';
      }
      
      if (state.isSpinning && state.viewer) {
        state.viewer.spin('y', state.spinSpeed);
      }
    });
  }
  
  // Axis Rotation Buttons
  document.getElementById('btn-rot-x')?.addEventListener('click', () => {
    if (state.viewer) {
      state.viewer.rotate(90, 'x');
      state.viewer.render();
    }
  });
  
  document.getElementById('btn-rot-y')?.addEventListener('click', () => {
    if (state.viewer) {
      state.viewer.rotate(90, 'y');
      state.viewer.render();
    }
  });
  
  document.getElementById('btn-rot-z')?.addEventListener('click', () => {
    if (state.viewer) {
      state.viewer.rotate(90, 'z');
      state.viewer.render();
    }
  });
  
  // Reset Camera View
  document.getElementById('btn-reset-cam')?.addEventListener('click', () => {
    if (state.viewer) {
      state.viewer.zoomTo();
      state.viewer.render();
    }
  });
  
  // Style Selector
  const styleSelect = document.getElementById('style-select');
  if (styleSelect) {
    styleSelect.addEventListener('change', (e) => {
      state.currentStyle = e.target.value;
      applyViewerStyle(state.viewer, state.currentStyle);
    });
  }
  
  // 3D vs 2D Diagram View Switch
  const tab3d = document.getElementById('tab-mode-3d');
  const tab2d = document.getElementById('tab-mode-2d');
  const overlay2d = document.getElementById('overlay-2d');
  
  tab3d?.addEventListener('click', () => {
    tab3d.classList.add('active');
    tab2d?.classList.remove('active');
    overlay2d?.classList.remove('visible');
    state.viewMode = '3d';
  });
  
  tab2d?.addEventListener('click', () => {
    tab2d.classList.add('active');
    tab3d?.classList.remove('active');
    overlay2d?.classList.add('visible');
    state.viewMode = '2d';
  });
  
  // Take HD Screenshot
  document.getElementById('btn-screenshot')?.addEventListener('click', () => {
    if (!state.viewer) return;
    const pngUri = state.viewer.pngURI();
    const link = document.createElement('a');
    link.download = `${state.activeMoleculeId}_3d_snapshot.png`;
    link.href = pngUri;
    link.click();
  });
  
  // Fullscreen Modal
  const modal = document.getElementById('fullscreen-modal');
  const btnFs = document.getElementById('btn-fullscreen');
  const btnCloseModal = document.getElementById('btn-modal-close');
  
  btnFs?.addEventListener('click', () => {
    modal?.classList.add('open');
    initModalViewer();
  });
  
  btnCloseModal?.addEventListener('click', () => {
    modal?.classList.remove('open');
    if (state.modalViewer) {
      state.modalViewer.spin(false);
      state.modalViewer.clear();
    }
  });
  
  // Copy Buttons
  document.getElementById('btn-copy-smiles')?.addEventListener('click', () => {
    const val = document.getElementById('val-smiles')?.textContent;
    copyToClipboard(val, 'btn-copy-smiles');
  });
  
  document.getElementById('btn-copy-inchikey')?.addEventListener('click', () => {
    const val = document.getElementById('val-inchikey')?.textContent;
    copyToClipboard(val, 'btn-copy-inchikey');
  });
  
  // Language Switcher
  document.getElementById('lang-btn')?.addEventListener('click', () => {
    state.language = state.language === 'uz' ? 'en' : 'uz';
    applyTranslations();
    selectMolecule(state.activeMoleculeId);
    renderSelfCheck();
  });
}

// Copy to clipboard helper with tooltip feedback
function copyToClipboard(text, btnId) {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById(btnId);
    if (btn) {
      const original = btn.textContent;
      btn.textContent = translations[state.language].copied;
      btn.style.color = '#10B981';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.color = '';
      }, 1500);
    }
  });
}

// Fullscreen Modal 3Dmol instance
function initModalViewer() {
  const container = document.getElementById('modal-viewport');
  if (!container || typeof $3Dmol === 'undefined') return;
  
  const mol = state.molecules.find(m => m.id === state.activeMoleculeId);
  if (!mol) return;
  
  document.getElementById('modal-mol-title').textContent = `${mol.name} (${mol.tradeName}) - 3D 360° Panorama`;
  
  container.innerHTML = '';
  state.modalViewer = $3Dmol.createViewer(container, {
    backgroundColor: '#05070e',
    defaultcolors: $3Dmol.rasmolElementColors
  });
  
  state.modalViewer.addModel(mol.sdfContent, 'sdf');
  applyViewerStyle(state.modalViewer, state.currentStyle);
  state.modalViewer.zoomTo();
  state.modalViewer.render();
  state.modalViewer.spin('y', state.spinSpeed);
}

// Render Self Check Q&A
function renderSelfCheck() {
  const container = document.getElementById('self-check-container');
  if (!container) return;
  
  const isEn = state.language === 'en';
  const t = translations[state.language];
  
  container.innerHTML = selfCheckData.map(item => `
    <div class="glass-panel check-card">
      <div class="check-q">${isEn ? item.q_en : item.q_uz}</div>
      <button class="check-answer-btn" onclick="toggleAnswer(${item.id})">
        <span id="ans-btn-txt-${item.id}">${t.showAnswer}</span>
      </button>
      <div class="check-a" id="ans-${item.id}">
        ${isEn ? item.a_en : item.a_uz}
      </div>
    </div>
  `).join('');
}

// Toggle Answer visibility
window.toggleAnswer = function(id) {
  const ans = document.getElementById(`ans-${id}`);
  const btnTxt = document.getElementById(`ans-btn-txt-${id}`);
  const t = translations[state.language];
  if (!ans || !btnTxt) return;
  
  const isShown = ans.classList.contains('revealed');
  if (isShown) {
    ans.classList.remove('revealed');
    btnTxt.textContent = t.showAnswer;
  } else {
    ans.classList.add('revealed');
    btnTxt.textContent = t.hideAnswer;
  }
};

// Apply language translations across UI
function applyTranslations() {
  const t = translations[state.language];
  
  document.getElementById('ui-brand-title').textContent = t.brandTitle;
  document.getElementById('ui-brand-sub').textContent = t.brandSub;
  document.getElementById('ui-btn-compare').textContent = t.btnCompare;
  document.getElementById('ui-btn-study').textContent = t.btnStudy;
  document.getElementById('ui-hero-badge').textContent = t.heroBadge;
  document.getElementById('ui-hero-h2').innerHTML = t.heroH2;
  document.getElementById('ui-hero-p').textContent = t.heroP;
  document.getElementById('ui-stat-1').textContent = t.stat1;
  document.getElementById('ui-stat-2').textContent = t.stat2;
  document.getElementById('ui-stat-3').textContent = t.stat3;
  document.getElementById('ui-stat-4').textContent = t.stat4;
  document.getElementById('ui-spin-lbl').textContent = t.spinLbl;
  document.getElementById('spin-btn-text').textContent = t.spinBtn;
  document.getElementById('ui-style-lbl').textContent = t.styleLbl;
  document.getElementById('ui-link-hub-title').textContent = t.linkHubTitle;
  document.getElementById('ui-link-hub-desc').textContent = t.linkHubDesc;
  document.getElementById('ui-chem-id-title').textContent = t.chemIdTitle;
  document.getElementById('ui-prop-formula').textContent = t.propFormula;
  document.getElementById('ui-prop-mw').textContent = t.propMw;
  document.getElementById('ui-memory-cue-label').textContent = t.memoryCueLabel;
  document.getElementById('ui-landmarks-title').textContent = t.landmarksTitle;
  document.getElementById('ui-mechanism-title').textContent = t.mechanismTitle;
  document.getElementById('ui-pdb-btn-label').textContent = t.pdbBtnLabel;
  document.getElementById('ui-table-header').textContent = t.tableHeader;
  document.getElementById('ui-table-desc').textContent = t.tableDesc;
  document.getElementById('th-feature').textContent = t.thFeature;
  document.getElementById('ui-self-check-title').textContent = t.selfCheckTitle;
  document.getElementById('ui-self-check-desc').textContent = t.selfCheckDesc;
  
  const langLabel = document.getElementById('lang-label');
  if (langLabel) {
    langLabel.textContent = state.language === 'uz' ? "O'zbekcha / EN" : "English / UZ";
  }
}
