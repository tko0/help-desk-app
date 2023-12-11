const result = require('dotenv').config();

if (result.error) {
  throw result.error;
}

console.log('Loaded dotenv:', result.parsed);