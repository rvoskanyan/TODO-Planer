import { loading } from '../utils';
import { API_PREFIX, SERVER_ADDRESS } from '../constants';
import Postman from '../Postman';

class ServerWorker {
  constructor() {
    this.worker = new Postman(SERVER_ADDRESS, API_PREFIX);
  }

  getLists() {
    loading(true);

    return this.worker.get('list')
      .then((result) => {
        loading(false);

        return result.list;
      });
  }

  getListById(id) {
    loading(true);

    return this.worker.get(`list/${id}`)
      .then((result) => {
        loading(false);

        return result.list[0];
      });
  }

  getTasksByListId(listId) {
    loading(true);

    return this.worker.get(`list/${listId}/tasks`)
      .then((result) => {
        loading(false);

        return result.list;
      });
  }

  createList(name, date) {
    loading(true);

    return this.worker.post('list', { name, date }).then((result) => {
      loading(false);

      return result.id;
    });
  }

  updateList(list) {
    loading(true);

    return this.worker.put(`list/${list.id}`, list).then((result) => {
      loading(false);

      return result;
    });
  }

  deleteList(id) {
    loading(true);

    return this.worker.delete(`list/${id}`).then((result) => {
      loading(false);

      return result;
    });
  }

  getTaskById() {

  }

  createTask(listId, text) {
    loading(true);

    return this.worker.post('task', { listId, text }).then((result) => {
      loading(false);

      return result.id;
    });
  }

  updateTask(task) {
    loading(true);

    return this.worker.put(`task/${task.id}`, task).then((result) => {
      loading(false);

      return result;
    });
  }

  deleteTask(id) {
    loading(true);

    return this.worker.delete(`task/${id}`).then((result) => {
      loading(false);

      return result;
    });
  }
}

export default ServerWorker;
