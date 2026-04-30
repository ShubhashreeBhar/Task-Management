# TaskTrack - MERN Stack Task Management System

TaskTrack is a comprehensive task management application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a full-featured interface for creating, managing, and tracking daily tasks with dynamic filtering, real-time status updates, and a responsive modern UI designed with Tailwind CSS.

## Features

- **User Authentication**: Secure signup and login using JWT (JSON Web Tokens).
- **Task Management**: Create, edit, delete, and view tasks with ease.
- **Priority Labeling**: Assign Low, Medium, or High priority to tasks.
- **Due Dates & Status Tracking**: Set due dates and easily mark tasks as complete or incomplete.
- **Advanced Filtering**: Sort and filter tasks by priority, date (Today, This Week), and status (Pending vs. Completed).
- **Responsive Dashboard**: Beautiful, mobile-friendly dashboard providing statistics and recent activity history.
- **User Profiles**: Manage personal information and securely change passwords.

## Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- React Router (Routing)
- Axios (HTTP Client)
- Lucide React (Icons)
- React Toastify (Notifications)
- Date-fns (Date manipulation)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT)
- bcryptjs (Password hashing)
- CORS & dotenv

## Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
- Node.js (v16.0 or higher recommended)
- MongoDB instance (Local or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/Task-Management.git
cd Task-Management
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```
Edit the newly created `backend/.env` file and provide your MongoDB connection string and a secret key for JWT:
```env
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.exmpl.mongodb.net/Task-Management?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
CORS_ORIGIN=http://localhost:5173
```

Start the backend server:
```bash
npm start
```
The server will run on `http://localhost:4000`.

### 3. Frontend Setup
Open a new terminal window or tab.
```bash
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```
The `frontend/.env` comes pre-configured for local development, pointing to `http://localhost:4000`. If your backend runs on a different port, update the `VITE_API_BASE_URL` inside `frontend/.env`.

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## Deployment

### Backend
The backend can be easily deployed to platforms like Render, Heroku, or Vercel. Ensure you copy the variables from `.env.example` into your platform's Environment Variables settings. Specifically, be sure to set `CORS_ORIGIN` to your deployed frontend's URL.

### Frontend
The Vite + React frontend can be deployed to Vercel, Netlify, or similar platforms. Set `VITE_API_BASE_URL` in the deployment settings to point to your live backend URL.

## License
[ISC License](LICENSE)