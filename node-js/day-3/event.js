const EventEmitter = require("events")

const emitter  = new EventEmitter()


emitter.on("GREET" , (args)=>{
    console.log(`Hello World ${args.username} and the id is ${args.id}`)
})

emitter.emit("GREET" ,{
    username:"Suraj",
    id:"10asldhasildh9021873nlkasc"
})