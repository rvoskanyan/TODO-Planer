import Task from "./Task";
import {lsKeyApp, nodeElements} from "./constants";

export default class TodoList {

    examplesTasks = [];
    nodesTasks = [];

    constructor(state) {
        this.date = state?.date;
        this.tasks = state?.tasks;
        this.createTasks();
        this.renderList();
    }

    createTasks() {
        if(this.tasks.length) {
            for(let elem of this.tasks) {
                this.examplesTasks.push(new Task(
                    elem,
                    this.toggleStatus.bind(this),
                    this.deleteTask.bind(this),
                    this.saveChangeTask.bind(this)
                ));
            }
        }
    }

    renderList() {
        if(this.examplesTasks.length) {
            for(let elem of this.examplesTasks) {
                const node = elem.getNode();
                this.nodesTasks.push(node);
                document.getElementById(nodeElements.container).append(node);
            }
        }
        else {
            console.log('Задачи не найдены!')
        }
    }

    toggleStatus(id) {
        document.getElementById(`${nodeElements.prefixIdTask}${id}`).classList.toggle("item-content__input_delete");
        const index = this.tasks.findIndex(item => {
            return item.id === id;
        });
        this.tasks[index].status = this.tasks[index].status === 0 ? 1 : 0;
        localStorage.setItem(lsKeyApp, JSON.stringify({
            date: this.date,
            tasks: this.tasks
        }))
    }

    deleteTask(id) {
        const index = this.tasks.findIndex(item => {
            return item.id === id;
        });
        this.tasks.splice(index, 1);
        this.nodesTasks[index].remove();
        this.nodesTasks.splice(index, 1);
        localStorage.setItem(lsKeyApp, JSON.stringify({
            date: this.date,
            tasks: this.tasks
        }))
    }

    saveChangeTask(id) {
        const index = this.tasks.findIndex(item => {
            return item.id === id;
        });
        const newValue = document.getElementById(`${nodeElements.prefixIdTask}${id}`).value;
        const oldValue = this.tasks[index].text;

        if(oldValue === newValue) {
            return this.tasks[index];
        }

        this.tasks[index] = {
            ...this.tasks[index],
            text: newValue,
            status: 0
        }

        localStorage.setItem(lsKeyApp, JSON.stringify({
            date: this.date,
            tasks: this.tasks
        }))

        return this.tasks[index];
    }

    addTask(task) {
        this.tasks.push(task);
        localStorage.setItem(lsKeyApp, JSON.stringify({
            date: this.date,
            tasks: this.tasks
        }))
    }
}