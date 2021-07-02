const ClassNameSliderWrapper = `slider-wrapper`;
const ClassNameSliderTrack = `slider-track`;
const ClassNameSliderItem = `slider-item`;



class Slider {
    constructor(domElement, options = {
        autoChange: false,
        duration: 5000,
        infinite: false,
        animationDuration: 1000
    }) {
        this.sliderDomElement = domElement;
        this.countSlides = this.sliderDomElement.children.length;
        this.countOriginalSlides = this.sliderDomElement.children.length;
        this.currentSlide = 0;
        this.easeDragging = 2.37;
        this.autoChange = options.autoChange || false;
        this.autoChangeDuration = options.duration || 5000;
        this.animationDuration = options.animationDuration || 1000;
        this.infinite = options.infinite || false;
        this.moveX = 0;
        this.moveRelatedX = true;
        this.rollAfterBorder = false;

        this.autoTimer;
        this.autoHandler;
        this.startPositionTrack;
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


        Array.from(this.sliderMainWindow.children).map((childItem, childItemIndex) => {
            let wrappedChildItem = document.createElement('div');
            wrappedChildItem.classList.add(ClassNameSliderItem)
            wrappedChildItem.setAttribute('data-number-slide', `${childItemIndex}`)

            wrappedChildItem.append(childItem)
            this.sliderTrack.append(wrappedChildItem)
        })

        if (this.infinite === true) {
            const firstCloneSlideItem = this.sliderTrack.firstChild.cloneNode(true)
            const lastCloneSlideItem = this.sliderTrack.lastChild.cloneNode(true)

            this.sliderTrack.append(firstCloneSlideItem)
            this.sliderTrack.prepend(lastCloneSlideItem)

            Array.from(this.sliderTrack.children).forEach((childItem, childItemIndex) => {
                childItem.setAttribute('data-number-slide', `${childItemIndex}`)
                childItem.onmousedown = () => {
                    this.numberSlideClicked = childItemIndex;
                }
                childItem.ontouchstart = () => {
                    this.numberSlideClicked = childItemIndex;
                }
            })

            this.countSlides += 2;

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

        this.startPositionTrack = this.positionTrack;
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
        clearTimeout(this.autoTimer);
        clearTimeout(this.animationTimer);
        this.clickX = event.pageX;

        this.startX = event.pageX;
        this.startY = event.pageY;
        this.moveX = event.pageX;

        this.rollAfterBorder = false;

        window.addEventListener('mousemove', this.mouseDrag);
        this.resetStyleTransition();
        
    }

    mouseStop() {
        window.removeEventListener('mousemove', this.mouseDrag);
        this.positionTrack = -(this.currentSlide * this.slideWidth);
        this.startPositionTrack = this.positionTrack;
        this.setStyleTransition()
        this.slideChanger()
        this.setTrackPosition()
        this.shift = 0;

        clearTimeout(this.autoTimer);
        clearTimeout(this.animationTimer);
        if (this.autoChange === true && this.infinite === true) {

            this.animationTimer = setTimeout(() => {
                if (this.currentSlide === 6) {
    
                    this.resetStyleTransition();
                    this.currentSlide = 1;
                    this.positionTrack = -(this.currentSlide * this.slideWidth);
                    this.setTrackPosition()
                    this.startPositionTrack = this.positionTrack;
                }
            }, this.animationDuration)
    
    
    
            clearTimeout(this.autoTimer)
            this.autoChanger()
        }
    }

    touchStart(event) {
        clearTimeout(this.autoTimer);
        clearTimeout(this.animationTimer);
        this.clickX = event.targetTouches[0].pageX;

        this.startX = event.targetTouches[0].pageX;
        this.startY = event.targetTouches[0].pageY;

        this.moveX = event.targetTouches[0].pageX;

        this.rollAfterBorder = false;

        window.addEventListener('touchmove', this.touchDrag);
        this.resetStyleTransition();
    }

    touchStop() {
        window.removeEventListener('touchmove', this.touchDrag);
        this.positionTrack = -(this.currentSlide * this.slideWidth);
        this.startPositionTrack = this.positionTrack;
        this.setStyleTransition()
        this.slideChanger()
        this.setTrackPosition()
        this.shift = 0;

        clearTimeout(this.autoTimer);
        clearTimeout(this.animationTimer);
        if (this.autoChange === true && this.infinite === true) {

            this.animationTimer = setTimeout(() => {
                if (this.currentSlide === 6) {
    
                    this.resetStyleTransition();
                    this.currentSlide = 1;
                    this.positionTrack = -(this.currentSlide * this.slideWidth);
                    this.setTrackPosition()
                    this.startPositionTrack = this.positionTrack;
                }
            }, this.animationDuration)
    
    
    
            clearTimeout(this.autoTimer)
            this.autoChanger()
        }
    }

    //---------------------------------


    mouseDrag(event) {
        this.nowX = event.pageX;

        if (this.startX !== event.pageX) {
            this.moveX += event.pageX - this.startX;
            this.startX = event.pageX;
        }

        this.shift = this.moveX - this.clickX;
        this.positionTrack = this.startPositionTrack + this.shift;

        if (this.infinite === false) {
            this.stickyEdges()
        }
        else {
            if (0 < this.positionTrack) {
                this.positionTrack = this.backToEndPoint;
                this.moveX = this.clickX;
                this.startPositionTrack = this.backToEndPoint;

                this.rollAfterBorder = true;

            }
            if (this.positionTrack < - (this.countSlides - 1) * this.slideWidth) {
                this.positionTrack = this.backToStartPoint;
                this.moveX = this.clickX;
                this.startPositionTrack = this.backToStartPoint;

                this.rollAfterBorder = true;

            }
        }
        
        this.setTrackPosition()
    }

    touchDrag(event) {
        this.nowX = event.targetTouches[0].pageX;

        if (this.startX !== event.targetTouches[0].pageX) {
            this.moveX += event.targetTouches[0].pageX - this.startX;
            this.startX = event.targetTouches[0].pageX;
        }

        this.shift = this.moveX - this.clickX;
        this.positionTrack = this.startPositionTrack + this.shift;

        if (this.infinite === false) {
            this.stickyEdges()
        }
        else {
            if (0 < this.positionTrack) {
                this.positionTrack = this.backToEndPoint;
                this.moveX = this.clickX;
                this.startPositionTrack = this.backToEndPoint;

                this.rollAfterBorder = true;
            }
            if (this.positionTrack < - (this.countSlides - 1) * this.slideWidth) {
                this.positionTrack = this.backToStartPoint;
                this.moveX = this.clickX;
                this.startPositionTrack = this.backToStartPoint;

                this.rollAfterBorder = true;

            }
        }
        this.setTrackPosition()

    }

    // methods for change slides

    slideChanger() {
        if (this.infinite === true) {
            if (this.rollAfterBorder === true && this.shift > 30) {
                switch (this.numberSlideClicked) {
                    case 0:
                        this.resetStyleTransition();
                        this.positionTrack = -(5 * this.slideWidth);
                        this.currentSlide = 5;
                        break;
                    case 1:
                        this.resetStyleTransition();
                        this.positionTrack = -(6 * this.slideWidth);
                        this.currentSlide = 6;
                        break;
                    default:
                        this.resetStyleTransition();
                        this.positionTrack = -(this.numberSlideClicked * this.slideWidth);
                        this.currentSlide = this.numberSlideClicked;
                        break;
                }
                this.setTrackPosition();
                this.prevSlide()
            }
            else if (this.rollAfterBorder === true && this.shift < -30) {
                switch (this.numberSlideClicked) {
                    case 6:
                        this.resetStyleTransition();
                        this.positionTrack = -(1 * this.slideWidth);
                        this.currentSlide = 1;
                        break;
                    case 5:
                        this.resetStyleTransition()
                        this.positionTrack = 0;
                        this.currentSlide = 0;
                        break;
                    default:
                        this.resetStyleTransition()
                        this.positionTrack = - this.numberSlideClicked * this.slideWidth;
                        this.currentSlide = this.currentSlide;
                }
                this.setTrackPosition()
                this.nextSlide()
            }
            else if (this.rollAfterBorder === false && this.shift > 30) {
                this.currentSlide = this.numberSlideClicked;
                this.prevSlide()
            }
            else if (this.rollAfterBorder === false && this.shift < -30) {
                this.currentSlide = this.numberSlideClicked;
                this.nextSlide()
            }
        }
        else {
            if (this.shift < -30 && this.currentSlide < this.countSlides - 1) {
                this.nextSlide()
            }
            else if (this.shift > 30 && this.currentSlide > 0) {
                this.prevSlide()
            }
        }
        if (this.shift >= -30 && this.shift <= 30) {
            this.positionTrack = -(this.currentSlide * this.slideWidth);
            this.startPositionTrack = this.positionTrack;
            this.setTrackPosition();
        }
        
        this.shift = 0;
    }

    nextSlide() {
        this.resetStyleTransition()
        this.positionTrack -= this.slideWidth
        this.currentSlide += 1;
        this.setStyleTransition()
        this.setTrackPosition()
        this.startPositionTrack = this.positionTrack

        if (this.autoChange === true && this.infinite === true) {

            this.animationTimer = setTimeout(() => {
                if (this.currentSlide === 6) {
    
                    this.resetStyleTransition();
                    this.currentSlide = 1;
                    this.positionTrack = -(this.currentSlide * this.slideWidth);
                    this.setTrackPosition()
                    this.startPositionTrack = this.positionTrack;
                }
            }, this.animationDuration)
    
    
    
            clearTimeout(this.autoTimer)
            this.autoChanger()
        }
    }

    autoChanger() {
        if (this.autoChange === false) { return }

        this.autoChangePromise = new Promise((resolve, reject) => {
            this.autoTimer = setTimeout(() => {
                this.autoHandler()
                resolve()
            }, this.autoChangeDuration)
        })
        this.autoChangePromise.then(() => {

            this.animationTimer = setTimeout(() => {
                if (this.currentSlide === 6) {

                    this.resetStyleTransition();
                    this.currentSlide = 1;
                    this.positionTrack = -(this.currentSlide * this.slideWidth);
                    this.setTrackPosition()
                    this.startPositionTrack = this.positionTrack;
                }
            }, this.animationDuration)

        })
    }

    prevSlide() {
        this.currentSlide -= 1;

        this.positionTrack = -(this.currentSlide * this.slideWidth);
        this.setStyleTransition()
        this.setTrackPosition(this.positionTrack)
        this.startPositionTrack = this.positionTrack;

        this.animationTimer = setTimeout(() => {
            if (this.currentSlide === 6) {

                this.resetStyleTransition();
                this.currentSlide = 1;
                this.positionTrack = -(this.currentSlide * this.slideWidth);
                this.setTrackPosition()
                this.startPositionTrack = this.positionTrack;
            }
        }, this.animationDuration)



        clearTimeout(this.autoTimer)
        this.autoChanger()
    }

    // style methods

    setTrackPosition() {
        this.sliderTrack.style.transform = `translate3d(${this.positionTrack}px, 0, 0)`;
    }

    setStyleTransition() {
        this.sliderTrack.style.transition = `all ${this.animationDuration / 1000}s`;
    }

    resetStyleTransition() {
        this.sliderTrack.style.transition = `none`;
    }

    // option methods

    stickyEdges() {
        // Липкие края
        // Левый липкий край
        if (this.positionTrack > 0) {
            this.positionTrack = (this.startPositionTrack + this.shift) / 2.47
            this.raznica = this.positionTrack;
        }
        // Правый липкий край
        else if (this.positionTrack < -((this.countSlides - 1) * this.slideWidth)) {
            let fartHestPoint = -((this.countSlides - 1) * this.slideWidth)
            let delta = fartHestPoint - this.positionTrack
            this.positionTrack = fartHestPoint - delta / 2.47
            this.raznica = this.positionTrack;

            // решение через условие, если слайдер утоплен глубже, чем стартовая позиция его последного слайда,
            // то для рассчетов берём вместо positionTrack значение fartHestPoint - длинна слайдера без последнего слайда со знаком минус,
            // и после этого топим на дельту, которая делитсян а коэфициент замедления(2.47), т.е. вместо -2106(fartHestPoin) - 1, -2, -3 ... n,
            // мы берём -2106(fartHestPoin) - 0.404, -0.809, -1.214 ... n / 2.47

            // delta it is difference 
            // let delta = -((this.countSlides - 1) * this.slideWidth) - this.positionTrack // v 1.0
        }
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