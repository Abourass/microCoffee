const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./routes/routes');

//============================//
//       µCoffee Server      //
//==========================//
const app = module.exports = new Koa();

app.use(koaBody({jsonLimit: '15kb'})); // Initiate koa-body

app.use(async (ctx, next) => { // logger
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => { // x-response-time
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(router.routes()).use(router.allowedMethods());
module.exports = app;
