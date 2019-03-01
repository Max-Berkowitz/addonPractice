const bindings = require('bindings');

module.exports = file => (...args) =>
  new Promise((resolve, reject) => {
    try {
      const func = bindings(file);
      resolve(func.apply(this, args));
    } catch (e) {
      reject(e);
    }
  });
