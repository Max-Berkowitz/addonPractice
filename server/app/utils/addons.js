const cppLoader = require('./cpp/cppLoader');
const pyLoader = require('./python/pyLoader');

const add = cppLoader('add');
const _multiply = pyLoader('multiply');
const explainReturnValue = pyLoader('explainReturnValue');

const multiply = async (num1, num2) => {
  const { product } = await _multiply(JSON.stringify({ num1, num2 }));
  return explainReturnValue(product, 'This is your product');
};

const addPlusOne = async (num1, num2) => {
  const returnStringSplit = (await add(num1, num2)).split(': ');
  return `${returnStringSplit[0]}: ${+returnStringSplit[1] + 1}`;
};

module.exports = { add, addPlusOne, multiply };
