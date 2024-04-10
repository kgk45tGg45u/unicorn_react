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

// Add a new product
router.post('/products/add', async (req, res) => {
  const { product1title, serviceName, currentProductionUnit, newProductionUnitName } = req.body;

  try {
    // Check if product/service exists
    const existing = await pool.query('SELECT * FROM products_and_services WHERE name = $1 OR name = $2', [product1title, serviceName]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "A product/service with this name already exists. Failed to create a new item." });
    }

    // Create the product/service and add it to the corresponding unit (according to its title)
    if (product1title) {
      const newProduct = await pool.query('INSERT INTO products_and_services (name) VALUES ($1) RETURNING *', [product1title]);
      if (newProduct.rowCount > 0) {
        try {
          const newData = await pool.query('UPDATE units SET products = array_append(products), $1) WHERE title = $2 OR title = $3 RETURNING *', [newProduct.result.id, currentProductionUnit, newProductionUnitName])
          if (newData.rowCount > 0) {
            res.status(201).json({ message: "Product created and added to the unit." });
          } else {
            res.status(404).json({ message: "Error adding the product or updating the unit." });
          }
        } catch (error) {
          console.error("Error occured while adding product to the production unit.")
          res.status(500).json({ message: "Internal server error" });
        }
      }
    }

    if (serviceName) {
      const newService = await pool.query('INSERT INTO products_and_services (name) VALUES ($1) RETURNING *', [serviceName]);
      if (newService.rowCount > 0) {
        try {
          const newData = await pool.query('UPDATE units SET products = array_append(products, $1) WHERE title = $2 OR title = $3 RETURNING *', [newService.result.id, currentProductionUnit, newProductionUnitName])
          if (newData.rowCount > 0) {
            res.status(201).json({ message: "Service created and added to the unit." });
          } else {
            res.status(404).json({ message: "Error adding the service or updating the unit." });
          }
        } catch (error) {
          console.error("Error occured while adding service to the production unit.")
          res.status(500).json({ message: "Internal server error" });
        }
      }
    }
  } catch (error) {
    console.error("Error occured while adding product/service or while editing the corresponding unit.")
    res.status(500).json({ message: "Internal server error" });
  }
});
