const ClassNameSliderWrapper = `slider-wrapper`;
const ClassNameSliderTrack = `slider-track`;
const ClassNameSliderItem = `slider-item`;



class Slider {
    constructor(domElement, options = {
        autoChange: false,
        duration: 5000,
        infinite: false,
    }) {
        this.sliderDomElement = domElement;
        this.countSlides = this.sliderDomElement.children.length;
        this.slideWasChanged = false;
        this.currentSlide = 0;
        this.easeDragging = 2.37;
        this.autoChange = options.autoChange || false;
        this.autoChangeDuration = options.duration || 5000;
        this.infinite = options.infinite || false;
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
        this.arrayOfSlides = Array.from(this.sliderMainWindow.children);

        this.arrayOfSlides.forEach((childItem, childItemIndex) => {
            let wrappedChildItem = document.createElement('div');
            wrappedChildItem.classList.add(ClassNameSliderItem)
            wrappedChildItem.setAttribute('data-number-slide', `${childItemIndex}`)
            wrappedChildItem.append(childItem)

            this.sliderTrack.append(wrappedChildItem)
        })

        if (this.infinite === true) {
            // clone slider items
            const firstCloneSlideItem = this.arrayOfSlides[0].cloneNode(true)
            const lastCloneSlideItem = this.arrayOfSlides[this.countSlides - 1].cloneNode(true)

            this.sliderTrack.append(firstCloneSlideItem)
            this.sliderTrack.prepend(lastCloneSlideItem)
            this.countSlides += 2;
            console.log(firstCloneSlideItem,lastCloneSlideItem)
        }

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
        if (this.infinite === true) {
            this.positionTrack = -1 * this.slideWidth;
            this.currentSlide = 1;

            // props for infinite
            this.positionFirstSlide = -1 * this.slideWidth;
            this.backToStartPoint = -1 * this.slideWidth;
            this.backToEndPoint = - (this.countSlides - 2) * this.slideWidth;
        }
        else if (this.infinite === false) {
            this.positionTrack = this.currentSlide * this.slideWidth
        }

        this.startX = this.positionTrack;
        this.setTrackPosition()
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
        // this.clickRelatedWrapper = this.clickX - this.sliderMainWindow.getBoundingClientRect().left
        // console.log(this.clickRelatedWrapper)
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
        this.positionTrack = this.startX + this.shift;


        if (this.infinite === false) {
            this.stickyEdges()
        }

        // console.log({
        //     start: this.startX,
        //     shift: this.shift
        // })
        if (this.infinite === true) {
            if (0 < this.positionTrack) {
                // this.shift = 0;
                this.currentSlide = this.countSlides - 2;
                this.startX = this.backToEndPoint;
                this.positionTrack = this.backToEndPoint;
            }
            if (this.positionTrack < - (this.countSlides - 1) * this.slideWidth) {
                // this.startX = 0;
                this.currentSlide = 1;
                // this.clickX = this.clickRelatedWrapper
                // this.nowX = 166;
                this.shift = 0;
                // this.nowX =  -this.slideWidth;
                this.startX = 0;
                this.positionTrack = -this.slideWidth;
                console.log({
                    // now: this.nowX,
                    // shift: this.shift,
                    click: this.clickX,
                    start: this.startX,
                    pos: this.positionTrack,
                })
            }

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

    // methods for change slides

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

        // clearTimeout(this.autoTimer);
        if (this.currentSlide === this.countSlides - 1) {
            this.autoHandler = this.prevSlide;
        }
        this.autoChanger()

    }

    prevSlide() {
        this.currentSlide -= 1

        this.positionTrack = -(this.currentSlide * this.slideWidth)
        this.setTrackPosition(this.positionTrack)
        this.startX = this.positionTrack;

        if (this.currentSlide === 0) {
            this.autoHandler = this.nextSlide;
        }
        this.autoChanger();

    }

    // style methods

    setTrackPosition() {
        this.sliderTrack.style.transform = `translate3d(${this.positionTrack}px, 0, 0)`;
    }

    setStyleTransition() {
        this.sliderTrack.style.transition = 'all 1s';
    }

    resetStyleTransition() {
        this.sliderTrack.style.transition = `all 0s`;
    }

    // option methods

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

        console.log(this.currentSlide)

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