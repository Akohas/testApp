import Router from 'koa-router'
import { checkAuth } from '../controllers/passport'
import createPoint from '../controllers/points/createPoint'
import deletePoint from '../controllers/points/deletePoint'

const router: Router = new Router()

export default router
  .post('/point', checkAuth, async (ctx: Router.RouterContext) => {
    ctx.status = 200
    ctx.body = await createPoint(ctx)
  })
  .delete('/point', checkAuth, async (ctx: Router.RouterContext) => {
    ctx.status = 200
    ctx.body = await deletePoint(ctx)
  })
