import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js"
import privateRoutes from "./routes/private.routes.js"

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express();
app.use(express.json())


// connect mongodb
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Mongodb connected"))
.catch((err)=>console.log("Mongodb connection error" , err.message))


// Routes

app.use("/auth" , authRoutes);
app.use("/private" , privateRoutes)

app.listen(PORT , ()=>{
    console.log(`Server is running at port no http://localhost:${PORT}`)
})

// authentication routes ( SIGNUP AND LOGIN)
// PRIVATE ROUTES ( JWT ( AUTHENTICATE))