const message = `
	Enter your secret message here.
`;
const key = "enterDecryptionPasswordHere";

const ciphertext = require("crypto-js/aes").encrypt(message, key).toString();

require("fs").writeFileSync(
  __dirname + "/secret.js",
  `const secret = \`${ciphertext}\`;\nexport default secret;\n`
);
