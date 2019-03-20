exports.get = async function(ctx) {
  if (ctx.isAuthenticated()) {
    ctx.body = ctx.render('welcome');
  } else {
    ctx.body = ctx.render('login');
  }
};
