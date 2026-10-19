# BCR–ABL Kinaza Ingibitorlari: 3D Link Hub & 360° Molekulyar Portal

Ushbu interaktiv web ilova loyihadagi `bcr-abl-inhibitors-visual-study-guide.md` va `verified_structures.json` ma'lumotlari asosida yaratilgan bo'lib, leykemiyaga qarshi qo'llaniladigan to'rtta asosiy ingibitor (**Imatinib**, **Nilotinib**, **Dasatinib**, **Bosutinib**) hamda yangi avlod vositalarining (**Ponatinib**, **Asciminib**) 3D fazoviy modellarini **360° burchak ostida erkin aylantirib tomosha qilish** va nufuzli xalqaro ilmiy resurslarga ulanish imkonini beradi.

---

## 🌟 Asosiy Xususiyatlar va Imkoniyatlar

### 1. 360° Interaktiv 3D Molekulyar Viewer (WebGL)
- **360° Uzluksiz Avto-aylanish**: X, Y, Z o'qlari bo'yicha silliq aylanish va tezlikni boshqarish (0.5x, 1x, 2x).
- **Sensor va Sichqoncha orqali erkin boshqaruv**: Molekulani ixtiyoriy 360° burchakka qo'lda burish, yaqinlashtirish (zoom) va siljitish (pan).
- **Vizualizatsiya uslublari (Render styles)**:
  - *Ball & Stick* (Koptok va sterjen - atomlar va kovalent bog'lar)
  - *Spacefill / CPK* (Van-der-Vaals hajmiy fazoviy sferik modeli)
  - *Stick* (Sterjenli karkas)
  - *Wireframe* (Chiziqli skelet)
  - *Surface* (Molekulaning elektrostatik sirti / eruvchanlik yuzasi)
- **Atom Inspektor**: Sichqoncha atom ustiga olib borilganda yoki bosilganda uning nomi (Uglerod, Azot, Kislorod, Oltingugurt, Xlor, Ftor), indeksi va fazoviy (X, Y, Z) koordinatalari ko'rsatiladi.
- **2D / 3D Taqqoslash Rejimi**: Qo'llanmadagi belgilar (A, B, C, D) bilan ajratilgan rasmiy 2D sxemani 3D model bilan yonma-yon solishtirish.
- **HD Skrinshot**: 3D molekulaning tanlangan burchakdagi tasvirini bir bosishda yuklab olish.
- **To'liq Ekran (Fullscreen)**: Katta monitorlarda batafsil o'rganish uchun kengaytirilgan 3D panorama.

---

### 2. Har bir modda uchun Markazlashgan Link Hub (Havolalar Markazi)
Har bir ingibitor kartasida quyidagi bevosita interaktiv manbalarga havolalar jamlangan:
- **PubChem 3D Interactive Conformer**: NCBI PubChem bazasining rasmiy 3D WebGL ko'rinishi.
- **MolView 3D Live Explorer**: MolView interaktiv kimyoviy tahrirlagichida molekulani ochish.
- **RCSB PDB Oqsil-Ligand Kompleksi**: Abl kinaza oqsili bilan kristallografik 3D kompleksi:
  - **1IEP**: Imatinib (STI-571) · Abl kinaza domeni
  - **3CS9**: Nilotinib (AMN107) · Abl kinaza domeni
  - **2HYY**: Dasatinib (BMS-354825) · Abl kinaza domeni
  - **3UE4**: Bosutinib (SKI-606) · Abl kinaza domeni
  - **3OXZ**: Ponatinib · T315I mutanti kompleksi
  - **5L48**: Asciminib · Miristoil allosterik cho'ntagi (STAMP)
- **PubChem Compound Record**: To'liq kimyoviy tavsif (CID).
- **EMBL-EBI ChEBI Database**: Biologik qiziqish uyg'otuvchi kimyoviy ob'ektlar yozuvi.
- **DrugBank Professional**: Klinik farmakologiya va oqsil nishonlari.
- **DailyMed (US FDA)**: Rasmiy tasdiqlangan dori qo'llanmasi (Gleevec, Tasigna, Sprycel, Bosulif).
- **PMC3517953 Ilmiy Maqolasi**: "The Growing Arsenal of ATP-Competitive and Allosteric Inhibitors of BCR-ABL".

---

### 3. Anatomik Bo'laklar (Landmarks) va Xotira Kaliti
Qo'llanmadagi 4 ta asosiy tahlil bosqichi:
- **A belgisi**: Geterotsiklik yadro (Piridin-pirimidin, Xinolin, Imidazol).
- **B belgisi**: Amid ko'prigi (Imatinib, Nilotinib, Dasatinib) yoki Nitril (-C≡N) (Bosutinib).
- **C belgisi**: Piperazin dumi (yoki uning yo'qligi).
- **D belgisi**: Ajratib turuvchi xususiyatlar (Triftormetil -CF3, Tiazoldagi Oltingugurt, Xlorlar).
- **Xotira Kaliti (Mnemonic)**: Masalan, *"Bosutinib = Kondensirlangan xinolin yadrosi + nitril (-C≡N) + 2 ta Cl"*.

---

### 4. Qiyosiy Tahlil Jadvali (Table 1)
Barcha to'rtta moddani quyidagi parametrlar bo'yicha bir qarashda solishtirish:
- Piperazin halqasining mavjudligi
- Amid bog'ining mavjudligi va yo'nalishi
- Ajratib turuvchi asosiy belgi
- Kovalent galogenlar soni (F, Cl)
- Asosiy dori molekulasidagi Oltingugurt (S)
- Bozorga chiqarilgan shakli (Mezilat tuzi, Monogidroxlorid monogidrat, Monogidrat)
- RCSB PDB 3D kodi

---

### 5. Interaktiv O'z-o'zini Tekshirish (Self-Check Viktorina)
Qo'llanmaning 7-bo'limidagi 6 ta nazorat savoli va ularning interaktiv ochiluvchi batafsil ilmiy javoblari.

---

## 🚀 Qanday Ishga Tushiriladi?

### 1-usul: Mahalliy Server Orqali (Tavsiya etiladi)
Loyiha papkasida server allaqachon ishga tushirilgan:
```bash
python -m http.server 8080
```
Brauzeringizda quyidagi manzilni oching:
👉 **[http://localhost:8080](http://localhost:8080)**

### 2-usul: To'g'ridan-to'g'ri Faylni Ochish
Har qanday zamonaviy brauzerda (Chrome, Edge, Firefox, Safari) quyidagi faylni ikki marta bosib ochishingiz mumkin:
`c:\Users\user\Downloads\workspace-6c5742de36de09c82c0e99c037426a50\index.html`
*(Barcha 3D SDF koordinatalari va kutubxonalar dastur ichiga o'rnatilgan bo'lib, internetsiz (offline) rejimda ham to'liq ishlaydi!)*
