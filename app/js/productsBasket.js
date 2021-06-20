class Basket {
  constructor(basketBtn) {
    this.productsInBasket = {}
    this.place = document.querySelector('.header')
    this.template = `<h3 class="order-panel__title subtitle">Заказ #11</h3>
                           <ul class="order-panel__status-bar">
                             <li class="order-panel__status">Формируется</li>
                           </ul>
                           <div class="order-panel__item-list-titles">
                             <h4 class="order-panel__item-list-title title-pos">Позиция</h4>
                             <h4 class="order-panel__item-list-title item-list-title__count">Количество</h4>
                             <h4 class="order-panel__item-list-title item-list-title__price">Цена</h4>
                           </div>
                           <ul class="order-panel__item-list" data-simplebar>
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
                           </button>`
    this.basketBtn = basketBtn
  }

  __createCloseBtn() {
    let closeBtn = document.createElement('button')
    closeBtn.classList.add('order-panel__close-btn-wrapper')
    closeBtn.innerHTML = `<button class="close-btn close-btn--active">
                            <div class="close-btn__decorate-block"></div>
                            <div class="close-btn__decorate-block"></div>
                          </button>`
    return closeBtn
  }

  __createRemoveBtn() {
    let btn = document.createElement('button');
    btn.classList.add('order-panel__item-remove-btn')
    btn.innerHTML = `<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.7325 6.26564L13.8153 6.26677C14.1229 6.2922 14.3587 6.54759 14.375 6.855L14.3671 7.02641L14.105 10.2358L13.8301 13.3678C13.7719 13.993 13.7198 14.5204 13.6749 14.9355C13.5187 16.3823 12.5796 17.2769 11.1638 17.3034C8.95781 17.3441 6.83731 17.3437 4.7781 17.2992C3.40331 17.2703 2.47805 16.366 2.32462 14.9414L2.21858 13.8918L2.03328 11.8558L1.84347 9.62168L1.62643 6.93986C1.59946 6.59578 1.84959 6.29442 2.18512 6.26676C2.49269 6.2414 2.76525 6.45483 2.82932 6.7556L2.85426 7.0014L3.05805 9.51556L3.28057 12.1215C3.38038 13.2496 3.46695 14.1626 3.53622 14.804C3.62365 15.6158 4.05115 16.0336 4.80343 16.0494C6.84654 16.0936 8.95123 16.094 11.1417 16.0535C11.9398 16.0386 12.374 15.6249 12.4633 14.7978L12.5689 13.7538C12.5998 13.4321 12.6328 13.0769 12.6678 12.691L12.8905 10.1281L13.1588 6.83954C13.1836 6.52414 13.4327 6.28238 13.7325 6.26564ZM1.10949 4.82428C0.772879 4.82428 0.5 4.54445 0.5 4.19926C0.5 3.88283 0.729294 3.62133 1.02679 3.57994L1.10949 3.57423H3.76476C4.0803 3.57423 4.35654 3.36602 4.45535 3.06604L4.47953 2.9734L4.68587 1.92106C4.86759 1.2241 5.45767 0.72787 6.14916 0.671902L6.27993 0.666626H9.7199C10.4229 0.666626 11.0436 1.12186 11.2826 1.82528L11.3228 1.96003L11.5203 2.97315C11.5822 3.29056 11.8354 3.52762 12.1417 3.5681L12.2351 3.57423H14.8905C15.2271 3.57423 15.5 3.85406 15.5 4.19926C15.5 4.51568 15.2707 4.77719 14.9732 4.81857L14.8905 4.82428H1.10949ZM9.7199 1.91667H6.27993C6.10892 1.91667 5.95691 2.01931 5.89377 2.14831L5.87235 2.20499L5.67483 3.21861C5.65067 3.34233 5.61566 3.46146 5.57093 3.57506L10.429 3.57522C10.4011 3.50434 10.377 3.43132 10.3569 3.35636L10.325 3.21836L10.1364 2.24396C10.0923 2.07489 9.95612 1.95111 9.79185 1.92281L9.7199 1.91667Z" fill="#EA9769"/>
                     </svg>`
    return btn
  }

  __createIncreaseBtn() {
    let btn = document.createElement('button');
    btn.classList.add('product-count-block__plus-button')
    btn.innerHTML = `+`

    return btn;
  }

  __createDecreaseBtn() {
    let btn = document.createElement('button');
    btn.classList.add('product-count-block__minus-button')
    btn.innerHTML = `-`

    return btn;
  }

  removeItem(id) {
    let listProductsFromLocalStorage = localStorageUtil.getProducts();

    delete listProductsFromLocalStorage[id]
    localStorage.setItem('products', JSON.stringify(listProductsFromLocalStorage))
    document.querySelector(`[data-id-in-basket="${id}"]`).remove()

    // продукт в каталоге
    const item = document.querySelector(`[data-product-in-catalog="${id}"]`)
    if (item) {
      const itemButton = item.querySelector('button');
      itemButton.classList.remove('products__order-by--active')
      itemButton.innerText = 'Заказать';
    }

    this.updateCountAndDiscount()
  }
  addItem(id) {
    let place = document.querySelector('.order-panel .simplebar-content') ? document.querySelector('.order-panel .simplebar-content') : document.querySelector('.order-panel__item-list')

    let productsLocalStorage = localStorageUtil.getProducts()

    let { imgUrl, name, price, count } = productsLocalStorage[id]

    let basketProductListItem = document.createElement('li');
    basketProductListItem.classList.add('order-panel__item')
    basketProductListItem.setAttribute("data-id-in-basket", id)
    basketProductListItem.innerHTML = `<div class="order-panel__item-top">
                                         <div class="order-panel__item-product">
                                           <img class="order-panel__item-product-img" src="./${imgUrl}" alt="">
                                           <div class="order-panel__item-product-info">
                                             <p class="order-panel__item-product-info-name">${name}</p>
                                             <p class="order-panel__item-product-info-price">${price}</p>
                                           </div>
                                           <div class="product-count-block">
                                             <p class="order-panel__item-product-count product-count-block__value">${count}</p>
                                           </div>
                                           <p class="order-panel__item-product-total-price">${price}</p>
                                         </div>
                                       </div>
                                       <div class="order-panel__item-bottom">
                                         <form class="order-panel__item-form" action="">
                                           <input class="order-panel__item-input input-text" type="text" placeholder="Ваши пожелания к блюду...">
                                         </form>
                                       </div>`



    //ремув бтн тысяча шакальный код и вставка
    let removeBtn = this.__createRemoveBtn();
    removeBtn.addEventListener('click', function () {
      this.removeItem(id);
      this.basketBtn.render() // отрисовка кол-ва товаров на кнопке корзины
    }.bind(this))
    basketProductListItem.querySelector('.order-panel__item-bottom').appendChild(removeBtn)

    //кнопка увеличения количества и вставка
    let increaseBtn = this.__createIncreaseBtn();
    increaseBtn.addEventListener('click', (event) => {
      const listProductsFromLocalStorage = localStorageUtil.getProducts();
      listProductsFromLocalStorage[id].count += 1;
      localStorage.setItem('products', JSON.stringify(listProductsFromLocalStorage))
      event.target.parentNode.querySelector('.product-count-block__value').innerHTML = listProductsFromLocalStorage[id].count
      this.updateCountAndDiscount()
    })
    basketProductListItem.querySelector('.product-count-block').appendChild(increaseBtn)

    //кнопка уменьшения количества и вставка
    let decreaseBtn = this.__createDecreaseBtn();
    decreaseBtn.addEventListener('click', (event) => {
      const listProductsFromLocalStorage = localStorageUtil.getProducts();
      if (listProductsFromLocalStorage[id].count > 1) {
        listProductsFromLocalStorage[id].count -= 1;
        localStorage.setItem('products', JSON.stringify(listProductsFromLocalStorage))
        event.target.parentNode.querySelector('.product-count-block__value').innerHTML = listProductsFromLocalStorage[id].count
        this.updateCountAndDiscount()
      }
    })
    basketProductListItem.querySelector('.product-count-block').prepend(decreaseBtn)

    if (place) {
      place.appendChild(basketProductListItem)
    }
    this.updateCountAndDiscount()
  }

  render() {
    let basketPanel = document.createElement('div');
    basketPanel.classList.add('header__order-panel', 'order-panel')
    basketPanel.innerHTML = this.template;

    let closeBtn = this.__createCloseBtn();
    closeBtn.addEventListener('click', () => {
      document.querySelector('.order-panel').classList.toggle('order-panel--active')
    })
    basketPanel.appendChild(closeBtn)
    this.place.appendChild(basketPanel)

    const listProductsFromLocalStorage = localStorageUtil.getProducts()
    for (let id in listProductsFromLocalStorage) {
      this.addItem(id)
    }
    
  }

  // hideOrShow() {
  //   const place = document.querySelector('.order-panel')

  //   if (place.classList.contains('order-panel--active')) {
  //     place.classList.remove('order-panel--active')
  //   }
  //   else {
  //     place.classList.add('order-panel--active')
  //   }
  // }

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


