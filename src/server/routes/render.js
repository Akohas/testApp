const router = require('koa-router')();

router.get('/', async (ctx) => {
  await ctx.render('index', 'index');
});
router.get('/doc', async (ctx) => {
  await ctx.render('doc');
});

module.exports = router;
