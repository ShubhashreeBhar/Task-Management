# Testing

> Last mapped: 2026-04-30

## Current State: No Tests

**There is no test infrastructure in this project.**

### What's Missing

| Area                    | Status      |
|-------------------------|-------------|
| Test framework          | None        |
| Unit tests              | None        |
| Integration tests       | None        |
| E2E tests               | None        |
| API tests               | None        |
| Component tests         | None        |
| CI/CD pipeline          | None        |
| Test scripts in package | None        |
| Coverage reporting      | None        |

### No Test Dependencies

Neither `backend/package.json` nor `frontend/package.json` include any testing libraries such as Jest, Vitest, React Testing Library, Supertest, Cypress, or Playwright.

## Manual Testing Only

The project relies entirely on manual testing:

1. **Environment validation:** `backend/check-env.js` validates required env vars before server start
2. **Backend dummy data:** `frontend/src/assets/dummy.jsx` contains `backendDummy` array (not used in code, likely for manual API testing)
3. **Dev server hot reload:** Vite HMR + Nodemon for rapid manual iteration

## Recommended Test Strategy

### Priority 1 - Backend API Tests
- **Tool:** Vitest + Supertest
- **Focus:** Auth flow (register/login), CRUD operations, authorization checks

### Priority 2 - Frontend Component Tests
- **Tool:** Vitest + React Testing Library
- **Focus:** Form validation, auth flow, task rendering

### Priority 3 - E2E Tests
- **Tool:** Playwright or Cypress
- **Focus:** Full user journey (register, login, create, edit, complete, delete, logout)
