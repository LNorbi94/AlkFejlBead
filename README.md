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
- felhasználó: a vendég szerepkörén túl a saját To-dojainak kezelésére  új: módosít: törlés) képes.

## Használati esetek
![UseCase Diagram] images/usecase.png)

## Folyamatok meghatározása
- Felhasználó
  - To-Do felvétele

![Flowchart  (User)] images/flowchartUser.png)

- Vendég
  - Keresés

![Flowchart  (Guest)] images/flowchartGuest.png)

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
![Data modell] images/dbdiagram.png)