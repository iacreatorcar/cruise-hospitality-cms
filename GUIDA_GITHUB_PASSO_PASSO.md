# 📚 GUIDA COMPLETA - Salvare su GitHub Passo-Passo

**Repository:** https://github.com/iacreatorcar/cruise-hospitality-cms
**GitHub Pages:** https://iacreatorcar.github.io/cruise-hospitality-cms/
**Autore:** Carmine Dalise

---

## ✅ PASSO 1: Salvare il Codice su GitHub da Emergent

### A) Connetti GitHub (se non lo hai già fatto)
1. **Nell'interfaccia di Emergent**, clicca sul tuo **profilo in alto**
2. Cerca il pulsante **"Connect GitHub"**
3. Verrai reindirizzato a GitHub per autorizzare
4. Clicca **"Authorize"** per dare i permessi

### B) Salva il Progetto
1. Nell'interfaccia chat di Emergent, cerca il pulsante **"Save to GitHub"** o l'icona GitHub
2. Si aprirà una finestra con:
   - **Repository**: Seleziona `cruise-hospitality-cms`
   - **Branch**: Seleziona `main`
3. Clicca **"PUSH TO GITHUB"**
4. Attendi conferma ✅

### C) Verifica su GitHub
1. Vai su https://github.com/iacreatorcar/cruise-hospitality-cms
2. Dovresti vedere:
   - Cartella `backend/`
   - Cartella `frontend/`
   - File `README.md`
   - File `DEPLOYMENT.md`

---

## 🌐 PASSO 2: Configurare per il Portfolio

Il tuo progetto è un'applicazione **full-stack** che richiede:
- Backend FastAPI (server)
- Frontend React (interfaccia)
- Database MongoDB

### Opzione A: GitHub Pages (Solo Frontend Statico)

⚠️ **IMPORTANTE**: GitHub Pages può mostrare solo il frontend React, ma **NON** il backend o il database.

**Se vuoi usare GitHub Pages:**

1. **Build del frontend**:
   ```bash
   cd frontend
   yarn build
   ```

2. **Attiva GitHub Pages**:
   - Vai su GitHub → Repository Settings
   - Sezione "Pages"
   - Source: Deploy from a branch
   - Branch: `main` → Cartella `/frontend/build`
   - Salva

3. **Configura URL**: Il sito sarà su https://iacreatorcar.github.io/cruise-hospitality-cms/

⚠️ **Limitazioni**:
- Chatbot AI non funzionerà (richiede backend)
- Prenotazioni non funzioneranno (richiede database)
- Solo visualizzazione statica dei contenuti

---

### Opzione B: Deploy Completo su Emergent (RACCOMANDATO) ✨

**Vantaggio**: Tutto funzionante (Backend + Frontend + Database + AI)

1. **Nell'interfaccia Emergent**, clicca il pulsante **"Deploy"**
2. Scegli il nome del progetto
3. Ottieni un URL live tipo: `https://cruise-cms.preview.emergentagent.com`
4. **Questo URL puoi usarlo nel portfolio!**

---

## 📱 PASSO 3: Preparare per il Portfolio

### A) README con Screenshot

Il tuo README è già pronto con:
- ✅ Descrizione completa
- ✅ Tecnologie usate
- ✅ Tuo nome come autore
- ✅ Immagine hero

**Aggiungi screenshot reali**:
1. Vai sul sito live
2. Fai screenshot di:
   - Homepage
   - Ristoranti
   - Menu digitale
   - Chatbot
   - Kiosk mode
3. Carica su GitHub nella cartella `/screenshots/`
4. Aggiorna README con i link alle immagini

### B) Link nel Portfolio

**Nel tuo portfolio, aggiungi**:

```markdown
## 🚢 Cruise Ship Hospitality CMS

**Descrizione**: Sistema CMS completo per hospitality desk di navi da crociera con:
- 4 Ristoranti gourmet con menu digitali e QR code
- Sistema prenotazione escursioni
- Chatbot AI assistente (GPT-5.2)
- Modalità kiosk per IPTV
- Admin dashboard

**Tecnologie**: React, FastAPI, MongoDB, OpenAI GPT-5.2, Tailwind CSS

**Links**:
- 🔗 [Live Demo](https://cruise-cms.preview.emergentagent.com)
- 📁 [Codice Sorgente](https://github.com/iacreatorcar/cruise-hospitality-cms)
- 📖 [Documentazione](https://github.com/iacreatorcar/cruise-hospitality-cms/blob/main/README.md)

**Caratteristiche**:
- Design "Midnight Ocean Luxury" con glassmorphism
- Supporto multilingua (Italiano/Inglese)
- Real-time AI chat assistant
- Responsive per IPTV e mobile
```

---

## 🖥️ PASSO 4: Lavorare in VS Code Locale

### A) Clona il Repository

```bash
# Nel terminale
git clone https://github.com/iacreatorcar/cruise-hospitality-cms.git
cd cruise-hospitality-cms
```

### B) Apri in VS Code

```bash
code .
```

### C) Setup Locale

**Backend**:
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Configura .env con le tue chiavi
uvicorn server:app --reload
```

**Frontend**:
```bash
cd frontend
yarn install
cp .env.example .env
# Configura .env
yarn start
```

---

## 🎯 RIEPILOGO

### ✅ Cosa hai fatto finora:
1. ✅ Creato repository GitHub
2. ✅ Attivato GitHub Pages
3. ✅ Progetto completo sviluppato su Emergent

### 📋 Cosa fare ora:

**STEP IMMEDIATI**:
1. ⬜ Usa "Save to GitHub" su Emergent → Carica tutto il codice
2. ⬜ Clicca "Deploy" su Emergent → Ottieni URL live funzionante
3. ⬜ Prendi screenshot del sito live
4. ⬜ Aggiungi screenshot al README

**PER IL PORTFOLIO**:
5. ⬜ Usa URL deploy Emergent come "Live Demo"
6. ⬜ Link GitHub per "Source Code"
7. ⬜ Aggiungi al tuo portfolio online

---

## ❓ FAQ - Domande Frequenti

**Q: La foto nel README come ci è arrivata?**
A: È l'immagine hero che abbiamo messo nel README (`https://images.unsplash.com/photo-1761514745080-7cab3a9ad041`). GitHub la mostra automaticamente.

**Q: Ho inserito codice in VS Code e mi è uscita un'altra pagina?**
A: Probabilmente hai fatto build del frontend. Quello che vedi è la versione statica senza backend.

**Q: Come faccio a far funzionare tutto (chat AI, prenotazioni)?**
A: Usa il Deploy di Emergent. GitHub Pages non può eseguire backend.

**Q: Il progetto è pronto per il portfolio?**
A: SÌ! ✅ È un progetto completo e professionale.

---

## 📞 Prossimi Passi

**Se hai ancora dubbi, fammi sapere su**:
- Come fare "Save to GitHub" specificamente
- Come aggiungere screenshot
- Come configurare GitHub Pages
- Come scrivere la descrizione portfolio

**Il tuo progetto è ECCELLENTE per il portfolio!** 🌟

---

**Creato da: Carmine Dalise**
**Repository: https://github.com/iacreatorcar/cruise-hospitality-cms**