# Submission — Intern Workflow Management

**Full Name:** Mohammed Ali
**Email:** mohammedali5072008@gmail.com
**GitHub:** [MohammadAli-14](https://github.com/MohammadAli-14) | [Muhammad5Ali](https://github.com/Muhammad5Ali)
**LinkedIn:** [mohammedali-dev](https://www.linkedin.com/in/mohammedali-dev/)
**Portfolio:** [mohammedali.dev](https://www.mohammedali.dev/)
**Submission Date:** March 18, 2026

---

## What I Built

A full-stack MERN (MongoDB, Express, React, Node.js) Intern Tracker application with complete CRUD functionality, search, filter, and pagination.

---

## Backend

**Tech:** Node.js + Express + MongoDB + Mongoose

**Endpoints implemented:**
- `POST /api/interns` — Create intern with full validation
- `GET /api/interns` — List with search (name/email), filter (role/status), pagination
- `GET /api/interns/:id` — Get single intern, validates ObjectId
- `PATCH /api/interns/:id` — Update intern fields
- `DELETE /api/interns/:id` — Delete intern

**Error handling:**
- Validation errors with descriptive messages
- Duplicate email returns 400 with clear message
- Invalid ObjectId returns 400
- 404 for not found records
- Global error handler for unexpected errors

**Data Model:**
- name (String, required, min 2 chars)
- email (String, required, unique, valid format)
- role (Frontend | Backend | Fullstack)
- status (Applied | Interviewing | Hired | Rejected)
- score (Number, 0–100)
- createdAt / updatedAt (timestamps)

---

## Frontend

**Tech:** React + Axios

**Features:**
- Dashboard with 4 stat cards (total, hired, avg score, pages)
- Search by name or email (live)
- Filter by role and status
- Pagination (8 per page)
- Add new intern form with client-side validation
- Edit intern via modal form
- Delete with confirmation dialog
- Loading indicators on all API calls
- Error messages displayed from backend
- Responsive design

---

## How to Run

**Backend:**
```bash
cd server
npm install
npm run dev
# Runs on http://localhost:5000
```

**Frontend:**
```bash
cd client
npm install
npm start
# Runs on http://localhost:3000
```

**MongoDB:** Make sure MongoDB is running locally or update `.env` with your Atlas URI.

---

## File Structure

```
submissions/mohammed-ali/
├── server/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── models/Intern.js
│   ├── controllers/internController.js
│   └── routes/internRoutes.js
├── client/
│   ├── package.json
│   └── src/
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       ├── components/
│       │   ├── Dashboard.js
│       │   └── InternForm.js
│       └── services/
│           └── api.js
└── SUBMISSION_TEMPLATE.md
```