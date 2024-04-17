const express = require('express')
const router = express.Router()
const pool = require('../db')

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

// Add a new council
router.post('/councils/add', async (req, res) => {
  const { id, councilName, newUnitId } = req.body;

  try {
    // Check if council exists
    const existingCouncil = await pool.query('SELECT * FROM units WHERE title = $1', [councilName]);
    if (existingCouncil.rows.length > 0) {
      return res.status(400).json({ message: "A council with this name already exists. Failed to create a new working council." });
    }

    // Create the council
    const newCouncil = await pool.query('INSERT INTO unit_councils (name) VALUES ($1) RETURNING *', [councilName]);
    if (newCouncil.rowCount > 0) {
      try {
        const newData = await pool.query('UPDATE unit_councils SET responsible_id = $1, unit_id = $2 WHERE name = $3 RETURNING *', [id, newUnitId, councilName])
        if (newData.rowCount > 0) {
          res.status(200).json({ message: "Council profile created and user is its responsible.", council_id: newData.rows[0].id });
        } else {
          res.status(404).json({ message: "Error adding user to council" });
        }
      } catch (error) {
        console.error("Error occured while adding user to the working council in creating the council.")
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } catch (error) {
  console.error("Error occured while creating the council or adding user to it.")
  res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router
