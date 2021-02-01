import Task from "./Task";
import {APP} from "./const";

export default class TodoList {

    constructor(state) {
        this.date = state?.date;
        this.tasks = state?.tasks;
        this.renderList();
    }

    renderList() {
        if(this.tasks.length) {
            for(let elem of this.tasks) {
                new Task(elem);
            }
        }
        else {
            console.log('Задачи не найдены!')
        }
    }

    addTask(task) {
        this.tasks.push(task);
        localStorage.setItem(APP, JSON.stringify({
            date: this.date,
            tasks: this.tasks
        }))
    }
}