class Modal {
  constructor(params) {
    this.title = params.title;
    this.content = params.content;
    this.okHandler = params.okHandler;
    this.okTitle = params.okTitle;
    this.cancelHandler = params.cancelHandler;
    this.cancelTitle = params.cancelTitle;
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

		if (this.okHandler && typeof this.okHandler === 'function') {
			const okButton = document.createElement('button');

			okButton.addEventListener('click', this.okHandler);
			okButton.classList.add('modal__btn', 'modal__btn_ok', 'button');
			okButton.innerText = 'Ok';
			okButton.title = 'Ok';

			footerModal.append(okButton);
		}

		if (this.cancelHandler) {
			const cancelButton = document.createElement('button');

			cancelButton.addEventListener('click', () => {
					if (typeof this.cancelHandler === 'function') {
							this.cancelHandler();
					}

					this.close();
			});
			cancelButton.classList.add('modal__btn', 'modal__btn_cancel', 'button');
			cancelButton.innerText = 'Cancel';
			cancelButton.title = 'Cancel';

			footerModal.append(cancelButton);
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
