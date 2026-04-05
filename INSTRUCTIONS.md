# Submission Instructions

### Task Overview

This task consists of building a simple full-stack "Intern Tracker" application where you can manage a list of interns. You'll need to use **MongoDB**, **Express**, **React**, and **Node.js** (MERN stack).

### Backend (Node + Express)
1. Create the **Intern** model with fields like:
   - name
   - email
   - role (Frontend, Backend, Fullstack)
   - status (Applied, Interviewing, Hired, Rejected)
   - score (0-100)
   - timestamps (createdAt, updatedAt)

2. Build the following API endpoints:
   - **POST /api/interns**: Create an intern.
   - **GET /api/interns**: List interns with search, filter, and pagination.
   - **GET /api/interns/:id**: Get a single intern.
   - **PATCH /api/interns/:id**: Update an intern.
   - **DELETE /api/interns/:id**: Delete an intern.

   Implement centralized error handling middleware.

### Frontend (React)
1. **Intern List**: Show a table with name, email, role, status, score, and createdAt. Include:
   - Search functionality (name/email).
   - Filters (role and status dropdowns).
   - Pagination controls (previous/next buttons or page numbers).

2. **Add Intern**: Form to add new interns with validation (email, score, role, status).
   - On submit, create a new intern and refresh the list.

3. **Edit Intern**: Allow editing of intern details from the list.
   - Implement a modal or inline form to edit intern details.

4. **Delete Intern**: Delete an intern from the list.
   - Add a confirmation dialog for delete actions.

5. **UX**:
   - Show loading indicators during API calls.
   - Display API error messages when applicable.

### Submission Process
1. **Fork this repo** and make the changes.
2. **Commit your changes** and push to your forked repo.
3. **Create a Pull Request** with the following:
   - Clear and descriptive PR title.
   - A short explanation of what you've implemented.
   - Screenshots of the frontend UI or demo link.
   - Link to your deployed website (if deployed).

4. **Deliverables**:
   - GitHub repo link.
   - Working demo URL (optional but encouraged).
   - Any additional setup instructions in the README.
