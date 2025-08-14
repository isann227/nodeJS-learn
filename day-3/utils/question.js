const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (ask) => {
  return new Promise((resolve) => {
    rl.question(ask, (answer) => resolve(answer));
  });
};

const closeQuestion = () => rl.close();

module.exports = { question, closeQuestion };
