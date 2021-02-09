const tasks = [
  {
    id: 1,
    text: 'Test',
    done: false,
  },
  {
    id: 2,
    text: 'Test2',
    done: true,
  },
];

const router = (app) => {
  app.get('/', (request, response) => {
    response.send({
      message: 'Node.js and Express RESTfull API',
    });
  });

  app.get('/tasks', (request, response) => {
    response.send({ tasks });
  });
};

module.exports = router;
