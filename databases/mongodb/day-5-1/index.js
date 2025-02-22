import express from "express";
import connectDB from "./config/db.js"
import userRoute from "./routes/user.routes.js"

const PORT = 3000

const app = express();


// Connect to db
app.use(express.json())
connectDB();
app.use("/api/" , userRoute)

app.get("/" , (req , res)=>{
        res.send("Hello world")
})

app.listen(PORT ,()=>{
    console.log("Server is up")
})

