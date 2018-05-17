const Router = require('koa-router');
const homeContronller = require('../controllers/home');

const router = new Router({
    prefix: '/api/home'
});

router.get('/',homeContronller.test);

module.exports = router;