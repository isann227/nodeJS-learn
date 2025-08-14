const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("What is your name? ", (nameInput) => {
  console.log("Your name is: " + nameInput);

  rl.question("What is your favorite number? ", (numberInput) => {
    console.log("Your favorite number is: " + numberInput);

    rl.question("what is your email? ", (emailInput) => {
      console.log("Your email is: " + emailInput); 

    rl.close();
  });
  });
});