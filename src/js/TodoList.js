import Task from './Task';
import { Messages, SystemConstant } from './constants';

export default class TodoList {
  constructor(state, node, lsControl, childNode, postman) {
    this.node = node;
    this.childNode = childNode;
    this.lsControl = lsControl;
    this.tasks = state.tasks;
    this.examplesTasks = [];
    this.nodesTasks = [];
    this.postman = postman;

    this.createTasks();
    this.renderList();
    this.initDate();

    postman.put('list/884caac808cd269a8b1456ab92669ee5', {
      date: new Date().toString(),
    });
  }

  set testQueryTasks(value) {
    console.log(`Перерисовываем список задач с новыми данными: '${value.message}'`);

    return true;
  }

  createTasks() {
    this.examplesTasks = [];

    if (this.tasks.length) {
      this.tasks.forEach((elem) => {
        this.examplesTasks.push(new Task(
          elem,
          this.node,
          {
            toggleStatus: this.toggleStatus.bind(this),
            deleteTask: this.deleteTask.bind(this),
            saveChangeTask: this.saveChangeTask.bind(this),
            editTask: this.editTask.bind(this),
          },
        ));
      });
    }
  }

  initDate() {
    const nodeDate = this.childNode.querySelector('.todo-list-init-date');

    nodeDate.valueAsDate = new Date(this.lsControl.getDate());
    nodeDate.addEventListener('change', () => {
      this.lsControl.setDate(new Date(nodeDate.value));
    });
  }

  renderList() {
    const noTasks = document.createElement('div');
    const wrapper = this.node.querySelector('.wrapper');
    const newWrapper = document.createElement('div');

    noTasks.innerText = Messages.NO_TASKS;
    this.noTasks = noTasks;
    this.nodesTasks = [];

    newWrapper.classList.add('list__content', 'wrapper');
    wrapper ? wrapper.replaceWith(newWrapper) : this.node.append(newWrapper);

    if (!this.examplesTasks.length) {
      return this.appendNodeTask(this.noTasks);
    }

    return this.examplesTasks.forEach((elem) => {
      const taskNode = elem.getNode();

      if (elem.edit) {
        elem.setFocus();
      }

      this.appendNodeTask(taskNode);
      this.nodesTasks.push(taskNode);
    });
  }

  appendNodeTask(node) {
    const wrapper = this.node.querySelector('.wrapper');

    if (wrapper) {
      return wrapper.append(node);
    }

    const newWrapper = document.createElement('div');

    newWrapper.classList.add('list__content', 'wrapper');
    newWrapper.append(node);

    return this.node.append(newWrapper);
  }

  addTask() {
    const newTask = {
      id: SystemConstant.NEW_TASK_ID,
      text: '',
      done: false,
      edit: true,
    };
    const newTasks = [...this.tasks];

    newTasks.push(newTask);

    this.tasks = newTasks;

    const newTaskExample = new Task(
      newTask,
      this.node,
      {
        toggleStatus: this.toggleStatus.bind(this),
        deleteTask: this.deleteTask.bind(this),
        saveChangeTask: this.saveChangeTask.bind(this),
        editTask: this.editTask.bind(this),
      },
    );

    this.examplesTasks.push(newTaskExample);

    const taskNode = newTaskExample.getNode();

    this.nodesTasks.push(taskNode);

    this.appendNodeTask(taskNode);
    newTaskExample.setFocus();
  }

  toggleStatus(id) {
    if (!Number.isInteger(id)) {
      return console.error(Messages.ERROR_ID);
    }

    const index = this.tasks.findIndex((item) => item.id === id);

    if (index === -1) {
      return console.error(Messages.ELEMENT_NOT_FOUND);
    }

    const examplesCurrentTask = this.examplesTasks[index];
    const dataCurrentTask = this.tasks[index];

    dataCurrentTask.done = !dataCurrentTask.done;
    examplesCurrentTask.done = dataCurrentTask.done;
    examplesCurrentTask.toggleClassStatus();

    return this.lsControl.editTask({
      id,
      done: dataCurrentTask.done,
    });
  }

  deleteTask(id) {
    if (!Number.isInteger(id)) {
      return console.error(Messages.ERROR_ID);
    }

    const index = this.tasks.findIndex((item) => item.id === id);

    if (index === -1) {
      return console.error(Messages.ELEMENT_NOT_FOUND);
    }
    this.tasks.splice(index, 1);
    this.examplesTasks[index].node.remove();
    delete this.examplesTasks[index];
    this.examplesTasks.splice(index, 1);
    this.nodesTasks.splice(index, 1);

    return this.lsControl.deleteTask(id);
  }

  editTask(id) {
    if (!Number.isInteger(id)) {
      return console.error(Messages.ERROR_ID);
    }

    const index = this.tasks.findIndex((item) => item.id === id);

    if (index === -1) {
      return console.error(Messages.ELEMENT_NOT_FOUND);
    }

    const exampleCurrentTask = this.examplesTasks[index];

    this.tasks[index].edit = true;
    exampleCurrentTask.edit = true;

    const oldNode = exampleCurrentTask.node;
    const newNode = exampleCurrentTask.getNode();

    oldNode.replaceWith(newNode);

    return exampleCurrentTask.setFocus();
  }

  saveChangeTask(task) {
    if ((!Number.isInteger(task.id) && task.id !== SystemConstant.NEW_TASK_ID) || typeof (task.text) !== 'string') {
      return console.error(Messages.ERROR_DATA);
    }
    if (
      task.id === SystemConstant.NEW_TASK_ID
            && this.tasks[this.tasks.length - 1].id === SystemConstant.NEW_TASK_ID
    ) {
      if (task.text === '') {
        this.nodesTasks[this.nodesTasks.length - 1].remove();
        delete this.examplesTasks[this.examplesTasks.length - 1];
        this.examplesTasks = this.examplesTasks.splice(this.examplesTasks.length - 1, 1);
        this.nodesTasks = this.nodesTasks.splice(this.examplesTasks.length - 1, 1);

        return false;
      }

      const idNewTask = this.lsControl.addTask({
        text: task.text,
        done: false,
      });

      this.tasks[this.tasks.length - 1].id = idNewTask;
      this.tasks[this.tasks.length - 1].text = task.text;
      this.examplesTasks[this.examplesTasks.length - 1].updateDataTask({
        id: idNewTask,
        text: task.text,
        done: false,
        edit: false,
      });

      const newNodeTask = this.examplesTasks[this.examplesTasks.length - 1].getNode();

      this.nodesTasks[this.nodesTasks.length - 1].replaceWith(newNodeTask);
      this.nodesTasks[this.nodesTasks.length - 1] = newNodeTask;

      return true;
    }

    const index = this.tasks.findIndex((item) => item.id === task.id);

    if (index === -1) {
      const indexExample = this.examplesTasks.findIndex((item) => item.id === task.id);
      const oldNode = this.examplesTasks[indexExample].node;

      this.examplesTasks[indexExample].edit = false;

      const newNode = this.examplesTasks[indexExample].getNode();

      oldNode.replaceWith(newNode);

      return console.error(Messages.NOT_SAVE);
    }

    const dataCurrentTask = this.tasks[index];
    const exampleCurrentTask = this.examplesTasks[index];

    if (task.text === dataCurrentTask.text) {
      const oldNode = exampleCurrentTask.node;

      dataCurrentTask.edit = false;
      exampleCurrentTask.edit = false;

      const newNode = exampleCurrentTask.getNode();

      return oldNode.replaceWith(newNode);
    }

    if (task.text === '') {
      return this.deleteTask(task.id);
    }

    const oldNode = exampleCurrentTask.node;

    dataCurrentTask.edit = false;
    dataCurrentTask.done = false;
    exampleCurrentTask.edit = false;
    exampleCurrentTask.done = false;

    const newNode = exampleCurrentTask.getNode();

    oldNode.replaceWith(newNode);

    return this.lsControl.editTask({
      ...task,
      done: false,
    });
  }
}
