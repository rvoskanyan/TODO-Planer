import {lsKeyApp} from "./constants";

export default class LsControl {

    constructor() {
        const {tasks, date, nextId} = this.getCurrentState();

        this.tasks = tasks;
        this.date = date;
        this.nextId = nextId;
    }

    getCurrentState() {
        const state = this.parseState(localStorage.getItem(lsKeyApp), 'from');

        if (!state) {
            this.initialStartState();
            return this.getCurrentState();
        }

        return state;
    }

    initialStartState() {
        localStorage.setItem(lsKeyApp, this.parseState({
            date: new Date(),
            tasks: [],
            nextId: 1
        }, 'to'))
    }

    parseState(state, direction) {
        if (direction === 'from') return JSON.parse(state);
        if (direction === 'to') return JSON.stringify(state);

        return state;
    }

    updateLs() {
        localStorage.setItem(lsKeyApp, this.parseState({
            date: this.date,
            tasks: this.tasks,
            nextId: this.nextId
        }, 'to'));
    }

    getNextId() {
        return this.nextId;
    }

    getListTasks() {
        return this.tasks.map(elem => ({...elem}));
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

        this.updateLs()

        return newTask.id;
    }

    deleteTask() {

    }

    editTask(task) {
        const index = this.tasks.findIndex(item => item.id === task.id);

        this.tasks[index] = {
            ...this.tasks[index],
            ...task
        }
        this.updateLs();
    }
}