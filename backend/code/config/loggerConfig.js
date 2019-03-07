const winston = require('winston')
const { format } = winston

const prodFormat = () => {
  const replaceError = ({ label, level, message, stack }) => ({ label, level, message, stack })
  const replacer = (key, value) => value instanceof Error ? replaceError(value) : value
  return format.json({ replacer })
}

const devFormat = () => {
  const formatMessage = info => `${info.level} ${info.message}`
  const formatError = info => `${info.level} ${info.message}\n\n${info.stack}\n`
  const formatter = info => info instanceof Error ? formatError(info) : formatMessage(info)
  return format.combine(format.colorize(), format.printf(formatter))
}

const isProd = process.env.NODE_ENV === 'production'

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
  exitOnError: false,
  format: isProd ? prodFormat() : devFormat()
})

logger.stream = {
  write: message => logger.info(message)
}

module.exports = logger
