import yargs from "yargs";
import { hideBin} from "yargs/helpers"

const cli=yargs(hideBin(process.argv)).command({
    command: "add",
    describe: "Menambahkan data baru",
    builder: {
        name: {
            describe: "Nama",
            demandOption: "true",
            type: "String",
        },
        phone: {
            describe: "Nomor HP",
            demandOption: "true",
            type: "String",
        },
        email: {
             describe: "Email",
            demandOption: "true",
            type: "String",
        }
    }
})

cli.parse();