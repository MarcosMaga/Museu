const winston = require("winston");

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'logs/logsfile.log'})
    ]
});

module.exports = logger;