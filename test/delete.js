const tap = require('tap');
const rm = require('../lib/delete');
const fs = require('fs');
/* istanbul ignore file */
const { nothing, readJson, createConfig, removeConfig } = require('./util/util.js');


createConfig();

tap.test('remove', async (t) => {
  await t.test('wefwe', async (t) => {
    await rm({
      fileName: 'add.js',
      todoNumber: 2,
    }, nothing);
    t.matchSnapshot(await readJson(), 'output remove');
    t.end();
  });

  removeConfig();
  t.end();
});
