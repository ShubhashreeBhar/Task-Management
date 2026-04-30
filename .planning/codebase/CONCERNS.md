# Concerns & Technical Debt

> Last mapped: 2026-04-30

## Critical Security Issues

### 1. JWT Secret Mismatch (BUG)
- **File:** `backend/middleware/auth.js` line 4
- **Issue:** Uses `process.env.JET_SECRET` (typo: **JET** instead of **JWT**) with hardcoded fallback `'your_jwt_secret_here'`
- **Impact:** Auth middleware uses a different secret than `userController.js` which uses `process.env.JWT_SECRET`. Tokens created by the controller cannot be verified by the middleware unless both env vars happen to be set and match, or the typo causes fallback to the hardcoded default.
- **Severity:** CRITICAL — This is an authentication-breaking bug.

### 2. JWT Stored in localStorage
- **Files:** `frontend/src/components/Login.jsx`, `SignUp.jsx`, `App.jsx`
- **Issue:** JWT tokens stored in `localStorage` are vulnerable to XSS attacks
- **Recommendation:** Use httpOnly cookies with SameSite attribute

### 3. Hardcoded JWT Fallback
- **File:** `backend/middleware/auth.js` line 4
- **Issue:** Fallback value `'your_jwt_secret_here'` — if env var is missing, auth uses a publicly known default secret
- **Note:** The controller in `userController.js` properly exits if `JWT_SECRET` is missing, but middleware doesn't

## Bugs

### 4. Task Model Registration Error
- **File:** `backend/models/taskModel.js` line 32
- **Code:** `const Task = mongoose.Task || mongoose.model('Task', taskSchema);`
- **Issue:** `mongoose.Task` will always be `undefined` — should be `mongoose.models.Task`
- **Impact:** Works on first load but pattern is incorrect; User model does it correctly

### 5. Unused `axios` Import in Dashboard
- **File:** `frontend/src/pages/Dashboard.jsx` line 80
- **Code:** `await axios.put(...)` — `axios` is never imported in Dashboard.jsx
- **Impact:** `handleTaskSave` function would crash if called with an existing task ID

### 6. PendingPage References Undefined Variables
- **File:** `frontend/src/pages/PendingPage.jsx` lines 104-108
- **Code:** References `handleDelete`, `handleToggleComplete`, and `t.completed` (should be `task.completed`)
- **Impact:** Click handlers would crash — these functions are never defined in PendingPage

### 7. TaskItem API URL Mismatch
- **File:** `frontend/src/components/TaskItem.jsx` line 44-45
- **Code:** Uses `${API_BASE}/${task._id}` without `/gp` suffix
- **But:** Task routes require `/gp` suffix (`/api/tasks/:id/gp`)
- **Impact:** PUT/DELETE requests from TaskItem would get 404 errors

### 8. Login IIFE Never Executes
- **File:** `frontend/src/components/Login.jsx` lines 21-44
- **Issue:** The IIFE for session restoration is defined but never invoked (`(async()=>{ ... })` — missing trailing `()`)
- **Impact:** Session restoration on page load doesn't work

## Technical Debt

### 9. Duplicated Auth Header Logic
- **Locations:** `TaskItem.jsx`, `TaskModal.jsx`, `PendingPage.jsx`, `Layout.jsx`
- **Issue:** Each component independently reads token from localStorage and constructs auth headers
- **Recommendation:** Create shared `api.js` with Axios interceptor for automatic auth headers

### 10. Mixed HTTP Clients
- `TaskModal.jsx` uses raw `fetch()` API
- All other components use `axios`
- **Recommendation:** Standardize on Axios with a configured instance

### 11. Inconsistent Completed Field Handling
- Backend stores `completed` as Boolean
- Frontend sends `'Yes'`/`'No'` strings in some places, `true`/`false` in others
- Multiple normalization checks scattered across: `Layout.jsx`, `TaskItem.jsx`, `Dashboard.jsx`, `CompletePage.jsx`, `PendingPage.jsx`
- **Recommendation:** Standardize on Boolean throughout

### 12. Redundant Dependencies
- Both `bcrypt` (native, v6) and `bcryptjs` (pure JS, v3) installed
- Only `bcryptjs` is used in code
- `body-parser` installed but not needed (Express v5 has built-in body parsing)

### 13. Monolithic Constants File
- `frontend/src/assets/dummy.jsx` (288 lines) mixes:
  - CSS class strings
  - Form field definitions
  - Menu items with JSX icons
  - Backend test dummy data
  - Utility functions
- **Recommendation:** Split into domain-specific constant files

### 14. No Input Sanitization
- Backend controllers trust user input directly
- No XSS protection on task title/description
- `validator` library only used for email validation

### 15. No Pagination
- `getTasks` fetches ALL tasks for a user with no limit
- Could cause performance issues with large task collections

### 16. Unconventional Route Paths
- Task routes use `/gp` suffix (e.g., `/api/tasks/gp`, `/api/tasks/:id/gp`)
- Purpose of `/gp` is unclear and makes the API non-standard

## Performance Concerns

### 17. No Caching
- Every page mount triggers a full task refetch
- No client-side caching or stale-while-revalidate pattern

### 18. Deprecated Mongoose Options
- **File:** `backend/config/db.js`
- `useNewUrlParser` and `useUnifiedTopology` are deprecated in Mongoose 8+
- These options are now default and can be removed

## Missing Features (Gaps)

- No password reset / forgot password flow
- No email verification on registration
- No rate limiting on auth endpoints
- No request logging / monitoring
- No HTTPS enforcement
- No CSP headers
- No database indexes beyond `email: unique`
