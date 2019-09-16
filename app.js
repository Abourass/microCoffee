const Koa = require('koa');
const koaBody = require('koa-body');
const ip = require('ip');

//============================//
//       µCoffee Server      //
//==========================//

const app = module.exports = new Koa();

// Initiate koa-body
app.use(koaBody({jsonLimit: '15kb'}));

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(async ctx => {
  const body = ctx.request.body;
  if (!body) ctx.throw(400, 'body required');
  console.log(body);
  ctx.body = body;
});

app.listen(2777);
console.log(`Development started on http://${ip.address()}:2777`);
