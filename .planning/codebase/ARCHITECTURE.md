# Architecture

> Last mapped: 2026-04-30

## High-Level Pattern

**MERN Stack Monorepo** (non-monorepo tooling) with separate backend and frontend directories:

```
┌────────────────────────────────────────────────────────────┐
│                      Client (Browser)                      │
│   React 19 + Vite + React Router + Tailwind CSS v4        │
│   SPA with client-side routing (BrowserRouter)             │
└────────────────────┬───────────────────────────────────────┘
                     │ HTTP/REST (Axios)
                     │ Bearer Token Auth
┌────────────────────▼───────────────────────────────────────┐
│                    Backend (Express v5)                     │
│   REST API · JWT Auth · Mongoose ODM                       │
│   Deployed on Render                                       │
└────────────────────┬───────────────────────────────────────┘
                     │ Mongoose Driver
┌────────────────────▼───────────────────────────────────────┐
│                   MongoDB Atlas (Cloud)                     │
│   Collections: users, tasks                                │
└────────────────────────────────────────────────────────────┘
```

## Backend Architecture

### Pattern: MVC (Model-View-Controller) without Views

```
server.js (entry point)
├── config/db.js          → Database connection
├── middleware/auth.js     → JWT verification middleware
├── models/
│   ├── userModel.js       → Mongoose User schema
│   └── taskModel.js       → Mongoose Task schema
├── controllers/
│   ├── userController.js  → Auth + profile business logic
│   └── taskController.js  → Task CRUD business logic
└── routes/
    ├── userRoute.js       → User API endpoints
    └── taskRoute.js       → Task API endpoints
```

### Request Flow

```
HTTP Request
  → Express Middleware (cors, json, urlencoded)
    → Route Handler (routes/*.js)
      → Auth Middleware (if protected)
        → Controller (controllers/*.js)
          → Model (models/*.js)
            → MongoDB
```

### API Endpoints

| Method | Path                  | Auth | Controller Function |
|--------|-----------------------|------|---------------------|
| POST   | `/api/user/register`  | No   | `registerUser`      |
| POST   | `/api/user/login`     | No   | `loginUser`         |
| GET    | `/api/user/me`        | Yes  | `getCurrentUser`    |
| PUT    | `/api/user/profile`   | Yes  | `updateProfile`     |
| PUT    | `/api/user/password`  | Yes  | `updatePassword`    |
| GET    | `/api/tasks/gp`       | Yes  | `getTasks`          |
| POST   | `/api/tasks/gp`       | Yes  | `createTask`        |
| GET    | `/api/tasks/:id/gp`   | Yes  | `getTaskById`       |
| PUT    | `/api/tasks/:id/gp`   | Yes  | `updateTask`        |
| DELETE | `/api/tasks/:id/gp`   | Yes  | `deleteTask`        |
| GET    | `/`                   | No   | Health check        |

> **Note:** The `/gp` suffix on task routes is unconventional and appears to be an arbitrary path segment.

## Frontend Architecture

### Pattern: Component-Based SPA with Layout Pattern

```
main.jsx (entry)
└── BrowserRouter
    └── App.jsx (routing + auth state)
        ├── /login     → Login
        ├── /signup    → SignUp
        └── ProtectedLayout (auth guard)
            ├── Layout.jsx (data fetching + stats sidebar)
            │   ├── NavBar.jsx (top navigation)
            │   ├── Sidebar.jsx (side navigation + productivity)
            │   └── Outlet (page content via React Router)
            │       ├── /          → Dashboard.jsx
            │       ├── /pending   → PendingPage.jsx
            │       ├── /complete  → CompletePage.jsx
            │       └── /profile   → Profile.jsx
            └── Shared Components
                ├── TaskItem.jsx (single task card)
                └── TaskModal.jsx (create/edit task form)
```

### Data Flow

```
Layout.jsx
  ├── fetchTasks() → GET /api/tasks/gp → sets `tasks` state
  ├── Passes tasks + refreshTasks via Outlet context
  └── Child pages receive via useOutletContext()
      ├── Dashboard: filters/sorts tasks, renders TaskItems
      ├── PendingPage: filters incomplete tasks
      └── CompletePage: filters completed tasks
```

### State Management

- **No external state management** (no Redux, Zustand, Context API)
- Auth state: `App.jsx` useState + localStorage
- Task data: `Layout.jsx` useState, shared via React Router's Outlet context
- Component-local state for UI concerns (modals, menus, filters, sort)

### Authentication Flow

```
1. User submits Login/SignUp form
2. POST to /api/user/login or /register
3. Backend returns { success, token, user }
4. Frontend stores token in localStorage
5. Sets currentUser state in App.jsx
6. Redirects to / via window.location.href
7. Layout.jsx fetches tasks with Bearer token
8. On 401 response → onLogout() → clear localStorage → redirect to /login
```

## Key Design Decisions

1. **Separate deployments** — Backend on Render, frontend on Vercel
2. **JWT in localStorage** — Simple but lacks XSS protection (no httpOnly cookies)
3. **Outlet context for data sharing** — Avoids prop drilling but couples to router
4. **Centralized CSS constants** — `frontend/src/assets/dummy.jsx` holds all Tailwind class strings
5. **No pagination** — All user tasks fetched at once (fine for personal use, not scalable)
6. **Owner-scoped queries** — All task operations filter by `owner: req.user.id`
