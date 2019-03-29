const router = require('koa-router')();
const { localAuthHandler, registrationController, checkAuth } = require('../controllers/passport');

router.post('/registration', async (ctx) => {
  const { token, error, status } = await registrationController(ctx.request.body);
  if (token) {
    ctx.status = 201;
    ctx.body = { token };
  } else {
    ctx.status = status;
    ctx.body = error;
  }
});

router.post('/auth', localAuthHandler);

router.get('/profile', checkAuth, async (ctx) => {
  const { username } = ctx.user;
  ctx.status = 200;
  ctx.body = { username };
});


module.exports = router;
