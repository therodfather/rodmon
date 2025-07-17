const winston = require('winston');

// why isnt level here?
const { combine, timestamp, printf, colorize, align } = winston.format;

// why put log level in env?
// because we can change the log level without restarting the server
// we can change the log level in the production environment
// we can change the log level in the development environment
// we can change the log level in the test environment
// we can change the log level in the local environment


const logger = winston.createLogger({
  // log level means the level of the log message that will be logged
  // info is the default level
  // error is the highest level
  // warn is the second highest level
  // debug is the third highest level
  // trace is the fourth highest level
  // fatal is the lowest level
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    // dont know what this does
    align(),
    // info represents the full payload? 
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger; 