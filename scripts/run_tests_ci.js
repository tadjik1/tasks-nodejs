// const run_tests = require('./run_tests');

if (!process.env.CI)
  throw new Error('run_tests_ci can be run only on CI');

console.log(process.env);