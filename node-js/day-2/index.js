const fs = require("fs");
const crypto = require("crypto");



const start = Date.now();

// Log with setImmediate
setImmediate(() => console.log("Hello from setImmediate"));

// Asynchronous file read
fs.readFile("sample.txt", "utf-8", () => {
  console.log("IO polling");

  // Timers within the I/O callback
  setTimeout(() => {
    console.log("hello from timer 2");
  }, 0);

  setTimeout(() => {
    console.log("hello from timer 3");
  }, 5 * 1000);

  // Another setImmediate
  setImmediate(() => console.log("Hello from setImmediate 2"));

  // CPU-intensive cryptographic tasks processed sequentially
  const tasks = Array.from({ length: 6 }, (_, i) => `password${i + 1}`);
  tasks.forEach((password, index) => {
    crypto.pbkdf2(password, "salt1", 100000, 1024, "sha512", () => {
      console.log(`${Date.now() - start}ms`, `${password} Done`);
    });
  });
});

// Timer with 0ms delay
setTimeout(() => console.log("Hello from timer 1"), 0);

// Log from top-level synchronous code
console.log("Hello from top level code");
