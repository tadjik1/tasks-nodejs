const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const uuid = require('uuid/v4');
const Router = require('koa-router');
const config = require('./config');
const passport = require('./libs/passport');
const handleMongooseValidationError = require('./libs/validationErrors');
const User = require('./models/User');
const Session = require('./models/Session');
const sendMail = require('./libs/sendMail');
const mustBeAuthenticated = require('./libs/mustBeAuthenticated');

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
      console.error(err);
      ctx.status = 500;
      ctx.body = {error: 'Internal server error'};
    }
  }
});

app.use((ctx, next) => {
  ctx.login = async function login(user) {
    const token = uuid();
    await Session.create({ token, user, lastVisit: new Date() });
    
    return token;
  };
  
  return next();
});

const router = new Router({prefix: '/api'});

router.use(async (ctx, next) => {
  const header = ctx.request.get('Authorization');
  if (!header) return next();

  const token = header.split(' ')[1];
  if (!token) return next();

  const session = await Session.findOne({token}).populate('user');
  if (!session) {
    ctx.throw(401, 'Неверный аутентификационный токен');
  }
  session.lastVisit = new Date();
  await session.save();

  ctx.user = session.user;
  return next();
});

router.post('/login', async (ctx, next) => {
  await passport.authenticate('local', async (err, user, info) => {
    if (err) throw err;
    
    if (!user) {
      ctx.status = 400;
      ctx.body = {error: info};
      return;
    }

    const token = await ctx.login(user);
    
    ctx.body = {token};
  })(ctx, next);
});

router.get('/oauth/:provider', async (ctx, next) => {
  const provider = ctx.params.provider;
  
  await passport.authenticate(
    provider,
    config.providers[provider].options,
  )(ctx, next);
  
  ctx.status = 200;
  ctx.body = {status: 'ok', location: ctx.response.get('location')};
});

router.post('/oauth_callback', handleMongooseValidationError, async (ctx, next) => {
  const provider = ctx.request.body.provider;
  
  await passport.authenticate(provider, async (err, user, info) => {
    if (err) throw err;
    
    if (!user) {
      ctx.status = 400;
      ctx.body = {error: info};
      return;
    }
  
    const token = await ctx.login(user);
    
    ctx.body = {token};
  })(ctx, next);
});

router.post('/register', handleMongooseValidationError, async (ctx, next) => {
  const verificationToken = uuid();
  const user = new User({
    email: ctx.request.body.email,
    displayName: ctx.request.body.displayName,
    verificationToken,
  });
  
  await user.setPassword(ctx.request.body.password);
  await user.save();
  
  await sendMail({
    to: user.email,
    subject: 'Подтвердите почту',
    locals: {token: verificationToken},
    template: 'confirmation',
  });
  
  ctx.body = {status: 'ok'};
});

router.post('/confirm', async (ctx) => {
  const user = await User.findOne({
    verificationToken: ctx.request.body.verificationToken,
  });
  
  if (!user) {
    ctx.throw(400, 'Ссылка подтверждения недействительна или устарела');
  }
  
  user.verificationToken = undefined;
  await user.save();
  
  const token = await ctx.login(user);
  
  ctx.body = {token};
});

router.get('/me', mustBeAuthenticated, async (ctx) => {
  ctx.body = {
    email: ctx.user.email,
    displayName: ctx.user.displayName,
  };
});

app.use(router.routes());

// this for HTML5 history in browser
const index = fs.readFileSync(path.join(__dirname, 'public/index.html'));
app.use(async (ctx, next) => {
  if (!ctx.url.startsWith('/api')) {
    ctx.set('content-type', 'text/html');
    ctx.body = index;
  }
});

module.exports = app;
