const ClassNameSliderWrapper = `slider-wrapper`;
const ClassNameSliderTrack = `slider-track`
const ClassNameSliderItem = `slider-item`



class Slider {
    constructor(domElement, options = {}) {
        this.sliderDomElement = domElement;
        this.countSlides = this.sliderDomElement.children.length;
        this.currentSlide = 0;
        this.positionTrack = 0;

        this.prepareHTML = this.prepareHTML.bind(this);
        this.setSize = this.setSize.bind(this);
        this.setEvents = this.setEvents.bind(this);
        this.mouseDrag = this.mouseDrag.bind(this);
        this.touchDrag = this.touchDrag.bind(this);
        this.setTrackPosition = this.setTrackPosition.bind(this);

        this.prepareHTML();
        this.setSize();
        this.setEvents();

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
        this.widthWindow = this.sliderDomElement.parentNode.getBoundingClientRect().width

        // set width main window
        this.sliderMainWindowWidth = this.widthWindow;
        this.sliderMainWindow.style.width = `${this.widthWindow}px`

        // set width slider track
        this.sliderTrackWidth = this.widthWindow * this.countSlides;
        this.sliderTrack.style.width = `${this.widthWindow * this.countSlides}px`

        // set width slider item
        this.slideWidth = this.widthWindow;
        Array.from(this.sliderTrack.children).forEach(childItem => {
            childItem.style.width = `${this.widthWindow}px`
        })
    }

    setEvents() {
        // window adaptive listener 
        window.addEventListener('resize', debounce(this.setSize.bind(this)))

        //slider move listeners
        this.sliderTrack.addEventListener('mousedown', this.mouseStart.bind(this))
        window.addEventListener('mouseup', this.mouseStop.bind(this))

        this.sliderTrack.addEventListener('touchstart', this.touchStart.bind(this))
        window.addEventListener('touchend', this.touchStop.bind(this))


    }

    //cursor or touch event listeners

    mouseStart(event) {

        this.startX = event.pageX + this.positionTrack
        this.clientX = event.pageX;
        window.addEventListener('mousemove', this.mouseDrag)
    }

    mouseStop(event) {
        window.removeEventListener('mousemove', this.mouseDrag)
        this.slideChanger()
    }

    touchStart(event) {

        this.startX = event.targetTouches[0].pageX + this.positionTrack;
        this.clientX = event.targetTouches[0].pageX;
        window.addEventListener('touchmove', this.touchDrag)
    }

    touchStop(event) {
        window.removeEventListener('touchmove', this.touchDrag)
        this.slideChanger()
    }

    //---------------------------------


    mouseDrag(event) {
        this.nowX = event.pageX

        this.positionTrack = (this.startX - this.nowX)
        this.shift = this.clientX - this.nowX
        this.setTrackPosition(-this.positionTrack)
    }

    touchDrag(event) {
        this.nowX = event.targetTouches[0].pageX

        this.positionTrack = (this.startX - this.nowX)
        this.shift = this.clientX - this.nowX
        this.setTrackPosition(-this.positionTrack)
    }

    setTrackPosition(distance) {
        this.sliderTrack.style.transform = `translate3d(${distance}px, 0, 0)`
    }

    // slide changer

    slideChanger() {
        if (
            this.shift > 0 &&
            this.shift > 20 &&
            this.currentSlide >= 0
        ) { 
            //next
            this.positionTrack = (this.currentSlide + 1) * this.slideWidth
            
            this.currentSlide += 1
        }
        if (
            //prev
            this.shift < 0 &&
            this.shift < -20 &&
            this.currentSlide < this.countSlides - 1
        ) {
            this.currentSlide -= 1
            this.positionTrack = ((this.currentSlide + 1) * this.slideWidth) - this.slideWidth
        }

        this.shift = 0;
        this.setTrackPosition(-this.positionTrack)


    }
}


// helpers 

function debounce(fn, ms = 500) {
    let timeOut;
    return function (event) {
        clearTimeout(timeOut)

        timeOut = setTimeout(fn, ms)
    }
}