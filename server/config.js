
const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';

const QO_HOST = process.env.QO_HOST = process.env.QO_HOST || 'TEST';
const searcherHost = process.env.SEARCHER_HOST = process.env.SEARCHER_HOST || 'TEST';
const taskdb = process.env.TASK_DB = process.env.TASK_DB || 'TEST';
const authorizationHost = process.env.AUTHORIZATION_HOST = process.env.AUTHORIZATION_HOST || 'TEST';
const vrCluster = process.env.VR_CLUSTER = process.env.VR_CLUSTER || '2';
const CLUSTER_NAME = process.env.CLUSTER_NAME = process.env.CLUSTER_NAME || '';


let schedule,mongodb,searcher,QOer,authorization;

if (isProduction) {
    schedule = {
        // getQoList: 'http://' + swarmHost + '/v1.24/containers/json?filters=' + encodeURIComponent(swarmFilter.replace('{imageName}', 'qo')),
        // getSearcherList: 'http://' + swarmHost + '/v1.24/containers/json?filters=' + encodeURIComponent(swarmFilter.replace('{imageName}', 'searcher')),
    };
    searcher = 'http://' + searcherHost;
    QOer = 'http://' + QO_HOST;

    mongodb = {
        taskdb: taskdb
    };

    authorization = {
        server: 'http://' + authorizationHost,
        clientId: 'eab26ccdcb53c2f0cd20fbc257e9aa89',
        clientSecret: 'ce2dbce0ee798e3a7fc833bd8f7ecf79',
    };
} else {
    schedule = {
        getQoList: 'http://10.134.99.129:4000' + '/v1.24/containers/json?filters=' + encodeURIComponent('{"label":["dev=qo:dev"]}'),
        getSearcherList: 'http://10.134.99.129:4000' + '/v1.24/containers/json?filters=' + encodeURIComponent('{"label":["dev=searcher:dev"]}')
    };


    // searcher = '10.134.100.154:8081';
    searcher = 'http://10.142.66.53:8878'; //测试环境的

    QOer = 'http://10.142.66.53:8088';
    // QOer = 'http://10.135.24.205:8866'
    // QOer='http://10.135.24.205:8871';   //孟孟开发机

    mongodb = {
        // taskdb:'mongodb://10.134.112.90:27018/vrTaskdb',
        // taskdb: 'mongodb://10.134.112.90:27018/taskdb',
        //提交前恢复
        // taskdb: 'mongodb://10.142.51.66:27018/taskDevdb',
        taskdb: 'mongodb://10.134.112.90:27018/taskDevdb', //53测试环境库
        // taskdb: 'mongodb://10.138.25.216:27017/taskdb', //开发环境库

        // taskdb: 'mongodb://10.134.112.90:27018/chromeTaskdb',
        // datadb: 'mongodb://10.134.112.90:27018/chromeResultdb'
    };
    authorization = {
        server: 'http://10.142.66.53:8484',
        clientId: 'eab26ccdcb53c2f0cd20fbc257e9aa89',
        clientSecret: 'ce2dbce0ee798e3a7fc833bd8f7ecf79',
    };
}

module.exports = {
    root: path.normalize(path.join(__dirname)),
    isProduction: isProduction,
    port: process.env.PORT || 3002,
    CLUSTER_NAME,
    vrCluster,
    syncSuffix: '.conf',
    searcher,
    QOer,
    authorization
};
