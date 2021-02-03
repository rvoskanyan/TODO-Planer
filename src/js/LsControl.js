import {lsKeyApp} from "./constants";

export default class LsControl {

    getCurrentState() {
        return this.parseState(localStorage.getItem(lsKeyApp), 'from');
    }

    initialStartState() {
        localStorage.setItem(lsKeyApp, this.parseState({
            date: new Date(),
            tasks: [],
            nextId: 1
        }, 'to'))
    }

    parseState(state, direction) {
        if(direction === 'from') return JSON.parse(state);
        if(direction === 'to') return JSON.stringify(state);

        return state;
    }

    getNextId() {

    }

    getListTasks() {
        return this.parseState(localStorage.getItem(lsKeyApp), 'from');
    }

    getTaskById() {

    }

    getTasksByDate() {

    }

    addTask() {

    }

    deleteTask() {

    }

    editTask() {

    }
}