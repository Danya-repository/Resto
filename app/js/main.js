$(function () {

    const simpleBar = new SimpleBar(document.querySelector('body'));


    const indexPage = new IndexPage(simpleBar);
    const basketButton = new BasketButton();
    basketButton.render();

    const reviewsPage = new ReviewsPage();
    const aboutUsPage = new AboutUsPage();
    const basket = new Basket(basketButton);
    const catalogPage = new CatalogPage(basket, basketButton);
    const vacanciesPage = new VacanciesPage()
    
    
    indexPage.init();
    

    basket.render()




    headerMenulinks = function () {
        let menu = document.querySelector('.menu');
        const extraMenu = document.querySelector('.extra-menu__list')

        menu.addEventListener('click', function (event) {

            if (event.target.classList.contains('menu__link')) {

                catalogPage.init(event.target.dataset.typeFood)
                catalogPage.render()
                if (window.innerWidth < 800) {
                    menu.classList.remove('open')
                }

            }
            event.preventDefault()

        })
        extraMenu.addEventListener('click', function (event) {

            if (event.target.classList.contains('extra-menu__link')) {
                switch (event.target.dataset.extraHref) {
                    case ('about-us'):
                        aboutUsPage.render()
                        break;
                    case ('vacancies'):
                        vacanciesPage.render()
                        break;
                    case ('reviews'):
                        reviewsPage.render();
                }
            }
        })
    }()


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

        let basketBtn = document.querySelector('.user__btn.user__basket');
        let orderPanel = document.querySelector('.order-panel');


        return function () {

            basketBtn.addEventListener('click', function (event) {
                event.preventDefault;
                orderPanel.classList.add('order-panel--active');
            });

            // cancelBtn.addEventListener('click', function (event) {
            //     event.preventDefault;
            //     orderPanel.classList.remove('order-panel--active');
            // });


        }();
    }();

    userbarToggle = function () {

        userBar = document.querySelector('.user');
        dropDown = document.querySelector('.user__drop-down');

        $('.user__bar').on('click', function () {

            $('.user__drop-down').slideToggle();
            $('.user__icon').toggleClass('user__icon--active');
            if (window.innerWidth < 1024 && window.innerWidth > 800) {
                console.log('hello')
                if (document.querySelector('.user__icon').classList.contains('user__icon--active')) {
                    dropDown.style.display = 'flex'
                }
            }

        });
    }();

    animationHeaderFixed = function () {

        let headerWrapperTop = document.querySelector('.header__wrapper-top')
        let headerWrapperBottom = document.querySelector('.header__wrapper-bottom')

        let distanceBetweenBegginingPageAndHeaderWrapperBottom = headerWrapperBottom.getBoundingClientRect().top

        // simpleBar.getScrollElement().scrollTop - проскролленное расстояние от начала страницы

        simpleBar.getScrollElement().addEventListener('scroll', function () {

            if (headerWrapperTop.getBoundingClientRect().top + headerWrapperTop.offsetHeight <= 0) {

                headerWrapperBottom.classList.add('header__wrapper-bottom--animation-fix-to-top')
                headerWrapperTop.style.marginBottom = `${headerWrapperTop.offsetHeight}px`
            }
            else {
                headerWrapperBottom.classList.remove('header__wrapper-bottom--animation-fix-to-top')
                headerWrapperTop.style.marginBottom = `0`
            }






        })
        document.body.addEventListener('click', function (event) {

            if (event.target.classList.contains('menu__list-link') &&
                headerWrapperBottom.getBoundingClientRect().top === 0) {

                simpleBar.getScrollElement().scrollTop = distanceBetweenBegginingPageAndHeaderWrapperBottom;
            }

            if (event.target.classList.contains('personal-btn') &&
                headerWrapperBottom.getBoundingClientRect().top === 0) {

                $('.autorization').slideToggle()
                simpleBar.getScrollElement().scrollTop = distanceBetweenBegginingPageAndHeaderWrapperBottom;
            }
        })
    }();

    $('.menu .close-btn').click(() => {
        $('.menu').toggleClass('open')
    })
    $('.menu__button').click(() => {
        $('.menu').toggleClass('open')
    })








});
