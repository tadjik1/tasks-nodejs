module.exports = function errors(app) {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      if (!err.status) {
        console.error(err.message, err.stack);
      }

      const message = err.status
        ? err.message
        : 'Internal server error';

      ctx.flash('error', message);
      ctx.redirect('/');
    }
  };
};
