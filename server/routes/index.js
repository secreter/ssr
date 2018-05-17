const Router = require('koa-router');
const assets = require('../lib/assets');

let homeRouter = require('./home');

module.exports = function(app){
    let router = new Router();

    router.get(/^\/(?:page(?:\/.*)?)?$/,async(ctx)=>{
        await ctx.render('index',{assets});
    });

    app.use(router.routes());
    app.use(homeRouter.routes());

};