# TaskTrack

A full-stack task management application built with the MERN stack. Create, organize, and track your tasks with priority levels, due dates, and completion status.

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## Features

- **Secure Authentication** — JWT-based login and registration with bcrypt password hashing
- **Task CRUD** — Create, edit, complete, and delete tasks
- **Priority Levels** — Organize tasks by Low, Medium, and High priority
- **Due Dates** — Set and track deadlines with date formatting
- **Dashboard** — Overview of task statistics, completion rates, and recent activity
- **Filtered Views** — Separate pages for pending and completed tasks with sorting
- **User Profiles** — Update name, email, and password
- **Responsive Design** — Works on desktop, tablet, and mobile

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite 6, React Router 7, Tailwind CSS 4 |
| Backend | Express 5, Node.js 18 |
| Database | MongoDB Atlas (Mongoose 8) |
| Auth | JSON Web Tokens, bcryptjs |
| Icons | Lucide React |
| Notifications | React Toastify |

## Project Structure

```
TaskTrack/
├── backend/
│   ├── config/         # Database connection
│   ├── controllers/    # Business logic (user, task)
│   ├── middleware/      # JWT authentication
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   └── server.js       # Express entry point
│
└── frontend/
    └── src/
        ├── components/  # Reusable UI components
        ├── pages/       # Route-level pages
        ├── assets/      # Constants, icons, images
        └── App.jsx      # Root component with routing
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/user/register` | No | Create a new account |
| POST | `/api/user/login` | No | Login and receive JWT |
| GET | `/api/user/me` | Yes | Get current user profile |
| PUT | `/api/user/profile` | Yes | Update user profile |
| PUT | `/api/user/password` | Yes | Change password |
| GET | `/api/tasks` | Yes | Get all tasks |
| POST | `/api/tasks` | Yes | Create a task |
| GET | `/api/tasks/:id` | Yes | Get a single task |
| PUT | `/api/tasks/:id` | Yes | Update a task |
| DELETE | `/api/tasks/:id` | Yes | Delete a task |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/your-username/TaskTrack.git
cd TaskTrack
```

### 2. Set up the backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` with your values:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET=your_secret_key_here
CORS_ORIGIN=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment

### Backend → Render

1. Push to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Set root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables: `PORT`, `MONGODB_URI`, `JWT_SECRET`, `CORS_ORIGIN`

### Frontend → Vercel

1. Import the repo on [Vercel](https://vercel.com)
2. Set root directory to `frontend`
3. Add environment variable: `VITE_API_BASE_URL` (your Render backend URL)
4. Deploy

## License

ISC