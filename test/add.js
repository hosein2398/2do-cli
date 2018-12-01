const tap = require('tap');
const add = require('../lib/add');
/* istanbul ignore file */
const {nothing,readJson,createConfig,removeConfig,} = require('./util/util.js');

createConfig();

tap.test('ssefse', async (t) => {
  await t.test('wefwe', async (t) => {
    await add({
      fileName: 'sooo.js',
      title: 'just testing the add method.',
    }, nothing);
    t.matchSnapshot(await readJson(), 'output');
    t.end();
  });

  await t.test('should add todo to already existing name(file)', async (t) => {
    await add({
      fileName: 'list.js',
      title: 'just testing the add to existing method.',
    }, nothing);
    t.matchSnapshot(await readJson(), 'output');
    t.end();
  });

  removeConfig();
  t.end();
});
