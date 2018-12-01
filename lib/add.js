const { writeFile, readFile } = require('./utils');

/**
 *  Adds a 2do to file
 *  @param {object} args - arguments passed in terminal
 *  @param {function} callback - callback function (for vorpal)
 */
async function add2do(args, callback) {
  const data = await readFile('2do.json', 'UTF-8');
  const todoObj = JSON.parse(data);
  if (todoObj[args.fileName]) {
    const fileNameObj = todoObj[args.fileName];
    const size = Object.keys(fileNameObj).length;
    todoObj[args.fileName][size + 1] = {};
    todoObj[args.fileName][size + 1].title = args.title;
    todoObj[args.fileName][size + 1].status = 'undone';
    await writeFile(todoObj, '\n 🏄‍ todo added successfully! \n', callback);
  } else {
    todoObj[args.fileName] = {};
    todoObj[args.fileName]['1'] = {};
    todoObj[args.fileName]['1'].title = args.title;
    todoObj[args.fileName]['1'].status = 'undone';
    await writeFile(todoObj, '\n 🏄‍ todo added successfully! \n', callback);
  }
}

module.exports = add2do;
