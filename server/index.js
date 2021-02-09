const express = require('express');
const bodyParser = require('body-parser');

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
