const express = require('express')
const router = express.Router()
const pool = require('../db')

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
