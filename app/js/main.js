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

class Product {

    constructor(paramsObj) {
        this.id = paramsObj.id
        this.type = paramsObj.type;
        this.price = paramsObj.price;
        this.name = paramsObj.name;
        this.weight = paramsObj.weight;
        this.imgUrl = paramsObj.imgUrl;

        this.method = this.methodParam.bind(this)
    }

    methodParam() {
        return this.name
    }
}

class ProductInTabs extends Product {
    constructor(paramsObj) {
        super(paramsObj)
        this.area = document.querySelector(`.${this.type}__list`)
        this.getParams = this.getParamObj.bind(this)

    }

    getParamObj () {
        console.log(
            {
                id: this.id,
                type: this.type,
                name: this.name,
                price: this.price,
                weight: this.weight,
                imgUrl: this.imgUrl
            }
        )
        return {
                id: this.id,
                type: this.type,
                name: this.name,
                price: this.price,
                weight: this.weight,
                imgUrl: this.imgUrl
            }
    }


    btn () {
        const btn = document.createElement('button');
        btn.classList.add('products__order-by');
        btn.innerHTML = 'Заказать';
        btn.addEventListener('click', this.getParams.bind(this))

        return btn;
    }

    renderInTab() {

        const item = document.createElement(`li`)
        item.classList.add('products__item')
        item.innerHTML += `<img class="products__img" src="${this.imgUrl}" alt="soup">
                           <p class="products__item-name">${this.name}</p>
                           <span class="products__item-price">${this.price}</span>
                           <div class="products__decorative-layer"></div>`

        item.appendChild(this.btn());

        this.area.appendChild(item);
    }

}











































// let a = new ProductInTabs({type = 'hot-dishes', price = 223.50, name = 'Суп лапша на корейском бульоне', imgUrl = 'images/content/hot-dishes-img.png'})
// a.renderInTab()


// class ProductInBasket extends Product {
//     constructor(paramsObj) {
//         super(paramsObj)
//         this.area = document.querySelector(`.${this.type}__list`)
//     }

//     renderInOrder() {

//         const item = document.createElement('li')
//         item.classList.add('order-panel__item');
//         item.innerHTML += `<div class="order-panel__item-top">
//                                 <div class="order-panel__item-product">
//                                 <img class="order-panel__item-product-img" src="${this.imgUrl}" alt="">
//                                 <div class="order-panel__item-product-info">
//                                     <p class="order-panel__item-product-info-name">${this.name}</p>
//                                     <p class="order-panel__item-product-info-price">${this.weight}</p>
//                                 </div>
//                                 <p class="order-panel__item-product-count">2</p>
//                                 <p class="order-panel__item-product-total-price">540</p>
//                                 </div>
//                             </div>
//                             <div class="order-panel__item-bottom">
//                              <form class="order-panel__item-form" action="">
//                                 <input class="order-panel__item-input input-text" type="text" placeholder="Ваши пожелания к блюду...">
//                              </form>
//                                 <button class='order-panel__item-remove-btn'>
//                                 <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M13.7325 6.26564L13.8153 6.26677C14.1229 6.2922 14.3587 6.54759 14.375 6.855L14.3671 7.02641L14.105 10.2358L13.8301 13.3678C13.7719 13.993 13.7198 14.5204 13.6749 14.9355C13.5187 16.3823 12.5796 17.2769 11.1638 17.3034C8.95781 17.3441 6.83731 17.3437 4.7781 17.2992C3.40331 17.2703 2.47805 16.366 2.32462 14.9414L2.21858 13.8918L2.03328 11.8558L1.84347 9.62168L1.62643 6.93986C1.59946 6.59578 1.84959 6.29442 2.18512 6.26676C2.49269 6.2414 2.76525 6.45483 2.82932 6.7556L2.85426 7.0014L3.05805 9.51556L3.28057 12.1215C3.38038 13.2496 3.46695 14.1626 3.53622 14.804C3.62365 15.6158 4.05115 16.0336 4.80343 16.0494C6.84654 16.0936 8.95123 16.094 11.1417 16.0535C11.9398 16.0386 12.374 15.6249 12.4633 14.7978L12.5689 13.7538C12.5998 13.4321 12.6328 13.0769 12.6678 12.691L12.8905 10.1281L13.1588 6.83954C13.1836 6.52414 13.4327 6.28238 13.7325 6.26564ZM1.10949 4.82428C0.772879 4.82428 0.5 4.54445 0.5 4.19926C0.5 3.88283 0.729294 3.62133 1.02679 3.57994L1.10949 3.57423H3.76476C4.0803 3.57423 4.35654 3.36602 4.45535 3.06604L4.47953 2.9734L4.68587 1.92106C4.86759 1.2241 5.45767 0.72787 6.14916 0.671902L6.27993 0.666626H9.7199C10.4229 0.666626 11.0436 1.12186 11.2826 1.82528L11.3228 1.96003L11.5203 2.97315C11.5822 3.29056 11.8354 3.52762 12.1417 3.5681L12.2351 3.57423H14.8905C15.2271 3.57423 15.5 3.85406 15.5 4.19926C15.5 4.51568 15.2707 4.77719 14.9732 4.81857L14.8905 4.82428H1.10949ZM9.7199 1.91667H6.27993C6.10892 1.91667 5.95691 2.01931 5.89377 2.14831L5.87235 2.20499L5.67483 3.21861C5.65067 3.34233 5.61566 3.46146 5.57093 3.57506L10.429 3.57522C10.4011 3.50434 10.377 3.43132 10.3569 3.35636L10.325 3.21836L10.1364 2.24396C10.0923 2.07489 9.95612 1.95111 9.79185 1.92281L9.7199 1.91667Z" fill="#EA9769"/>
//                                 </svg>                
//                                 </button>
//                             </div>`
        
//         this.area.appendChild(item)
//     }
// }

// let b = new ProductInBasket({type = 'order', price = 223.50, name = 'Суп лапша на корейском бульоне', imgUrl = 'images/content/order-mini.png'})
// b.renderInOrder()






let productsList = {

    0 : {   
        "type" : 'hot-dishes',
        "price": 113.23,
        "name": 'Суп гороховый',
        "weight": 270,
        "urlImg": 'images/content/hot-dishes-img.png',
        },
    
    1 : {   
        "type" : 'hot-dishes',
        "price": 143.50,
        "name": 'Суп с морским горохом',
        "weight": 270,
        "urlImg": 'images/content/hot-dishes-img.png',
        },
    2 : {
        "type": 'hot-dishes',
        "price": 213.50,
        "name": 'Гороховый суп по-итальянски',
        "weight": 270,
        "urlImg": 'images/content/hot-dishes-img.png',
    },

    3 : {
        "type": 'hot-dishes',
        "price": 444.50,
        "name": 'Суп с тонкими моллюсками(гороховые моллюски)',
        "weight": 270,
        "urlImg": 'images/content/hot-dishes-img.png',
    },
    4 : {
        "type": 'hot-dishes',
        "price": 233.50,
        "name": 'Суп с гороховым кремом',
        "weight": 270,
        "urlImg": 'images/content/hot-dishes-img.png',
    },

    5 : {
        "type": 'hot-dishes',
        "price": 111.10,
        "name": 'Кипяток',
        "weight": 270,
        "urlImg": 'images/content/hot-dishes-img.png',
    },

    6 : {
        "type": 'hot-dishes',
        "price": 228.1488,
        "name": 'Самса',
        "weight": 270,
        "urlImg": 'images/content/hot-dishes-img.png',
    },
}

        
for (let i in productsList) {
    let productItem = new ProductInTabs(productsList[i]);
    productItem.renderInTab();
}




// class ListProduct {
    
    
//     constructor(typeOfProducts, area) {
        
//         this.area = area + '__list';
//         this.typeOfProducts = typeOfProducts;
//         this.container = [];
        

//     }

//     createUl() {
//         const ul = document.createElement('ul')
//         ul.classList.add(this.area)
//     }

//     insertInContainer(products) {
        

//         for (let i in products) {
//             let productItem = new ProductInTabs(products[i]);
//             productItem.renderInTab();
//         }
//     }

// }
