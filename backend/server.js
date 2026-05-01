import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
        : "https://task-management-phi-three.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// DB Connect
connectDB();

// Routes
app.use("/api/user", userRouter);
app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
    res.send("API working");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});