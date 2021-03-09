import DataController from './workerService/DataController';
import Task from './Task';
import { Messages, SystemConstant, textContent, Titles } from './constants';
import { loading } from './utils';

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
    this.query = new Promise((resolve) => resolve());
    this.loaded = false;
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

  getNode() {
    const div = document.createElement('div');
    const marker = document.createElement('div');
    const divControls = document.createElement('div');
    const iconDelete = document.createElement('i');
    const buttonDelete = document.createElement('button');
    const link = document.createElement('a');

    if (this.loaded) {
      const wrapperLoader = document.createElement('div');
      const loader = document.createElement('div');

      loader.classList.add('wrapper-circle-loader__loader');
      wrapperLoader.classList.add('wrapper-circle-loader');
      wrapperLoader.append(loader);
      div.append(wrapperLoader);
    }

    div.className = 'item-content item-content_list';

    divControls.classList.add('content__control', 'inner-control');

    iconDelete.classList.add('icon', 'icon-trash');

    if (!this.loaded) {
      buttonDelete.classList.add('inner-control__button', 'button');
      buttonDelete.addEventListener('click', () => this.handleDeleteList(this.id));
      buttonDelete.append(iconDelete);
      divControls.append(buttonDelete);
    }

    link.classList.add('item-content__input', 'input', 'item-content__input_animate', 'item-content__link');
    link.setAttribute('data-content', this.elem.name);
    link.href = `/listTasks/${this.elem.id}`;
    link.addEventListener('click', (e) => {
      history.pushState(null, null, `/listTasks/${this.elem.id}`);
      e.preventDefault()
      return false;
    });
    link.text = this.elem.name;

    marker.classList.add('marker');
    div.prepend(link);
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
    const addIcon = document.createElement('i');
    const toListButton = document.createElement('button');
    const toListIcon = document.createElement('i');
    const deleteButton = document.createElement('button');
    const deleteIcon = document.createElement('i');

    if (!control) {
      return;
    }

    addIcon.classList.add('control__icon', 'icon', 'icon-list-add');
    toListIcon.classList.add('control__icon', 'icon', 'icon-list-toList');
    deleteIcon.classList.add('control__icon', 'icon', 'icon-trash');

    addButton.classList.add('control__button', 'control__button_add', 'button', 'todo-list-init-content-add-button');
    addButton.addEventListener('click', () => this.addTask());
    addButton.append(addIcon);
    addButton.title = Titles.addTask;

    toListButton.classList.add('control__button', 'control__button_toList', 'button', 'todo-list-init-content-add-button');
    toListButton.addEventListener('click', () => history.pushState(null, null, '/'));
    toListButton.append(toListIcon);
    toListButton.title = Titles.toList;

    deleteButton.classList.add('control__button', 'control__button_delete', 'button', 'todo-list-init-content-add-button');
    deleteButton.addEventListener('click', () => this.deleteList());
    deleteButton.append(deleteIcon);
    deleteButton.title = Titles.deleteList;

    newWrapper.classList.add('list__content', 'wrapper');
    newWrapper.innerText = Messages.NO_TASKS;
    wrapper ? wrapper.replaceWith(newWrapper) : this.contentNode.append(newWrapper);

    control.append(addButton);
    control.append(toListButton);
    control.append(deleteButton);

    this.dataController.doer.getListById(this.id).then((result) => {
      const titleNode = document.createElement('h2');
      const childNodeTitle = this.contentNode.querySelector('.todo-init-title-container');
      const inputDate = document.createElement('input');
      const breadCrumbs = document.createElement('div');
      const linkBreadCrumbs = document.createElement('a');
      const currentPageBreadCrumbs = document.createElement('span');

      currentPageBreadCrumbs.innerText = `/${result.name}`;
      linkBreadCrumbs.innerText = textContent.titleList;
      linkBreadCrumbs.href = '/';
      linkBreadCrumbs.addEventListener('click', (e) => {
        history.pushState(null, null, '/')
        e.preventDefault();
        return false;
      })
      breadCrumbs.classList.add('bread_crumbs');
      breadCrumbs.append(linkBreadCrumbs);
      breadCrumbs.append(currentPageBreadCrumbs);

      this.contentNode.prepend(breadCrumbs);

      titleNode.classList.add('todo-list-init-title', 'title');
      titleNode.innerText = result.name;
      titleNode.addEventListener('click', () => this.editNameListOnWrite(titleNode, childNodeTitle));
      childNodeTitle.prepend(titleNode);
      childNodeTitle.classList.add('wrapper-title_list');
      childNodeTitle.addEventListener('click', () => this.editNameListOnWrite(titleNode, childNodeTitle));

      inputDate.setAttribute('type', 'date');
      inputDate.classList.add('input', 'title-select-date');
      inputDate.addEventListener('click', (e) => {
        this.editNameListOnDate(titleNode, inputDate, childNodeTitle);
        e.stopPropagation();
      });
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
      this.saveNameList(node, childNode)
    });

    childNode.classList.add('active');
  }

  editNameListOnDate = (node, date, childNodeTitle) => {
    date.addEventListener('focusout', () => {
      if (!date.value) {
        return;
      }

      const objectDate = new Date(date.value).toObject();

      node.innerText = `${objectDate.date}.${objectDate.month}.${objectDate.year}`;
      date.value = '';

      this.saveNameList(node, childNodeTitle);
    });
  }

  saveNameList = (node, childNode) => {
    if (node.innerText.length < 3) {
      return console.error(Messages.ERROR_MIN_LENGTH);
    }

    if(node.innerText === this.elem.name) {
      return;
    }

    this.elem.name = node.innerText;

    const wrapperLoader = document.createElement('div');
    const loader = document.createElement('div');

    loader.classList.add('wrapper-circle-loader__loader');
    wrapperLoader.classList.add('wrapper-circle-loader');
    wrapperLoader.append(loader);
    childNode.append(wrapperLoader);

    return this.dataController.doer.updateList({ id: this.id, name: node.innerText }).then(() => {
      this.contentNode.querySelector('.bread_crumbs').querySelector('span').innerText = `/${this.elem.name}`;
      wrapperLoader.remove()
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

    return this.contentNode.append(newWrapper);
  }

  deleteList() {
    loading(true);

    this.dataController.doer.deleteList(this.elem.id).then(() => {
      loading(true);
      location.href = '/';
    });
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

      if (!wrapper) {
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
    const currentNode = examplesCurrentTask.node;

    examplesCurrentTask.loaded = true;

    const newNode = examplesCurrentTask.getNode();

    currentNode.replaceWith(newNode);
    dataCurrentTask.done = !dataCurrentTask.done;
    examplesCurrentTask.done = dataCurrentTask.done;

    this.dataController.doer.updateTask({
      id,
      text: dataCurrentTask.text,
      done: dataCurrentTask.done,
    }).then(() => {
      const currentNode = examplesCurrentTask.node;

      examplesCurrentTask.loaded = false;

      const newNode = examplesCurrentTask.getNode();

      currentNode.replaceWith(newNode);
    });
  }

  deleteTask(id) {
    let index = this.tasks.findIndex((item) => item.id === id);

    if (index === -1) {
      return console.error(Messages.ELEMENT_NOT_FOUND);
    }

    const examplesCurrentTask = this.examplesTasks[index];
    const currentNode = examplesCurrentTask.node;

    examplesCurrentTask.loaded = true;

    const newNode = examplesCurrentTask.getNode();

    currentNode.replaceWith(newNode);

    this.query = this.query.then(() => {
      this.dataController.doer.deleteTask(id).then(() => {
        index = this.tasks.findIndex((item) => item.id === id);
        this.tasks.splice(index, 1);
        this.examplesTasks[index].node.remove();
        delete this.examplesTasks[index];
        this.examplesTasks.splice(index, 1);

        if (!this.tasks.length) {
          const newWrapper = document.createElement('div');
          const wrapper = this.contentNode.querySelector('.wrapper');

          newWrapper.classList.add('list__content', 'wrapper');
          newWrapper.innerText = Messages.NO_TASKS;
          wrapper ? wrapper.replaceWith(newWrapper) : this.contentNode.append(newWrapper);
        }
      })
    });
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

      const examplesCurrentTask = this.examplesTasks[this.examplesTasks.length - 1];
      const currentNode = examplesCurrentTask.node;
      const index = this.tasks.length - 1;

      examplesCurrentTask.loaded = true;

      const newNode = examplesCurrentTask.getNode();

      currentNode.replaceWith(newNode);

      this.dataController.doer.createTask(this.id, task.text).then((idNewTask) => {
        const currentNode = examplesCurrentTask.node;

        examplesCurrentTask.loaded = false;

        const newNode = examplesCurrentTask.getNode();

        currentNode.replaceWith(newNode);

        this.tasks[index].id = idNewTask;
        this.tasks[index].text = task.text;
        this.examplesTasks[index].updateDataTask({
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

    const currentNode = exampleCurrentTask.node;

    exampleCurrentTask.loaded = true;

    const newNodeLoaded = exampleCurrentTask.getNode();

    currentNode.replaceWith(newNodeLoaded);

    if (task.text === '') {
      return this.deleteTask(task.id);
    }

    this.dataController.doer.updateTask({
      ...task,
      done: false,
    }).then(() => {
      const oldNode = exampleCurrentTask.node;

      dataCurrentTask.edit = false;
      dataCurrentTask.done = false;
      dataCurrentTask.text = task.text;
      exampleCurrentTask.edit = false;
      exampleCurrentTask.done = false;
      exampleCurrentTask.loaded = false;

      const newNode = exampleCurrentTask.getNode();

      oldNode.replaceWith(newNode);
    });
  }
}
