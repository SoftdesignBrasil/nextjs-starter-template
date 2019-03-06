const Sequelize = require('sequelize')
const SectorModel = require('../models/sector')
const EmployeeModel = require('../models/employee')

const env = process.env.NODE_ENV || 'development'
const dbConfig = require('../config/database.json')[env]

// Database connection setup
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)

// Models setup
const models = {}

models.Sector = SectorModel(sequelize, Sequelize)
models.Employee = EmployeeModel(sequelize, Sequelize)

// Will run models associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models
