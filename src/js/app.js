import '../styles/main.scss'
import TodoList from './TodoList'
import {APP} from "./const";

if(/*!localStorage.getItem(APP)*/true) {
    localStorage.setItem(APP, JSON.stringify({
        date: new Date(),
        tasks: [
            {text: 'test1', status: 0},
            {text: 'test2', status: 0},
            {text: 'test3', status: 0},
            {text: 'test4', status: 0},
            {text: 'test5', status: 0}
        ]
    }))
}

const state = JSON.parse(localStorage.getItem(APP));

const todoList = new TodoList(state);