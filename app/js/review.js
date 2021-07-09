class Review {
    constructor({id, clientName, rating, reviewsText, photos}) {
        this.place = `.reviews__list`;
        this.id = id;
        this.clientName = clientName;
        this.rating = rating;
        this.reviewsText = reviewsText;
        this.photos = photos;

        this.render();
    }

    render() {
        const Place = document.querySelector(this.place);
        this.reviewItem = document.createElement('li');
        this.reviewItem.classList.add('reviews__item');
        this.reviewItem.innerHTML = `<div class="reviews__top-wrapper">
                                        <div class="reviews__head-name">${this.clientName}</div>
                                        <div class="reviews__rating" id="rateYo"></div>
                                        <span class="reviews__id">#${this.id}</span>
                                    </div>
                                    <div class="reviews__bottom-wrapper">
                                        <p class="reviews__content">${this.reviewsText}</p>
                                    </div>`

        Place.append(this.reviewItem);
        this.init();
    }

    init() {
        $(this.reviewItem.querySelector('#rateYo')).rateYo({
            starWidth: "15px",
            numStars: 5,
            halfStar: true,
            rating: this.rating,
            readOnly: true,
            ratedFILL: "#EA9769"
          })
    }

}

/* <div class="reviews__photos">
            <img class="reviews__photo" src="./images/content/hot-dishes-img.png" alt="">
            <img class="reviews__photo" src="./images/content/hot-dishes-img.png" alt="">
            <img class="reviews__photo" src="./images/content/hot-dishes-img.png" alt="">
          </div> */