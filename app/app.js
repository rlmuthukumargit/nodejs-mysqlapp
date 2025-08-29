const express = require('express');
const db = require('./db');
const app = express();
const port = 3000;

app.get('/users', async (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

