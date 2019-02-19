const employeeApiRouter = require('./api/employeeApiMock')
const sectorApiRouter = require('./api/sectorApiMock')

const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // JSON Body Parser
  server.use(express.json())

  // Api de Mock
  server.use('/api', employeeApiRouter, sectorApiRouter)

  server.get('/employee', (req, res) => {
    app.render(req, res, '/employee', {id: req.param.id})
  })
  // Faz a rota default do NEXT JS baseado nos arquivos do dir: pages;
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
