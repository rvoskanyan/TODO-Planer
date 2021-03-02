const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const Api = require('./api/Api');
const Constants = require('./Constants');

const app = express();
const port = 3000;

async function moveFile() {
  await fetch('https://cloud-api.yandex.net/v1/disk/resources/upload?path=db.json&overwrite=true', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'OAuth AgAAAABRyQXlAAbwRkgvjv5BB0FQt4O-gSZhn00',
    },
    mode: 'cors',
  }).then((response) => response.json()).then(async (result) => {
    const data = fs.readFileSync(path.resolve(__dirname, '../public/db.json'));

    await fetch(`${result.href}`, {
      headers: {
        'Content-Type': 'form-data',
      },
      mode: 'cors',
      method: result.method,
      body: data,
    });
  });

  fetch('https://cloud-api.yandex.net/v1/disk/resources/download?path=db.json', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'OAuth AgAAAABRyQXlAAbwRkgvjv5BB0FQt4O-gSZhn00',
    },
    mode: 'cors',
  }).then((response) => response.json()).then((result) => {
    fetch(result.href).then((res) => {
      res.body.pipe(fs.createWriteStream(path.resolve(__dirname, 'db.json')));
    });
  });
}

moveFile();

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
