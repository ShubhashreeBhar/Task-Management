# TaskTrack

## What This Is

TaskTrack is a MERN stack task management application for personal productivity. Users register, log in, and manage tasks with priorities (Low/Medium/High), due dates, and completion tracking. The app features a responsive dashboard with statistics, filtering, and sorting — deployed as a split architecture with the Express/MongoDB backend on Render and the React/Vite frontend on Vercel.

## Core Value

A user can securely log in and manage their personal tasks end-to-end — create, edit, complete, delete — without authentication failures or data loss.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. Inferred from existing codebase. -->

- ✓ User registration with email/password — existing
- ✓ User login with JWT authentication — existing
- ✓ Task CRUD (create, read, update, delete) — existing
- ✓ Task priority labeling (Low, Medium, High) — existing
- ✓ Task due dates and completion tracking — existing
- ✓ Owner-scoped task isolation (users only see their own tasks) — existing
- ✓ Dashboard with task statistics and recent activity — existing
- ✓ Pending and completed task views with sorting — existing
- ✓ User profile management (name, email, password change) — existing
- ✓ Responsive UI with Tailwind CSS — existing
- ✓ Split deployment config (Render backend, Vercel frontend) — existing

### Active

<!-- Current scope. Building toward these. -->

- [ ] Fix critical JWT secret typo bug (`JET_SECRET` → `JWT_SECRET` in auth middleware)
- [ ] Bulletproof auth handshake — synchronous token save + hard redirect to prevent 401 race conditions
- [ ] API resilience — guard against null/undefined tokens before fetching tasks in Layout.jsx
- [ ] Standardize MongoDB connection string (bypass DNS issues with standard protocol)
- [ ] Dynamic CORS configuration via `CORS_ORIGIN` env var for deployed Vercel URL
- [ ] Fix TaskItem API URL mismatch (missing `/gp` suffix causing 404s)
- [ ] Fix PendingPage undefined variable references (`handleDelete`, `handleToggleComplete`, `t.completed`)
- [ ] Fix Login IIFE session restoration (never invoked)
- [ ] Remove redundant dependencies (`bcrypt` native — only `bcryptjs` used; `body-parser` — Express v5 built-in)
- [ ] Centralize auth header logic (eliminate duplication across 4+ components)
- [ ] Standardize HTTP client usage (remove mixed `fetch`/`axios` in TaskModal.jsx)
- [ ] Normalize `completed` field handling (standardize on Boolean, remove scattered string checks)
- [ ] Remove deprecated Mongoose options (`useNewUrlParser`, `useUnifiedTopology`)
- [ ] Professional README.md with setup instructions, tech stack badges, and deployment guide
- [ ] GitHub showcase readiness — clean code, consistent formatting, no dead code

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- Password reset / forgot password — Not needed for MVP showcase
- Email verification on registration — Adds complexity without core value
- OAuth / social login — Out of scope for this milestone
- Real-time features (WebSockets) — Task management doesn't require it
- File uploads / attachments — Feature creep for showcase project
- Admin panel / multi-user management — Personal productivity app only
- Pagination — Task volume per user is small enough for full fetch
- Analytics / monitoring integration — Not needed for portfolio piece

## Context

**Brownfield project.** The codebase is functional but has accumulated technical debt and several bugs discovered during codebase mapping (see `.planning/codebase/CONCERNS.md`).

**Critical bug:** The auth middleware (`backend/middleware/auth.js` line 4) references `process.env.JET_SECRET` (typo) instead of `JWT_SECRET`, with a hardcoded fallback `'your_jwt_secret_here'`. This means the middleware uses a different signing secret than the controller, breaking token verification in production.

**Existing architecture:**
- Backend: Express v5 + Mongoose v8 + JWT auth (MVC pattern)
- Frontend: React 19 + Vite 6 + React Router 7 + Tailwind CSS v4
- Database: MongoDB Atlas (cloud)
- Deployment: Render (backend) + Vercel (frontend)

**No tests exist.** No CI/CD pipeline. Manual testing only.

**Codebase map available:** `.planning/codebase/` contains 7 documents covering stack, architecture, structure, conventions, testing, integrations, and concerns.

## Constraints

- **Tech stack**: MERN (MongoDB, Express, React, Node.js) — already established, no migration
- **Deployment**: Render (backend) + Vercel (frontend) — already configured
- **Auth**: JWT with localStorage — established pattern, not switching to cookies this milestone
- **Styling**: Tailwind CSS v4 — already integrated via Vite plugin
- **No new dependencies**: Fixes should use existing packages where possible
- **Backwards compatible**: Existing user data in MongoDB must continue to work

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Fix bugs before adding features | Critical auth bug breaks core functionality | — Pending |
| Keep JWT in localStorage | Established pattern; switching to httpOnly cookies is a larger refactor | — Pending |
| Standardize on `bcryptjs` only | Native `bcrypt` is redundant and causes build issues | — Pending |
| Remove `body-parser` dependency | Express v5 has built-in body parsing | — Pending |
| Centralize API client with Axios interceptor | Eliminates duplicated auth header logic across components | — Pending |
| Standardize `completed` as Boolean | Removes 5+ scattered normalization checks | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-30 after initialization*
