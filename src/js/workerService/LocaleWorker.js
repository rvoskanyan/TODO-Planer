import LsControl from '../LsControl';

class LocaleWorker {
  constructor() {
    this.worker = new LsControl();
  }

  getLists() {
    return this.worker;
  }

  getListById(id) {
    return this.worker;
  }

  getTasksByListId(listId) {
    return this.worker;
  }

  createList(name, date) {
    this.doer = new LsControl();
  }

  updateList(list) {
    this.doer = new LsControl();
  }

  deleteList(id) {
    this.doer = new LsControl();
  }

  getTaskById() {

  }

  createTask(listId, text) {
    this.doer = new LsControl();
  }

  updateTask(task) {
    this.doer = new LsControl();
  }

  deleteTask(id) {
    this.doer = new LsControl();
  }
}

export default LocaleWorker;
