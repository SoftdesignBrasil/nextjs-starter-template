require('dotenv').config()
require('./config/serverConfig')
const logger = require('./config/loggerConfig')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')

const employeeApiRouter = require('./api/employeeApi')
const sectorApiRouter = require('./api/sectorApi')
const loginApiRouter = require('./api/loginApiMock').router
const authenticateUser = require('./api/loginApiMock').authenticateUser

const port = parseInt(process.env.PORT, 10) || 3000
const server = express()

// Set secure HTTP headers
server.use(helmet())

// Enable CORS request for API
server.use(cors())

// Morgan logger
server.use(morgan('combined', {
  stream: logger.stream
}))

// JSON Body Parser
server.use(express.json())

// Enable response body Gzip compression
server.use(compression())

server.use('/api', loginApiRouter)

// Api de Mock
server.use('/api', authenticateUser, employeeApiRouter, sectorApiRouter)

server.listen(port, err => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})
