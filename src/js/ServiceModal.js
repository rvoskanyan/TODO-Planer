import {Messages, typesButton} from "./constants";

class Modal {
  constructor(params) {
    this.title = params.title;
    this.content = params.content;
    this.buttons = params.buttons;
    this.loading = false;

    this.modal = undefined;

		this.modal = document.createElement('div');
		this.contentModal = document.createElement('div');

		this.contentModal.classList.add('modal__content');
		this.contentModal.addEventListener('click', (e) => e.stopPropagation());

		this.modal.classList.add('modal');
		this.modal.addEventListener('click', this.close);
		this.modal.append(this.contentModal);
  }

  renderModal = () => {
  	if (!this.content || typeof this.content !== 'string') {
  		return console.error(Messages.ERROR_CONTENT_MODAL);
		}

		if (this.title && typeof this.title === 'string') {
			const headModal = document.createElement('div');
			const titleModal = document.createElement('h4');

			titleModal.classList.add('modal-head__title');
			titleModal.innerText = this.title

			headModal.classList.add('modal__head');
			headModal.append(titleModal);

			this.contentModal.append(headModal);
		}

		const bodyModal = document.createElement('div');

		bodyModal.classList.add('modal__body');
		bodyModal.innerHTML = this.content;
		this.contentModal.append(bodyModal);

		if (this.buttons?.length && Array.isArray(this.buttons)) {
			const footerModal = document.createElement('div');

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

			footerModal.classList.add('modal__footer');
			this.contentModal.append(footerModal);
		}

		document.querySelector('body').prepend(this.modal);
  }

  toggleLoader = () => {
		this.loading = !this.loading;


		if (this.loading) {
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
  	this.contentModal.innerHTML = '';
  }
}

export default Modal;
