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

router.post('/unions/add', async (req, res) => {
  const { newUnionTitle, councilId, responsible_Id } = req.body;

  try {
    // Create the unit
    const newData = await pool.query('INSERT INTO unions (title, responsible_id, council_id) VALUES ($1, $2, $3) RETURNING *', [newUnionTitle, responsible_Id, councilId]);
    if (newData.rowCount > 0) {
      try {
        const newUnion = await pool.query('UPDATE unions SET members_id = array_append(members_id, $1) WHERE title = $2 RETURNING *', [responsible_Id, newUnionTitle])
        if (newUnion.rowCount > 0) {
          const union = newUnion.rows[0]
          res.status(201).json({ message: "Union created and user added to it as responsible.", union: union });
        } else {
          res.status(404).json({ message: "Error creating union or adding user to it." });
        }
      } catch (error) {
        console.error("Error occured while adding user to the union in creating the production unit.")
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } catch (error) {
    console.error("Error occured while creating the union or adding user to it.")
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router
