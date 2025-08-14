import fs from "fs";
import yargs from "yargs"
import { hideBin} from "yargs/helpers"

const filePath = './data.json'

// Fungsi ambil data dari file
const loadTodos = () => {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

// Fungsi simpan data ke file
const saveTodos = (todos) => {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};

// Command tambah tugas
const cli=yargs(hideBin(process.argv)).command({
  command: 'add',
  describe: 'Tambah tugas baru',
  builder: {
    title: {
      describe: 'Judul tugas',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) { 
    const todos = loadTodos();
    todos.push(argv.title);
    saveTodos(todos);
    console.log(`✅ Tugas ditambahkan: ${argv.title}`);
  }
});

// Command list semua tugas
yargs.command({
  command: 'list',
  describe: 'Lihat semua tugas',
  handler() {
    const todos = loadTodos();
    if (todos.length === 0) {
      console.log("📭 Tidak ada tugas");
    } else {
      console.log("📋 Daftar Tugas:");
      todos.forEach((t, i) => console.log(`${i + 1}. ${t}`));
    }
  }
});

// Command hapus tugas
yargs.command({
  command: 'delete',
  describe: 'Hapus tugas',
  builder: {
    index: {
      describe: 'Nomor tugas',
      demandOption: true,
      type: 'number'
    }
  },
  handler(argv) {
    const todos = loadTodos();
    if (argv.index > 0 && argv.index <= todos.length) {
      const removed = todos.splice(argv.index - 1, 1);
      saveTodos(todos);
      console.log(`🗑️ Tugas dihapus: ${removed}`);
    } else {
      console.log("⚠️ Nomor tugas tidak valid");
    }
  }
});

cli.parse();
