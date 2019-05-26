const { spawn } = require('child_process');
const axios = require('axios');
const genPassword = require('./genPassword');

let pyPort;
let password;
const send = axios.create({ baseURL: `http://${process.env.HOST || '127.0.0.1'}:5000` });

module.exports = {
  write: (endPoint, params = {}) => send(endPoint, { params: { password, ...params } }),
  connected: false,
  connect() {
    password = genPassword();
    return (
      this.connected ||
      new Promise((resolve, reject) => {
        pyPort = spawn('python.exe', [`${__dirname}/pyPort.py`, password]);

        pyPort.stdout.on('data', data => {
          if (this.connected) return;
          this.connected = true;
          resolve(String.fromCharCode.apply(null, data));
        });

        pyPort.stderr.on('data', data => {
          if (this.connected) return;
          reject(String.fromCharCode.apply(null, data));
        });
      })
    );
  },
  async disconnect() {
    if (!this.connected) return;
    await this.write('/shutdown', { params: { password } });
    await new Promise(resolve => {
      pyPort.on('close', resolve);
      pyPort.kill();
    });
    this.connected = false;
    pyPort = null;
  },
  async clearHistory() {
    await this.disconnect();
    await this.connect();
  },
};
