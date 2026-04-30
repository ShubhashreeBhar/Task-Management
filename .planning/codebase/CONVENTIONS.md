# Code Conventions

> Last mapped: 2026-04-30

## Module System

- **ES Modules (ESM)** throughout — both backend and frontend use `"type": "module"` in package.json
- Imports: `import X from 'module'` / `import { X } from 'module'`
- Exports: `export default` for components/models, named exports for controller functions

## Code Style

### Formatting
- **No Prettier config** — no automatic code formatting
- **Inconsistent spacing** — mix of tight and spaced code (e.g., `const port=process.env.PORT` vs `const token = localStorage.getItem('token')`)
- **Semicolons:** Inconsistent — some lines use them, others don't
- **Quotes:** Mix of single and double quotes
- **Indentation:** Generally 4 spaces in backend, 2 spaces in frontend (not enforced)

### Naming
- **Variables:** camelCase (`currentUser`, `showModal`, `formData`)
- **Constants:** UPPER_SNAKE_CASE for CSS class constants (`BUTTON_CLASSES`, `STAT_CARD`)
- **Components:** PascalCase (`Dashboard`, `TaskItem`, `Layout`)
- **Models:** PascalCase for schema names, camelCase for variables
- **Route variables:** camelCase with "Router" suffix (`userRouter`, `taskRouter`)

## Error Handling Patterns

### Backend
```javascript
// Standard try/catch pattern in all controllers:
try {
    // ... business logic
} catch(err) {
    console.log(err);  // Note: console.log, not console.error
    res.status(500).json({ success: false, message: "Server error" });
}
```

- All API responses use `{ success: boolean, ...data }` envelope
- Validation errors return 400 with descriptive messages
- Auth failures return 401
- Conflict errors (duplicate email) return 409
- No centralized error handling middleware

### Frontend
```javascript
// Typical Axios error handling:
catch(err) {
    const msg = err.response?.data?.message || err.message;
    toast.error(msg);
}
```

- Uses `react-toastify` for user-facing error messages
- 401 responses trigger `onLogout()` to clear auth state
- No global error boundary

## Component Patterns

### Functional Components Only
- All components are functional (no class components)
- Use React hooks: `useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`

### Props Pattern
```javascript
const Component = ({ prop1, prop2, onAction }) => { ... }
```

### Auth Headers Pattern
```javascript
// Repeated in multiple components:
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No auth token found');
    return { Authorization: `Bearer ${token}` };
};
```

> **Note:** This pattern is duplicated across `TaskItem.jsx`, `TaskModal.jsx`, `PendingPage.jsx`, and `Layout.jsx` instead of being centralized.

### Data Fetching Pattern
```javascript
// Layout.jsx centralized fetching:
const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/tasks/gp`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(arr);
    } catch(err) { ... }
    finally { setLoading(false); }
}, [onLogout]);
```

### CSS Constants Pattern
```javascript
// All Tailwind class strings centralized in dummy.jsx:
export const BUTTON_CLASSES = "w-full bg-gradient-to-r from-sky-500 to-sky-800 ...";
export const STAT_CARD = "p-3 md:p-4 rounded-xl bg-white shadow-sm ...";

// Used in components:
<button className={BUTTON_CLASSES}>...</button>
```

## Styling Approach

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- `index.css` contains only `@import "tailwindcss";`
- All custom class combinations stored in `frontend/src/assets/dummy.jsx`
- No custom CSS beyond Tailwind utilities
- **Color palette:** Primarily sky-blue gradient theme (`from-sky-300 to-sky-800`)
- Responsive: Uses Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`)

## API Communication

- **Axios** for most API calls (Login, Layout, Profile, TaskItem)
- **Fetch API** in `TaskModal.jsx` (inconsistent with rest of app)
- API base URL centralized in `frontend/src/config.js`:
  ```javascript
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
  ```

## Database Patterns

### Mongoose Model Registration
```javascript
// Defensive model registration to avoid OverwriteModelError:
const userModel = mongoose.models.user || mongoose.model("user", userSchema);
// Task uses different pattern:
const Task = mongoose.Task || mongoose.model('Task', taskSchema);
```

### Owner-Scoped Queries
```javascript
// All task queries filter by authenticated user:
const tasks = await Task.find({ owner: req.user.id });
const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
```

## Linting

- **ESLint v9** with flat config (`frontend/eslint.config.js`)
- Plugins: `react-hooks`, `react-refresh`
- Rules: recommended JS + React hooks, unused vars ignored if PascalCase/UPPER_CASE
- **No backend linting configured**
