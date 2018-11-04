const run_tests = require('./run_tests');

const task = process.argv[2];

run_tests(task, {
  reporter: 'spec',
  useColors: true,
});