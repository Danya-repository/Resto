class ModalWindow {
    constructor(content, clickTarget) {
        this.place = `.main`
        this.clickTarget = clickTarget;
        this.content = content;

        console.log(this.clickTarget)
        this.render();
        this.setEvents();
    }

    setEvents() {  
        this.modal.addEventListener('click', (event) => {
            if (event.target.hasAttribute('data-close-modal')) {
                this.toggle();
            }
        })
    }

    setStyle() {
        this.wrapper = this.modal.querySelector('.modal-window__inner');
        this.photoStripe = this.modal.querySelector('.modal-window__content');

        const WindowWidth = document.querySelector('.modal-window__inner').getBoundingClientRect().width;
        console.log(WindowWidth)
        this.photoStripe.style.width = `${WindowWidth * this.content.length}px`
        console.log(this.photoStripe)

    }

    toggle() {
        const Place = document.querySelector(this.place);

        this.TogglePromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.modal.classList.contains('modal-window--active') === false) {
                    Place.append(this.modal);
                    document.body.style.overflow = 'hidden';
                    setTimeout(this.open.bind(this), 0);
                    resolve();
                }
                else {
                    this.close()
                    setTimeout(() => {
                        Place.removeChild(this.modal);
                        document.body.style.overflow = 'visible';                
                    }, 700)
                    resolve();
                }
            }, 0)
        })

        return this.TogglePromise;
    }

    open() {
        this.modal.classList.add('modal-window--active');
        this.wrapper.classList.add('modal-window__inner--active');
    }

    close() {
        console.log(1234)
        this.wrapper.classList.remove('modal-window__inner--active');
        this.modal.classList.remove('modal-window--active');
    }

    render() {


        this.modal = document.createElement('div');
        this.modal.classList.add('modal-window');
        this.modal.setAttribute('data-close-modal', '')
        this.modal.innerHTML = `<div class="modal-window__inner" data-close-modal>
                                  <div class="modal-window__close-btn-wrapper">
                                    <button class="close-btn close-btn--active" data-close-modal>
                                      <div class="close-btn__decorate-block" data-close-modal></div>
                                      <div class="close-btn__decorate-block" data-close-modal></div>
                                    </button>
                                  </div>
                                  <button class="modal-window__prev-btn"></button>
                                  <div class="modal-window__content">
                                  </div>
                                  <button class="modal-window__next-btn"></button>
                                </div>`
        this.toggle().then(() => {
                            this.setStyle();
                      });
        this.setContent();
    }

    setContent() {
        const Place = this.modal.querySelector('.modal-window__content')
        for (let i in this.content) {
            let item = `<div class="modal-window__item">
                            <img class="modal-window__photo" src="${this.content[i]}" alt="">
                        </div>`
            Place.innerHTML+=item;
        }
    }


    next() {

    }

    prev() {

    }


}
