const fs = require("fs")
const os = require("os")


console.log(os.cpus().length)


// sync Blocking code , async non blockign code

// *write

//? fs.writeFileSync("./text.txt" , "Hey World this is sync writing")

//? fs.writeFile("./test.txt" , "hello world i am async code" , (err)=>{
//     console.log(err)
// })


// *read
    // const res = fs.readFileSync("./text.txt" , "utf8")
    // console.log(res)

    // fs.readFile("./test.txt" , "utf-8" , (error , response)=>{
    //     if(error){
    //         console.log(error)
    //     }
    //     else{
    //         console.log(response)
    //     }
    // })


// *update / append

// fs.appendFileSync("./text.txt" , new Date().toDateString())

fs.appendFile("./log.txt" , `Hello world this is suraj and logged in at ${new Date().toDateString()}\n` , (err , res)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(res)
    }
})


//* 1. cpSync
//* 2. unlinkSync
//* 3. statSync
//* 4. mkdirSync

// 1. recording
// 2. code
// 3. notes
// 4. fig jam