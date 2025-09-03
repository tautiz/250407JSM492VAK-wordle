# Wordle — MVP (Vite + React)

Trumpas aprašymas
------------------
Tai minimalus Wordle tipo žaidimo MVP, parašytas su Vite ir React. Projektas skirtas greitam prototipavimui: visa žaidimo logika išliko kliento pusėje, UI yra komponentinė ir testai padengia pagrindines scenarijus.

Greitas paleidimas
------------------
Atidarykite bash terminalą ir vykdykite:

```bash
cd "c:\Users\Bendras\OneDrive - Vilnius Coding School UAB\Desktop\wordle"
npm install
npm run dev      # paleidžia Vite dev server
npm run test     # paleidžia vienetinius ir integracinius testus
# (neprivaloma) npm run build
```

Failų architektūra ir paskirtys
--------------------------------
Žemiau pateikiamas pagrindinių failų sąrašas ir trumpas paaiškinimas, ką jie daro.

- `index.html` — Vite įėjimo taškas (root elementas `#root`).
- `vite.config.js` — Vite konfigūracija; testavimo metu plugino importas atstatomas taip, kad nekiltų problemų su natyviniais Rollup paketais.
- `package.json` — skriptai ir priklausomybės (`dev`, `build`, `preview`, `test`, `test:coverage`).

src (pagrindinis kliento kodas)
- `src/main.jsx` — React aplikacijos mount ir globalūs importai.
- `src/App.jsx` — pagrindinis komponentas: valdo žaidimo būseną, atvaizduoja 6x5 grid, on-screen klaviatūrą, pranešimus ir valdymo mygtukus (Pagalba, Naujas žaidimas).
- `src/evaluate.js` — žaidimo logikos branduolys: `evaluate(guess, answer)` grąžina statusų masyvą (`correct`, `present`, `absent`). Ši funkcija yra kruopščiai testuojama.
- `src/words.js` — trumpas žodžių sąrašas ir util funkcijos:
	- `WORDS` — array pradinių žodžių.
	- `isValidWord(w)` — paprastas validatorius (case-insensitive).
	- `pickRandom()` — atsitiktinis žodžio rinkimas.
- `src/styles.css` — visi baziniai stiliai: cell, colors, keyboard, messages.

Testai ir testavimo konfigūracija
--------------------------------
- `vitest.config.js` — nustatymai Vitest: `jsdom` aplinka, setup failas, coverage konfigūracija.
- `test/setupTests.js` — importas `@testing-library/jest-dom` testų helperiams.
- `test/*.test.js|.test.jsx` — vienetiniai ir integraciniai testai, pavyzdžiai:
	- `test/evaluate.test.js`, `test/evaluate_extra.test.js`, `test/evaluate.full.test.js` — `evaluate` logikos testai (įskaitant pasikartojančias raides ir ribinius atvejus).
	- `test/words.test.js` — žodyno util funkcijų testai.
	- `test/app.*.test.jsx` — UI integracijos ir elgsenos testai (įvestys, klaviatūra, žinutės, naujo žaidimo atstatymas, pralaimėjimo/laisvėjimo scenarijai).

Coverage ir Windows problemos
---------------------------
- Coverage galite paleisti su `npm run test:coverage` arba `npx vitest --coverage --run`.
- Pastaba: tam tikrose Windows + npm versijose gali pasireikšti problema su Rollup "native" optional paketais (pvz. `@rollup/rollup-win32-x64-msvc`). Jeigu gaunate klaidą bandant coverage ar build, sprendimai:
	1. Ištrinkite `node_modules` ir `package-lock.json`, tada paleiskite `npm install --omit=optional`.
 2. Paleiskite testus/coverage WSL (Windows Subsystem for Linux) arba kitoje Linux aplinkoje.
 3. Naudokite `pnpm` arba `yarn` vietoje `npm`, jie dažnai geriau valdo optional native dependencies.

Kodavimo sprendimai ir patarimai
--------------------------------
- Visa žaidimo logika pradinėje stadijoje laikoma kliento pusėje — paprasta ir greita, bet neapsaugo nuo „nusiskaitymo". Jei reikia anti-cheat ar daily-words, reikėtų pridėti backendą.
- Jei norite pilno lietuviško žodyno su diakritika, rekomenduoju pridėti normalizacijos sluoksnį (`normalize('NFD')` + pašalinti diakritiką) arba reikalauti vartotojo įvesties su diakritika ir pritaikyti žodyną.

Tolimesni žingsniai (galiu padėti)
----------------------------------
- Įkelti pilną lietuvišką žodyną ir normalizaciją.
- Pridėti localStorage statistiką (games played, wins, streak) bei UI.
- Sukurti paprastą Node/Express backend daily-word endpoint ir anti-cheat logiką.
- Pridėti CI (GitHub Actions) scriptus testams ir coverage reportui.

Jei norite, iškart paleisiu coverage arba padėsiu sutvarkyti jūsų vietinę aplinką (WSL / pnpm) — pasirinkite, ką daryti toliau.
