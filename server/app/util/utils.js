const b = require('bindings');

const add = b('add');

const addPlusOne = (num1, num2) => add(num1, num2) + 1;

module.exports = { add, addPlusOne };
