import {nodeElements} from "./const";

export default class Task {

    constructor(task) {
        this.task = task;
        this.renderTask();
    }

    renderTask() {
        console.log(this.task);
        const container = document.getElementById(nodeElements.container);
        let div = document.createElement('div');
        div.className = 'item-content';
        let input = document.createElement('input');
        input.type = 'text';
        input.classList.add("item-content__input", "input");
        input.value = this.task.text;
        div.prepend(input);
        container.append(div);
    }

}