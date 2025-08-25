import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(",") || "*"
}));

// Health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

// GET all contacts
app.get("/api/contacts", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM contact ORDER BY id ASC");
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: "Gagal mengambil data" });
  }
});

// CREATE contact (409 on duplicate)
app.post("/api/contacts", async (req, res) => {
  try {
    const { name, phone_number, email } = req.body;

    // Cek duplikat manual biar bisa kirim pesan spesifik
    const dup = await pool.query(
      "SELECT email, phone_number FROM contact WHERE email=$1 OR phone_number=$2",
      [email, phone_number]
    );
    const errors = {};
    dup.rows.forEach(r => {
      if (r.email === email) errors.email = "Email ini sudah ada";
      if (r.phone_number === phone_number) errors.phone_number = "Nomor telepon ini sudah ada";
    });
    if (Object.keys(errors).length) {
      return res.status(409).json({ message: "Duplikat", errors });
    }

    const { rows } = await pool.query(
      "INSERT INTO contact (name, phone_number, email) VALUES ($1,$2,$3) RETURNING *",
      [name, phone_number, email]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    res.status(500).json({ message: "Gagal menambahkan kontak" });
  }
});

// UPDATE contact (409 on duplicate)
app.put("/api/contacts/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, phone_number, email } = req.body;

    const dup = await pool.query(
      "SELECT email, phone_number FROM contact WHERE (email=$1 OR phone_number=$2) AND id<>$3",
      [email, phone_number, id]
    );
    const errors = {};
    dup.rows.forEach(r => {
      if (r.email === email) errors.email = "Email ini sudah ada";
      if (r.phone_number === phone_number) errors.phone_number = "Nomor telepon ini sudah ada";
    });
    if (Object.keys(errors).length) {
      return res.status(409).json({ message: "Duplikat", errors });
    }

    const { rowCount, rows } = await pool.query(
      "UPDATE contact SET name=$1, phone_number=$2, email=$3 WHERE id=$4 RETURNING *",
      [name, phone_number, email, id]
    );
    if (!rowCount) return res.status(404).json({ message: "Kontak tidak ditemukan" });
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ message: "Gagal mengupdate kontak" });
  }
});

// DELETE contact
app.delete("/api/contacts/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { rowCount } = await pool.query("DELETE FROM contact WHERE id=$1", [id]);
    if (!rowCount) return res.status(404).json({ message: "Kontak tidak ditemukan" });
    res.status(204).end();
  } catch (e) {
    res.status(500).json({ message: "Gagal menghapus kontak" });
  }
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
