class Basket {
  constructor(basketBtn) {
    this.productsInBasket = {};
    this.place = '.header';
    this.basketBtn = basketBtn;

    this.getProductsFromLocalStorage = this.getProductsFromLocalStorage.bind(this);
    this.render = this.render.bind(this);
    this.init = this.init.bind(this);
    this.renderProducts = this.renderProducts.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.plug = this.plug.bind(this);
    
    this.render();
    this.init();
    this.setEvents()

  }
  
  plug() {
    const Place = document.querySelector('.order-panel .simplebar-content') ? document.querySelector('.order-panel .simplebar-content') : document.querySelector('.order-panel__item-list')

    if (Array.from(Place.children).length === 0) {
      Place.innerHTML = `<li class="order-panel__plug">Корзина пуста</li>`;
    }
    else {
      if (document.querySelector(`.order-panel__plug`)) {
        document.querySelector(`.order-panel__plug`).remove();
      }
    }
  }
  
  setEvents() {
    const Basket = document.querySelector('.order-panel');
    const CloseButton = document.querySelector('.order-panel__close-btn-wrapper .close-btn');
    const BasketButton = document.querySelector('.user__basket');
    CloseButton.addEventListener('click', () => {
      console.log('1234')
      Basket.classList.remove('order-panel--active')
      CloseButton.classList.remove('close-btn--active')
    })
    BasketButton.addEventListener('click', () => {
      Basket.classList.add('order-panel--active')
      CloseButton.classList.add('close-btn--active')
    })
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('products__order-by') ||
          event.target.classList.contains('product-count-block__minus-button') ||
          event.target.classList.contains('product-count-block__plus-button') ||
          event.target.classList.contains('order-panel__item-remove-btn') ||
          event.target.parentNode.classList.contains('order-panel__item-remove-btn'))
        
        {
          this.productsInBasket = this.getProductsFromLocalStorage();
          this.plug()
          this.updateInfo();
        }
    })
  }

  updateInfo() {
    const ValuePlace = document.querySelector('.total-count')
    let totalPrice = 0;

    if (Object.keys(this.productsInBasket)) {
      for (let i in this.productsInBasket) {
        totalPrice+= this.productsInBasket[i].count * this.productsInBasket[i].price;
      }
    }
    else {
        totalPrice = 0;
    }
    ValuePlace.innerHTML = totalPrice;
  }

  init() {
    this.productsInBasket = this.getProductsFromLocalStorage();
    this.renderProducts()
  }

  renderProducts() {
    for (let i in this.productsInBasket) {
      let product = new Product(this.productsInBasket[i], this.basketButton);
      product.renderToBasket();
    }
    this.plug()
    this.updateInfo();
  }

  render() {
    const Place = document.querySelector(this.place);
    Place.innerHTML += `<div class = "header__order-panel order-panel">
                        <div class = "order-panel__close-btn-wrapper">
                        <button class="close-btn close-btn--active">
                          <div class="close-btn__decorate-block"></div>
                          <div class="close-btn__decorate-block"></div>
                        </button>
                        </div>
                          <h3 class="order-panel__title subtitle">Заказ #11</h3>
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
                          </button>
                        </div>`
  }

  getProductsFromLocalStorage() {
    const productsLocalStorage = localStorage.getItem('products')
  
    if (productsLocalStorage !== null) {
        return JSON.parse(productsLocalStorage)
    }
    else {
        return {};
    }
  }

}

// __plug() {
//   let place = document.querySelector('.order-panel .simplebar-content') ? document.querySelector('.order-panel .simplebar-content') : document.querySelector('.order-panel__item-list')

//   let countItemsInList = place.children.length;
  // let plug = document.createElement('li');
  // plug.classList.add('order-panel__plug')
  // plug.innerText = 'Корзина пуста'

 

//   if (countItemsInList > 0 && place.querySelector('.order-panel__plug')) {
//       place.removeChild(place.querySelector('.order-panel__plug'))
//   }
//   else if (countItemsInList === 0 && !place.querySelector('.order-panel__plug')){
//       place.appendChild(plug)
//   }
// }



