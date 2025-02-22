

## **Express.js Program: Encryption and Decryption with `crypto`**

### **Setup**

1. **No additional libraries are required**; the `crypto` module is built into Node.js.
2. Here’s the program:

```javascript
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
```

---

### **How It Works**

1. **Key Generation**:
   - The `crypto.generateKeyPairSync()` method generates a pair of RSA keys (public and private).
   - The `modulusLength` determines the security level (2048 bits is standard).

2. **Encryption**:
   - `crypto.publicEncrypt()` encrypts the plain text using the public key.
   - The result is a `Buffer` that is converted to a Base64-encoded string for easier transmission.

3. **Decryption**:
   - `crypto.privateDecrypt()` decrypts the Base64-encoded ciphertext using the private key.
   - The decrypted text is returned as a UTF-8 string.

---

### **How to Use**

1. **Start the Server**:
   ```bash
   node app.js
   ```

2. **API Endpoints**:
   - **POST `/encrypt`**
     - **Body**:
       ```json
       {
         "message": "Hello, World!"
       }
       ```
     - **Response**:
       ```json
       {
         "encrypted": "Base64EncodedCiphertext"
       }
       ```

   - **POST `/decrypt`**
     - **Body**:
       ```json
       {
         "encryptedMessage": "Base64EncodedCiphertext"
       }
       ```
     - **Response**:
       ```json
       {
         "decrypted": "Hello, World!"
       }
       ```

---

### **Why Use the `crypto` Module?**
- It's part of Node.js core and requires no external dependencies.
- Highly optimized and secure.
- Supports industry-standard encryption algorithms like RSA, AES, and more.
