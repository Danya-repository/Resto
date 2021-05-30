class Products {

    constructor(classInstanceName, type) {
      this.classNameActive = `products__order-by--active`;
      this.toOrderLabel = `Заказать`
      this.orderedLabel = `Заказано`

      this.type = type;
      this.classInstanceName = classInstanceName;

      this.productsOfThisCategory = {};
      this.place = document.querySelector(`.${this.type}__catalog`)
    //   this.template = `<div class="filters">
    //                     <div class="filters__tab-buttons">
    //                       <button class="filters__tab-button filter__tab-button-category filters__tab-button--active" onclick="${this.classInstanceName}.filterTabSwitcher(this)">Категория</button>
    //                       <button class="filters__tab-button filter__tab-button-name" onclick="${this.classInstanceName}.filterTabSwitcher(this)">Название</button>
    //                     </div>
    //                     <div class="filters__tab">
    //                       <div class="filter__tab filters__tab-category filter__tab--active">
    //                         <ul class="category-tab__list">
    //                           <li class="category-tab__item">
    //                             <p class="category__slide-item-title">Тип супа</p>
    //                             <div class="category__slide-item-content">
    //                               здесь конь-тент
    //                             </div>
    //                           </li>
    //                           <li class="category-tab__item">
    //                             <p class="category__slide-item-title">Тип супа</p>
    //                             <div class="category__slide-item-content">
    //                               здесь конь-тент
    //                             </div>
    //                           </li>
    //                           <li class="category-tab__item">
    //                             <p class="category__slide-item-title">Тип супа</p>
    //                             <div class="category__slide-item-content">
    //                               здесь конь-тент
    //                             </div>
    //                           </li>
    //                         </ul>
    //                       </div>
    //                       <div class="filter__tab filters__tab-name">второй таб</div>
    //                     </div>
    //                   </div>`
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
        categoryBtn.classList.add('filters__tab-button--active')
        categoryTab.classList.add('filter__tab--active')
      } 
      else if (element === nameBtn) {
        nameBtn.classList.add('filters__tab-button--active')
        nameTab.classList.add('filter__tab--active')
      }

    

    }


    render() {
      const listProductsFromLocalStorage = localStorageUtil.getProducts();
      let catalogList = ``
      let catalogItems = ``;

      
      fetch(`./database/${this.type}.json`)
        .then(res => res.json())
        .then(products =>  {

          let CATALOG = products.goods;
          CATALOG.forEach(({id, type, price, name, weight, imgUrl}) => {
            
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
      
      
            catalogItems += `<li class="products__item" data-product-in-catalog="${id}">
                              <img class="products__img" src="${imgUrl}" alt="soup">
                              <p class="products__item-name">${name}</p>
                              <span class="products__item-price">${price}</span>
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
        })
    }
}

let productsHotDishes = new Products('productsHotDishes','hot-dishes')
let productsColdDishes = new Products('productsColdDishes','cold-dishes')
let productsSoups = new Products('productsSoups', 'soups')
let productsGrill = new Products('productsGrill','grill')
let productsSalads = new Products('productsSalads','salads')
let productsHotDesserts = new Products('productsHotDesserts','desserts')