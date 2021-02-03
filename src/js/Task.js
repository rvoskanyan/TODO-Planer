import {nodeElements} from "./constants";

export default class Task {

    constructor(task, parentNode, toggleStatus, deleteTask, saveChangeTask) {
        this.id = task.id;
        this.text = task.text;
        this.status = task.status;
        this.edit = task.edit;

        this.toggleStatus = toggleStatus;
        this.deleteTask = deleteTask;
        this.saveChangeTask = saveChangeTask;
        this.parentNode = parentNode;
    }

    getNode() {
        const div = document.createElement('div');
        div.className = 'item-content';

        const divControls = document.createElement('div');
        divControls.classList.add("content__control", "inner-control");

        const input = document.createElement(this.edit ? 'input' : 'div');
        input.classList.add("item-content__input", "input");
        if(!this.edit) {
            this.status === 1 ? input.classList.add('item-content__input_delete') : '';
            input.innerText = this.text;
            input.onclick = () => {
                if(document.getSelection().type === 'Range') return;
                this.handleClickTask();
            }

            const iconEdit = document.createElement('i');
            iconEdit.classList.add("icon", "icon-pencil");

            const buttonEdit = document.createElement('button');
            buttonEdit.classList.add("inner-control__button", "button");
            buttonEdit.addEventListener('click', this.handleClickEdit.bind(this));
            buttonEdit.append(iconEdit);

            divControls.append(buttonEdit);
            divControls.append(buttonEdit);

            if(this.id) {
                const iconDelete = document.createElement('i');
                iconDelete.classList.add("icon", "icon-trash");

                const buttonDelete = document.createElement('button');
                buttonDelete.classList.add("inner-control__button", "button");
                buttonDelete.addEventListener('click', this.handleClickDelete.bind(this))

                buttonDelete.append(iconDelete);

                divControls.append(buttonDelete);
            }
        } else {
            input.value = this.text;
            input.type = 'text';
        }
        input.id = `${nodeElements.prefixIdTask}${this.id}`;

        div.prepend(input);
        div.append(divControls);

        return div;
    }

    setFocus(node) {
        console.log('focus');
        console.log(node.querySelector('input'));
        node.querySelector('input').focus();
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

        this.parentNode.querySelector(`#${nodeElements.prefixIdTask}${this.id}`).replaceWith(input);
        this.parentNode.querySelector(`#${nodeElements.prefixIdTask}${this.id}`).focus();
    }

    handleBlur() {
        this.task = this.saveChangeTask(this.id);

        const input = document.createElement('div');
        input.classList.add("item-content__input", "input");
        this.task.status === 1 ? input.classList.add('item-content__input_delete') : '';
        input.innerText = this.task.text;
        input.onmousedown = this.handleClickTask.bind(this);
        input.id = `${nodeElements.prefixIdTask}${this.id}`;

        this.parentNode.querySelector(`#${nodeElements.prefixIdTask}${this.id}`).replaceWith(input);
    }
}