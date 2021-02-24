import LsControl from './LsControl';
import TodoList from './TodoList';
import Postman from './Postman';
import Router from "./Router";

import '../styles/main.scss';

const lsControl = new LsControl();
const arrayInitElements = document.querySelectorAll('.todo-list-init');
const router = new Router({
  mode: 'history',
  root: '/'
});

router
    .add(/listTasks\/(.*)/, (id) => {
      console.log(`tasks of list: ${id}`);
    })
    .add(/editList\/(.*)/, (id) => {
      console.log(`edit todo list: ${id}`);
    })
    .add('', () => {
      console.log('lists');
    });

/*String.prototype.hashCode = function() {
  let hash = 0, i, chr;

  if (this.length === 0) {
    return hash;
  }

  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
};

arrayInitElements.forEach((node) => {
  const postman = new Postman('http://localhost:3000', '/api/');
  const nodeDubl = node;

  nodeDubl.innerHTML = `
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

  const todoList = new TodoList({ tasks }, nodeDubl.querySelector('.todo-list-init-content'), lsControl, node, postman);

  nodeDubl.querySelector('.todo-list-init-content-add-button').addEventListener('click', todoList.addTask.bind(todoList));
});*/
