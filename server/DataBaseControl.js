const alasql = require('alasql');

class DataBaseControl {
  constructor() {
    this.alasql = alasql;
    this.alasql('ATTACH FILESTORAGE DATABASE db("./public/db.json")');
    this.alasql('USE db');
  }

  getItems(table) {
    return this.alasql(`SELECT * FROM ${table}`);
  }

  getItemById(id, table) {
    return this.alasql(`SELECT * FROM ${table} WHERE id = '${id}'`);
  }

  getItemsByFieldValue(field, value, table) {
    return this.alasql(`SELECT * FROM ${table} WHERE ${field} = '${value}'`);
  }

  addItem(values, table) {
    this.alasql(`INSERT INTO ${table} VALUES (${values.map((item) => {
      if (typeof (item) === 'string') {
        return `'${item}'`;
      }

      return item;
    }).join(', ')})`);
  }

  editItemById(id, values, table) {
    this.alasql(`UPDATE ${table} SET ${values.filter((item) => item && Array.isArray(item)).map((item) => item.map((field, index) => {
      if (index === 1 && typeof (field) === 'string') {
        return `'${field}'`;
      }

      return field;
    }).join(' = ')).join(', ')} WHERE id = '${id}'`);
  }

  deleteItem(id, table) {
    this.alasql(`DELETE FROM ${table} WHERE id = '${id}'`);
  }

  createTable(table, fields) {
    this.alasql(`CREATE TABLE ${table} (${fields.map((item) => item.join(' ')).join(', ')})`);
  }

  addFieldTable(nameField, type, table) {
    this.alasql(`ALTER TABLE ${table} ADD ${nameField} ${type}`);
  }
}

module.exports = DataBaseControl;
