const express = require('express')
const app = express()
const port = 3001

const user_model = require('./userModel')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  user_model.getUsers()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Here you would typically validate the username and password against your database or any other authentication mechanism
    // For demonstration purposes, let's assume there's a simple user model with a hardcoded username and password
    const user = await user_model.getUserByUsername(username);

    if (!user || user.password !== password) {
      // If the username or password is incorrect, return an error response
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // If the username and password are correct, generate a token (you may use JWT or any other token-based authentication)
    // const token = generateToken(user);

    // Return the user data and token in the response
    return res.status(200).json({ user, password });
  } catch (error) {
    // If an error occurs during the authentication process, return a 500 internal server error response
    console.error("Error occurred during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post('/users', (req, res) => {
  user_model.createUser(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/users/:id', (req, res) => {
  user_model.deleteUser(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  user_model
    .updateUser(id, body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
