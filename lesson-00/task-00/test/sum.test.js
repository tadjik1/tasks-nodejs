const sum = require('../sum');
const expect = require('chai').expect;

describe('function `sum` test suits', () => {
  it('should sum two numbers', () => {
    expect(sum(1, 2)).to.equal(3);
  });
  
  it('should throw TypeError if arguments are not numbers', () => {
    expect(() => sum('1', [])).throw(TypeError);
  });
});
