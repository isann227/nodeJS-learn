const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware untuk file static (CSS, JS, gambar)
app.use(express.static(path.join(__dirname, "public")));

// Routing ke file HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contact.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});
app.get("/product", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "product.html"));
});

app.get("/product/:id", (req, res) => {
  const productId = req.params.id;
  const category = req.query.category;
  category
    ? res.send(`Product ID: ${productId}, Category: ${category}`)
    : res.send(`Product ID: ${productId}`);
});
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
