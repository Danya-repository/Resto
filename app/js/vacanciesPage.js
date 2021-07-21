class VacanciesPage {
  constructor() {
    this.place = `main`;
    this.url = 'vacancies'
    this.mixer;
  }

  initMixer() {
    this.mixer = mixitup('.vacancies__list')
  }

  btnsAnimate() {
    let categorItems = document.querySelectorAll('.vacancies__categories-item');
    categorItems.forEach(item => {
      item.onclick = () => {
        if (item.classList.contains('vacancies__categories-item-all')) {
          categorItems.forEach(item => {
            item.classList.remove('vacancies__categories-item--not-active')
            item.classList.remove('vacancies__categories-item--active')
          })
          return
        };
        categorItems.forEach(item => {
          if (item.classList.contains('vacancies__categories-item-all')) return;

          item.classList.add('vacancies__categories-item--not-active')
          item.classList.remove('vacancies__categories-item--active')
        })
        item.classList.add('vacancies__categories-item--active')
      }
    })
  }

  getVacancies() {
    return fetch(`./database/${this.url}.json`).then(response => response.json())
                                        .then(unpareseResponse => unpareseResponse.vacancies)
                                        .then(vacancies => {
                                          for (let i in vacancies) {
                                            let vacanciesInstance = new Vacancy(vacancies[i]);
                                            vacanciesInstance.render();
                                          }
                                        })
  }

  render() {
    const Place = document.querySelector(this.place)
    Place.innerHTML = `<div class="container">
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
        <div class="vacancies__categories">
        <ul class="vacancies__categories-list">
          <li class="vacancies__categories-item vacancies__categories-item-all">
            <button class="vacancies__categories-button" type="button" data-filter="all">
              <span class="vacancies__categories-title">Все вакансии</span>
              <span class="vacancies__categories-description">
                В наше заведение требуются специалисты для работы в разных направлениях деятельности.
              </span>
            </button>
          </li>
          <li class="vacancies__categories-item">
            <button class="vacancies__categories-button" type="button" data-filter=".kitchen">
              <span class="vacancies__categories-title subtitle">Кухня</span>
              <span class="vacancies__categories-description">
                Приготовление пищи
              </span>
            </button>
          </li>
          <li class="vacancies__categories-item">
            <button class="vacancies__categories-button" type="button" data-filter=".service">
              <span class="vacancies__categories-title subtitle">Сфера услуг</span>
              <span class="vacancies__categories-description">
                Работа с клиентами заведения
              </span>
            </button>
          </li>
          <li class="vacancies__categories-item">
            <button class="vacancies__categories-button" type="button" data-filter=".delivery">
              <span class="vacancies__categories-title subtitle">Логистика</span>
              <span class="vacancies__categories-description">
                Доставка и закупки
              </span>
            </button>
          </li>
          <li class="vacancies__categories-item">
            <button class="vacancies__categories-button" type="button" data-filter=".managment">
              <span class="vacancies__categories-title subtitle">Менеджмент</span>
              <span class="vacancies__categories-description">
                Управление работой заведения
              </span>
            </button>
          </li>
        </ul>
        </div>
        <ul class="vacancies__list">
        </ul>
      </section>`;

    this.btnsAnimate()
    this.getVacancies().then(() => this.initMixer());

  }
}