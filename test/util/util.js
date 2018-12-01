/* istanbul ignore file */
const fs = require('fs');
const util = require('util');

const jsonSample = `
{
  "add.js": {
    "1": {
      "title": "throw error when message is not set when adding a file to prevent mistakes",
      "status": "undone"
    },
    "2": {
      "title": "second todo for tests",
      "status": "undone"
    }
  },
  "list.js": {
    "1": {
      "title": "should remove testMode param in future",
      "status": "undone"
    }
  }
}
`;

const readFile = util.promisify(fs.readFile);

async function readJson() {
  const data = await readFile('2do.json', 'UTF-8');
  return data;
}

function createConfig() {
  fs.writeFile('2do.json', jsonSample, (err) => {
    if (err) throw err;
  });
}

function removeConfig() {
  fs.unlink('2do.json',function(e){
    if(e) console.log('EEEe'+e);
    console.log('removedddd')
  });
}
const nothing = () => {};

module.exports = {
  readJson,
  nothing,
  createConfig,
  removeConfig,
};
