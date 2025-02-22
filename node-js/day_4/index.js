const http = require("http");
const fs = require("fs");
const {Transform , 
  pipeline
} = require("stream")

const server = http.createServer((req, res) => {
  // ?--------1---------

  // !1. Downloading file in a bad way❌
  // const file = fs.readFileSync("sample.txt");

  // res.end(file);

  // *2. Downloading file in a good way (stream)
  // const readableStream = fs.createReadStream("sample.txt")
  // readableStream.pipe(res)
  // res.end()



  // ? -------- 2 ---------
   // !1. Copy file in a bad way❌
  // const file = fs.readFileSync("sample.txt")
  // fs.writeFileSync("output.txt" , file)
  // res.end()

    // *2. Downloading file in a good way (stream)

    // const readStream = fs.createReadStream("sample.txt");
    // const writeStream = fs.createWriteStream("output.txt");

    // readStream.on("data" , (chunk)=>{
    //   console.log("CHUNK: " , chunk)
    //   writeStream.write(chunk);
    // })



    // ? --------- 3 --------- String Processing
    // uppercase()
    // ipsum ----> Suraj
      const readStream = fs.createReadStream("sample.txt");
    const writeStream = fs.createWriteStream("output.txt");

    const tranformStream = new Transform({
      transform(chunk , encoding ,callback){
        const modifiedWord = chunk.toString().toUpperCase().replaceAll(/ipsum/gi , "Suraj")
        callback(null , modifiedWord)
      }
    })


    // !. Bad Approach
    // readStream.on("data" , (chunk)=>{
    //   const modifiedWord = chunk.toString().toUpperCase().replaceAll(/ipsum/gi , "Suraj")
    //   writeStream.write(modifiedWord)
    // })

    readStream.pipe(tranformStream).pipe(writeStream);
    // pipeline(readStream , tranformStream , pipeline , (err)=>{console.log(err)})

    res.end()
});

server.listen(8080, () => {
  console.log("Server is connected at 🔥", 8080);
});





