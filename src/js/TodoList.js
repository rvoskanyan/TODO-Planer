import Task from "./Task";
import {messages, systemConstant} from "./constants";

export default class TodoList {

    examplesTasks = [];
    nodesTasks = [];

    constructor(state, node, lsControl, childNode) {
        this.node = node;
        this.childNode = childNode;
        this.lsControl = lsControl;
        this.tasks = state.tasks;

        this.createTasks();
        this.renderList();
        this.initDate();
    }

    createTasks() {
        this.examplesTasks = [];

        if(this.tasks.length) {
            for(let elem of this.tasks) {
                this.examplesTasks.push(new Task(
                    elem,
                    this.node,
                    {
                        toggleStatus: this.toggleStatus.bind(this),
                        deleteTask: this.deleteTask.bind(this),
                        saveChangeTask: this.saveChangeTask.bind(this),
                        editTask: this.editTask.bind(this)
                    }
                ));
            }
        }
    }

    initDate() {
        const nodeDate = this.childNode.querySelector('.todo-list-init-date');

        nodeDate.valueAsDate = new Date(this.lsControl.getDate());
        nodeDate.addEventListener("change", () => {
            this.lsControl.setDate(new Date(nodeDate.value));
        })
    }

    renderList() {
        const noTasks = document.createElement("div");

        noTasks.innerText = messages.NO_TASKS;
        this.noTasks = noTasks;
        this.nodesTasks = [];

        const wrapper = this.node.querySelector(".wrapper");
        const newWrapper = document.createElement("div");

        newWrapper.classList.add("list__content", "wrapper");
        wrapper ? wrapper.replaceWith(newWrapper) : this.node.append(newWrapper);

        if (!this.examplesTasks.length) {
            return this.appendNodeTask(this.noTasks);
        }

        for (let elem of this.examplesTasks) {
            const taskNode = elem.getNode();
            if (elem.edit) {
                elem.setFocus();
            }

            this.appendNodeTask(taskNode);
            this.nodesTasks.push(taskNode);
        }
    }

    appendNodeTask(node) {
        const wrapper = this.node.querySelector(".wrapper");

        if (wrapper) {
            return wrapper.append(node);
        }

        const newWrapper = document.createElement("div");

        newWrapper.classList.add("list__content", "wrapper");
        newWrapper.append(node);

        this.node.append(newWrapper);
    }

    addTask() {
        const newTask = {
            id: systemConstant.NEW_TASK_ID,
            text: "",
            done: false,
            edit: true
        }
        const newTasks = [...this.tasks];

        newTasks.push(newTask);

        this.tasks = newTasks;

        const newTaskExample = new Task(
            newTask,
            this.node,
            {
                toggleStatus: this.toggleStatus.bind(this),
                deleteTask: this.deleteTask.bind(this),
                saveChangeTask: this.saveChangeTask.bind(this),
                editTask: this.editTask.bind(this)
            }
        )

        this.examplesTasks.push(newTaskExample);

        const taskNode = newTaskExample.getNode();
        this.nodesTasks.push(taskNode);

        this.appendNodeTask(taskNode);
        newTaskExample.setFocus();
    }

    toggleStatus(id) {
        if (!Number.isInteger(id)) {
            return console.error(messages.ERROR_ID);
        }

        const index = this.tasks.findIndex(item => item.id === id);

        if (index === -1) {
            return console.error(messages.ELEMENT_NOT_FOUND);
        }

        const examplesCurrentTask = this.examplesTasks[index];
        const dataCurrentTask = this.tasks[index];

        dataCurrentTask.done = !dataCurrentTask.done;
        examplesCurrentTask.done = dataCurrentTask.done;
        examplesCurrentTask.toggleClassStatus();

        this.lsControl.editTask({
            id,
            done: dataCurrentTask.done
        });
    }

    deleteTask(id) {
        if (!Number.isInteger(id)) {
            return console.error(messages.ERROR_ID)
        }

        const index = this.tasks.findIndex(item => item.id === id);

        if (index === -1) {
            return console.error(messages.ELEMENT_NOT_FOUND);
        }

        this.tasks.splice(index, 1);
        this.examplesTasks[index].node.remove();
        delete this.examplesTasks[index];
        this.examplesTasks.splice(index, 1);
        this.nodesTasks.splice(index, 1);
        this.lsControl.deleteTask(id);
    }

    editTask(id) {
        if (!Number.isInteger(id)) {
            return console.error(messages.ERROR_ID);
        }

        const index = this.tasks.findIndex(item => item.id === id);

        if (index === -1) {
            return console.error(messages.ELEMENT_NOT_FOUND);
        }

        const exampleCurrentTask = this.examplesTasks[index];

        this.tasks[index].edit = true;
        exampleCurrentTask.edit = true;

        const oldNode = exampleCurrentTask.node;
        const newNode = exampleCurrentTask.getNode();

        oldNode.replaceWith(newNode);
        exampleCurrentTask.setFocus();
    }

    saveChangeTask(task) {
        if ((!Number.isInteger(task.id) && task.id !== systemConstant.NEW_TASK_ID) || typeof(task.text) !== "string") {
            return console.error(messages.ERROR_DATA);
        }
        if (task.id === systemConstant.NEW_TASK_ID && this.tasks[this.tasks.length - 1].id === systemConstant.NEW_TASK_ID) {
            if (task.text === "") {
                this.nodesTasks[this.nodesTasks.length - 1].remove();
                delete this.examplesTasks[this.examplesTasks.length - 1];
                this.examplesTasks = this.examplesTasks.splice(this.examplesTasks.length - 1, 1);
                this.nodesTasks = this.nodesTasks.splice(this.examplesTasks.length - 1, 1);

                return;
            }

            const idNewTask = this.lsControl.addTask({
                text: task.text,
                done: false,
            });

            this.tasks[this.tasks.length - 1].id = idNewTask;
            this.tasks[this.tasks.length - 1].text = task.text;
            this.examplesTasks[this.examplesTasks.length - 1].updateDataTask({
                id: idNewTask,
                text: task.text,
                done: false,
                edit: false
            })

            const newNodeTask = this.examplesTasks[this.examplesTasks.length - 1].getNode();

            this.nodesTasks[this.nodesTasks.length - 1].replaceWith(newNodeTask);
            this.nodesTasks[this.nodesTasks.length - 1] = newNodeTask;

            return;
        }

        const index = this.tasks.findIndex(item => item.id === task.id);

        if (index === -1) {
            const indexExample = this.examplesTasks.findIndex(item => item.id === task.id);
            const oldNode = this.examplesTasks[indexExample].node;

            this.examplesTasks[indexExample].edit = false;

            const newNode = this.examplesTasks[indexExample].getNode();

            oldNode.replaceWith(newNode);
            return console.error(messages.NOT_SAVE);
        }

        const dataCurrentTask = this.tasks[index]
        const exampleCurrentTask = this.examplesTasks[index];

        if (task.text === dataCurrentTask.text) {
            dataCurrentTask.edit = false;
            exampleCurrentTask.edit = false;

            const oldNode = exampleCurrentTask.node;
            const newNode = exampleCurrentTask.getNode();

            return oldNode.replaceWith(newNode);
        }

        if (task.text === "") return this.deleteTask(task.id);

        dataCurrentTask.edit = false;
        dataCurrentTask.done = false;
        exampleCurrentTask.edit = false;
        exampleCurrentTask.done = false;

        const oldNode = exampleCurrentTask.node;
        const newNode = exampleCurrentTask.getNode();
        oldNode.replaceWith(newNode);
        this.lsControl.editTask({
            ...task,
            done: false
        });
    }
}