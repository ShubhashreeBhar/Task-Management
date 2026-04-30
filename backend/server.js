import express from "express"
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from "./config/db.js";
import userRouter from './routes/userRoute.js'
import taskRouter from "./routes/taskRoute.js";
const app= express ();
const port=process.env.PORT || 4000;

// Allowed CORS origins
const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
    : ['http://localhost:5173', 'http://localhost:5174'];

//MIDDLEWARE
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (origin.startsWith('http://localhost:')) return callback(null, true);

        if (allowedOrigins.includes(origin)) return callback(null, true);

        callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//DB CONNECT
connectDB();


//Routes
app.use("/api/user",userRouter);
app.use("/api/tasks",taskRouter);

app.get('/',(req,res)=>{
    res.send('API working');
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})