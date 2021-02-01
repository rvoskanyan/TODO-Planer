export default class Task {

    constructor(task, toggleStatus) {
        this.task = task;
        this.id = task.id;
        this.edit = false;
        this.toggleStatus = toggleStatus;
    }

    getNode() {
        const div = document.createElement('div');
        div.className = 'item-content';

        const input = document.createElement(this.edit ? 'input' : 'div');
        input.type = 'text';
        input.classList.add("item-content__input", "input");
        this.task.status === 1 ? input.classList.add('item-content__input_delete') : '';
        if(this.edit) {
            input.value = this.task.text;
        }
        else {
            input.innerText = this.task.text;
        }
        input.onmousedown = this.handleClickTask;
        input.id = `task${this.id}`;

        const divControls = document.createElement('div');
        divControls.classList.add("content__control", "inner-control");

        const buttonEdit = document.createElement('button');
        buttonEdit.classList.add("inner-control__button", "button");

        const iconEdit = document.createElement('i');
        iconEdit.classList.add("icon", "icon-pencil");

        const buttonDelete = document.createElement('button');
        buttonDelete.classList.add("inner-control__button", "button");

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
        console.log(this.id);
        this.toggleStatus(this.id);
    }
}