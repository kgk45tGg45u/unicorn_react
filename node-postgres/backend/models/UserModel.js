import Sequelize from 'sequelize'
const sequelize = new Sequelize(`postgres://localhost:5432/medium`)

const User = sequelize.define('user', {
  // attributes
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4 // or any other default value strategy
  },
  email: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  zip: {
    type: Sequelize.INTEGER,
    // allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  borthday: {
    type: Sequelize.DATE,
    // allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  role: {
    type: Sequelize.ARRAY(Sequelize.STRING) // Define role column as an array of strings
  },
  working: {
    type: Sequelize.BOOLEAN, // Define "working" column as a boolean
    defaultValue: false // Set default value to false
  },
  loan: {
    type: Sequelize.ARRAY(Sequelize.INTEGER) // Define role column as an array of strings
  },
  saving: {
    type: Sequelize.ARRAY(Sequelize.INTEGER) // Define role column as an array of strings
  },
  disability: {
    type: Sequelize.ARRAY(Sequelize.STRING) // Define role column as an array of strings
  },
})

// User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
sequelize.sync({ alter: true })

const UserModel = {
  sequelize,
  User
};

export default UserModel;
