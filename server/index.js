const express = require('express');
const bodyParser = require('body-parser');
const alasql = require('alasql');

alasql('CREATE TABLE tasks (id INT, text STRING, done BOOLEAN)');
alasql("INSERT INTO tasks VALUES (1, 'Task Test!', true)");
alasql("INSERT INTO tasks VALUES (2, 'Go to work!', false)");
alasql("INSERT INTO tasks VALUES (3, 'Lunch!', true)");

const results = alasql('SELECT * FROM tasks WHERE id > 1');

console.log(results);

const routes = require('./routes/routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

routes(app);

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  return console.log(`server is listening on ${port}`);
});
