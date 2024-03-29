require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// Do more research on CORS, see how to implement it and see whether CSURF makes more sense.
const cors = require('cors');

const app = express();
const port = 3001;
const userRoutes = require('./routes/users')
const unitRoutes = require('./routes/units')
const ticketRoutes = require('./routes/tickets')
const unionRoutes = require('./routes/unions')
const councilRoutes = require('./routes/councils')

// PostgreSQL configuration
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "my_user",
  host: "localhost",
  database: "unicorn3",
  // password: process.env.REACT_APP_DATABASE_PASSWORD,
  port: 5432,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(userRoutes)
app.use(unitRoutes)
app.use(ticketRoutes)
app.use(unionRoutes)
app.use(councilRoutes)

// Root route
app.get('/', (req, res) => {
  res.send("Hello from Express!");
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
