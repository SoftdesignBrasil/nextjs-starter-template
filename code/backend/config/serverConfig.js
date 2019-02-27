const moment = require('moment-timezone')
const morgan = require('morgan')

// Setup morgan date format
morgan.token('date', () => {
  return moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')
})
