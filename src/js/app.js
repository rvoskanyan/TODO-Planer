import Lists from './Lists';
import TodoList from './TodoList';
import Router from './Router';
import DataController from './workerService/DataController';
import { workers } from './constants';

import '../styles/main.scss';

const arrayInitElements = document.querySelectorAll('.todo-list-init');
const dataController = new DataController(workers.server);
const router = new Router({
  mode: 'history',
  root: '/',
});

function renderFrame(node) {
  const copyNode = node;

  copyNode.innerHTML = `
      <div class="preloader loaded">
          <div class="preloader__row"></div>
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
              <div class="todo-init-title-container wrapper-title">
                  
              </div>
              <div class="list__content wrapper"></div>
          </div>
      </div>
      <div class="container__control control todo-list-init-control"></div>`;

  return copyNode;
}

Date.prototype.toObject = function () {
  return {
    date: `0${this.getDate()}`.slice(-2),
    month: `0${this.getMonth()}`.slice(-2),
    year: this.getFullYear(),
  };
};

router
  .add(/listTasks\/(.*)/, (id) => {
    arrayInitElements.forEach((node) => {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        document.querySelector('body').classList.add('mobile');
      }

      new TodoList(id, renderFrame(node)).renderTasks();
    });
  })
  .add('', () => {
    arrayInitElements.forEach((node) => {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        document.querySelector('body').classList.add('mobile');
      }

      new Lists(renderFrame(node)).renderLists();
    });
  });
