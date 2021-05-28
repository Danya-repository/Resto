class LocalStorageUtil {

  constructor() {
    this.key = 'products';
  }

  getProducts() {
    const productsLocalStorage = localStorage.getItem(this.key)

    if (productsLocalStorage !== null) {
      return JSON.parse(productsLocalStorage)
    }
    else {
      return {};
    }
  }

  putProducts(id, {type, price, name, weight, imgUrl, classInstanceName}) {
    let listOfProductsInLocalStorage = this.getProducts();
    let inOrderStatus = false;
    let availableInLocalStorage = id in listOfProductsInLocalStorage;

    if (availableInLocalStorage === true) {
        
        delete listOfProductsInLocalStorage[id]

    } else if (availableInLocalStorage === false) {
        
        listOfProductsInLocalStorage[id] = {type, price, name, weight, imgUrl, classInstanceName}
        listOfProductsInLocalStorage[id].count = 1;


        inOrderStatus = true;
    }
  
    localStorage.setItem(this.key, JSON.stringify(listOfProductsInLocalStorage))

    return {inOrderStatus, listOfProductsInLocalStorage}
  }
}

const localStorageUtil = new LocalStorageUtil();

  
class Products {

    constructor(classInstanceName, type) {
      this.classNameActive = `products__order-by--active`;
      this.labelAdd = `Заказать`
      this.labelRemove = `Заказано`

      this.type = type;
      this.classInstanceName = classInstanceName;

      this.productsOfThisCategory = {};
      this.place = document.querySelector(`.${this.type}__catalog`)
      this.template = `<div class="filters">
                        <div class="filters__tab-buttons">
                          <button class="filters__tab-button filter__tab-button-category filters__tab-button--active" onclick="${this.classInstanceName}.filterTabSwitcher(this)">Категория</button>
                          <button class="filters__tab-button filter__tab-button-name" onclick="${this.classInstanceName}.filterTabSwitcher(this)">Название</button>
                        </div>
                        <div class="filters__tab">
                          <div class="filter__tab filters__tab-category filter__tab--active">
                            <ul class="category-tab__list">
                              <li class="category-tab__item">
                                <p class="category__slide-item-title">Тип супа</p>
                                <div class="category__slide-item-content">
                                  здесь конь-тент
                                </div>
                              </li>
                              <li class="category-tab__item">
                                <p class="category__slide-item-title">Тип супа</p>
                                <div class="category__slide-item-content">
                                  здесь конь-тент
                                </div>
                              </li>
                              <li class="category-tab__item">
                                <p class="category__slide-item-title">Тип супа</p>
                                <div class="category__slide-item-content">
                                  здесь конь-тент
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div class="filter__tab filters__tab-name">второй таб</div>
                        </div>
                      </div>`
    }
  
    handleSetLocationStorage(element, id) {

      const {inOrderStatus, listOfProductsInLocalStorage} = localStorageUtil.putProducts(id, this.productsOfThisCategory[id])
  
      if (inOrderStatus) {
        element.classList.add(this.classNameActive);
        element.innerHTML = this.labelRemove;
      }
  
      else {
        element.classList.remove(this.classNameActive);
        element.innerHTML = this.labelAdd;
      }
  
      basketButton.render(Object.keys(listOfProductsInLocalStorage).length); // в параметрах узнаем длинну списка, т.е. количество свойств объекта

      basket.getOrderProductsFromBasketLayout().childNodes.forEach(item => console.log(item.dataset))
  
    }
  
    removeProductFromOrdered(id) {
      const item = document.getElementById(id)
      const itemButton = item.querySelector('button');
      itemButton.classList.remove(this.classNameActive)
      itemButton.innerText = this.labelAdd;
  
    }
  
    filterTabSwitcher(element) {

      const categoryBtn = this.place.querySelector('.filter__tab-button-category')
      const nameBtn = this.place.querySelector('.filter__tab-button-name')
      const categoryTab = this.place.querySelector('.filters__tab-category');
      const nameTab = this.place.querySelector('.filters__tab-name');


      categoryBtn.classList.remove('filters__tab-button--active')
      nameBtn.classList.remove('filters__tab-button--active')
      categoryTab.classList.remove('filter__tab--active')
      nameTab.classList.remove('filter__tab--active')

      if (element === categoryBtn) {
        // element.classList.add('filters__tab-button--active')
        // console.log('hello')
        categoryBtn.classList.add('filters__tab-button--active')
        categoryTab.classList.add('filter__tab--active')
      } 
      else if (element === nameBtn) {
        nameBtn.classList.add('filters__tab-button--active')
        nameTab.classList.add('filter__tab--active')
      }

    

    }


    render() {
      const listOfProductsInLocalStorage = localStorageUtil.getProducts();
      let catalogContent = ``
      let catalogItems = ``;
      let CATALOG = [];


      
      fetch(`./database/${this.type}.json`)
        .then(res => res.json())
        .then(products =>  {
          CATALOG = products.goods;
          CATALOG.forEach(({id, type, price, name, weight, imgUrl}) => {
            
            this.productsOfThisCategory[id] = {type, price, name, weight, imgUrl}
            this.productsOfThisCategory[id].classInstanceName = this.classInstanceName




            let activeClass = ``;
            let activeText = ``;
            let availableInLocalStorage = id in listOfProductsInLocalStorage;
  
            if (availableInLocalStorage === true) {
                activeText = this.labelRemove;
                activeClass = ` `+ this.classNameActive;
            }
            else if (availableInLocalStorage === false) {
                activeText = this.labelAdd;
            }
      
      
            catalogItems += `<li class="products__item" id="${id}">
                              <img class="products__img" src="${imgUrl}" alt="soup">
                              <p class="products__item-name">${name}</p>
                              <span class="products__item-price">${price}</span>
                              <div class="products__decorative-layer"></div>
                              <button class="products__order-by${activeClass}" onclick="${this.classInstanceName}.handleSetLocationStorage(this, ${id});">
                                ${activeText}
                              </button>
                            </li>`
      
            })

            catalogContent = `<ul class = "catalog-area hot-dishes__list hot-dishes">
                                  ${catalogItems}
                              </ul>` + this.template

            this.place.innerHTML = catalogContent;
        })
    }
}


let productsHotDishes = new Products('productsHotDishes','hot-dishes')
let productsColdDishes = new Products('productsColdDishes','cold-dishes')
let productsSoups = new Products('productsSoups', 'soups')
let productsGrill = new Products('productsGrill','grill')
let productsSalads = new Products('productsSalads','salads')
let productsHotDesserts = new Products('productsHotDesserts','desserts')

class BasketButton {

    render(count) {
      const place = document.querySelector('.user-panel__basket-count-wrapper')
  
      let html = `<p class="user-panel__basket-count">${count}</p>`
  
      if (count > 0) {
        place.innerHTML = html;
      }
      else {
        place.innerHTML = ``;
      }
  
    }
  }
  
const basketButton = new BasketButton();
let listOfProductsInLocalStorage = localStorageUtil.getProducts()
basketButton.render(Object.keys(listOfProductsInLocalStorage).length);

class Basket {
    constructor() {
        this.productsOfBasket = {}
        this.place = document.querySelector('.order-panel')
    }

  removeProductFromBasket(element, id) {
    localStorageUtil.putProducts(id, this.productsOfBasket[id]);
    basketButton.render(Object.keys(listOfProductsInLocalStorage).length)
    
    element.parentNode.parentNode.innerHTML = ``

  }

  increaseCount(element, id) {
    const listOfProductsInLocalStorage = localStorageUtil.getProducts();

    listOfProductsInLocalStorage[id].count +=1;
    localStorage.setItem('products', JSON.stringify(listOfProductsInLocalStorage))
    
    element.parentNode.querySelector('.product-count-block__value').innerHTML = listOfProductsInLocalStorage[id].count;

  }

  decreaseCount(element, id) {
    const listOfProductsInLocalStorage = localStorageUtil.getProducts();
    if (listOfProductsInLocalStorage[id].count > 1) {
        listOfProductsInLocalStorage[id].count -= 1;
      localStorage.setItem('products', JSON.stringify(listOfProductsInLocalStorage))
      
      element.parentNode.querySelector('.product-count-block__value').innerHTML = listOfProductsInLocalStorage[id].count;
    }
  }

  render() {
      const listOfProductsInLocalStorage = localStorageUtil.getProducts()
      let basketProductListHtml = ``;
      let totalCost = 0;

      for (let id in listOfProductsInLocalStorage) {

        this.productsOfBasket[id] = listOfProductsInLocalStorage[id];
        let {name, price, imgUrl, count, classInstanceName} = listOfProductsInLocalStorage[id]

        basketProductListHtml += `<li class="order-panel__item" data-id-in-basket=${id}>
                                    <div class="order-panel__item-top">
                                      <div class="order-panel__item-product">
                                        <img class="order-panel__item-product-img" src="./${imgUrl}" alt="">
                                        <div class="order-panel__item-product-info">
                                          <p class="order-panel__item-product-info-name">${name}</p>
                                          <p class="order-panel__item-product-info-price">${price}</p>
                                        </div>
                                        <div class="product-count-block">
                                          <button class="product-count-block__minus-button" onclick="basket.decreaseCount(this, ${id})">-</button>
                                          <p class="order-panel__item-product-count product-count-block__value">${count}</p>
                                          <button class="product-count-block__plus-button" onclick="basket.increaseCount(this, ${id})">+</button>
                                        </div>
                                        <p class="order-panel__item-product-total-price">${count * price}</p>
                                      </div>
                                    </div>
                                    <div class="order-panel__item-bottom">
                                      <form class="order-panel__item-form" action="">
                                        <input class="order-panel__item-input input-text" type="text" placeholder="Ваши пожелания к блюду...">
                                      </form>
                                      <button class='order-panel__item-remove-btn' onclick="basket.removeProductFromBasket(this, ${id}); ${classInstanceName}.removeProductFromOrdered(this, ${id})">
                                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M13.7325 6.26564L13.8153 6.26677C14.1229 6.2922 14.3587 6.54759 14.375 6.855L14.3671 7.02641L14.105 10.2358L13.8301 13.3678C13.7719 13.993 13.7198 14.5204 13.6749 14.9355C13.5187 16.3823 12.5796 17.2769 11.1638 17.3034C8.95781 17.3441 6.83731 17.3437 4.7781 17.2992C3.40331 17.2703 2.47805 16.366 2.32462 14.9414L2.21858 13.8918L2.03328 11.8558L1.84347 9.62168L1.62643 6.93986C1.59946 6.59578 1.84959 6.29442 2.18512 6.26676C2.49269 6.2414 2.76525 6.45483 2.82932 6.7556L2.85426 7.0014L3.05805 9.51556L3.28057 12.1215C3.38038 13.2496 3.46695 14.1626 3.53622 14.804C3.62365 15.6158 4.05115 16.0336 4.80343 16.0494C6.84654 16.0936 8.95123 16.094 11.1417 16.0535C11.9398 16.0386 12.374 15.6249 12.4633 14.7978L12.5689 13.7538C12.5998 13.4321 12.6328 13.0769 12.6678 12.691L12.8905 10.1281L13.1588 6.83954C13.1836 6.52414 13.4327 6.28238 13.7325 6.26564ZM1.10949 4.82428C0.772879 4.82428 0.5 4.54445 0.5 4.19926C0.5 3.88283 0.729294 3.62133 1.02679 3.57994L1.10949 3.57423H3.76476C4.0803 3.57423 4.35654 3.36602 4.45535 3.06604L4.47953 2.9734L4.68587 1.92106C4.86759 1.2241 5.45767 0.72787 6.14916 0.671902L6.27993 0.666626H9.7199C10.4229 0.666626 11.0436 1.12186 11.2826 1.82528L11.3228 1.96003L11.5203 2.97315C11.5822 3.29056 11.8354 3.52762 12.1417 3.5681L12.2351 3.57423H14.8905C15.2271 3.57423 15.5 3.85406 15.5 4.19926C15.5 4.51568 15.2707 4.77719 14.9732 4.81857L14.8905 4.82428H1.10949ZM9.7199 1.91667H6.27993C6.10892 1.91667 5.95691 2.01931 5.89377 2.14831L5.87235 2.20499L5.67483 3.21861C5.65067 3.34233 5.61566 3.46146 5.57093 3.57506L10.429 3.57522C10.4011 3.50434 10.377 3.43132 10.3569 3.35636L10.325 3.21836L10.1364 2.24396C10.0923 2.07489 9.95612 1.95111 9.79185 1.92281L9.7199 1.91667Z" fill="#EA9769"/>
                                          </svg>                
                                      </button>
                                    </div>
                                  </li>`
            totalCost+= price * count;
      }

      let basketHtml = `<h3 class="order-panel__title subtitle">Заказ #11</h3>
                           <ul class="order-panel__status-bar">
                             <li class="order-panel__status">Формируется</li>
                           </ul>
                           <div class="order-panel__item-list-titles">
                             <h4 class="order-panel__item-list-title title-pos">Позиция</h4>
                             <h4 class="order-panel__item-list-title item-list-title__count">Количество</h4>
                             <h4 class="order-panel__item-list-title item-list-title__price">Цена</h4>
                           </div>
                           <ul class="order-panel__item-list" data-simplebar>
                              ${basketProductListHtml}
                           </ul>
                           <div class="order-panel__order-total-info">
                             <div class="order-total-info__keys">
                               <span class="order-total-info__key">Скидка</span>
                               <span class="order-total-info__key">Общая стоимость</span>
                             </div>
                             <div class="order-total-info__values">
                               <div class="order-total-info__value">0</div>
                               <div class="order-total-info__value">${totalCost}</div>
                             </div>
                           </div>
                           <button class="order__submit" type="submit">
                             Завершить покупку
                           </button>
                           <button class="order-panel__close-btn" onclick="basket.hideOrShow()">
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 496.096 496.096" style="enable-background:new 0 0 496.096 496.096;" xml:space="preserve">
                            <g>
                              <g>
                              <path d="M259.41,247.998L493.754,13.654c3.123-3.124,3.123-8.188,0-11.312c-3.124-3.123-8.188-3.123-11.312,0L248.098,236.686
                                L13.754,2.342C10.576-0.727,5.512-0.639,2.442,2.539c-2.994,3.1-2.994,8.015,0,11.115l234.344,234.344L2.442,482.342
                                c-3.178,3.07-3.266,8.134-0.196,11.312s8.134,3.266,11.312,0.196c0.067-0.064,0.132-0.13,0.196-0.196L248.098,259.31
                                l234.344,234.344c3.178,3.07,8.242,2.982,11.312-0.196c2.995-3.1,2.995-8.016,0-11.116L259.41,247.998z"/>
                              </g>
                            </g>
                            </svg>
                        
                           </button>`

      this.place.innerHTML = basketHtml;
      
  }

  hideOrShow() {
    const place = document.querySelector('.order-panel')

    if (place.classList.contains('order-panel--active')) {
        place.classList.remove('order-panel--active')
    }
    else {
      place.classList.add('order-panel--active')
    }
  }

  getOrderProductsFromBasketLayout() {
    return this.place.querySelector('.order-panel__item-list .simplebar-content');
  }
  
}

const basket = new Basket({});
basket.render()




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
                event.preventDefault;
                orderPanel.classList.add('order-panel--active');
            });

            cancelBtn.addEventListener('click', function (event) {
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
        const simpleBar = new SimpleBar(document.querySelector('body'));

        if (animItems.length > 0) {
          simpleBar.getScrollElement().addEventListener('scroll', anim);
            function anim() {
                for (let i = 0; i < animItems.length; i++) {
                    const animItem = animItems[i];
                    const animItemHeight = animItem.offsetHeight;
                    const animItemOffset = offset(animItem).top;
                    const animStart = 7;

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
        
        let allTabBtns = document.querySelectorAll('.tab-btn');
        let allTabs = document.querySelectorAll('.tab')

        document.body.addEventListener('click', function (event) {
            if (event.target.classList.contains('tab-btn')) {

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

            }
        })




    }();

    
    
    // filterSlideItems = function () {

    //     let elem = document.querySelector('.filter__tab');

    //     elem.addEventListener('click', function(event) {
    //         if (event.target.classList.contains('category__slide-item-title')) {
    //            $(event.target).next().slideToggle()
    //            $(event.target).toggleClass('category__slide-item-title--active')
    //         }
    //     })





    // }();



});
