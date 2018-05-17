/**
 * Created by lihua on 2017/2/24.
 */

const path = require('path');
const koa = require('koa');
const errorHandler = require('koa-error');
const compress = require('koa-compress');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static-cache');
const koaEjs = require('koa-ejs');
const config = require('./config');
const routes = require('./routes');

const app =  new koa();

//log
// app.use(logger());

//errorHandler
app.use(errorHandler());

//gzip
app.use(compress());

//static file
app.use(serve(path.join(config.root,'..','dist'),{
    maxAge: 30 * 60,
    dynamic: !config.isProduction,
    prefix: '/dist'
}));

//parse body
app.use(bodyParser({
    enableTypes: ['json','form','text'],
    extendTypes: {
        text: ['text/xml']
    },
    formLimit: '1mb',
    jsonLimit: '20mb',
    textLimit: '20mb',
}));

//session
// app.keys = ['spider-task-manager', 'chrome-spider-task-manager'];
// if (config.env === 'production') {
//     app.use(koaConvert.back(genericSession({
//         store: redisStore({
//             client: new Redis.Cluster(config.redis)
//         }),
//         // store: ioredisSession({
//         //     client: new Redis.Cluster(config.redis)
//         // }),
//         // ttl: 7 * 24 * 60 * 60 * 1000,
//         cookie: {
//             maxAge: 7 * 24 * 60 * 60 * 1000
//         }
//     })));
// } else {
//     app.use(koaConvert.back(genericSession({
//         cookie: {
//             maxAge: 7 * 24 * 60 * 60 * 1000
//         }
//     })));
// }


//template
koaEjs(app,{
    root: path.join(config.root,'views'),
    layout: false,
    viewExt: 'ejs',
    cache: config.isProduction
});

// passport
// passport.init(app);

// authorization.init(app);

//route
routes(app);

app.listen(config.port);
console.log("Server started, listening on port: " + config.port);
