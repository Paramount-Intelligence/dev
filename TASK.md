# Task: Build "Intern Tracker" App with MERN Stack

## Data Model

Create a MongoDB collection named **Intern** with the following fields:
- **name** (string, required, min 2 characters)
- **email** (string, required, unique, valid email format)
- **role** (string, required, one of: Frontend, Backend, Fullstack)
- **status** (string, required, one of: Applied, Interviewing, Hired, Rejected)
- **score** (number, required, 0–100)
- **createdAt** and **updatedAt** (timestamps)

## Backend (Node + Express)

### Endpoints:
1. **POST /api/interns**: Create a new intern.
2. **GET /api/interns**: List interns with search, filter, and pagination.
3. **GET /api/interns/:id**: Get details of a single intern.
4. **PATCH /api/interns/:id**: Update an intern's details.
5. **DELETE /api/interns/:id**: Delete an intern.

### Error Handling:
- Handle validation errors, duplicate emails, invalid ObjectIds, and provide consistent error responses.

## Frontend (React)

### Features:
1. **Intern List**: A table to list intern data with search, filter, and pagination.
2. **Add Intern**: A form to add new interns.
3. **Edit Intern**: Inline editing form or modal.
4. **Delete Intern**: Confirmation dialog for deleting interns.

### UX Requirements:
- Loading indicators for API calls.
- Error messages from the backend.
