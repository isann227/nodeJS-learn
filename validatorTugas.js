const validator = require('validator');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("What is your name? ", (nameInput) => {
  console.log("Your name is: " + nameInput);

  rl.question("What is your favorite phone number? ", (phoneInput) => {
    if (validator.isMobilePhone(phoneInput, 'id-ID')) {
    console.log("Your favorite number is: " + phoneInput);
    } else {
        console.log("Invalid phone number");        
    }
    
    rl.question("what is your email? ", (emailInput) => {
    if (validator.isEmail(emailInput)) {
      console.log("Your email is: " + emailInput); 
    } else {
    console.log("invalid email");
    
    }
    rl.close();
  });
  });
});