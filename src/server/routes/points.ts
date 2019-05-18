import Router from 'koa-router'
import { checkAuth } from '../controllers/passport'
import createPoint from '../controllers/points/createPoint'

const router: Router = new Router()

export default router
  .post('/point', checkAuth, async (ctx: Router.RouterContext) => {
    const scale = await createPoint(ctx)
    ctx.status = 200
    ctx.body = { scale }
  })
