import Sequelize from 'sequelize'
const sequelize = new Sequelize(`postgres://localhost:5432/medium`)

const ProductAndService = sequelize.define('product_and_service', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    unique: true, // Enforce uniqueness constraint
    allowNull: false // Ensure name is always required
  },
  description: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  service: {
    type: Sequelize.BOOLEAN
  },
  category_id: {
    type: Sequelize.INTEGER,
    // allowNull: false
  },
  measurement_unit: {
    type: Sequelize.INTEGER,
    // allowNull: false
  },
  unit_id: {
    type: Sequelize.INTEGER,
    // allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    // allowNull: false
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  active: {
    type: Sequelize.BOOLEAN
  }
})

// .sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
sequelize.sync({ alter: true })

const ProductsAndServicesModel = {
  sequelize,
  ProductAndService
};

export default ProductsAndServicesModel;
