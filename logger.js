const winston = require('winston');
const { combine, timestamp, printf, colorize, align, splat, errors } = winston.format;
const logger = winston.createLogger({

  level: process.env.LOG_LEVEL || 'info',
  format: combine(

    errors({ stack: true }),
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),

    align(),

    splat(),

    printf((info) => `[${info.timestamp}] ${info.level}: ${info.stack || info.message}`)
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger; 