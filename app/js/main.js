$(function () {

    headerSearchToggle = function () {
        
        let headerSearchOpenBtn = document.querySelector('.header__search-open-btn');
        let headerSearchForm = document.querySelector('.header__search-form');

        return headerSearchOpenBtn.addEventListener('click', function (event) {
            event.preventDefault;

            if (headerSearchForm.classList.contains('header__search-form-disable')) {
                headerSearchOpenBtn.classList.add('header__search-open-btn--active');
                headerSearchForm.classList.remove('header__search-form-disable');

            }
            else {
                headerSearchOpenBtn.classList.remove('header__search-open-btn--active');
                headerSearchForm.classList.add('header__search-form-disable');
            }
        });
    }();
    

    headerBasketOrderToggle = function () {
        
        let basketBtn = document.querySelector('.user-panel__btn.user-panel__basket');
        let cancelBtn = document.querySelector('.order-panel__close-btn');
        let orderPanel = document.querySelector('.order-panel');
        

        return function () {
            
            basketBtn.addEventListener('click', function (event) {
                console.log('hello')
                event.preventDefault;
                orderPanel.classList.add('order-panel--active');
            });

            cancelBtn.addEventListener('click', function (event) {
                console.log('hello')
                event.preventDefault;
                orderPanel.classList.remove('order-panel--active');
            });


        }();
    }();
    
    carousel = function () {


        let getCarouselSlides = function() {

            let itemList = document.querySelector('.collage__carousel');
            let carouselSlides = Array.from(itemList.children)
                                    .filter(item =>  item.className.includes('collage__carousel-item'));

            return carouselSlides;
        }();

        let slideChanger = function (slides = getCarouselSlides) {

            let mainSliderWindow = document.querySelector('.collage__carousel-window');
        

            for (let i = 0; i < slides.length; i++) {

                if (slides[i].className.includes('collage__carousel-item--active')) {



                    slides[i].classList.remove('collage__carousel-item--active');

                    if (i+1 <= slides.length-1) {
                        return slides[i+1].classList.add('collage__carousel-item--active');
                    
                    }
                    else {
                        return slides[0].classList.add('collage__carousel-item--active');

                    }

                }

            }
        
        }
 

        let mainSlideInserter = function (slides = getCarouselSlides) {
            slideChanger();
            let mainSliderWindow = document.querySelector('.collage__carousel-window');
        
            for (let i = 0; i < slides.length; i++) {

                if (slides[i].className.includes('collage__carousel-item--active')) {

                    // console.log(slides[i].nextSibling);

                }

            }


        }

        return setInterval(mainSlideInserter, 7000);



        
        
    }();
});