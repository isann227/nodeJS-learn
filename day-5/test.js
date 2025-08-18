import express from "express";
import path from "path";

const app = express();
const __dirname = path.resolve();

// route /contact/product/:id
app.get("/contact/product/:id", (req, res) => {
    const productId = req.params.id;       // param /product/:id
    const category = req.query.category;   // query ?category=...

    console.log("ID Produk:", productId);
    console.log("Kategori:", category);

    // kirim file contact.html
    res.sendFile("./contact.html", { root: __dirname });
});

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});
