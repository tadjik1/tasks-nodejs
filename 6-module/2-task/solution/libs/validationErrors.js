module.exports = async function handleMongooseValidationError(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.name === 'ValidationError') {
      ctx.status = 400;

      const errors = {};

      for (let field in e.errors) {
        errors[field] = e.errors[field].message;
      }

      ctx.body = {
        errors: errors,
      };

    } else {
      throw err;
    }
  }
};
