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

        if (state) return state;

        this.initialStartState();

        return this.getCurrentState();
    }

    initialStartState() {
        localStorage.setItem(lsKeyApp, this.parseState({
            date: new Date(),
            tasks: [],
            nextId: 1
        }, 'to'))
    }

    parseState(state, direction) {
        if (direction === "from") return JSON.parse(state);
        if (direction === "to") return JSON.stringify(state);

        return state;
    }

    updateLs() {
        localStorage.setItem(lsKeyApp, this.parseState({
            date: this.date,
            tasks: this.tasks,
            nextId: this.nextId
        }, "to"));
    }

    getListTasks() {
        return this.tasks.map(elem => ({...elem}));
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

    deleteTask(id) {
        this.tasks.splice(this.tasks.findIndex(item => item.id === id), 1);
        this.updateLs();
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