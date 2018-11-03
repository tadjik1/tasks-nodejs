function sum(a, b) {
  if (![a, b].every(value => typeof value === 'number')) {
    throw new TypeError();
  }
  
  return a + b;
}

module.exports = sum;