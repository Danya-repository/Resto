class Filters {
    constructor() {
        this.myRange;
        this.template = `<div class="filters">
                         <div class="filters__tab-buttons">
                          <button class="filters__tab-button filter__tab-button-category filters__tab-button--active" onclick="filters.__tabSwitcher(this)">Категория</button>
                          <button class="filters__tab-button filter__tab-button-name" onclick="filters.__tabSwitcher(this)">Название</button>
                        </div>
                        <div class="filters__tab">
                          <form class="filter__tab filters__tab-category filter__tab--active">
                            <ul class="category-tab__list">
                              <li class="category-tab__item">
                                <p class="category__slide-item-title category__slide-item-title--active" onclick="filters.__toggle(this)">Кухня</p>
                                <div class="category__slide-item-content">
                                  <label class="filters__checkbox-label">
                                    <input type = "checkbox" checked = "checked" data-filters-checkbox-cuisine = "japanese">Японская
                                  </label>
                                  <label class="filters__checkbox-label">
                                    <input type = "checkbox" checked = "checked" data-filters-checkbox-cuisine = "russian">Русская
                                  </label>
                                  <label class="filters__checkbox-label">
                                    <input type = "checkbox" checked = "checked" data-filters-checkbox-cuisine = "georgian">Грузинская
                                  </label>
                                  <label class="filters__checkbox-label">
                                    <input type = "checkbox" checked = "checked" data-filters-checkbox-cuisine = "dutch">Голландская
                                  </label>
                                  <label class="filters__checkbox-label">
                                    <input type = "checkbox" checked = "checked" data-filters-checkbox-cuisine = "indonesian">Индонезийская
                                  </label>
                                </div>
                              </li>
                              <li class="category-tab__item">
                                <p class="category__slide-item-title category__slide-item-title--active" onclick="filters.__toggle(this)">Тип супа</p>
                                <div class="category__slide-item-content">
                                  <label class="filters__radio-label">
                                    <input type = "radio" checked = "checked" name = "type-soup" data-filters-radio-protein = "meat">Мясные супы
                                  </label>
                                  <label class="filters__radio-label">
                                    <input type = "radio" name = "type-soup" data-filters-radio-protein = "fish">Рыбные супы
                                  </label>
                                  <label class="filters__radio-label">
                                    <input type = "radio" name = "type-soup" data-filters-radio-protein = "vegetarian">Вегетерианские супы
                                  </label>
                                </div>
                              </li>
                              <li class="category-tab__item">
                                <p class="category__slide-item-title category__slide-item-title--active" onclick="filters.toggle(this)">Цена</p>
                                <div class="category__slide-item-content">
                                  <input type="text" class="js-range-slider" name="my_range" value="" />
                                </div>
                              </li>
                            </ul>
                            <button class="filters__activate-button" onclick="filters.enableBtn()">Применить</button>
                            <button class="filters__activate-reset" onclick="console.log('hello')">Сбросить</button>
                          </form>
                          <div class="filter__tab filters__tab-name">второй таб</div>
                        </div>
                         </div>`
    }

    __toggle(element) {

        $(element).next().slideToggle()
        $(element).toggleClass('category__slide-item-title--active')
    
    }

    __tabSwitcher(element) {

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

    render(place) {
        this.place = place;
        this.place.innerHTML += this.template;
        $('input, checkbox').styler();
        $(".js-range-slider").ionRangeSlider({
              type: "double",
              min: 0,
              max: 3000,
              from: 0,
              to: 3000
          });
        

      }
      
    __getParams() {
        let filtersHtml = document.querySelector('.filters')
        
        let checkboxList = filtersHtml.querySelectorAll('[data-filters-checkbox-cuisine]')
        let radioList = filtersHtml.querySelectorAll('[data-filters-radio-protein]')
        
        let params = {
                        cousines: [],
                        protein: ``, 
                        price: {
                                min: $(".js-range-slider").data("ionRangeSlider").result.min,
                                max: $(".js-range-slider").data("ionRangeSlider").result.min.max
                              }
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

        return params;
    }

    filterActivate() {
      let params = this.__getParams()
      let products = this.place.querySelectorAll('.products__item')

      products.forEach(item => {
        let cousine = item.dataset.cousine;
        let protein = item.dataset.protein;
        let price = item.querySelector('[data-price]').dataset.price
        
        if ( params.price.max >= price && price >= params.price.min &&
             params.cousines.includes(cousine) &&
             protein === params.protein
            ) {
                  // item.style.display = 'flex'
        }
        else {
              //  item.style.display = 'none'
              item.remove()
        }
      })
    }

    enableBtn() {
        console.log('i am here!')
    }
}

let filters = new Filters();


