
# 1. Wordle — MVP architektūros sprendimas

Date: 2025-09-03

Status: Proposed

Kontextas
---------
Šis dokumentas aprašo architektūros sprendimus ir reikšmingus dizaino pasirinkimus kuriant Wordle tipo žaidimo MVP (minimum viable product). Žaidimas:

- 5 raidžių žodžiai (angl. 5-letter words)
- iki 6 spėjimų vienam žaidimui
- paprasta UI reprezentacija: lentelė (6x5), spalvinimas kiekvienai raidei: "correct", "present", "absent"

Tikslas — greitai prototipuoti pilnavertį kliento pusės žaidimą, kurį būtų paprasta paleisti ir plėsti vėliau (statiška publikacija, statistikų kaupimas, anti-cheat backend ir kt.).

Žaidimo aprašymas ir taisyklės
--------------------------------
Žaidėjo tikslas — atspėti paslėptą 5 raidžių žodį per ne daugiau kaip 6 bandymus. Kiekvienas spėjimas turi būti tikras 5 raidžių žodis. Po kiekvieno spėjimo kiekviena raidė pažymima:

- "correct" (žalia) — raidė teisingoje pozicijoje;
- "present" (geltona) — raidė yra žodyje, bet ne toje pozicijoje;
- "absent" (pilka) — raidė žodyje neegzistuoja arba jos visos egzistuoja jau pažymėtos.

Kiti žaidimo apribojimai ir taisyklės:
- Žodžių validacija privaloma: priimami tik žodžiai iš žodyno (validatorius kliento pusėje arba serverio patikra).
- Backspace leidžia ištrinti raidę, Enter siunčia spėjimą.

Sprendimas (Decision)
---------------------
Pasirenkame Vite + React frontend implementaciją ir laikinai laikome visą žaidimo logiką kliente (MVP). Pagrindiniai katalogo elementai:

- `index.html` — Vite įėjimo taškas
- `src/main.jsx` — React įkrovos taškas
- `src/App.jsx` — pagrindinis žaidimo komponentas ir logika
- `src/words.js` — minimalus žodynas ir žodžių validacija
- `src/styles.css` — žaidimo stiliai

UI reikalavimai (privalomi MVP ir UX gairės)
-------------------------------------------
1. Informacija apie taisykles turi būti aiškiai pasiekiama per UI (pvz., modalas arba help skiltis): trumpas žaidimo aprašymas, kaip spėti (Enter), kaip šalinti (Backspace) ir kiek bandymų.
2. Klaidos ir pranešimai turi būti informatyvūs: kiekvienas klaidos pranešimas turi paaiškinti priežastį ir (jei taikoma) ką vartotojui daryti. Pavyzdžiai:
	- "Neuzpildytas žodis" → paaiškinti: "Įveskite 5 raidžių žodį prieš paspausdami Enter.";
	- "Žodis neegzistuoja" → paaiškinti: "Šis žodis nerastas žodyne. Patikrinkite rašybą arba pasirinkite kitą žodį.";
	- "Pralaimėjai" → paaiškinti: "Išeina, jei nebuvo atspėta per 6 bandymus. Teisingas žodis: <žodis>.";

3. Pranešimai apie klaidas turi būti matomi, kontrasto atžvilgiu aiškūs (AR/UX prieinamumas), ir turėti laikiną automatinį dingimą arba mygtuką uždaryti.
4. On-screen klaviatūra (rekomendacija): rodyti spalvotus mygtukus, kurie keičia spalvą priklausomai nuo ankstesnių spėjimų (correct > present > absent), taip pat leisti spausti pelės/palikti touch įvestį.

Klaidų pranešimų gairės
-----------------------
Klaidų pranešimų tonas — aiškus, trumpas, be techninės informacijos, bet su nurodymu ką daryti. Privalomi elementai:

1. Trumpas pranešimas vienoje eilutėje (pvz., "Žodis neegzistuoja esamam žodyne").
2. Trumpas paaiškinimas arba veiksmas (pvz., "Patikrinkite rašybą arba pasirinkite kitą žodį").
3. Jei klaida yra sistemos ar tinklo (ne žaidėjo įvestis), pateikti trumpą instrukciją arba fallback: "Pasikartokite po kelių sekundžių arba patikrinkite interneto ryšį.".

Pavyzdiniai klaidų pranešimai (LT):
- "Neužpildytas žodis — įveskite 5 raides prieš patvirtinimą." 
- "Žodis neegzistuoja esamam žodyne — patikrinkite rašybą arba pasirinkite kitą žodį." 
- "Tinklų klaida — patikrinkite interneto ryšį ir bandykite dar kartą." 

Racionalas
---------
Vite užtikrina greitą dev-serverį ir minimalią konfigūraciją, o React leidžia aiškiai valdyti komponentų būsenas (lentelė, klaviatūra, pranešimai). Laikant logiką kliente, MVP kuriamas greičiau ir jį paprasta išplatinti statiniu būdu.

Pasekmės
--------
- Privalumai: greitas prototipas, lengva diegti kaip statinę aplikaciją, paprasta plėsti UI.
- Trūkumai: kliento pusėje esantis žodynas ir sprendžiamas žodis leidžia daugiau galimybių „nusiskaityti" sprendimą; reikalingas backend, jei reikalingas anti-cheat arba statistikos sinchronizavimas.

Alternatyvos
-----------
- Vieta be rėmų: paprasta HTML/vanilla JS implementacija — mažiau priklausomybių, bet sunkiau palaikyti komponentinę logiką.
- Backend (Node/Express) mažam API: naudinga, jei reikia daily-words, autentifikacijos, lyderių lentelės ar anti-cheat logikos.

Testavimas ir kokybės užtikrinimas
---------------------------------
1. Parašyti vienetinius testus `evaluate(guess, answer)` logikai: teisingi atvejai, pasikartojančios raidės, raidžių kiekio ribojimai.
2. UI integracijos testai: Enter/Backspace/keyboard events, klaidų pranešimų rodomumas.

Tolimesni žingsniai (prioritetai)
--------------------------------
1. Išplėsti žodyną: pradinėje MVP stadijoje turi būti bent 100 lietuviškų žodžių; vėliau įkelti platesnį žodyną (pvz. oficialus Wordle sąrašas arba kitas patikimas žodynas) ir įdiegti lazy-loading.
2. Implementuoti on-screen klaviatūrą su spalvų persidengimo taisyklėmis.
3. Pridėti localStorage statistiką (games played, wins, streak) ir UI rodymą.
4. Parašyti tests: unit + integration.

Autoriai
-------
Projektas inicijuotas ir MVP sukurtas 2025-09-03.
