const sum = require('../sum');
const expect = require('chai').expect;

describe('0-module-1-task', () => {
  describe('sub title', () => {
    it('should sum two numbers', () => {
      expect(sum(1, 2)).to.equal(3);
    });

    it('should throw TypeError if arguments are not numbers', () => {
      expect(() => sum('1', [])).throw(TypeError);
    });
  });
});
