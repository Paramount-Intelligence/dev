# Candidate Submission Template

## Candidate Information
- Full Name: Muhammad Yousuf
- Email: mohammad30yousuf30@gmail.com
- GitHub Profile Link: https://github.com/Yousuf-Ghafoor
- Demo Link (if deployed):
- Submission Date: 14-03-2026

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
   - [ ] Table with intern data (name, email, role, status, score).
   - [ ] Search and filter functionality.
   - [ ] Pagination.
2. **Add Intern Form**:
   - [ ] Form with validation.
   - [ ] Successful creation adds intern to list.
3. **Edit Intern Form**:
   - [ ] Inline modal or form for editing.
   - [ ] Updates refresh the list.
4. **Delete Intern**:
   - [ ] Confirmation dialog for delete.
   - [ ] Successful delete removes intern from list.

### UX Features:
- [ ] Loading indicators for API calls.
- [ ] Error messages from API shown to users.

## Assumptions
- [ ] Assumptions made during development (e.g., handling email uniqueness).

## Setup Instructions
- [ ] Instructions to run both backend and frontend.
