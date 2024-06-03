import Sequelize from 'sequelize'
const sequelize = new Sequelize(`postgres://localhost:5432/medium`)

const Council = sequelize.define('council', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  address: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    // allowNull: false
  },
  unit_category_id: {
    type: Sequelize.INTEGER,
    // allowNull: false
  },
  responsible_id: {
    type: Sequelize.UUID,
    // allowNull: false
  },
  unit_id: {
    type: Sequelize.INTEGER,
    // allowNull: false
  },
  category_id: {
    type: Sequelize.INTEGER,
    // allowNull: false
  },
  members: {
    type: Sequelize.ARRAY(Sequelize.UUID) // Define role column as an array of strings
  },
  input_output_tag: {
    type: Sequelize.INTEGER
  }
})

// User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
sequelize.sync({ alter: true })

const CouncilModel = {
  sequelize,
  Council
};

export default CouncilModel;
