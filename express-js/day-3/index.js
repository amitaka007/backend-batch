import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser("secert"))

app.get('/', (req, res) => {
  // !. How to set it
  res.cookie("userId","99" , {
    maxAge:1000 * 60 * 60 * 24,
    signed:true
  })
    res.send('Hello World');
});

app.get("/product" , (req , res)=>{
console.log("Cookies" , req.cookies);
console.log("Signed Cookies" , req.signedCookies)

// t

if(req.cookies.name && req.cookies.name ==="express"){

  res.status(200).send({
    id:1,
    name:"Item-01",
    price:"$100"
  })
}

res.status(403).send("you are not authorized to view this page")

})



app.listen(8080 , ()=>{
    console.log('Server is running on port http://localhost:8080');
})

  // console.log(req.cookies) undefined
  // console.log(req.headers.cookie)
  // console.log('Cookies: ', req.cookies)
  //  && and ??