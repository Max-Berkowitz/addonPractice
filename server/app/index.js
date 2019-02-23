const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const api = require('./api/index');

const config = process.env.NODE_ENV === 'production' ? process.env : require('../../config/config');

const app = express();

app.disable('x-powered-by');

app.use(
  session({
    secret: config.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // one hour
    },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(`${__dirname}/../../client/dist/`));

app.use('/api', api);

// Ping setup

let ping = false;

const gracefulShutdown = async () => {
  // await port.disconnect()
  // await new Promise(resolve => db.connection.close(false, resolve))
  process.exit();
};

const timedExit = async () => {
  if (!ping) gracefulShutdown();
  else {
    ping = false;
    setTimeout(timedExit, 2000);
  }
};

setTimeout(timedExit, 10000); // starts on server start

app.post('/ping', (req, res) => {
  ping = true;
  res.sendStatus(201);
});

module.exports = app;
