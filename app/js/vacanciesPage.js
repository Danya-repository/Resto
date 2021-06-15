class VacanciesPage {
    constructor() {
        this.place = document.querySelector('main');
        this.mixer;
        this.template = `<div class="container">
        <section class="breadcrumps">
        <ul class="breadcrumps__list">
          <li class="breadcrumps__item">
            <a href="" class="breadcrumps__link" hred="#">Главная</a>
          </li>
          <li class="breadcrumps__item">
            <a href="" class="breadcrumps__link" hred="#">Вакансии</a>
          </li>
        </ul>
      </section>
      <section class="vacancies">

        <ul class="categories__list">
          <li class="categories__item item-all">
            <button class="categories__button" type="button" data-filter="all">
              <h4 class="categories__title subtitle">Все вакансии</h4>
              <span class="categories__description">
                В наше заведение требуются специалисты для работы в разных направлениях деятельности.
              </span>
            </button>
          </li>
          <li class="categories__item">
            <button class="categories__button" type="button" data-filter=".category-a">
              <h4 class="categories__title subtitle">Кухня</h4>
              <span class="categories__description">
                Приготовление пищи
              </span>
            </button>
          </li>
          <li class="categories__item">
            <button class="categories__button" type="button" data-filter=".category-b">
              <h4 class="categories__title subtitle">Сфера услуг</h4>
              <span class="categories__description">
                Работа с клиентами заведения
              </span>
            </button>
          </li>
          <li class="categories__item">
            <button class="categories__button" type="button" data-filter=".category-c">
              <h4 class="categories__title subtitle">Логистика</h4>
              <span class="categories__description">
                Доставка и закупки
              </span>
            </button>
          </li>
          <li class="categories__item">
            <button class="categories__button" type="button" data-filter=".category-d">
              <h4 class="categories__title subtitle">Менеджмент</h4>
              <span class="categories__description">
                Управление работой заведения
              </span>
            </button>
          </li>
        </ul>
        <ul class="vacancies__list">
          <li class="vacancies__item mix category-a">
            <div class="vacancies__top-wrapper">
              <h4 class="vacancies__title">Шеф-повар</h4>
              <a class="vacancies__button" href="mailto:stivenban777@gmail.com">Отправить резюме</a>
            </div>
            <p class="vacancies__description">Шеф-повар является визитной карточкой заведения, в котором он работает.
              Его первейшая обязанность – придумывать рецепты уникальных блюд. Новизна, экзотичность, свежий взгляд на
              привычные кушанья – именно этого ждут от шеф-повара. Для того чтобы справиться с этой задачей, ему
              необходимо иметь широчайший кругозор в области кулинарии, а также иметь выдающееся обоняние и чувство
              вкуса. Нелишним будет и развитая фантазия. Шеф-повар – это начальник кухни, у него в подчинении
              находится множество помощников и других поваров.</p>
          </li>
          <li class="vacancies__item mix category-c">
            <div class="vacancies__top-wrapper">
              <h4 class="vacancies__title">Курьер на автомобиле</h4>
              <a class="vacancies__button" href="mailto:stivenban777@gmail.com">Отправить резюме</a>
            </div>
            <p class="vacancies__description">Кабанчик на моторе.</p>
          </li>
          <li class="vacancies__item mix category-c">
            <div class="vacancies__top-wrapper">
              <h4 class="vacancies__title">Пеший курьер</h4>
              <a class="vacancies__button" href="mailto:stivenban777@gmail.com">Отправить резюме</a>
            </div>
            <p class="vacancies__description">Простой кабанчик.</p>
          </li>
          <li class="vacancies__item mix category-a">
            <div class="vacancies__top-wrapper">
              <h4 class="vacancies__title">Сомелье</h4>
              <a class="vacancies__button" href="mailto:stivenban777@gmail.com">Отправить резюме</a>
            </div>
            <p class="vacancies__description">Эксперт по вопросам приобретения, хранения и подачи вина к столу.
              Сомелье составляет винную карту, занимается дегустацией вин, даёт рекомендации по выбору напитков и
              обеспечивает их грамотную подачу клиентам.</p>
          </li>
          <li class="vacancies__item mix category-d">
            <div class="vacancies__top-wrapper">
              <h4 class="vacancies__title">Управляющий</h4>
              <a class="vacancies__button" href="mailto:stivenban777@gmail.com">Отправить резюме</a>
            </div>
            <p class="vacancies__description">Главная обязанность менеджера ресторана – управление заведением от имени
              владельцев. В течение дня он решает самые разные задачи, начиная от консультации с шеф-поваром по поводу
              меню на день и заканчивая проверкой готовности кухни к выполнению заказов. Профессиональный управляющий
              не ограничивается общением с персоналом, он беседует с расположенными к разговору посетителями, чтобы
              понять, все ли их устраивает.</p>
          </li>
        </ul>
      </section>`
    }

    initMixer() {
        this.mixer = mixitup('.vacancies__list')
    }

    btnsAnimate() {
        let categorItems = document.querySelectorAll('.categories__item');
        categorItems.forEach(item => {
            item.onclick = () => {
                if (item.classList.contains('item-all')) {
                    categorItems.forEach(item => {
                        item.classList.remove('categories__item--not-active')
                        item.classList.remove('categories__item--active')
                    })
                    return
                };
                categorItems.forEach(item => {
                    if (item.classList.contains('item-all')) return;
                    item.classList.add('categories__item--not-active')
                    item.classList.remove('categories__item--active')
                })
                item.classList.add('categories__item--active')
            }
        })
    }

    render() {
        this.place.innerHTML = this.template;
        this.btnsAnimate()
        this.initMixer();
    }
}