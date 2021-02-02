import {nodeElements} from "./constants";

export default class Task {

    constructor(task, toggleStatus, deleteTask, saveChangeTask) {
        this.task = task;
        this.id = task.id;
        this.toggleStatus = toggleStatus;
        this.deleteTask = deleteTask;
        this.saveChangeTask = saveChangeTask;
    }

    getNode() {
        const div = document.createElement('div');
        div.className = 'item-content';

        const input = document.createElement('div');
        input.classList.add("item-content__input", "input");
        this.task.status === 1 ? input.classList.add('item-content__input_delete') : '';
        input.innerText = this.task.text;
        input.onmousedown = this.handleClickTask.bind(this);
        input.id = `${nodeElements.prefixIdTask}${this.id}`;

        const divControls = document.createElement('div');
        divControls.classList.add("content__control", "inner-control");

        const buttonEdit = document.createElement('button');
        buttonEdit.classList.add("inner-control__button", "button");
        buttonEdit.addEventListener('click', this.handleClickEdit.bind(this));

        const iconEdit = document.createElement('i');
        iconEdit.classList.add("icon", "icon-pencil");

        const buttonDelete = document.createElement('button');
        buttonDelete.classList.add("inner-control__button", "button");
        buttonDelete.addEventListener('click', this.handleClickDelete.bind(this))

        const iconDelete = document.createElement('i');
        iconDelete.classList.add("icon", "icon-trash");

        buttonEdit.append(iconEdit);
        buttonDelete.append(iconDelete);
        divControls.append(buttonEdit);
        divControls.append(buttonDelete);
        div.prepend(input);
        div.append(divControls);

        return div;
    }

    handleClickTask() {
        this.toggleStatus(this.id);
    }

    handleClickDelete() {
        this.deleteTask(this.id);
    }

    handleClickEdit() {
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add("item-content__input", "input");
        input.value = this.task.text;
        input.id = `${nodeElements.prefixIdTask}${this.id}`;
        input.addEventListener('blur', this.handleBlur.bind(this));

        document.getElementById(`${nodeElements.prefixIdTask}${this.id}`).replaceWith(input);
        document.getElementById(`${nodeElements.prefixIdTask}${this.id}`).focus();
    }

    handleBlur() {
        this.task = this.saveChangeTask(this.id);

        const input = document.createElement('div');
        input.classList.add("item-content__input", "input");
        this.task.status === 1 ? input.classList.add('item-content__input_delete') : '';
        input.innerText = this.task.text;
        input.onmousedown = this.handleClickTask.bind(this);
        input.id = `${nodeElements.prefixIdTask}${this.id}`;

        document.getElementById(`${nodeElements.prefixIdTask}${this.id}`).replaceWith(input);
    }
}