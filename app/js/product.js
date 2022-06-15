class Product {
    constructor({ id, type, name, price, weight, imgUrl, cousine, protein}) {

        // global props
        this.id = id;
        this.type = type;
        this.name = name;
        this.price = price;
        this.weight = weight;
        this.imgUrl = imgUrl;
        this.cousine = cousine;
        this.protein = protein;

        this.basketPlace = `.basket__item-list`;
        this.catalogPlace = `.product-list`;

        // catalog props
        this.toOrderLabel = `Заказать`;
        this.orderedLabel = `Заказано`;
        this.orderedClass = `product__order-by product__order-by--active`;
        this.toOrderClass = `product__order-by`;

        // basket props
        // ...

        this.getProductFromLocaleStorage = this.getProductsFromLocalStorage.bind(this);
        this.setProductsInLocaleStorage = this.setProductsInLocaleStorage.bind(this);
        this.setEventsInCatalog = this.setEventsInCatalog.bind(this);
        this.setEventsInBasket = this.setEventsInBasket.bind(this);
        this.renderToBasket = this.renderToBasket.bind(this);
    }

    setEventsInCatalog() {
        this.buttonToOrder = this.catalogItem.querySelector('button');

        this.buttonToOrder.addEventListener('click', () => {

            let { ordered } = this.setProductsInLocaleStorage()
            this.buttonToOrder.className = (ordered ? this.orderedClass : this.toOrderClass)
            this.buttonToOrder.innerText = (ordered ? this.orderedLabel : this.toOrderLabel)
            new BasketButton();

            if (ordered) {
                this.renderToBasket()
            }
            else {
                this.count = 1;
                document.querySelector(`[data-id-in-basket="${this.id}"]`).remove()
            }

            this.updateInfo();
            this.plug();
        })
    }

    setEventsInBasket() {
        this.buttonToRemove = this.basketItem.querySelector('.basket__item-remove-btn');
        this.buttonToIncrease = this.basketItem.querySelector('.basket__item-plus-btn');
        this.buttonToDecrease = this.basketItem.querySelector('.basket__item-minus-btn');

        this.buttonToRemove.addEventListener('click', () => {
            const buttonToOrder = document.querySelector(`[data-product-in-catalog="${this.id}"] button`);

            this.basketItem.remove();
            this.setProductsInLocaleStorage();

            if (buttonToOrder) {
                buttonToOrder.innerText = this.toOrderLabel;
                buttonToOrder.className = this.toOrderClass;
            }

            new BasketButton();
        })
        this.buttonToIncrease.addEventListener('click', () => {
            const Goods = JSON.parse(localStorage.getItem('products'));

            Goods[this.id].count += 1;
            
            localStorage.setItem('products', JSON.stringify(Goods));
            
            this.basketItem.querySelector('.basket__item-count-value').innerText = Goods[this.id].count;
            this.basketItem.querySelector('.basket__item-product-total-price').innerText = Goods[this.id].count * this.price;

        })
        this.buttonToDecrease.addEventListener('click', () => {
            const Goods = JSON.parse(localStorage.getItem('products'));

            if (Goods[this.id].count > 1) {

                Goods[this.id].count -= 1;

                localStorage.setItem('products', JSON.stringify(Goods));
                
                this.basketItem.querySelector('.basket__item-count-value').innerText = Goods[this.id].count;
                this.basketItem.querySelector('.basket__item-product-total-price').innerText = Goods[this.id].count * this.price;

            }
        })
    }

    renderToBasket() {
        const Place = document.querySelector('.basket .simplebar-content') ? document.querySelector('.basket .simplebar-content') : document.querySelector('.basket__item-list');
        const Goods = JSON.parse(localStorage.getItem('products'));

        this.basketItem = document.createElement('li');
        this.basketItem.classList.add('basket__item');
        this.basketItem.setAttribute('data-id-in-basket', this.id)
        this.basketItem.innerHTML = `<div class="basket__item-top">
                                        <div class="basket__item-product">
                                            <img class="basket__item-product-img" src="${this.imgUrl}" alt="">
                                            <div class="basket__item-product-info">
                                                <p class="basket__item-product-info-name">${this.name}</p>
                                                <p class="basket__item-product-info-price">${this.price}</p>
                                            </div>
                                            <div class="basket__item-count-block">
                                                <button class="basket__item-minus-btn">-</button>
                                                <p class="basket__item-count-value">${Goods[this.id].count}</p>
                                                <button class="basket__item-plus-btn">+</button></div>
                                                <p class="basket__item-product-total-price">${this.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="basket__item-bottom">
                                        <form class="basket__item-form" action="">
                                          <input class="basket__item-input input-text" type="text" placeholder="Ваши пожелания к блюду...">
                                        </form>
                                        <button class="basket__item-remove-btn">
                                           <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                               <path d="M13.7325 6.26564L13.8153 6.26677C14.1229 6.2922 14.3587 6.54759 14.375 6.855L14.3671 7.02641L14.105 10.2358L13.8301 13.3678C13.7719 13.993 13.7198 14.5204 13.6749 14.9355C13.5187 16.3823 12.5796 17.2769 11.1638 17.3034C8.95781 17.3441 6.83731 17.3437 4.7781 17.2992C3.40331 17.2703 2.47805 16.366 2.32462 14.9414L2.21858 13.8918L2.03328 11.8558L1.84347 9.62168L1.62643 6.93986C1.59946 6.59578 1.84959 6.29442 2.18512 6.26676C2.49269 6.2414 2.76525 6.45483 2.82932 6.7556L2.85426 7.0014L3.05805 9.51556L3.28057 12.1215C3.38038 13.2496 3.46695 14.1626 3.53622 14.804C3.62365 15.6158 4.05115 16.0336 4.80343 16.0494C6.84654 16.0936 8.95123 16.094 11.1417 16.0535C11.9398 16.0386 12.374 15.6249 12.4633 14.7978L12.5689 13.7538C12.5998 13.4321 12.6328 13.0769 12.6678 12.691L12.8905 10.1281L13.1588 6.83954C13.1836 6.52414 13.4327 6.28238 13.7325 6.26564ZM1.10949 4.82428C0.772879 4.82428 0.5 4.54445 0.5 4.19926C0.5 3.88283 0.729294 3.62133 1.02679 3.57994L1.10949 3.57423H3.76476C4.0803 3.57423 4.35654 3.36602 4.45535 3.06604L4.47953 2.9734L4.68587 1.92106C4.86759 1.2241 5.45767 0.72787 6.14916 0.671902L6.27993 0.666626H9.7199C10.4229 0.666626 11.0436 1.12186 11.2826 1.82528L11.3228 1.96003L11.5203 2.97315C11.5822 3.29056 11.8354 3.52762 12.1417 3.5681L12.2351 3.57423H14.8905C15.2271 3.57423 15.5 3.85406 15.5 4.19926C15.5 4.51568 15.2707 4.77719 14.9732 4.81857L14.8905 4.82428H1.10949ZM9.7199 1.91667H6.27993C6.10892 1.91667 5.95691 2.01931 5.89377 2.14831L5.87235 2.20499L5.67483 3.21861C5.65067 3.34233 5.61566 3.46146 5.57093 3.57506L10.429 3.57522C10.4011 3.50434 10.377 3.43132 10.3569 3.35636L10.325 3.21836L10.1364 2.24396C10.0923 2.07489 9.95612 1.95111 9.79185 1.92281L9.7199 1.91667Z" fill="#EA9769"></path>
                                           </svg>
                                        </button>
                                    </div>`
        Place.append(this.basketItem)
        this.setEventsInBasket()
    }

    renderToCatalog() {
        const Place = document.querySelector(this.catalogPlace)
        const LocalStorage = this.getProductsFromLocalStorage();
        let buttonStateText = (this.id in LocalStorage ? this.orderedLabel : this.toOrderLabel);
        let buttonStateClass = (this.id in LocalStorage ? this.orderedClass : this.toOrderClass);

        this.catalogItem = document.createElement('li')
        this.catalogItem.classList.add('product__item')
        this.catalogItem.setAttribute('data-product-in-catalog', this.id)
        this.catalogItem.setAttribute('data-cousine', this.cousine)
        this.catalogItem.setAttribute('data-protein', this.protein)

        this.catalogItem.innerHTML = `<img class="product__img" src="${this.imgUrl}">
                               <p class="product__item-name">${this.name}</p>
                               <span class="product__item-price">${this.price}</span>
                               <div class="product__decorative-layer"></div>
                               <button class="${buttonStateClass}">${buttonStateText}</button>`
        Place.append(this.catalogItem);
        this.setEventsInCatalog();
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

    setProductsInLocaleStorage() {

        let listProductsFromLocalStorage = this.getProductsFromLocalStorage();
        let ordered = false;
        let availableInLocalStorage = this.id in listProductsFromLocalStorage;

        if (availableInLocalStorage === true) {

            delete listProductsFromLocalStorage[this.id]

        } else if (availableInLocalStorage === false) {

            listProductsFromLocalStorage[this.id] = {
                id: this.id,
                type: this.type,
                price: this.price,
                name: this.name,
                weight: this.weight,
                imgUrl: this.imgUrl,
                count: 1
            }
            ordered = true;
        }

        localStorage.setItem('products', JSON.stringify(listProductsFromLocalStorage))
        return { ordered, listProductsFromLocalStorage }
    }

    updateInfo() {
        const ValuePlace = document.querySelector('.total-count')
        const OrderedGoods = this.getProductFromLocaleStorage();
        let totalPrice = 0;

        for (let i in OrderedGoods) {
            totalPrice += OrderedGoods[i].count * OrderedGoods[i].price;
        }
        ValuePlace.innerHTML = totalPrice;
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
}