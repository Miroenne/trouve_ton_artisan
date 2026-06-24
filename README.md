# Trouve Ton Artisan - API

API Express utilisée par le projet "Trouve Ton Artisan" pour exposer les catégories, les recherches d'artisans et les trois artisans mis en avant.

## Fonctionnalités

- Initialisation automatique de la base de données au démarrage.
- Import des données de départ si la table des catégories est vide.
- Récupération des catégories.
- Récupération des trois artisans du mois.
- Recherche d'artisans par nom.
- Recherche d'artisans par catégorie.

## Technologies

- Node.js
- Express
- Sequelize
- MySQL avec `mysql2`
- CORS
- Nodemon
- Env-cmd

## Prérequis

- Node.js
- npm
- Une base MySQL compatible

## Installation

```bash
npm install
```

## Variables d'Environnement

L'API lit la configuration de connexion depuis les variables d'environnement.

```env
HOST=127.0.0.1
DB_PORT=4000
TIDB_USER=root
PASSWORD=
DATABASE=your_database_name
PORT=3000
```

Si une variable est absente, `db/connect.js` utilise les valeurs par défaut présentes dans le code.

## Scripts Disponibles

```bash
npm start
```

Démarre l'API avec `node ./bin/www`.

```bash
npm run dev
```

Démarre l'API avec `nodemon` et charge `./env/.env.dev`.

```bash
npm run prod
```

Démarre l'API avec `nodemon` et charge `./env/.env.prod`.

## URL de Base

Par défaut, le serveur écoute sur le port `3000`.

```txt
http://localhost:3000
```

## Endpoints

| Méthode | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/top3` | Retourne les trois artisans du mois. |
| `GET` | `/categories` | Retourne toutes les catégories. |
| `POST` | `/categories` | Crée une catégorie. |
| `GET` | `/categories/{id}` | Retourne une catégorie par identifiant. |
| `PUT` | `/categories/{id}` | Met à jour une catégorie. |
| `DELETE` | `/categories/{id}` | Supprime une catégorie. |
| `GET` | `/societies` | Retourne tous les artisans. |
| `POST` | `/societies` | Crée un artisan. |
| `GET` | `/societies/id/{id}` | Retourne un artisan par identifiant. |
| `PUT` | `/societies/id/{id}` | Met à jour un artisan. |
| `DELETE` | `/societies/id/{id}` | Supprime un artisan. |
| `GET` | `/societies/{nom}` | Recherche des artisans par nom. |
| `GET` | `/societies/categorized/{category}` | Recherche des artisans par catégorie. |

## Documentation JSDoc et Swagger

Les routes contiennent des blocs `@swagger` compatibles avec une génération OpenAPI via `swagger-jsdoc`.

Les autres couches contiennent du JSDoc classique :

- controllers : objets Express `Request` et `Response`, réponse JSON envoyée ;
- services : paramètres métier, valeurs retournées, erreurs possibles ;
- repositories : paramètres SQL et résultats attendus ;
- utilitaires : rôle de la fonction et valeur retournée.

Les repositories utilisent maintenant les modèles Sequelize situés dans `models/`.

Swagger UI n'est pas encore branché dans l'application. Pour exposer une documentation interactive, il faudra ajouter `swagger-jsdoc` et `swagger-ui-express`, puis configurer `app.js` pour lire les fichiers du dossier `routes`.

## Structure

```txt
API/
├── app.js
├── bin/www
├── controllers/
├── db/
├── repositories/
├── routes/
├── services/
└── utils/
```

## Initialisation de la Base de Données

Au démarrage, `app.js` appelle `DB.initDb()`.

Cette fonction :

1. exécute `db/scripts/initialize_DB.sql` pour créer le schéma ;
2. vérifie si la table `Catégories` contient déjà des données ;
3. exécute `db/scripts/import.sql` si les données de départ sont absentes.

## Points d'Attention Connus

- Après l'ajout de Sequelize dans `package.json`, il faut exécuter `npm install` pour régénérer `package-lock.json`.
