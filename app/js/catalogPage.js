class CatalogPage {
  constructor(basketInstance = undefined, basketBtn) {

    //global properties
    this.place = document.querySelector('.main');
    this.url = '';
    this.template = `<div class="container">
                       <div class="catalog">
                         <ul class="product-list"></ul>
                         <div class="filters"></div>
                       </div>
                     </div>`
    this.basketBtn = basketBtn


    //filters properties
    this.filterPlace;
    this.filterTemplate = `<div class="filters__tab-buttons">
                             <button class="filters__tab-button filters__tab-button--active" data-tab-btn="category">Категория</button>
                             <button class="filters__tab-button" data-tab-btn="search">Название</button>
                           </div>
                           <div class="filters__tabs">
                             <div class="filters__tab filters__tab--active" data-tab-section="category">
                               <form class="filters__tab-check-list">
                               <ul class="category-tab__list">
                                 <li class="category-tab__item">
                                   <p class="category__slide-item-title category__slide-item-title--active">Кухня</p>
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
                                   <p class="category__slide-item-title category__slide-item-title--active">Тип супа</p>
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
                                   <p class="category__slide-item-title category__slide-item-title--active">Цена</p>
                                   <div class="category__slide-item-content">
                                     <input type="text" class="js-range-slider" name="my_range" value="" />
                                   </div>
                                 </li>
                               </ul>
                               <button type="button" class="filters__activate-button">Применить</button>
                               <button type="button" class="filters__activate-reset">Сбросить</button>
                               </form>
                             </div> 
                             <div class="filters__tab" data-tab-section="search">
                               <form class="filters__search-form">
                                 <span class="filters__search-form-title">Поиск</span>
                                 <input class="filters__search-form-input input-text" type="text" placeholder="Введите название блюда...">
                                 <button type="button" class="filters__activate-button">Применить</button>
                                 <button type="button" class="filters__activate-reset">Сбросить</button>
                               </form>
                             </div>
                           </div>`
    this.filterStyler;

    //products properties
    this.productsListPlace;
    this.classOrdered = `products__order-by--active`;
    this.toOrderLabel = `Заказать`;
    this.orderedLabel = `Заказано`;
    this.productStorage = {};

    //basket instance
    this.basket = basketInstance;
  }

  //global methods
  init(url = this.url) {
    this.url    = url;
  }

  prerender() {
    this.place.innerHTML = this.template;

    return this.filterPlace = this.place.querySelector('.filters'),
      this.productsListPlace = this.place.querySelector('.product-list')
  }


  //filter methods
  renderFilters() {
    this.filterPlace.innerHTML = this.filterTemplate;

    this.filterPlace.addEventListener('click', function (event) {
      this.__tab(event.target)
      this.__dropdown(event.target)
      this.__enableBtn(event.target)
      this.__resetBtn(event.target)
    }.bind(this))

    this.filterStyler = ($('input, checkbox').styler());
    $(".js-range-slider").ionRangeSlider({
      type: "double",
      min: 0,
      max: 3000,
      from: 0,
      to: 3000
    });
  }

  __tab(DOMelement) {
    let buttons = document.querySelectorAll('.filters__tab-button');
    let tabs = document.querySelectorAll('.filters__tab')

    if (DOMelement.classList.contains('filters__tab-button')) {
      buttons.forEach(item => item.classList.remove('filters__tab-button--active'))
      tabs.forEach(item => item.classList.remove('filters__tab--active'))

      DOMelement.classList.add('filters__tab-button--active');
      this.filterPlace.querySelector(`[data-tab-section="${DOMelement.dataset.tabBtn}"]`).classList.add('filters__tab--active')
    }
  }

  __dropdown(DOMelement) {

    if (DOMelement.classList.contains('category__slide-item-title')) {
      $(DOMelement).next($('.category__slide-item-content')).slideToggle()
      $(DOMelement).toggleClass('category__slide-item-title--active')
    }
  }

  __enableBtn(DOMelement) {
    if (DOMelement.classList.contains('filters__activate-button')) {
      this.renderProducts()
    }
  }

  __resetBtn(DOMelement) {
    if (DOMelement.classList.contains('filters__activate-reset')) {
      $('[data-filters-checkbox-cuisine]').each(function () {
        $(this).prop('checked', true).trigger('refresh');
      });

      $('[data-filters-radio-protein]').each(function () {

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
  }

  __getFiltersData() {

    let checkboxList = this.filterPlace.querySelectorAll('[data-filters-checkbox-cuisine]')
    let radioList = this.filterPlace.querySelectorAll('[data-filters-radio-protein]')
    let searchFormValue = this.filterPlace.querySelector('.filters__search-form-input').value

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

  filtering({ price, cousine, protein, name }) {
    let filtersData = this.__getFiltersData()
    let maxPrice = filtersData.price.max;
    let minPrice = filtersData.price.min;
    let cousineValues = filtersData.cousines;
    let proteinValue = filtersData.protein;
    let nameValue = filtersData.name;

    let __checkPrice = function (maxPrice, minPrice, productPrice) {
      if (maxPrice >= productPrice && productPrice >= minPrice) {
        return true
      }
      else {
        return false
      }
    }
    let __checkCousines = function (cousineValues, cousine) {
      if (cousineValues.includes(cousine)) {
        return true;
      }
      else {
        return false;
      }
    }
    let __checkProtein = function (proteinValue, protein) {
      if (proteinValue === protein) {
        return true;
      }
      else {
        return false;
      }
    }

    let __checkName = function (nameValue, name) {
      if (name.toLowerCase().includes(nameValue.toLowerCase())) {
        return true;
      }
      else {
        return false;
      }
    }

    if (nameValue !== null && nameValue !== '') {
      if(__checkName(nameValue, name)) {  
        return true;
      }
      else {
        return false;
      }
    }
    else {
      if (__checkPrice(maxPrice, minPrice, price) &&
        __checkCousines(cousineValues, cousine) &&
        __checkProtein(proteinValue, protein)
      ) {
        return true
      }
    }



  }

  //products methods
  __getProductsRequest() {
    return fetch(`./database/${this.url}.json`)
      .then(response => response.json())
      .then(products => products.goods)

  }

  __getBtn(text, orderClass) {
    let btn = document.createElement('button')
    btn.classList.add('products__order-by')
    btn.innerText = text;

    if (orderClass) {
      btn.classList.add(orderClass)
    }

    return btn
  }

  __getItemList(id, cousine, protein) {
    let itemList = document.createElement('li')
    itemList.classList.add('products__item');
    itemList.setAttribute("data-product-in-catalog", `${id}`)
    itemList.setAttribute("data-cousine", `${cousine}`)
    itemList.setAttribute("data-protein", `${protein}`)

    return itemList
  }

  __getImg(imgUrl) {
    let img = document.createElement('img');
    img.classList.add('products__img')
    img.setAttribute("src", `${imgUrl}`)

    return img
  }

  __getParagraphName(name) {
    let p = document.createElement('p');
    p.classList.add('products__item-name')
    p.innerText = name;

    return p
  }

  __getSpanPrice(price) {
    let span = document.createElement('span');
    span.classList.add('products__item-price')
    span.innerText = price;

    return span
  }

  __getDecorativeBlock() {
    let decorativeBlock = document.createElement('div');
    decorativeBlock.classList.add('products__decorative-layer')

    return decorativeBlock
  }

  renderProducts() {
    let productList = [];
    let products = this.__getProductsRequest()
    let localProductList = localStorageUtil.getProducts();

    products.then(item => item.filter(item => this.filtering(item)))
      .then(productsAfterFilter => {

        productsAfterFilter.forEach(productItem => {

          let { id, type, name, price, weight, imgUrl, cousine, protein } = productItem;

          let activeText = (id in localProductList ? this.orderedLabel : this.toOrderLabel)
          let activeClass = (id in localProductList ? this.classOrdered : '')

          let item = this.__getItemList(id, cousine, protein)
          let img = this.__getImg(imgUrl)
          let pName = this.__getParagraphName(name)
          let span = this.__getSpanPrice(price)
          let decorativeBlock = this.__getDecorativeBlock()
          let btn = this.__getBtn(activeText, activeClass)

          btn.addEventListener('click', function (event) {

            let {ordered} = localStorageUtil.putProducts(id, { id, type, name, price, weight, imgUrl, cousine, protein})
            event.target.classList.toggle(this.classOrdered)
            event.target.innerText = (ordered ? this.orderedLabel : this.toOrderLabel)

            ordered ? this.basket.addItem(id) : this.basket.removeItem(id) //basket API

            this.basketBtn.render()


          }.bind(this))

          item.appendChild(img)
          item.appendChild(pName)
          item.appendChild(span)
          item.appendChild(decorativeBlock)
          item.appendChild(btn)

          productList.push(item)
        })

        this.productsListPlace.innerHTML = '';
        productList.forEach(productItem => this.productsListPlace.appendChild(productItem))
      })
  }

  render() {
    this.init('hot-dishes');
    this.prerender()
    this.renderFilters()
    this.renderProducts()
    this.basketBtn.render()
  }




}

