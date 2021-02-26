import Lists from './Lists';
import TodoList from './TodoList';
import Router from './Router';
import { renderFrame } from './utils';
import DataController from './workerService/DataController';

import '../styles/main.scss';
import { workers } from './constants';

const arrayInitElements = document.querySelectorAll('.todo-list-init');
const dataController = new DataController(workers.server);

const router = new Router({
  mode: 'history',
  root: '/',
});

const exampleTodoList = [];
const exampleLists = [];

Date.prototype.toObject = function () {
  return {
    date: `0${this.getDate()}`.slice(-2),
    month: `0${this.getMonth()}`.slice(-2),
    year: this.getFullYear(),
  };
};

router
  .add(/listTasks\/(.*)/, (id) => {
    arrayInitElements.forEach((node, index) => {
      if (exampleTodoList[index]) {
        return exampleTodoList[index].renderTasks();
      }

      const todoList = new TodoList(id, renderFrame(node));

      todoList.renderTasks();
      exampleTodoList.push(todoList);

      return true;
    });
  })
  .add(/editList\/(.*)/, (id) => {
    arrayInitElements.forEach((node, index) => {
      if (exampleTodoList[index]) {
        return exampleTodoList[index].renderEdit();
      }

      const todoList = new TodoList(id, renderFrame(node));

      todoList.renderEdit();
      exampleTodoList.push(todoList);

      return true;
    });
  })
  .add('', () => {
    arrayInitElements.forEach((node, index) => {
      if (exampleLists[index]) {
        return exampleLists[index].rederLists();
      }

      const lists = new Lists(renderFrame(node));

      exampleLists.push(lists);

      return true;
    });
  });
