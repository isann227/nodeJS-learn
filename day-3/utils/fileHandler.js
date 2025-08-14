const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/UserData.json');

const readData = () => {
  try {
    if (!fs.existsSync(filePath)) {
      console.log("File UserData.json belum ada, membuat baru...");
      fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const rawData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(rawData);
    if (!Array.isArray(data)) throw new Error("File JSON harus berisi array.");
    return data;
  } catch (err) {
    console.error("Error membaca file JSON:", err.message);
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log("Data berhasil disimpan.");
  } catch (err) {
    console.error("Gagal menyimpan data:", err.message);
  }
};

module.exports = { readData, writeData };
