import '../styles/main.scss'
import TodoList from './TodoList'
import {lsKeyApp} from "./constants";

if(!localStorage.getItem(lsKeyApp)) {
    localStorage.setItem(lsKeyApp, JSON.stringify({
        date: new Date(),
        tasks: [],
        nextId: 1
    }))
}

const state = JSON.parse(localStorage.getItem(lsKeyApp));

const todoList = new TodoList(state);

document.getElementById('addTask').addEventListener('click', todoList.addTask.bind(todoList));