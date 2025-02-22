const {AddFunc , SubFunc} = require("./math")

console.log("Hello world i am node-js")

// console.log(window) ---> works in browsers only
// console.log(alert)  ---> works in browsers only

console.log("The value of my module is" , AddFunc(12 , 34) + " and " + SubFunc(5,2))
