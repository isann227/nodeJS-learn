// const express = require("express");
// const expressLayouts = require("express-ejs-layouts");
// const path = require("path");
// const fs = require("fs").promises; // gunakan fs.promises
// const morgan = require("morgan"); // ⬅️ tambahin morgan
// const app = express();
// const port = 3000;

// // Middleware
// app.use(morgan("dev")); // ⬅️ aktifkan morgan (format: dev, tiny, combined, dll)
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));
// app.set("view engine", "ejs");
// app.use(expressLayouts);
// app.set("layout", "layout");

// // Helper untuk baca file JSON
// const readData = async () => {
//   try {
//     const data = await fs.readFile("./data/data.json", "utf-8");
//     return JSON.parse(data) || [];
//   } catch (err) {
//     return [];
//   }
// };

// // Helper untuk simpan file JSON
// const writeData = async (contacts) => {
//   await fs.writeFile("./data/data.json", JSON.stringify(contacts, null, 2));
// };

// // ROUTES

// app.get("/", (req, res) => {
//   res.render("index", { title: "Home" });
// });

// app.get("/about", (req, res) => {
//   res.render("about", { title: "About" });
// });

// app.get("/contact", async (req, res) => {
//   try {
//     let contacts = await readData();
//     contacts = contacts.filter(c => c && c.name);
//     res.render("contact", { title: "Contact", contact: contacts });
//   } catch (err) {
//     res.status(500).send("Gagal membaca data kontak");
//   }
// });

// // CREATE kontak
// app.post("/contact/add", async (req, res) => {
//   try {
//     const contacts = await readData();
//     if (req.body.name && req.body.phone && req.body.email) {
//       const newContact = {
//         id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1,
//         name: req.body.name,
//         phone: req.body.phone,
//         email: req.body.email
//       };
//       contacts.push(newContact);
//       await writeData(contacts);
//     }
//     res.redirect("/contact");
//   } catch (err) {
//     res.status(500).send("Gagal menambahkan kontak");
//   }
// });

// // UPDATE kontak
// app.post("/contact/update/:id", async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     const contacts = await readData();
//     const index = contacts.findIndex(c => c && c.id === id);
//     if (index !== -1) {
//       contacts[index] = {
//         id,
//         name: req.body.name,
//         phone: req.body.phone,
//         email: req.body.email
//       };
//       await writeData(contacts);
//     }
//     res.redirect("/contact");
//   } catch (err) {
//     res.status(500).send("Gagal mengupdate kontak");
//   }
// });

// // DELETE kontak
// app.delete("/contact/delete/:id", async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     let contacts = await readData();
//     contacts = contacts.filter(c => c && c.id !== id);
//     await writeData(contacts);
//     res.redirect("/contact");
//   } catch (err) {
//     res.status(500).send("Gagal menghapus kontak");
//   }
// });

// // Product
// app.get("/product", (req, res) => {
//   res.render("product", { title: "Product" });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).render("404", { title: "404 Not Found" });
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
