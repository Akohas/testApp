import Router from 'koa-router'

const router: Router = new Router()

export default router
  .get('/', async (ctx: Router.RouterContext) => {
    await ctx.render('index', 'index')
  })
  .get('/doc', async (ctx: Router.RouterContext) => {
    await ctx.render('doc')
  })
