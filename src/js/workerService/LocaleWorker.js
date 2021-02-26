import LsControl from '../LsControl';

class LocaleWorker {
  getLists() {
    this.doer = new LsControl();
  }

  getListById(id) {
    this.doer = new LsControl();
  }

  getTasksByListId(listId) {
    this.doer = new LsControl();
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
