class Filters {
  constructor() {
    this.myRange;
    this.template = `<div class="filters__tab-buttons">
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
                            <button type="button" class="filters__activate-button" onclick="filters.enableBtn()">Применить</button>
                            <button type="button" class="filters__activate-reset" onclick="filters.resetBtn()">Сбросить</button>
                          </form>
                          <div class="filter__tab filters__tab-name">
                            <form class = "filters__search-form">
                              <span class = "filters__search-form-title">Поиск</span>
                              <input class="filters__search-form-input input-text" type="text" placeholder="Введите название блюда...">
                              <button type="button" class="filters__activate-button" onclick="filters.enableBtn()">Применить</button>
                              <button type="button" class="filters__activate-reset" onclick="filters.resetBtn()">Сбросить</button>
                            </form>
                          </div>
                        </div>`;
    this.place;
    this.instanceCatalog;
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

  resetFilterAreas() {
    let catalogSections = document.querySelectorAll('[data-section-catalog]')
    catalogSections.forEach(item => {
      let filter = item.querySelector('.filters');

      filter.innerHTML = ``;
    })
  }

  render(instanceCatalog) {
    this.instanceCatalog = instanceCatalog;
    this.place = instanceCatalog.place.parentNode.querySelector('.filters')

    this.resetFilterAreas()
    instanceCatalog.render()


    this.place.innerHTML = this.template;
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


    this.render(this.instanceCatalog)
  }

  enableBtn() {
    this.instanceCatalog.render(this.__getParams())
  }
}

let filters = new Filters();
