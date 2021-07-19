class Filter {
    constructor(requestUrl) {
        this.place = `.filters`;
        this.parameters = {};
        this.url = requestUrl;

        this.render = this.render.bind(this);
        this.setStyler = this.setStyler.bind(this);
        this.setStartParameters = this.setStartParameters.bind(this);
        this.getParameters = this.getParameters.bind(this);
        this.init = this.init.bind(this);
        this.setEvents = this.setEvents.bind(this);
        this.getProducts = this.getProducts.bind(this);

        this.render();
        this.init();
        this.getProducts()
    }

    setEvents() {
        const filterBar = document.querySelector(this.place);
        filterBar.addEventListener('click', (e) => {

            if (e.target.classList.contains('filters__tab-button')) {
                let buttons = document.querySelectorAll('.filters__tab-button');
                let tabs = document.querySelectorAll('.filters__tab')

                buttons.forEach(item => item.classList.remove('filters__tab-button--active'))
                tabs.forEach(item => item.classList.remove('filters__tab--active'))

                e.target.classList.add('filters__tab-button--active');
                document.querySelector(`[data-tab-section="${e.target.dataset.tabBtn}"]`).classList.add('filters__tab--active')
            }
            if (e.target.classList.contains('filters__category-slide-title')) {

                $(e.target).next($('.filters__category-slide-content')).slideToggle()
                $(e.target).toggleClass('filters__category-slide-title--active')
            }
            if (e.target.classList.contains('filters__activate-reset')) {
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

                document.querySelector('.filters__search-form-input').value = null;
            }



        })
    }

    init() {
        this.setStyler();
        this.setStartParameters();
        this.setEvents();
    }

    getProducts() {
        this.getParameters()
        return fetch(`./database/${this.url}.json`)
                                                    .then(response => response.json())
                                                    .then(products => products.goods)
                                                    .then(item => item.filter(item => this.filtering(item)))
    }

    filtering({ price, cousine, protein, name }) {
        this.parameters = this.getParameters()

        let filterOfPrice = function (maxPrice, minPrice, productPrice) {
            if (maxPrice >= productPrice && productPrice >= minPrice) {
                return true
            }
            else {
                return false
            }
        }
        let filterOfCousines = function (cousineValues, cousine) {
            if (cousineValues.includes(cousine)) {
                return true;
            }
            else {
                return false;
            }
        }
        let filterOfProtein = function (proteinValue, protein) {
            if (proteinValue === protein) {
                return true;
            }
            else {
                return false;
            }
        }
        let filterOfName = function (nameValue, name) {
            if (name.toLowerCase().includes(nameValue.toLowerCase())) {
                return true;
            }
            else {
                return false;
            }
        }

        if (this.parameters.name !== null && this.parameters.name !== '') {
            if (filterOfName(this.parameters.name, name)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (filterOfPrice(this.parameters.price.max, this.parameters.price.min, price) &&
                filterOfCousines(this.parameters.cousines, cousine) &&
                filterOfProtein(this.parameters.protein, protein)
            ) {
                return true
            }
        }
    }


    setStartParameters() {
        this.parameters.cousines = [];
        this.parameters.protein = ``;
        this.parameters.price = {
            min: this.rangeSlider.data("ionRangeSlider").result.min,
            max: this.rangeSlider.data("ionRangeSlider").result.max
        }
        this.parameters.name = null;
    }

    getParameters() {
        this.setStartParameters();

        let checkboxList = document.querySelectorAll('[data-filters-checkbox-cuisine]');
        let radioList = document.querySelectorAll('[data-filters-radio-protein]');
        let searchFormValue = document.querySelector('.filters__search-form-input').value;

        checkboxList.forEach(item => {
            let cousine = item.getAttribute('data-filters-checkbox-cuisine');

            if (item.checked) {
                this.parameters.cousines.push(cousine);
            }
        })
        radioList.forEach(item => {
            let protein = item.getAttribute('data-filters-radio-protein')

            if (item.checked) {
                this.parameters.protein = protein;
            }
        })
        this.parameters.price.min = $(".js-range-slider").data("ionRangeSlider").result.from
        this.parameters.price.max = $(".js-range-slider").data("ionRangeSlider").result.to
        this.parameters.name = searchFormValue.toLowerCase()

        return this.parameters;
    }

    setStyler() {
        this.formStyler = ($('input, checkbox').styler());
        this.rangeSlider = $(".js-range-slider").ionRangeSlider({
            type: "double",
            min: 0,
            max: 3000,
            from: 0,
            to: 3000
        });
    }

    render() {
        const Place = document.querySelector(this.place);
        this.template = `<div class="filters__tab-buttons">
                           <button class="filters__tab-button filters__tab-button--active" data-tab-btn="category">Категория</button>
                           <button class="filters__tab-button" data-tab-btn="search">Название</button>
                         </div>
                         <div class="filters__tabs">
                           <div class="filters__tab filters__tab--active" data-tab-section="category">
                             <form class="filters__tab-check-list">
                             <ul class="filters__category-tab-list">
                               <li class="filters__category-tab">
                                 <p class="filters__category-slide-title filters__category-slide-title--active">Кухня</p>
                                 <div class="filters__category-slide-content">
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
                               <li class="filters__category-tab">
                                 <p class="filters__category-slide-title filters__category-slide-title--active">Тип супа</p>
                                 <div class="filters__category-slide-content">
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
                               <li class="filters__category-tab">
                                 <p class="filters__category-slide-title filters__category-slide-title--active">Цена</p>
                                 <div class="filters__category-slide-content">
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
        Place.innerHTML = this.template;

    }

}