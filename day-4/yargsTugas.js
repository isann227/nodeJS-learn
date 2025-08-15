import { readData, writeData, updateData, deleteData } from '../day-3/utils/fileHandler.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { isValidPhone, isValidEmail } from '../day-3/utils/validatorESM.js';

yargs(hideBin(process.argv))
// Add
  .command({
    command: 'add',
    describe: 'Tambah user baru',
    builder: {
      name: {
        describe: 'Nama user',
        demandOption: true,
        type: 'string'
      },
      phone: {
        describe: 'Nomor HP',
        demandOption: true,
        type: 'string'
      },
      email: {
        describe: 'Email user',
        demandOption: true,
        type: 'string'
      }
    },
    handler(argv) {
      if (!isValidPhone(argv.phone)) {
        console.log('Nomor HP tidak valid.');
        return;
      }
      if (!isValidEmail(argv.email)) {
        console.log('Email tidak valid.');
        return;
      }
      const data = readData();
      data.push({ name: argv.name, phone: argv.phone, email: argv.email });
      writeData(data);
    }
  })
  // List
  .command({
    command: 'list',
    describe: 'Lihat semua user',
    handler() {
      console.table(readData());
    }
  })

  // Update
  .command({
    command: 'update',
    describe: 'Perbarui data user',
    builder: {
      name: { demandOption: true, type: 'string' },
      phone: { type: 'string' },
      email: { type: 'string' }
    },
    handler(argv) {
        if (argv.phone && !isValidPhone(argv.phone)) {
        console.log('Nomor HP tidak valid.');
        return;
      }
      if (argv.email && !isValidEmail(argv.email)) {
        console.log('Email tidak valid.');
        return;
      }
      updateData(argv.name, { phone: argv.phone, email: argv.email });
    }
  })

  // Delete
  .command({
    command: 'delete',
    describe: 'Hapus user',
    builder: {
      name: { demandOption: true, type: 'string' }
    },
    handler(argv) {
      deleteData(argv.name);
    }
  })
  .parse();

