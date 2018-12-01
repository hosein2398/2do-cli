const inquirer = require('inquirer');
const Table = require('cli-table3');
const chalk = require('chalk'); // todo : remove this library in future and only use colors
const {
  readFile,
} = require('./utils');

/**
 *  Lists all 2dos
 *  @param {object} args - arguments passed in terminal
 *  @param {function} callback - callback function (for vorpal)
 *  @param {boolean} testMode - a param to know if we are at test mode or not
 */
async function list2do(args, callback, testMode = false) {
  const data = await readFile('2do.json', 'UTF-8');
  const todoObj = JSON.parse(data);
  const allKeys = [];
  Object.keys(todoObj).forEach((key) => {
    allKeys.push(key);
  });
  // using inquirer to show in a list
  if (!testMode) {
    const answers = await inquirer.prompt([{
      type: 'list',
      message: 'All available files:',
      name: 'selected',
      choices: allKeys,
      validate(answer) {
        if (answer.length < 1) {
          return 'You must choose at least one topping.';
        }
        return true;
      },
    }]);
    // eslint-disable-next-line prefer-template
    console.log(`\n ${chalk.cyanBright.bold(answers.selected + ':')}`);
    const wantedFileObj = todoObj[answers.selected];
    const table = new Table({
      head: ['Number', 'Status', 'Title'],
      colWidths: [10, 10, 50],
    });

    Object.keys(wantedFileObj).forEach((key, index) => {
      table.push(
        [index + 1, wantedFileObj[key].status, wantedFileObj[key].title],
      );
    });

    console.log(table.toString());
  }
}

module.exports = list2do;
