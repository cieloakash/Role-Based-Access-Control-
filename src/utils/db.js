import mongoose from "mongoose"
export const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected to db");
        
    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
}