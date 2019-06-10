import Router from 'koa-router'
import { localAuthHandler, registrationController, checkAuth } from '../controllers/passport'
import { baseResponse } from '../helpers'
const router: Router = new Router()

export default router
  .post('/registration', async (ctx: Router.RouterContext) => {
    const { token, error, status = 201 } = await registrationController(ctx.request.body)
    if (token) {
      ctx.status = status
      ctx.body = baseResponse(null, { token })
    } else {
      ctx.status = status
      ctx.body = error
    }
  })
  .post('/auth', localAuthHandler)
  .get('/profile', checkAuth, async (ctx: Router.RouterContext) => {
    const { username } = ctx.user
    ctx.status = 200
    ctx.body = baseResponse(null, { username })
  })
