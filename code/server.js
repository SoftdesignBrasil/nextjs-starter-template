const employeeApiRouter = require('./api/employeeApiMock')
const sectorApiRouter = require('./api/sectorApiMock')
const loginApiRouter = require('./api/loginApiMock').router
const authenticateUser = require('./api/loginApiMock').authenticateUser

const express = require('express')
const next = require('next')
const routes = require('./config/routes')
const cors = require('cors')

require('dotenv').config()

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()

  // Enable CORS request for API
  server.use(cors())

  // JSON Body Parser
  server.use(express.json())

  server.use('/api', loginApiRouter)

  // Api de Mock
  server.use('/api', authenticateUser, employeeApiRouter, sectorApiRouter)

  // Faz a rota das paginas baseado nos arquivos do dir: pages;
  server.use(handle)

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
