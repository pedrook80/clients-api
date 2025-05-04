# clients-api

A simple Node.js REST API for managing clients.
⚠️ Important:to access the client route you must be logged in and have the token use user route to do this

## Getting Started

### Run locally (development)

```bash
npm install
npm run dev
```

### Tests

```bash
npm test
```

### Run with Docker

```bash
docker-compose up --build
```

⚠️ Migrations are run automatically on container startup if not already applied.
If not, just run the script or run sql archive in server/migrations/init_db.sql

```bash
npm run migrate
```

### API Documentation

http://localhost:3000/docs



