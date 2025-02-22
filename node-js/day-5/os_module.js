const os = require('os');

// 1. get os platform & user info

// console.log('OS Platform:', os.platform());
// console.log("User Info:", os.userInfo());



// 2. Get the Os CPU architecture

// console.log('CPU Architecture:', os.arch());


// 3. Get the Os CPU core info
// console.log('CPU Core Info:', os.cpus());


// 4. Get the Free memory of the system
console.log('Free Memory:', os.freemem() , "bytes");

// 5. Get the total memory of the system
console.log('Total Memory:', os.totalmem() , "bytes");

// 6. Get the home directory of the user
console.log('Home Directory:', os.homedir());

// 7. Get the host name of the system
console.log('Host Name:', os.hostname());

// 8. Get the network interfaces of the system
console.log('Network Interfaces:', os.networkInterfaces());

// 9. Get the os release info
console.log('OS Release:', os.release());

// 10. Get the os temp directory
console.log('OS Temp Directory:', os.tmpdir());

// 11. Get the os uptime
console.log('OS Uptime:', os.uptime(), "seconds");

// 12. Get the os version
console.log('OS Version:', os.version());

// 13. Get the os load average

console.log('OS Load Average:', os.loadavg());

// 14. Get the os endianness
console.log('OS Endianness:', os.endianness());

// 15. Get the os constants
console.log('OS Constants:', os.constants);

// 16. os type
console.log('OS Type:', os.type());