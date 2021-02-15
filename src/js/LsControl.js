import { lsKeyApp } from './constants';

export default class LsControl {
  requestedData = {}

  constructor() {
    if (!LsControl._instance) {
      LsControl._instance = this;
    }
    return LsControl._instance;
  }

  static getInstance() {
    return this._instance;
  }

  getDataByLsKey(key) {
    if (this.requestedData[key]) {
      return this.requestedData[key];
    }

    return this.requestedData[key] = this.parseState(localStorage.getItem(key), 'from');
  }

  getItemByField(field, value, lsKey) {

  }

  createItem(data, lsKey) {

  }

  updateItem(data, lsKey) {

  }

  deleteItem(id, lsKey) {

  }

  getCurrentState() {
    const state = this.parseState(localStorage.getItem(lsKeyApp), 'from');

    if (state) return state;

    this.initialStartState();

    return this.getCurrentState();
  }

  initialStartState() {
    localStorage.setItem(lsKeyApp, this.parseState({
      date: new Date(),
      tasks: [],
      nextId: 1,
    }, 'to'));
  }

  getDate() {
    return this.date ? this.date : new Date();
  }

  setDate(date) {
    this.date = date;
    this.updateLs();
  }

  parseState(state, direction) {
    if (direction === 'from') return JSON.parse(state);
    if (direction === 'to') return JSON.stringify(state);

    return state;
  }

  updateLs(lsKey) {
    localStorage.setItem(lsKey, this.parseState(this.requestedData[lsKey], 'to'));
  }

  getListTasks() {
    return this.tasks.map((elem) => ({ ...elem }));
  }

  addTask(task) {
    const newTask = {
      ...task,
      id: this.nextId,
    };

    this.tasks.push(newTask);
    this.nextId++;

    this.updateLs();

    return newTask.id;
  }

  deleteTask(id) {
    this.tasks.splice(this.tasks.findIndex((item) => item.id === id), 1);
    this.updateLs();
  }

  editTask(task) {
    const index = this.tasks.findIndex((item) => item.id === task.id);

    this.tasks[index] = {
      ...this.tasks[index],
      ...task,
    };
    this.updateLs();
  }
}
