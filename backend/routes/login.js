// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Replace this with a database query to check the credentials
  pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error', result: false });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' , result: false});
    }

    const user = results[0];

    const token = jwt.sign({ username: user.username }, '123', {
      expiresIn: '1h',
    });
    console.log(token);
    // res.cookie('jwt', token, { httpOnly: true });
    res.status(200).json({ result: true, token });
  });
});

module.exports = router;
