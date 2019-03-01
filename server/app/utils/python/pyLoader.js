const { spawn } = require('child_process');

module.exports = file => (...args) =>
  new Promise((resolve, reject) => {
    let response;
    let error;

    const python = spawn('python.exe', [`${__dirname}/${file}.py`, ...args]);

    python.stdout.on('data', data => {
      response = JSON.parse(String.fromCharCode.apply(null, data));
    });

    python.stderr.on('data', data => {
      error = String.fromCharCode.apply(null, data);
    });

    python.on('exit', () => (error ? reject(error) : resolve(response)));
  });
