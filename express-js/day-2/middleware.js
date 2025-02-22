import express from "express";


const app = express();

function SayHiMiddleware(req , res , next ){
console.log("Hi I am middleware👋");
next();
}

// app.use(SayHiMiddleware);


app.get("/",SayHiMiddleware ,  (req, res) => {
    res.send("Hello World");
});

app.get("/users", (req, res) => {
    res.send("Users Page");
});



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


// 1. global middleware✅
// 2. specific routes middleware✅
// 3. inbuilt middleware
