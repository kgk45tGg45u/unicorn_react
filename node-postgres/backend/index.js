require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3001;

// PostgreSQL configuration
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "my_user",
  host: "localhost",
  database: "unicorn",
  // password: process.env.REACT_APP_DATABASE_PASSWORD,
  port: 5432,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Authentication middleware
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
};

// Login route
app.post('/users/login', async (req, res) => {
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
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error occurred during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword]);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error occurred during user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Protected route example
app.get('/dashboard', authenticateJWT, (req, res) => {
  res.status(200).json({ message: "Welcome to the dashboard!" });
});

// Root route
app.get('/', (req, res) => {
  res.send("Hello from Express!");
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
