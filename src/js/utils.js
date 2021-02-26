String.prototype.hashCode = function () {
  let hash = 0; let i; let
    chr;

  if (this.length === 0) {
    return hash;
  }

  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
};

export function renderFrame(node) {
  const copyNode = node;

  copyNode.innerHTML = `
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
      <div class="container__control control todo-list-init-control">
          <!--<button class="control__button control__button_move button">
              <i class="control__icon control__icon_left icon icon-left-open"></i>
          </button>-->
          <!--<button class="control__button control__button_move control__button_right button">
              <i class="control__icon control__icon_right icon icon-right-open"></i>
          </button>-->
      </div>`;

  return copyNode;
}

export function clearSlashes(path) {
  return path.toString().replace(/\/$/, '').replace(/^\//, '');
}

export function loading(state = false) {
  const preloader = document.querySelector('.preloader');

  if (!preloader) {
    return undefined;
  }

  if (state) {
    return preloader.classList.remove('loaded');
  }

  return preloader.classList.add('loaded');
}

export function getAddButton(handler) {
  const button = document.createElement('button');
  const icon = document.createElement('i');

  icon.classList.add('control__icon', 'icon', 'icon-list-add');

  button.classList.add('control__button', 'control__button_add', 'button', 'todo-list-init-content-add-button');
  button.addEventListener('click', handler);
  button.append(icon);

  return button;
}

export function getSaveButton(handler) {
  const button = document.createElement('button');
  const icon = document.createElement('i');

  icon.classList.add('control__icon', 'icon', 'icon-list-save');

  button.classList.add('control__button', 'control__button_save', 'button', 'todo-list-init-content-save-button');
  button.addEventListener('click', handler);
  button.append(icon);

  return button;
}
