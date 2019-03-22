const path = require('path');
process.env["NODE_CONFIG_DIR"] = path.join(__dirname, '../config');

const mongoose = require('../libs/mongoose');
const localStrategy = require('../libs/passport/strategies/local');
const expect = require('chai').expect;
const User = require('../models/User');
const users = require('../fixtures/users');

describe('7-module-1-task', () => {
  describe('passport local strategy', function () {
    before(async () => {
      await User.remove();

      for (const user of users) {
        const u = new User(user);
        await u.setPassword(user.password);
        await u.save();
      }
    });

    after(async () => {
      await User.remove({});
      mongoose.disconnect();
    });
    
    it('поле usernameField должно должно содержать email', () => {
      expect(localStrategy._usernameField).to.equal('email');
    });

    it('стратегия должна возвращать ошибку если указан несуществующий email', done => {
      localStrategy._verify('notexisting@mail.com', 'pass', (err, user, info) => {
        expect(err).to.be.null;
        expect(user).to.be.false;
        expect(info).to.deep.equal({message: 'Нет такого пользователя'});
        done();
      });
    });
  
    it('стратегия должна возвращать ошибку если указан неверный пароль', done => {
      localStrategy._verify('example1@home.ru', 'pass', (err, user, info) => {
        expect(err).to.be.null;
        expect(user).to.be.false;
        expect(info).to.deep.equal({message: 'Пароль неверен'});
        done();
      });
    });
  
    it('стратегия должна возвращать приветствие если все хорошо', done => {
      localStrategy._verify('example1@home.ru', '123456', (err, user, info) => {
        expect(err).to.be.null;
        expect(user.displayName).to.equal('example1');
        expect(info).to.deep.equal({message: 'Добро пожаловать!'});
        done();
      });
    });
  });
});
