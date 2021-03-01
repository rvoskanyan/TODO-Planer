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
          <div class="preloader loaded">
              <div class="preloader__row">
                  <div class="preloader__item"></div>
                  <div class="preloader__item"></div>
              </div>
          </div>
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

export function clearSlashes(path) {
  return path.toString().replace(/\/$/, '').replace(/^\//, '');
}

export function loading(state = false) {
  const preloader = document.querySelector('.preloader');

  if (!preloader) {
    return;
  }

  if (state) {
    return preloader.classList.remove('loaded');
  }

  return preloader.classList.add('loaded');
}
