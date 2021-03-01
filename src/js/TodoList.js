import DataController from './workerService/DataController';
import Task from './Task';
import { Messages, SystemConstant, textContent } from './constants';

export default class TodoList {
  constructor(id, node, elem = {}, handleDeleteList = undefined) {
    this.id = id;
    this.elem = elem;
    this.node = node;
    this.contentNode = this.node.querySelector('.todo-list-init-content');
    this.examplesTasks = [];
    this.dataController = new DataController();
    this.tasks = [];
    this.handleDeleteList = handleDeleteList;
  }

  createTasks() {
    this.examplesTasks = [];

    if (this.tasks.length) {
      this.tasks.forEach((elem) => {
        this.examplesTasks.push(new Task(
          elem,
          this.contentNode,
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

  renderEdit() {
    const div = document.createElement('div');
    const input = document.createElement('input');
    const control = this.node.querySelector('.todo-list-init-control');
    const saveButton = document.createElement('button');
    const icon = document.createElement('i');

    if (!control) {
      return;
    }

    icon.classList.add('control__icon', 'icon', 'icon-list-save');

    saveButton.classList.add('control__button', 'control__button_save', 'button', 'todo-list-init-content-save-button');
    saveButton.addEventListener('click', this.saveChangeList);
    saveButton.append(icon);

    div.className = 'item-content';

    input.classList.add('item-content__input', 'input', 'init-todo-edit-name-list');

    div.prepend(input);

    this.appendNodeTask(div);

    control.append(saveButton);

    this.dataController.doer.getListById(this.id).then((result) => {
      const dateNode = this.node.querySelector('.todo-list-init-date');

      if (!dateNode) {
        return;
      }

      this.elem = result;

      input.value = result.name;
      input.focus();

      dateNode.valueAsDate = new Date(result.date);
    })
  }

  saveChangeList = () => {
    let name = this.node.querySelector('.init-todo-edit-name-list').value;
    const nodeDate = this.node.querySelector('.todo-list-init-date');

    if (!name || !nodeDate) {
      return;
    }

    const newDate = new Date(nodeDate.value);
    const objectNewDate = new Date(nodeDate.value).toObject();
    const currentDate = new Date(this.elem.date).toObject();

    if (
        currentDate.date !== objectNewDate.date ||
        currentDate.month !== objectNewDate.month ||
        currentDate.year !== objectNewDate.year
    ) {
      name = `${objectNewDate.date}.${objectNewDate.month}.${objectNewDate.year}`

      return this.dataController.doer.updateList({ id: this.id, name, date: newDate.toString() })
          .then(() => document.location.href = '/');
    }

    if (name !== this.elem.name) {
      return this.dataController.doer.updateList({ id: this.id, name, date: newDate.toString() })
          .then(() => document.location.href = '/');
    }

    return document.location.href = '/';
  }

  getNode() {
    const div = document.createElement('div');
    const marker = document.createElement('div');
    const divControls = document.createElement('div');
    const input = document.createElement('div');
    const iconDelete = document.createElement('i');
    const buttonDelete = document.createElement('button');
    const link = document.createElement('a');

    div.className = 'item-content item-content_list';

    divControls.classList.add('content__control', 'inner-control');

    input.classList.add('item-content__input', 'input');

    iconDelete.classList.add('icon', 'icon-trash');

    buttonDelete.classList.add('inner-control__button', 'button');
    buttonDelete.addEventListener('click', () => this.handleDeleteList(this.id));
    buttonDelete.append(iconDelete);

    link.href = `/listTasks/${this.elem.id}`;
    link.text = this.elem.name;
    input.append(link);

    divControls.append(buttonDelete);

    marker.classList.add('marker');
    div.prepend(input);
    div.append(divControls);
    div.append(marker);

    this.node = div;

    return div;
  }

  renderTasks() {
    const newWrapper = document.createElement('div');
    const wrapper = this.contentNode.querySelector('.wrapper');
    const control = this.node.querySelector('.todo-list-init-control');
    const addButton = document.createElement('button');
    const icon = document.createElement('i');

    if (!control) {
      return;
    }

    icon.classList.add('control__icon', 'icon', 'icon-list-add');

    addButton.classList.add('control__button', 'control__button_add', 'button', 'todo-list-init-content-add-button');
    addButton.addEventListener('click', () => this.addTask());
    addButton.append(icon);

    newWrapper.classList.add('list__content', 'wrapper');
    newWrapper.innerText = Messages.NO_TASKS;
    wrapper ? wrapper.replaceWith(newWrapper) : this.contentNode.append(newWrapper);

    control.append(addButton);

    this.dataController.doer.getListById(this.id).then((result) => {
      const titleNode = document.createElement('h2');
      const childNodeTitle = this.contentNode.querySelector('.todo-init-title-container');
      const inputDate = document.createElement('input');

      titleNode.classList.add('todo-list-init-title', 'title');
      titleNode.innerText = result.name;
      titleNode.addEventListener('click', () => this.editNameListOnWrite(titleNode, childNodeTitle));
      childNodeTitle.prepend(titleNode);

      inputDate.setAttribute('type', 'date');
      inputDate.classList.add('input', 'title-select-date');
      inputDate.addEventListener('click', () => this.editNameListOnDate(titleNode, inputDate));
      childNodeTitle.append(inputDate);

      this.elem = result;

      this.dataController.doer.getTasksByListId(this.id).then((result) => {
        if (result.length) {
          newWrapper.remove();

          this.tasks = result;
          this.createTasks();
          this.examplesTasks.forEach((elem) => {
            const taskNode = elem.getNode();

            if (elem.edit) {
              elem.setFocus();
            }

            this.appendNodeTask(taskNode);
          });
        }
      });
    })
  }

  editNameListOnWrite = (node, childNode) => {
    if (node === document.activeElement) {
      return;
    }

    node.setAttribute('contenteditable', '');
    node.focus();
    node.addEventListener('focusout', () => {
      childNode.classList.remove('active');
      node.removeAttribute('contenteditable');
      this.saveNameList(node)
    });

    childNode.classList.add('active');
  }

  editNameListOnDate = (node, date) => {
    date.addEventListener('focusout', () => {
      if (!date.value) {
        return;
      }

      const objectDate = new Date(date.value).toObject();

      node.innerText = `${objectDate.date}.${objectDate.month}.${objectDate.year}`;
      date.value = '';

      this.saveNameList(node);
    });
  }

  saveNameList = (node) => {
    if (node.innerText.length < 3) {
      return console.error(Messages.ERROR_MIN_LENGTH);
    }

    return this.dataController.doer.updateList({ id: this.id, name: node.innerText });
  }

  appendNodeTask(node) {
    const wrapper = this.node.querySelector('.wrapper');

    if (wrapper) {
      return wrapper.append(node);
    }

    const newWrapper = document.createElement('div');

    newWrapper.classList.add('list__content', 'wrapper');
    newWrapper.append(node);

    return this.contentNode.append(newWrapper);
  }

  addTask() {
    const newTask = {
      id: SystemConstant.NEW_TASK_ID,
      text: '',
      done: false,
      edit: true,
    };

    this.tasks.push(newTask);

    const newTaskExample = new Task(
      newTask,
      this.contentNode,
      {
        toggleStatus: this.toggleStatus.bind(this),
        deleteTask: this.deleteTask.bind(this),
        saveChangeTask: this.saveChangeTask.bind(this),
        editTask: this.editTask.bind(this),
      },
    );

    this.examplesTasks.push(newTaskExample);

    const taskNode = newTaskExample.getNode();

    if (this.tasks.length === 1) {
      const wrapper = this.contentNode.querySelector('.wrapper');

      if (wrapper) {
        return;
      }

      wrapper.remove();
    }

    this.appendNodeTask(taskNode);
    newTaskExample.setFocus();
  }

  toggleStatus(id) {
    const index = this.tasks.findIndex((item) => item.id === id);

    if (index === -1) {
      return console.error(Messages.ELEMENT_NOT_FOUND);
    }

    const examplesCurrentTask = this.examplesTasks[index];
    const dataCurrentTask = this.tasks[index];

    dataCurrentTask.done = !dataCurrentTask.done;
    examplesCurrentTask.done = dataCurrentTask.done;
    examplesCurrentTask.toggleClassStatus();

    this.dataController.doer.updateTask({
      id,
      text: dataCurrentTask.text,
      done: dataCurrentTask.done,
    });
  }

  deleteTask(id) {
    const index = this.tasks.findIndex((item) => item.id === id);

    if (index === -1) {
      return console.error(Messages.ELEMENT_NOT_FOUND);
    }
    this.tasks.splice(index, 1);
    this.examplesTasks[index].node.remove();

    if (!this.tasks.length) {
      const newWrapper = document.createElement('div');
      const wrapper = this.contentNode.querySelector('.wrapper');

      newWrapper.classList.add('list__content', 'wrapper');
      newWrapper.innerText = Messages.NO_TASKS;
      wrapper ? wrapper.replaceWith(newWrapper) : this.contentNode.append(newWrapper);
    }

    delete this.examplesTasks[index];
    this.examplesTasks.splice(index, 1);

    this.dataController.doer.deleteTask(id);
  }

  editTask(id) {
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
    if ((!task.id && task.id !== SystemConstant.NEW_TASK_ID) || typeof task.text !== 'string') {
      return console.error(Messages.ERROR_DATA);
    }

    if (
      task.id === SystemConstant.NEW_TASK_ID
        && this.tasks[this.tasks.length - 1].id === SystemConstant.NEW_TASK_ID
    ) {
      if (task.text === '') {
        this.examplesTasks[this.examplesTasks.length - 1].node.remove();
        delete this.examplesTasks[this.examplesTasks.length - 1];
        this.examplesTasks.splice(this.examplesTasks.length - 1, 1);
        this.tasks.splice(this.tasks.length - 1, 1);

        if (!this.tasks.length) {
          const newWrapper = document.createElement('div');
          const wrapper = this.contentNode.querySelector('.wrapper');

          newWrapper.classList.add('list__content', 'wrapper');
          newWrapper.innerText = Messages.NO_TASKS;
          wrapper ? wrapper.replaceWith(newWrapper) : this.contentNode.append(newWrapper);
        }

        return false;
      }

      this.dataController.doer.createTask(this.id, task.text).then((idNewTask) => {
        this.tasks[this.tasks.length - 1].id = idNewTask;
        this.tasks[this.tasks.length - 1].text = task.text;
        this.examplesTasks[this.examplesTasks.length - 1].updateDataTask({
          id: idNewTask,
          text: task.text,
          done: false,
          edit: false,
        });
      });
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

    this.dataController.doer.updateTask({
      ...task,
      done: false,
    });
  }
}
