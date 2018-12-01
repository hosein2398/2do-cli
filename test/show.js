// const tap = require('tap');
// const add = require('../lib/show');
// /* istanbul ignore file */
// const {
//     nothing,
//     readJson,
//     createConfig,
//     removeConfig
// } = require('./util/util.js');

// createConfig();

// tap.test('Show', async (t) => {

//       await t.test('wefwe', async (t) => {
//     const p = t.spawn('echo' ,['shit']);
//     console.log('holy')
//     const p = await t.spawn('node', ['-e', 'require("../lib/show.js")({fileName:"d"})']);
//     process.argv.forEach(function (val, index, array) {
//         console.log(index + ': ' + val);
//       });
//     const e = t.stdin('oops');
//     console.log('spaaaaaaaawnn');
//     console.log(p);
//     t.equal(p, `\n 🚨 You don't have such a name in your todos: d \n`)
//         await add({
//           fileName: 'sooo.js',
//           title: 'just testing the add method.',
//         }, nothing);
//         t.matchSnapshot(await readJson(), 'output');
//         t.end();
//       });

//     removeConfig();
//     t.end();
// });