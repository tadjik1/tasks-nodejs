exports.post = async function(ctx) {
  ctx.logout();
  ctx.redirect('/');
};
