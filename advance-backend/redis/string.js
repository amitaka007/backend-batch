const client = require("./client");


async function init() {
   const result = await client.get("msg:1") ;
//    await client.expire("msg:6" , 10)
   await client.set("msg:6" , "hey from nodejs")
   const msg = await client.get("msg:6")
   console.log("Result --->" , result)
   console.log("Message --->" , msg)
}

init()