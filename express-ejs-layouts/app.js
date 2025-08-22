const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const morgan = require("morgan");
const pool = require("./db"); 
const fs = require("fs").promises;

const app = express();
const port = 3000;

// Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");

// Helper JSON
const readData = async () => {
  try {
    const data = await fs.readFile("./data/data.json", "utf-8");
    return JSON.parse(data) || [];
  } catch {
    return [];
  }
};
const writeData = async (newData) => {
  try {
    await fs.writeFile("./data/data.json", JSON.stringify(newData, null, 2));
  } catch (err) {
    console.error("Gagal menulis data.json:", err);
  }
};

// ROUTES
app.get("/", (req, res) => res.render("index", { title: "Home" }));
app.get("/about", (req, res) => res.render("about", { title: "About" }));

app.get("/contact", async (req, res) => {
  try {
    const contact = (await pool.query("SELECT * FROM contact ORDER BY id ASC")).rows;

    res.render("contact", {
      title: "Contact",
      contact,
      // default biar gak undefined
      errorAdd: null,
      errorEdit: null,
      old: {},
      showAddModal: false,
      showEditModal: false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal mengambil data");
  }
});


// CREATE kontak
app.post("/contact/add", async (req, res) => {
  try {
    const { name, phone_number, email } = req.body;

    // cek duplikat
    const duplicate = await pool.query(
      "SELECT * FROM contact WHERE email=$1 OR phone_number=$2",
      [email, phone_number]
    );

    if (duplicate.rows.length > 0) {
      let errorAdd = { phone: null, email: null };

      duplicate.rows.forEach(row => {
        if (row.phone_number === phone_number) {
          errorAdd.phone = "Nomor telepon ini sudah ada";
        }
        if (row.email === email) {
          errorAdd.email = "Email ini sudah ada";
        }
      });

      return res.status(409).render("contact", {
        title: "Contact",
        contact: (await pool.query("SELECT * FROM contact ORDER BY id ASC")).rows,
        errorAdd,
        errorEdit: { phone: null, email: null },
        old: req.body,
        showAddModal: true,
        showEditModal: false,
      });
    }

    // insert jika aman
    const result = await pool.query(
      "INSERT INTO contact (name, phone_number, email) VALUES ($1, $2, $3) RETURNING id",
      [name, phone_number, email]
    );

    // update JSON
    const oldData = await readData();
    oldData.push({ id: result.rows[0].id, name, phone_number, email });
    await writeData(oldData);

    res.redirect("/contact");
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal menambahkan kontak");
  }
});


// UPDATE kontak
app.post("/contact/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone_number, email } = req.body;

     // cek duplikat selain dirinya sendiri
    const duplicate = await pool.query(
      "SELECT * FROM contact WHERE (email=$1 OR phone_number=$2) AND id<>$3",
      [email, phone_number, id]
    );

    if (duplicate.rows.length > 0) {
      let errorEdit = { phone: null, email: null };

      duplicate.rows.forEach(row => {
        if (row.phone_number === phone_number) {
          errorEdit.phone = "Nomor telepon ini sudah ada";
        }
        if (row.email === email) {
          errorEdit.email = "Email ini sudah ada";
        }
      });

      return res.status(409).render("contact", {
        title: "Contact",
        contact: (await pool.query("SELECT * FROM contact ORDER BY id ASC")).rows,
        errorAdd: { phone: null, email: null },
        errorEdit,
        old: { id, ...req.body },
        showAddModal: false,
        showEditModal: true,
      });
    }
    
    // update jika aman
    await pool.query(
      "UPDATE contact SET name=$1, phone_number=$2, email=$3 WHERE id=$4",
      [name, phone_number, email, id]
    );

    // update JSON
    let data = await readData();
    data = data.map((c) =>
      c.id == id ? { id: parseInt(id), name, phone_number, email } : c
    );
    await writeData(data);

    res.redirect("/contact");
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal mengupdate kontak");
  }
});



// DELETE kontak
app.post("/contact/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM contact WHERE id=$1", [id]);

    // Hapus dari JSON juga
    let data = await readData();
    data = data.filter((c) => c.id != id);
    await writeData(data);

    res.redirect("/contact");
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal menghapus kontak");
  }
});

// Product
app.get("/product", (req, res) => {
  res.render("product", { title: "Product" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render("404", { title: "404 Not Found" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
