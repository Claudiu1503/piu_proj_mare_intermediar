# PIU – Intranet Universitar

Interfață web (frontend) pentru o platformă internă universitară construită cu React și Vite. Aplicația include pagini pentru dashboard, cursuri, orar, note, anunțuri, mesagerie, cereri, documente, setări, precum și secțiuni pentru secretariat și cadre didactice.

## Cerințe
- Node.js 18 sau mai nou (recomandat 20+)
- npm (vine împreună cu Node.js)

Verifică versiunile instalate:
```bash
node -v
npm -v
```

## Pornire rapidă (dezvoltare)
1. Instalează dependențele:
   ```bash
   npm install
   ```
2. Pornește serverul de dezvoltare:
   ```bash
   npm run dev
   ```
3. Deschide aplicația în browser: http://localhost:5173 (portul implicit Vite)

## Build de producție
- Creează pachetul de producție:
  ```bash
  npm run build
  ```
- Rulează un preview local al build‑ului (simulează producția):
  ```bash
  npm run preview
  ```
  Implicit: http://localhost:4173

## Scripturi utile (din package.json)
- `npm run dev` – pornește serverul Vite în mod dezvoltare
- `npm run build` – generează bundle‑ul de producție în `dist/`
- `npm run preview` – servește local build‑ul din `dist/`
- `npm run lint` – rulează ESLint pe proiect

## Ce conține proiectul
- React 19 + Vite 7 (bundler și dev server)
- React Router (navigare între pagini)
- lucide-react (set de icoane)
- ESLint (reguli de calitate cod)

Structură relevantă:
- `src/main.jsx` – punct de intrare al aplicației React
- `src/App.jsx` – rutele aplicației și învelișul temei
- `src/components/Layout.jsx` – layout principal: header, meniu lateral, container conținut
- `src/pages/` – paginile aplicației (exemple):
  - `Dashboard.jsx` – pagina principală
  - `Courses.jsx` – cursurile utilizatorului
  - `Schedule.jsx` – orar
  - `Grades.jsx` – note și rezultate
  - `Announcements.jsx` – anunțuri
  - `Messaging.jsx` – mesagerie internă
  - `Requests.jsx` – cereri administrative
  - `Documents.jsx` – documente / secretariat
  - `StudentsManage.jsx` – gestionare studenți (secretariat)
  - `Consultations.jsx` – consultații / întâlniri
  - `CourseEvaluation.jsx` – evaluare curs
  - `Evaluations.jsx` – evaluări
  - `FeesAdmin.jsx` și `TaxPayments.jsx` – situație taxe și plăți
  - `Admissions.jsx` – admitere
  - `SettingsPage.jsx` – setări cont
  - `Login.jsx`, `NotFound.jsx`, `Loading.jsx`
- `public/` – resurse statice servite ca atare
- `index.html` – șablonul HTML de bază folosit de Vite

## Navigare (rute principale)
- `/` – Dashboard
- `/cursuri`, `/orar`, `/note`, `/anunturi`, `/mesaje`, `/cereri`, `/documente`, `/studenti`, `/consultatii`, `/evaluare`, `/evaluari`, `/situatie-taxe`, `/taxe`, `/admitere`, `/setari`
- `/autentificare` – pagină de autentificare
- orice altă rută – pagină „Not Found”

## Sfaturi & depanare
- Dacă portul 5173 este ocupat, Vite va alege automat alt port și îl va afișa în terminal.
- Pe Windows, rulează comenzile în PowerShell sau Command Prompt.

## Licență
Proiect educațional/demonstrativ. Actualizează această secțiune conform nevoilor tale.
