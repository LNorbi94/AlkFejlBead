# Családi feladatlista

## Funkcionális követelmények
- Vendégként a főoldalon szeretném látni miket kell még megcsinálni.
- Vendégként szeretnék tudni regisztrálni az oldalra.
- Vendégként szeretnék tudni keresni a feladatok között.
- Felhasználóként szeretnék tudni bejelentkezni az oldalra.
- Felhasználóként szeretném tudni szerkeszteni a feladatokat.
- Felhasználóként szeretném tudni törölni a feladatokat.
- Felhasználóként szeretnék tudni hozzáadni feladatokat.

## Nem funkcionális követelmények
- Felhasználói felület legyen intuitív minden korosztály számára.
- Működjön gyorsan.
- Működjön biztonságosan is: jelszavak ne egyszerű szövegként tárolódjanak, funkciókhoz jogosulatlan felhasználó ne férjen hozzá.

## Szakterületi fogalomjegyzék
- To-do: egy elvégzendő feladat.

## Szerepkörök
- vendég: To-dok keresését: böngészését és megtekintését végezheti.
- felhasználó: a vendég szerepkörén túl a saját To-dojainak kezelésére (új, módosítás, törlés) képes.

## Használati esetek
![UseCase Diagram] (images/usecase.png)

## Folyamatok meghatározása
- Felhasználó
  - To-Do felvétele

![Flowchart  (User)] (images/flowchartUser.png)

- Vendég
  - Keresés

![Flowchart  (Guest)] (images/flowchartGuest.png)

## Oldaltérkép
*Publikus:*

- Főoldal
- Kategóriák böngészése
    + To-dok megtekintése
- Belépés
- Regisztráció

*Felhasználó:*

- Kilépés
- Profiladatok
    + Profiladatok szerkesztése
- Új to-do felvétele
- Új kategória felvétele

## Végpontok
- GET /: főoldal
- GET /index: főoldal
- POST /search: keresés
- GET /todos/create: to-do készítése (felhasználótól az adatok elkérése)
- POST /todos/create: to-do készítése (adatok feltöltése az adatbázisba)
- GET /categories/create: kategória készítése (felhasználótól az adatok elkérése)
- POST /categories/create: kategória készítése (adatok feltöltése az adatbázisba)
- GET /todos/:id: id-adik to-do lekérése
- GET /todos/:id/edit: id-adik to-do szerkesztése (felhasználótól az adatok elkérése)
- POST /todos/:id/edit: id-adik to-do szerkesztése (adatok frissítése az adatbázisban)
- GET /todos/:id/delete: id-adik to-do törlése
- GET /categories/:id: id-adik kategória lekérése
- GET /categories/:id/edit: id-adik kategória szerkesztése (felhasználótól az adatok elkérése)
- POST /categories/:id/edit: id-adik kategória szerkesztése (adatok frissítése az adatbázisban)
- GET /categories/:id/delete: id-adik kategória törlése
- GET /signup: regisztráció (felhasználótól az adatok elkérése)
- POST /signup: regisztráció (adatok feltöltése az adatbázisba)
- GET /login: bejelentkezés (felhasználótól az adatok elkérése)
- POST /login: bejelentkezés (adatok lekérése az adatbázisból)
- POST /logout: kijelentkezés
- GET /profile: profil szerkesztése (felhasználótól az adatok elkérése)
- POST /profile: profil szerkesztése (adatok frissítése az adatbázisban)
- GET /profile/delete: bejelentkezett felhasználó törlése

## Adatmodell
![Data modell] (images/dbdiagram.png)

## Kliens-oldali bővítés
a funkcióban érintett fájlok mind kliens- és szerveroldalon
a funkció működésének, folyamatának szöveges leírása (mikor mi történik, milyen eseményekre hogyan reagál, melyik kódrészlet fut le, melyik függvény hívódik meg)
valamelyik funkciónál 1 szekvenciadiagram a kiszolgálás folyamatáról
- delete.js
  - A törlésnél található funkciók találhatóak itt meg.
  Amennyiban a felhasználó egy To-Dot próbál törölni, előugrik egy megerősítő ablak, amelyben eldöntheti valóban kívánja-e törölni az adott To-Dot.
  Amennyiben igen, úgy a To-Dot magába foglaló doboz eltűnik, és az oldal újratöltése nélkül böngészhetjük tovább.
- logout.js
  - A kijelentkezésnél található funkciók találhatóak itt meg.
  Amennyiban a felhasználó megpróbál kijelentkezni, előugrik egy megerősítő ablak, amelyben eldöntheti valóban ki akar-e jelentkezni.
  Amennyiben igen, úgy az előugró ablak eltűnik, majd az oldal fejléce frissül.
- login.js
  - A bejelentkezésnél található funkciók találhatóak itt meg.
  Amennyiban a felhasználó megpróbál bejelentkezni, előugrik egy felugró ablak, ahol az adataival beléphez. Hibás adatok megadása esetén hibát jelez.
  Amennyiben jó adatokat ad meg, úgy az előugró ablak eltűnik, majd az oldal fejléce frissül.
  ![Bejelentkezés] (images/flowChartCJS.png)
- main.js
  - A főoldalon található funkciók találhatóak itt meg.
  Minden kategória fejlécébe kiírja hány darab To-Do van megjelenítve, illetve a kategóriákat el lehet "tüntetni" egy animációval.
- search.js
  - A keresésnél található funkciók találhatóak itt meg.
  Amikor a felhasználó elkezdi begépelni a keresendő To-Do nevét, akkor az ahhoz hasonló To-Do neve megjelenik a keresőmező alatt.

## Tesztelés
- Selenium IDE-vel,  telepítése: https://addons.mozilla.org/hu/firefox/addon/selenium-ide/
- Ctrl+Alt+S billentyűkombinációval elérhető, vagy eszköztárból kiválasztható.
- Tesztek:
- az automatikus tesztek a test/ könyvtárban találhatóak.
- Ebben a sorrendben érdemes lefuttatni őket:
1. signup
2. signout
3. signin
4. deleteProfile
- Ekkor semmilyen külső beavatkozás nem fog kelleni, a tesztek le fognak futni.