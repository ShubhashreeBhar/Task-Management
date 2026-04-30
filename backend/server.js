import express from "express"
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from "./config/db.js";
import userRouter from './routes/userRoute.js'
import taskRouter from "./routes/taskRoute.js";
const app= express ();
const port=process.env.PORT || 4000;

// CORS configuration
const corsOrigin = process.env.CORS_ORIGIN;
app.use(cors(
    corsOrigin
        ? { origin: corsOrigin.split(',').map(o => o.trim()), credentials: true }
        : { origin: '*' }
));

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