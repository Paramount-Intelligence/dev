# Candidate Submission

## Candidate Information
- Full Name: Syeda Fariya Raza
- Email: sy.faraza2899@gmail.com
- GitHub Profile Link: https://github.com/FariyaR
- Demo Link (if deployed): Not deployed
- Submission Date: 2026-03-15

## Backend (Node + Express)

### API Endpoints Implemented
1. **POST /api/interns**
   - [x] Created intern functionality.
   - Accepts `name`, `email`, `role`, `status`, and `score`.
2. **GET /api/interns**
   - [x] Search/filter/pagination functionality.
   - Supports `search`, `role`, `status`, `page`, and `limit` query params.
3. **GET /api/interns/:id**
   - [x] Fetch single intern.
4. **PATCH /api/interns/:id**
   - [x] Update intern.
5. **DELETE /api/interns/:id**
   - [x] Delete intern.

### Error Handling
- [x] Centralized error middleware implemented.
- [x] Handled validation errors, duplicate email, invalid MongoDB ObjectId errors.
- [x] Consistent JSON error responses returned from the API.

## Frontend (React)

### Features Implemented
1. **Intern List Page**
   - [x] Table with intern data (`name`, `email`, `role`, `status`, `score`).
   - [x] Search and filter functionality.
   - [x] Pagination.
2. **Add Intern Form**
   - [x] Form with validation.
   - [x] Successful creation adds intern to list.
3. **Edit Intern Form**
   - [x] Inline modal or form for editing.
   - [x] Updates refresh the list.
4. **Delete Intern**
   - [x] Confirmation dialog for delete.
   - [x] Successful delete removes intern from list.

### UX Features
- [x] Loading indicators for API calls.
- [x] Error messages from API shown to users.
- [x] Success banners shown after create, update, and delete actions.

## Assumptions
- [x] Email uniqueness is enforced at the database/model level and duplicate emails are surfaced through the API.
- [x] Search is case-insensitive and matches against both `name` and `email`.
- [x] Pagination defaults to 8 records per page in the UI, and the backend caps `limit` at 50.
- [x] The task did not require a separate details page, so editing is handled with a modal on the list screen.

## Setup Instructions
- [x] Install backend dependencies with `npm install` inside `server/`.
- [x] Install frontend dependencies with `npm install` inside `client/`.
- [x] Start MongoDB locally.
- [x] Create `server/.env` with:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/intern-workflow-management
CLIENT_ORIGIN=http://localhost:5173
```

- [x] Run the backend with `npm run dev` inside `server/`.
- [x] Run the frontend with `npm run dev` inside `client/`.
- [x] Open `http://127.0.0.1:5173` in the browser.

## Verification
- [x] Backend import check passed.
- [x] Frontend production build passed.
- [x] Local MongoDB connection verified.
- [x] CRUD flow smoke-tested by creating a real intern record through the API.

## Screenshots
- [intern-list.png](./screenshots/intern-list.png): main list page with table, search, filters, and pagination.
- [add-intern-modal.png](./screenshots/add-intern-modal.png): add intern modal with all required fields.
- [edit-intern-modal.png](./screenshots/edit-intern-modal.png): edit modal with existing record data prefilled.
- [delete-confirmation.png](./screenshots/delete-confirmation.png): delete confirmation dialog.
- [filtered-list.png](./screenshots/filtered-list.png): filtered list view showing search/filter behavior.
- [filtered-list-closeup.png](./screenshots/filtered-list-closeup.png): closer filtered-state capture for additional evidence.

## Notes
- Candidate information and any public repository/deployment links can be filled in before final submission.
- The application was verified locally against a running MongoDB instance.
