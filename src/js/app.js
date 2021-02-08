import LsControl from "./LsControl";
import TodoList from "./TodoList"

import "../styles/main.scss"

const lsControl = new LsControl();
const arrayInitElements = document.querySelectorAll(".todo-list-init");
const tasks = lsControl.getListTasks();

for(let node of arrayInitElements) {
    node.innerHTML = `
            <div class="container__when when">
                <div class="when__date input-wrapper">
                    <input type="date" class="input todo-list-init-date">
                </div>
            </div>
            <div class="container__list list">
                <div class="list__head separator">
                    <div class="separator__item"></div>
                    <div class="separator__item"></div>
                    <div class="separator__item"></div>
                    <div class="separator__item"></div>
                    <div class="separator__item"></div>
                    <div class="separator__item"></div>
                </div>
                <div class="todo-list-init-content">
                    <div class="list__content wrapper"></div>
                </div>
            </div>
            <div class="container__control control">
                <!--<button class="control__button control__button_move button">
                    <i class="control__icon control__icon_left icon icon-left-open"></i>
                </button>-->
                <button class="control__button control__button_add button todo-list-init-content-add-button">
                    <i class="control__icon icon icon-list-add"></i>
                </button>
                <!--<button class="control__button control__button_move control__button_right button">
                    <i class="control__icon control__icon_right icon icon-right-open"></i>
                </button>-->
            </div>`;

    const todoList = new TodoList({tasks}, node.querySelector(".todo-list-init-content"), lsControl, node);

    node.querySelector('.todo-list-init-content-add-button').addEventListener("click", todoList.addTask.bind(todoList));
}