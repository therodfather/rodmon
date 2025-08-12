const winston = require('winston');

const { combine, timestamp, printf, colorize, align, splat, errors, json } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    errors({ stack: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    splat(),
    json()
  ),
  transports: [

    new winston.transports.Console({
      format: combine(
        errors({ stack: true }),
        colorize({ all: true }),
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        align(),
        splat(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.stack || info.message}`)
      )
    }),

    new winston.transports.File({
      filename: 'logs/app.log',
      format: combine(
        errors({ stack: true }),
        timestamp(),
        splat(),
        json()
      )
    })
  ],
});

module.exports = logger; 