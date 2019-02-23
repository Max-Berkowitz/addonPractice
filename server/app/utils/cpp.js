const b = require('bindings');

const add = b('add');

const addPlusOne = (num1, num2) => {
  const returnStringSplit = add(num1, num2).split(': ');
  return `${returnStringSplit[0]}: ${+returnStringSplit[1] + 1}`;
};

module.exports = { add, addPlusOne };
