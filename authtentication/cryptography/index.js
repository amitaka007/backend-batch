import express from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());

// Generate RSA key pair
const generateKeys = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  return { publicKey, privateKey };
};

const encrypt = (publicKey , message)=>{
    const encrypted = crypto.publicEncrypt(publicKey , Buffer.from(message));
    return encrypted.toString("base64");
}

const decrypt = (privateKey , encryptedMessage)=>{
    const decrypted = crypto.privateDecrypt(privateKey , Buffer.from(encryptedMessage , "base64"))

    return decrypted.toString("utf8")
}
const keys = generateKeys();
const publicKey = keys.publicKey;
const privateKey = keys.privateKey;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/encrypt", (req, res) => {
  const { message } = req.body;
  const encryptedData = encrypt(publicKey , message)

  res.json({encryptedData});
});

app.post("/decrypt", (req, res) => {
  const { encryptedMessage } = req.body;
  const decrypted = decrypt(privateKey , encryptedMessage);
 

  res.json({decrypted});
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
  console.log("Public key:\n", publicKey);
  console.log("Private key:\n", privateKey);
});
