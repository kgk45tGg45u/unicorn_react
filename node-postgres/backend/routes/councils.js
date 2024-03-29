const express = require('express')
const router = express.Router()

// PostgreSQL configuration
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "my_user",
  host: "localhost",
  database: "unicorn3",
  // password: process.env.REACT_APP_DATABASE_PASSWORD,
  port: 5432,
});

// Fetch council data for the user
router.get('/councils/:id', async (req, res) => {
  const { id } = req.params; // Use req.params to get the ID from the URL

  try {
    const result = await pool.query('SELECT * FROM unit_councils WHERE responsible_id = $1', [id])
    const council = result.rows[0];
    if (council) {
      res.status(200).json({ council });
    } else {
      res.status(404).json({ message: "Council not found" });
    }
  } catch (error) {
    console.error("Error occurred during operation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router
