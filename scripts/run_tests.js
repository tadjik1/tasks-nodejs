const Mocha = require('mocha');
const glob = require('glob');

module.exports = function runTests(task, options) {
  if (!task) {
    throw new Error('Required parameter `Task` is missing. Example: `npm test task-01`');
  }
  
  const tests = glob.sync(`**/${task}/test/**/**.test.js`);
  
  if (tests.length === 0) {
    throw new Error(`There are no task "${task}". Please check your command.`);
  }
  
  const mocha = new Mocha(options);
  
  tests.forEach(mocha.addFile);
  
  mocha.run(failures => {
    process.exitCode = (failures ? 1 : 0);
  });
};