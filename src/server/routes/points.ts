import Router from 'koa-router'
import { checkAuth } from '../controllers/passport'
import createPoint from '../controllers/points/createPoint'
import deletePoint from '../controllers/points/deletePoint'

const router: Router = new Router()

export default router
  .post('/point', checkAuth, async (ctx: Router.RouterContext) => {
    const scale = await createPoint(ctx)
    ctx.status = 201
    ctx.body = { scale }
  })
  .delete('/point', checkAuth, async (ctx: Router.RouterContext) => {
    const scale = await deletePoint(ctx)
    ctx.status = 200
    ctx.body = { scale }
  })
