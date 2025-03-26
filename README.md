Dishcovery – Backend

Dies ist das Backend der Dishcovery-App. Es basiert auf NestJS, verwendet TypeORM und speichert Daten in einer SQLite-Datenbank.
Die API ist mit Swagger dokumentiert und unterstützt das komplette Management von Rezepten, Nutzern, Bewertungen, Tags, Favoriten und Merkliste.

___________________________________________________________________________________________________________________________________________________________________________

Schnellstart

1. Repository klonen & ins Verzeichnis wechseln

git clone [<repo-url>](https://github.com/tzorn7787/DishcoveryBackend.git)
cd DishcoveryBackend

2. Abhängigkeiten installieren

npm install

3. Server starten

npm run start:dev
___________________________________________________________________________________________________________________________________________________________________________

📂 Beispiel-Datenbank

Um direkt loslegen zu können, liegt eine Datei db.sqlite mit Beispiel-Daten bei. 
___________________________________________________________________________________________________________________________________________________________________________

 API-Dokumentation

Die API ist vollständig mit Swagger dokumentiert.

👉 Nach dem Start erreichbar unter:http://localhost:3001/api
___________________________________________________________________________________________________________________________________________________________________________

Features:

- Benutzer-Registrierung & Login

-Rezepte erstellen, lesen,  löschen

- Favoriten & Merkliste 

- Tags hinzufügen und suchen

- Zutaten verwalten

- Kommentare & Bewertungen zu Rezepten

- Volltextsuche (nach Titel, Tags, Zutaten)
___________________________________________________________________________________________________________________________________________________________________________


Tech Stack

- NestJS

- TypeORM

- SQLite

- Swagger (OpenAPI)

- Class-Validator



