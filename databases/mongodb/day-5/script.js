import express from "express"
import connectDB from "./db.js"
import users from "./routes/user.routes.js"
const app = express()

// connect to db
app.use(express.json())
connectDB();
app.use("/api/",users)


app.get("/" , (req , res)=>{
    res.send("Hello Guys i am from codesnippet")
})


app.listen(3000 , ()=>{
    console.log("DB Connected")
})