import '../styles/main.scss'
import TodoList from './TodoList'
import {lsKeyApp} from "./constants";

if(/*!localStorage.getItem(lsKeyApp)*/true) {
    localStorage.setItem(lsKeyApp, JSON.stringify({
        date: new Date(),
        tasks: [
            {id: 1, text: 'test1', status: 0},
            {id: 2, text: 'test2', status: 0},
            {id: 3, text: 'test3', status: 0},
            {id: 4, text: 'test4', status: 1},
            {id: 5, text: 'test5', status: 0}
        ]
    }))
}

const state = JSON.parse(localStorage.getItem(lsKeyApp));

const todoList = new TodoList(state);