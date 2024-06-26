const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const pool = require('../db')

// Authentication middleware
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

// Login route
router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const user = result.rows[0];

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ email: user.email }, `${process.env.JWT_SECRET}`);
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error occurred during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get the number of all users
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users')
    const length = result.rowCount;
    res.status(200).json({ length });
  } catch (error) {
    console.error("Error occurred during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Register user route
router.post('/users', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);
    // Check if any rows were affected by the update
    if (newUser.rowCount > 0) {
      const user = newUser.rows[0]
      const token = jwt.sign({ email: user.email }, `${process.env.JWT_SECRET}`);
      res.status(200).json({ token, user });
    } else {
      res.status(404).json({ message: "Failed creating user." }); // or another appropriate status code
    }
  } catch (error) {
    console.error("Error occurred during user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch user data
router.get('/users/:id', async (req, res) => {
  const { id } = req.params; // Use req.params to get the ID from the URL

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    const user = result.rows[0];
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error occurred during operation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Edit user data
router.put('/users', async (req, res) => {
  const { id, name, email, password, phone, address } = req.body;

  try {
    // Hash the password
    // console.log("Request body: ", req.body)
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword)
    const newData = await pool.query('UPDATE users SET name = $1, email = $2, address = $3, phone= $4, password = $5 WHERE id = $6 RETURNING *', [name, email, address, phone, hashedPassword, id])
    // Check if any rows were affected by the update
    if (newData.rowCount > 0) {
      const user = newData.rows[0]
      const token = jwt.sign({ email: user.email }, `${process.env.JWT_SECRET}`);
      res.status(201).json({ token, user });
    } else {
      res.status(404).json({ message: "User not found or no changes made" }); // or another appropriate status code
    }
  } catch (error) {
    console.error("Error occurred during operation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put('/users/add-personal-details', async (req, res) => {
  const { id, first_name, last_name, address, city, country, zip, phone } = req.body;

  try {
    const newData = await pool.query('UPDATE users SET first_name = $1, last_name = $2, address = $3, phone = $4, city= $5, country = $6, zip = $7 WHERE id = $8 RETURNING *', [first_name, last_name, address, phone, city, country, zip, id])
    if (newData.rowCount > 0) {
      const user = newData.rows[0]
      const token = jwt.sign({ email: user.email }, `${process.env.JWT_SECRET}`);
      res.status(201).json({ token, user });
    } else {
      res.status(404).json({ message: "User not found or no changes made" }); // or another appropriate status code
    }
  } catch (error) {
    console.error("Error occurred during operation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put('/users/add-work', async (req, res) => {
  const { workingYesNo, id } = req.body;
  const workingBoolean = (workingYesNo === "Yes")
  // const idNumber = Number(id)

  try {
    const newData = await pool.query('UPDATE users SET working = $1 WHERE id = $2', [workingBoolean, id])
    // Check if any rows were affected by the update
    if (newData.rowCount > 0) {
      res.status(201).json({ message: "User profile edited successfully" });
    } else {
      res.status(404).json({ message: "User not found or no changes made" }); // or another appropriate status code
    }
  } catch (error) {
    console.error("Error occurred during operation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Protected route example
router.get('/dashboard', authenticateJWT, (req, res) => {
  res.status(200).json({ message: "Welcome to the dashboard!" });
});

module.exports = router
