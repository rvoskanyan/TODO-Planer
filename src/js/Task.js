export default class Task {

    constructor(task, parentNode, toggleStatus, deleteTask, saveChangeTask, editTask) {
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
        div.className = "item-content";

        const divControls = document.createElement('div');
        divControls.classList.add("content__control", "inner-control");

        const input = document.createElement(this.edit ? "input" : "div");
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
                if(document.getSelection().type === "Range") return;
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
            input.value = this.text;
            input.type = "text";
            input.addEventListener("blur", () => this.handleBlur(input));
            input.addEventListener("keyup", (e) => {
                if(e.key === "Enter") this.handleBlur(input);
            })
        }

        div.prepend(input);
        div.append(divControls);

        this.node = div;
        return div;
    }

    setFocus() {
        this.node.querySelector("input").focus();
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
        const text = node.value;
        this.text = text;

        this.saveChangeTask({
            id: this.id,
            text: text
        });
    }
}