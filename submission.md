# Candidate Submission Template

# Candidate Information
Full Name: Momal Saleem  
Email: momalsaleem7@gmail.com  
GitHub Profile Link: https://github.com/momalsaleem  
Demo Link (if deployed): Localhost (Screenshot attached)  
Submission Date: April 5, 2026

# Backend (Node + Express)
# API Endpoints Implemented:
POST /api/interns: Created intern functionality with validation logic.
GET /api/interns: Complete search/filter/pagination functionality.
GET /api/interns/:id: Fetch detailed single intern record.
PATCH /api/interns/:id: Partial updates for intern records.
DELETE /api/interns/:id: Removal of intern record from database.

# Error Handling
Centralized error middleware implemented for robust handling.
Handled specific MongoDB/Mongoose errors:
    ValidationError: Returns detailed field-level errors.
    DuplicateEmail: Returns conflict (409) status for duplicate email addresses.
    CastError: Returns bad request (400) for invalid MongoDB ObjectIds.

---

# Frontend (React)
# Features Implemented:
Intern List Page:
     Stunning table displaying name, email, role, status, and score.
     Dynamic search (by name/email) and role/status filtering.
     Responsive pagination system with page indicators.
Add Intern Form:
     Polished modal form with field-level validation.
     Automatic list refresh upon successful creation.
Edit Intern Form:
     Contextual editing modal with pre-populated data.
     Updates refresh the dashboard data instantly.
Delete Intern:
     Confirmation dialog before deletion to prevent accidents.
     Immediate list update after successful deletion.

# UX Features:
Loading States: Shimmer effect/skeleton rows during API fetches.
Error Messaging: Toast-like error banners with retry capabilities.
Theming: Premium dark-mode-inspired aesthetics with smooth transitions.
Responsiveness: Fully adaptive layout for desktop and mobile views.



# Assumptions
Email Uniqueness: Assumed emails must be unique per intern; implemented unique index and conflict handling in backend.
Score Range: Assumed intern performance score is a percentage (0-100).
Mock Data: Initial state handled via empty state components for better user feedback.



# Setup Instructions
# Prerequisites
Node.js (v14+)
MongoDB access (local or Cloud URI)

# Backend Setup
1. Navigate to the root directory: cd itern_tracker
2. Install dependencies: npm install
3. Configure environment: Create a .env file with PORT=5000 and MONGO_URI.
4. Run the server: npm run dev (restarts on changes) or npm start.

# Frontend Setup
1. Navigate to the frontend directory: cd intern
2. Install dependencies: npm install
3. Run the application: npm start
4. Access the app at: http://localhost:3000


# Screenshots

Dashboard(./screenshots/dashboard.png)
Add Intern Form (./screenshots/addinternform.png)
Edit Intern Info (./screenshots/edit-intern-info.png) 
Search Intern  (./screenshots/searchintern.png) 
Delete Intern(./screenshots/delete-intern.png) 
