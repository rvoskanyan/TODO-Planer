import Task from "./Task";
import {lsKeyApp, nodeElements} from "./constants";

export default class TodoList {

    examplesTasks = [];

    constructor(state) {
        this.date = state?.date;
        this.tasks = state?.tasks;
        this.createTasks();
        this.renderList();
    }

    createTasks() {
        if(this.tasks.length) {
            for(let elem of this.tasks) {
                this.examplesTasks.push(new Task(elem, this.toggleStatus));
            }
        }
    }

    renderList() {
        if(this.examplesTasks.length) {
            for(let elem of this.examplesTasks) {
                document.getElementById(nodeElements.container).append(elem.getNode());
            }
        }
        else {
            console.log('Задачи не найдены!')
        }
    }

    toggleStatus(id) {
        document.getElementById(`${nodeElements.prefixIdTask}${id}`).classList.toggle("item-content__input_delete");
    }

    addTask(task) {
        this.tasks.push(task);
        localStorage.setItem(lsKeyApp, JSON.stringify({
            date: this.date,
            tasks: this.tasks
        }))
    }
}