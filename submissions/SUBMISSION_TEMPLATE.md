# Candidate Submission Template

## Candidate Information
- Full Name: Huzaifa Ahmed
- Email: huzaifafabi15@gmail.com
- GitHub Profile Link: https://github.com/huzaifa-1502/intern-workflow-management
- Demo Link: http://localhost:5173
- Submission Date: March 15th, 2026

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
- [x] Email must be unique per intern record.
- [x] Score must be between 0 and 100.
- [x] Local MongoDB used for development.
- [x] Vite used instead of Create React App for faster development.

## Setup Instructions
1. Clone the repo
2. Install backend: `cd server && npm install`
3. Install frontend: `cd client && npm install`
4. Create `server/.env` with: `PORT=5000` and `MONGO_URI=mongodb://localhost:27017/interndb`
5. Start backend: `cd server && npm run dev`
6. Start frontend: `cd client && npm run dev`
7. Open: `http://localhost:5173`