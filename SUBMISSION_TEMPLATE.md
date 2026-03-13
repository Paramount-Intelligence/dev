# Candidate Submission Template

## Candidate Information
- **Full Name:** Touseef Hanif
- **Email:** touseefhanif001@gmail.com
- **GitHub Profile Link:** https://github.com/touseefh/intern-workflow-management
- **Demo Link (if deployed):** N/A
- **Submission Date:** March 13, 2026

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
- Assumed that emails must be completely unique to avoid duplicate intern records.
- Assumed standard roles (e.g., Frontend, Backend, Fullstack) for easier filtering.
- Assumed status values should fall within a predefined set (e.g., Active, Pending, Completed).

## Setup Instructions
1. Clone the repository: `git clone https://github.com/touseefh/intern-workflow-management.git`
2. Configure `.env` in the `backend/` directory with `PORT` and `MONGODB_URI`.
3. In terminal 1, run `cd backend && npm install && npm run dev` to start the server.
4. In terminal 2, run `cd frontend && npm install && npm run dev` to start the React application.
5. Open the frontend URL provided in the terminal to view the application.
