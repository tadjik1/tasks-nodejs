const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.use(require('koa-static')('public'));
app.use(require('koa-logger')());
app.use(require('koa-bodyparser')());

app.use(require('./middlewares/templates')(app));
app.use(require('./middlewares/errors')(app));
app.use(require('./middlewares/session')(app));
app.use(require('./middlewares/flash')(app));
app.use(require('./middlewares/passport').initialize());
app.use(require('./middlewares/passport').session());

router.get('/', require('./routes/frontpage').get);
router.post('/login', require('./routes/login').post);
router.post('/logout', require('./routes/logout').post);

app.use(router.routes());

module.exports = app;
