class Basket {
    constructor() {
        this.productsInBasket = {}
        this.place = document.querySelector('.order-panel')
    }

    removeItem(id) {
        let listProductsFromLocalStorage = localStorageUtil.getProducts();

        delete listProductsFromLocalStorage[id]
        localStorage.setItem('products', JSON.stringify(listProductsFromLocalStorage))
        document.querySelector(`[data-id-in-basket="${id}"]`).remove()

        this.updateCountAndDiscount()
  }
    addItem(id, {name, price, imgUrl, count, classInstanceName}) {
        let place = document.querySelector('.order-panel .simplebar-content')

        let basketProductListItem = `<li class="order-panel__item" data-id-in-basket=${id}>
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
                                        <p class="order-panel__item-product-total-price">${price}</p>
                                      </div>
                                    </div>
                                    <div class="order-panel__item-bottom">
                                      <form class="order-panel__item-form" action="">
                                        <input class="order-panel__item-input input-text" type="text" placeholder="Ваши пожелания к блюду...">
                                      </form>
                                      <button class='order-panel__item-remove-btn' onclick="basket.removeItem(${id}); catalogPage.removeProductFromOrdered(${id}); basketButton.render()">
                                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M13.7325 6.26564L13.8153 6.26677C14.1229 6.2922 14.3587 6.54759 14.375 6.855L14.3671 7.02641L14.105 10.2358L13.8301 13.3678C13.7719 13.993 13.7198 14.5204 13.6749 14.9355C13.5187 16.3823 12.5796 17.2769 11.1638 17.3034C8.95781 17.3441 6.83731 17.3437 4.7781 17.2992C3.40331 17.2703 2.47805 16.366 2.32462 14.9414L2.21858 13.8918L2.03328 11.8558L1.84347 9.62168L1.62643 6.93986C1.59946 6.59578 1.84959 6.29442 2.18512 6.26676C2.49269 6.2414 2.76525 6.45483 2.82932 6.7556L2.85426 7.0014L3.05805 9.51556L3.28057 12.1215C3.38038 13.2496 3.46695 14.1626 3.53622 14.804C3.62365 15.6158 4.05115 16.0336 4.80343 16.0494C6.84654 16.0936 8.95123 16.094 11.1417 16.0535C11.9398 16.0386 12.374 15.6249 12.4633 14.7978L12.5689 13.7538C12.5998 13.4321 12.6328 13.0769 12.6678 12.691L12.8905 10.1281L13.1588 6.83954C13.1836 6.52414 13.4327 6.28238 13.7325 6.26564ZM1.10949 4.82428C0.772879 4.82428 0.5 4.54445 0.5 4.19926C0.5 3.88283 0.729294 3.62133 1.02679 3.57994L1.10949 3.57423H3.76476C4.0803 3.57423 4.35654 3.36602 4.45535 3.06604L4.47953 2.9734L4.68587 1.92106C4.86759 1.2241 5.45767 0.72787 6.14916 0.671902L6.27993 0.666626H9.7199C10.4229 0.666626 11.0436 1.12186 11.2826 1.82528L11.3228 1.96003L11.5203 2.97315C11.5822 3.29056 11.8354 3.52762 12.1417 3.5681L12.2351 3.57423H14.8905C15.2271 3.57423 15.5 3.85406 15.5 4.19926C15.5 4.51568 15.2707 4.77719 14.9732 4.81857L14.8905 4.82428H1.10949ZM9.7199 1.91667H6.27993C6.10892 1.91667 5.95691 2.01931 5.89377 2.14831L5.87235 2.20499L5.67483 3.21861C5.65067 3.34233 5.61566 3.46146 5.57093 3.57506L10.429 3.57522C10.4011 3.50434 10.377 3.43132 10.3569 3.35636L10.325 3.21836L10.1364 2.24396C10.0923 2.07489 9.95612 1.95111 9.79185 1.92281L9.7199 1.91667Z" fill="#EA9769"/>
                                          </svg>                
                                      </button>
                                    </div>
                                  </li>`
        if (place) {
            place.innerHTML += basketProductListItem
        }
        this.updateCountAndDiscount()
        return basketProductListItem
  }

  increaseCount(element, id) {
    const listProductsFromLocalStorage = localStorageUtil.getProducts();

    listProductsFromLocalStorage[id].count +=1;
    localStorage.setItem('products', JSON.stringify(listProductsFromLocalStorage))
    
    element.parentNode.querySelector('.product-count-block__value').innerHTML = listProductsFromLocalStorage[id].count;

    this.updateCountAndDiscount()

  }

  decreaseCount(element, id) {
    const listProductsFromLocalStorage = localStorageUtil.getProducts();
    if (listProductsFromLocalStorage[id].count > 1) {
        listProductsFromLocalStorage[id].count -= 1;
        localStorage.setItem('products', JSON.stringify(listProductsFromLocalStorage))
      
        element.parentNode.querySelector('.product-count-block__value').innerHTML = listProductsFromLocalStorage[id].count;
    }
    this.updateCountAndDiscount()
  }

  render() {
      const listProductsFromLocalStorage = localStorageUtil.getProducts()
      let basketProductItems = ``;

      for (let id in listProductsFromLocalStorage) {
        

        this.productsInBasket[id] = listProductsFromLocalStorage[id];
        let {name, price, imgUrl, count} = listProductsFromLocalStorage[id]

        basketProductItems += this.addItem(id, {name, price, imgUrl, count})

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
                              ${basketProductItems}
                           </ul>
                           <div class="order-panel__order-total-info">
                             <div class="order-total-info__keys">
                               <span class="order-total-info__key">Скидка</span>
                               <span class="order-total-info__key">Общая стоимость</span>
                             </div>
                             <div class="order-total-info__values">
                               <div class="order-total-info__value">0</div>
                               <div class="order-total-info__value total-count">0</div>
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
      
      this.updateCountAndDiscount()
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

  updateCountAndDiscount() {
    let countPlace = document.querySelector('.total-count');
    let countValue = 0;
    const listProductsFromLocalStorage = localStorageUtil.getProducts()

    for (let id in listProductsFromLocalStorage) {

        countValue += listProductsFromLocalStorage[id].count * listProductsFromLocalStorage[id].price

    }

    if (countPlace !== null) {
      countPlace.innerHTML = countValue;
    }

  }
}


