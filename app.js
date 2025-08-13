const validator = require('validator');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (ask) => {
  return new Promise((resolve) => {
    rl.question(ask, (answer) => resolve(answer));
  });
};

const filePath = path.join(__dirname, 'UserData.json');

(async () => {
  const name = await question("What is your name? ");
  console.log(`Your name is: ${name}`);

  let phone;
  do {
    phone = await question("What is your favorite phone number? ");
    if (!validator.isMobilePhone(phone, 'id-ID')) {
      console.log("Nomor telepon tidak valid, coba lagi.");
    }
  } while (!validator.isMobilePhone(phone, 'id-ID'));
  console.log(`Your favorite number is: ${phone}`);

  let email;
  do {
    email = await question("What is your email? ");
    if (!validator.isEmail(email)) {
      console.log("Email tidak valid, coba lagi.");
    }
  } while (!validator.isEmail(email));
  console.log(`Your email is: ${email}`);

  // Baca data dari file JSON dengan error handling
  let data = [];
  try {
    if (!fs.existsSync(filePath)) {
      console.log("File UserData.json belum ada, akan dibuat baru.");
      fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const rawData = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(rawData);
    if (!Array.isArray(data)) {
      throw new Error("File JSON harus berisi array.");
    }
  } catch (err) {
    console.error("Terjadi kesalahan saat membaca file JSON:", err.message);
    data = [];
  }

  // Tambahkan data baru
  data.push({ name, phone, email });

  // Simpan ke file JSON
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log("Data berhasil disimpan.");
  } catch (err) {
    console.error("Gagal menyimpan data:", err.message);
  }

  rl.close();
})();
