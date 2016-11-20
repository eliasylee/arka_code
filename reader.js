const readline = require('readline');

const Reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = Reader;
