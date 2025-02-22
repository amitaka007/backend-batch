// !OBJECTIVE
// * CREATE A PROGRAM USING NODE-JS EVENTEMITTER THAT:

// ? LISTENS FOR MULTIPLE TYPES OF USER EVENTS (E.G LOGIN , LOGOUT , PURCHASE , AND PROFILE UPDATE)✅
// ? tRACKS HOW MANY TIMES EACH EVENT IS EMITTED.
// ? LOGS A SUMMARY OF ALL EVENTS OCCURRENCES WHEN A SPECIAL SUMMARRY EVENT IS TRIGGERED


// !REQUIREMENT

// ? create at least four custom events
// ? emit these events multiple times with different argumensts ( e.g username , item purchased)
// ? tracks and store the count of each event type.
// ? define a summary events that logs a detailed report of how many times each event was triggered

const EventEmitter = require("events")
const fs = require("fs")

const userEmitter  = new EventEmitter()

const eventCounts = {
    login:0,
    logout:0,
    purchase:0,
    profileupdate:0
}

const logFile = "eventlog.json"

if(fs.existsSync(logFile)){
    const data = fs.readFileSync(logFile , "utf-8")
    Object.assign(eventCounts , JSON.parse(data))
}


function saveCounts(){
    fs.writeFileSync(logFile , JSON.stringify(eventCounts , null , 2))
}

// Events creating 
userEmitter.on("LOGIN" , (username)=>{
    eventCounts.login++;
    console.log(`${username} Logged In Successfully✅`)
    saveCounts()
})


userEmitter.on("LOGOUT" , (username)=>{
    eventCounts.logout++
    console.log(`${username} logout In Successfully❌`)
    saveCounts()
})

userEmitter.on("PURCHASE" , (username , item)=>{
    eventCounts.purchase++
    console.log(`${username} purchased ${item}`)
    saveCounts()
})

userEmitter.on("PROFILE_UPDATE" , (username , field)=>{
    eventCounts.profileupdate++
    console.log(`${username} updated their profile field: ${field}`)
    saveCounts()
})


userEmitter.on("SUMMARY" , ()=>{
    console.log("\n Event Summary:")
    console.log(`Logins: ${eventCounts.login}`)
    console.log(`Logouts: ${eventCounts.logout}`)
    console.log(`Purchases: ${eventCounts.purchase}`)
    console.log(`Proifle Update: ${eventCounts.profileupdate}`)
})


// emit events with different arguments


userEmitter.emit("LOGIN" , "Suraj")
userEmitter.emit("LOGOUT" ,"Suraj" )
userEmitter.emit("PURCHASE" , "Suraj" , "Iphon16")
userEmitter.emit("PROFILE_UPDATE" , "Suraj" , "Email Address")

userEmitter.emit("SUMMARY")