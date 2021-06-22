const ClassNameSliderWrapper = `slider-wrapper`;
const ClassNameSliderTrack = `slider-track`
const ClassNameSliderItem = `slider-item`



class Slider {
    constructor(domElement) {
        this.sliderDomElement = domElement;
        this.countSlides = this.sliderDomElement.children.length

        this.prepareHTML = this.prepareHTML.bind(this);
        this.setSize = this.setSize.bind(this);
        this.setEvents = this.setEvents.bind(this);
        this.moveDrag = this.moveDrag.bind(this)

        this.prepareHTML()
        this.setSize()
        this.setEvents()
        
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
        // set width main window
        this.widthWindow = this.sliderDomElement.parentNode.getBoundingClientRect().width

        // set width slider track
        this.sliderMainWindow.style.width = `${this.widthWindow}px`
        this.sliderTrack.style.width = `${this.widthWindow * this.countSlides}px`

        // set width slider item
        Array.from(this.sliderTrack.children).forEach(childItem => {
            childItem.style.width = `${this.widthWindow}px`
        })
    }

    setEvents() {
        window.addEventListener('resize', debounce(this.setSize.bind(this)))
        this.sliderTrack.addEventListener('mousedown', this.startDrag.bind(this))
        window.addEventListener('mouseup', this.stopDrag.bind(this))
    }

    startDrag(event) {
        this.startX = event.pageX
        console.log(this.startX)
        this.moveDrag()

    }

    stopDrag(event) {
        this.endX = event.pageX || 0
        console.log(this.endX)
        // this.moveDrag()

    }

    moveDrag() {
        const distance = this.startX - this.endX;
        this.sliderTrack.style.transform = `translate3d(${-distance}px, 0, 0)`
        // console.log(distance)
    }





}


// helpers 

function debounce(fn, ms = 500) {
    let timeOut;
    return function(event) {
        clearTimeout(timeOut)

        timeOut = setTimeout(fn, ms)
    }
}