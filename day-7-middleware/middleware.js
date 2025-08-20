const express = require('express')
const app = express()

app.use((req, res, next) => {
  console.log(req.url, Date.now())
  next()
})

// Tambahkan route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/about", (req, res) => {
  res.render("about", { nama: "about" });
});

// Jalankan server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})