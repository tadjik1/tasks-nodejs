const User = require('../User');
const expect = require('chai').expect;

describe('6-module-1-task', () => {
  describe('модель пользователя', () => {
    it('у модели есть поля email и displayName', () => {
      const fields = User.schema.obj;

      expect(fields).to.have.property('email');
      expect(fields).to.have.property('displayName');
    });

    it('модель должна называться User, а коллекция - users', () => {
      expect(User.modelName).to.equal('User');
      expect(User.collection.collectionName).to.equal('users');
    });

    it('поле email имеет правильную конфигурацию', () => {
      const email = User.schema.obj.email;

      expect(email.type).to.eql(String);
      expect(email.required).to.be.true;
      expect(email.unique).to.be.true;
      expect(email.validate).to.be.an('array');
      expect(email.lowercase).to.be.true;
      expect(email.trim).to.be.true;

      expect(email.validate[0].validator('mail@mail.com')).to.be.true;
      expect(email.validate[0].validator('wrongmail')).to.be.false;
    });

    it('поле displayName имеет правильную конфигурацию', () => {
      const displayName = User.schema.obj.displayName;

      expect(displayName.type).to.eql(String);
      expect(displayName.required).to.be.true;
      expect(displayName.trim).to.be.true;
    });
  });
});
