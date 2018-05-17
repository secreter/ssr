
const request = require('../lib/request');

exports.test = async function(ctx){
    let data = await request({
        url: 'http://10.142.66.53:8081/api/table/gettree/',
        method: 'post',
        data: {
            tablePath: [123]
        }
    });

    ctx.body = {
        a: data
    };
};