const express = require("express");
const redis = require("./client");
const axios = require("axios").default;



const app = express();


app.get("/" , async(req , res)=>{
  const cachedData = await redis.get("todoList");

  if(cachedData){
    return res.json(JSON.parse(cachedData))
  }
  const {data} = await axios.get("https://jsonplaceholder.typicode.com/todos")

  await redis.set("todoList" , JSON.stringify(data));
  await redis.expire("todoList" , 30)
  res.json(data)
})


app.listen(5001 , ()=>{
  console.log("Server is up")
})