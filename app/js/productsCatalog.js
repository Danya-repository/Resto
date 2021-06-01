class Products {

    constructor(classInstanceName, type) {
      this.classNameActive = `products__order-by--active`;
      this.toOrderLabel = `Заказать`
      this.orderedLabel = `Заказано`

      this.type = type;
      this.classInstanceName = classInstanceName;

      this.productsOfThisCategory = {};
      this.place = document.querySelector(`.${this.type}__catalog`)
      
    }
  
    handleSetLocationStorage(element, id) {

      const {ordered, listProductsFromLocalStorage} = localStorageUtil.putProducts(id, this.productsOfThisCategory[id])
  
      if (ordered === true) {
        element.classList.add(this.classNameActive);
        element.innerHTML = this.orderedLabel;

        basket.addItem(id, this.productsOfThisCategory[id])
      }
  
      else if (ordered === false) {
        element.classList.remove(this.classNameActive);
        element.innerHTML = this.toOrderLabel;

        basket.removeItem(id)

      }


  
    }
  
    removeProductFromOrdered(id) {
      const item = document.querySelector(`[data-product-in-catalog="${id}"]`)
      const itemButton = item.querySelector('button');
      itemButton.classList.remove(this.classNameActive)
      itemButton.innerText = this.toOrderLabel;
    }



    render() {
      const listProductsFromLocalStorage = localStorageUtil.getProducts();
      let catalogList = ``
      let catalogItems = ``;

      
      fetch(`./database/${this.type}.json`)
        .then(res => res.json())
        .then(products =>  {

          let CATALOG = products.goods;
          CATALOG.forEach(({id, type, price, name, weight, imgUrl, cousine, protein}) => {
            
            this.productsOfThisCategory[id] = {type, price, name, weight, imgUrl, classInstanceName: this.classInstanceName, count: 1}

            let activeClass = ``;
            let activeText = ``;
            let availableInLocalStorage = id in listProductsFromLocalStorage;
  
            if (availableInLocalStorage === true) {
                activeClass = ` `+ this.classNameActive;
                activeText = this.orderedLabel;
            }
            else if (availableInLocalStorage === false) {
                activeText = this.toOrderLabel;
            }
      
      
            catalogItems += `<li class="products__item" data-product-in-catalog="${id}" data-cousine="${cousine}" data-protein="${protein}">
                              <img class="products__img" src="${imgUrl}" alt="soup">
                              <p class="products__item-name">${name}</p>
                              <span class="products__item-price" data-price="${price}">${price}</span>
                              <div class="products__decorative-layer"></div>
                              <button class="products__order-by${activeClass}" onclick="${this.classInstanceName}.handleSetLocationStorage(this, ${id}); basketButton.render()">
                                ${activeText}
                              </button>
                            </li>`
      
            })

            catalogList = `<ul class = "catalog-area hot-dishes__list hot-dishes">
                                  ${catalogItems}
                              </ul>`

            this.place.innerHTML = catalogList;
            // filters.render(this.place)
        })

    }
}

let productsHotDishes = new Products('productsHotDishes','hot-dishes')
let productsColdDishes = new Products('productsColdDishes','cold-dishes')
let productsSoups = new Products('productsSoups', 'soups')
let productsGrill = new Products('productsGrill','grill')
let productsSalads = new Products('productsSalads','salads')
let productsHotDesserts = new Products('productsHotDesserts','desserts')