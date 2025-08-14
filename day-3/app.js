const { question, closeQuestion } = require('./utils/question');
const { readData, writeData } = require('./utils/fileHandler');
const { isValidPhone, isValidEmail } = require('./utils/validator');

(async () => {
  const name = await question("What is your name? ");
  console.log(`Your name is: ${name}`);

  let phone;
  do {
    phone = await question("What is your favorite phone number? ");
    if (!isValidPhone(phone)) console.log("Nomor telepon tidak valid, coba lagi.");
  } while (!isValidPhone(phone));

  console.log(`Your favorite number is: ${phone}`);

  let email;
  do {
    email = await question("What is your email? ");
    if (!isValidEmail(email)) console.log("Email tidak valid, coba lagi.");
  } while (!isValidEmail(email));

  console.log(`Your email is: ${email}`);

  const data = readData();
  data.push({ name, phone, email });
  writeData(data);

  closeQuestion();
})();
