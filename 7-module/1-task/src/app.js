const Koa = require('koa');

const Router = require('koa-router');

const passport = require('./libs/passport');
const Session = require('./models/Session');
const uuid = require('uuid/v4');

const app = new Koa();

app.use(require('koa-static')('public'));
app.use(require('koa-bodyparser')());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = { message: err.message };
    } else {
      ctx.status = 500;
      ctx.body = { message: 'Internal server error' };
    }
  }
});

const router = new Router({ prefix: '/api' });

router.post('/login', async (ctx, next) => {
  await passport.authenticate('local', async (err, user, info) => {
    if (err) throw err;
    
    if (!user) {
      ctx.status = 400;
      ctx.body = { error: info };
      return;
    }
    
    const token = uuid();
    await Session.create({ token, user });
    
    ctx.body = { token };
  })(ctx, next);
});

app.use(router.routes());

module.exports = app;
