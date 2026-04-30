# Requirements: TaskTrack

**Defined:** 2026-04-30
**Core Value:** A user can securely log in and manage their personal tasks end-to-end — create, edit, complete, delete — without authentication failures or data loss.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Authentication & Security

- [ ] **AUTH-01**: Fix `JET_SECRET` typo in `backend/middleware/auth.js` to ensure token verification works.
- [ ] **AUTH-02**: Implement synchronous token save to `localStorage` during login/signup.
- [ ] **AUTH-03**: Implement hard redirect (`window.location.href`) post-login to prevent 401 race conditions.
- [ ] **AUTH-04**: Add conditional guards in `Layout.jsx` to prevent API fetches if auth token is null/undefined.
- [ ] **AUTH-05**: Centralize auth header construction (via Axios interceptor) instead of duplicating across components.
- [ ] **AUTH-06**: Fix Login IIFE session restoration bug.

### Environment & Architecture

- [ ] **ENV-01**: Standardize backend MongoDB connection string to bypass DNS issues.
- [ ] **ENV-02**: Read all secrets (`JWT_SECRET`, `MONGODB_URI`) exclusively from `.env`.
- [ ] **ENV-03**: Configure Express backend CORS to dynamically accept requests from `CORS_ORIGIN` env var.
- [ ] **ENV-04**: Standardize HTTP client usage on Axios (replace `fetch` in `TaskModal.jsx`).

### Data Integrity & Bugs

- [ ] **DATA-01**: Fix TaskItem API URL mismatch by adding `/gp` suffix to prevent 404s.
- [ ] **DATA-02**: Fix PendingPage undefined variable references to prevent crash on click.
- [ ] **DATA-03**: Normalize `completed` field handling to Boolean universally, removing string checks.

### Code Quality & Deployment

- [ ] **CODE-01**: Remove redundant `bcrypt` and `body-parser` dependencies.
- [ ] **CODE-02**: Remove deprecated Mongoose options (`useNewUrlParser`, `useUnifiedTopology`).
- [ ] **CODE-03**: Regenerate professional README.md with setup instructions, tech stack badges, and split deployment guide.
- [ ] **CODE-04**: Ensure the codebase is clean, formatted, and contains no dead code for GitHub showcase.

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Features
- **FEAT-01**: Password reset via email
- **FEAT-02**: User avatars and profile enhancements
- **FEAT-03**: Task categories and tags

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| OAuth login | Out of scope for this milestone |
| Real-time features (WebSockets) | Task management doesn't require it |
| File uploads / attachments | Feature creep for showcase project |
| Admin panel / multi-user | Personal productivity app only |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | Phase 1 | Pending |
| AUTH-02 | Phase 1 | Pending |
| AUTH-03 | Phase 1 | Pending |
| AUTH-04 | Phase 1 | Pending |
| AUTH-05 | Phase 1 | Pending |
| AUTH-06 | Phase 1 | Pending |
| ENV-01 | Phase 2 | Pending |
| ENV-02 | Phase 2 | Pending |
| ENV-03 | Phase 2 | Pending |
| ENV-04 | Phase 2 | Pending |
| DATA-01 | Phase 3 | Pending |
| DATA-02 | Phase 3 | Pending |
| DATA-03 | Phase 3 | Pending |
| CODE-01 | Phase 4 | Pending |
| CODE-02 | Phase 4 | Pending |
| CODE-03 | Phase 4 | Pending |
| CODE-04 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 17 total
- Mapped to phases: 17
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-30*
*Last updated: 2026-04-30 after initial definition*
