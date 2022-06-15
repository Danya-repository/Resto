class Review {
    constructor({ id, clientName, rating, reviewsText, photos }) {
        this.place = `.reviews__list`;
        this.id = id;
        this.clientName = clientName;
        this.rating = rating;
        this.reviewsText = reviewsText;
        this.photos = photos;

        this.render();
        this.renderPhotoBlock();
        this.setEvents();

        this.modal = new ModalWindow(this.photos,this.PhotoReviewBar)

        
    }

    setEvents() {
        this.PhotoReviewBar.addEventListener('click', debounce(() => {
            this.modal.activeImage = +event.target.dataset.photoReviewNumber;
            this.modal.toggle();
        }), event)
            
        
    
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

    renderPhotoBlock() {
        const Place = this.reviewItem.querySelector('.reviews__bottom-wrapper')
        this.PhotoReviewBar = document.createElement('div');
        this.PhotoReviewBar.classList.add('reviews__photos');

        for (let photoNumber in this.photos) {
            let photoClass = (+photoNumber === 0 ? `reviews__photo reviews__photo--active` : `reviews__photo`)

            let img = `<img class="${photoClass}" src="${this.photos[photoNumber]}" data-photo-review-number="${photoNumber}" alt="">`;
            this.PhotoReviewBar.innerHTML += img;
        }

        Place.append(this.PhotoReviewBar)
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

function debounce(fn, event, ms = 200) {
    let timeOut;
    return function () {
        clearTimeout(timeOut);

        timeOut = setTimeout(fn(event), ms);
    }
}