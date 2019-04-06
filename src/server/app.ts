import Koa from 'koa';
import views from 'koa-views';
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import json from 'koa-json';
import koaStatic from 'koa-static';
import logger from 'koa-logger';
import debug from 'debug';
import path from 'path';
import router from './routes';
import config from '../../config/server';

const port = process.env.PORT || config.port;
const root = `${__dirname}/../../`;

const app = new Koa();

// debug
debug('koa2:server');

// error handler
onerror(app);

// middlewares
app
  .use(bodyparser())
  .use(json())
  .use(logger())
  .use(koaStatic(`${root}/static`))
  .use(koaStatic(`${root}/doc`))
  .use(views(`${root}/views`, {
    options: {
      settings: {
        views: path.join(__dirname, 'views'),
      },
    },
    map: {
      pug: 'pug',
    },
    extension: 'pug',
  }))
  .use(koaPassport.initialize())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(koaStatic(`${root}/apidoc`));

// logger
app.use(async (ctx:any, next:any) => {
  const start:any = new Date();
  await next();
  const finish:any = new Date();
  const ms:any = finish - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.on('error', async (err:any, ctx:any) => {
  console.log(err);
  logger.error('server error', err, ctx);
});

module.exports = () => app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
