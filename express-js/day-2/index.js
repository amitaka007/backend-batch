import express from "express";
import userRouter from "./routers/user.routes.js";

const app = express();

app.use("/api/v1/users" , userRouter);


app.get("/" ,  (req, res) => {
    res.send("Hello World");
});



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


