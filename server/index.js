const express = require('express');
const bodyParser = require('body-parser');

const Api = require('./api/Api');
const Constants = require('./Constants');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
  next();
});

const api = new Api(app);

api.initialRouters();

app.listen(port, (err) => {
  if (err) {
    return console.error(Constants.errorStartServerMessage, err);
  }

  return console.info(`${Constants.successStartServerMessage} ${port}`);
});
