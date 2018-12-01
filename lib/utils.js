const util = require('util');
const fs = require('fs');

// promisified readFile
const readFile = util.promisify(fs.readFile);
// promisified writeFile
const writeFilePromise = util.promisify(fs.writeFile);

/**
 * short way of cloning an object
 */
function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * renames property of an object
 */
function renameProp(obj, oldName, newName) {
  const clonedObject = cloneObject(obj);
  delete clonedObject[oldName];
  clonedObject[newName] = { ...obj[oldName] };
  console.log(clonedObject);
  return clonedObject;
}

/**
 * becase we use this function inside of a
 * async function it has to be async
 */
async function writeFile(obj, msg, callback) {
  await writeFilePromise('2do.json', JSON.stringify(obj, null, 2));
  console.log(msg);
  callback();
}

module.exports = {
  writeFile,
  readFile,
  renameProp,
  cloneObject,
};
