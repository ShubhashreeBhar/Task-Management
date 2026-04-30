# Technology Stack

> Last mapped: 2026-04-30

## Languages & Runtimes

| Language   | Version / Spec | Usage Area       |
|------------|----------------|------------------|
| JavaScript | ES2020+ (ESM)  | Backend + Frontend |
| JSX        | React 19       | Frontend UI      |
| CSS        | Tailwind v4    | Styling          |

- Both `backend/package.json` and `frontend/package.json` declare `"type": "module"` (ESM throughout).
- Node.js runtime: specified as `18.x` in `render.yaml`.

## Frameworks

### Backend
- **Express.js v5.1.0** — HTTP server, routing, middleware
  - Entry point: `backend/server.js`
  - Router pattern: modular route files in `backend/routes/`

### Frontend
- **React v19.1.0** — UI component library
- **Vite v6.3.5** — Build tool and dev server
  - Config: `frontend/vite.config.js`
  - Plugins: `@vitejs/plugin-react`, `@tailwindcss/vite`
- **React Router DOM v7.6.2** — Client-side routing (BrowserRouter)

## Key Dependencies

### Backend (`backend/package.json`)

| Package       | Version  | Purpose                        |
|---------------|----------|--------------------------------|
| express       | ^5.1.0   | HTTP server framework          |
| mongoose      | ^8.16.0  | MongoDB ODM                    |
| jsonwebtoken  | ^9.0.2   | JWT token creation/verification|
| bcryptjs      | ^3.0.2   | Password hashing               |
| bcrypt        | ^6.0.0   | Password hashing (native)      |
| cors          | ^2.8.5   | Cross-origin resource sharing  |
| dotenv        | ^16.5.0  | Environment variable loading   |
| validator     | ^13.15.15| Input validation (email)       |
| body-parser   | ^2.2.0   | Request body parsing           |
| nodemon       | ^3.1.10  | Dev auto-restart               |

> **Note:** Both `bcrypt` and `bcryptjs` are installed, but only `bcryptjs` is imported in code.

### Frontend (`frontend/package.json`)

| Package           | Version   | Purpose                       |
|-------------------|-----------|-------------------------------|
| react             | ^19.1.0   | UI library                    |
| react-dom         | ^19.1.0   | DOM rendering                 |
| react-router-dom  | ^7.6.2    | Client-side routing           |
| axios             | ^1.10.0   | HTTP client                   |
| date-fns          | ^4.1.0    | Date formatting/comparison    |
| lucide-react      | ^0.525.0  | Icon library                  |
| react-toastify    | ^11.0.5   | Toast notifications           |
| @tailwindcss/vite | ^4.1.17   | Tailwind CSS v4 integration   |

### Dev Dependencies (Frontend)

| Package                         | Version  | Purpose             |
|---------------------------------|----------|---------------------|
| vite                            | ^6.3.5   | Build tool          |
| @vitejs/plugin-react            | ^4.5.2   | React/JSX support   |
| eslint                          | ^9.25.0  | Linting             |
| eslint-plugin-react-hooks       | ^5.2.0   | React hooks linting |
| eslint-plugin-react-refresh     | ^0.4.19  | HMR linting         |
| globals                         | ^16.0.0  | ESLint globals      |
| @types/react, @types/react-dom  | ^19.x    | TypeScript types    |

## Configuration

### Environment Variables

**Backend** (`backend/.env.example`):
- `PORT` — Express server port (default: 4000)
- `MONGODB_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — Secret for signing JWT tokens
- `CORS_ORIGIN` — Comma-separated allowed frontend origins

**Frontend** (`frontend/.env.example`):
- `VITE_API_BASE_URL` — Backend API URL (default: `http://localhost:4000`)

### Build & Dev Scripts

**Backend:**
- `npm start` → `node server.js` (with prestart env check)
- `npm run dev` → `nodemon server.js` (with predev env check)
- `npm run check-env` → validates required env vars

**Frontend:**
- `npm run dev` → Vite dev server
- `npm run build` → Vite production build
- `npm run lint` → ESLint
- `npm run preview` → Vite preview of build

## Package Managers

- **npm** — Both workspaces use npm (presence of `package-lock.json` in both)
- No monorepo tooling — backend and frontend are independent npm projects
