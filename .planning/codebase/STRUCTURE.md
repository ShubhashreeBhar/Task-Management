# Directory Structure

> Last mapped: 2026-04-30

## Project Root

```
Task-Management-main/
├── README.md                    # Project documentation & setup guide
├── render.yaml                  # Render.com deployment config (backend)
├── backend/                     # Express.js API server
│   ├── .env                     # Local env vars (gitignored)
│   ├── .env.example             # Env var template with docs
│   ├── .gitignore               # node_modules, .env, .DS_Store
│   ├── check-env.js             # Pre-start env var validator
│   ├── package.json             # Backend dependencies & scripts
│   ├── package-lock.json        # Lock file
│   ├── server.js                # ★ Entry point — Express app setup
│   ├── config/
│   │   └── db.js                # MongoDB connection (Mongoose)
│   ├── controllers/
│   │   ├── userController.js    # Auth & user profile logic
│   │   └── taskController.js    # Task CRUD logic
│   ├── middleware/
│   │   └── auth.js              # JWT verification middleware
│   ├── models/
│   │   ├── userModel.js         # User Mongoose schema
│   │   └── taskModel.js         # Task Mongoose schema
│   └── routes/
│       ├── userRoute.js         # User API routes
│       └── taskRoute.js         # Task API routes
│
└── frontend/                    # React + Vite SPA
    ├── .env                     # Local env vars (gitignored)
    ├── .env.example             # Env var template
    ├── .gitignore               # Standard Vite gitignore
    ├── index.html               # HTML entry point (SPA redirect script)
    ├── package.json             # Frontend dependencies & scripts
    ├── package-lock.json        # Lock file
    ├── vite.config.js           # Vite + React + Tailwind plugin config
    ├── eslint.config.js         # ESLint flat config
    ├── vercel.json              # Vercel SPA rewrite rules
    ├── public/
    │   └── task.png             # Favicon / logo image
    └── src/
        ├── main.jsx             # ★ React entry — BrowserRouter + App
        ├── App.jsx              # Root component — routing + auth state
        ├── config.js            # API_BASE_URL from env
        ├── index.css            # Tailwind v4 import
        ├── assets/
        │   ├── dummy.jsx        # ★ Centralized UI constants & class strings
        │   └── task.png         # Logo image (also in public/)
        ├── components/
        │   ├── Layout.jsx       # Main layout — data fetching + stats sidebar
        │   ├── NavBar.jsx       # Top navigation bar
        │   ├── Sidebar.jsx      # Side navigation + productivity meter
        │   ├── Login.jsx        # Login form component
        │   ├── SignUp.jsx       # Registration form component
        │   ├── Profile.jsx      # User profile & password management
        │   ├── TaskItem.jsx     # Individual task card with actions
        │   └── TaskModal.jsx    # Create/edit task modal dialog
        └── pages/
            ├── Dashboard.jsx    # Main task overview with filters
            ├── PendingPage.jsx  # Pending tasks view with sorting
            └── CompletePage.jsx # Completed tasks view with sorting
```

## Key Locations

| What                     | Path                                    |
|--------------------------|-----------------------------------------|
| Backend entry point      | `backend/server.js`                     |
| Frontend entry point     | `frontend/src/main.jsx`                 |
| DB connection            | `backend/config/db.js`                  |
| Auth middleware           | `backend/middleware/auth.js`            |
| API routes               | `backend/routes/`                       |
| React components         | `frontend/src/components/`              |
| Page components          | `frontend/src/pages/`                   |
| UI constants / classes   | `frontend/src/assets/dummy.jsx`         |
| API URL config           | `frontend/src/config.js`               |
| Deployment (backend)     | `render.yaml`                           |
| Deployment (frontend)    | `frontend/vercel.json`                  |

## Naming Conventions

### Files
- **Backend:** camelCase with descriptive suffixes — `userController.js`, `taskModel.js`, `userRoute.js`
- **Frontend components:** PascalCase — `Dashboard.jsx`, `TaskItem.jsx`, `NavBar.jsx`
- **Config/utility files:** camelCase — `config.js`, `dummy.jsx`

### Variables & Functions
- **Backend controllers:** `registerUser`, `loginUser`, `createTask` — verb-noun
- **Frontend handlers:** `handleSubmit`, `handleLogout`, `handleComplete` — handle-verb
- **State setters:** `setTasks`, `setLoading`, `setFilter` — React convention

### Routes
- **Backend API:** `/api/user/*`, `/api/tasks/*`
- **Frontend pages:** `/`, `/login`, `/signup`, `/pending`, `/complete`, `/profile`

## File Size Distribution

| File                        | Lines | Bytes  | Complexity |
|-----------------------------|-------|--------|------------|
| `assets/dummy.jsx`          | 288   | 14,237 | Constants  |
| `components/Layout.jsx`     | 222   | 9,932  | High       |
| `pages/Dashboard.jsx`       | 210   | 7,137  | High       |
| `components/TaskItem.jsx`   | 203   | 6,194  | Medium     |
| `components/TaskModal.jsx`  | 178   | 7,709  | Medium     |
| `components/Profile.jsx`    | 167   | 6,218  | Medium     |
| `components/Sidebar.jsx`    | 153   | 5,272  | Medium     |
| `components/Login.jsx`      | 151   | 4,970  | Medium     |
| `controllers/userController`| 148   | 4,445  | Medium     |
| `pages/CompletePage.jsx`    | 125   | 4,183  | Low        |
| `pages/PendingPage.jsx`     | 122   | 4,739  | Medium     |
| `components/SignUp.jsx`     | 109   | 3,634  | Low        |
| `components/NavBar.jsx`     | 102   | 5,471  | Low        |
| `controllers/taskController`| 95    | 2,470  | Low        |
