# External Integrations

> Last mapped: 2026-04-30

## Database — MongoDB Atlas

- **ODM:** Mongoose v8.16.0
- **Connection:** `backend/config/db.js` via `MONGODB_URI` env var
- **Connection options:** `useNewUrlParser`, `useUnifiedTopology`, 5s server selection timeout
- **Models:**
  - `User` (`backend/models/userModel.js`) — `name`, `email` (unique), `password`
  - `Task` (`backend/models/taskModel.js`) — `title`, `description`, `priority`, `dueDate`, `owner` (ref to User), `completed`, `createdAt`

## Authentication — JWT (Self-managed)

- **Library:** `jsonwebtoken` v9.0.2
- **Token creation:** `backend/controllers/userController.js` → `createToken(userId)`
- **Token verification:** `backend/middleware/auth.js` → `authMiddleware`
- **Token lifetime:** 24 hours (`TOKEN_EXPIRES = '24h'`)
- **Token storage (client):** `localStorage` — `token` and `userId` keys
- **Auth header format:** `Authorization: Bearer <token>`

## Password Hashing — bcryptjs

- **Library:** `bcryptjs` v3.0.2
- **Salt rounds:** 10
- **Used in:** `backend/controllers/userController.js` (register, change password)

## External APIs

### UI Avatars
- **URL:** `https://ui-avatars.com/api/`
- **Usage:** Generates avatar images from user names
- **Called from:** `frontend/src/App.jsx` (handleAuthSubmit), `frontend/src/components/Profile.jsx` (saveProfile)
- **Not self-hosted** — relies on external service availability

## Deployment Platforms

### Render (Backend)
- **Config:** `render.yaml` at project root
- **Service type:** `web` (Node.js)
- **Build command:** `npm install`
- **Start command:** `npm start`
- **Root directory:** `backend`
- **Env vars configured:** `NODE_VERSION`, `MONGODB_URI`, `JWT_SECRET`, `CORS_ORIGIN`, `PORT`

### Vercel (Frontend)
- **Config:** `frontend/vercel.json`
- **SPA rewrite rule:** All routes → `/index.html`
- **Env var:** `VITE_API_BASE_URL` must point to deployed backend

## CORS Configuration

- **Backend:** Dynamic origin checking in `backend/server.js`
- **Allowed origins:** Parsed from `CORS_ORIGIN` env var (comma-separated)
- **Credentials:** Enabled (`credentials: true`)
- **Fallback:** `http://localhost:5173` when `CORS_ORIGIN` is not set

## No Third-Party Integrations

The application does **not** currently integrate with:
- Email services (no password reset, no notifications)
- OAuth providers (no social login)
- Analytics or monitoring services
- Payment processors
- Push notification services
- File storage / CDN services
