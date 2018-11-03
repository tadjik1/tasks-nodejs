const sum = require('../sum');
const assert = require('assert');

describe('function `sum` test suits', () => {
  it('should sum two numbers', () => {
    assert.strictEqual(sum(1, 2), 3);
  });
  
  it('should throw TypeError', () => {
    assert.throws(() => sum('1', []), TypeError);
  });
});