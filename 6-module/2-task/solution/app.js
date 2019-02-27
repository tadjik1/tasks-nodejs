const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const User = require('./models/User');
const loadUserById = require('./libs/loadUserById');
const handleValidationErrors = require('./libs/validationErrors');

app.use(require('koa-logger')());
app.use(require('koa-bodyparser')());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = err.message;
    } else {
      console.error(err);

      ctx.status = 500;
      ctx.body = 'Internal server error';
    }
  }
});

const router = new Router();

router.get('/users', async (ctx) => {
  ctx.body = await User.find({});
});

router.get('/users/:id', loadUserById, async (ctx) => {
  ctx.body = ctx.userById;
});

router.patch('/users/:id', loadUserById, handleValidationErrors, async (ctx) => {
  const fields = _.pick(ctx.request.body, ['displayName', 'email']);
  Object.assign(ctx.userById, fields);
  await ctx.userById.save();

  ctx.body = ctx.userById;
});

router.post('/users', handleValidationErrors, async (ctx) => {
  const fields = _.pick(ctx.request.body, ['displayName', 'email']);
  ctx.body = await User.create(fields);
});

router.delete('/users/:id', loadUserById, async (ctx) => {
  await ctx.userById.remove();

  ctx.body = 'ok';
});

app.use(router.routes());

module.exports = app;
