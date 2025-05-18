import express from "express";
import dotenv from "dotenv"
import {connectDb} from "./utils/db.js"
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express()
dotenv.config()

// middleware
app.use(express.json()) //help to get json data


// routes
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)

// start the server
app.listen(process.env.PORT,(req,res)=>{
    console.log("server is running");
    connectDb()
})