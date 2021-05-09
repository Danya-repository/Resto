$(function () {

    headerSearchToggle = function () {
        
        let headerSearchOpenBtn = document.querySelector('.header__search-open-btn');
        let headerSearchForm = document.querySelector('.header__search-form');

        return headerSearchOpenBtn.addEventListener('click', function (event) {
            event.preventDefault;

            if (headerSearchForm.classList.contains('header__search-form-disable')) {
                headerSearchOpenBtn.classList.add('header__search-open-btn--active');
                headerSearchForm.classList.remove('header__search-form-disable');

            }
            else {
                headerSearchOpenBtn.classList.remove('header__search-open-btn--active');
                headerSearchForm.classList.add('header__search-form-disable');
            }
        });
    }();
    

    headerBasketOrderToggle = function () {
        
        let basketBtn = document.querySelector('.user-panel__btn.user-panel__basket');
        let cancelBtn = document.querySelector('.order-panel__close-btn');
        let orderPanel = document.querySelector('.order-panel');
        

        return function () {
            
            basketBtn.addEventListener('click', function (event) {
                console.log('hello')
                event.preventDefault;
                orderPanel.classList.add('order-panel--active');
            });

            cancelBtn.addEventListener('click', function (event) {
                console.log('hello')
                event.preventDefault;
                orderPanel.classList.remove('order-panel--active');
            });


        }();
    }();

    userbarToggle = function () {
        
        userBar = document.querySelector('.user-bar');
        dropDown = document.querySelector('.user-bar__info-drop-down');

        $('.user-bar').on('click', function () {
           
            $('.user-bar__info-drop-down').slideToggle();
            $('.user-icon').toggleClass('user-icon--active');

        });
    }();
    
    carousel = function () {

        


        let getCarouselSlides = function() {

            let itemList = document.querySelector('.collage__carousel');
            let carouselSlides = Array.from(itemList.children)
                                    .filter(item =>  item.className.includes('collage__carousel-slide'));

            return carouselSlides;
        }();
        let getInfoSlides = function () {
            let itemList = document.querySelector('.collage__info');
            let infoSlides = Array.from(itemList.children);

            return infoSlides;
        }();

        let userChangeSlide = function () {
            
            let clickSlideArea = document.querySelector('.collage__carousel');
            
            clickSlideArea.addEventListener('click', function (event) {
                if (event.target.parentNode.classList.contains('collage__carousel-slide')) {
                    getActiveSlide().classList.remove('collage__carousel-slide--active');
                    event.target.parentNode.classList.add('collage__carousel-slide--active');
                    mainSlideWindowInserter();
                    mainSlideInfoInserter();
                }
                
            })

        }();

        let slideChanger = function (slides = getCarouselSlides) {
        

            for (let i = 0; i < slides.length; i++) {

                if (slides[i].className.includes('collage__carousel-slide--active')) {



                    slides[i].classList.remove('collage__carousel-slide--active');

                    if (i+1 <= slides.length-1) {
                        return slides[i+1].classList.add('collage__carousel-slide--active');
                    
                    }
                    else {
                        return slides[0].classList.add('collage__carousel-slide--active');

                    }

                }

            }
        
        }
 

        let mainSlideWindowInserter = function (slides = getCarouselSlides) {
            
            let mainSliderWindow = document.querySelector('.collage__carousel-window');
            
            
                    
                    let activeSlideImg = getActiveSlide().querySelector('img').cloneNode()

                    mainSliderWindow.innerHTML = "";
                    mainSliderWindow.appendChild(activeSlideImg);




        }

        let getActiveSlide = function (slides = getCarouselSlides) {
            for (let i = 0; i < slides.length; i++) {
                if (slides[i].className.includes('collage__carousel-slide--active')) {
                    return slides[i];
                }
            }
        }


        let mainSlideInfoInserter = function () {

                    
            let numberSlideActive  = getActiveSlide()
                                        .classList
                                        .item(1)
                                        .slice(-1);
                                        
            for (let i of getInfoSlides) {
                if (i.classList.contains('collage__info-slide--active')) {
                    i.classList.remove('collage__info-slide--active');
                    return getInfoSlides[numberSlideActive - 1].classList.add('collage__info-slide--active');

                }
                    
            }


                                    
            console.log(numberSlideActive)

        }

        mainSlideWindowInserter(); // init first img in window-carousel

        let sliderMove = function () {
            slideChanger();
            mainSlideWindowInserter();
            mainSlideInfoInserter();
        }
        
        return setInterval(sliderMove, 7000);
        
        
    }();

    animationAllItemAfterScroll = function () {
        
        animItems = document.querySelectorAll('.animated-item');

        if (animItems.length > 0) {
            window.addEventListener('scroll', anim)
            function anim() {
                for (let i = 0; i < animItems.length; i++) {
                    const animItem = animItems[i];
                    const animItemHeight = animItem.offsetHeight;
                    const animItemOffset = offset(animItem).top;
                    const animStart = 6;

                    let animItemPoint = window.innerHeight - animItemHeight / animStart;

                    if(animItemHeight > window.innerHeight) {
                        animItemPoint = window.innerHeight - window.innerHeight / animStart;
                    }

                    if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                        animItem.classList.add('animated-item--active');
                    }
                    else {
                        if (!animItem.classList.contains('animated-no-hide')) {

                            animItem.classList.remove('animated-item--active');
                        }
                    }
                }
            }
            function offset(el) {
                const rect = el.getBoundingClientRect(),
                    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
            }
        }
        setTimeout(anim, 500);

    }();

    animationHeaderFixed = function () {
        
        headerWrapperTop = document.querySelector('.header__wrapper-top')
        headerWrapperBottom = document.querySelector('.header__wrapper-bottom')


        window.addEventListener('scroll', function () {

            // console.log(headerWrapperTop.getBoundingClientRect().top + headerWrapperTop.offsetHeight)

            if (headerWrapperTop.getBoundingClientRect().top + headerWrapperTop.offsetHeight <= 0) {

                headerWrapperBottom.classList.add('header__wrapper-bottom--animation-fix-to-top')
                headerWrapperTop.style.marginBottom = `${headerWrapperTop.offsetHeight}px`
            }
            else {
                headerWrapperBottom.classList.remove('header__wrapper-bottom--animation-fix-to-top')
                headerWrapperTop.style.marginBottom = `0`
            }
            
        })


    }();

    tabs = function () {
        
        allTabBtns = document.querySelectorAll('.tab-btn');
        allTabs = document.querySelectorAll('.tab')

        document.body.addEventListener('click', function (event) {
            if (event.target.classList.contains('tab-btn')) {
                // console.log(event.target.classList[2].slice(-1))
                for (let i of allTabBtns) {
                    i.classList.remove('tab-btn--active')
                }
                event.target.classList.add('tab-btn--active')
                for (let i of allTabs) {
                    i.classList.remove('tab--active')
                    if (i.classList[2].slice(-1) == event.target.classList[2].slice(-1)) {
                        i.classList.add('tab--active')
                    }
                }
                
                // event.target.classList.add('tab-btn--active');
                // console.log(event.target.classList[2].slice(-1))

            }
        })




    }();

        
    



});

class ProductItem {

    type = 'hot-dishes'
    name = ''
    price = ''
    imgUrl = 'images/content/hot-dishes-img.png'


    constructor(nameOfProduct, priceOfProduct, typeOfProduct, imgUrlOfProduct) {

        this.type = typeOfProduct
        this.name = nameOfProduct;
        this.price = priceOfProduct;
        this.imgUrl = imgUrlOfProduct;


    }

    getTemplate () {
        const templateForRendering = document.querySelector(`.${this.type}__list`);
        return templateForRendering;
    }

    insertImgItem () {
        const img = document.createElement('img');
        img.setAttribute('src', this.imgUrl);
        img.classList.add('products__img');

        return img
    }

    insertNameItem () {
        const name = document.createElement('p');
        name.classList.add('products__item-name');
        name.innerHTML = this.name;

        return name
    }

    insertItemPrice () {
        const price = document.createElement('span');
        price.classList.add('products__item-price')
        price.innerHTML = this.price;

        return price
    } 

    renderDecorativeLayer () {
        const decorativeLayer = document.createElement('div');
        decorativeLayer.classList.add('products__decorative-layer');

        return decorativeLayer
    }

    inserItemBtn () {
        const btn = document.createElement('button')
        btn.classList.add('products__order-by');
        btn.innerHTML = 'Заказать';

        return btn    
    }


    renderItem() {
        let template = this.getTemplate();


        const productItem = document.createElement('li');
        productItem.classList.add('products__item');
        
        const [image, name, price, layer, button] = [
                                                    this.insertImgItem(),
                                                    this.insertNameItem(),
                                                    this.insertItemPrice(),
                                                    this.renderDecorativeLayer(),
                                                    this.inserItemBtn()
                                                ]
        
        
        productItem.appendChild(image);
        productItem.appendChild(name);
        productItem.appendChild(price);
        productItem.appendChild(layer);
        productItem.appendChild(button);


        template.appendChild(productItem);
        

    }







}