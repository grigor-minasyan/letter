const message = `
	Enter your secret message here.
`;
const fs = require('fs');
const AES = require('crypto-js/aes');
const key = 'enterDecryptionPasswordHere';
const ciphertext = AES.encrypt(message, key).toString();

fs.writeFileSync(
	__dirname + '/secret.js',
	`const secret = \`${ciphertext}\`;\nexport default secret;\n`
);
