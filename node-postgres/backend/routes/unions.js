const express = require('express')
const router = express.Router()
const pool = require('../db')

// Fetch union data for the user
router.get('/unions/:id', async (req, res) => {
  const { id } = req.params; // Use req.params to get the ID from the URL

  try {
    const result = await pool.query('SELECT * FROM unions WHERE responsible_id = $1', [id])
    const union = result.rows[0];
    if (union) {
      res.status(200).json({ union });
    } else {
      res.status(404).json({ message: "Union not found" });
    }
  } catch (error) {
    console.error("Error occurred during operation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router
