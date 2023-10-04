const fs = require("fs");
const crypto = require("crypto");

function calculateSHA3_256(filePath) {
  const input = fs.readFileSync(filePath);
  const hash = crypto.createHash("sha3-256");
  hash.update(input);
  return hash.digest("hex");
}

const directory = "./task2";

const hashes = [];

fs.readdirSync(directory).forEach((filename) => {
  const filePath = `${directory}/${filename}`;
  if (fs.statSync(filePath).isFile()) {
    const hashValue = calculateSHA3_256(filePath);
    hashes.push(hashValue);
  }
});

hashes.sort();

const concatenatedHashes = hashes.join("");

const email = "your.email@example.com";

const resultString = concatenatedHashes + email;

const finalHash = crypto
  .createHash("sha3-256")
  .update(resultString)
  .digest("hex");

console.log(finalHash);
