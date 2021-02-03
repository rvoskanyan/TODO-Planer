import LsControl from "./LsControl";
import TodoList from "./TodoList"

import "../styles/main.scss"
import {lsKeyApp} from "./constants";

const lsControl = new LsControl();

if(!lsControl.getCurrentState()) lsControl.initialStartState();

const arrayInitElements = document.querySelectorAll('.todo-list-init');

const state = lsControl.getListTasks();

for(let node of arrayInitElements) {
    node.innerHTML = '<div class="container__when when" id="timeDate">\n' +
        '        <div class="when__date input-wrapper">\n' +
        '            <input type="date" class="input">\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="container__list list">\n' +
        '        <div class="list__head separator">\n' +
        '            <div class="separator__item"></div>\n' +
        '            <div class="separator__item"></div>\n' +
        '            <div class="separator__item"></div>\n' +
        '            <div class="separator__item"></div>\n' +
        '            <div class="separator__item"></div>\n' +
        '            <div class="separator__item"></div>\n' +
        '        </div>\n' +
        '        <div class="todo-list-init-content"></div>\n' +
        '    </div>\n' +
        '    <div class="container__control control">\n' +
        '        <button class="control__button control__button_move button"><i class="icon icon-left-open"></i></button>\n' +
        '        <button class="control__button control__button_add button todo-list-init-content-add-button"><i class="icon icon-list-add"></i></button>\n' +
        '        <button class="control__button control__button_move button"><i class="icon icon-right-open"></i></button>\n' +
        '    </div>';

    const todoList = new TodoList(state, node.querySelector('.todo-list-init-content'), lsControl);

    node.querySelector('.todo-list-init-content-add-button').addEventListener('click', todoList.addTask.bind(todoList));
}