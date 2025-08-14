import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Biar __dirname bisa dipakai di ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../data/UserData.json');

// Read Data
export const readData = () => {
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

// Write Data
export const writeData = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log("Data berhasil disimpan.");
  } catch (err) {
    console.error("Gagal menyimpan data:", err.message);
  }
};

// Update Data
export const updateData = (name, newData) => {
  const data = readData();
  const index = data.findIndex(user => user.name.toLowerCase() === name.toLowerCase());
  if (index === -1) {
    console.log(`User dengan nama "${name}" tidak ditemukan.`);
    return;
  }
  data[index] = { ...data[index], ...newData };
  writeData(data);
  console.log(`Data user "${name}" berhasil diperbarui.`);
};

// Delete Data
export const deleteData = (name) => {
  let data = readData();
  const newData = data.filter(user => user.name.toLowerCase() !== name.toLowerCase());
  if (newData.length === data.length) {
    console.log(`User dengan nama "${name}" tidak ditemukan.`);
    return;
  }
  writeData(newData);
  console.log(`Data user "${name}" berhasil dihapus.`);
};
