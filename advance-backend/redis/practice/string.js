const client = require("./client");


async function init() {
 const data = await client.get("aimodel:2")
 console.log(data)
}

init()