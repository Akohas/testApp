import Router from 'koa-router'
import auth from './auth'
import render from './render'
import points from './points'

const router: Router = new Router()

router.use('', auth.routes())
router.use('', render.routes())
router.use('', points.routes())

export default router
