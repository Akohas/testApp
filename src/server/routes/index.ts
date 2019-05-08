import Router from 'koa-router'
import auth from './auth'
import render from './render'

const router: Router = new Router()

router.use('', auth.routes())
router.use('', render.routes())

export default router
