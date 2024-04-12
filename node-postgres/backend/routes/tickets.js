const express = require('express')
const router = express.Router()
const pool = require('../db')

// Fetch ticket data for the user
router.get('/tickets/:id', async (req, res) => {
  const { id } = req.params; // Use req.params to get the ID from the URL

  try {
    const result = await pool.query('SELECT * FROM tickets WHERE sender_id = $1', [id])
    const tickets = result.rows
    if (result) {
      res.send(tickets);
      console.log(tickets)
    } else {
      res.status(404).json({ message: "No tickets not found" });
    }
  } catch (error) {
    console.error("Error occurred during operation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router
