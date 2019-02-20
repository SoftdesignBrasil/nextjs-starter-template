const employeeApiRouter = require('./api/employeeApiMock')
const sectorApiRouter = require('./api/sectorApiMock')

const express = require('express')
const next = require('next')
const routes = require('./config/routes')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()

  // JSON Body Parser
  server.use(express.json())

  // Api de Mock
  server.use('/api', employeeApiRouter, sectorApiRouter)

  // Faz a rota das paginas baseado nos arquivos do dir: pages;
  server.use(handle)

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
