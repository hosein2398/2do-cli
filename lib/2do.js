const figlet = require('figlet');
const chalk = require('chalk'); // todo : remove this library in future and only use colors
const fs = require('fs');
const vorpal = require('vorpal')();
const inquirer = require('inquirer');
const colors = require('colors');
const packageJson = require('../package.json');
// var Table = require('cli-table3');
// var table = new Table({ head: ["number", "Note"], colWidths: [20, 50] });
/*
 * functions
 */


/*
 * Writes 2do file
 */
function write2doFile() {
  fs.writeFile('2do.json', '{}', (err) => {
    if (err) throw err;
    console.log(chalk.green('Project started successfuly. '));
  });
}


/*
 * Shows 2do file
 */
function show2doFile(args, callback) {
  const arrToReturnAndTest = []; // this is created only for tests
  const f = new Promise((res, rej) => { // we are useing promises so that we can test our code
    fs.readFile('2do.json', (err, data) => {
      if (err) throw err;
      const stringOfJSON = data.toString();
      const todoObj = JSON.parse(stringOfJSON);
      const wantedFileObj = todoObj[args.fileName];
      let counter = 0;
      let hasFilename = false;
      for (key in wantedFileObj) {
        if (wantedFileObj.hasOwnProperty(key)) {
          counter++;
          // var oobj = {};
          // oobj[counter] = wantedFileObj[key]['title'];
          // table.push(oobj);
          hasFilename = true;
          arrToReturnAndTest.push(wantedFileObj[key].title);
          console.log(`\n${chalk.black.bgYellowBright(` ${counter} `)} - ${wantedFileObj[key].title}`);
          // console.log(table.toString());
        }
      }
      res(arrToReturnAndTest);
      if (!hasFilename) {
        console.log(chalk.yellow(`You don't have such a file to add this file use: add ${args.fileName}`));
      }

      callback();
    });
  });
  return (f);
}

function list2do(args, callback, testMode) {
  return new Promise((res, rej) => {
    fs.readFile('2do.json', (err, data) => {
      if (err) throw err;
      const stringOfJSON = data.toString();
      const arrToReturn = [];
      const todoObj = JSON.parse(stringOfJSON);
      // var wantedFileObj = todoObj[args.fileName];
      let allKeys = [],
        counter = 0;
      for (key in todoObj) {
        if (todoObj.hasOwnProperty(key)) {
          counter++;
          allKeys.push(key);
          arrToReturn.push(key);
        }
      }
      res(arrToReturn);
      // using inquirer to show in a list
      if (!testMode) {
        inquirer.prompt([{
          type: 'list',
          message: '\n All available files:',
          name: 'selected',
          choices: allKeys,
          validate(answer) {
            if (answer.length < 1) {
              return 'You must choose at least one topping.';
            }
            return true;
          },
        }]).then((answers) => {
          console.log(`\n${chalk.bold('||| ')}${chalk.cyanBright.bold(answers.selected)}${chalk.bold(' |||')}`);
          const wantedFileObj = todoObj[answers.selected];
          let counter = 0;
          for (key in wantedFileObj) {
            if (wantedFileObj.hasOwnProperty(key)) {
              counter++;
              console.log(`\n${chalk.black.bgYellowBright(` ${counter} `)} - ${wantedFileObj[key].title}\n`);
            }
          }
        });
      }
      callback();
    });
  });
}

function add2do(args, callback) {
  return new Promise((res, rej) => {
    fs.readFile('2do.json', (err, data) => {
      if (err) throw err;
      const stringOfJSON = data.toString();
      const todoObj = JSON.parse(stringOfJSON);
      if (todoObj[args.fileName]) {
        const fileNameObj = todoObj[args.fileName];
        let size = 0;
        for (key in fileNameObj) {
          if (fileNameObj.hasOwnProperty(key)) {
            size++;
          }
        }
        todoObj[args.fileName][size + 1] = {};
        todoObj[args.fileName][size + 1].title = args.title;
        fs.writeFile('2do.json', JSON.stringify(todoObj), (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
          callback();
        });
      } else {
        todoObj[args.fileName] = {};
        todoObj[args.fileName]['1'] = {};
        todoObj[args.fileName]['1'].title = args.title;

        fs.writeFile('2do.json', JSON.stringify(todoObj), (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
          callback();
        });
      }
      res(true);
    });
  });
}

function delete2do(args, callback, testMode) {
  return new Promise((res, rej) => {
    fs.readFile('2do.json', (err, data) => {
      if (err) throw err;
      const stringOfJSON = data.toString();
      const todoObj = JSON.parse(stringOfJSON);
      const wantedFileObj = todoObj[args.fileName];
      if (!testMode) {
        vorpal.hide();
        if (!args.todoNumber) {
          inquirer.prompt({
            type: 'confirm',
            name: 'continue',
            default: false,
            message: `By doing this all notes related to ${chalk.blue.underline.bold(args.fileName)} will be ${chalk.red.bold('deleted')} , are sure?`,
          },
          (result) => {
            if (result) {
              console.log(result);
              delete todoObj[args.fileName];
              fs.writeFile('2do.json', JSON.stringify(todoObj), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
              });
            } else {
              console.log('Did not delete the file.');
            }
            vorpal.show();
          });
        }
      }
      if (wantedFileObj && wantedFileObj[args.todoNumber]) {
        delete todoObj[args.fileName][args.todoNumber];
        Object.prototype.renameProperty = function (oldName, newName) {
          if (oldName == newName) {
            return this;
          }
          if (this.hasOwnProperty(oldName)) {
            this[newName] = this[oldName];
            delete this[oldName];
          }
          return this;
        };
        Object.size = function (obj) {
          let size = 0,
            key;
          for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
          }
          return size;
        };
        const theyKeys = Object.keys(todoObj[args.fileName]);
        for (let i = 1; i <= Object.size(todoObj[args.fileName]); i++) {
          if (theyKeys[i - 1] > args.todoNumber) {
            todoObj[args.fileName].renameProperty(theyKeys[i - 1], theyKeys[i - 1] - 1);
          }
        }
        fs.writeFile('2do.json', JSON.stringify(todoObj), (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
      }
    });
    // callback();
    res(true);
  });
}

function todoMain() {
  figlet('2do', (err, data) => {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(`${chalk.yellow(data)}\n \n`);
    console.log('Welcome to 2do , for help write --help  \n');
  });


  setTimeout(() => {
    /*
         * init command
         */

    vorpal.command('init', 'Initializes new 2do in currnet directory. ')
      .action((args, callback) => {
        // cheking if 2do.json alrealy exists directory.
        fs.stat('2do.json', (err, stats) => {
          // if (err) console.log(err);
          if (stats) {
            console.log(chalk.red('You already have a 2do in this directory.'));
            callback();
          } else {
            write2doFile();
            callback();
          }
        });
      });

    /*
         * --help command
         */
    vorpal.command('--help', 'Help command')
      .action((args, callback) => {
        console.log(`
                  Help
                  init : Starts a new 2do inite the repositoey you are into.
                  list : Lists all files in current directory and you can select one to show all todos.
                  show [fileName] : Show all todos related to a file . 
                  add [fileName] [todo] : Adds a todo for a file.
                  delete [fileName] [tosoNumber] : deletes a file's todo with given number.
         `);
        callback();
      });

    /*
         * show command
         */
    vorpal.command('show [fileName]', 'Represents 2dos of a file. ')
      .action((args, callback) => {
        show2doFile(args, callback);
      });

    /*
         * list command
         */
    vorpal.command('list', 'Lists all available 2dos in currents directory. ')
      .action((args, callback) => {
        list2do(args, callback, false);
      });

    /*
         * add command
         */


    vorpal.command('add <fileName> [title]', 'Adds new 2do for a file. ')
      .action((args, callback) => {
        add2do(args, callback);
      });

    /*
         * delete command
         */
    vorpal.command('delete <fileName> [todoNumber]', 'Deletes a files\' 2do')
      .action((args, callback) => {
        delete2do(args, callback, false);
      });


    vorpal.command('version', 'Logs current version. ')
      .action((args, callback) => {
        console.log(`Current version is : ${chalk.yellow(packageJson.version)}`);
        callback();
      });

    /**
         * we are replacing "chalk.js" with "colors" library,
         * due to the bug in issue #10
         */
    vorpal.delimiter(`${colors.bgWhite.magenta(' 2do ')} :`).show();
  }, 800);
}

module.exports = {
  todoMain,
  write2doFile,
  show2doFile,
  list2do,
  add2do,
  delete2do,
};
