import Koa from 'koa'
import views from 'koa-views'
import bodyparser from 'koa-bodyparser'
import json from 'koa-json'
import koaStatic from 'koa-static'
import logger from 'koa-logger'
import debug from 'debug'
import Router from 'koa-router'
import koaPassport from 'koa-passport'
import path from 'path'
import router from './routes'
import config from '../../config/server'

const port = process.env.PORT || config.port
const root = `${__dirname}/../../../`

const app = new Koa()

// debug
debug('koa2:server')

// middlewares
app
  .use(bodyparser())
  .use(json())
  .use(logger())
  .use(koaStatic(`${root}/public`))
  .use(koaStatic(`${root}/doc`))
  .use(views(`${root}/views`, {
    options: {
      settings: {
        views: path.join(__dirname, 'views')
      }
    },
    map: {
      pug: 'pug'
    },
    extension: 'pug'
  }))
  .use(koaPassport.initialize())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(koaStatic(`${root}/apidoc`))
  .use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    await next()
  })
  // logger
  .use(async (ctx: Router.RouterContext, next: () => Promise<any>) => {
    const start: Date = new Date()
    await next()
    const finish: Date = new Date()
    const ms: any = +finish - +start
    console.log(`${ctx.method} ${ctx.url} - ${ms}`)
  })

export default () => app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
