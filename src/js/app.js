import '../styles/main.scss'
import TodoListClass from './TodoListClass'
import {SECTION} from "./const";

if(!localStorage.getItem(SECTION)) {
    localStorage.setItem(SECTION, 'listTaskId=1')
}

const page = localStorage.getItem(SECTION);

const todoList = new TodoListClass(page);

todoList.loadPage();