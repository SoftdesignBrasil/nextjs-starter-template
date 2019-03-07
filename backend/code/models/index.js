const { sequelizeConnection, Sequelize } = require('../config/sequelizeConfig')
const SectorModel = require('../models/sector')
const EmployeeModel = require('../models/employee')

// Models setup
const models = {}

models.Sector = SectorModel(sequelizeConnection, Sequelize)
models.Employee = EmployeeModel(sequelizeConnection, Sequelize)

// Inject sequelize connection
models.sequelizeConnection = sequelizeConnection

// Inject Sequelize Object
models.Sequelize = Sequelize

// Will run models associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models
