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

// Fetch transaction data for the user
router.post('/transactions', async (req, res) => {
  try {
    const { wallet_id, amount } = req.body;
    const query = 'INSERT INTO transaction (wallet_id, amount) VALUES ($1, $2)';
    await pool.query(query, [wallet_id, amount]);
    res.status(201).send('Transaction added successfully');
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).send('Error adding transaction');
  }
})

module.exports = router
