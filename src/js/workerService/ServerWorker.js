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
    return this.worker.put(`list/${list.id}`, list);
  }

  deleteList(id) {
    return this.worker.delete(`list/${id}`);
  }

  getTaskById() {

  }

  createTask(listId, text) {
    return this.worker.post('task', { listId, text });
  }

  updateTask(task) {
    return this.worker.put(`task/${task.id}`, task);
  }

  deleteTask(id) {
    return this.worker.delete(`task/${id}`);
  }
}

export default ServerWorker;
