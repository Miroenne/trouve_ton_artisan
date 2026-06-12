# Trouve Ton Artisan API

Express API used by the "Trouve Ton Artisan" project to expose artisan categories, artisan search results, and the featured top three artisans.

## Requirements

- Node.js
- npm
- A MySQL-compatible database

## Installation

```bash
npm install
```

## Environment Variables

The API reads its database configuration from environment variables.

```env
HOST=127.0.0.1
DB_PORT=4000
TIDB_USER=root
PASSWORD=
DATABASE=your_database_name
```

When a variable is missing, the connection layer uses the fallback values defined in `db/connect.js`.

## Available Scripts

```bash
npm start
```

Starts the API with `node ./bin/www`.

```bash
npm run dev
```

Starts the API with `nodemon` and loads `./env/.env.dev`.

```bash
npm run prod
```

Starts the API with `nodemon` and loads `./env/.env.prod`.

## API Base URL

By default, the server listens on port `3000`.

```txt
http://localhost:3000
```

## Endpoints

### Top 3

```http
GET /top3
```

Returns the featured top three artisans.

### Categories

```http
GET /categories
```

Returns every artisan category.

### Societies by Name

```http
GET /societies/{nom}
```

Returns artisans whose name matches the `nom` path parameter.

Example:

```http
GET /societies/boucherie
```

### Societies by Category

```http
GET /societies/categorized/{category}
```

Returns artisans whose specialty belongs to the requested category.

Example:

```http
GET /societies/categorized/batiment
```

## Documentation Comments

The route files include Swagger-compatible `@swagger` blocks. The controller, service, repository, database, and utility layers include JSDoc comments to describe their parameters, return values, and errors.

Swagger UI is not currently wired into the application. To expose interactive documentation later, install and configure packages such as `swagger-jsdoc` and `swagger-ui-express`, then point `swagger-jsdoc` to the route files.

## Project Structure

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

## Database Initialization

At startup, `app.js` calls `DB.initDb()`. This initializes the database schema and imports seed data when needed, using the SQL scripts stored in `db/scripts`.
