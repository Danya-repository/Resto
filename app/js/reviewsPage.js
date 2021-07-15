class ReviewsPage {
  constructor(simpleBar) {
    this.place = '.main';
    this.url = 'reviews'
    this.reviews = [];
    this.simpleBar = simpleBar;

    this.render = this.render.bind(this);
    this.init = this.init.bind(this);
  }

  setEvents() {
    this.paginationBar.pagination.addEventListener('click', (event) => {
      const ReviewList = document.querySelector('.reviews__list');
      if (
          event.target.classList.contains('pagination__link')     ||
          event.target.classList.contains('pagination__prev-btn') ||
          event.target.classList.contains('pagination__next-btn')
      ) {
        ReviewList.innerHTML = ``;
        this.paginationBar.getFromTo()
        this.renderReviews()
      }
      })
  }

  render() {
    const Place = document.querySelector(this.place);
    Place.innerHTML = `<div class="container">
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
                                   
                                 </ul>
                                 <div class="reviews__pagination">
                                  
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
    this.init();
  }

  
  init() {
    this.getReviews()
      .then(() => {
        this.paginationBar = new Pagination(this.reviews.length, this.simpleBar)
        this.renderReviews()
        this.setEvents();
      });


    $(".form__rating").rateYo({
      starWidth: "15px",
    })
    $('input:file').styler()
    document.querySelector('.jq-file__name').innerHTML = 'Прикрепите фото';


  }

  getReviews() {
    return fetch(`./database/${this.url}.json`)
      .then(reviews => reviews.json())
      .then(reviewsAfterParse => {
        reviewsAfterParse.reviews.forEach(element => {
          this.reviews.push(element)
        })
        return this.reviews;
      })

  }

  renderReviews() {
    this.reviews.slice(this.paginationBar.getFrom, this.paginationBar.getTo).forEach(element => {
      new Review(element)
    })
  }
}