const { Router } = require('express');
const { add, addPlusOne, multiply } = require('../utils/addons');

const api = Router();

api.get('/add', async (req, res) => {
  const { num1, num2 } = req.query;
  const sum = await add(+num1, +num2);
  res.status(200).send({ sum });
});

api.get('/multiply', async (req, res) => {
  const { num1, num2 } = req.query;
  if (num1 === 'Infinity' || num2 === 'Infinity') {
    res.status(200).send({ product: 'This is your product: NaN' });
  } else {
    const product = await multiply(+num1, +num2);
    res.status(200).send({ product });
  }
});

api.get('/addPlusOne', async (req, res) => {
  const { num1, num2 } = req.query;
  const sum = await addPlusOne(+num1, +num2);
  res.status(200).send({ sum });
});

module.exports = api;
