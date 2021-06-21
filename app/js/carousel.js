const CarouselClassName = 'carousel';
const CarouselLineClassName = 'carousel-line';
const CarouselSlideClassName = 'carousel-slide';


class Carousel {
    constructor(carouselWrapper, options = {}) {
        this.containerNode = carouselWrapper;
        this.size = carouselWrapper.childElementCount;
        this.currentSlide = 0;

        this.manageHTML = this.manageHTML.bind(this);
        this.setParameters = this.setParameters.bind(this);
        this.setEvents = this.setEvents.bind(this);
        this.resizeGallery = this.resizeGallery.bind(this);
        this.startDrag = this.startDrag.bind(this);
        this.stopDrag = this.stopDrag.bind(this);
        this.dragging = this.dragging.bind(this);
        this.setStylePosition = this.setStylePosition.bind(this);

        this.manageHTML();
        this.setParameters();
        this.setEvents();

    }

    manageHTML() {
        this.containerNode.classList.add(CarouselClassName)
        this.containerNode.innerHTML = `<div class="${CarouselLineClassName}">
                                            ${this.containerNode.innerHTML}
                                        </div>`
        this.lineNode = this.containerNode.querySelector(`.${CarouselLineClassName}`)

        this.slideNodes = Array.from(this.lineNode.children).map((childNode) => 
                wrapElementByDiv({
                    element: childNode,
                    className: CarouselSlideClassName
                })
            );
        }

    setParameters() {
        const coordsContainer = this.containerNode.getBoundingClientRect();
        this.width = coordsContainer.width;

        this.lineNode.style.width = `${this.width * this.size}px`
        Array.from(this.slideNodes).forEach((slideNode) => {
            slideNode.style.width = `${this.width}px`
        })
    }

    setEvents() {
        this.debouncedResizeGallery = debounce(this.resizeGallery)
        window.addEventListener('resize', this.debouncedResizeGallery);
        this.lineNode.addEventListener('pointerdown', this.startDrag)
        window.addEventListener('pointerup', this.stopDrag)
    }

    destroyEvents() {
        window.addEventListener('resize', this.debouncedResizeGallery);
    }

    resizeGallery() {
        this.setParameters();
    }

    startDrag(evt) {
        this.clickX = evt.pageX;
        console.log(this.clickX)
        window.addEventListener('pointermove', this.dragging);
    }

    stopDrag() {
        window.removeEventListener('pointermove', this.dragging)
    };

    dragging(evt) {
        this.dragX = evt.pageX;
        const dragShift = this.dragX - this.clickX;
        this.setStylePosition(dragShift)
    }

    setStylePosition(shift) {
        this.lineNode.style.transform = `translate3d(${shift}px, 0, 0)`;
    }
}


// Helpers

function wrapElementByDiv({ element, className }) {
    const wrapperNode = document.createElement('div');
    wrapperNode.classList.add(className);

    element.parentNode.insertBefore(wrapperNode, element)
    wrapperNode.appendChild(element);

    return wrapperNode
}

function debounce(func, time = 100) {
    let timer;

    return function(event) {
        clearTimeout(timer);
        timer = setTimeout(func, time, event)
    }
}