const alasql = require('alasql');

export default class DataBaseControll {
  constructor() {
    alasql('ATTACH FILESTORAGE DATABASE db("./public/db.json")');
    alasql('USE db');
  }

  addItem(item, table) {

  }

  getItem(id, table) {

  }

  editItem(item, table) {

  }

  deleteItem(id, table) {

  }
}
