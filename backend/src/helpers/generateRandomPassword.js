function random(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function randomChar() {
  return String.fromCharCode(random(32, 122));
}

function generateRandomPassword(length) {
  let output = "";
  for (let i = 1; i <= length; i++) {
    output += randomChar();
  }

  return output;
}

module.exports = generateRandomPassword;
