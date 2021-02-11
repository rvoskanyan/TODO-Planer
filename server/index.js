const express = require('express');
const bodyParser = require('body-parser');

const Api = require('./api/Api');

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
    return console.error('something bad happened', err);
  }

  return console.info(`server is listening on ${port}`);
});
