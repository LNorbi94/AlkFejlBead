<<<<<<< HEAD
=======
## Szakterületi fogalomjegyzék
- To-do: egy elvégzendő feladat.

## Szerepkörök
- vendég: To-dok keresését: böngészését és megtekintését végezheti.
- felhasználó: a vendég szerepkörén túl a saját To-dojainak kezelésére  új: módosít: törlés) képes.

## Használati esetek
![UseCase Diagram] (../images/usecase.png)

## Folyamatok meghatározása
- Felhasználó
  - To-Do felvétele

![Flowchart  User)] (../images/flowchartUser.png)

- Vendég
  - Keresés

![Flowchart  Guest)] (../images/flowchartGuest.png)

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
- GET /index: 
- GET /todos/create:
- POST /todos/create:
- GET /category/create:
- POST /category/create:
- GET /todos/:id:
- GET /todos/cat/:id:
- GET /signup:
- POST /signup:
>>>>>>> f91d8554aadaae754333736fb75d5fc2d969252e
