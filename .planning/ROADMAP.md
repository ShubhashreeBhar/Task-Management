# Roadmap: TaskTrack

## Overview

The journey to production readiness for TaskTrack focuses entirely on paying down technical debt, squashing critical bugs, hardening authentication, and preparing for a polished GitHub showcase. The roadmap moves from foundational environment configuration, through deep authentication fixes, data integrity corrections, and finally repository polish.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Environment & Config Hardening** - Secure secrets, fix CORS, clean dependencies, and update DB configuration.
- [ ] **Phase 2: Authentication Backend Hardening** - Fix the critical JWT secret bug and centralize the Axios HTTP client.
- [ ] **Phase 3: Auth UI & Handshake Stabilization** - Fix the frontend login race conditions, token persistence, and UI guards.
- [ ] **Phase 4: Frontend Data & State Bugs** - Fix API URL mismatches, undefined click handlers, and normalize data types.
- [ ] **Phase 5: Production Polish & Showcase** - Final cleanups, formatting, and generating a professional README for GitHub.

## Phase Details

### Phase 1: Environment & Config Hardening
**Goal**: Secure the application configuration and eliminate deprecated/redundant packages to establish a solid foundation.
**Depends on**: Nothing (first phase)
**Requirements**: [ENV-01, ENV-02, ENV-03, CODE-01, CODE-02]
**Success Criteria** (what must be TRUE):
  1. The backend uses environment variables exclusively for secrets and connection strings.
  2. CORS dynamically accepts the Vercel URL.
  3. Redundant packages (`bcrypt`, `body-parser`) and deprecated Mongoose options are removed.
**Plans**: 2 plans

Plans:
- [ ] 01-01: Update env var loading, CORS, and Mongoose connection string/options.
- [ ] 01-02: Clean `package.json` dependencies and ensure project still builds/runs.

### Phase 2: Authentication Backend Hardening
**Goal**: Fix the critical JWT secret mismatch and standardize all API calls via a centralized Axios interceptor.
**Depends on**: Phase 1
**Requirements**: [AUTH-01, AUTH-05, ENV-04]
**Success Criteria** (what must be TRUE):
  1. Tokens are signed and verified using the same `JWT_SECRET`.
  2. All frontend API calls use Axios with automatically injected auth headers.
  3. `fetch` is completely removed from `TaskModal.jsx`.
**Plans**: 2 plans

Plans:
- [ ] 02-01: Fix `JET_SECRET` typo in `backend/middleware/auth.js`.
- [ ] 02-02: Create `api.js` Axios instance, replace `fetch` in `TaskModal`, and remove duplicated auth logic across all components.

### Phase 3: Auth UI & Handshake Stabilization
**Goal**: Bulletproof the frontend authentication state to prevent 401 Unauthorized race conditions on login/signup.
**Depends on**: Phase 2
**Requirements**: [AUTH-02, AUTH-03, AUTH-04, AUTH-06]
**Success Criteria** (what must be TRUE):
  1. Users can log in/sign up and are immediately redirected without crashing.
  2. `Layout.jsx` guards against fetching tasks if the token is missing.
  3. The Login IIFE restores the session correctly on mount.
**Plans**: 2 plans

Plans:
- [ ] 03-01: Implement synchronous localStorage saves, hard redirect on auth, and fix the Login IIFE.
- [ ] 03-02: Add conditional rendering/fetching guards in `Layout.jsx` and related layout components.

### Phase 4: Frontend Data & State Bugs
**Goal**: Resolve runtime crashes and 404 errors in task management components.
**Depends on**: Phase 3
**Requirements**: [DATA-01, DATA-02, DATA-03]
**Success Criteria** (what must be TRUE):
  1. Users can edit/delete tasks from `TaskItem.jsx` without hitting 404s.
  2. `PendingPage` buttons work without crashing due to undefined variables.
  3. The `completed` field logic uses Booleans everywhere instead of mixed strings/booleans.
**Plans**: 2 plans

Plans:
- [ ] 04-01: Fix API endpoints in `TaskItem.jsx` (add `/gp`) and resolve undefined variables in `PendingPage.jsx`.
- [ ] 04-02: Normalize all instances of the `completed` field to strictly evaluate as Boolean (`true`/`false`).

### Phase 5: Production Polish & Showcase
**Goal**: Prepare the repository for a professional GitHub portfolio presentation.
**Depends on**: Phase 4
**Requirements**: [CODE-03, CODE-04]
**Success Criteria** (what must be TRUE):
  1. No dead code or unused imports exist in the codebase.
  2. The README.md includes setup instructions, architecture split, and badges.
**Plans**: 2 plans

Plans:
- [ ] 05-01: Perform a final lint/cleanup pass, removing unused imports and dead code.
- [ ] 05-02: Generate the final `README.md` with full deployment and local setup guides.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Environment & Config Hardening | 0/2 | Not started | - |
| 2. Authentication Backend Hardening | 0/2 | Not started | - |
| 3. Auth UI & Handshake Stabilization | 0/2 | Not started | - |
| 4. Frontend Data & State Bugs | 0/2 | Not started | - |
| 5. Production Polish & Showcase | 0/2 | Not started | - |
