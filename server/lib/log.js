const log4js = require('log4js');
const serverConfig = require('../config');

let loggerConfig = {
    appenders: [
        {
            type: 'console',
            category: 'console',
            layout: {
                type: 'pattern',
                pattern: '[%[%p%]] [%[%d{yyyy-MM-dd hh:mm:ss}%]] %m'
            }
        }
    ],
    levels: {
        console: serverConfig.isProduction ? 'INFO' : 'ALL'
    }
};

log4js.configure(loggerConfig);

module.exports = log4js.getLogger('console');
