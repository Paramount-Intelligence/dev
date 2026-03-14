# Intern Workflow Management

A full-stack MERN app for tracking intern applicants through search, filtering, pagination, and CRUD workflows.

## What is included

- Express + MongoDB backend with a validated `Intern` model
- REST API for create, list, detail, update, and delete flows
- Centralized error handling for validation errors, duplicate emails, invalid ObjectIds, and missing records
- React + Vite frontend with:
  - searchable and filterable intern table
  - pagination controls
  - add intern modal
  - edit intern modal
  - delete confirmation dialog
  - loading and error states

## Data model

Each intern record includes:

- `name`
- `email`
- `role` (`Frontend`, `Backend`, `Fullstack`)
- `status` (`Applied`, `Interviewing`, `Hired`, `Rejected`)
- `score` (`0-100`)
- `createdAt`
- `updatedAt`

## Project structure

```text
intern-workflow-management
|-- client
|   |-- src
|   |   |-- components
|   |   |-- lib
|   |   |-- App.jsx
|   |   `-- styles.css
|   |-- package.json
|   `-- vite.config.js
|-- server
|   |-- config
|   |-- controllers
|   |-- middleware
|   |-- models
|   |-- routes
|   |-- utils
|   |-- app.js
|   |-- server.js
|   `-- package.json
`-- TASK.md
```

## API endpoints

- `POST /api/interns`
- `GET /api/interns`
- `GET /api/interns/:id`
- `PATCH /api/interns/:id`
- `DELETE /api/interns/:id`

### List query params

- `search`
- `role`
- `status`
- `page`
- `limit`

## Local setup

### 1. Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Set `MONGO_URI` in `server/.env` to a running MongoDB instance.

### 2. Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

By default, the frontend expects the API at `http://localhost:5000`.

## Notes

- The backend sorts intern records by `createdAt` descending.
- Email addresses are normalized to lowercase in MongoDB.
- The frontend uses modal-based editing to satisfy the edit requirement.
