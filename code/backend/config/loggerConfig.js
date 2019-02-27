const winston = require('winston')

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      timestamp: true,
      filename: (process.env.LOG_DIR || '.') + '/server.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
})

logger.stream = {
  write: message => logger.info(message)
}

module.exports = logger
