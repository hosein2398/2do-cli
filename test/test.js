import test from 'ava';
var assert = require('assert');
var todo = require('../lib/2do');

test('should return tasks', async t => {
    var shouldBe = ["This file if only for tests", "how are you?"];
    var retured = await todo.show2doFile({
        fileName: "main.js"
    }, () => {});
    t.deepEqual(shouldBe, retured);
});

test('should return name of the files [list command]', async t => {
    var shouldBe = ["main.js", "somefile.py"];
    var retured = await todo.list2do({}, () => {}, true);
    t.deepEqual(shouldBe, retured);
});

test('should add a todo to .json file [add command]', async t => {
    var add = await todo.add2do({
        fileName: "small.php",
        title: "test for php file"
    }, () => {});
    var list = await todo.list2do({}, () => {}, true);
    //after adding now we hate to test if it's really added to file
    var shouldBe = ["main.js", "somefile.py", "small.php"];
    console.log('sdf');
    t.deepEqual(shouldBe, list);

});

test('should delete a todo in .json file [delete command command]', async t => {
    var list = await todo.delete2do({
        fileName: 'small.php'
    }, () => {},true);
    var list = await todo.list2do({}, () => {}, true);
    //after adding now we hate to test if it's really added to file
    var shouldBe = ["main.js", "somefile.py"];
    console.log('sdf');
    t.deepEqual(shouldBe, list);

});