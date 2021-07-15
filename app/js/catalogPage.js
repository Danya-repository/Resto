class CatalogPage {
  constructor(type, basketButton) {

    this.place = `.main`;
    this.template = `<div class="container">
                       <div class="catalog">
                         <div class="product-list__wrapper">
                          <div class="catalog__spinner">
                              <img class="spinner__image" src="images/icons/spinner.svg">
                          </div>
                          <ul class="product-list">
                          </ul>
                          <button class="product-list__show-more">Показать еще</button>
                         </div>
                          <div class="filters">
                          </div>
                       </div>
                     </div>`
    this.products = {};
    this.url = type;
    this.basketButton = basketButton;

    this.init = this.init.bind(this);
    this.render = this.render.bind(this);
    this.renderProducts = this.renderProducts.bind(this);
    this.setEvents = this.setEvents.bind(this)

    this.render();
    this.init();
    this.setEvents()

  }

  setEvents() {
    const filterBar = document.querySelector(`.filters`);
    const catalogList = document.querySelector(`.product-list`);
    
    filterBar.addEventListener('click', (event) => {

        if (event.target.classList.contains('filters__activate-button')) {
            this.filter.getProducts()
                        .then(productsAfterFilter => {
                                      this.products = {};
                                      const place = document.querySelector(`.product-list`);
                                      place.innerHTML = ``;
                        
                                      productsAfterFilter.forEach(item => {
                                        this.products[item.id] = item;
                                      })
                                    return productsAfterFilter
                                    })
                        .then(() => {
                          this.renderProducts()
                        })
        }
        if (event.target.classList.contains('filters__activate-reset'))  {
        this.filter.setStartParameters();
        this.filter.getProducts()
                        .then(productsAfterFilter => {
                                      this.products = {};
                                      const place = document.querySelector(`.product-list`);
                                      place.innerHTML = ``;
                        
                                      productsAfterFilter.forEach(item => {
                                        this.products[item.id] = item;
                                      })
                                    return productsAfterFilter
                                    })
                        .then(() => {
                          this.renderProducts()
                        })
        }
        
      })
  }

  init() {
    this.filter = new Filter(this.url);
    this.filter.getProducts()
      .then(productsAfterFilter => {
        productsAfterFilter.forEach(item => {
          this.products[item.id] = item;
        })
        return productsAfterFilter
      })
      .then(() => {
          this.spinner.remove();
          this.renderProducts();
      })

  }


  render() {
    const place = document.querySelector(`${this.place}`);
    place.innerHTML = this.template;

    this.spinner = place.querySelector('.catalog__spinner')
  }

  renderProducts() {
    for (let i in this.products) {
      let product = new Product(this.products[i], this.basketButton)
      product.renderToCatalog()
    }
  }

}













































  // __enableBtn(DOMelement) {
  //   if (DOMelement.classList.contains('filters__activate-button')) {
  //     this.renderProducts()
  //   }
  // }



  // filtering({ price, cousine, protein, name }) {
  //   let filtersData = this.__getFiltersData()
  //   let maxPrice = filtersData.price.max;
  //   let minPrice = filtersData.price.min;
  //   let cousineValues = filtersData.cousines;
  //   let proteinValue = filtersData.protein;
  //   let nameValue = filtersData.name;

  //   let __checkPrice = function (maxPrice, minPrice, productPrice) {
  //     if (maxPrice >= productPrice && productPrice >= minPrice) {
  //       return true
  //     }
  //     else {
  //       return false
  //     }
  //   }
  //   let __checkCousines = function (cousineValues, cousine) {
  //     if (cousineValues.includes(cousine)) {
  //       return true;
  //     }
  //     else {
  //       return false;
  //     }
  //   }
  //   let __checkProtein = function (proteinValue, protein) {
  //     if (proteinValue === protein) {
  //       return true;
  //     }
  //     else {
  //       return false;
  //     }
  //   }

  //   let __checkName = function (nameValue, name) {
  //     if (name.toLowerCase().includes(nameValue.toLowerCase())) {
  //       return true;
  //     }
  //     else {
  //       return false;
  //     }
  //   }

  //   if (nameValue !== null && nameValue !== '') {
  //     if (__checkName(nameValue, name)) {
  //       return true;
  //     }
  //     else {
  //       return false;
  //     }
  //   }
  //   else {
  //     if (__checkPrice(maxPrice, minPrice, price) &&
  //       __checkCousines(cousineValues, cousine) &&
  //       __checkProtein(proteinValue, protein)
  //     ) {
  //       return true
  //     }
  //   }



  // }

  // //products methods
  // getProductsFromServer() {
    // return fetch(`./database/${this.url}.json`)
    //                                           .then(response => response.json())
    //                                           .then(products => products.goods)

  // }

  // __getBtn(text, orderClass) {
  //   let btn = document.createElement('button')
  //   btn.classList.add('products__order-by')
  //   btn.innerText = text;

  //   if (orderClass) {
  //     btn.classList.add(orderClass)
  //   }

  //   return btn
  // }

  // __getItemList(id, cousine, protein) {
  //   let itemList = document.createElement('li')
  //   itemList.classList.add('products__item');
  //   itemList.setAttribute("data-product-in-catalog", `${id}`)
  //   itemList.setAttribute("data-cousine", `${cousine}`)
  //   itemList.setAttribute("data-protein", `${protein}`)

  //   return itemList
  // }

  // __getImg(imgUrl) {
  //   let img = document.createElement('img');
  //   img.classList.add('products__img')
  //   img.setAttribute("src", `${imgUrl}`)

  //   return img
  // }

  // __getParagraphName(name) {
  //   let p = document.createElement('p');
  //   p.classList.add('products__item-name')
  //   p.innerText = name;

  //   return p
  // }

  // __getSpanPrice(price) {
  //   let span = document.createElement('span');
  //   span.classList.add('products__item-price')
  //   span.innerText = price;

  //   return span
  // }

  // __getDecorativeBlock() {
  //   let decorativeBlock = document.createElement('div');
  //   decorativeBlock.classList.add('products__decorative-layer')

  //   return decorativeBlock
  // }

  // renderProducts() {
  //   let productList = [];
  //   let products = this.__getProductsFromServer()
  //   let localProductList = localStorageUtil.getProductsFromServer();

    // products.then(item => item.filter(item => this.filtering(item)))
    //         .then(productsAfterFilter => {

    //                   productsAfterFilter.forEach(productItem => {

    //                     let { id, type, name, price, weight, imgUrl, cousine, protein } = productItem;

    //                   })
    //                 })
    //   }
  //     //     let activeText = (id in localProductList ? this.orderedLabel : this.toOrderLabel)
  //     //     let activeClass = (id in localProductList ? this.classOrdered : '')

  //     //     let item = this.__getItemList(id, cousine, protein)
  //     //     let img = this.__getImg(imgUrl)
  //     //     let pName = this.__getParagraphName(name)
  //     //     let span = this.__getSpanPrice(price)
  //     //     let decorativeBlock = this.__getDecorativeBlock()
  //     //     let btn = this.__getBtn(activeText, activeClass)

  //     //     btn.addEventListener('click', function (event) {

            // let {ordered} = localStorageUtil.putProducts(id, { id, type, name, price, weight, imgUrl, cousine, protein})
            // event.target.classList.toggle(this.classOrdered)
            // event.target.innerText = (ordered ? this.orderedLabel : this.toOrderLabel)

  //     //       ordered ? this.basket.addItem(id) : this.basket.removeItem(id) //basket API

  //     //       this.basket.__plug()
  //     //       this.basketBtn.render()


  //     //     }.bind(this))

  //     //     item.appendChild(img)
  //     //     item.appendChild(pName)
  //     //     item.appendChild(span)
  //     //     item.appendChild(decorativeBlock)
  //     //     item.appendChild(btn)

  //     //     productList.push(item)
  //     //   })

  //     //   this.productsListPlace.innerHTML = '';
  //     //   productList.forEach(productItem => this.productsListPlace.appendChild(productItem))



  // render() {
  //         // this.init();
  //         this.prerender()
  //   this.renderFilters()
  //   this.renderProducts()
  //   this.basketBtn.render()
  //       }




// }
