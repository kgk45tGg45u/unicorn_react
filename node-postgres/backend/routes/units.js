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
router.get('/units/:id', async (req, res) => {
  const { id } = req.params; // Use req.params to get the ID from the URL

  try {
    const result = await pool.query('SELECT * FROM units WHERE array_position(users, $1) IS NOT NULL', [id])
    const unit = result.rows[0];
    if (unit) {
      res.status(200).json({ unit });
    } else {
      res.status(404).json({ message: "Unit not found" });
    }
  } catch (error) {
    console.error("Error occurred during operation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a new unit
router.post('/units/add', async (req, res) => {
  const { id, newProductionUnitName } = req.body;

  try {
    // Check if unit
    const existingUnit = await pool.query('SELECT * FROM units WHERE title = $1', [newProductionUnitName]);
    if (existingUnit.rows.length > 0) {
      return res.status(400).json({ message: "A Unit with this name already exists. Failed to create a new working unit." });
    }

    // Create the unit
    const newUnit = await pool.query('INSERT INTO units (title) VALUES ($1) RETURNING *', [newProductionUnitName]);
    if (newUnit.rowCount > 0) {
      try {
        const newData = await pool.query('UPDATE units SET users = array_append(users, $1) WHERE title = $2 RETURNING *', [id, newProductionUnitName])
        if (newData.rowCount > 0) {
          res.status(201).json({ message: "Unit profile created and user added to it." });
        } else {
          res.status(404).json({ message: "Error adding user to unit" });
        }
      } catch (error) {
        console.error("Error occured while adding user to the production unit in creating the production unit.")
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } catch (error) {
  console.error("Error occured while adding user to the production unit in creating the production unit.")
  res.status(500).json({ message: "Internal server error" });
  }
});

// Edit unit data
router.put('/units', async (req, res) => {
  const { id, currentProductionUnit } = req.body;

  try {
    const newData = await pool.query('UPDATE units SET users = array_append(users, $1) WHERE title = $2 RETURNING *', [id, currentProductionUnit])
    if (newData.rowCount > 0) {
      res.status(201).json({ message: "Unit profile edited successfully" });
    } else {
      res.status(404).json({ message: "Unit not found or no changes made" }); // or another appropriate status code
    }
  } catch (error) {
    console.error("Error occurred during operation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add producing and service booleans to unit
router.put('/units-service-product', async (req, res) => {
  const { id, producingYesNo, hasService } = req.body;
  const producingBoolean = (producingYesNo === "Yes")
  const serviceBoolean = (hasService === "Yes")

  try {
    const newData = await pool.query('UPDATE units SET has_product = $1, has_service = $2 WHERE array_position(users, $3) IS NOT NULL RETURNING *', [producingBoolean, serviceBoolean, id])
    if (newData.rowCount > 0) {
      res.status(201).json({ message: "Unit data edited successfully!" });
    } else {
      res.status(404).json({ message: "Unit not found or no changes made" }); // or another appropriate status code
    }
  } catch (error) {
    console.error("Error occurred during operation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all units names
router.get('/all-units', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM units')
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting units names");
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router
