const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());

// Generate RSA Key Pair
const generateKeys = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048, // Key size in bits
    publicKeyEncoding: {
      type: "pkcs1", // Public key format
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1", // Private key format
      format: "pem",
    },
  });

  return { publicKey, privateKey };
};

// Encrypt using Public Key
const encrypt = (publicKey, message) => {
  const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(message));
  return encrypted.toString("base64");
};

// Decrypt using Private Key
const decrypt = (privateKey, encryptedMessage) => {
  const decrypted = crypto.privateDecrypt(
    privateKey,
    Buffer.from(encryptedMessage, "base64")
  );
  return decrypted.toString("utf8");
};

// Generate Key Pair
const keys = generateKeys();
const publicKey = keys.publicKey;
const privateKey = keys.privateKey;

// API Routes
app.post("/encrypt", (req, res) => {
  const { message } = req.body;
  const encrypted = encrypt(publicKey, message);
  res.json({ encrypted });
});

app.post("/decrypt", (req, res) => {
  const { encryptedMessage } = req.body;
  const decrypted = decrypt(privateKey, encryptedMessage);
  res.json({ decrypted });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Public Key:\n", publicKey);
  console.log("Private Key:\n", privateKey);
});