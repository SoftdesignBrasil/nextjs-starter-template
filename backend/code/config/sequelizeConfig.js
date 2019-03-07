const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const dbConfig = require('../config/database.json')[env]

// Database connection setup
const sequelizeConnection = new Sequelize(
  dbConfig.database, dbConfig.username, dbConfig.password, dbConfig
)

module.exports =  {
  sequelizeConnection,
  Sequelize
}
