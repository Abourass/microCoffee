const Koa = require('koa');
const koaBody = require('koa-body');
const ip = require('ip');

//============================//
//       µCoffee Server      //
//==========================//

const app = module.exports = new Koa();

function normalizePort(val) { // ========================================| Normalize a port into a number, string, or false
  const port = parseInt(val, 10);
  if (typeof port !== 'number') { return val; }
  if (port >= 0) { return port; }
  return false;
}

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
  const slackMsg = {
    "type": "section",
    "response_type": "in_channel",
    "text": `@${body.user_id} wants to know if you would like to join them in getting coffee?`,
    "attachments": [
      {
        "text": "Choose a response",
        "fallback": "Fuck you, you broke it me",
        "callback_id": "coffee_response",
        "color": "#13a9e3",
        "attachment_type": "default",
        "actions": [
          {
            "name": "yes",
            "text": "Yes",
            "type": "button",
            "value": "true"
          },
          {
            "name": "no",
            "text": "No",
            "style": "danger",
            "type": "button",
            "value": "false",
          confirm: {
            "title": "Are you sure?",
            "text": "C'mon...",
            "ok_text": "Yes",
            "dismiss_text": "No, I'm sure"
          }
          },
          {
            "name": "game",
            "text": "Thermonuclear War",
            "style": "danger",
            "type": "button",
            "value": "war",
            "confirm": {
              "title": "Are you sure?",
              "text": "Wouldn't you prefer a good game of chess?",
              "ok_text": "Yes",
              "dismiss_text": "No"
            }
          }
        ]
      }
    ]
  };

  console.log(body);

  console.log('Response message was');

  console.log(slackMsg);

  ctx.body = slackMsg;
});

const port = normalizePort(process.env.PORT || '2777'); // Get port from environment
app.listen(port);
