import express from "express";
import session from "express-session";
import cookieParse  from "cookie-parser";

import authRoute from "./routes/auth.routes.js";
import taskRoute from "./routes/task.routes.js";

const app = express();
const PORT = 8080;


// Global Middleware
app.use(express.json());

app.use(session({
  secret:"your-secret-key",
  resave:false,
  saveUninitialized:false,
  cookie:{
    httpOnly:true,
    secure:false,
    maxAge:1000*60*60*24 // 1 day
  }
}))
app.use(cookieParse());

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to Task Manager API📗");
});

app.use("/auth" , authRoute)
app.use("/task" , taskRoute)


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});