import Task from "./Task";
import {lsKeyApp, nodeElements} from "./constants";

export default class TodoList {

    examplesTasks = [];
    nodesTasks = [];

    constructor(state, node, lsControl) {
        this.node = node;
        this.lsControl = lsControl;

        this.setState({
            ...this.state,
            date: state.date,
            tasks: state.tasks,
        })

        this.createTasks();
        this.renderList();
    }

    setState(newState) {
        this.state = newState;
    }

    createTasks() {
        this.examplesTasks = [];

        if(this.state.tasks.length) {
            for(let elem of this.state.tasks) {
                this.examplesTasks.push(new Task(
                    elem,
                    this.node,
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

            const wrapper = this.node.querySelector('.wrapper');

            const newWrapper = document.createElement('div');
            newWrapper.classList.add('list__content', 'wrapper');

            if(wrapper) {
                return wrapper.replaceWith(newWrapper);
            }

            this.node.append(newWrapper);

            for(let elem of this.examplesTasks) {
                const taskNode = elem.getNode();
                if(elem.edit) elem.setFocus(taskNode);

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

    toggleStatus(id) {
        const index = this.state.tasks.findIndex(item => item.id === id);

        this.node.querySelector(`#${nodeElements.prefixIdTask}${id}`).classList.toggle("item-content__input_delete");

        this.state.tasks[index].status = this.state.tasks[index].status === 0 ? 1 : 0;
        localStorage.setItem(lsKeyApp, JSON.stringify({
            date: this.state.date,
            tasks: this.state.tasks
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

    saveChangeTask(task) {
        if(!task.id && !this.state.tasks[this.state.tasks.length - 1].id) {
            if(task.text === '') {
                this.nodesTasks[this.nodesTasks.length - 1].remove();
                delete this.examplesTasks[this.examplesTasks.length - 1];
                this.examplesTasks = this.examplesTasks.splice(this.examplesTasks.length - 1, 1);
                this.nodesTasks = this.nodesTasks.splice(this.examplesTasks.length - 1, 1);

                return;
            }

            console.log('add');
            const idNewTask = this.lsControl.addTask({
                text: task.text,
                status: 0,
            });

            this.state.tasks[this.state.tasks.length - 1].id = idNewTask;
            this.examplesTasks[this.examplesTasks.length - 1].id = idNewTask;

            return;
        }

        const index = this.state.tasks.findIndex(item => item.id === task.id);
        const newValue = task.text;
        const oldValue = this.state.tasks[index].text;

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
        const newTasks = [...this.state.tasks];
        newTasks.push({
            id: undefined,
            text: '',
            status: 0,
            edit: true
        });

        const newState = {
            ...this.state,
            tasks: newTasks
        }

        this.setState(newState);

        const newTask = new Task(
            {
                id: undefined,
                text: '',
                status: 0,
                edit: true
            },
            this.node,
            this.toggleStatus.bind(this),
            this.deleteTask.bind(this),
            this.saveChangeTask.bind(this)
        )

        this.examplesTasks.push(newTasks);

        const taskNode = newTask.getNode();
        this.nodesTasks.push(taskNode);

        this.appendNodeTask(taskNode);
        newTask.setFocus();
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