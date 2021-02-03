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
    }

    setState(newState) {
        this.state = newState;
        this.createTasks();
        this.renderList();
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

            for(let elem of this.examplesTasks) {
                const node = elem.getNode();
                if(elem.edit) elem.setFocus(node);

                newWrapper.append(node);
                this.nodesTasks.push(node);
            }

            if(wrapper) {
                return wrapper.replaceWith(newWrapper);
            }

            this.node.append(newWrapper);
        }
        else {
            console.log('Задачи не найдены!')
        }
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

    saveChangeTask(id) {
        const index = this.tasks.findIndex(item => {
            return item.id === id;
        });
        const newValue = this.node.querySelector(`#${nodeElements.prefixIdTask}${id}`).value;
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
        const newTasks = [...this.state.tasks];

        newTasks.push({
            id: undefined,
            text: '',
            status: 0,
            edit: true
        })

        this.setState({
            ...this.state,
            tasks: newTasks
        });
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