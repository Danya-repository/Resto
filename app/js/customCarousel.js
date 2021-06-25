const ClassNameSliderWrapper = `slider-wrapper`;
const ClassNameSliderTrack = `slider-track`;
const ClassNameSliderItem = `slider-item`;



class Slider {
    constructor(domElement, options = { autoChange: false }) {
        this.sliderDomElement = domElement;
        this.countSlides = this.sliderDomElement.children.length;
        this.currentSlide = 0;
        this.positionTrack = 0;
        this.easeDragging = 2.37;
        this.autoChange = options.autoChange;
        this.autoTimer;

        this.prepareHTML = this.prepareHTML.bind(this);
        this.setSize = this.setSize.bind(this);
        this.setEvents = this.setEvents.bind(this);
        this.mouseDrag = this.mouseDrag.bind(this);
        this.touchDrag = this.touchDrag.bind(this);
        this.setTrackPosition = this.setTrackPosition.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
        this.setStyleTransition = this.setStyleTransition.bind(this);
        this.resetStyleTransition = this.resetStyleTransition.bind(this)
        this.autoChanger = this.autoChanger.bind(this)

        this.prepareHTML();
        this.setSize();
        this.setEvents();
        // this.autoChanger()
        this.x = 0;


    }

    prepareHTML() {
        // slider main window
        this.sliderDomElement.innerHTML = `<div class=${ClassNameSliderWrapper}>
                                    ${this.sliderDomElement.innerHTML}
                                 </div>`
        this.sliderMainWindow = this.sliderDomElement.querySelector(`.${ClassNameSliderWrapper}`)

        // slider track
        this.sliderTrack = document.createElement('div');
        this.sliderTrack.classList.add(ClassNameSliderTrack);

        // slider items
        Array.from(this.sliderDomElement.querySelector(`.${ClassNameSliderWrapper}`).children).map(childItem => {
            let wrappedChildItem = document.createElement('div');
            wrappedChildItem.classList.add(ClassNameSliderItem)
            wrappedChildItem.append(childItem)

            this.sliderTrack.append(wrappedChildItem)
        })

        this.sliderMainWindow.append(this.sliderTrack)


    }

    setSize() {
        // global wrapper width
        this.widthWindow = this.sliderDomElement.getBoundingClientRect().width;

        // set width main window
        this.sliderMainWindowWidth = this.widthWindow;;
        this.sliderMainWindow.style.width = `${this.widthWindow}px`;

        // set width slider track
        this.sliderTrackWidth = this.widthWindow * this.countSlides;
        this.sliderTrack.style.width = `${this.widthWindow * this.countSlides}px`;

        // set width slider item
        this.slideWidth = this.widthWindow;
        Array.from(this.sliderTrack.children).forEach(childItem => {
            childItem.style.width = `${this.widthWindow}px`;
        })
    }

    setEvents() {
        // window adaptive listener 
        window.addEventListener('resize', debounce(this.setSize.bind(this)));

        //slider move listeners
        this.sliderTrack.addEventListener('mousedown', this.mouseStart.bind(this));
        window.addEventListener('mouseup', this.mouseStop.bind(this));

        this.sliderTrack.addEventListener('touchstart', this.touchStart.bind(this));
        window.addEventListener('touchend', this.touchStop.bind(this));


    }

    //события при касании и отрыве

    mouseStart(event) {
        this.startX = event.pageX + this.positionTrack;
        this.clientX = event.pageX;
        window.addEventListener('mousemove', this.mouseDrag);
        this.resetStyleTransition();

        // Сброс сдвига, для того чтобы слайдера не листался по клику или прикосновению
        this.shift = 0;
        // пауза если автопереключатель включен
        clearTimeout(this.autoTimer)
    }

    mouseStop(event) {
        window.removeEventListener('mousemove', this.mouseDrag);
        this.slideChanger();
        this.setStyleTransition();

        // возврат слайда в обратное положение при недостаточном свайпе
        if (
            this.shift <= 30 &&
            this.shift >= -30
        ) {
            this.positionTrack = this.currentSlide * this.slideWidth
            this.setTrackPosition(-this.positionTrack)
        }

        this.positionTrack = this.positionTrack
        console.log(this.positionTrack)
    }

    touchStart(event) {

        this.startX = event.targetTouches[0].pageX + this.positionTrack;
        this.clientX = event.targetTouches[0].pageX;
        window.addEventListener('touchmove', this.touchDrag);
        this.resetStyleTransition();

    }

    touchStop(event) {
        window.removeEventListener('touchmove', this.touchDrag);
        this.slideChanger();
        this.setStyleTransition();

        // balance if shift is short
        if (
            this.shift <= 30 &&
            this.shift >= -30
        ) {
            this.positionTrack = this.currentSlide * this.slideWidth
            this.setTrackPosition(-this.positionTrack)
        }
    }

    //---------------------------------


    mouseDrag(event) {
        this.nowX = event.pageX;

        // this.positionTrack = (this.startX - this.nowX);
        // this.shift = this.clientX - this.nowX;
        // this.positionTrack = (this.startX - this.nowX);
        this.shift = this.clientX - this.nowX;

        this.positionTrack = (this.startX - this.nowX);
        this.setTrackPosition(-this.positionTrack);

        // липкия края

        // левый край
        // if (this.positionTrack < 0) {
        //     this.positionTrack -= this.positionTrack / this.easeDragging;
        //     // this.setTrackPosition(-this.positionTrack);
        // }
        // // правый край
        // else if (this.positionTrack >= this.sliderTrackWidth - this.slideWidth) {
        //     console.log(this.positionTrack)
        // }
        // else {

        // }

    }

    touchDrag(event) {
        event.preventDefault()

        this.nowX = event.targetTouches[0].pageX;

        this.positionTrack = (this.startX - this.nowX);
        this.shift = this.clientX - this.nowX;

        // sticky edges

        // left edge
        if (this.positionTrack < 0) {
            this.setTrackPosition(-this.positionTrack / this.easeDragging);
            return
        }

        // right edge
        if (this.positionTrack > this.sliderTrackWidth - this.slideWidth) {
            this.setTrackPosition(-(this.sliderTrackWidth - this.slideWidth + this.shift / this.easeDragging));
            return
        }

        // ---------------------------------------------

        this.setTrackPosition(-this.positionTrack);
    }

    setTrackPosition(distance) {
        this.sliderTrack.style.transform = `translate3d(${distance}px, 0, 0)`;
    }

    // методы для смены слайдов

    slideChanger() {
        if (
            //next
            this.shift > 30 &&
            this.currentSlide >= 0
        ) {
            this.nextSlide();
        }
        if (
            //prev
            this.shift < -30 &&
            this.currentSlide <= this.countSlides - 1
        ) {
            this.prevSlide();
        }

        // this.shift = 0;


    }

    nextSlide() {
        if (this.positionTrack < this.sliderTrackWidth - this.slideWidth) {
            this.positionTrack = (this.currentSlide + 1) * this.slideWidth;
            this.currentSlide += 1;
        }
        if (this.positionTrack > this.sliderTrackWidth - this.slideWidth) {
            this.positionTrack = this.sliderTrackWidth - this.slideWidth;
        }

        this.resetStyleTransition()
        this.setTrackPosition(-this.positionTrack);
        this.autoChanger()
    }

    prevSlide() {
        if (this.positionTrack > 0) {
            this.currentSlide -= 1;
            this.positionTrack = ((this.currentSlide + 1) * this.slideWidth) - this.slideWidth;
        }
        if (this.positionTrack < 0) {
            this.positionTrack = 0;
        }
        this.resetStyleTransition()
        this.setTrackPosition(-this.positionTrack);
        this.autoChanger()
    }

    // стилизаторы

    setStyleTransition() {
        this.sliderTrack.style.transition = 'all 1s';
    }

    resetStyleTransition() {
        this.sliderTrack.style.transition = `all 0s`;
    }

    // опциональные функции

    autoChanger() {
        if (!this.autoChange) { return }

        this.setStyleTransition();
        this.autoTimer = setTimeout(this.nextSlide, 10000)
        console.log(this.currentSlide)
    }
}


// вспомогательные функции

function debounce(fn, ms = 500) {
    let timeOut;
    return function (event) {
        clearTimeout(timeOut)

        timeOut = setTimeout(fn, ms)
    }
}