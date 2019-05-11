const app = require('../app');
const connection = require('../libs/connection');
const User = require('../models/User');
const request = require('request-promise').defaults({
  resolveWithFullResponse: true,
  simple: false,
  json: true,
});
const transportEngine = require('../libs/sendMail').transportEngine;
const expect = require('chai').expect;
const get = require('lodash/get');

describe('8-module-1-task', () => {
  describe('регистрация', function() {
    let server;
    before((done) => {
      server = app.listen(3000, done);
    });

    beforeEach(async () => {
      await User.deleteMany({});
    });

    after(async () => {
      await User.deleteMany({});
      connection.close();
      server.close();
    });

    it('при запросе на /register должен создавать пользователь и отправляться email', async () => {
      const newUserData = {
        email: 'newuser@mail.com',
        displayName: 'newuser',
        password: '123123',
      };
      let envelope;
      transportEngine.on('envelope', (_envelope) => {
        envelope = _envelope;
      });

      const response = await request({
        method: 'post',
        uri: 'http://localhost:3000/api/register',
        body: newUserData,
      });

      expect(response.body, 'ответ сервера содержит поле status').to.eql({status: 'ok'});
      expect(get(envelope, 'to[0]'), 'письмо отправлено на указанный email').to
          .equal(newUserData.email);

      const newUser = await User.findOne({email: newUserData.email});

      expect(newUser.passwordHash, 'у пользователя есть поле passwordHash').to.exist;
      expect(newUser.salt, 'у пользователя есть поле salt').to.exist;
      expect(newUser.verificationToken, 'у пользователя есть поле verificationToken').to.exist;
    });

    it('при попытке регистрации пользователя, который уже есть в базе - ошибка', async () => {
      const userData = {
        email: 'user@mail.com',
        displayName: 'user',
        password: '123123',
      };

      const user = new User(userData);
      await user.setPassword(userData.password);
      await user.save();

      const response = await request({
        method: 'post',
        uri: 'http://localhost:3000/api/register',
        body: userData,
      });

      expect(response.statusCode).to.equal(400);
      expect(response.body).to.eql({errors: {email: 'Такой email уже существует'}});
    });

    it('при попытке входа пользователя не подтвердившего email - ошибка', async () => {
      const newUserData = {
        email: 'user@mail.com',
        displayName: 'user',
        password: '123123',
        verificationToken: 'token',
      };

      const user = new User(newUserData);
      await user.setPassword(newUserData.password);
      await user.save();

      const response = await request({
        method: 'post',
        uri: 'http://localhost:3000/api/login',
        body: {
          email: newUserData.email,
          password: newUserData.password,
        },
      });

      expect(response.statusCode).to.equal(400);
      expect(response.body).to.eql({error: 'Подтвердите email'});
    });

    it('при запросе /confirm verificationToken в базе удаляется, токен есть в ответе сервера',
        async () => {
          const newUserData = {
            email: 'user@mail.com',
            displayName: 'user',
            password: '123123',
            verificationToken: 'token',
          };

          const u = new User(newUserData);
          await u.setPassword(newUserData.password);
          await u.save();

          const response = await request({
            method: 'post',
            uri: 'http://localhost:3000/api/confirm',
            body: {
              verificationToken: newUserData.verificationToken,
            },
          });

          const user = await User.findOne({email: newUserData.email});

          expect(user, 'verificationToken должен быть undefined').to.have
              .property('verificationToken', undefined);

          expect(response.body, 'с сервера должен вернуться token').to.has.property('token');
        });

    it('при запросе /confirm с неправильным токеном - ошибка', async () => {
      const response = await request({
        method: 'post',
        uri: 'http://localhost:3000/api/confirm',
        body: {
          verificationToken: 'randomtoken',
        },
      });

      expect(response.body, 'с сервера должна вернуться ошибка').to
          .eql({error: 'Ссылка подтверждения недействительна или устарела'});
    });
  });
});
