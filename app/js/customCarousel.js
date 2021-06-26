const ClassNameSliderWrapper = `slider-wrapper`;
const ClassNameSliderTrack = `slider-track`;
const ClassNameSliderItem = `slider-item`;



class Slider {
    constructor(domElement, options = { autoChange: false,
                                        duration: 5000,
                                        }) {
        this.sliderDomElement = domElement;
        this.countSlides = this.sliderDomElement.children.length;
        this.slideWasChanged = false;
        this.currentSlide = 0;
        this.easeDragging = 2.37;
        this.autoChange = options.autoChange || false;
        this.autoChangeDuration = options.duration || 5000;
        this.autoTimer;
        this.autoHandler;
        this.startX;
        this.sliderTrackWidth;
        this.sliderMainWindowWidth;

        this.prepareHTML = this.prepareHTML.bind(this);
        this.setParams = this.setParams.bind(this);
        this.setEvents = this.setEvents.bind(this);
        this.mouseDrag = this.mouseDrag.bind(this);
        this.touchDrag = this.touchDrag.bind(this);
        this.setTrackPosition = this.setTrackPosition.bind(this);
        this.setStyleTransition = this.setStyleTransition.bind(this);
        this.resetStyleTransition = this.resetStyleTransition.bind(this);
        this.autoChanger = this.autoChanger.bind(this);
        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
        this.stickyEdges = this.stickyEdges.bind(this);

        this.prepareHTML();
        this.setParams();
        this.setEvents();
        this.autoChanger();


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

    setParams() {
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

        // start position
        this.positionTrack = this.currentSlide * this.slideWidth
        this.startX = this.positionTrack;

        // auto handler
        this.autoHandler = this.nextSlide;
    }

    setEvents() {
        // window adaptive listener 
        window.addEventListener('resize', debounce(this.setParams.bind(this)));

        //slider move listeners
        this.sliderTrack.addEventListener('mousedown', this.mouseStart.bind(this));
        window.addEventListener('mouseup', this.mouseStop.bind(this));

        this.sliderTrack.addEventListener('touchstart', this.touchStart.bind(this));
        window.addEventListener('touchend', this.touchStop.bind(this));


    }

    //события при касании и отрыве

    mouseStart(event) {
        this.clickX = event.pageX;
        window.addEventListener('mousemove', this.mouseDrag);
        this.resetStyleTransition()

        clearTimeout(this.autoTimer)
    }

    mouseStop() {
        window.removeEventListener('mousemove', this.mouseDrag);
        this.slideWasChanged = false;
        this.startX = this.positionTrack;
        this.slideChanger()
        this.setStyleTransition()
        this.shift = 0;
        this.autoChanger()

    }

    touchStart(event) {
        this.clickX = event.targetTouches[0].pageX;
        window.addEventListener('touchmove', this.touchDrag);
        this.resetStyleTransition();

    }

    touchStop() {
        window.removeEventListener('touchmove', this.touchDrag);
        this.slideWasChanged = false;
        this.startX = this.positionTrack;
        this.slideChanger();
        this.setStyleTransition();
        this.shift = 0;

    }

    //---------------------------------


    mouseDrag(event) {
        this.nowX = event.pageX;

        this.shift = this.nowX - this.clickX;
        this.easeShift = this.shift / 2.47
        this.positionTrack = this.startX + this.shift


        if (this.autoChange === false) {
            this.stickyEdges()
        }
        this.setTrackPosition()    
    }

    touchDrag(event) {

        this.nowX = event.targetTouches[0].pageX;

        this.shift = this.nowX - this.clickX;
        this.easeShift = this.shift / 2.47
        this.positionTrack = this.startX + this.shift

        if (this.autoChange === false) {
            this.stickyEdges()
        }
        this.setTrackPosition()
        
    }

    setTrackPosition() {
        this.sliderTrack.style.transform = `translate3d(${this.positionTrack}px, 0, 0)`;
    }

    // методы для смены слайдов

    slideChanger() {
        if (
            //next
            this.shift < -30 &&
            this.currentSlide < this.countSlides - 1 &&
            this.slideWasChanged == false
        ) {
            this.slideWasChanged = true
            this.nextSlide();
        }
        else if (
            //prev
            this.shift > 30 &&
            this.currentSlide > 0 &&
            this.slideWasChanged == false
        ) {
            this.slideWasChanged = true
            this.prevSlide();
        }
        else {
            this.positionTrack = -(this.currentSlide * this.slideWidth);
            this.setTrackPosition();
            this.startX = this.positionTrack;
        }
        
    }

    nextSlide() {
        this.currentSlide += 1

        this.positionTrack = -(this.currentSlide * this.slideWidth)
        this.setTrackPosition()
        this.startX = this.positionTrack;

        clearTimeout(this.autoTimer)
        this.autoChanger()
    }

    prevSlide() {
        this.currentSlide -= 1

        this.positionTrack = -(this.currentSlide * this.slideWidth)
        this.setTrackPosition(this.positionTrack)
        this.startX = this.positionTrack;

        clearTimeout(this.autoTimer)
        this.autoChanger();

    }

    // стилизаторы

    setStyleTransition() {
        this.sliderTrack.style.transition = 'all 1s';
    }

    resetStyleTransition() {
        this.sliderTrack.style.transition = `all 0s`;
    }

    // опциональные функции

    stickyEdges() {
        // Липкие края
        // Левый липкий край
        if (this.positionTrack > 0) {
            this.positionTrack = (this.startX + this.shift) / 2.47
        }
        // Правый липкий край
        else if (this.positionTrack < -((this.countSlides - 1) * this.slideWidth)) {
            let fartHestPoint = -((this.countSlides - 1) * this.slideWidth)
            let delta = fartHestPoint - this.positionTrack
            this.positionTrack = fartHestPoint - delta / 2.47


            // решение через условие, если слайдер утоплен глубже, чем стартовая позиция его последного слайда,
            // то для рассчетов берём вместо positionTrack значение fartHestPoint - длинна слайдера без последнего слайда со знаком минус,
            // и после этого топим на дельту, которая делитсян а коэфициент замедления(2.47), т.е. вместо -2106(fartHestPoin) - 1, -2, -3 ... n,
            // мы берём -2106(fartHestPoin) - 0.404, -0.809, -1.214 ... n / 2.47

            // delta it is difference 
            // let delta = -((this.countSlides - 1) * this.slideWidth) - this.positionTrack // v 1.0
        }
    }

    autoChanger() {
        if (this.autoChange === false) { return }


        if (this.currentSlide >= this.countSlides - 1) {
            this.autoHandler = this.prevSlide;
        }
        else if (this.currentSlide <= 0) {
            this.autoHandler = this.nextSlide;
        }
        this.autoTimer = setTimeout(this.autoHandler, this.autoChangeDuration);
        this.setStyleTransition();
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