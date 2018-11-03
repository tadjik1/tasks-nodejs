const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

const lesson = process.argv[2];
const task = process.argv[3];

if (!lesson) {
  return console.error('Lesson is missing. Example: `node scripts/run_test lesson-01 task-01`');
}

if (!task) {
  return console.error('Task is missing. Example: `node scripts/run_test lesson-01 task-01`');
}

const mocha = new Mocha({
  reporter: 'spec',
  useColors: true,
});


const testDir = path.join(lesson, task, 'test');

if (!fs.existsSync(testDir)) {
  return console.error('Task does not exist, please check your command');
}

// fs.readdirSync(testDir).filter(function(file){
//   // Only keep the .js files
//   return file.substr(-3) === '.js';
//
// }).forEach(function(file){
//   mocha.addFile(
//     path.join(testDir, file)
//   );
// });
//
// // Run the tests.
// mocha.run(function(failures){
//   process.exitCode = failures ? 1 : 0;  // exit with non-zero status if there were failures
// });