import mongoose from "mongoose";

export const connectDB =async()=>{
    await mongoose.connect('mongodb+srv://tulibhar7112004:07tulibhar@cluster0.yovgucv.mongodb.net/Task-Management')
    .then(()=> console.log('Db connect'))
}
