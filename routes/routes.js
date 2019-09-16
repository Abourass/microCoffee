const Router = require('@koa/router');
const router = module.exports = new Router();

router.get('/', async(ctx, next) => { ctx.body = {"title": "Why are you even seeing this page?"} });
router.post('/', async(ctx, next) => {
  try {
    const body = ctx.request.body;
    if (!body) ctx.throw(400, 'body required');
    const channel = body.channel_id;
    const slackMsg = {
      "channel": channel,
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `I'm the *coffee cloud*, and <@${body.user_id}> want to know if you would like to get some coffee with everyone?`
          }
        },
        {
          "type": "actions",
          "block_id": "coffee_response",
          "elements": [
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Yes"
              },
              "value": "true",
              "action_id": "willComeButton",
              "style": "primary"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "No"
              },
              "value": "false",
              "action_id": "wontComeButton",
              "style": "danger"
            }
          ]
        }]
    };
    console.log(body);
    ctx.body = slackMsg;
  } catch (e) {console.error(e);}
});

router.get('/events', async(ctx, next) => {
  try {
    const body = ctx.request.body;
    if (!body.challenge){
      console.log(body);
      ctx.body = body;
    } else { ctx.body = body.challenge; }
  } catch (e) {console.error(e);}
});
module.exports = router;
