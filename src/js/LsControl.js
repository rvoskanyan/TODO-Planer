import {lsKeyApp} from "./constants";

export default class LsControl {

    constructor() {
        const state = this.getCurrentState();
        this.tasks = state.tasks;
        this.data = state.data;
        this.nextId = state.nextId;
    }

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

    updateLs(ls) {

    }

    getNextId() {
        return this.nextId;
    }

    getListTasks() {
        return this.parseState(localStorage.getItem(lsKeyApp), 'from');
    }

    getTaskById() {

    }

    getTasksByDate() {

    }

    addTask(task) {
        const newTask = {
            ...task,
            id: this.nextId,
        }

        this.tasks.push(newTask);
        this.nextId++;

        console.log({
            data: this.data,
            tasks: this.tasks,
            nextId: this.nextId
        })

        this.updateLs(this.parseState({
            data: this.data,
            tasks: this.tasks,
            nextId: this.nextId
        }, 'to'))

        return newTask.id;
    }

    deleteTask() {

    }

    editTask() {

    }
}