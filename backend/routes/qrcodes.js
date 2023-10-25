const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { authenticateToken } = require('../middleware/auth')

// Create a new QR code entry
router.post("/",authenticateToken, (req, res) => {
  const { content, thumbnail } = req.body;

  pool.query(
    "INSERT INTO qrcodes (content, thumbnail) VALUES (?, ?)",
    [content, thumbnail],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(201).json({ message: "QR code saved successfully" });
      }
    }
  );
});

router.get("/", authenticateToken, (req, res) => {
  pool.query("SELECT * FROM qrcodes", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

router.delete("/:id", authenticateToken,(req, res) => {
  const qrCodeId = req.params.id;
console.log(qrCodeId)
  pool.query("DELETE FROM qrcodes WHERE id = ?", qrCodeId, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "QR code not found" });
      } else {
        res.json({ message: "QR code deleted successfully" });
      }
    }
  });
});

module.exports = router;
