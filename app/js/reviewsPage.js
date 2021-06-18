class ReviewsPage {
    constructor() {
        this.place = document.querySelector('.main');
        this.template = `<div class="container">
        <section class="breadcrumps">
          <ul class="breadcrumps__list">
            <li class="breadcrumps__item">
              <a href="" class="breadcrumps__link" hred="#">Главная</a>
            </li>
            <li class="breadcrumps__item">
              <a href="" class="breadcrumps__link" hred="#">Отзывы</a>
            </li>
          </ul>
        </section>
        <section class="reviews">
          <ul class="reviews__list">
            <li class="reviews__item">
              <div class="reviews__top-wrapper">
                <div class="reviews__head-name">Игнат</div>
                <div class="reviews__rating" id="rateYo"></div>
                <span class="reviews__id">#431</span>
              </div>
              <div class="reviews__bottom-wrapper">
                <p class="reviews__content">Потрясающий ресторан. Все очень вкусное, по приемлемым ценам, заказали сет
                  из 5 настоек, очень всё вкусное и чувствуется натуральное. Морскик клюквенный просто потрясающий,
                  вареники ассорти офигенные, объелись, начали улыбаться и радоваться))) вышли покурить, а нам дали
                  шинели военные, пофоткались в них, ещё вынесли кокошники и в них сфотались. Вобщем приходите не
                  пожалеете!! Супер ресторан)))</p>
                <div class="reviews__photos">
                  <img class="reviews__photo" src="./images/content/hot-dishes-img.png" alt="">
                  <img class="reviews__photo" src="./images/content/hot-dishes-img.png" alt="">
                  <img class="reviews__photo" src="./images/content/hot-dishes-img.png" alt="">
                </div>
              </div>
            </li>
            <li class="reviews__item">
              <div class="reviews__top-wrapper">
                <div class="reviews__head-name">Игнат</div>
                <div class="reviews__rating"></div>
                <span class="reviews__id">#431</span>
              </div>
              <div class="reviews__bottom-wrapper">
                <p class="reviews__content">Потрясающий ресторан. Все очень вкусное, по приемлемым ценам, заказали сет
                  из 5 настоек, очень всё вкусное и чувствуется натуральное. Морскик клюквенный просто потрясающий,
                  вареники ассорти офигенные, объелись, начали улыбаться и радоваться))) вышли покурить, а нам дали
                  шинели военные, пофоткались в них, ещё вынесли кокошники и в них сфотались. Вобщем приходите не
                  пожалеете!! Супер ресторан)))</p>
                <div class="reviews__photos">
                  <img class="reviews__photo" src="./images/content/hot-dishes-img.png" alt="">
                  <img class="reviews__photo" src="./images/content/hot-dishes-img.png" alt="">
                  <img class="reviews__photo" src="./images/content/hot-dishes-img.png" alt="">
                </div>
              </div>
            </li>
            <li class="reviews__item">
              <div class="reviews__top-wrapper">
                <div class="reviews__head-name">Игнат</div>
                <div class="reviews__rating"></div>
                <span class="reviews__id">#431</span>
              </div>
              <div class="reviews__bottom-wrapper">
                <p class="reviews__content">Потрясающий ресторан. Все очень вкусное, по приемлемым ценам, заказали сет
                  из 5 настоек, очень всё вкусное и чувствуется натуральное. Морскик клюквенный просто потрясающий,
                  вареники ассорти офигенные, объелись, начали улыбаться и радоваться))) вышли покурить, а нам дали
                  шинели военные, пофоткались в них, ещё вынесли кокошники и в них сфотались. Вобщем приходите не
                  пожалеете!! Супер ресторан)))</p>
                <div class="reviews__photos">
                  <img class="reviews__photo" src="./images/content/hot-dishes-img.png" alt="">
                  <img class="reviews__photo" src="./images/content/hot-dishes-img.png" alt="">
                  <img class="reviews__photo" src="./images/content/hot-dishes-img.png" alt="">
                </div>
              </div>
            </li>
          </ul>

          <div class="reviews__pagination">
            <button class="pagination__btn pagination__prev-btn"></button>
            <ul class="pagination__list">
              <li class="pagination__num-page">
                <a class="pagination__link" href="#">1</a>
              </li>
              <li class="pagination__num-page">
                <a class="pagination__link" href="#">2</a>
              </li>
              <li class="pagination__num-page">
                <a class="pagination__link pagination__link--active" href="#">3</a>
              </li>
              <li class="pagination__num-page">
                <a class="pagination__link" href="#">4</a>
              </li>
              <li class="pagination__num-page">
                <a class="pagination__link" href="#">5</a>
              </li>
            </ul>
            <button class="pagination__btn pagination__next-btn"></button>
          </div>
          <form class="reviews__form" action="">
            <div class="reviews__top-wrapper">
              <div class="reviews__head-name form__head-name">Ваш отзыв</div>
            </div>
            <div class="form__fields">
              <div class="form__field">
                <label class="form__field-label" for="">Имя:</label>
                <input class="form__input" type="text" name="" placeholder="Введите Ваше имя">
              </div>
              <div class="form__field">
                <label class="form__field-label rating" for="">Оценка:</label>
                <div class="form__rating"></div>
              </div>
              <div class="form__bottom-wrapper">
                <div class="form__field">
                  <label class="form__field-label" for="">Отзыв:</label>
                  <textarea class="form__field-review form__input" name="" id="" cols="30" rows="10"
                    placeholder="Введите Ваш отзыв"></textarea>
                </div>
                <div class="form__field">
                  <input class="form__field-file" type="file" name="" id="">
                </div>
              </div>
              <input class="form__send-btn" type="submit" value="Отправить">
            </div>
          </form>
        </section>
      </div>`
    }

    render() {
        this.place.innerHTML = this.template;
    }
}