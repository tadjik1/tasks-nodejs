const Koa = require('koa');
const _ = require('lodash');
const Router = require('koa-router');
const User = require('./models/User');
const validateId = require('./libs/validateId');
const handleValidationErrors = require('./libs/validationErrors');

const app = new Koa();

app.use(require('koa-static')('public'));
app.use(require('koa-bodyparser')());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = {error: err.message};
    } else {
      ctx.status = 500;
      ctx.body = {error: 'Internal server error'};
    }
  }
});

const router = new Router();

router.get('/users', async (ctx) => {
  ctx.body = await User.find({});
});

router.get('/users/:id', validateId, async (ctx) => {
  const user = await User.findById(ctx.params.id);

  if (!user) {
    ctx.throw(404);
  }

  ctx.body = user;
});

router.patch('/users/:id', validateId, handleValidationErrors, async (ctx) => {
  const fields = _.pick(ctx.request.body, ['displayName', 'email']);

  const user = await User.findByIdAndUpdate(ctx.params.id, fields, {
    runValidators: true,
    new: true,
  });

  ctx.body = user;
});

router.post('/users', handleValidationErrors, async (ctx) => {
  const fields = _.pick(ctx.request.body, ['displayName', 'email']);
  ctx.body = await User.create(fields);
});

router.delete('/users/:id', validateId, async (ctx) => {
  const user = await User.findByIdAndRemove(ctx.params.id);
  if (!user) ctx.throw(404);
  ctx.body = user;
});

app.use(router.routes());

module.exports = app;
