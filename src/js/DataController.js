import Postman from './Postman';
import LsControl from './LsControl';
import { loading } from './utils';

export default class DataController {
  constructor(worker = 'locale') {
    if (!DataController._instance) {
      this.worker = worker;

      switch (worker) {
        case 'server': {
          this.doer = new Postman('http://localhost:3000', '/api/');
          break;
        }
        case 'locale': {
          this.doer = new LsControl();
          break;
        }
        default: break;
      }

      DataController._instance = this;
    }

    return DataController._instance;
  }

  static getInstance() {
    return this._instance;
  }

  getLists() {
    switch (this.worker) {
      case 'server': {
        loading(true);

        return this.doer.get('list')
          .then((result) => {
            loading(false);

            return result.list;
          });
      }
      case 'locale': {
        this.doer = new LsControl();
        break;
      }
      default: break;
    }
  }

  getListById(id) {
    switch (this.worker) {
      case 'server': {
        loading(true);

        return this.doer.get(`list/${id}`)
            .then((result) => {
              loading(false);

              return result.list[0];
            });
      }
      case 'locale': {
        this.doer = new LsControl();
        break;
      }
      default: break;
    }
  }

  getTasksByListId(listId) {
    switch (this.worker) {
      case 'server': {
        loading(true);

        return this.doer.get(`list/${listId}/tasks`)
          .then((result) => {
            loading(false);

            return result.list;
          });
      }
      case 'locale': {
        this.doer = new LsControl();
        break;
      }
      default: break;
    }
  }

  createList(name, date) {
    switch (this.worker) {
      case 'server': {
        loading(true);

        return this.doer.post('list', { name, date }).then((result) => {
          loading(false);

          return result.id;
        });
      }
      case 'locale': {
        this.doer = new LsControl();
        break;
      }
      default: break;
    }
  }

  updateList(list) {
    switch (this.worker) {
      case 'server': {
        loading(true);

        return this.doer.put(`list/${list.id}`, list).then((result) => {
          loading(false);

          return result;
        });
      }
      case 'locale': {
        this.doer = new LsControl();
        break;
      }
      default: break;
    }
  }

  deleteList(id) {
    switch (this.worker) {
      case 'server': {
        loading(true);

        return this.doer.delete(`list/${id}`).then((result) => {
          loading(false);

          return result;
        });
      }
      case 'locale': {
        this.doer = new LsControl();
        break;
      }
      default: break;
    }
  }

  getTaskById() {

  }

  createTask(listId, text) {
    switch (this.worker) {
      case 'server': {
        loading(true);

        return this.doer.post('task', { listId, text }).then((result) => {
          loading(false);

          return result.id;
        });
      }
      case 'locale': {
        this.doer = new LsControl();
        break;
      }
      default: break;
    }
  }

  updateTask(task) {
    switch (this.worker) {
      case 'server': {
        loading(true);

        return this.doer.put(`task/${task.id}`, task).then((result) => {
          loading(false);

          return result;
        });
      }
      case 'locale': {
        this.doer = new LsControl();
        break;
      }
      default: break;
    }
  }

  deleteTask(id) {
    switch (this.worker) {
      case 'server': {
        loading(true);

        return this.doer.delete(`task/${id}`).then((result) => {
          loading(false);

          return result;
        });
      }
      case 'locale': {
        this.doer = new LsControl();
        break;
      }
      default: break;
    }
  }
}
