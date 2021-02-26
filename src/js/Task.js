import { TypeEvents } from './constants';

export default class Task {
  constructor(task, parentNode, {
    toggleStatus,
    deleteTask,
    saveChangeTask,
    editTask,
  }) {
    this.id = task.id;
    this.text = task.text;
    this.done = task.done;
    this.edit = task.edit;

    this.toggleStatus = toggleStatus;
    this.deleteTask = deleteTask;
    this.saveChangeTask = saveChangeTask;
    this.editTask = editTask;
  }

  updateDataTask(task) {
    this.id = task.id;
    this.text = task.text;
    this.done = task.done;
    this.edit = task.edit;

    const oldNode = this.node;

    this.getNode();
    oldNode.replaceWith(this.node);
  }

  getNode() {
    const div = document.createElement('div');
    const marker = document.createElement('div');
    const divControls = document.createElement('div');
    const input = document.createElement('div');
    const iconDelete = document.createElement('i');
    const buttonDelete = document.createElement('button');

    div.className = 'item-content';

    divControls.classList.add('content__control', 'inner-control');

    input.classList.add('item-content__input', 'input');

    iconDelete.classList.add('icon', 'icon-trash');

    buttonDelete.classList.add('inner-control__button', 'button');
    buttonDelete.addEventListener('click', () => this.handleClickDelete());
    buttonDelete.append(iconDelete);

    if (!this.edit) {
      const iconEdit = document.createElement('i');
      const buttonEdit = document.createElement('button');

      if (this.done) {
        input.classList.add('item-content__input_delete');
      }

      input.innerText = this.text;
      input.onclick = () => {
        if (document.getSelection().type === TypeEvents.RANGE) { return; }
        this.handleClickTask();
      };

      iconEdit.classList.add('icon', 'icon-pencil');

      buttonEdit.classList.add('inner-control__button', 'button');
      buttonEdit.addEventListener('click', this.handleClickEdit.bind(this));
      buttonEdit.append(iconEdit);

      divControls.append(buttonEdit);
      divControls.append(buttonDelete);
    } else {
      input.innerText = this.text;
      input.setAttribute('contenteditable', '');
      input.addEventListener('focusout', (e) => {
        if (e.sourceCapabilities !== null) {
          this.handleBlur(input);
        }
      });
      input.addEventListener('keypress', (e) => {
        if (e.key === TypeEvents.ENTER) {
          this.handleBlur(input);
        }

        return false;
      });
    }

    marker.classList.add('marker');
    div.prepend(input);
    div.append(divControls);
    div.append(marker);

    this.node = div;

    return div;
  }

  setFocus() {
    const range = document.createRange();
    const sel = window.getSelection();
    const input = this.node.querySelector('.item-content__input');

    if (!input) {
      return undefined;
    }

    range.selectNodeContents(input);
    range.collapse(false);

    sel.removeAllRanges();
    sel.addRange(range);
  }

  handleClickTask() {
    this.toggleStatus(this.id);
  }

  toggleClassStatus() {
    const selfNode = this.node.querySelector('.item-content__input');

    if (!selfNode) {
      return undefined;
    }

    selfNode
      .classList
      .toggle('item-content__input_delete');
  }

  handleClickDelete() {
    this.deleteTask(this.id);
  }

  handleClickEdit() {
    this.editTask(this.id);
  }

  handleBlur(node) {
    const text = node.innerText;

    this.text = text;

    this.saveChangeTask({
      id: this.id,
      text,
    });
  }
}
