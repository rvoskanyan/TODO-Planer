import {Messages, typesButton} from "./constants";

class Modal {
  constructor(params) {
    this.title = params.title;
    this.content = params.content;
    this.buttons = params.buttons;
    this.loading = false;

    this.renderModal();
  }

  renderModal = () => {
	this.modal = document.createElement('div');
	this.contentModal = document.createElement('div');
	const headModal = document.createElement('div');
	const titleModal = document.createElement('h4');
	const bodyModal = document.createElement('div');
	const footerModal = document.createElement('div');

	if (this.buttons?.length && Array.isArray(this.buttons)) {
	  this.buttons.forEach((item) => {
		const button = document.createElement('button');

		if (!item.title || typeof item.title !== 'string') {
		  return console.error(Messages.ERROR_TITLE_BUTTON);
		}

		if (!item.callback || typeof item.callback !== 'function') {
		  return console.error(Messages.ERROR_CALLBACK_BUTTON);
		}

		button.innerText = item.title;
		button.title = item.title;
		button.addEventListener('click', item.callback);
	  	button.classList.add('modal__btn', 'button');

	  	switch (item.type) {
		  case typesButton.success: {
		  	button.classList.add('modal__btn_success');
		  	break;
		  }
		  case typesButton.danger: {
		  	button.classList.add('modal__btn_danger');
		  	break;
		  }
			case typesButton.primary: {
				button.classList.add('modal__btn_primary');
				break;
			}
		  default: button.classList.add('modal__btn_success');
		}

	  	footerModal.append(button);
	  });
	}

	titleModal.classList.add('modal-head__title');
	titleModal.innerText = this.title

	headModal.classList.add('modal__head');
	headModal.append(titleModal);

	bodyModal.classList.add('modal__body');
	bodyModal.innerHTML = this.content;

	footerModal.classList.add('modal__footer');

	this.contentModal.classList.add('modal__content');
	this.contentModal.addEventListener('click', (e) => e.stopPropagation());
	this.contentModal.append(headModal);
	this.contentModal.append(bodyModal);
	this.contentModal.append(footerModal);

	this.modal.classList.add('modal');
	this.modal.addEventListener('click', this.close)
	this.modal.append(this.contentModal);

	document.querySelector('body').prepend(this.modal);
  }

  toggleLoader = () => {
	this.loading = !this.loading;


	if (this.loading) {
			console.log(this.loading);
		const loader = document.createElement('div');
		this.preloader = document.createElement('div');

		loader.classList.add('preloader__row');

		this.preloader.classList.add('preloader');
		this.preloader.append(loader);

		return this.contentModal.prepend(this.preloader);
	}

	this.preloader.remove();
  }

  close = () => {
  	this.modal.remove();
  }
}

export default Modal;
