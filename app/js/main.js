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

    userbarToggle = function () {
        
        userBar = document.querySelector('.user-bar');
        dropDown = document.querySelector('.user-bar__info-drop-down');

         return userBar.addEventListener('click', function(event) {
            
            // console.log(event)

            dropDown.classList.toggle('user-bar__info-drop-down--active')


        });

    }();
    
    carousel = function () {

        


        let getCarouselSlides = function() {

            let itemList = document.querySelector('.collage__carousel');
            let carouselSlides = Array.from(itemList.children)
                                    .filter(item =>  item.className.includes('collage__carousel-slide'));

            return carouselSlides;
        }();
        let getInfoSlides = function () {
            let itemList = document.querySelector('.collage__info');
            let infoSlides = Array.from(itemList.children);

            return infoSlides;
        }();

        let userChangeSlide = function () {
            
            let clickSlideArea = document.querySelector('.collage__carousel');
            
            clickSlideArea.addEventListener('click', function (event) {
                if (event.target.parentNode.classList.contains('collage__carousel-slide')) {
                    getActiveSlide().classList.remove('collage__carousel-slide--active');
                    event.target.parentNode.classList.add('collage__carousel-slide--active');
                    mainSlideWindowInserter();
                    mainSlideInfoInserter();
                }
                
            })

        }();

        let slideChanger = function (slides = getCarouselSlides) {
        

            for (let i = 0; i < slides.length; i++) {

                if (slides[i].className.includes('collage__carousel-slide--active')) {



                    slides[i].classList.remove('collage__carousel-slide--active');

                    if (i+1 <= slides.length-1) {
                        return slides[i+1].classList.add('collage__carousel-slide--active');
                    
                    }
                    else {
                        return slides[0].classList.add('collage__carousel-slide--active');

                    }

                }

            }
        
        }
 

        let mainSlideWindowInserter = function (slides = getCarouselSlides) {
            
            let mainSliderWindow = document.querySelector('.collage__carousel-window');
            
            
                    
                    let activeSlideImg = getActiveSlide().querySelector('img').cloneNode()

                    mainSliderWindow.innerHTML = "";
                    mainSliderWindow.appendChild(activeSlideImg);




        }

        let getActiveSlide = function (slides = getCarouselSlides) {
            for (let i = 0; i < slides.length; i++) {
                if (slides[i].className.includes('collage__carousel-slide--active')) {
                    return slides[i];
                }
            }
        }


        let mainSlideInfoInserter = function () {

                    
            let numberSlideActive  = getActiveSlide()
                                        .classList
                                        .item(1)
                                        .slice(-1);
                                        
            for (let i of getInfoSlides) {
                if (i.classList.contains('collage__info-slide--active')) {
                    i.classList.remove('collage__info-slide--active');
                    return getInfoSlides[numberSlideActive - 1].classList.add('collage__info-slide--active');

                }
                    
            }


                                    
            console.log(numberSlideActive)

        }

        mainSlideWindowInserter(); // init first img in window-carousel

        let sliderMove = function () {
            slideChanger();
            mainSlideWindowInserter();
            mainSlideInfoInserter();
        }
        
        return setInterval(sliderMove, 7000);
        
        
    }();
});