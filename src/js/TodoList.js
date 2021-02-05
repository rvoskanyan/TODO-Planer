import Task from "./Task";

export default class TodoList {

    examplesTasks = [];
    nodesTasks = [];

    constructor(state, node, lsControl) {
        this.node = node;
        this.lsControl = lsControl;
        this.tasks = state.tasks;

        this.createTasks();
        this.renderList();
    }

    createTasks() {
        this.examplesTasks = [];

        if(this.tasks.length) {
            for(let elem of this.tasks) {
                this.examplesTasks.push(new Task(
                    elem,
                    this.node,
                    this.toggleStatus.bind(this),
                    this.deleteTask.bind(this),
                    this.saveChangeTask.bind(this),
                    this.editTask.bind(this)
                ));
            }
        }
    }

    renderList() {
        this.nodesTasks = [];

        if(this.examplesTasks.length) {

            const wrapper = this.node.querySelector('.wrapper');

            const newWrapper = document.createElement('div');
            newWrapper.classList.add('list__content', 'wrapper');

            wrapper ? wrapper.replaceWith(newWrapper) : this.node.append(newWrapper);

            for(let elem of this.examplesTasks) {
                const taskNode = elem.getNode();
                if(elem.edit) elem.setFocus();

                this.appendNodeTask(taskNode);
                this.nodesTasks.push(taskNode);
            }
        }
        else {
            console.log('Задачи не найдены!')
        }
    }

    appendNodeTask(node) {
        const wrapper = this.node.querySelector('.wrapper');

        if(wrapper) {
            return wrapper.append(node);
        }

        const newWrapper = document.createElement('div');
        newWrapper.classList.add('list__content', 'wrapper');
        newWrapper.append(node);

        this.node.append(newWrapper);
    }

    addTask() {
        const newTask = {
            id: undefined,
            text: '',
            done: false,
            edit: true
        }
        const newTasks = [...this.tasks];

        newTasks.push(newTask);

        this.tasks = newTasks;

        const newTaskExample = new Task(
            newTask,
            this.node,
            this.toggleStatus.bind(this),
            this.deleteTask.bind(this),
            this.saveChangeTask.bind(this),
            this.editTask.bind(this)
        )

        this.examplesTasks.push(newTaskExample);

        const taskNode = newTaskExample.getNode();
        this.nodesTasks.push(taskNode);

        this.appendNodeTask(taskNode);
        newTaskExample.setFocus();
    }

    toggleStatus(id) {
        const index = this.tasks.findIndex(item => item.id === id);
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
        const index = this.tasks.findIndex(item => item.id === id);

        this.tasks.splice(index, 1);
        this.examplesTasks[index].node.remove();
        delete this.examplesTasks[index];
        this.examplesTasks.splice(index, 1);

        this.nodesTasks.splice(index, 1);

        this.lsControl.deleteTask(id);
    }

    editTask(id) {
        const index = this.tasks.findIndex(item => item.id === id);
        const exampleCurrentTask = this.examplesTasks[index];

        this.tasks[index].edit = true;
        exampleCurrentTask.edit = true;

        const oldNode = exampleCurrentTask.node;
        const newNode = exampleCurrentTask.getNode();

        oldNode.replaceWith(newNode);
        exampleCurrentTask.setFocus();
    }

    saveChangeTask(task) {
        if(!task.id && !this.tasks[this.tasks.length - 1].id) {
            if(task.text === '') {
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
        const dataCurrentTask = this.tasks[index]
        const exampleCurrentTask = this.examplesTasks[index];

        if (task.text === dataCurrentTask.text) {
            dataCurrentTask.edit = false;
            exampleCurrentTask.edit = false;

            const oldNode = exampleCurrentTask.node;
            const newNode = exampleCurrentTask.getNode();

            return oldNode.replaceWith(newNode);
        }

        if (task.text === '') return this.deleteTask(task.id);

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