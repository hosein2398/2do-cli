const figlet = require('figlet');
const chalk = require('chalk');
const fs = require('fs');
const vorpal = require('vorpal')();
const inquirer = require('inquirer');
// var Table = require('cli-table2');
// var table = new Table({ head: ["number", "Note"], colWidths: [20, 50] });

function todoMain() {
    figlet('2do', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.yellow(data) + '\n \n')
        console.log('Welcome to 2do , for help write --help  \n')
    });


    setTimeout(function () {

        /*
         * init command
         */
        vorpal.command('init', 'Initializes new 2do in currnet directory. ')
            .action(function (args, callback) {

                //cheking if 2do.json alrealy exists directory. 
                fs.stat('2do.json', function (err, stats) {
                    // if (err) console.log(err);
                    if (stats) {
                        console.log(chalk.red('You already have a 2do in this directory.'));
                        callback();

                    } else {
                        fs.writeFile('2do.json', "{}", (err) => {
                            if (err) throw err;
                            console.log(chalk.green('Project started successfuly. '));
                        });
                        callback();

                    }
                });
            });

        /*
         * --help command
         */
        vorpal.command('--help', 'Help command')
            .action(function (args, callback) {
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
            .action(function (args, callback) {
                fs.\readFile('2do.json', (err, data) => {
                    if (err) throw err;
                    var stringOfJSON = data.toString();
                    var todoObj = JSON.parse(stringOfJSON);
                    var wantedFileObj = todoObj[args.fileName];
                    var counter = 0;
                    var hasFilename = false;
                    for (key in wantedFileObj) {
                        if (wantedFileObj.hasOwnProperty(key)) {
                            counter++;
                            // var oobj = {};
                            // oobj[counter] = wantedFileObj[key]['title'];
                            // table.push(oobj);
                            hasFilename = true;
                            console.log("\n" + chalk.black.bgYellowBright(" " + counter + " ") + " - " + wantedFileObj[key]['title']);
                            // console.log(table.toString());
                        };
                    }
                    if (!hasFilename) {
                        console.log(chalk.yellow('You don\'t have such a file to add this file use: add ' + args.fileName));
                    }
                    callback();
                });
            });

        /*
         * list command
         */
        vorpal.command('list', 'Lists all available 2dos in currents directory. ')
            .action(function (args, callback) {
                fs.readFile('2do.json', (err, data) => {
                    if (err) throw err;
                    var stringOfJSON = data.toString();
                    var todoObj = JSON.parse(stringOfJSON);
                    // var wantedFileObj = todoObj[args.fileName];
                    var allKeys = [],
                        counter = 0;
                    for (key in todoObj) {
                        if (todoObj.hasOwnProperty(key)) {
                            counter++;
                            allKeys.push(key);
                        };
                    }
                    //using inquirer to show in a list
                    inquirer.prompt([{
                        type: 'list',
                        message: '\n All available files:',
                        name: 'selected',
                        choices: allKeys,
                        validate: function (answer) {
                            if (answer.length < 1) {
                                return 'You must choose at least one topping.';
                            }
                            return true;
                        }
                    }]).then(function (answers) {
                        console.log('\n' + chalk.bold('||| ') + chalk.cyanBright.bold(answers.selected) + chalk.bold(' |||'));
                        var wantedFileObj = todoObj[answers.selected];
                        var counter = 0
                        for (key in wantedFileObj) {
                            if (wantedFileObj.hasOwnProperty(key)) {
                                counter++;
                                console.log("\n" + chalk.black.bgYellowBright(" " + counter + " ") + " - " + wantedFileObj[key]['title'] + "\n");
                            };
                        }
                        callback();

                    });

                });
            });

        /*
         * add command
         */
        vorpal.command('add <fileName> [title]', 'Adds new 2do for a file. ')
            .action(function (args, callback) {

                fs.readFile('2do.json', (err, data) => {
                    if (err) throw err;
                    var stringOfJSON = data.toString();
                    var todoObj = JSON.parse(stringOfJSON);
                    if (todoObj[args.fileName]) {
                        var fileNameObj = todoObj[args.fileName];
                        var size = 0;
                        for (key in fileNameObj) {
                            if (fileNameObj.hasOwnProperty(key)) {
                                size++;
                            }
                        }
                        todoObj[args.fileName][size + 1] = {};
                        todoObj[args.fileName][size + 1]["title"] = args.title;
                        fs.writeFile('2do.json', JSON.stringify(todoObj), (err) => {
                            if (err) throw err;
                            console.log('The file has been saved!');
                            callback();
                        });
                    } else {
                        todoObj[args.fileName] = {};
                        todoObj[args.fileName]["1"] = {};
                        todoObj[args.fileName]["1"]["title"] = args.title;

                        fs.writeFile('2do.json', JSON.stringify(todoObj), (err) => {
                            if (err) throw err;
                            console.log('The file has been saved!');
                            callback();
                        });
                    }
                });
            });

        /*
         * delete command
         */
        vorpal.command('delete <fileName> [todoNumber]', 'Deletes a files\' 2do')
            .action(function (args, callback) {
                fs.readFile('2do.json', (err, data) => {
                    if (err) throw err;
                    var stringOfJSON = data.toString();
                    var todoObj = JSON.parse(stringOfJSON);
                    var wantedFileObj = todoObj[args.fileName];
                    if (!args.todoNumber) {
                        this.prompt({
                                type: 'confirm',
                                name: 'continue',
                                default: false,
                                message: `By doing this all notes related to ${chalk.blue.underline.bold(args.fileName)} will be ${chalk.red.bold('deleted')} , are sure?`,
                            },
                            function (result) {
                                if (result.continue) {
                                    delete todoObj[args.fileName];
                                    fs.writeFile('2do.json', JSON.stringify(todoObj), (err) => {
                                        if (err) throw err;
                                        console.log('The file has been saved!');
                                    });
                                } else {
                                    console.log("Did not delete the file.")
                                }
                            });

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
                            var size = 0,
                                key;
                            for (key in obj) {
                                if (obj.hasOwnProperty(key)) size++;
                            }
                            return size;
                        };
                        var theyKeys = Object.keys(todoObj[args.fileName]);
                        for (var i = 1; i <= Object.size(todoObj[args.fileName]); i++) {
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
            });


        vorpal.command('version', 'Logs current version. ')
            .action(function (args, callback) {
                console.log("Current version is : " + chalk.yellow("1.1.0"));
                callback();
            });

        vorpal.delimiter(chalk.bgWhite.hex('#e65fe2').bold(' 2do ') + ':').show();

    }, 800);
}

module.exports = todoMain;