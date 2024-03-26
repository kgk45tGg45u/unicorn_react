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

// Fetch unit data for the user
router.get('/tickets', async (req, res) => {
  const { id } = req.params; // Use req.params to get the ID from the URL

  try {
    const result = await pool.query('SELECT * FROM tickets')
    // const rows = []
    // rows.push(result.rows)
    // const jsonData = JSON.stringify(result.rows[0]);

    if (result) {
      res.send(result);
      console.log(result)
    } else {
      res.status(404).json({ message: "Unit not found" });
    }
  } catch (error) {
    console.error("Error occurred during operation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router
