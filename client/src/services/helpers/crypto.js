//Checking the crypto module
import crypto from "crypto";
const algorithm = "aes-256-cbc"; //Using AES encryption

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// Decrypting text
function decrypt(text) {
  let encryptedText = Buffer.from(text.encryptedData, "hex");
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export { decrypt };
