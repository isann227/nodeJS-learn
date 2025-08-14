const fs = require('fs');

const data = fs.readFileSync('Text.txt', 'utf-8');
console.log(data);
