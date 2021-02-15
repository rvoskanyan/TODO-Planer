import Postman from "./Postman";
import LsControl from "./LsControl";

export default class DateController {
    constructor(worker) {
        switch (worker) {
            case 'server': {
                this.doer = new Postman('http://localhost:3000', '/api/');
                break;
            }
            case 'locale': {
                this.doer = new LsControl();
                break;
            }
        }

        if (!DateController._instance) {
            DateController._instance = this;
        }

        return DateController._instance;
    }

    static getInstance() {
        return this._instance;
    }

    getLists() {

    }

    getListById() {

    }

    getTaskByListId() {

    }

    createList() {

    }

    updateList() {

    }

    deleteList() {

    }

    getTaskById() {

    }

    createTask() {

    }

    updateTask() {

    }

    deleteTask() {

    }
}