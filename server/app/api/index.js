const { Router } = require('express');
const { add, addPlusOne } = require('../util/utils');

const api = Router();

api.get('/add', (req, res) => {
  const { num1, num2 } = req.query;
  const sum = add(+num1, +num2);
  res.status(200).send({ sum: sum });
});

api.get('/addPlusOne', (req, res) => {
  const { num1, num2 } = req.query;
  const sum = addPlusOne(+num1, +num2);
  res.status(200).send({ sum: sum });
});

module.exports = api;
