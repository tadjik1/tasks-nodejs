const pug = require('pug');
const path = require('path');
const config = require('config');

module.exports = function templates(app) {
  return async (ctx, next) => {
    /* default locals */
    ctx.locals = {

      get user() {
        return ctx.state.user;
      },

      get flash() {
        return ctx.flash();
      },
    };

    ctx.render = function(templatePath, locals) {
      return pug.renderFile(
          path.join(config.get('templatesRoot'), templatePath, '.pug'),
          Object.assign({}, ctx.locals, locals)
      );
    };

    await next();
  };
};
