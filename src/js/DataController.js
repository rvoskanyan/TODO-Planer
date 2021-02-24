import Postman from "./Postman";
import LsControl from "./LsControl";

export default class DataController {
    constructor(worker) {
        this.worker = worker;

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

        if (!DataController._instance) {
            DataController._instance = this;
        }

        return DataController._instance;
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