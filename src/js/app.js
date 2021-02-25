import Lists from './Lists';
import TodoList from './TodoList';
import Router from './Router';
import { renderFrame } from './utils';
import DataController from './DataController';

import '../styles/main.scss';

const arrayInitElements = document.querySelectorAll('.todo-list-init');
const dataController = new DataController('server');

const router = new Router({
  mode: 'history',
  root: '/',
});

const exampleTodoList = [];
const exampleLists = [];

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
