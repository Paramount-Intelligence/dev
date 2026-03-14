# Candidate Submission Template

## Candidate Information
Full Name: Khawaja Zeeshan
Email: khawajazeeshan225@gmail.com
GitHub Profile Link: https://github.com/Khwajazeeshan
Submission Date: 15 March 2026

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
- [x] Assumptions made during development (e.g., handling email uniqueness).

## Setup Instructions
- [x] Instructions to run both backend and frontend.
