const axios = require('axios');
const logger = require('./log');
const formatUrl = require('./util').formatUrl;

let request = function(config){
    let fullUrl = config.params? formatUrl(config.url,config.params) : config.url,
        method = config.method || 'get';

    return axios(config).then((result) => {
        if (result.status == 200) {
            logger.info(`http::${method}::${fullUrl} is ok`);
            return result.data;
        } else {
            logger.error(`http::${method}::${fullUrl}  error:net occur error:statusCode is not 200 ...,it is ${result.status}`);
        }
    }).catch((e) => {
        logger.error(`http::${method}::${fullUrl} `,e);
    });
};

module.exports = request;