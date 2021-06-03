class ProductCatalog {

    constructor(classInstanceName, type) {
      this.classNameActive = `products__order-by--active`;
      this.toOrderLabel = `Заказать`
      this.orderedLabel = `Заказано`

      this.type = type;
      this.classInstanceName = classInstanceName;

      this.productsOfThisCategory = {};
      this.place = document.querySelector(`.${this.type}`)
      this.startFilterSettings = {"cousines": [
                                                "japanese",
                                                "russian",
                                                "georgian",
                                                "dutch",
                                                "indonesian"
                                              ],
                                   "protein": "meat",
                                   "price": {
                                       "min": 0,
                                       "max": 3000
                                            },
                                    "name": null,
                                  }
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

    resetCatalogAreas() {
      let catalogSections =  document.querySelectorAll('[data-section-catalog]')
      catalogSections.forEach(item => {
        let productList = item.querySelector('ul');

        productList.innerHTML = ``;
      })
    }

    render(filterSettings = this.startFilterSettings) {
      this.resetCatalogAreas()
      const listProductsFromLocalStorage = localStorageUtil.getProducts();
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

            if (
                  filterSettings.price.max >= price && price >= filterSettings.price.min &&
                  filterSettings.cousines.includes(cousine) &&
                  filterSettings.protein === protein &&
                  (filterSettings.name === null || filterSettings.name === '')
                  
                ) {
      
                      catalogItems += `<li class="products__item" data-product-in-catalog="${id}" data-cousine="${cousine}" data-protein="${protein}">
                                        <img class="products__img" src="${imgUrl}" alt="soup">
                                        <p class="products__item-name">${name}</p>
                                        <span class="products__item-price" data-price="${price}">${price}</span>
                                        <div class="products__decorative-layer"></div>
                                        <button class="products__order-by${activeClass}" onclick="${this.classInstanceName}.handleSetLocationStorage(this, ${id}); basketButton.render()">
                                          ${activeText}
                                        </button>
                                      </li>`
            }
            else if (filterSettings.name !== null && filterSettings.name !== '') {
                         
                      if (name.toLowerCase().includes(filterSettings.name)) {

                        catalogItems += `<li class="products__item" data-product-in-catalog="${id}" data-cousine="${cousine}" data-protein="${protein}">
                              <img class="products__img" src="${imgUrl}" alt="soup">
                              <p class="products__item-name">${name}</p>
                              <span class="products__item-price" data-price="${price}">${price}</span>
                              <div class="products__decorative-layer"></div>
                              <button class="products__order-by${activeClass}" onclick="${this.classInstanceName}.handleSetLocationStorage(this, ${id}); basketButton.render()">
                                ${activeText}
                              </button>
                            </li>`
                      }
                      
            }



            })
            this.place.innerHTML = catalogItems;
          })
          

    }
}

let productsHotDishes = new ProductCatalog('productsHotDishes','hot-dishes')
let productsColdDishes = new ProductCatalog('productsColdDishes','cold-dishes')
let productsSoups = new ProductCatalog('productsSoups', 'soups')
let productsGrill = new ProductCatalog('productsGrill','grill')
let productsSalads = new ProductCatalog('productsSalads','salads')
let productsHotDesserts = new ProductCatalog('productsHotDesserts','desserts')