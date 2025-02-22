import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";


import { connectDB } from "./config/db.config.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json({limit:"10mb"}));
app.use(cookieParser());

// *Routes Middleware

app.use("/api/v1/auth" , authRoutes);
app.use("/api/v1/products" , productRoutes)

app.listen(PORT , ()=>{
    console.log(`Server is running on PORT http://localhost:${PORT}`);
    connectDB();
})