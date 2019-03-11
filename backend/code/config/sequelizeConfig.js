const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const dbConfig = require('./database.js')[env]

// Database connection setup
const sequelizeConnection = new Sequelize(
  dbConfig.database, dbConfig.username, dbConfig.password, dbConfig
)

module.exports =  {
  sequelizeConnection,
  Sequelize
}
