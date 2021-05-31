class Filters {
    constructor() {
        this.template = `<div class="filters">
                         <div class="filters__tab-buttons">
                          <button class="filters__tab-button filter__tab-button-category filters__tab-button--active" onclick="filters.tabSwitcher(this)">Категория</button>
                          <button class="filters__tab-button filter__tab-button-name" onclick="filters.tabSwitcher(this)">Название</button>
                        </div>
                        <div class="filters__tab">
                          <form class="filter__tab filters__tab-category filter__tab--active">
                            <ul class="category-tab__list">
                              <li class="category-tab__item">
                                <p class="category__slide-item-title category__slide-item-title--active" onclick="filters.toggle(this)">Кухня</p>
                                <div class="category__slide-item-content">
                                  <label class="filters__checkbox-label"><input type = "checkbox">Японская</label>
                                  <label class="filters__checkbox-label"><input type = "checkbox">Русская</label>
                                  <label class="filters__checkbox-label"><input type = "checkbox">Грузинская</label>
                                  <label class="filters__checkbox-label"><input type = "checkbox">Голландская</label>
                                  <label class="filters__checkbox-label"><input type = "checkbox">Индонезийская</label>
                                </div>
                              </li>
                              <li class="category-tab__item">
                                <p class="category__slide-item-title category__slide-item-title--active" onclick="filters.toggle(this)">Тип супа</p>
                                <div class="category__slide-item-content">
                                  <label class="filters__radio-label"><input type = "radio" name = "type-soup">Мясные супы</label>
                                  <label class="filters__radio-label"><input type = "radio" name = "type-soup">Рыбные супы</label>
                                  <label class="filters__radio-label"><input type = "radio" name = "type-soup">Вегетерианские супы</label>
                                </div>
                              </li>
                              <li class="category-tab__item">
                                <p class="category__slide-item-title category__slide-item-title--active" onclick="filters.toggle(this)">Цена</p>
                                <div class="category__slide-item-content">
                                  <input type="text" class="js-range-slider" name="my_range" value="" />
                                </div>
                              </li>
                            </ul>
                            <button class="filters__activate-button" onclick="console.log('hello')">Применить</button>
                            <button class="filters__activate-reset" onclick="console.log('hello')">Сбросить</button>
                          </form>
                          <div class="filter__tab filters__tab-name">второй таб</div>
                        </div>
                         </div>`
    }

    toggle(element) {

        $(element).next().slideToggle()
        $(element).toggleClass('category__slide-item-title--active')
    
    }

    tabSwitcher(element) {

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
        place.innerHTML += this.template;
        $('input, checkbox').styler();
            $(".js-range-slider").ionRangeSlider({
              type: "double",
              min: 0,
              max: 1000,
              from: 200,
              to: 500
          });
    }

}

let filters = new Filters();