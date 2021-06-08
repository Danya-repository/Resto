$(function () {
    
    indexPage.render();

    let instanceSimpleBar = indexPage.getSimpleBarInstance();

    headerExtra = function () {
        
        let extraBtn = document.querySelector('.extra-menu__btn');
        let extraMenu = document.querySelector('.extra-menu__wrapper');

        return extraBtn.addEventListener('click', function (event) {
            event.preventDefault;

            if (extraMenu.classList.contains('extra-menu__wrapper--active')) {
                extraBtn.classList.remove('extra-menu__btn--active');
                extraMenu.classList.remove('extra-menu__wrapper--active');

            }
            else {
                extraBtn.classList.add('extra-menu__btn--active');
                extraMenu.classList.add('extra-menu__wrapper--active');
            }
        });
    }();
    
    

    headerBasketOrderToggle = function () {
        
        let basketBtn = document.querySelector('.user-panel__btn.user-panel__basket');
        let cancelBtn = document.querySelector('.order-panel__close-btn');
        let orderPanel = document.querySelector('.order-panel');
        

        return function () {
            
            basketBtn.addEventListener('click', function (event) {
                event.preventDefault;
                orderPanel.classList.add('order-panel--active');
            });

            cancelBtn.addEventListener('click', function (event) {
                event.preventDefault;
                orderPanel.classList.remove('order-panel--active');
            });


        }();
    }();

    userbarToggle = function () {
        
        userBar = document.querySelector('.user-bar');
        dropDown = document.querySelector('.user-bar__info-drop-down');

        $('.user-bar').on('click', function () {
           
            $('.user-bar__info-drop-down').slideToggle();
            $('.user-icon').toggleClass('user-icon--active');

        });
    }();
    
    animationHeaderFixed = function () {
        
        let headerWrapperTop = document.querySelector('.header__wrapper-top')
        let headerWrapperBottom = document.querySelector('.header__wrapper-bottom')

        let distanceBetweenBegginingPageAndHeaderWrapperBottom = headerWrapperBottom.getBoundingClientRect().top

        // simpleBar.getScrollElement().scrollTop - проскролленное расстояние от начала страницы

        instanceSimpleBar.getScrollElement().addEventListener('scroll', function () {

            if (headerWrapperTop.getBoundingClientRect().top + headerWrapperTop.offsetHeight <= 0) {

                headerWrapperBottom.classList.add('header__wrapper-bottom--animation-fix-to-top')
                headerWrapperTop.style.marginBottom = `${headerWrapperTop.offsetHeight}px`
            }
            else {
                headerWrapperBottom.classList.remove('header__wrapper-bottom--animation-fix-to-top')
                headerWrapperTop.style.marginBottom = `0`
            }


            
        

            
        })
        document.body.addEventListener('click', function(event) {

            if (event.target.classList.contains('menu__list-link') &&
                headerWrapperBottom.getBoundingClientRect().top === 0) {

                simpleBar.getScrollElement().scrollTop = distanceBetweenBegginingPageAndHeaderWrapperBottom;
            }
        })
    }();


    
});
