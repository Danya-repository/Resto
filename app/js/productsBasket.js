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
    const Place = document.querySelector('.basket .simplebar-content') ? document.querySelector('.basket .simplebar-content') : document.querySelector('.basket__item-list')

    if (Array.from(Place.children).length === 0) {
      Place.innerHTML = `<li class="basket__plug">Корзина пуста</li>`;
    }
    else {
      if (document.querySelector(`.basket__plug`)) {
        document.querySelector(`.basket__plug`).remove();
      }
    }
  }
  
  setEvents() {
    const Basket = document.querySelector('.basket');
    const CloseButton = document.querySelector('.basket__close-btn-wrapper .close-btn');
    const BasketButton = document.querySelector('.basket-btn');
    CloseButton.addEventListener('click', () => {
      Basket.classList.remove('basket--active')
      CloseButton.classList.remove('close-btn--active')
    })
    BasketButton.addEventListener('click', () => {
      Basket.classList.add('basket--active')
      CloseButton.classList.add('close-btn--active')
    })
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('product__order-by') ||
          event.target.classList.contains('basket__item-minus-btn') ||
          event.target.classList.contains('basket__item-plus-btn') ||
          event.target.classList.contains('basket__item-remove-btn') ||
          event.target.parentNode.classList.contains('basket__item-remove-btn'))
        
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
    Place.innerHTML += `<div class = "basket">
                        <div class = "basket__close-btn-wrapper">
                        <button class="close-btn close-btn--active">
                          <div class="close-btn__decorate-block"></div>
                          <div class="close-btn__decorate-block"></div>
                        </button>
                        </div>
                          <h3 class="basket__title subtitle">Заказ #11</h3>
                          <ul class="basket__status-bar">
                            <li class="basket__status">Формируется</li>
                          </ul>
                          <div class="basket__column-names">
                            <h4 class="basket__column-name">Позиция</h4>
                            <h4 class="basket__column-name">Количество</h4>
                            <h4 class="basket__column-name">Цена</h4>
                          </div>
                          <ul class="basket__item-list" data-simplebar>
                          </ul>
                          <div class="basket__total-info">
                            <div class="basket__total-keys">
                              <span class="basket__total-key">Скидка</span>
                              <span class="basket__total-key">Общая стоимость</span>
                            </div>
                            <div class="basket__total-values">
                              <div class="basket__total-value">0</div>
                              <div class="basket__total-value total-count">0</div>
                            </div>
                          </div>
                          <button class="basket__submit" type="submit">
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

