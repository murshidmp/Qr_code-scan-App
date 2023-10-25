// middleware/auth.js
const jwt = require('jsonwebtoken');
const secret = '123'; // Replace with your secret key

function authenticateToken(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
