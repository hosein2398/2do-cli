const chalk = require('chalk');
const inquirer = require('inquirer');
const {
  writeFile,
  readFile,
  renameProp,
  cloneObject,
} = require('./utils');


/**
 *  Omits a 2do from the file
 *  @param {object} args - arguments passed in terminal
 *  @param {function} callback - callback function (for vorpal)
 *  @param {boolean} testMode - a param to know if we are at test mode or not
 */
async function delete2do(args, callback, testMode = false) {
  // vorpal.hide();
  const data = await readFile('2do.json', 'UTF-8');
  const todoObj = JSON.parse(data);
  const wantedFileObj = todoObj[args.fileName];
  if (!testMode) {
    // TODO: add a message to user when the inputed file does not exist
    if (!args.todoNumber) {
      const result = await inquirer.prompt({
        type: 'confirm',
        name: 'fsd',
        default: false,
        message: `By doing this all notes related to ${chalk.blue.underline.bold(args.fileName)} will be ${chalk.red.bold('deleted')}, are you sure?`,
      });
      if (result.fsd) {
        // console.log(result); // todo: why are we loggin??
        delete todoObj[args.fileName];
        await writeFile(todoObj, '\n 🏄‍ Deleted one 2do sucessfully! \n', () => {});
      } else {
        console.log('\n Did not delete the file. \n');
      }
    }
  }
  // TODO: log sth when watenfilObj is not there in the file
  // TODO: move this todos to 2so.json
  if (wantedFileObj && wantedFileObj[args.todoNumber]) {
    delete todoObj[args.fileName][args.todoNumber];
    let newTodoObj = cloneObject(todoObj[args.fileName]);
    const theyKeys = Object.keys(todoObj[args.fileName]);
    const objSize = Object.keys(todoObj[args.fileName]).length;
    // eslint-disable-next-line
    for (let i = 0; i < objSize; i++) {
      if (theyKeys[i] > args.todoNumber) {
        // since renameProp is pure we have to reassign
        newTodoObj = renameProp(newTodoObj, theyKeys[i], theyKeys[i] - 1);
      }
    }
    todoObj[args.fileName] = newTodoObj;
    await writeFile(todoObj, '\n 🏄‍ Deleted one 2do sucessfully! \n', () => {});
  }
  return callback();
}

module.exports = delete2do;
