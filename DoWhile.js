const validator = require('validator');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (ask) => {
  return new Promise((resolve) => {
    rl.question(ask, (answer) => {
      resolve(answer);
    });
  });
};

(async () => {
  const name = await question("What is your name? ");
  console.log("Your name is:", name);

  let phone;
  do {
    phone = await question("What is your favorite phone number? ");
    if (!validator.isMobilePhone(phone, 'id-ID')) {
      console.log("Invalid phone number, try again.");
    }
  } while (!validator.isMobilePhone(phone, 'id-ID'));
  console.log("Your favorite number is:", phone);

  let email;
  do {
    email = await question("What is your email? ");
    if (!validator.isEmail(email)) {
      console.log("Invalid email, try again.");
    }
  } while (!validator.isEmail(email));
  console.log("Your email is:", email);

  const data = { name, phone, email };

  let jsonData = [];
  try {
    const file = fs.readFileSync("userData.json", "utf-8").trim();
    if (file) {
      const parsed = JSON.parse(file);
      if (Array.isArray(parsed)) {
        jsonData = parsed;
      } else {
        console.log("File JSON tidak berisi array, membuat array baru.");
      }
    }
  } catch (err) {
    console.log("File tidak ditemukan atau rusak, membuat file baru.");
  }

  jsonData.push(data);

  fs.writeFileSync("userData.json", JSON.stringify(jsonData, null, 2));
  console.log("Data success");

  rl.close();
})();
