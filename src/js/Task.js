import {typeEvents} from "./constants";

export default class Task {

    constructor(task, parentNode, {toggleStatus, deleteTask, saveChangeTask, editTask}) {
        this.id = task.id;
        this.text = task.text;
        this.done = task.done;
        this.edit = task.edit;

        this.toggleStatus = toggleStatus;
        this.deleteTask = deleteTask;
        this.saveChangeTask = saveChangeTask;
        this.editTask = editTask;
    }

    updateDataTask(task) {
        this.id = task.id;
        this.text = task.text;
        this.done = task.done;
        this.edit = task.edit
    }

    getNode() {
        const div = document.createElement("div");
        const marker = document.createElement("div");
        div.className = "item-content";

        const divControls = document.createElement('div');
        divControls.classList.add("content__control", "inner-control");

        const input = document.createElement("div");
        input.classList.add("item-content__input", "input");

        const iconDelete = document.createElement("i");
        iconDelete.classList.add("icon", "icon-trash");

        const buttonDelete = document.createElement("button");
        buttonDelete.classList.add("inner-control__button", "button");
        buttonDelete.addEventListener('click', () => this.handleClickDelete())
        buttonDelete.append(iconDelete);

        if (!this.edit) {
            this.done ? input.classList.add("item-content__input_delete") : "";
            input.innerText = this.text;
            input.onclick = () => {
                if(document.getSelection().type === typeEvents.RANGE) return;
                this.handleClickTask();
            }

            const iconEdit = document.createElement("i");
            iconEdit.classList.add("icon", "icon-pencil");

            const buttonEdit = document.createElement("button");
            buttonEdit.classList.add("inner-control__button", "button");
            buttonEdit.addEventListener("click", this.handleClickEdit.bind(this));
            buttonEdit.append(iconEdit);

            divControls.append(buttonEdit);
            divControls.append(buttonDelete);
        } else {
            input.innerText = this.text;
            input.setAttribute('contenteditable', '');
            input.addEventListener("focusout", (e) => {
                if(e.sourceCapabilities !== null) {
                    this.handleBlur(input)
                }
            });
            input.addEventListener("keypress", (e) => {
                if(e.key === typeEvents.ENTER) {
                    this.handleBlur(input);
                    return false;
                }
            })
        }

        marker.classList.add("marker");
        div.prepend(input);
        div.append(divControls);
        div.append(marker);

        this.node = div;

        return div;
    }

    setFocus() {
        const range = document.createRange();
        range.selectNodeContents(this.node.querySelector(".item-content__input"));
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    handleClickTask() {
        this.toggleStatus(this.id);
    }

    toggleClassStatus() {
        this.node.querySelector(".item-content__input").classList.toggle("item-content__input_delete")
    }

    handleClickDelete() {
        this.deleteTask(this.id);
    }

    handleClickEdit() {
        this.editTask(this.id);
    }

    handleBlur(node) {
        console.log('blur');
        const text = node.innerText;
        this.text = text;

        this.saveChangeTask({
            id: this.id,
            text: text
        });
    }
}