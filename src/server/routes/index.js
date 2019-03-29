const router = require('koa-router')();
const auth = require('./auth');
const render = require('./render');

router.use('', auth.routes());
router.use('', render.routes());

module.exports = router;

