const mongoose = require('mongoose');

module.exports = function validateId(ctx, next) {
  const id = ctx.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.throw(400);
  }

  return next();
};
