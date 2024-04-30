import Sequelize from 'sequelize'
const sequelize = new Sequelize(`postgres://localhost:5432/medium`)

const Unit = sequelize.define('unit', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  unit_category_id: {
    type: Sequelize.INTEGER,
    // allowNull: false
  },
  union_id: {
    type: Sequelize.INTEGER,
    // allowNull: false
  },
  has_product: {
    type: Sequelize.BOOLEAN,
    // allowNull: false
  },
  has_service: {
    type: Sequelize.BOOLEAN,
    // allowNull: false
  },
  users: {
    type: Sequelize.ARRAY(Sequelize.UUID) // Define role column as an array of strings
  },
  products: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  }
})

// User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
sequelize.sync({ alter: true })

const UnitModel = {
  sequelize,
  Unit
};

export default UnitModel;
