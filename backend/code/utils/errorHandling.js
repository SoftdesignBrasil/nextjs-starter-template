const logger = require('../config/loggerConfig')

const handleDbError = (err, res) => {
  logger.error(err)
  res.sendStatus(500)
}

module.exports = {
  handleDbError: handleDbError
}
