const chalk = require('chalk');
const { writeFile, readFile } = require('./utils');

/**
 *  sets a 2do checked
 *  @param {object} args - arguments passed in terminal
 *  @param {function} callback - callback function (for vorpal)
 */
async function check2do(args, callback) {
  const data = await readFile('2do.json', 'UTF-8');
  const todoObj = JSON.parse(data);
  if (todoObj[args.fileName][args.todoNumber].status === 'done') {
    console.log('\n 🚨 This todo has already been set to done! \n');
  } else if (todoObj[args.fileName] && todoObj[args.fileName][args.todoNumber]) {
    todoObj[args.fileName][args.todoNumber].status = 'done';
    // eslint-disable-next-line prefer-template
    await writeFile(todoObj, `\n 🏄‍ ${chalk.yellow.bold(args.fileName + ':' + args.todoNumber)} status set to done! \n`, callback);
  } else {
    console.log('\n 🚨 your file or your todo does not exist! \n');
  }
}

module.exports = check2do;
