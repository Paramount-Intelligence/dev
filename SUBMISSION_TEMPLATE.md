# Candidate Submission Template

## Candidate Information
- Full Name: Adeeb Ur Rahman
- Email: adeeburrahmankhuhro@gmail.com
- GitHub Profile Link: https://github.com/adeeb-ctrl
- Submission Date: 2026-03-16

## Backend (Node + Express)

### API Endpoints Implemented:
1. **POST /api/interns**:
   - [x] Created intern functionality.
2. **GET /api/interns**:
   - [x] Search/filter/pagination functionality.
3. **GET /api/interns/:id**:
   - [x] Fetch single intern.
4. **PATCH /api/interns/:id**:
   - [x] Update intern.
5. **DELETE /api/interns/:id**:
   - [x] Delete intern.

### Error Handling
- [x] Centralized error middleware implemented.
- [x] Handled validation errors, duplicate email, invalid MongoDB ObjectId errors.

## Frontend (React)

### Features Implemented:
1. **Intern List Page**:
   - [x] Table with intern data (name, email, role, status, score).
   - [x] Search and filter functionality.
   - [x] Pagination.
2. **Add Intern Form**:
   - [x] Form with validation.
   - [x] Successful creation adds intern to list.
3. **Edit Intern Form**:
   - [x] Inline modal or form for editing.
   - [x] Updates refresh the list.
4. **Delete Intern**:
   - [x] Confirmation dialog for delete.
   - [x] Successful delete removes intern from list.

### UX Features:
- [x] Loading indicators for API calls.
- [x] Error messages from API shown to users.

## Assumptions
- Developed assuming a local MongoDB instance running on port 27017 (`mongodb://localhost:27017/interntracker`), configurable via `.env` file.
- Used vanilla CSS with modern properties.

## Setup Instructions
1. Install Node.js
2. Backend: Navigate to `/server`, run `npm install`, then run `npm run dev` (runs on port 5000). Ensure MongoDB is active locally.
3. Frontend: Navigate to `/client`, run `npm install`, then run `npm run dev` (runs on locally assigned port, commonly 5173 or 3000).
