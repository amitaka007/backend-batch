// process.env.UV_THREADPOOL_SIZE = require('os').cpus().length; // Set this first!

// const crypto = require("crypto"); // Import after setting UV_THREADPOOL_SIZE
// let start = Date.now();

// crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512", () => {
//   console.log(`${Date.now() - start}ms Done`);
// });

// crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512", () => {
//   console.log(`${Date.now() - start}ms Done`);
// });

// crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512", () => {
//   console.log(`${Date.now() - start}ms Done`);
// });

// crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512", () => {
//   console.log(`${Date.now() - start}ms Done`);
// });

// crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512", () => {
//   console.log(`${Date.now() - start}ms Done`);
// });


console.log('UV_THREADPOOL_SIZE:', process.env.UV_THREADPOOL_SIZE);