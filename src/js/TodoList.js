import Task from "./Task";
import {lsKeyApp, nodeElements} from "./constants";

export default class TodoList {

    examplesTasks = [];
    nodesTasks = [];

    constructor(state) {
        this.date = state?.date;
        this.tasks = state?.tasks;
        this.nextId = state?.nextId;
        this.createTasks();
        this.renderList();
    }

    createTasks() {
        this.examplesTasks = [];

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
        this.nodesTasks = [];

        if(this.examplesTasks.length) {

            const newContainer = document.createElement('div');
            newContainer.className = 'list__content';
            newContainer.id = nodeElements.container;

            for(let elem of this.examplesTasks) {
                const node = elem.getNode();

                newContainer.append(node);
                this.nodesTasks.push(node);
            }

            document.getElementById(nodeElements.container).replaceWith(newContainer);
        }
        else {
            console.log('Задачи не найдены!')
        }
    }

    toggleStatus(id) {
        const index = this.tasks.findIndex(item => {
            return item.id === id;
        });

        document.getElementById(`${nodeElements.prefixIdTask}${id}`).classList.toggle("item-content__input_delete");

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

    addTask() {
        const div = document.createElement('div');
        div.className = 'item-content';

        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add("item-content__input", "input");
        input.addEventListener('blur', () => this.handleBlurNewTask(div, input));

        const divControls = document.createElement('div');
        divControls.classList.add("content__control", "inner-control");

        div.prepend(input);
        div.append(divControls);

        document.getElementById(nodeElements.container).append(div);

        input.focus();
    }

    handleBlurNewTask(node, field) {
        if(field.value.length) {
            this.tasks.push({
                id: this.nextId,
                text: field.value,
                status: 0
            })
            this.nextId += 1;

            localStorage.setItem(lsKeyApp, JSON.stringify({
                date: this.date,
                tasks: this.tasks,
                nextId: this.nextId
            }))

            this.createTasks();
            this.renderList();
        }
        node.remove();
    }
}