const figlet = require('figlet');
const chalk = require('chalk'); // todo : remove this library in future and only use colors
const fs = require('fs');
const vorpal = require('vorpal')();
const colors = require('colors');
const show2doFile = require('./show');
const list2do = require('./list');
const add2do = require('./add');
const delete2do = require('./delete');
const check2do = require('./check');
const packageJson = require('../package.json');

/*
 * Writes 2do file
 */
function write2doFile() {
  fs.writeFile('2do.json', '{}', (err) => {
    if (err) throw err;
    console.log(chalk.green('Project started successfuly. '));
  });
}

/**
 *  Main function to call at the begining
 */
function todoMain() {
  figlet('2do', (err, data) => {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(`${chalk.cyanBright(data)}\n \n`);
    console.log('Welcome to 2do-cli, for help write --help  \n');
  });


  setTimeout(() => {
    /**
    *  init command
    */
    vorpal.command('init', 'Initializes new 2do in currnet directory. ')
      .action((args, callback) => {
        // cheking if 2do.json alrealy exists directory.
        fs.stat('2do.json',(err, stats) => {
          // if (err) console.log(err);
          if (stats) {
            console.log(colors.bgWhite.magenta('You already have a 2do in this directory.'));
            callback();
          } else {
            // await w/riteFile('{}', 'The file has been saved!', callback);
            write2doFile();
            callback();
          }
        });
      });

    /**
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

    /**
    *  show command
    */
    vorpal.command('show [fileName]', 'Represents 2dos of a file. ')
      .action(show2doFile);

    /**
    *  list command
    */
    vorpal.command('list', 'Lists all available 2dos in current directory. ')
      .action(list2do);

    /**
    *  check command
    */
    vorpal.command('check <fileName> [todoNumber]', 'Sets a todo status to checked')
      .action(check2do);

    /**
    *  add command
    */
    vorpal.command('add <fileName> [title]', 'Adds new 2do for a file. ')
      .action(add2do);


    /**
    *  delete command
    */
    vorpal.command('delete <fileName> [todoNumber]', 'Deletes a files\' 2do')
      .action(delete2do);


    vorpal.command('version', 'Logs current version. ')
      .action((args, callback) => {
        console.log(`Current version is : ${chalk.yellow(packageJson.version)}`);
        callback();
      });


    /**
    *  replacing "chalk.js" with "colors" library,
    *  due to the bug in issue #10
    */
    vorpal.delimiter(`${colors.bgWhite.blue(' 2do ')} :`).show();
  }, 800);
}

module.exports = {
  todoMain,
  // write2doFile,
  // show2doFile,
  // list2do,
  // add2do,
  // delete2do,
};
