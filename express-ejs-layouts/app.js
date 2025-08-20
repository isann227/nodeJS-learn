const express = require("express");
const expressLayouts = require ("express-ejs-layouts");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");

const app = express();
const port = 3000;

// Middleware untuk file static (CSS, JS, gambar)
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.use(expressLayouts);

// set default layout
app.set("layout", "layout");

// routes
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// app.get("/contact", (req, res) => {
//     contact = [
//         {
//             name: "John Doe",
//             phone: "123-456-789",
//         },
//         {
//             name: "Isan",
//             phone: "203-394-484",
//         },
//         {
//             name: "test",
//             phone: "879-949-393",
//         }
//     ]
//   res.render("contact", { title: "Contact", contact });
// });

app.get("/contact", (req, res) => {
  fs.readFile("./data/data.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send("Gagal membaca file JSON");

    const contact = JSON.parse(data); // ubah string jadi array
    res.render("contact", { title: "Contact", contact });
  });
});

app.get("/product", (req, res) => {
    res.render("product", { title: "Product" });
})

app.use((req, res) => {
  res.status(404).render("404", { title: "404 Not Found" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
