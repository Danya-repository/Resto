class AboutUsPage {
  constructor() {
    this.place = document.querySelector('main');
    this.template = `<div class="container">
                        <section class="breadcrumps">
                            <ul class="breadcrumps__list">
                              <li class="breadcrumps__item">
                                <a href="" class="breadcrumps__link" hred="#">Главная</a>
                              </li>
                              <li class="breadcrumps__item">
                                <a href="" class="breadcrumps__link" hred="#">О нас</a>
                              </li>
                            </ul>
                          </section>
                          <section class="about-us">
                            <aside class="about-us__menu">
                              <ul class="about-us__menu-list">
                                <li class="about-us__tab-btn about-us__tab-btn--active" data-about-us-tab-btn="1">Что такое Resto?</li>
                                <li class="about-us__tab-btn" data-about-us-tab-btn="2">Как мы работаем?</li>
                                <li class="about-us__tab-btn" data-about-us-tab-btn="3">Доставка и оплата</li>
                                <li class="about-us__tab-btn" data-about-us-tab-btn="4">Документы</li>
                                <li class="about-us__tab-btn" data-about-us-tab-btn="5">Помощь</li>
                              </ul>
                            </aside>
                            <div class="about-us__content">
                              <div class="about-us__tab about-us__tab--active" data-about-us-tab="1">
                                <h3 class="about-us__subtitle subtitle">Что такое Resto?</h3>
                                <div class="about-us__text-wrapper">
                                  <div class="about-us__text">
                                    <p>Ресторан «Resto» - не только идеальное место для любых встреч - для романтических свиданий,
                                      обкашливания вопросиков, для вечеров с друзьями, а также мы работаем на доставку.
                                      У нас можно одинаково хорошо проводить тихие вечера с самыми близкими и шумно отмечать праздники в
                                      огромной компании. Принимают так, как в лучших домах Парижа и Нью-Йорка.
                                      У нас уютно, душевно и очень вкусно.</p>
                                    <p>Посетителям нашего заведения доступна живая музыка в исполнении лауреата премий "Лучшее исполнение
                                      шлягера 1993" и "Голос Адлера".
                                      В меню ресторана «Resto» есть блюда на любой вкус: традиционные восточные, классические европейские
                                      и
                                      утонченные японские.
                                      «Resto» – это больше, чем ресторан с вкусной кухней, больше чем ларёк и автомойка за ТЦ "Вояж".
                                      Ресторан «Resto» – это место, где можно отдохнуть душой и обрести ту самую внутреннюю гармонию,
                                      которой многим не хватает в современном мире.
                                    </p>
                                  </div>
                                  <div class="about-us__decorative-layer"></div>
                                </div>
                              </div>
                              <div class="about-us__tab" data-about-us-tab="2">
                                <h3 class="about-us__subtitle subtitle">Как мы работаем?</h3>
                                <div class="about-us__text-wrapper">
                                  <div class="about-us__text">
                                    <p>Ресторан «Resto» приглашает жителей и гостей Челябинска отлично провести время и насладиться
                                      лучшими блюдами русской, японской, голладнской, индонезийской кухни. Вас ждут уютные залы,
                                      внимательный персонал, вкусная
                                      кухня и зажигательная музыка. Наш приветливый коллектив сделает все, чтобы отдых стал для вас
                                      незабываемым. В нашем заведении в центре Челябинска вы можете отметить любое торжество:
                                      провести банкет, отгулять свадьбу, отпраздновать юбилей или день рождения, устроить корпоратив,
                                      организовать фуршет или конференцию.</p>
                                    <p>Наш ресторан, расположенный на окраине Ленинского района, считается одним из лучших в Челябинске. К
                                      услугам наших
                                      гостей банкетные залы различного размера. Наши повара предлагают попробовать вкуснейшие блюда. Наш
                                      шеф повар практикует авторский подход и вносит нотки современности в каждое блюдо, делая их еще
                                      более вкусными и красивыми. Отдыхайте у нас, мы гарантируем «Resto» станет вашим любимым рестораном!
                                    </p>
                                  </div>
                                  <div class="about-us__decorative-layer"></div>
                                </div>
                              </div>
                              <div class="about-us__tab" data-about-us-tab="3">
                                <h3 class="about-us__subtitle subtitle">Доставка и оплата</h3>
                                <div class="about-us__text-wrapper">
                                  <div class="about-us__text">
                                    <p>После того, как вы оформили заказ, через специальное мобильное приложение он попадает к курьеру –
                                      специалисту Resto. Он отбирает самые качественные и
                                      свежие продукты на полках магазина. Этому правилу учат каждого специалиста Resto,
                                      поэтому клиенты могут быть уверены, доставленный товар не окажется испорченным.
                                    </p>
                                    <p>
                                      Такие же правила действуют и в случаях, если товар не соответствует
                                      стандартам качества Resto. Доступен безналичный расчёт, или оплата через наше веб-приложение.
                                    </p>
                                  </div>
                                  <div class="about-us__decorative-layer"></div>
                                </div>
                              </div>
                              <div class="about-us__tab" data-about-us-tab="4">
                                <h3 class="about-us__subtitle subtitle">Документы</h3>
                                <div class="about-us__text-wrapper">
                                  <div class="about-us__text">
                                    <p>Документы.</p>
                                    <p>Санпенстанция.</p>
                                  </div>
                                  <div class="about-us__decorative-layer"></div>
                                </div>
                              </div>
                              <div class="about-us__tab" data-about-us-tab="5">
                                <h3 class="about-us__subtitle subtitle">Помощь</h3>
                                <div class="about-us__text-wrapper">
                                  <div class="about-us__text">
                                    <p>Обратившийся за психологической помощью человек может получить 4 бесплатные консультации. В течение
                                      этого времени будет проведено уточнение запроса клиента и проведена работа с одним запросом в рамках
                                      краткосрочного консультирования (у клиента есть возможность получить дополнительные консультации на
                                      коммерческой основе с льготными условиями оплаты). Возможно повторное обращение в психологическую
                                      службу от клиента с новым запросом через полгода после завершения работы.</p>
                                    <p>Обращаться можно как индивидуально, так и со своими партнерами или близкими; как с ясным запросом —
                                      определенной темой или вопросом, так и без него. Может быть, для Вас сейчас актуальны темы принятия
                                      себя и идентичности, камин-аута, формирование целостного образа себя и ощущения безусловной
                                      самоценности своей личности, развитие навыков отстаивания жизненной позиции и противодействия разным
                                      формам социального давления. Или Вы столкнулись с дискриминацией, насилием в отношении себя или
                                      стали жертвой преступления на почве ненависти, и хотите обратиться не только за юридической помощью,
                                      но и психологической поддержкой.
                                    </p>
                                  </div>
                                  <div class="about-us__decorative-layer"></div>
                                </div>
                              </div>
                            </div>
                          </section>
                          <section class="about-slider">
                            <div class="about-slider__inner">
                              <div class="about-slider__item">
                                <img class="about-slider__img" src="./images/content/about-us-slider-1.jpg" alt="">
                              </div>
                              <div class="about-slider__item">
                                <img class="about-slider__img" src="./images/content/about-us-slider-2.jpg" alt="">
                              </div>
                              <div class="about-slider__item">
                                <img class="about-slider__img" src="./images/content/about-us-slider-3.jpg" alt="">
                              </div>
                              <div class="about-slider__item">
                                <img class="about-slider__img" src="./images/content/about-us-slider-1.jpg" alt="">
                              </div>
                              <div class="about-slider__item">
                                <img class="about-slider__img" src="./images/content/about-us-slider-2.jpg" alt="">
                              </div>
                              <div class="about-slider__item">
                                <img class="about-slider__img" src="./images/content/about-us-slider-3.jpg" alt="">
                              </div>
                              <div class="about-slider__item">
                                <img class="about-slider__img" src="./images/content/about-us-slider-1.jpg" alt="">
                              </div>
                              <div class="about-slider__item">
                                <img class="about-slider__img" src="./images/content/about-us-slider-2.jpg" alt="">
                              </div>
                              <div class="about-slider__item">
                                <img class="about-slider__img" src="./images/content/about-us-slider-3.jpg" alt="">
                              </div>
                            </div>
                          </section>
                          </div>`
  }

  tabAboutUs() {
    let tabBar = document.querySelector('.about-us__menu');
    let tabBtns = document.querySelectorAll('.about-us__tab-btn');
    let tabSlides = document.querySelectorAll('.about-us__tab')

    tabBar.addEventListener('click', function (event) {
      let activeSlide = document.querySelector(`[data-about-us-tab="${event.target.dataset.aboutUsTabBtn}"]`)

      tabBtns.forEach(item => item.classList.remove('about-us__tab-btn--active'))
      tabSlides.forEach(item => item.classList.remove('about-us__tab--active'))

      event.target.classList.add('about-us__tab-btn--active')
      activeSlide.classList.add('about-us__tab--active')
    })
  };

  carousel() {
    let slider = document.querySelector('.slider__inner')
    $('.about-slider__inner').slick({
      autoplay: true,
      autoplaySpeed: 4000,
      slidesToShow: 3,
      slidesToScroll: 1,
    })
  }

  render() {
    this.place.innerHTML = this.template;
    this.tabAboutUs();
    this.carousel();
    
  }
}

