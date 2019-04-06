import Router from 'koa-router';

const router: Router = new Router();

export default router
  .get('/', async (ctx:any) => {
    await ctx.render('index', 'index');
  })
  .get('/doc', async (ctx:any) => {
    await ctx.render('doc');
  });
