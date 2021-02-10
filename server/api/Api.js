class Api {
  constructor(app) {
    this.prefix = '/api/';
    this.app = app;
    this.initialRouters();
  }

  initialRouters() {
    this.app.get(`${this.prefix}list`, (request, response) => this.getList(request, response));
    this.app.get(`${this.prefix}list/:id`, (request, response) => this.getListById(request, response));
    this.app.get(`${this.prefix}list/:id/tasks`, (request, response) => this.getTaskListById(request, response));
    this.app.post(`${this.prefix}list`, (request, response) => this.createList(request, response));
    this.app.put(`${this.prefix}list/:id`, (request, response) => this.editList(request, response));
    this.app.delete(`${this.prefix}list/:id`, (request, response) => this.deleteList(request, response));

    this.app.get(`${this.prefix}task/:id`, (request, response) => this.getTaskById(request, response));
    this.app.post(`${this.prefix}task`, (request, response) => this.createTask(request, response));
    this.app.put(`${this.prefix}task/:id`, (request, response) => this.editTask(request, response));
    this.app.delete(`${this.prefix}task/:id`, (request, response) => this.deleteTask(request, response));
  }

  getList(request, response) {
    response.send({
      message: 'Запрос на получение всех листов',
    });
  }

  getListById(request, response) {
    response.send({
      message: `Запрос на получение листа с id ${request.params.id}`,
    });
  }

  getTaskListById(request, response) {
    response.send({
      message: `Запрос на получение списка задач листа с id ${request.params.id}`,
    });
  }

  createList(request, response) {
    response.send({
      message: 'Запрос на создание нового листа',
    });
  }

  editList(request, response) {
    response.send({
      message: `Запрос на редактирование листа с id ${request.params.id}`,
    });
  }

  deleteList(request, response) {
    response.send({
      message: `Запрос на удаление листа с id ${request.params.id}`,
    });
  }

  getTaskById(request, response) {
    response.send({
      message: `Запрос на получение задачи с id ${request.params.id}`,
    });
  }

  createTask(request, response) {
    response.send({
      message: `Запрос на создание задачи с текстом ${request.body.text}`,
    });
  }

  editTask(request, response) {
    response.send({
      message: `Запрос на редактирование задачи с id ${request.params.id}`,
    });
  }

  deleteTask(request, response) {
    response.send({
      message: `Запрос на удаление задачи с id ${request.params.id}`,
    });
  }
}

module.exports = Api;
