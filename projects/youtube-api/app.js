import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js"
import videoRoutes from "./routes/video.routes.js"
import commentRoutes from "./routes/comment.routes.js"
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";


dotenv.config()
 const app = express();

 connectDB()

 app.use(bodyParser.json())

 app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
 }))
app.use("/api/user" , userRoutes )
app.use("/api/video" , videoRoutes)
app.use("/api/comments", commentRoutes);


 export default app;