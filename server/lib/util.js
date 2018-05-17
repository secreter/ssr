
const _ = require('lodash');
const url = require('url');

exports.formatUrl = function(urlStr,param={}){
    let obj = _.merge(url.parse(urlStr,true),{query: param});
    Reflect.deleteProperty(obj,'search');
    return url.format(obj);
};