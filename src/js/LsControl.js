import { lsKeyApp, resultMessages } from './constants';

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

  getDataByLsKey(lsKey) {
    return this.requestedData[lsKey] ?
        this.requestedData[lsKey] :
        this.requestedData[lsKey] = this.parseState(localStorage.getItem(lsKey), 'from')
  }

  getItemsByFieldValue(field, value, lsKey) {
    if (!this.requestedData[lsKey]) {
      const result = this.parseState(localStorage.getItem(lsKey), 'from')
      if (result) {
        this.requestedData[lsKey] = result;
      }

      return;
    }

    return this.requestedData[lsKey].filter((item) => item[field] === value)
  }

  createItem(dataItem, lsKey) {
    if (!this.requestedData[lsKey]) {
      const result = this.parseState(localStorage.getItem(lsKey), 'from')
      if (result) {
        this.requestedData[lsKey] = result;
      }

      return;
    }

    const date = new Date().toString();

    this.requestedData[lsKey].push({
      ...dataItem,
      id: date.hashCode(),
      dateCreate: date,
      dateUpdate: date
    });
    this.updateLs(lsKey);

    return this.requestedData[lsKey].id;
  }

  updateItem(dataItem, lsKey) {
    if (!this.requestedData[lsKey]) {
      const result = this.parseState(localStorage.getItem(lsKey), 'from')
      if (result) {
        this.requestedData[lsKey] = result;
      }

      return;
    }

    const indexItem = this.requestedData[lsKey].findIndex((item) => item.id === dataItem.id);

    if (indexItem === undefined) {
      return resultMessages.error;
    }

    this.requestedData[lsKey][indexItem] = {
      ...this.requestedData[lsKey][indexItem],
      ...dataItem,
      dateUpdate: new Date().toString()
    };
    this.updateLs(lsKey);

    return resultMessages.success;
  }

  deleteItem(idItem, lsKey) {
    if (!this.requestedData[lsKey]) {
      const result = this.parseState(localStorage.getItem(lsKey), 'from')
      if (result) {
        this.requestedData[lsKey] = result;
      }

      return;
    }

    const indexItem = this.requestedData[lsKey].findIndex((item) => item.id === idItem);

    if (indexItem === undefined) {
      return resultMessages.error;
    }

    this.requestedData[lsKey].splice(indexItem, 1);

    return resultMessages.success;
  }

  updateLs(lsKey) {
    localStorage.setItem(lsKey, this.parseState(this.requestedData[lsKey], 'to'));
  }

  parseState(state, direction) {
    if (direction === 'from') {
      return JSON.parse(state);
    }

    if (direction === 'to') {
      return JSON.stringify(state);
    }

    return state;
  }

  createCell(lsKey, data = []) {
    localStorage.setItem(lsKey, this.parseState(data, 'to'));

    return resultMessages.success;
  }
}
