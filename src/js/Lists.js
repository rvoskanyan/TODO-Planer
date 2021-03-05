import { Messages, textContent, Titles } from './constants';
import DataController from './workerService/DataController';
import TodoList from './TodoList';

class Lists {
  constructor(node) {
    this.node = node;
    this.contentNode = this.node.querySelector('.todo-list-init-content');
    this.dataController = new DataController();
	  this.examplesLists = [];
	  this.lists = [];
	  this.query = new Promise((resolve) => resolve());

	  if (!this.contentNode) {
	  		return;
		}

    this.renderLists();
  }

	createLists() {
		if (this.lists.length) {
			this.lists.forEach((elem) => {
				this.examplesLists.push(new TodoList(
					elem.id,
					this.contentNode,
					elem,
					this.deleteList
				));
			});
		}
	}

  renderLists() {
		const newWrapper = document.createElement('div');
		const wrapper = this.contentNode.querySelector('.wrapper');
		const control = this.node.querySelector('.todo-list-init-control');
		const addButton = document.createElement('button');
		const icon = document.createElement('i');
		const titleNode = document.createElement('h2');

		if (!control) {
			return;
		}

		titleNode.classList.add('todo-list-init-title', 'title');
		titleNode.innerText = textContent.titleList;
		this.contentNode.querySelector('.todo-init-title-container').prepend(titleNode);

		icon.classList.add('control__icon', 'icon', 'icon-list-add');

		addButton.classList.add('control__button', 'control__button_add', 'button', 'todo-list-init-content-add-button');
		addButton.addEventListener('click', this.addList);
		addButton.append(icon);
		addButton.title = Titles.addList;

		newWrapper.classList.add('list__content', 'wrapper');
		newWrapper.innerText = Messages.NO_LISTS;
		wrapper ? wrapper.replaceWith(newWrapper) : this.contentNode.append(newWrapper);

		control.append(addButton);

		this.dataController.doer.getLists().then((result) => {
			if (result.length) {
				newWrapper.remove();

				this.lists = result;
				this.createLists();
				this.examplesLists.forEach((elem) => {
					const listNode = elem.getNode();

					this.appendNodeTask(listNode);
				});
			}
		});
	}

	appendNodeTask = (node) => {
		const wrapper = this.node.querySelector('.wrapper');

		if (wrapper) {
			return wrapper.append(node);
		}

		const newWrapper = document.createElement('div');

		newWrapper.classList.add('list__content', 'wrapper');
		newWrapper.append(node);

		return this.contentNode.append(newWrapper);
	}

	addList = () => {
  	const date = new Date();
  	const name = `${`0${date.getDate()}`.slice(-2)}.${`0${date.getMonth() + 1}`.slice(-2)}.${date.getFullYear()}`;

  	this.dataController.doer.createList(name, date.toString())
			.then((id) => {
				const newList = { id, name };

				this.lists.push(newList);

				const newListExample = new TodoList(
					newList.id,
					this.contentNode,
					newList,
					this.deleteList
				);

				this.examplesLists.push(newListExample);

				const listNode = newListExample.getNode();

				if (this.lists.length === 1) {
					const wrapper = this.contentNode.querySelector('.wrapper');

					if (!wrapper) {
						return;
					}

					wrapper.remove();
				}

				this.appendNodeTask(listNode);
			})
	}

	deleteList = (id) => {
		let index = this.lists.findIndex((item) => item.id === id);

		if (index === -1) {
			return console.error(Messages.ELEMENT_NOT_FOUND);
		}

		const examplesCurrentList = this.examplesLists[index];
		const currentNode = examplesCurrentList.node;

		examplesCurrentList.loaded = true;

		const newNode = examplesCurrentList.getNode();

		currentNode.replaceWith(newNode);

		this.query = this.query.then(() => {
			this.dataController.doer.deleteList(id).then(() => {
				index = this.lists.findIndex((item) => item.id === id);

				this.lists.splice(index, 1);
				this.examplesLists[index].node.remove();

				delete this.examplesLists[index];
				this.examplesLists.splice(index, 1);

				if (!this.lists.length) {
					const newWrapper = document.createElement('div');
					const wrapper = this.contentNode.querySelector('.wrapper');

					newWrapper.classList.add('list__content', 'wrapper');
					newWrapper.innerText = Messages.NO_LISTS;
					wrapper ? wrapper.replaceWith(newWrapper) : this.contentNode.append(newWrapper);
				}
			})
		});
	}
}

export default Lists;
