# Intern Tracker - Frontend

This is the frontend portion of the Intern Workflow Management System, built with React and Vite. It provides a modern, responsive, and glassmorphic user interface to manage, track, and evaluate intern data.

## 🚀 Features

- **Modern Glassmorphic UI:** Stunning dark-mode look with interactive elements and CSS animations.
- **RESTful Integration:** Communicates with the Express/MongoDB backend via complete CRUD operations.
- **Intern Dashboard:** Displays the complete list of interns in an easy-to-read table.
- **Real-time Search & Filtering:** Filter the interns by role, status, or search dynamically by name/email.
- **Pagination:** Handles large amounts of data flawlessly.
- **Interactive Modals:** Add, Edit, and Delete interns using sleek inline modals with form validation.
- **State Feedback:** Loading indicators and dynamic error messages ensure a robust user experience.

## 🛠 Technology Stack

- **React:** Component-based UI library.
- **Vite:** Next-generation frontend tooling for ultra-fast startup and HMR.
- **Axios:** Promise-based HTTP client for the browser and node.js.
- **React Router DOM:** For declarative routing in the application.
- **Lucide React:** Beautiful and consistent iconography.
- **Vanilla CSS:** Custom design system without relying on heavy frontend frameworks.

## 📂 Folder Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ConfirmModal.jsx    # Deletion confirmation dialog
│   │   └── InternModal.jsx     # Add/Edit intern form modal
│   ├── pages/
│   │   └── InternList.jsx      # Main dashboard and data table
│   ├── services/
│   │   └── api.js              # Centralized Axios API request methods
│   ├── App.jsx                 # App routing configuration
│   ├── index.css               # Global glassmorphic styles
│   └── main.jsx                # React application entry point
├── package.json
└── vite.config.js              # Vite config (runs on Port 3000)
```

## ⚙️ Setup and Installation

### Prerequisites
- Make sure Node.js is installed on your machine.
- Start the corresponding Node.js backend server before running the frontend.

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The application will be available at:
   ```
   http://localhost:3000
   ```

## 🔌 API Configuration

By default, the frontend API service (`src/services/api.js`) points to `http://localhost:5000/api/interns`. Ensure your backend is running on this port, or update the `baseURL` within `api.js` if your backend uses a different port.

## 🧑‍💻 Usage

- **Add Intern:** Click the `+ Add Intern` button to open the form. Fill in the required details (Name, Email, Role, Status, and Score) and submit.
- **Edit Intern:** Click the standard `Edit` icon (pencil) next to an intern's record in the table to modify their details.
- **Delete Intern:** Click the `Delete` icon (trash can) to permanently remove a record (prompts a confirmation modal).
- **Search & Filter:** Use the top bar to narrow down the displayed interns by typing their name/email or selecting specific roles/statuses from the dropdowns.
