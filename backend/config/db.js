import mongoose from "mongoose";

export const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("❌ MONGODB_URI is not defined.");
        process.exit(1);
    }

    console.log("⏳ Attempting to connect to MongoDB Atlas...");

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // If it doesn't connect in 5 seconds, fail
        });
        console.log('✅ DB connected');
    } catch (err) {
        console.error('❌ DB connection failed:', err.message);
        // Don't kill the process immediately so you can read the error
    }
}