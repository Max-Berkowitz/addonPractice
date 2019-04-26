const cppLoader = require('./cpp/cppLoader');
const pyLoader = require('./python/pyLoader');
const pyPort = require('./pythonServer/pyPort');

const _add = cppLoader('add');
const _multiply = pyLoader('multiply');
const explainReturnValue = pyLoader('explainReturnValue');

const add = async (num1, num2) => {
  const sum = await _add(num1, num2);
  await pyPort.write('/store', { equation: `${num1} + ${num2} = ${sum.split(': ')[1]}` });
  return sum;
};

const multiply = async (num1, num2) => {
  const { product } = await _multiply(JSON.stringify({ num1, num2 }));
  await pyPort.write('/store', { equation: `${num1} X ${num2} = ${product}` });
  return explainReturnValue(product, 'This is your product');
};

const addPlusOne = async (num1, num2) => {
  const returnStringSplit = (await _add(num1, num2)).split(': ');
  const newSum = +returnStringSplit[1] + 1;
  await pyPort.write('/store', { equation: `${num1} + ${num2} + 1 = ${newSum}` });
  return `${returnStringSplit[0]}: ${newSum}`;
};

module.exports = { add, addPlusOne, multiply };
