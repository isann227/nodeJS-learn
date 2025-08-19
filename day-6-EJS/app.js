const { name } = require("ejs");
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
// Middleware untuk file static (CSS, JS, gambar)
// app.use(express.static(path.join(__dirname, "public")));

// Set folder views dan engine EJS
app.set("view engine", "ejs");

// Route utama
app.get("/", (req, res) => {
  res.render("index", { name: "Home" });
});
app.get("/contact", (req, res) => {
 contact = [
    {
        name: "John Doe",
        phone: "123-456-789",
    },
    {
        name: "Isan",
        phone: "203-394-484",
    },
    {
        name: "test",
        phone: "879-949-393",
    }
 ];
 res.render("contact", { nama: "contact", contact});
});
app.get("/about", (req, res) => {
  res.render("about", { nama: "about" });
});
app.get("/product", (req, res) => {
  res.render("product", { nama: "product" });
})

app.get("/product/:id", (req, res) => {
  const productId = req.params.id;
  const category = req.query.category;
  category
    ? res.send(`Product ID: ${productId}, Category: ${category}`)
    : res.send(`Product ID: ${productId}`);
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});