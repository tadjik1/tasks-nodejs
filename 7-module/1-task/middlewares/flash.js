module.exports = function flash(app) {
  return async (ctx, next) => {
    // keep previous flash
    const messages = ctx.session.messages || {};

    // clear all flash
    delete ctx.session.messages;

    ctx.flash = function(type, text) {
      if (!type && !text) {
        return messages;
      }

      if (!ctx.session.messages) {
        ctx.session.messages = {};
      }

      if (!ctx.session.messages[type]) {
        ctx.session.messages[type] = [];
      }

      ctx.session.messages[type].push(text);
    };

    await next();

    if (ctx.status === 302 && !ctx.session.messages) {
      // pass on the flash over a redirect
      ctx.session.messages = messages;
    }
  };
};
