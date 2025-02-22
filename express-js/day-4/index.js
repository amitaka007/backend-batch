import cookieParser from "cookie-parser"
import express from "express"
import session from "express-session"

const app = express()

app.use(session(
    {
        secret:"mysecret",
        saveUninitialized:false,
        resave:false,
        cookie:{
            maxAge:1000*60*60*24 // 1 day
        }
    }
))

app.use(cookieParser("codesnippet"))

app.get("/", (req, res) => {
    console.log(req.session);
    console.log(req.session.id);

    res.send("Hello World!")
})

app.get("/login" , (req , res)=>{
    req.session.user = {
        name:"John",
        email:"jhon@example.com",
        age:30
    }
    res.send(` ${req.session.user.name} is logged in`)
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logged out');
  });

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})