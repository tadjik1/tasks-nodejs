const mongoose = require('./mongoose');
const User = require('../models/User');

module.exports = async function loadUserById(ctx, next) {
  const id = ctx.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.throw(404);
  }

  ctx.userById = await User.findById(id);

  if (!ctx.userById) {
    ctx.throw(404, 'user with this id not found');
  }

  await next();
};
