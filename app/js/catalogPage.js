class CatalogPage {
  constructor() {

    //global properties

    this.place = document.querySelector('main');
    this.parentTemplate = `<div class="container">
                            <div class="catalog">
                             <ul class="product-list"></ul>
                             <div class="filters">
                              <div class="filters__tab-buttons">
                                <button class="filters__tab-button filter__tab-button-category filters__tab-button--active"
                                  onclick="catalogPage.__tabSwitch(this)">Категория</button>
                                <button class="filters__tab-button filter__tab-button-name"
                                  onclick="catalogPage.__tabSwitch(this)">Название</button>
                              </div>
                              <div class="filters__tab">
                                <form class="filter__tab filters__tab-category filter__tab--active">
                                  <ul class="category-tab__list">
                                    <li class="category-tab__item">
                                      <p class="category__slide-item-title category__slide-item-title--active"
                                        onclick="catalogPage.__slideToggle(this)">Кухня</p>
                                      <div class="category__slide-item-content">
                                        <label class="filters__checkbox-label">
                                          <input type="checkbox" checked="checked" data-filters-checkbox-cuisine="japanese">Японская
                                        </label>
                                        <label class="filters__checkbox-label">
                                          <input type="checkbox" checked="checked" data-filters-checkbox-cuisine="russian">Русская
                                        </label>
                                        <label class="filters__checkbox-label">
                                          <input type="checkbox" checked="checked" data-filters-checkbox-cuisine="georgian">Грузинская
                                        </label>
                                        <label class="filters__checkbox-label">
                                          <input type="checkbox" checked="checked" data-filters-checkbox-cuisine="dutch">Голландская
                                        </label>
                                        <label class="filters__checkbox-label">
                                          <input type="checkbox" checked="checked" data-filters-checkbox-cuisine="indonesian">Индонезийская
                                        </label>
                                      </div>
                                    </li>
                                    <li class="category-tab__item">
                                      <p class="category__slide-item-title category__slide-item-title--active"
                                        onclick="catalogPage.__slideToggle(this)">Тип супа</p>
                                      <div class="category__slide-item-content">
                                        <label class="filters__radio-label">
                                          <input type="radio" checked="checked" name="type-soup" data-filters-radio-protein="meat">Мясные супы
                                        </label>
                                        <label class="filters__radio-label">
                                          <input type="radio" name="type-soup" data-filters-radio-protein="fish">Рыбные супы
                                        </label>
                                        <label class="filters__radio-label">
                                          <input type="radio" name="type-soup" data-filters-radio-protein="vegetarian">Вегетерианские супы
                                        </label>
                                      </div>
                                    </li>
                                    <li class="category-tab__item">
                                      <p class="category__slide-item-title category__slide-item-title--active"
                                        onclick="catalogPage.__slideToggle(this)">Цена</p>
                                      <div class="category__slide-item-content">
                                        <input type="text" class="js-range-slider" name="my_range" value="" />
                                      </div>
                                    </li>
                                  </ul>
                                  <button type="button" class="filters__activate-button" onclick="catalogPage.renderProducts()">Применить</button>
                                  <button type="button" class="filters__activate-reset" onclick="catalogPage.resetBtn()">Сбросить</button>
                                </form>
                                <div class="filter__tab filters__tab-name">
                                  <form class="filters__search-form">
                                    <span class="filters__search-form-title">Поиск</span>
                                    <input class="filters__search-form-input input-text" type="text" placeholder="Введите название блюда...">
                                    <button type="button" class="filters__activate-button" onclick="catalogPage.renderProducts()">Применить</button>
                                    <button type="button" class="filters__activate-reset" onclick="catalogPage.resetBtn()">Сбросить</button>
                                  </form>
                                </div>
                              </div>
                           </div>
                            </div>
                           </div>`;

    //product-list properties

    this.productListPlace;
    this.classNameOrdered = `products__order-by--active`;
    this.toOrderLabel = `Заказать`;
    this.orderedLabel = `Заказано`;
    this.productStorage = {};

    
  }
 
  //filter-bar methods
   
  __slideToggle(element) {

    $(element).next().slideToggle()
    $(element).toggleClass('category__slide-item-title--active')

  }

  __tabSwitch(element) {

    const categoryBtn = document.querySelector('.filter__tab-button-category')
    const nameBtn = document.querySelector('.filter__tab-button-name')
    const categoryTab = document.querySelector('.filters__tab-category');
    const nameTab = document.querySelector('.filters__tab-name');


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

  __getParams() {

    let checkboxList = this.place.querySelectorAll('[data-filters-checkbox-cuisine]')
    let radioList = this.place.querySelectorAll('[data-filters-radio-protein]')
    let searchFormValue = this.place.querySelector('.filters__search-form-input').value

    let params = {
      cousines: [],
      protein: ``,
      price: {
        min: $(".js-range-slider").data("ionRangeSlider").result.min,
        max: $(".js-range-slider").data("ionRangeSlider").result.min.max
      },
      name: null,
    };

    checkboxList.forEach(item => {
      let cousine = item.getAttribute('data-filters-checkbox-cuisine')

      if (item.checked) {
        params.cousines.push(cousine)
      }

    })

    radioList.forEach(item => {
      let protein = item.getAttribute('data-filters-radio-protein')

      if (item.checked) {
        params.protein = protein;
      }
    })

    params.price.min = $(".js-range-slider").data("ionRangeSlider").result.from
    params.price.max = $(".js-range-slider").data("ionRangeSlider").result.to

    params.name = searchFormValue.toLowerCase();

    return params;
  }

  __prerender() {

    this.place.innerHTML = this.parentTemplate;

    $('input, checkbox').styler();
    $(".js-range-slider").ionRangeSlider({
      type: "double",
      min: 0,
      max: 3000,
      from: 0,
      to: 3000
    });

    this.productListPlace = document.querySelector('.product-list')
  }

  getFilterParams() {

    let checkboxList = this.place.querySelectorAll('[data-filters-checkbox-cuisine]')
    let radioList = this.place.querySelectorAll('[data-filters-radio-protein]')
    let searchFormValue = this.place.querySelector('.filters__search-form-input').value

    let params = {
      cousines: [],
      protein: ``,
      price: {
        min: $(".js-range-slider").data("ionRangeSlider").result.min,
        max: $(".js-range-slider").data("ionRangeSlider").result.min.max
      },
      name: null,
    };

    checkboxList.forEach(item => {
      let cousine = item.getAttribute('data-filters-checkbox-cuisine')

      if (item.checked) {
        params.cousines.push(cousine)
      }

    })

    radioList.forEach(item => {
      let protein = item.getAttribute('data-filters-radio-protein')

      if (item.checked) {
        params.protein = protein;
      }
    })

    params.price.min = $(".js-range-slider").data("ionRangeSlider").result.from
    params.price.max = $(".js-range-slider").data("ionRangeSlider").result.to

    params.name = searchFormValue.toLowerCase();
    console.log(params)
    return params;
  }
 

  resetBtn() {

    $('[data-filters-checkbox-cuisine]').each(function () {
      $(this).prop('checked', true).trigger('refresh');
    });

    $('[data-filters-radio-protein]').each(function () {

      console.log()
      if (this.dataset.filtersRadioProtein === "meat") {
        $(this).prop('checked', true).trigger('refresh');
      }
      else {
        $(this).prop('checked', false).trigger('refresh');
      }
    });

    $(".js-range-slider").data("ionRangeSlider").reset();

    this.place.querySelector('.filters__search-form-input').value = null;


    this.renderProducts()
  }

  enableBtn() {
    // this.instanceCatalog.render(this.__getParams())
  }

  //product-list methods 

  handleSetLocationStorage(element, id) {

    const {ordered, listProductsFromLocalStorage} = localStorageUtil.putProducts(id, this.productStorage[id])

    if (ordered === true) {
      element.classList.add(this.classNameOrdered);
      element.innerHTML = this.orderedLabel;

      basket.addItem(id, this.productStorage[id])
    }

    else if (ordered === false) {
      element.classList.remove(this.classNameOrdered);
      element.innerHTML = this.toOrderLabel;

      basket.removeItem(id)

    }


    basketButton.render();

  }

  getProducts() {

    return fetch('./database/hot-dishes.json')
                                        .then(response => response.json())
                                        .then(products => products.goods)                              
  }

  removeProductFromOrdered(id) {
    const item = document.querySelector(`[data-product-in-catalog="${id}"]`)

    if (item) {
        const itemButton = item.querySelector('button');
        itemButton.classList.remove(this.classNameOrdered)
        itemButton.innerText = this.toOrderLabel;
    }
    basketButton.render();
  }

  renderProducts() {
      let productList = this.getProducts()
      let localProductList = localStorageUtil.getProducts();
      let filterSettings = this.__getParams();

      let productItems = ``;

      productList.then(products => {
                                    products.forEach(productItem => {
                                                    let id      = productItem.id;
                                                    let type    = productItem.type;
                                                    let name    = productItem.name;
                                                    let price   = productItem.price;
                                                    let weight  = productItem.weight;
                                                    let imgUrl  = productItem.imgUrl;
                                                    let cousine = productItem.cousine;
                                                    let protein = productItem.protein;

                                                    let activeClass = ``;
                                                    let activeText = ``;
                                                    
                                                    this.productStorage[id] = {type, price, name, weight, imgUrl, count: 1}

                                                    if (id in localProductList) {
                                                        activeText  = this.orderedLabel;
                                                        activeClass = ` `+this.classNameOrdered;
                                                    }
                                                    else {
                                                        activeText  = this.toOrderLabel;
                                                    }


                                                    if (
                                                        filterSettings.price.max >= price && price >= filterSettings.price.min &&
                                                        filterSettings.cousines.includes(cousine) &&
                                                        filterSettings.protein === protein &&
                                                        (filterSettings.name === null || filterSettings.name === '') 
                                                       )   
                                                    {
                                                    

                                                            productItems += `<li class="products__item" data-product-in-catalog="${id}" data-cousine="${cousine}" data-protein="${protein}">
                                                                                <img class="products__img" src="${imgUrl}" alt="soup">
                                                                                <p class="products__item-name">${name}</p>
                                                                                <span class="products__item-price">${price}</span>
                                                                                <div class="products__decorative-layer"></div>
                                                                                <button class="products__order-by${activeClass}" onclick="catalogPage.handleSetLocationStorage(this, ${id})">
                                                                                  ${activeText}
                                                                                </button>
                                                                             </li>`
                                                    }
                                                    else if (filterSettings.name !== null && filterSettings.name !== '') 
                                                    {
                         
                                                        if (name.toLowerCase().includes(filterSettings.name)) {
                                    
                                                            productItems += `<li class="products__item" data-product-in-catalog="${id}" data-cousine="${cousine}" data-protein="${protein}">
                                                                                <img class="products__img" src="${imgUrl}" alt="soup">
                                                                                <p class="products__item-name">${name}</p>
                                                                                <span class="products__item-price">${price}</span>
                                                                                <div class="products__decorative-layer"></div>
                                                                                <button class="products__order-by${activeClass}" onclick="catalogPage.handleSetLocationStorage(this, ${id})">
                                                                                  ${activeText}
                                                                                </button>
                                                                            </li>`
                                                        }
                                                                
                                                    }
                                                    });
                                    this.productListPlace.innerHTML = productItems;
            });


                
    
    }



  //global methods

  render() {
    basketButton.render();
    this.__prerender()
    this.renderProducts()
  }


}

let catalogPage = new CatalogPage();

// class ProductCatalog {

//     constructor(group) {
     
//     //   this.type = type;
//       this.classInstanceName = classInstanceName;

//       this.productsOfThisCategory = {};
//       this.place = document.querySelector(`main`)
//       this.group = group;
//       this.startFilterSettings = {"cousines": [
//                                                 "japanese",
//                                                 "russian",
//                                                 "georgian",
//                                                 "dutch",
//                                                 "indonesian"
//                                               ],
//                                    "protein": "meat",
//                                    "price": {
//                                        "min": 0,
//                                        "max": 3000
//                                             },
//                                     "name": null,
//                                   }
//     }
  
//     handleSetLocationStorage(element, id) {

//       const {ordered, listProductsFromLocalStorage} = localStorageUtil.putProducts(id, this.productsOfThisCategory[id])
  
//       if (ordered === true) {
//         element.classList.add(this.classNameActive);
//         element.innerHTML = this.orderedLabel;

//         basket.addItem(id, this.productsOfThisCategory[id])
//       }
  
//       else if (ordered === false) {
//         element.classList.remove(this.classNameActive);
//         element.innerHTML = this.toOrderLabel;

//         basket.removeItem(id)

//       }


  
//     }
  
//     removeProductFromOrdered(id) {
//       const item = document.querySelector(`[data-product-in-catalog="${id}"]`)
//       const itemButton = item.querySelector('button');
//       itemButton.classList.remove(this.classNameActive)
//       itemButton.innerText = this.toOrderLabel;
//     }

//     resetCatalogAreas() {
//       let catalogSections =  document.querySelectorAll('[data-section-catalog]')
//       catalogSections.forEach(item => {
//         let productList = item.querySelector('ul');

//         productList.innerHTML = ``;
//       })
//     }

//     render(filterSettings = this.startFilterSettings) {
//       // this.resetCatalogAreas()
//       const listProductsFromLocalStorage = localStorageUtil.getProducts();
//       let catalogItems = ``;

      
//       fetch(`./database/${group}.json`)
//         .then(res => res.json())
//         .then(products =>  {

//           let CATALOG = products.goods;
//           CATALOG.forEach(({id, type, price, name, weight, imgUrl, cousine, protein}) => {
            
//             this.productsOfThisCategory[id] = {type, price, name, weight, imgUrl, classInstanceName: this.classInstanceName, count: 1}

//             let activeClass = ``;
//             let activeText = ``;
//             let availableInLocalStorage = id in listProductsFromLocalStorage;

//             if (availableInLocalStorage === true) {
//                 activeClass = ` `+ this.classNameActive;
//                 activeText = this.orderedLabel;
//             }
//             else if (availableInLocalStorage === false) {
//                 activeText = this.toOrderLabel;
//             }

//             if (
//                   filterSettings.price.max >= price && price >= filterSettings.price.min &&
//                   filterSettings.cousines.includes(cousine) &&
//                   filterSettings.protein === protein &&
//                   (filterSettings.name === null || filterSettings.name === '')
                  
//                 ) {
      
//                       catalogItems += `<li class="products__item" data-product-in-catalog="${id}" data-cousine="${cousine}" data-protein="${protein}">
//                                         <img class="products__img" src="${imgUrl}" alt="soup">
//                                         <p class="products__item-name">${name}</p>
//                                         <span class="products__item-price" data-price="${price}">${price}</span>
//                                         <div class="products__decorative-layer"></div>
//                                         <button class="products__order-by${activeClass}" onclick="${this.classInstanceName}.handleSetLocationStorage(this, ${id}); basketButton.render()">
//                                           ${activeText}
//                                         </button>
//                                       </li>`
//             }
//             else if (filterSettings.name !== null && filterSettings.name !== '') {
                         
//                       if (name.toLowerCase().includes(filterSettings.name)) {

//                         catalogItems += `<li class="products__item" data-product-in-catalog="${id}" data-cousine="${cousine}" data-protein="${protein}">
//                               <img class="products__img" src="${imgUrl}" alt="soup">
//                               <p class="products__item-name">${name}</p>
//                               <span class="products__item-price" data-price="${price}">${price}</span>
//                               <div class="products__decorative-layer"></div>
//                               <button class="products__order-by${activeClass}" onclick="${this.classInstanceName}.handleSetLocationStorage(this, ${id}); basketButton.render()">
//                                 ${activeText}
//                               </button>
//                             </li>`
//                       }
                      
//             }



//             })
//             this.place.innerHTML = catalogItems;
//           })
          

//     }
// }

// let productCatalog = new ProductCatalog()

// productsList.forEach(productItem => {
//     let id      = productItem.id;
//     let type    = productItem.type;
//     let name    = productItem.name;
//     let weight  = productItem.weight;
//     let imgUrl  = productItem.imgUrl;
//     let cousine = productItem.cousine;
//     let protein = productItem.protein;

//   console.log(id,type,name,weight,imgUrl,cousine,protein)