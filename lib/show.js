const Table = require('cli-table3');
const chalk = require('chalk'); // todo : remove this library in future and only use colors
const { readFile } = require('./utils');

/**
 *  Shows 2do
 *  @param {object} args - arguments passed in terminal
 */
async function show2doFile(args) {
  // since this is async function, it does not even need callback for vorpal
  // cause vorpal calls callback fn in async functions automatically (why?!)
  const data = await readFile('2do.json', 'UTF-8');
  const todoObj = JSON.parse(data);
  const wantedFileObj = todoObj[args.fileName];

  if (!wantedFileObj) {
    console.log(chalk.yellow(`\n 🚨 You don't have such a name in your todos: ${args.fileName} \n`));
    return;
  }

  // eslint-disable-next-line prefer-template
  console.log(`\n ${chalk.cyanBright.bold(args.fileName + ':')}`);

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

module.exports = show2doFile;
