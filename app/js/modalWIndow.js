class ModalWindow {
    constructor(content, clickTarget, parentNode) {
        this.place = `.main`
        this.content = content;
        this.open = false;
        this.inProcess = false;
        this.parentNode = parentNode;
        this.count = this.content.length;
        this.click = clickTarget;

        this.activeImage = +clickTarget.dataset.photoReviewNumber;

        this.prepareHTML();
        this.setParentItemBorder();
        this.setEvents();
        this.toggle();
    }

    prepareHTML() {
        this.placeToRender = document.querySelector(this.place);

        this.modal = document.createElement('div');
        this.modal.classList.add('modal-window');
        this.modal.innerHTML = `<div class="modal-window__background" data-close-modal></div>
                                <div class="modal-window__inner">
                                  <div class="modal-window__close-btn-wrapper">
                                    <button class="close-btn close-btn--active" data-close-modal>
                                      <div class="close-btn__decorate-block" data-close-modal></div>
                                      <div class="close-btn__decorate-block" data-close-modal></div>
                                    </button>
                                  </div>
                                  <button class="modal-window__prev-btn"></button>
                                  <div class="modal-window__content">
                                    <div class="modal-window__track"></div>
                                  </div>
                                  <button class="modal-window__next-btn"></button>
                                </div>`
        this.wrapper = this.modal.querySelector('.modal-window__inner');
        this.background = this.modal.querySelector('.modal-window__background')
        this.track = this.modal.querySelector('.modal-window__track');
    }

    setEvents() {
        this.modal.onclick = (event) => {
            if (event.target.hasAttribute('data-close-modal')) {
                this.toggle()
            }
            if (event.target.classList.contains('modal-window__prev-btn')) {
                this.prev();
            }
            if (event.target.classList.contains('modal-window__next-btn')) {
                this.next();
            }
        }
    }

    setParameters() {
        this.windowWidth = this.modal.querySelector('.modal-window__inner').getBoundingClientRect().width;
        this.position = -(this.activeImage * this.windowWidth);
        this.track.style.width = `${this.windowWidth * this.content.length}px`
    }

    toggle() {
        if (this.open === false && this.inProcess === false) {
            this.inProcess = true;
            this.togglePromise = new Promise((resolve) => {
                this.placeToRender.append(this.modal)
                setTimeout(() => {
                    this.openModal();
                    setTimeout(() => {
                        this.setContent();
                        this.setPosition();
                        this.open = true;
                        this.inProcess = false;
                        resolve();
                    }, 2000)
                }, 0)
            })
        }
        else if (this.open === true && this.inProcess === false) {
            this.inProcess = true;
            this.togglePromise = new Promise((resolve) => {
                setTimeout(() => {
                    this.closeModal();
                    setTimeout(() => {
                        this.open = false;
                        this.modal.remove();
                        this.inProcess = false;
                        resolve();
                    }, 1000)
                }, 0)
            })
        }

        return this.TogglePromise;
    }

    openModal() {
        this.background.classList.add('modal-window__background--active');
        this.wrapper.classList.add('modal-window__inner--active');
        document.body.style.overflow = 'hidden';
        this.setParameters();
    }

    closeModal() {
        this.wrapper.classList.remove('modal-window__inner--active');
        this.background.classList.remove('modal-window__background--active');
        document.body.style.overflow = 'visible';
    }

    setContent() {
        const Place = this.modal.querySelector('.modal-window__track')
        for (let i in this.content) {
            let photo = document.createElement('img');
            photo.setAttribute('src', this.content[i])
            photo.classList.add('modal-window__photo')
            Place.append(photo)
        }
    }


    next() {
        if (this.activeImage < this.count - 1) {
            this.setTransition();
            this.activeImage += 1;
            this.position = -(this.activeImage * this.windowWidth);
            this.setPosition();
            this.setParentItemBorder();
        }
    }

    prev() {
        if (this.activeImage > 0) {
            this.setTransition();
            this.activeImage -= 1;
            this.position = -(this.activeImage * this.windowWidth);
            this.setPosition();
            this.setParentItemBorder();
        }
    }

    setPosition() {
        this.track.style.transform = `translate3d(${this.position}px, 0, 0)`
    }

    setTransition() {
        this.track.style.transition = `all 1s`;
    }

    setParentItemBorder() {
        const ParentNodeItems = this.click.parentNode.children;
        ParentNodeItems.forEach(item => {
            item.classList.remove('reviews__photo--active')
        })
        ParentNodeItems[this.activeImage].classList.add('reviews__photo--active')
    }
}

