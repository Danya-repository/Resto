class ReviewsPage {
    constructor() {
        this.place = '.main';
        this.url = 'reviews'
        this.reviews = {};

        this.render = this.render.bind(this);
        this.init = this.init.bind(this);

        this.render();
        this.getReviews();
        this.init();
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
    }

    init() {
      this.paginationBar = new Pagination(5)
      $(".form__rating").rateYo({
        starWidth: "15px",
      })
      $('input:file').styler()
      document.querySelector('.jq-file__name').innerHTML = 'Прикрепите фото'

      
    }

    getReviews() {
      fetch(`./database/${this.url}.json`)
                                          .then(reviews => reviews.json())
                                          .then(reviewsAfterParse => {
                                            reviewsAfterParse.reviews.forEach(element => {
                                              this.reviews[element.id] = element;
                                            })
                                            return reviewsAfterParse.reviews
                                          })                          
                                          .then(() => {
                                            this.renderReviews()
                                          });
                                          
    }

    renderReviews() {
      for (let i in this.reviews) {
        let review = new Review(this.reviews[i])
      }
    }
}