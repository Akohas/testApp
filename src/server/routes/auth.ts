import Router from 'koa-router'
import { localAuthHandler, registrationController, checkAuth } from '../controllers/passport'

const router: Router = new Router()

export default router
  .post('/registration', async (ctx: Router.RouterContext) => {
    const { token, error, status } = await registrationController(ctx.request.body)
    if (token) {
      ctx.status = 201
      ctx.body = { token }
    } else {
      ctx.status = status
      ctx.body = error
    }
  })
  .post('/auth', localAuthHandler)
  .get('/profile', checkAuth, async (ctx: Router.RouterContext) => {
    const { username } = ctx.user
    ctx.status = 200
    ctx.body = { username }
  })
