const LocalStrategy = require('passport-local');
const User = require('../../../models/User');

module.exports = new LocalStrategy(
  {},
  function(email, password, done) {
    done(null, false, {message: 'Локальная стратегия подключена, но не настроена'});
  }
);
